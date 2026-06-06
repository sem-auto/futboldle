"use client";
import { useState, useEffect, useCallback } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameCompletion } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import PlayerSearch from "@/components/PlayerSearch";

const MAX = 5;
const STORE_KEY = () => `fbl-crack-${getDayKey()}`;

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function getCrackPlayer() {
  const d = new Date();
  const seed = (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) * 17 + 11;
  const pool = bbvaPlayers.filter(p => p.category === "core");
  return pool[Math.abs(seed) % pool.length];
}

type Player = typeof bbvaPlayers[0];

interface SavedCrack {
  date: string;
  playerId: number;
  guesses: string[];
  usedIds: number[];
  attempt: number;
  gameOver: boolean;
  won: boolean;
}

function loadSaved(): SavedCrack | null {
  try {
    const raw = localStorage.getItem(STORE_KEY());
    if (!raw) return null;
    const d: SavedCrack = JSON.parse(raw);
    if (d.date !== getDayKey()) return null;
    return d;
  } catch { return null; }
}

function saveCrack(state: Omit<SavedCrack, "date">) {
  try {
    localStorage.setItem(STORE_KEY(), JSON.stringify({ ...state, date: getDayKey() }));
    if (state.gameOver) {
      localStorage.setItem(`fbl-crack-done-${getDayKey()}`, state.won ? "won" : "lost");
    }
  } catch {}
}

/** Approximate age during BBVA era (2005-2016) — midpoint 2010 */

interface Hint { label: string; value: string; revealed: boolean; }

function getHints(player: Player, attempt: number): Hint[] {
  return [
    { label: "Nacionalidad", value: player.nationality,  revealed: attempt >= 1 },
    { label: "Posición",     value: player.position,     revealed: attempt >= 2 },
    { label: "Club BBVA",    value: player.mainClub,     revealed: attempt >= 3 },
    { label: "Años BBVA", value: player.years,  revealed: attempt >= 4 },
    { label: "Pista",        value: player.hint,         revealed: attempt >= 5 || false }, // revealed only on loss
  ];
}

