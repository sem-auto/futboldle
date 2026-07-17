"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DataReportButton from "@/components/DataReportButton";
import { getDailyWorldCupTop10, worldCupPlayers } from "@/data/worldcups";
import type { WorldCupPlayer } from "@/data/worldcups";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackModeEntered } from "@/lib/analytics";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { matchesFootballAlias } from "@/lib/playerAliases";
import { normalize } from "@/lib/normalize";
import { shareGameResult } from "@/lib/resultShare";
import { FUTBOLDLE_URL } from "@/lib/share";
import { useChallengeLifecycle } from "@/lib/useChallengeLifecycle";
import { unlockWorldCupCard } from "@/lib/worldCupCollection";

function score(player: WorldCupPlayer, query: string) {
  const q = normalize(query);
  if (q.length < 2) return 99;
  const name = normalize(player.name);
  const words = player.name.split(/\s+/).map(normalize);
  const aliases = player.aliases.map(normalize);
  if (name.startsWith(q) || aliases.some(alias => alias.startsWith(q))) return 0;
  if (words.some(word => word.startsWith(q))) return 1;
  if (name.includes(q) || aliases.some(alias => alias.includes(q))) return 2;
  return 99;
}

function countryCode(nationality: string) {
  const key = normalize(nationality);
  const codes: Record<string, string> = {
    alemania: "DE",
    argentina: "AR",
    belgica: "BE",
    brasil: "BR",
    camerun: "CM",
    colombia: "CO",
    coreadelsur: "KR",
    croacia: "HR",
    dinamarca: "DK",
    espana: "ES",
    estadosunidos: "US",
    francia: "FR",
    gales: "WAL",
    ghana: "GH",
    holanda: "NL",
    inglaterra: "ENG",
    italia: "IT",
    japon: "JP",
    marruecos: "MA",
    mexico: "MX",
    nigeria: "NG",
    paisesbajos: "NL",
    paraguay: "PY",
    peru: "PE",
    polonia: "PL",
    portugal: "PT",
    republicacheca: "CZ",
    rusia: "RU",
    senegal: "SN",
    serbia: "RS",
    suecia: "SE",
    suiza: "CH",
    uruguay: "UY",
  };
  return codes[key] ?? "WC";
}

