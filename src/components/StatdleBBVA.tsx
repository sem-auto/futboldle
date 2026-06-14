"use client";

import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDailyStatdleChallenge } from "@/data/statdleChallenges";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameResult } from "@/lib/profile";
import { buildProgressiveShare, shareGameResult } from "@/lib/resultShare";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackEvent, trackModeEntered } from "@/lib/analytics";

const MAX_ATTEMPTS = 6;

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isMatch(input: string, player: { answer: string; fullName: string; displayName: string }) {
  const guess = fold(input);
  return [player.answer, player.fullName, player.displayName].some(value => fold(value) === guess);
}

function suggestionsFor(query: string) {
  const q = fold(query);
  if (q.length < 2) return [];
  return bbvaPlayers
    .filter(player => {
      const names = [player.displayName, player.fullName, player.answer];
      return names.some(name => fold(name).includes(q));
    })
    .sort((a, b) => {
      const aName = fold(a.displayName);
      const bName = fold(b.displayName);
      const aStarts = aName.startsWith(q) ? 0 : 1;
      const bStarts = bName.startsWith(q) ? 0 : 1;
      return aStarts - bStarts || aName.localeCompare(bName);
    })
    .slice(0, 8);
}

export default function StatdleBBVA({ onBack }: { onBack: () => void }) {
  const challenge = getDailyStatdleChallenge(getDayNumber());
  const player = bbvaPlayers.find(item => item.id === challenge.playerId);
  const storageKey = `fbl-statdle-${getDayKey()}`;
  const doneKey = `fbl-statdle-done-${getDayKey()}`;

  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const suggestions = useMemo(() => suggestionsFor(query), [query]);
  const revealedCount = Math.min(challenge.clues.length, Math.max(1, guesses.length + 1));

  useEffect(() => {
    trackModeEntered("statdle-bbva", "bbva", { challenge: challenge.id });
    trackChallengeStarted("statdle-bbva", challenge.id, { seasonId: "bbva" });
    trackEvent("mode_started", { mode: "statdle", season: "bbva" });
    trackEvent("statdle_started", { challenge: challenge.id });
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Array.isArray(saved.guesses)) setGuesses(saved.guesses);
      setWon(!!saved.won);
      setGameOver(!!saved.gameOver);
    } catch {}
  }, [challenge.id, storageKey]);

  function persist(nextGuesses: string[], nextWon: boolean, nextGameOver: boolean) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        challengeId: challenge.id,
        guesses: nextGuesses,
        won: nextWon,
        gameOver: nextGameOver,
      }));
      if (nextGameOver) localStorage.setItem(doneKey, nextWon ? "won" : "lost");
    } catch {}
  }

  function submit(rawName = query) {
    if (!player || gameOver) return;
    const value = rawName.trim();
    if (!value) return;
    if (guesses.some(guess => fold(guess) === fold(value))) return;

    const correct = isMatch(value, player);
    const nextGuesses = [...guesses, value];
    const isOver = correct || nextGuesses.length >= MAX_ATTEMPTS;

    setGuesses(nextGuesses);
    setQuery("");
    setWon(correct);
    setGameOver(isOver);
    persist(nextGuesses, correct, isOver);

    if (correct) unlockPlayer(player.id, "Statdle BBVA");
    if (isOver) {
      recordGameResult("statdle", `${getDayKey()}-${challenge.id}`, correct);
      if (correct) {
        trackChallengeCompleted("statdle-bbva", challenge.id, { seasonId: "bbva", won: true, attempts: nextGuesses.length });
      } else {
        trackChallengeFailed("statdle-bbva", challenge.id, { seasonId: "bbva", attempts: nextGuesses.length });
      }
      trackEvent("mode_completed", { mode: "statdle", season: "bbva", won: correct, attempts: nextGuesses.length });
      trackEvent("statdle_completed", { challenge: challenge.id, won: correct, attempts: nextGuesses.length });
    }
  }

  function share() {
    const rows = Array.from({ length: MAX_ATTEMPTS }, (_, index) => {
      if (won && index === guesses.length - 1) return "🟩";
      if (index < guesses.length) return "🟨";
      return "⬛";
    }).join("");
    const text = buildProgressiveShare("Statdle BBVA", rows, guesses.length, won);
    shareGameResult(text, {
      modeId: "statdle-bbva",
      challengeId: challenge.id,
      seasonId: "bbva",
      won,
      attempts: guesses.length,
      title: "Statdle BBVA",
      onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1800); },
    });
  }
  if (!player) {
    return (
      <div>
        <button onClick={onBack} className="text-[12px] font-semibold mb-3" style={{ color: "#6b6b72" }}>{"\u2190 Volver"}</button>
        <div className="rounded-2xl p-5" style={{ background: "white" }}>No hay Statdle disponible hoy.</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button onClick={onBack} className="text-[12px] font-semibold mb-3" style={{ color: "#6b6b72" }}>{"\u2190 Volver"}</button>

      <section className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <div className="px-5 py-5" style={{ background: "linear-gradient(135deg,#18181b,#c8920a)", color: "white" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">Nuevo modo {"\u00b7"} #{getDayNumber()}</div>
          <h1 className="font-bebas text-[42px] leading-none">STATDLE BBVA</h1>
          <p className="text-[12px] text-white/75 mt-1">Adivina el jugador por sus estadisticas.</p>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="rounded-xl px-3 py-2" style={{ background: "#fffbf5", border: "1px solid rgba(200,146,10,0.22)" }}>
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>Temporada</div>
            <div className="font-bebas text-[26px] leading-none" style={{ color: "#18181b" }}>{challenge.season}</div>
          </div>

          <div className="flex flex-col gap-2">
            {challenge.clues.map((clue, index) => {
              const visible = index < revealedCount || gameOver;
              return (
                <div key={clue.label} className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: visible ? "#f8f5f0" : "#f3efe8", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bebas text-[16px]"
                    style={{ background: visible ? "#c8920a" : "#ddd7ca", color: "white" }}>{index + 1}</div>
                  <div className="flex-1">
                    <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#9a9a8a" }}>{clue.label}</div>
                    <div className="font-oswald font-semibold text-[15px]" style={{ color: visible ? "#18181b" : "#aaa" }}>
                      {visible ? clue.value : "?????"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!gameOver && (
            <div className="relative">
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={event => { if (event.key === "Enter") submit(suggestions[0]?.displayName ?? query); }}
                placeholder="Escribe un jugador..."
                className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
                style={{ background: "white", border: "2px solid rgba(200,146,10,0.65)", color: "#18181b" }}
                autoComplete="off"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden max-h-72 overflow-y-auto"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                  {suggestions.map(item => (
                    <button key={item.id} onMouseDown={() => submit(item.displayName)}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <span className="font-semibold">{item.displayName}</span>
                      <span className="block text-[10px]" style={{ color: "#9a9a8a" }}>{item.mainClub} {"\u00b7"} {item.position}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-[11px]" style={{ color: "#9a9a8a" }}>
            <span>{guesses.length}/{MAX_ATTEMPTS} intentos</span>
            <span>Fuente: {challenge.source}</span>
          </div>

          {guesses.length > 0 && (
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#9a9a8a" }}>Intentos</div>
              <div className="flex flex-wrap gap-1.5">
                {guesses.map(guess => (
                  <span key={guess} className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                    style={{ background: isMatch(guess, player) ? "#f0faf2" : "#fff5f5", color: isMatch(guess, player) ? "#1e6b2e" : "#b81c14" }}>
                    {guess}
                  </span>
                ))}
              </div>
            </div>
          )}

          {gameOver && (
            <div className="rounded-xl p-4" style={{ background: won ? "#f0faf2" : "#fff5f5", border: `1px solid ${won ? "rgba(30,107,46,0.22)" : "rgba(184,28,20,0.18)"}` }}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>{won ? "Correcto" : "Era"}</div>
              <div className="font-bebas text-[34px] leading-none" style={{ color: "#18181b" }}>{player.displayName}</div>
              <div className="text-[12px]" style={{ color: "#6b6b72" }}>{player.mainClub} {"\u00b7"} {player.position} {"\u00b7"} {player.nationality}</div>
              <button onClick={share} className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
                style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir resultado"}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

