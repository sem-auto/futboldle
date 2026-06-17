"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getCountrySuggestions,
  getDailyWorldCupChampion,
  isCountryAnswer,
  worldCupChampionChallenges,
} from "@/data/worldcups";
import { getDayKey, getDayNumber } from "@/lib/daily";
import {
  trackChallengeCompleted,
  trackChallengeFailed,
  trackChallengeStarted,
  trackModeEntered,
} from "@/lib/analytics";
import { buildScoreShare, shareGameResult } from "@/lib/resultShare";

type Mode = "normal" | "hard";
type Phase = "champion" | "runnerUp" | "done";
type SavedState = {
  mode: Mode;
  phase: Phase;
  won: boolean;
  failed: boolean;
  attempts: string[];
  championSolved: boolean;
};

const MODE_ID = "worldcup-champions";
const SEASON_ID = "world-cups";
const MAX_ATTEMPTS = 5;

function emptyState(mode: Mode): SavedState {
  return { mode, phase: "champion", won: false, failed: false, attempts: [], championSolved: false };
}

function getStorageKey(mode: Mode) {
  return `fbl-worldcup-champions-${mode}-${getDayKey()}`;
}

function safeReadState(mode: Mode): SavedState {
  if (typeof window === "undefined") return emptyState(mode);
  try {
    const raw = window.localStorage.getItem(getStorageKey(mode));
    if (!raw) return emptyState(mode);
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      mode,
      phase: parsed.phase === "runnerUp" || parsed.phase === "done" ? parsed.phase : "champion",
      won: Boolean(parsed.won),
      failed: Boolean(parsed.failed),
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts.filter((item) => typeof item === "string") : [],
      championSolved: Boolean(parsed.championSolved),
    };
  } catch {
    window.localStorage.removeItem(getStorageKey(mode));
    return emptyState(mode);
  }
}

function saveState(state: SavedState) {
  try {
    window.localStorage.setItem(getStorageKey(state.mode), JSON.stringify(state));
  } catch {}
}