function flagEmoji(nationality: string) {
  const code = countryCode(nationality);
  if (code === "ENG" || code === "WAL" || code === "WC") return code;
  if (code.length !== 2) return "WC";
  return code
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function FlagChip({ nationality, compact = false }: { nationality: string; compact?: boolean }) {
  const code = countryCode(nationality);
  const flag = flagEmoji(nationality);
  return (
    <span
      className="inline-flex items-center justify-center gap-1 rounded-md font-oswald font-semibold shadow-sm"
      style={{
        minWidth: compact ? 34 : 48,
        paddingInline: compact ? 5 : 7,
        height: compact ? 24 : 30,
        background: "linear-gradient(135deg,#0f172a,#174ea6)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.28)",
        fontSize: compact ? 11 : 13,
        letterSpacing: "0.04em",
      }}
      aria-label={nationality}
      title={nationality}
    >
      <span>{flag}</span>
      {!compact ? <span className="text-[10px] opacity-80">{code}</span> : null}
    </span>
  );
}

function maskedName(name: string) {
  return name
    .split(/\s+/)
    .map(part => `${part[0] ?? ""}${"_".repeat(Math.max(0, part.length - 1))}`)
    .join(" ");
}

function rarityLabel(level?: string) {
  if (level === "icono") return "Leyenda";
  if (level === "legendario") return "Legendario";
  if (level === "core") return "Estrella";
  return "Culto";
}

export default function Top10Mundial({ onBack }: { onBack?: () => void }) {
  const challenge = getDailyWorldCupTop10(getDayNumber());
  const storageKey = `fbl-wc-top10-${getDayKey()}-${challenge.id}`;
  const [query, setQuery] = useState("");
  const [guessed, setGuessed] = useState<string[]>([]);
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wrong, setWrong] = useState("");
  const [startedAt] = useState(() => Date.now());

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    const usedTerms = new Set([
      ...guessed,
      ...allGuesses.map(normalize),
      ...challenge.answers
        .filter(answer => guessed.includes(answer.playerId))
        .flatMap(answer => [answer.name, ...answer.aliases].map(normalize)),
    ]);

    return worldCupPlayers
      .filter(player => {
        if (usedTerms.has(player.id) || usedTerms.has(normalize(player.name))) return false;
        return !player.aliases.some(alias => usedTerms.has(normalize(alias)));
      })
      .map(player => ({ player, score: score(player, query) }))
      .filter(item => item.score < 99)
      .sort((a, b) => a.score - b.score || a.player.name.localeCompare(b.player.name, "es"))
      .slice(0, 8)
      .map(item => item.player);
  }, [allGuesses, challenge.answers, guessed, query]);

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
        setHintsUsed(Math.min(1, Number(saved.hintsUsed) || 0));
        setFinished(!!saved.finished);
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    trackModeEntered("top10-mundial", "world-cups", { challengeId: challenge.id });
    trackChallengeStarted("top10-mundial", challenge.id, { seasonId: "world-cups" });
  }, [challenge.id]);

  function persist(nextGuessed: string[], nextAll: string[], nextFinished: boolean, nextHints = hintsUsed) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ guessed: nextGuessed, allGuesses: nextAll, hintsUsed: nextHints, finished: nextFinished }));
    } catch {}
  }

  function submit(value: string) {
    if (finished) return;
    const hit = challenge.answers.find(answer => matchesFootballAlias(value, [answer.name, ...answer.aliases]));
    const nextAll = [...allGuesses, value];
    setAllGuesses(nextAll);
    setQuery("");

    if (!hit) {
      setWrong(value);
      setTimeout(() => setWrong(""), 1400);
      persist(guessed, nextAll, false);
      return;
    }

    if (guessed.includes(hit.playerId)) {
      setWrong(`${hit.name} ya estaba acertado`);
      setTimeout(() => setWrong(""), 1400);
      persist(guessed, nextAll, false);
      return;
    }

    const nextGuessed = [...guessed, hit.playerId];
    const complete = nextGuessed.length === challenge.answers.length;
    setGuessed(nextGuessed);
    setFinished(complete);
    const unlocked = unlockWorldCupCard(hit.playerId, challenge.id);
    if (unlocked) {
      const player = worldCupPlayers.find(item => item.id === hit.playerId);
      window.dispatchEvent(new CustomEvent("fbl-card-unlocked", {
        detail: {
          name: hit.name,
          rarity: rarityLabel(player?.iconicLevel),
          clubs: player?.clubsByWorldCup?.map(item => item.club) ?? [],
          position: hit.position,
          source: "Top10 Mundial",
          season: challenge.period,
          collectionUrl: "/world-cups/album",
        },
      }));
    }
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

  function handleHint() {
    const nextHints = Math.min(1, hintsUsed + 1);
    setHintsUsed(nextHints);
    persist(guessed, allGuesses, finished, nextHints);
  }

  function share() {
    const grid = challenge.answers.map(answer => guessed.includes(answer.playerId) ? "\u{1F7E9}" : "\u2B1B").join("");
    const text = [
      `Top10 Mundial #${getDayNumber()}`,
      grid,
      `${guessed.length}/${challenge.answers.length} encontrados`,
      `Dificultad: ${challenge.difficulty}`,
      "",
      "¿Puedes superarme?",
      FUTBOLDLE_URL,
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
  const wrongCount = Math.max(0, allGuesses.length - guessed.length);
  const unsolvedAnswer = challenge.answers.find(answer => !guessed.includes(answer.playerId));

  return (
    <section className="mx-auto max-w-3xl rounded-[28px] overflow-hidden" style={{ background: "white", boxShadow: "0 14px 34px rgba(0,0,0,0.09)" }}>
      <header className="px-5 py-5 md:px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="absolute right-4 -top-5 font-bebas text-[110px] leading-none text-white/10">10</div>
        {onBack ? <button onClick={onBack} className="relative z-10 text-[11px] font-semibold text-white/70 mb-4">Volver</button> : null}
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

        {!finished ? (
          <div className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(23,78,166,0.12)" }}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#174ea6" }}>Recompensas</div>
            <div className="flex flex-col gap-1.5">
              <div className="font-oswald font-semibold text-[13px]" style={{ color: "#18181b" }}>
                10 cromos mundialistas desbloqueables
              </div>
              <div className="text-[11px]" style={{ color: "#6b6b72" }}>Incluye jugadores de distintas selecciones y rarezas.</div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          {challenge.answers.map((answer, index) => {
            const revealed = guessed.includes(answer.playerId) || finished;
            return (
              <div key={`${answer.playerId}-${index}`} className="rounded-xl px-3 py-2.5 flex items-center gap-3" style={{ background: revealed ? "#eef3ff" : "#fbfaf7", border: `1px solid ${revealed ? "rgba(23,78,166,0.18)" : "rgba(0,0,0,0.07)"}` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bebas text-[20px]" style={{ background: revealed ? "#174ea6" : "#e6e0d6", color: revealed ? "white" : "#9a9a8a" }}>{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-oswald font-semibold text-[15px]" style={{ color: revealed ? "#18181b" : "#9a9a8a" }}>
                    {revealed ? <><FlagChip nationality={answer.nationality} compact /> <span className="ml-2">{answer.name}</span></> : "?????"}
                  </div>
                  <div className="mt-1">
                    {revealed ? (
                      <span className="text-[10px]" style={{ color: "#8a8a80" }}>{answer.label}</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FlagChip nationality={answer.nationality} />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#9a9a8a" }}>Bandera</span>
                      </div>
                    )}
                  </div>
                </div>
                {revealed ? <span className="text-[12px] font-semibold" style={{ color: "#174ea6" }}>OK</span> : null}
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
                    <div className="font-oswald font-semibold text-[13px]"><FlagChip nationality={player.nationality} compact /> <span className="ml-2">{player.name}</span></div>
                    <div className="text-[10px] mt-1" style={{ color: "#9a9a8a" }}>{player.nationality} · {player.position}</div>
                  </button>
                ))}
              </div>
            )}
            {wrong ? <div className="mt-2 text-[11px] font-semibold" style={{ color: "#b81c14" }}>{wrong}{wrong.includes("acertado") ? "." : " no está en este Top10."}</div> : null}
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: "#f0faf2", border: "1px solid rgba(30,107,46,0.18)", boxShadow: "0 8px 28px rgba(23,78,166,0.10)" }}>
            <div className="px-4 py-3" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
              <div className="text-[9px] uppercase font-semibold tracking-[0.18em] text-white/65">Resultado mundialista</div>
              <div className="font-bebas text-[34px] leading-none mt-1">{guessed.length}/10</div>
              <p className="text-[11px] text-white/70 mt-1">Reta a tu grupo sin revelar el ranking completo.</p>
            </div>
            <div className="p-4">
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="rounded-xl p-2 text-center" style={{ background: "white" }}>
                <div className="font-bebas text-[22px] leading-none" style={{ color: "#174ea6" }}>{guessed.length}</div>
                <div className="text-[8px] uppercase font-semibold tracking-[0.12em]" style={{ color: "#6b6b72" }}>Aciertos</div>
              </div>
              <div className="rounded-xl p-2 text-center" style={{ background: "white" }}>
                <div className="font-bebas text-[22px] leading-none" style={{ color: "#b81c14" }}>{wrongCount}</div>
                <div className="text-[8px] uppercase font-semibold tracking-[0.12em]" style={{ color: "#6b6b72" }}>Fallos</div>
              </div>
              <div className="rounded-xl p-2 text-center" style={{ background: "white" }}>
                <div className="font-bebas text-[22px] leading-none" style={{ color: "#c8920a" }}>{challenge.difficulty}</div>
                <div className="text-[8px] uppercase font-semibold tracking-[0.12em]" style={{ color: "#6b6b72" }}>Nivel</div>
              </div>
            </div>
            <div className="rounded-xl p-3 mt-3" style={{ background: "white", border: "1px solid rgba(23,78,166,0.10)" }}>
              <div className="text-[9px] uppercase font-semibold tracking-[0.16em]" style={{ color: "#174ea6" }}>Fuente</div>
              <p className="text-[12px] mt-1" style={{ color: "#5f5f66" }}>
                <a href={challenge.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold underline">{challenge.sourceName}</a>
                <span> · {challenge.period}</span>
              </p>
              <p className="text-[11px] mt-1" style={{ color: "#8a8a80" }}>{challenge.criterion}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              <Link href="/world-cups/album" className="rounded-xl px-4 py-3 text-center text-[11px] font-semibold" style={{ background: "#eef3ff", color: "#174ea6", border: "1px solid rgba(23,78,166,0.14)" }}>Ver colección</Link>
              <Link href="/world-cups" className="rounded-xl px-4 py-3 text-center text-[11px] font-semibold" style={{ background: "#18181b", color: "white" }}>Más retos mundiales</Link>
            </div>
            </div>
          </div>
        )}

        {!finished && unsolvedAnswer && hintsUsed > 0 ? (
          <div className="rounded-xl p-3.5" style={{ background: "#fffbf0", border: "1px solid rgba(200,146,10,0.25)" }}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "#c8920a" }}>
              Pista del jugador oculto
            </div>
            <div className="flex flex-col gap-1">
              {hintsUsed >= 1 ? (
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] w-24 flex-shrink-0" style={{ color: "#c8920a" }}>Bandera</span>
                  <FlagChip nationality={unsolvedAnswer.nationality} />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-2">
          {!finished && hintsUsed < 1 && unsolvedAnswer ? (
            <button
              onClick={handleHint}
              className="rounded-xl px-4 py-3 text-[11px] font-semibold"
              style={{ background: "#fffbf0", border: "1px solid rgba(200,146,10,0.30)", color: "#c8920a" }}
            >
              Pista de bandera
            </button>
          ) : null}
          {!finished ? <button onClick={surrender} className="rounded-xl px-4 py-3 text-[11px] font-semibold" style={{ background: "#f8f5f0", color: "#6b6b72" }}>Rendirse y ver ranking</button> : null}
          <button onClick={share} className="flex-1 rounded-xl px-4 py-3 text-[11px] font-semibold" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Resultado copiado" : "Compartir reto"}</button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link href="/world-cups/album" className="text-[11px] font-semibold" style={{ color: "#174ea6" }}>Ver colección mundialista</Link>
          <DataReportButton modeId="top10-mundial" challengeId={challenge.id} />
        </div>
      </div>
    </section>
  );
}


