"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { normalize } from "@/lib/normalize";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackModeEntered } from "@/lib/analytics";
import { shareGameResult } from "@/lib/resultShare";
import { unlockWorldCupCard } from "@/lib/worldCupCollection";
import { getDailyWorldCupTop10, worldCupPlayers } from "@/data/worldcups";
import type { WorldCupPlayer } from "@/data/worldcups";
import { useChallengeLifecycle } from "@/lib/useChallengeLifecycle";
import DataReportButton from "@/components/DataReportButton";
import { getCommonFootballAliases, matchesFootballAlias } from "@/lib/playerAliases";

function score(player: WorldCupPlayer, query: string) {
  const q = normalize(query);
  if (q.length < 2) return 99;
  const name = normalize(player.name);
  const words = player.name.split(/\s+/).map(normalize);
  const aliases = getCommonFootballAliases(player.name, player.aliases).map(normalize);
  if (name.startsWith(q) || aliases.some(alias => alias.startsWith(q))) return 0;
  if (words.some(word => word.startsWith(q))) return 1;
  if (name.includes(q) || aliases.some(alias => alias.includes(q))) return 2;
  return 99;
}

function safeHint(value: string) {
  if (!value || /por auditar|undefined|null|^-$/i.test(value)) return "Pista oculta";
  return value;
}