export default function WorldCupChampions() {
  const dayNumber = getDayNumber();
  const challenge = useMemo(() => getDailyWorldCupChampion(dayNumber), [dayNumber]);
  const [mode, setMode] = useState<Mode>("normal");
  const [state, setState] = useState<SavedState>(() => emptyState("normal"));
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const suggestions = useMemo(() => hideSuggestions ? [] : getCountrySuggestions(input), [hideSuggestions, input]);

  useEffect(() => {
    trackModeEntered(MODE_ID, SEASON_ID, { source: "game_page" });
    trackChallengeStarted(MODE_ID, String(challenge.year), {
      seasonId: SEASON_ID,
      dayNumber,
      difficulty: mode,
    });
  }, [challenge.year, dayNumber, mode]);

  useEffect(() => {
    setState(safeReadState(mode));
    setInput("");
    setFeedback("");
  }, [mode]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const currentTarget = state.phase === "runnerUp" ? challenge.runnerUp : challenge.champion;
  const currentLabel = state.phase === "runnerUp" ? "finalista" : "campe\u00f3n";
  const completed = state.won || state.failed;

  function finish(won: boolean, nextState: SavedState) {
    const payload = {
      seasonId: SEASON_ID,
      modeId: MODE_ID,
      challengeId: String(challenge.year),
      dayNumber,
      won,
      attempts: nextState.attempts.length,
      difficulty: mode,
    };
    if (won) trackChallengeCompleted(MODE_ID, String(challenge.year), payload);
    else trackChallengeFailed(MODE_ID, String(challenge.year), payload);
  }

  function submitGuess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || completed) return;

    const cleanInput = input.trim();
    const nextAttempts = [...state.attempts, cleanInput];
    const correct = isCountryAnswer(cleanInput, currentTarget);

    if (correct && mode === "normal") {
      const next = { ...state, attempts: nextAttempts, won: true, phase: "done" as Phase, championSolved: true };
      setState(next);
      setFeedback("Correcto. Sab\u00edas perfectamente de que Mundial hablamos.");
      setInput("");
      finish(true, next);
      return;
    }

    if (correct && state.phase === "champion") {
      const next = { ...state, attempts: nextAttempts, championSolved: true, phase: "runnerUp" as Phase };
      setState(next);
      setFeedback("Campe\u00f3n correcto. Ahora busca el finalista.");
      setInput("");
      return;
    }

    if (correct && state.phase === "runnerUp") {
      const next = { ...state, attempts: nextAttempts, won: true, phase: "done" as Phase };
      setState(next);
      setFeedback("Perfecto. Campe\u00f3n y finalista.");
      setInput("");
      finish(true, next);
      return;
    }

    if (nextAttempts.length >= MAX_ATTEMPTS) {
      const next = { ...state, attempts: nextAttempts, failed: true, phase: "done" as Phase };
      setState(next);
      setFeedback("Hoy se escapó. Mañana hay otro Mundial.");
      setInput("");
      finish(false, next);
      return;
    }

    setState({ ...state, attempts: nextAttempts });
    setFeedback(`No era ese ${currentLabel}.`);
    setInput("");
  }

  function resetMode(nextMode: Mode) {
    setMode(nextMode);
  }

  function share() {
    const score =
      mode === "hard"
        ? `${state.won ? "Campe\u00f3n y finalista" : "Fallado"} - ${state.attempts.length}/${MAX_ATTEMPTS}`
        : `${state.won ? "Campe\u00f3n acertado" : "Fallado"} - ${state.attempts.length}/${MAX_ATTEMPTS}`;
    const detail = `${challenge.year}: ${challenge.champion}${mode === "hard" ? ` vs ${challenge.runnerUp}` : ""}`;
    const text = buildScoreShare("Campeones del Mundo", score, detail);
    shareGameResult(text, {
      modeId: MODE_ID,
      seasonId: SEASON_ID,
      challengeId: String(challenge.year),
      won: state.won,
      attempts: state.attempts.length,
      title: "Campeones del Mundo",
      onCopied: () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      },
    });
  }

  return (
    <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}>
      <div className="px-5 py-6 md:px-7" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">Mundiales · #{dayNumber}</div>
        <h1 className="font-bebas text-[48px] md:text-[60px] leading-none">CAMPEONES DEL MUNDO</h1>
        <p className="text-[14px] text-white/82 mt-1">Te digo el año. Adivina quién levantó la Copa.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => resetMode("normal")}
            className="rounded-full px-3 py-2 text-[11px] font-semibold"
            style={{ background: mode === "normal" ? "white" : "rgba(255,255,255,0.16)", color: mode === "normal" ? "#174ea6" : "white" }}
          >
            Normal: campe{"\u00f3"}n
          </button>
          <button
            type="button"
            onClick={() => resetMode("hard")}
            className="rounded-full px-3 py-2 text-[11px] font-semibold"
            style={{ background: mode === "hard" ? "white" : "rgba(255,255,255,0.16)", color: mode === "hard" ? "#174ea6" : "white" }}
          >
            Dif{"\u00ed"}cil: campe{"\u00f3"}n + finalista
          </button>
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-4">
        <div className="rounded-2xl p-5 text-center" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.24)" }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#c8920a" }}>Mundial</div>
          <div className="font-bebas text-[58px] leading-none mt-1" style={{ color: "#18181b" }}>{challenge.year}</div>
          <div className="text-[12px]" style={{ color: "#8a8170" }}>Sede: {challenge.host}</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl p-3" style={{ background: state.championSolved ? "#ecfdf3" : "#f8fafc", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: state.championSolved ? "#007a35" : "#9a9a8a" }}>Campe{"\u00f3"}n</div>
            <div className="font-oswald font-semibold text-[18px]" style={{ color: state.championSolved || completed ? "#18181b" : "#a0a0a0" }}>
              {state.championSolved || completed ? challenge.champion : "????"}
            </div>
          </div>
          <div className="rounded-2xl p-3" style={{ background: state.won && mode === "hard" ? "#ecfdf3" : "#f8fafc", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: state.won && mode === "hard" ? "#007a35" : "#9a9a8a" }}>Finalista</div>
            <div className="font-oswald font-semibold text-[18px]" style={{ color: completed ? "#18181b" : "#a0a0a0" }}>
              {completed ? challenge.runnerUp : mode === "hard" ? "????" : "Modo dif\u00edcil"}
            </div>
          </div>
        </div>

        {!completed ? (
          <form onSubmit={submitGuess} className="relative flex flex-col gap-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9a9a8a" }}>
              Escribe el {currentLabel}
            </label>
            <input
              value={input}
              onChange={(event) => { setInput(event.target.value); setHideSuggestions(false); }}
              placeholder={state.phase === "runnerUp" ? "Pa\u00eds finalista..." : "Pa\u00eds campe\u00f3n..."}
              className="w-full rounded-2xl px-4 py-4 font-oswald text-[20px] outline-none"
              style={{ border: "2px solid #d7d7d2", color: "#18181b" }}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[88px] z-20 rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 14px 28px rgba(0,0,0,0.12)" }}>
                {suggestions.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => { setInput(country); setHideSuggestions(true); }}
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
          <div className="rounded-2xl p-4" style={{ background: state.won ? "#ecfdf3" : "#fff1f1", border: `1px solid ${state.won ? "rgba(0,122,53,0.20)" : "rgba(210,36,36,0.18)"}` }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: state.won ? "#007a35" : "#c92a2a" }}>
              {state.won ? "Recuerdo desbloqueado" : "Resultado"}
            </div>
            <h2 className="font-bebas text-[38px] leading-none mt-1" style={{ color: "#18181b" }}>
              {challenge.champion} {challenge.year}
            </h2>
            <p className="text-[13px] mt-1" style={{ color: "#5f645f" }}>
              Campe{"\u00f3"}n: {challenge.champion} · Finalista: {challenge.runnerUp} · Final: {challenge.finalScore}
            </p>
            {challenge.note && (
              <p className="mt-3 rounded-xl px-3 py-3 text-[13px]" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", color: "#374151" }}>
                Sab{"\u00ed"}as que... este Mundial se recuerda por el {challenge.note}.
              </p>
            )}
            <button onClick={share} className="mt-4 w-full rounded-2xl py-4 font-oswald font-semibold uppercase tracking-wider" style={{ background: "#18181b", color: "white" }}>
              {copied ? "Resultado copiado" : "Compartir resultado"}
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]" style={{ color: "#8a8170" }}>
          <span>{state.attempts.length}/{MAX_ATTEMPTS} intentos</span>
          <span>{worldCupChampionChallenges.length} Mundiales hist{"\u00f3"}ricos</span>
        </div>

        {feedback && <div className="text-[12px] font-semibold" style={{ color: state.won ? "#007a35" : "#c8920a" }}>{feedback}</div>}

        {state.attempts.length > 0 && (
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#9a9a8a" }}>Intentos</div>
            <div className="flex flex-wrap gap-2">
              {state.attempts.map((item, index) => (
                <span key={`${item}-${index}`} className="rounded-full px-3 py-2 text-[12px] font-semibold" style={{ background: "#f2f0e9", color: "#555" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link href="/world-cups" className="text-center text-[12px] font-semibold" style={{ color: "#174ea6" }}>
          Volver a Mundiales
        </Link>
      </div>
    </section>
  );
}
