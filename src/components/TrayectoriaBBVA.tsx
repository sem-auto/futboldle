"use client";
import { useState, useEffect, useCallback } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDayNumber, getDayKey } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameResult } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import PlayerSearch from "@/components/PlayerSearch";
import { CAREER_AUDIT } from "@/data/trayectoriaAudit";

const MAX = 5;
const STORE_KEY = () => `fbl-tray-v2-${getDayKey()}`;

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

const TRAY_POOL = bbvaPlayers.filter(p => CAREER_AUDIT[p.id]);

function getTrayPlayer() {
  const d = new Date();
  const seed = (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) * 13 + 7;
  return TRAY_POOL[Math.abs(seed) % TRAY_POOL.length];
}

type Player = typeof bbvaPlayers[0];

interface SavedTray {
  date: string; playerId: number; guesses: string[]; usedIds: number[];
  attempt: number; gameOver: boolean; won: boolean;
}

function loadSaved(): SavedTray | null {
  try {
    const raw = localStorage.getItem(STORE_KEY());
    if (!raw) return null;
    const d: SavedTray = JSON.parse(raw);
    if (d.date !== getDayKey()) return null;
    return d;
  } catch { return null; }
}

function saveTray(state: Omit<SavedTray, "date">) {
  try {
    localStorage.setItem(STORE_KEY(), JSON.stringify({ ...state, date: getDayKey() }));
    if (state.gameOver)
      localStorage.setItem(`fbl-tray-${getDayKey()}`, state.won ? "won" : "lost");
  } catch {}
}

/** Progressive clues revealed as attempts increase (0-based attempt = clues shown so far) */
function getClues(player: Player, attempt: number) {
  const clubs = player.clubs;
  const first = clubs[0];
  const last = clubs[clubs.length - 1];
  const middle = clubs.length >= 3
    ? clubs.slice(1, -1).join(", ")
    : null;

  return [
    { label: "Club inicial",          value: first,               shown: attempt >= 0 },
    { label: "Club final",            value: last,                shown: attempt >= 1 },
    { label: "Clubes intermedios",    value: middle ?? "—",       shown: attempt >= 2 && !!middle },
    { label: "Posición",              value: player.position,     shown: attempt >= 3 },
    { label: "Nacionalidad",          value: player.nationality,  shown: attempt >= 4 },
  ].filter(c => !(c.label === "Clubes intermedios" && !middle));
}

function getAuditedClues(player: Player, attempt: number) {
  const career = CAREER_AUDIT[player.id];
  return [
    { label: "Club principal", value: career.clubs[0], shown: attempt >= 0 },
    { label: "Segundo club", value: career.clubs[1], shown: attempt >= 1 },
    career.clubs[2] ? { label: "Tercer club", value: career.clubs[2], shown: attempt >= 2 } : null,
    { label: "Posición", value: player.position, shown: attempt >= 3 },
    { label: "Nacionalidad", value: player.nationality, shown: attempt >= 4 },
  ].filter((clue): clue is { label: string; value: string; shown: boolean } => clue !== null);
}

