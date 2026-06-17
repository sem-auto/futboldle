"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { worldCupPlayers, type WorldCupPlayer } from "@/data/worldcups";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { buildScoreShare, shareGameResult } from "@/lib/resultShare";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackModeEntered } from "@/lib/analytics";

const MODE_ID = "once-mundial";
const SEASON_ID = "world-cups";
const SLOT_COUNT = 11;

const COUNTRY_POOL = ["Espana", "Alemania", "Argentina", "Brasil", "Francia", "Italia", "Portugal", "Inglaterra", "Holanda", "Uruguay", "Croacia", "Colombia", "Mexico", "Belgica", "Marruecos", "Corea del Sur"];

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function displayCountry(country: string) {
  const map: Record<string, string> = {
    Espana: "Espa\u00f1a",
    Mexico: "M\u00e9xico",
    Belgica: "B\u00e9lgica",
  };
  return map[country] ?? country;
}

function countryCode(country: string) {
  const map: Record<string, string> = {
    Espana: "ES",
    Alemania: "DE",
    Argentina: "AR",
    Brasil: "BR",
    Francia: "FR",
    Italia: "IT",
    Portugal: "PT",
    Inglaterra: "ENG",
    Holanda: "NL",
    Uruguay: "URU",
    Croacia: "HR",
    Colombia: "COL",
    Mexico: "MX",
    Belgica: "BE",
    Marruecos: "MAR",
    "Corea del Sur": "KOR",
  };
  return map[country] ?? "INT";
}

function dailyCountries(dayNumber: number) {
  return Array.from({ length: SLOT_COUNT }, (_, index) => COUNTRY_POOL[(dayNumber * 3 + index * 5) % COUNTRY_POOL.length]);
}

function isPlayerMatch(input: string, player: WorldCupPlayer) {
  const q = fold(input);
  return [player.name, ...player.aliases].some(alias => fold(alias) === q);
}

function suggestionsFor(query: string, usedIds: string[]) {
  const q = fold(query);
  if (q.length < 2) return [];
  const used = new Set(usedIds);
  return worldCupPlayers
    .filter(player => !used.has(player.id))
    .filter(player => [player.name, ...player.aliases].some(alias => fold(alias).includes(q)))
    .sort((a, b) => {
      const aStarts = fold(a.name).startsWith(q) ? 0 : 1;
      const bStarts = fold(b.name).startsWith(q) ? 0 : 1;
      return aStarts - bStarts || a.name.localeCompare(b.name);
    })
    .slice(0, 8);
}

type SavedState = {
  placed: { country: string; playerId: string; name: string }[];
  misses: string[];
  won: boolean;
  failed: boolean;
};

function emptyState(): SavedState {
  return { placed: [], misses: [], won: false, failed: false };
}

