"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getCountrySuggestions, getDailyTitleRun } from "@/data/worldcups";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { buildScoreShare, shareGameResult } from "@/lib/resultShare";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackModeEntered } from "@/lib/analytics";

const MODE_ID = "camino-titulo";
const SEASON_ID = "world-cups";
const MAX_ATTEMPTS = 4;

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export default function CaminoTitulo() {
  const dayNumber = getDayNumber();
  const run = useMemo(() => getDailyTitleRun(dayNumber), [dayNumber]);
  const storageKey = `fbl-camino-titulo-${getDayKey()}`;
  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [won, setWon] = useState(false);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const completed = won || failed;
  const revealedCount = completed ? run.rivals.length : Math.min(run.rivals.length, 3 + guesses.length);
  const suggestions = useMemo(() => hideSuggestions ? [] : getCountrySuggestions(query), [hideSuggestions, query]);

  useEffect(() => {
    trackModeEntered(MODE_ID, SEASON_ID, { source: "game_page" });
    trackChallengeStarted(MODE_ID, run.id, { seasonId: SEASON_ID, modeId: MODE_ID, dayNumber });
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Array.isArray(saved.guesses)) setGuesses(saved.guesses);
      setWon(Boolean(saved.won));
      setFailed(Boolean(saved.failed));
    } catch {}
  }, [dayNumber, run.id, storageKey]);

  function persist(nextGuesses: string[], nextWon: boolean, nextFailed: boolean) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ guesses: nextGuesses, won: nextWon, failed: nextFailed }));
    } catch {}
  }

  function submitGuess(rawValue = query) {
    if (won || failed || !rawValue.trim()) return;

    const value = rawValue.trim();
    const ok = run.aliases.some((alias) => fold(alias) === fold(value));
    const nextGuesses = [...guesses, value];
    const nextFailed = !ok && nextGuesses.length >= MAX_ATTEMPTS;

    setGuesses(nextGuesses);
    setQuery("");
    setWon(ok);
    setFailed(nextFailed);
    persist(nextGuesses, ok, nextFailed);

    if (ok) trackChallengeCompleted(MODE_ID, run.id, { seasonId: SEASON_ID, modeId: MODE_ID, won: true, attempts: nextGuesses.length, dayNumber });
    if (nextFailed) trackChallengeFailed(MODE_ID, run.id, { seasonId: SEASON_ID, modeId: MODE_ID, won: false, attempts: nextGuesses.length, dayNumber });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitGuess();
  }

  function share() {
    const text = buildScoreShare("Camino al Título", won ? `Correcto en ${guesses.length}` : `${guesses.length}/${MAX_ATTEMPTS} intentos`, `${run.champion} ${run.year}`);
    shareGameResult(text, {
      modeId: MODE_ID,
      seasonId: SEASON_ID,
      challengeId: run.id,
      won,
      attempts: guesses.length,
      title: "Camino al Título",
      onCopied: () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
    });
  }

  return (
    <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}>
      <div className="px-5 py-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="absolute -right-7 -top-5 font-bebas text-[104px] opacity-15 leading-none">RUTA</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">Mundiales {"\u00b7"} #{dayNumber}</div>
        <h1 className="font-bebas text-[52px] leading-none">CAMINO AL TÍTULO</h1>
        <p className="text-[13px] text-white/78 mt-1">Adivina el campeón por los rivales que tuvo que superar.</p>
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-4">
        <div className="rounded-2xl p-4" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.24)" }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#c8920a" }}>Sede</div>
          <div className="font-bebas text-[42px] leading-none" style={{ color: "#18181b" }}>{run.host}</div>
          <div className="text-[12px] mt-1" style={{ color: "#8a8170" }}>{completed ? `Mundial ${run.year}` : "Año oculto hasta el resultado"}</div>
        </div>

        <div className="flex flex-col gap-2">
          {run.rivals.slice(0, revealedCount).map((rival, index) => (
            <div key={`${rival}-${index}`} className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.16)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-[11px]" style={{ background: "#174ea6", color: "white" }}>{index + 1}</div>
              <div className="font-oswald font-semibold text-[17px]" style={{ color: "#18181b" }}>{rival}</div>
            </div>
          ))}
          {revealedCount < run.rivals.length && (
            <div className="rounded-2xl px-4 py-3 text-center text-[12px] font-semibold" style={{ background: "#f3efe8", color: "#9a9a8a" }}>Falla para revelar más rivales</div>
          )}
        </div>

        {!won && !failed ? (
          <form onSubmit={submit} className="relative flex flex-col gap-2">
            <input
              value={query}
              onChange={(event) => { setQuery(event.target.value); setHideSuggestions(false); }}
              placeholder="Selección campeona..."
              className="w-full rounded-2xl px-4 py-4 font-oswald text-[19px] outline-none"
              style={{ border: "2px solid #d7d7d2", color: "#18181b" }}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[58px] z-30 rounded-2xl overflow-hidden max-h-60 overflow-y-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 14px 28px rgba(0,0,0,0.12)" }}>
                {suggestions.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setHideSuggestions(true);
                      setQuery(country);
                    }}
                    className="w-full text-left px-4 py-3 text-[14px] font-semibold hover:bg-slate-50"
                    style={{ color: "#18181b" }}
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
            <button type="submit" className="rounded-2xl py-4 font-oswald font-semibold uppercase tracking-wider" style={{ background: "#18181b", color: "white" }}>
              Probar
            </button>
          </form>
        ) : (
          <div className="rounded-2xl p-4" style={{ background: won ? "#ecfdf3" : "#fff1f1", border: `1px solid ${won ? "rgba(0,122,53,0.20)" : "rgba(210,36,36,0.18)"}` }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: won ? "#007a35" : "#c92a2a" }}>{won ? "Campeón recordado" : "Era"}</div>
            <h2 className="font-bebas text-[40px] leading-none mt-1" style={{ color: "#18181b" }}>{run.champion} {run.year}</h2>
            <p className="text-[13px] mt-1" style={{ color: "#5f645f" }}>Final: {run.champion} {"\u00b7"} {run.finalScore}</p>
            <p className="mt-3 rounded-xl px-3 py-3 text-[13px]" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", color: "#374151" }}>{run.note}</p>
            <button onClick={share} className="mt-4 w-full rounded-2xl py-4 font-oswald font-semibold uppercase tracking-wider" style={{ background: "#18181b", color: "white" }}>
              {copied ? "Resultado copiado" : "Compartir resultado"}
            </button>
          </div>
        )}

        {guesses.length > 0 && !won && !failed && (
          <div className="text-[12px]" style={{ color: "#8a8170" }}>{guesses.length}/{MAX_ATTEMPTS} intentos {"\u00b7"} probado: {guesses.join(", ")}</div>
        )}
        <Link href="/world-cups" className="text-center text-[12px] font-semibold" style={{ color: "#174ea6" }}>Volver a Mundiales</Link>
      </div>
    </section>
  );
}