export default function TrayectoriaBBVA({ onBack }: { onBack: () => void }) {
  const player = getTrayPlayer();

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
    trackEvent("game_started", { game: "trayectoria" });
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
      unlockPlayer(player.id, "Trayectoria BBVA");
    }
    if (isOver) recordGameResult("trayectoria", getDayKey(), correct);
    if (isOver) trackEvent("game_completed", { game: "trayectoria", won: correct, attempts: newGuesses.length });
    if (isOver) setGameOver(true);

    saveTray({
      playerId: player.id, guesses: newGuesses, usedIds: newUsedIds,
      attempt: isOver ? attempt : newAttempt, gameOver: isOver, won: correct,
    });

    if (!isOver) setAttempt(newAttempt);
    if (isOver) setTimeout(() => setShowResult(true), 350);
  }, [guesses, usedIds, attempt, player.id]);

  const clues = getAuditedClues(player, attempt);

  async function share() {
    const score = won ? `${guesses.length}/${MAX}` : `X/${MAX}`;
    const txt = `⚽ Futboldle\n🟩 Trayectoria BBVA #${getDayNumber()}\n${score}\n\nhttps://futboldle-liard.vercel.app`;
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { alert(txt); }
  }

  if (!loaded) return (
    <div className="flex items-center justify-center py-16">
      <div className="font-bebas text-[20px] anim-pulse" style={{ color: "#1e6b2e" }}>CARGANDO...</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3 md:gap-4 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-10 max-w-[100vw] overflow-x-hidden">
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-[11px] font-semibold opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#3a3a3f" }}>
        ← Volver
      </button>

      {/* Header */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1e6b2e 0%,#28883c 100%)", boxShadow: "0 4px 20px rgba(30,107,46,0.30)" }}>
        <div className="px-4 md:px-5 py-3 md:py-4">
          <div className="inline-block text-[9px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-2.5"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            Reto del día · #{getDayNumber()}
          </div>
          <h2 className="font-bebas text-[28px] md:text-[32px] leading-none text-white mb-1">TRAYECTORIA BBVA</h2>
          <p className="text-[11px] text-white/70">Deduce el jugador por su trayectoria · {MAX} intentos</p>
        </div>
        {/* Progress dots */}
        <div className="px-4 md:px-5 pb-2.5 md:pb-3 flex items-center gap-1.5">
          {Array.from({ length: MAX }).map((_, i) => (
            <div key={i} className="flex-1 h-[5px] rounded-full transition-all"
              style={{ background: i < attempt ? "rgba(255,255,255,0.40)" : i === attempt && !gameOver ? "white" : "rgba(255,255,255,0.15)" }} />
          ))}
          <span className="text-white/50 text-[9px] font-semibold ml-1">{gameOver ? "—" : `${MAX - attempt} intentos`}</span>
        </div>
      </div>

      {/* Clue cards — revealed progressively */}
      <div className="grid grid-cols-1 gap-1.5 md:gap-2">
        {clues.map((clue, i) => (
          <div key={i}
            className="flex items-center gap-2.5 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-300"
            style={{
              background: clue.shown ? "white" : "#f4f1eb",
              border: `1px solid ${clue.shown ? "rgba(30,107,46,0.22)" : "rgba(0,0,0,0.07)"}`,
              boxShadow: clue.shown ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
            }}>
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
              style={{ background: clue.shown ? "#1e6b2e" : "#e4ddd0", color: clue.shown ? "white" : "#aaa",
                boxShadow: clue.shown ? "0 2px 6px rgba(30,107,46,0.30)" : "none" }}>
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-[8px] font-semibold uppercase tracking-[0.18em] mb-0.5"
                style={{ color: clue.shown ? "#1e6b2e" : "#bbb" }}>{clue.label}</div>
              {clue.shown ? (
                <div className="font-oswald font-semibold text-[14px] md:text-[15px] leading-none" style={{ color: "#18181b" }}>
                  {clue.value}
                </div>
              ) : (
                <div className="flex gap-1.5 items-center">
                  <div className="h-2 rounded-full w-16" style={{ background: "#ddd" }} />
                  <span className="text-[9px]" style={{ color: "#bbb" }}>Falla para revelar</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Failed guesses */}
      {guesses.length > 0 && !gameOver && (
        <div className="flex flex-col gap-1">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Intentos fallidos</div>
          {guesses.map((g, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: "#fff5f5", border: "1px solid rgba(184,28,20,0.15)" }}>
              <span style={{ color: "#b81c14" }}>✗</span>
              <span className="min-w-0">
                <span className="block font-oswald font-semibold text-[12px]" style={{ color: "#3a3a3f" }}>{g}</span>
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
          <PlayerSearch value={query} onChange={setQuery} players={bbvaPlayers} usedIds={usedIds} accent="#1e6b2e" onSelect={guess} />
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="anim-in rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
          <div className="px-5 py-4" style={{ background: won ? "linear-gradient(135deg,#1e6b2e,#28883c)" : "linear-gradient(135deg,#b81c14,#d42018)" }}>
            <div className="font-bebas text-[30px] leading-none text-white mb-0.5">{won ? "¡CORRECTO!" : "ERA..."}</div>
            <p className="text-white/70 text-[12px]">{won ? `En ${guesses.length}/${MAX} intentos` : "No has podido con él"}</p>
          </div>
          <div className="p-4" style={{ background: "white" }}>
            <div className="font-bebas text-[24px] leading-none mb-0.5" style={{ color: "#18181b" }}>{player.displayName.toUpperCase()}</div>
            <div className="text-[11px] mb-3" style={{ color: "#9a9a8a" }}>{player.fullName} · {player.nationality} · {player.position}</div>
            {/* Career chain */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {player.clubs.map((c, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-[11px] font-semibold px-2 py-1 rounded-lg"
                    style={{ background: "#f0faf2", border: "1px solid rgba(30,107,46,0.18)", color: "#1e6b2e" }}>{c}</span>
                  {i < player.clubs.length - 1 && <span className="text-[10px]" style={{ color: "#ccc" }}>→</span>}
                </div>
              ))}
            </div>
            <p className="text-[11px] italic mb-4" style={{ color: "#6b6b72" }}>"{player.hint}"</p>
            <button onClick={share} className="w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
              style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>
              {copied ? "✓ Copiado" : "Compartir resultado"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
