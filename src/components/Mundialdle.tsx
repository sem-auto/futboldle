"use client";

import { useEffect, useMemo, useState } from "react";
import { getDailyMundialdleChallenge, worldCupPlayers } from "@/data/worldcups";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { buildProgressiveShare, shareGameResult } from "@/lib/resultShare";
import { syncAchievements } from "@/lib/achievements";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackEvent, trackModeEntered } from "@/lib/analytics";

const MAX_ATTEMPTS = 6;

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isCorrectGuess(input: string, player: { name: string; aliases: string[] }) {
  const guess = fold(input);
  return [player.name, ...player.aliases].some(value => fold(value) === guess);
}

function getSuggestions(query: string) {
  const q = fold(query);
  if (q.length < 2) return [];

  return worldCupPlayers
    .filter(player => [player.name, ...player.aliases].some(value => fold(value).includes(q)))
    .sort((a, b) => {
      const aName = fold(a.name);
      const bName = fold(b.name);
      const aStarts = aName.startsWith(q) ? 0 : 1;
      const bStarts = bName.startsWith(q) ? 0 : 1;
      return aStarts - bStarts || aName.localeCompare(bName);
    })
    .slice(0, 8);
}

function clueStyle(tone?: string) {
  if (tone === "gold") return { background: "#fff8e6", border: "rgba(200,146,10,0.24)", color: "#8a6200" };
  if (tone === "blue") return { background: "#eef3ff", border: "rgba(23,78,166,0.24)", color: "#174ea6" };
  if (tone === "green") return { background: "#f0faf2", border: "rgba(30,107,46,0.20)", color: "#1e6b2e" };
  if (tone === "red") return { background: "#fff5f5", border: "rgba(184,28,20,0.18)", color: "#b81c14" };
  return { background: "#f8f5f0", border: "rgba(0,0,0,0.07)", color: "#18181b" };
}

function clueIcon(label: string, value: string) {
  if (label === "Mundial") return "\uD83C\uDFC6";
  if (label === "Goles" || label === "Momento" || label === "Partido mitico") return "\u26BD";
  if (label === "Premio") return "\uD83E\uDD47";
  if (label === "Rol") return "\uD83D\uDC51";
  if (label === "Edad") return "\uD83D\uDC76";
  if (label === "Posicion" && value === "Portero") return "\uD83E\uDDE4";
  if (label === "Posicion" && value === "Defensa") return "\uD83D\uDEE1\uFE0F";
  if (label === "Posicion" && value === "Centrocampista") return "\uD83E\uDDE0";
  if (label === "Posicion") return "\uD83C\uDFAF";
  if (label === "Seleccion") {
    if (value === "Espana") return "\uD83C\uDDEA\uD83C\uDDF8";
    if (value === "Alemania") return "\uD83C\uDDE9\uD83C\uDDEA";
    if (value === "Argentina") return "\uD83C\uDDE6\uD83C\uDDF7";
    if (value === "Brasil") return "\uD83C\uDDE7\uD83C\uDDF7";
    if (value === "Francia") return "\uD83C\uDDEB\uD83C\uDDF7";
    if (value === "Italia") return "\uD83C\uDDEE\uD83C\uDDF9";
    if (value === "Portugal") return "\uD83C\uDDF5\uD83C\uDDF9";
    if (value === "Uruguay") return "\uD83C\uDDFA\uD83C\uDDFE";
    if (value === "Holanda") return "\uD83C\uDDF3\uD83C\uDDF1";
    if (value === "Croacia") return "\uD83C\uDDED\uD83C\uDDF7";
    return "\uD83C\uDF0D";
  }
  if (label === "Club") return "\uD83C\uDFDF\uFE0F";
  if (label === "Estilo") return "\uD83E\uDDF1";
  return "\u2B50";
}