export default function AdivinaElCrack({ onBack }: { onBack: () => void }) {
  const player = getCrackPlayer();

  const [attempt,     setAttempt]     = useState(0);
  const [guesses,     setGuesses]     = useState<string[]>([]);
  const [usedIds,     setUsedIds]     = useState<number[]>([]);
  const [gameOver,    setGameOver]    = useState(false);
  const [won,         setWon]         = useState(false);
  const [showResult,  setShowResult]  = useState(false);
  const [query,       setQuery]       = useState("");
  const [copied,      setCopied]      = useState(false);
  const [loaded,      setLoaded]      = useState(false);

  useEffect(() => {
    const saved = loadSaved();
    if (saved && saved.playerId === player.id) {
      setAttempt(saved.attempt);
      setGuesses(saved.guesses);
      setUsedIds(saved.usedIds);
      setGameOver(saved.gameOver);
      setWon(saved.won);
      if (saved.gameOver) setShowResult(true);
    }
    trackEvent("game_started", { game: "crack" });
    setLoaded(true);
  }, [player.id]);

  const guess = useCallback((p: Player) => {
    setQuery("");
    const newUsedIds = [...usedIds, p.id];
    setUsedIds(newUsedIds);
    const correct = p.id === player.id;
    const newGuesses = [...guesses, p.displayName];
    setGuesses(newGuesses);
    const newAttempt = attempt + 1;
    const isOver = correct || newAttempt >= MAX;

    if (correct) {
      setWon(true);
      unlockPlayer(player.id, "Adivina el Crack");
      recordGameCompletion("crack", getDayKey());
    }
    if (isOver) trackEvent("game_completed", { game: "crack", won: correct, attempts: newGuesses.length });
    if (isOver) setGameOver(true);

    saveCrack({
      playerId: player.id,
      guesses: newGuesses,
      usedIds: newUsedIds,
      attempt: isOver ? attempt : newAttempt,
      gameOver: isOver,
      won: correct,
    });

    if (!isOver) setAttempt(newAttempt);
    if (isOver) setTimeout(() => setShowResult(true), 350);
  }, [guesses, usedIds, attempt, player.id]);

  const hints = getHints(player, attempt);
  // On game over, reveal the hint pista too
  const visibleHints = hints.map((h, i) => ({
    ...h,
    revealed: h.revealed || (gameOver && i <= 4),
  }));

  async function share() {
    const score = won ? `${guesses.length}/${MAX}` : `X/${MAX}`;
    const revCount = visibleHints.filter(h => h.revealed).length;
    const txt = `Futboldle Adivina el Crack #${getDayNumber()}\n${score}\n\n🔍 ${revCount} pistas usadas\n\nhttps://futboldle.es`;
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { alert(txt); }
  }

  if (!loaded) return (
    <div className="flex items-center justify-center py-16">
      <div className="font-bebas text-[20px] anim-pulse" style={{ color: "#7c3aed" }}>CARGANDO...</div>
    </div>
  );

  const PURPLE = "#7c3aed";
  const PURPLE_BG = "rgba(124,58,237,0.08)";
  const PURPLE_BD = "rgba(124,58,237,0.22)";

  return (
    <div className="flex flex-col gap-4 pb-10 min-w-0 overflow-x-hidden">
      {/* Back */}
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-[11px] font-semibold opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#3a3a3f" }}>
        ← Volver
      </button>

      {/* Header morado */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)", boxShadow: "0 4px 20px rgba(124,58,237,0.30)" }}>
        <div className="px-5 py-4">
          <div className="inline-block text-[9px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-2.5"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            Reto del día · #{getDayNumber()}
          </div>
          <h2 className="font-bebas text-[32px] leading-none text-white mb-1 break-words">ADIVINA EL CRACK</h2>
          <p className="text-[11px] text-white/70">Las pistas se revelan con cada fallo · {MAX} intentos</p>
        </div>
        {/* Attempt bar */}
        <div className="px-5 pb-3 flex items-center gap-1.5">
          {Array.from({ length: MAX }).map((_, i) => (
            <div key={i} className="flex-1 h-[5px] rounded-full transition-all"
              style={{ background: i < attempt ? "rgba(255,255,255,0.40)" : i === attempt && !gameOver ? "white" : "rgba(255,255,255,0.15)" }} />
          ))}
          <span className="text-white/50 text-[9px] font-semibold ml-1">{gameOver ? "—" : `${MAX - attempt} intentos`}</span>
        </div>
      </div>

      {/* Hint cards */}
      <div className="grid grid-cols-2 gap-2">
        {visibleHints.slice(0, 4).map((h, i) => (
          <div key={i} className="rounded-xl px-3.5 py-3 transition-all duration-300 min-w-0"
            style={{
              background: h.revealed ? "white" : "#f4f1eb",
              border: `1px solid ${h.revealed ? PURPLE_BD : "rgba(0,0,0,0.07)"}`,
              boxShadow: h.revealed ? "0 2px 8px rgba(124,58,237,0.08)" : "none",
            }}>
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em] mb-1"
              style={{ color: h.revealed ? PURPLE : "#bbb" }}>
              Pista {i + 1} · {h.label}
            </div>
            {h.revealed ? (
              <div className="font-oswald font-semibold text-[14px] break-words" style={{ color: "#18181b" }}>{h.value}</div>
            ) : (
              <div className="flex gap-1 mt-1">
                {[36, 24].map((w, j) => <div key={j} className="h-2 rounded-full" style={{ width: w, background: "#e0dbd8" }} />)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pista textual (intento 5 / derrota) */}
      {visibleHints[4].revealed && (
        <div className="rounded-xl px-3.5 py-3 anim-in"
          style={{ background: "white", border: `1px solid ${PURPLE_BD}`, boxShadow: "0 2px 8px rgba(124,58,237,0.08)" }}>
          <div className="text-[8px] font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: PURPLE }}>
            Pista 5 · Descripción
          </div>
          <div className="font-oswald font-semibold text-[13px] italic break-words" style={{ color: "#18181b" }}>
            &ldquo;{player.hint}&rdquo;
          </div>
        </div>
      )}

      {/* Failed guesses */}
      {guesses.length > 0 && !gameOver && (
        <div className="flex flex-col gap-1">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Intentos fallidos</div>
          {guesses.map((g, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl min-w-0"
              style={{ background: "#fff5f5", border: "1px solid rgba(184,28,20,0.15)" }}>
              <span style={{ color: "#b81c14" }}>✗</span>
              <span className="min-w-0">
                <span className="block font-oswald font-semibold text-[12px] break-words" style={{ color: "#3a3a3f" }}>{g}</span>
                {(() => {
                  const guessed = bbvaPlayers.find(x => x.displayName === g);
                  return guessed ? <span className="block text-[10px]" style={{ color: "#9a9a8a" }}>{guessed.nationality} · {guessed.position}</span> : null;
                })()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      {!gameOver && (
        <div className="relative">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#9a9a8a" }}>
            Intento {attempt + 1} de {MAX}
          </div>
          <PlayerSearch value={query} onChange={setQuery} players={bbvaPlayers} usedIds={usedIds} accent={PURPLE} onSelect={guess} />
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="anim-in rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
          <div className="px-5 py-4" style={{ background: won ? "linear-gradient(135deg,#5b21b6,#7c3aed)" : "linear-gradient(135deg,#b81c14,#d42018)" }}>
            <div className="font-bebas text-[30px] leading-none text-white mb-0.5">{won ? "¡CRACK TOTAL!" : "ERA..."}</div>
            <p className="text-white/70 text-[12px]">{won ? `En ${guesses.length}/${MAX} intentos` : "No has podido con él"}</p>
          </div>
          <div className="p-4" style={{ background: "white" }}>
            <div className="font-bebas text-[24px] leading-none mb-0.5" style={{ color: "#18181b" }}>{player.displayName.toUpperCase()}</div>
            <div className="text-[11px] mb-3" style={{ color: "#9a9a8a" }}>{player.fullName} · {player.nationality} · {player.position}</div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {player.clubs.map((c, i) => (
                <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-lg"
                  style={{ background: PURPLE_BG, border: `1px solid ${PURPLE_BD}`, color: PURPLE }}>{c}</span>
              ))}
            </div>
            <p className="text-[11px] italic mb-4" style={{ color: "#6b6b72" }}>"{player.hint}"</p>
            <button onClick={share} className="w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
              style={{ background: copied ? "#1e6b2e" : PURPLE, color: "white" }}>
              {copied ? "✓ Copiado" : "Compartir resultado"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