export default function Top10Mundial({ onBack }: { onBack?: () => void }) {
  const challenge = getDailyWorldCupTop10(getDayNumber());
  const storageKey = `fbl-wc-top10-${getDayKey()}-${challenge.id}`;
  const [query, setQuery] = useState("");
  const [guessed, setGuessed] = useState<string[]>([]);
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wrong, setWrong] = useState("");
  const [startedAt] = useState(() => Date.now());

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    return worldCupPlayers
      .filter(player => !guessed.includes(player.id))
      .map(player => ({ player, score: score(player, query) }))
      .filter(item => item.score < 99)
      .sort((a, b) => a.score - b.score || a.player.name.localeCompare(b.player.name, "es"))
      .slice(0, 8)
      .map(item => item.player);
  }, [guessed, query]);

  useChallengeLifecycle({
    modeId: "top10-mundial",
    challengeId: challenge.id,
    seasonId: "world-cups",
    completed: finished,
    attempts: allGuesses.length,
    startedAt,
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (saved && Array.isArray(saved.guessed)) {
        setGuessed(saved.guessed);
        setAllGuesses(Array.isArray(saved.allGuesses) ? saved.allGuesses : []);
        setFinished(!!saved.finished);
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    trackModeEntered("top10-mundial", "world-cups", { challengeId: challenge.id });
    trackChallengeStarted("top10-mundial", challenge.id, { seasonId: "world-cups" });
  }, [challenge.id]);

  function persist(nextGuessed: string[], nextAll: string[], nextFinished: boolean) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ guessed: nextGuessed, allGuesses: nextAll, finished: nextFinished }));
    } catch {}
  }

  function submit(value: string) {
    if (finished) return;
    const hit = challenge.answers.find(answer => matchesFootballAlias(value, [answer.name, ...answer.aliases]));
    const nextAll = [...allGuesses, value];
    setAllGuesses(nextAll);
    setQuery("");

    if (!hit || guessed.includes(hit.playerId)) {
      setWrong(value);
      setTimeout(() => setWrong(""), 1400);
      persist(guessed, nextAll, false);
      return;
    }

    const nextGuessed = [...guessed, hit.playerId];
    const complete = nextGuessed.length === challenge.answers.length;
    setGuessed(nextGuessed);
    setFinished(complete);
    unlockWorldCupCard(hit.playerId, challenge.id);
    persist(nextGuessed, nextAll, complete);

    if (complete) {
      trackChallengeCompleted("top10-mundial", challenge.id, {
        seasonId: "world-cups",
        modeId: "top10-mundial",
        won: true,
        attempts: nextAll.length,
        timeSpent: Math.round((Date.now() - startedAt) / 1000),
      });
    }
  }

  function surrender() {
    if (finished) return;
    setFinished(true);
    persist(guessed, allGuesses, true);
    trackChallengeFailed("top10-mundial", challenge.id, {
      seasonId: "world-cups",
      modeId: "top10-mundial",
      won: false,
      attempts: allGuesses.length,
      timeSpent: Math.round((Date.now() - startedAt) / 1000),
    });
  }

  function share() {
    const grid = challenge.answers.map(answer => guessed.includes(answer.playerId) ? "🟩" : "⬛").join("");
    const text = [
      `🌍 Top10 Mundial #${getDayNumber()}`,
      grid,
      `${guessed.length}/10 encontrados`,
      `Dificultad: ${challenge.difficulty}`,
      "",
      "¿Puedes superarme?",
      "https://futboldle.es",
    ].join("\n");
    shareGameResult(text, {
      modeId: "top10-mundial",
      challengeId: challenge.id,
      seasonId: "world-cups",
      won: guessed.length === challenge.answers.length,
      attempts: allGuesses.length,
      title: "Top10 Mundial",
      onCopied: () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
    });
  }

  const pct = Math.round((guessed.length / challenge.answers.length) * 100);

  return (
    <section className="mx-auto max-w-3xl rounded-[28px] overflow-hidden" style={{ background: "white", boxShadow: "0 14px 34px rgba(0,0,0,0.09)" }}>
      <header className="px-5 py-5 md:px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="absolute right-4 -top-5 font-bebas text-[110px] leading-none text-white/10">10</div>
        {onBack ? <button onClick={onBack} className="relative z-10 text-[11px] font-semibold text-white/70 mb-4">← Volver</button> : null}
        <div className="relative z-10 text-[9px] uppercase font-semibold tracking-[0.22em] text-white/70">Mundiales · #{getDayNumber()}</div>
        <h1 className="relative z-10 font-bebas text-[46px] md:text-[58px] leading-none mt-1">Top10 Mundial</h1>
        <p className="relative z-10 text-[12px] text-white/75 mt-1">{challenge.subtitle}</p>
      </header>

      <div className="p-4 md:p-5 flex flex-col gap-4">
        <div className="rounded-2xl p-4" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.18)" }}>
          <div className="text-[8px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#174ea6" }}>Reto diario verificado</div>
          <h2 className="font-bebas text-[30px] md:text-[36px] leading-none mt-1" style={{ color: "#18181b" }}>{challenge.title}</h2>
          <p className="text-[11px] mt-2" style={{ color: "#5f5f66" }}>{challenge.period} · {challenge.criterion}</p>
          <div className="flex items-center justify-between mt-4 text-[11px]" style={{ color: "#6b6b72" }}>
            <span>{guessed.length}/10 encontrados</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden mt-1" style={{ background: "rgba(23,78,166,0.14)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#43d477" }} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {challenge.answers.map((answer, index) => {
            const revealed = guessed.includes(answer.playerId) || finished;
            return (
              <div key={`${answer.playerId}-${index}`} className="rounded-xl px-3 py-2.5 flex items-center gap-3" style={{ background: revealed ? "#eef3ff" : "#fbfaf7", border: `1px solid ${revealed ? "rgba(23,78,166,0.18)" : "rgba(0,0,0,0.07)"}` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bebas text-[20px]" style={{ background: revealed ? "#174ea6" : "#e6e0d6", color: revealed ? "white" : "#9a9a8a" }}>{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-oswald font-semibold text-[15px]" style={{ color: revealed ? "#18181b" : "#9a9a8a" }}>{revealed ? `${answer.flag} ${answer.name}` : "?????"}</div>
                  <div className="text-[10px]" style={{ color: "#8a8a80" }}>{revealed ? answer.label : `${safeHint(answer.nationality)} · ${safeHint(answer.position)}`}</div>
                </div>
                {revealed ? <span className="text-[12px] font-semibold" style={{ color: "#174ea6" }}>✓</span> : null}
              </div>
            );
          })}
        </div>

        {!finished ? (
          <div className="relative">
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={event => {
                if (event.key === "Enter") submit(suggestions[0]?.name ?? query);
              }}
              placeholder="Escribe un mundialista..."
              className="w-full rounded-xl px-4 py-3 text-[15px] font-medium outline-none"
              style={{ background: "white", border: "2px solid rgba(23,78,166,0.35)", color: "#18181b" }}
            />
            {suggestions.length > 0 && (
              <div className="absolute z-30 left-0 right-0 mt-1 rounded-xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 10px 26px rgba(0,0,0,0.12)" }}>
                {suggestions.map(player => (
                  <button key={player.id} onMouseDown={event => { event.preventDefault(); submit(player.name); }} className="w-full px-4 py-2.5 text-left border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div className="font-oswald font-semibold text-[13px]">{player.flag} {player.name}</div>
                    <div className="text-[10px]" style={{ color: "#9a9a8a" }}>{player.nationality} · {player.position}</div>
                  </button>
                ))}
              </div>
            )}
            {wrong ? <div className="mt-2 text-[11px] font-semibold" style={{ color: "#b81c14" }}>{wrong} no está en este Top10.</div> : null}
          </div>
        ) : (
          <div className="rounded-2xl p-4" style={{ background: "#f0faf2", border: "1px solid rgba(30,107,46,0.18)" }}>
            <div className="text-[9px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#1e6b2e" }}>Resultado</div>
            <div className="font-bebas text-[34px] leading-none mt-1" style={{ color: "#18181b" }}>{guessed.length}/10</div>
            <p className="text-[12px] mt-2" style={{ color: "#5f5f66" }}>Fuente: <a href={challenge.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold underline">{challenge.sourceName}</a></p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {!finished ? <button onClick={surrender} className="rounded-xl px-4 py-3 text-[11px] font-semibold" style={{ background: "#f8f5f0", color: "#6b6b72" }}>Rendirse y ver ranking</button> : null}
          <button onClick={share} className="flex-1 rounded-xl px-4 py-3 text-[11px] font-semibold" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Resultado copiado" : "Compartir resultado"}</button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link href="/world-cups/album" className="text-[11px] font-semibold" style={{ color: "#174ea6" }}>Ver colección mundialista</Link>
          <DataReportButton modeId="top10-mundial" challengeId={challenge.id} />
        </div>
      </div>
    </section>
  );
}