export default function Mundialdle({ onBack }: { onBack?: () => void }) {
  const challenge = getDailyMundialdleChallenge(getDayNumber());
  const player = worldCupPlayers.find(item => item.id === challenge.playerId);
  const storageKey = `fbl-mundialdle-${getDayKey()}`;
  const doneKey = `fbl-mundialdle-done-${getDayKey()}`;

  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [copied, setCopied] = useState(false);

  const suggestions = useMemo(() => getSuggestions(query), [query]);
  const revealedCount = Math.min(challenge.clues.length, Math.max(1, guesses.length + 1));

  useEffect(() => {
    trackModeEntered("mundialdle", "world-cups", { challenge: challenge.id });
    trackChallengeStarted("mundialdle", challenge.id, { seasonId: "world-cups", worldCup: challenge.worldCup });
    trackEvent("game_started", { game: "mundialdle", season: "world-cups", challenge: challenge.id });
    trackEvent("mundialdle_started", { challenge: challenge.id, worldCup: challenge.worldCup });

    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Array.isArray(saved.guesses)) setGuesses(saved.guesses);
      setWon(!!saved.won);
      setGameOver(!!saved.gameOver);
    } catch {}
  }, [challenge.id, challenge.worldCup, storageKey]);

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

    const correct = isCorrectGuess(value, player);
    const nextGuesses = [...guesses, value];
    const isOver = correct || nextGuesses.length >= MAX_ATTEMPTS;

    setGuesses(nextGuesses);
    setQuery("");
    setWon(correct);
    setGameOver(isOver);
    persist(nextGuesses, correct, isOver);

    if (isOver) {
      trackChallengeCompleted("mundialdle", challenge.id, { seasonId: "world-cups", won: correct, attempts: nextGuesses.length });
      if (!correct) trackChallengeFailed("mundialdle", challenge.id, { seasonId: "world-cups", attempts: nextGuesses.length });
      syncAchievements({ modeId: "mundialdle", won: correct });
      trackEvent("game_completed", { game: "mundialdle", season: "world-cups", challenge: challenge.id, won: correct, attempts: nextGuesses.length });
      trackEvent("mundialdle_completed", { challenge: challenge.id, won: correct, attempts: nextGuesses.length });
      if (!correct) trackEvent("mundialdle_failed", { challenge: challenge.id, attempts: nextGuesses.length });
    }
  }

  function share() {
    const rows = Array.from({ length: MAX_ATTEMPTS }, (_, index) => {
      if (won && index === guesses.length - 1) return "🟩";
      if (index < guesses.length) return "🟨";
      return "⬛";
    }).join("");
    const flag = player?.flag ? `${player.flag} ` : "🌍 ";
    const text = buildProgressiveShare("Mundialdle", `${flag}${rows}`, guesses.length, won, "pistas", "🏆 ");
    shareGameResult(text, {
      modeId: "mundialdle",
      challengeId: challenge.id,
      seasonId: "world-cups",
      won,
      attempts: guesses.length,
      title: "Mundialdle",
      onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1800); },
    });
  }
  if (!player) {
    return (
      <div>
        {onBack && <button onClick={onBack} className="text-[12px] font-semibold mb-3" style={{ color: "#6b6b72" }}>{"\u2190 Volver"}</button>}
        <div className="rounded-2xl p-5" style={{ background: "white" }}>No hay Mundialdle disponible hoy.</div>
      </div>
    );
  }

  return (
    <div className="w-full">
        {onBack && <button onClick={onBack} className="text-[12px] font-semibold mb-3" style={{ color: "#6b6b72" }}>{"\u2190 Volver"}</button>}

      <section className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <div className="px-5 py-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
          <div className="absolute right-4 top-3 text-[70px] opacity-15 leading-none">{"\uD83C\uDFC6"}</div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">Mundiales {"\u00b7"} #{getDayNumber()}</div>
          <h1 className="font-bebas text-[42px] leading-none">MUNDIALDLE</h1>
          <p className="text-[12px] text-white/75 mt-1">Adivina el jugador mundialista.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }}>{"\uD83C\uDF0D"} 2002-2026</span>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }}>{"\uD83C\uDFDF\uFE0F"} Selecciones</span>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }}>{"\uD83C\uDFA6"} Nostalgia mundial</span>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="rounded-xl px-3 py-2" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.20)" }}>
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#174ea6" }}>Temporada</div>
            <div className="font-bebas text-[26px] leading-none" style={{ color: "#18181b" }}>Mundiales 2002-2026</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {challenge.clues.map((clue, index) => {
              const visible = index < revealedCount || gameOver;
              const style = clueStyle(clue.tone);
              return (
                <div key={`${clue.label}-${index}`} className="flex items-center gap-2 rounded-xl px-3 py-2 min-h-[58px]"
                  style={{ background: visible ? style.background : "#f3efe8", border: `1px solid ${visible ? style.border : "rgba(0,0,0,0.06)"}` }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[17px]"
                    style={{ background: visible ? "white" : "#ddd7ca", color: "white", boxShadow: visible ? "0 1px 5px rgba(0,0,0,0.08)" : "none" }}>
                    {visible ? clueIcon(clue.label, clue.value) : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#9a9a8a" }}>{clue.label}</div>
                    <div className="font-oswald font-semibold text-[15px]" style={{ color: visible ? style.color : "#aaa" }}>
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
                onKeyDown={event => { if (event.key === "Enter") submit(suggestions[0]?.name ?? query); }}
                placeholder="Escribe un jugador mundialista..."
                className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
                style={{ background: "white", border: "2px solid rgba(23,78,166,0.60)", color: "#18181b" }}
                autoComplete="off"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden max-h-72 overflow-y-auto"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                  {suggestions.map(item => (
                    <button key={item.id} onMouseDown={() => submit(item.name)}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <span className="font-semibold">{item.name}</span>
                      <span className="block text-[10px]" style={{ color: "#9a9a8a" }}>{item.nationality} {"\u00b7"} {item.position}</span>
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
                    style={{ background: isCorrectGuess(guess, player) ? "#f0faf2" : "#fff5f5", color: isCorrectGuess(guess, player) ? "#1e6b2e" : "#b81c14" }}>
                    {guess}
                  </span>
                ))}
              </div>
            </div>
          )}

          {gameOver && (
            <div className="rounded-xl p-4" style={{ background: won ? "#f0faf2" : "#fff5f5", border: `1px solid ${won ? "rgba(30,107,46,0.22)" : "rgba(184,28,20,0.18)"}` }}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>{won ? "Correcto" : "Era"}</div>
              <div className="font-bebas text-[34px] leading-none" style={{ color: "#18181b" }}>{player.name}</div>
              <div className="text-[12px]" style={{ color: "#6b6b72" }}>{player.nationality} {"\u00b7"} {player.position} {"\u00b7"} Mundial {challenge.worldCup}</div>
              {challenge.funFact && (
                <div className="mt-3 rounded-xl px-3 py-2 text-[12px] leading-snug" style={{ background: "white", border: "1px solid rgba(23,78,166,0.16)", color: "#3a3a3f" }}>
                  <span className="font-semibold">Dato:</span> {challenge.funFact}
                </div>
              )}
              <button onClick={share} className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
                style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir resultado"}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