export default function OnceMundial() {
  const dayNumber = getDayNumber();
  const countries = useMemo(() => dailyCountries(dayNumber), [dayNumber]);
  const storageKey = `fbl-once-mundial-${getDayKey()}`;
  const [state, setState] = useState<SavedState>(emptyState);
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const currentCountry = countries[state.placed.length] ?? null;
  const suggestions = useMemo(() => hideSuggestions ? [] : suggestionsFor(query, state.placed.map(item => item.playerId)), [hideSuggestions, query, state.placed]);

  useEffect(() => {
    trackModeEntered(MODE_ID, SEASON_ID, { source: "game_page" });
    trackChallengeStarted(MODE_ID, getDayKey(), { seasonId: SEASON_ID, modeId: MODE_ID, dayNumber });
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setState({ ...emptyState(), ...JSON.parse(raw) });
    } catch {}
  }, [dayNumber, storageKey]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
  }, [state, storageKey]);

  function submit(raw = query) {
    if (!currentCountry || state.won || state.failed) return;
    const value = raw.trim();
    if (!value) return;
    const player = worldCupPlayers.find(item => isPlayerMatch(value, item));
    if (!player) {
      setFeedback("No encuentro ese jugador.");
      return;
    }
    if (player.nationality !== currentCountry) {
      setState(prev => ({ ...prev, misses: [...prev.misses, player.name] }));
      setFeedback(`${player.name} no es de ${displayCountry(currentCountry)}.`);
      setQuery("");
      setHideSuggestions(true);
      return;
    }
    const nextPlaced = [...state.placed, { country: currentCountry, playerId: player.id, name: player.name }];
    const won = nextPlaced.length >= SLOT_COUNT;
    const next = { ...state, placed: nextPlaced, won };
    setState(next);
    setQuery("");
    setHideSuggestions(true);
    setFeedback(won ? "Once mundial completado." : "Correcto. Siguiente selecci\u00f3n.");
    if (won) trackChallengeCompleted(MODE_ID, getDayKey(), { seasonId: SEASON_ID, modeId: MODE_ID, won: true, attempts: nextPlaced.length, dayNumber });
  }

  function fail() {
    const next = { ...state, failed: true };
    setState(next);
    trackChallengeFailed(MODE_ID, getDayKey(), { seasonId: SEASON_ID, modeId: MODE_ID, won: false, attempts: state.placed.length, dayNumber });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit(suggestions[0]?.name ?? query);
  }

  function share() {
    const text = buildScoreShare("Once Mundial", `${state.placed.length}/11 colocados`, state.won ? "Once completado" : "Reto mundialista");
    shareGameResult(text, {
      modeId: MODE_ID,
      seasonId: SEASON_ID,
      challengeId: getDayKey(),
      won: state.won,
      attempts: state.placed.length,
      title: "Once Mundial",
      onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1800); },
    });
  }

  return (
    <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}>
      <div className="px-5 py-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="absolute -right-4 -top-7 font-bebas text-[118px] opacity-15 leading-none">11</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">Mundiales · #{dayNumber}</div>
        <h1 className="font-bebas text-[52px] leading-none">ONCE MUNDIAL</h1>
        <p className="text-[13px] text-white/78 mt-1">Te sale una selecci\u00f3n. Pon un jugador mundialista de ese pa\u00eds.</p>
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-4">
        {currentCountry && !state.won && !state.failed && (
          <div className="rounded-2xl p-5 text-center" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.24)" }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#c8920a" }}>Selecci\u00f3n actual</div>
            <div className="font-bebas text-[44px] leading-none mt-1" style={{ color: "#18181b" }}>{countryCode(currentCountry)} {displayCountry(currentCountry)}</div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 rounded-2xl p-3" style={{ background: "#e8f4ec", border: "1px solid rgba(30,107,46,0.18)" }}>
          {countries.map((country, index) => {
            const placed = state.placed[index];
            const active = index === state.placed.length && !state.won && !state.failed;
            return (
              <div key={`${country}-${index}`} className="rounded-xl min-h-[58px] flex flex-col items-center justify-center text-center px-2"
                style={{ background: placed ? "white" : active ? "#fffaf0" : "rgba(255,255,255,0.55)", border: `1px solid ${active ? "rgba(200,146,10,0.50)" : "rgba(0,0,0,0.08)"}` }}>
                <div className="text-[9px] font-black" style={{ color: placed ? "#1e6b2e" : active ? "#c8920a" : "#9a9a8a" }}>{placed ? countryCode(country) : active ? "AHORA" : countryCode(country)}</div>
                <div className="font-oswald font-semibold text-[12px] leading-tight" style={{ color: "#18181b" }}>{placed ? placed.name : "????"}</div>
                <div className="text-[8px]" style={{ color: "#9a9a8a" }}>{displayCountry(country)}</div>
              </div>
            );
          })}
        </div>

        {!state.won && !state.failed ? (
          <form onSubmit={onSubmit} className="relative flex flex-col gap-2">
            <input
              value={query}
              onChange={event => { setQuery(event.target.value); setHideSuggestions(false); }}
              placeholder={currentCountry ? `Jugador de ${displayCountry(currentCountry)}...` : "Jugador mundialista..."}
              className="w-full rounded-2xl px-4 py-4 font-oswald text-[19px] outline-none"
              style={{ border: "2px solid #d7d7d2", color: "#18181b" }}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[58px] z-20 rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 14px 28px rgba(0,0,0,0.12)" }}>
                {suggestions.map(player => (
                  <button key={player.id} type="button" onMouseDown={event => { event.preventDefault(); setHideSuggestions(true); submit(player.name); }}
                    className="w-full text-left px-4 py-3 text-[14px] font-semibold hover:bg-slate-50" style={{ color: "#18181b" }}>
                    <span className="font-black text-[10px] mr-2">{countryCode(player.nationality)}</span>{player.name}
                    <span className="block text-[10px] font-normal" style={{ color: "#9a9a8a" }}>{displayCountry(player.nationality)} · {player.position}</span>
                  </button>
                ))}
              </div>
            )}
            <button type="submit" className="rounded-2xl py-4 font-oswald font-semibold uppercase tracking-wider" style={{ background: "#18181b", color: "white" }}>
              Colocar
            </button>
            <button type="button" onClick={fail} className="text-[11px] font-semibold opacity-60">Rendirse y ver resultado</button>
          </form>
        ) : (
          <div className="rounded-2xl p-4" style={{ background: state.won ? "#ecfdf3" : "#fff1f1", border: `1px solid ${state.won ? "rgba(0,122,53,0.20)" : "rgba(210,36,36,0.18)"}` }}>
            <div className="font-bebas text-[34px] leading-none" style={{ color: "#18181b" }}>{state.won ? "ONCE COMPLETADO" : "FIN DEL RETO"}</div>
            <p className="text-[13px] mt-1" style={{ color: "#5f645f" }}>{state.placed.length}/11 jugadores colocados.</p>
            <button onClick={share} className="mt-4 w-full rounded-2xl py-4 font-oswald font-semibold uppercase tracking-wider" style={{ background: "#18181b", color: "white" }}>
              {copied ? "Resultado copiado" : "Compartir resultado"}
            </button>
          </div>
        )}

        {feedback && <div className="text-[12px] font-semibold" style={{ color: feedback.includes("Correcto") || feedback.includes("completado") ? "#007a35" : "#c8920a" }}>{feedback}</div>}
        <Link href="/world-cups" className="text-center text-[12px] font-semibold" style={{ color: "#174ea6" }}>Volver a Mundiales</Link>
      </div>
    </section>
  );
}
