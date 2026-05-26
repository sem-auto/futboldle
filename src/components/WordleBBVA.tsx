"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { BBVAPlayer, getPlayerOfDay, getRandomPlayer } from "@/data/bbvaPlayers";
import { normalize } from "@/lib/normalize";
import { getDayKey, getDayNumber } from "@/lib/daily";

const MAX_ATTEMPTS = 6;
const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L","Ñ"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

type LetterState = "correct" | "partial" | "wrong" | "empty" | "active";

interface GuessRow {
  letters: string[];
  states: LetterState[];
  submitted: boolean;
}

interface SavedGame {
  date: string;
  playerId: number;
  guesses: { letters: string[]; states: LetterState[] }[];
  gameOver: boolean;
  won: boolean;
}

function buildEmptyRow(len: number): GuessRow {
  return { letters: Array(len).fill(""), states: Array(len).fill("empty"), submitted: false };
}

function evaluateGuess(guess: string[], answer: string[]): LetterState[] {
  const result: LetterState[] = Array(answer.length).fill("wrong");
  const answerCount: Record<string, number> = {};

  // Count letters in answer
  answer.forEach((l) => { answerCount[l] = (answerCount[l] || 0) + 1; });

  // First pass: correct
  guess.forEach((l, i) => {
    if (l === answer[i]) {
      result[i] = "correct";
      answerCount[l]--;
    }
  });

  // Second pass: partial
  guess.forEach((l, i) => {
    if (result[i] !== "correct" && answerCount[l] > 0) {
      result[i] = "partial";
      answerCount[l]--;
    }
  });

  return result;
}

function buildShareText(
  guesses: { states: LetterState[] }[],
  won: boolean,
  dayNum: number
): string {
  const score = won ? `${guesses.length}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`;
  const emoji = (s: LetterState) =>
    s === "correct" ? "🟩" : s === "partial" ? "🟨" : "⬛";
  const rows = guesses.map((g) => g.states.map(emoji).join("")).join("\n");
  return `Futboldle BBVA #${dayNum}\n${score}\n\n${rows}\n\nhttps://futboldle.es`;
}

function getKeyState(
  key: string,
  guesses: { letters: string[]; states: LetterState[]; submitted: boolean }[]
): LetterState | "idle" {
  let best: LetterState | "idle" = "idle";
  const priority: Record<string, number> = { correct: 3, partial: 2, wrong: 1, idle: 0 };
  for (const g of guesses) {
    if (!g.submitted) continue;
    g.letters.forEach((l, i) => {
      if (l === key) {
        const s = g.states[i];
        if ((priority[s] ?? 0) > (priority[best] ?? 0)) best = s;
      }
    });
  }
  return best;
}

interface Props {
  onBack: () => void;
}

export default function WordleBBVA({ onBack }: Props) {
  const [player, setPlayer] = useState<BBVAPlayer>(() => getPlayerOfDay());
  const [isInfinite, setIsInfinite] = useState(false);
  const [answer, setAnswer] = useState<string[]>([]);
  const [rows, setRows] = useState<GuessRow[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const initGame = useCallback((p: BBVAPlayer, savedGuesses?: { letters: string[]; states: LetterState[] }[]) => {
    const ans = normalize(p.answer).split("");
    setPlayer(p);
    setAnswer(ans);
    const emptyRows = Array.from({ length: MAX_ATTEMPTS }, () => buildEmptyRow(ans.length));
    if (savedGuesses && savedGuesses.length > 0) {
      savedGuesses.forEach((g, i) => {
        emptyRows[i] = { ...g, submitted: true };
      });
      setCurrentRow(savedGuesses.length);
      const lastG = savedGuesses[savedGuesses.length - 1];
      const isWon = lastG.states.every((s) => s === "correct");
      const isOver = isWon || savedGuesses.length >= MAX_ATTEMPTS;
      setWon(isWon);
      setGameOver(isOver);
      if (isOver) setTimeout(() => setShowResult(true), 400);
      if (savedGuesses.length >= 3 && !isWon) setShowHint(true);
    } else {
      setCurrentRow(0);
      setGameOver(false);
      setWon(false);
      setShowHint(false);
      setShowResult(false);
    }
    setRows(emptyRows);
  }, []);

  // Load saved state on mount
  useEffect(() => {
    const key = `futboldle-bbva-${getDayKey()}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const saved: SavedGame = JSON.parse(raw);
        if (saved.date === getDayKey()) {
          const p = getPlayerOfDay();
          initGame(p, saved.guesses);
          setLoaded(true);
          return;
        }
      }
    } catch {}
    initGame(getPlayerOfDay());
    setLoaded(true);
  }, [initGame]);

  const saveGame = useCallback(
    (newRows: GuessRow[], over: boolean, win: boolean) => {
      if (isInfinite) return;
      const key = `futboldle-bbva-${getDayKey()}`;
      const submitted = newRows.filter((r) => r.submitted);
      const saved: SavedGame = {
        date: getDayKey(),
        playerId: player.id,
        guesses: submitted.map((r) => ({ letters: r.letters, states: r.states })),
        gameOver: over,
        won: win,
      };
      try { localStorage.setItem(key, JSON.stringify(saved)); } catch {}
    },
    [isInfinite, player.id]
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const submitRow = useCallback(() => {
    const row = rows[currentRow];
    const guess = row.letters.join("");
    if (guess.length !== answer.length) {
      setShakeRow(currentRow);
      setTimeout(() => setShakeRow(null), 500);
      showToast(`El apellido tiene ${answer.length} letras`);
      return;
    }

    const states = evaluateGuess(row.letters, answer);
    const newRows = rows.map((r, i) =>
      i === currentRow ? { ...r, states, submitted: true } : r
    );
    setRows(newRows);

    const isWon = states.every((s) => s === "correct");
    const nextRow = currentRow + 1;
    const isOver = isWon || nextRow >= MAX_ATTEMPTS;

    setCurrentRow(nextRow);
    if (nextRow >= 3 && !isWon) setShowHint(true);

    if (isOver) {
      setWon(isWon);
      setGameOver(true);
      saveGame(newRows, true, isWon);
      setTimeout(() => setShowResult(true), 600);
    } else {
      saveGame(newRows, false, false);
    }
  }, [rows, currentRow, answer, saveGame]);

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver) return;
      if (key === "ENTER") { submitRow(); return; }
      if (key === "⌫" || key === "BACKSPACE") {
        setRows((prev) => {
          const updated = [...prev];
          const row = { ...updated[currentRow], letters: [...updated[currentRow].letters] };
          const lastFilled = row.letters.map((l, i) => (l ? i : -1)).filter((i) => i >= 0).pop();
          if (lastFilled !== undefined) row.letters[lastFilled] = "";
          updated[currentRow] = row;
          return updated;
        });
        return;
      }
      const letter = normalize(key);
      if (!letter || letter.length !== 1) return;
      setRows((prev) => {
        const updated = [...prev];
        const row = { ...updated[currentRow], letters: [...updated[currentRow].letters] };
        const emptyIdx = row.letters.findIndex((l) => !l);
        if (emptyIdx === -1) return prev;
        row.letters[emptyIdx] = letter;
        updated[currentRow] = row;
        return updated;
      });
    },
    [gameOver, currentRow, submitRow]
  );

  // Physical keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") handleKey("ENTER");
      else if (e.key === "Backspace") handleKey("⌫");
      else if (e.key.length === 1) handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const handlePlayAgain = () => {
    setIsInfinite(true);
    const newPlayer = getRandomPlayer(player.id);
    setShowResult(false);
    initGame(newPlayer);
  };

  const handleShare = async () => {
    const submitted = rows.filter((r) => r.submitted);
    const text = buildShareText(submitted, won, getDayNumber());
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert(text);
    }
  };

  if (!loaded) return (
    <div className="flex items-center justify-center py-20">
      <div className="font-display text-3xl animate-pulse" style={{ color: "var(--red)" }}>CARGANDO...</div>
    </div>
  );

  const answerLen = answer.length;

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold transition-colors self-start"
        style={{ color: "var(--text-muted)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "")}
      >
        ← Volver
      </button>

      {/* Title area */}
      <div className="text-center">
        <h2 className="font-display text-3xl text-white">WORDLE BBVA</h2>
        <p className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>
          {isInfinite ? "Modo infinito • Sin límite de partidas" : `Reto del día #${getDayNumber()} • ${answerLen} letras`}
        </p>
      </div>

      {/* Pre-game hint */}
      <div
        className="rounded-xl px-4 py-3 text-center"
        style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}
      >
        <p className="text-[12px] font-medium" style={{ color: "var(--text-dim)" }}>
          Adivina el apellido de un <span style={{ color: "var(--gold)" }}>Hombre BBVA</span>
        </p>
      </div>

      {/* Post-3-attempts hint */}
      {showHint && !gameOver && (
        <div
          className="rounded-xl px-4 py-3 animate-in"
          style={{ background: "var(--surface-3)", border: "1px solid rgba(245,197,24,0.2)" }}
        >
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: "var(--gold)" }}>
            💡 Pista
          </div>
          <p className="text-[12px]" style={{ color: "var(--text-dim)" }}>
            {player.mainClub} · {player.position}
          </p>
          <p className="text-[11px] mt-0.5 italic" style={{ color: "var(--text-muted)" }}>
            "{player.hint}"
          </p>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-sm font-semibold animate-pop"
          style={{ background: "var(--surface-4)", border: "1px solid var(--border-hi)", color: "#fff", whiteSpace: "nowrap" }}
        >
          {toast}
        </div>
      )}

      {/* Grid */}
      <div className="flex flex-col gap-1.5 items-center">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={`flex gap-1.5 ${shakeRow === ri ? "animate-shake" : ""}`}
          >
            {Array.from({ length: answerLen }).map((_, ci) => {
              const letter = row.letters[ci] || "";
              const state = row.submitted ? row.states[ci] : letter ? "active" : "empty";

              let bg = "var(--surface-3)";
              let border = "1px solid var(--border-md)";
              let color = "rgba(255,255,255,0.8)";

              if (state === "active") {
                border = "1px solid rgba(255,255,255,0.3)";
                color = "#fff";
              } else if (state === "correct") {
                bg = "rgba(22,163,74,0.22)";
                border = "1px solid rgba(22,163,74,0.5)";
                color = "#4ade80";
              } else if (state === "partial") {
                bg = "rgba(234,179,8,0.18)";
                border = "1px solid rgba(234,179,8,0.45)";
                color = "#fbbf24";
              } else if (state === "wrong") {
                bg = "rgba(255,255,255,0.04)";
                border = "1px solid rgba(255,255,255,0.08)";
                color = "rgba(255,255,255,0.25)";
              }

              const cellSize = answerLen <= 5 ? "w-12 h-12" : answerLen <= 7 ? "w-10 h-10" : answerLen <= 9 ? "w-9 h-9" : "w-8 h-8";
              const fontSize = answerLen <= 7 ? "text-lg" : "text-base";

              return (
                <div
                  key={ci}
                  className={`${cellSize} rounded-lg flex items-center justify-center font-display ${fontSize} font-bold transition-all duration-200`}
                  style={{ background: bg, border, color }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Keyboard */}
      {!showResult && (
        <div className="flex flex-col gap-1.5 items-center mt-1">
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((key) => {
                const state = getKeyState(key, rows);
                let bg = "var(--surface-4)";
                let color = "rgba(255,255,255,0.8)";
                let border = "1px solid var(--border)";

                if (state === "correct") { bg = "rgba(22,163,74,0.3)"; color = "#4ade80"; border = "1px solid rgba(22,163,74,0.4)"; }
                else if (state === "partial") { bg = "rgba(234,179,8,0.25)"; color = "#fbbf24"; border = "1px solid rgba(234,179,8,0.4)"; }
                else if (state === "wrong") { bg = "rgba(255,255,255,0.04)"; color = "rgba(255,255,255,0.2)"; }

                const isWide = key === "ENTER" || key === "⌫";

                return (
                  <button
                    key={key}
                    onClick={() => handleKey(key)}
                    className={`rounded-lg font-bold transition-all active:scale-95 select-none ${isWide ? "px-2 text-[11px] h-12 min-w-[44px]" : "w-8 h-12 text-sm"}`}
                    style={{ background: bg, color, border, fontFamily: key === "⌫" ? "system-ui" : "inherit" }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Result panel */}
      {showResult && (
        <div
          className="rounded-2xl p-5 animate-in"
          style={{ background: "var(--surface-3)", border: "1px solid var(--border-hi)" }}
        >
          {won ? (
            <div className="text-center mb-4">
              <div className="font-display text-4xl text-white mb-1">¡CRACK!</div>
              <p className="text-sm font-semibold" style={{ color: "#4ade80" }}>
                Adivinado en {rows.filter((r) => r.submitted).length}/{MAX_ATTEMPTS} intentos
              </p>
            </div>
          ) : (
            <div className="text-center mb-4">
              <div className="font-display text-4xl text-white mb-1">CASI...</div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No has podido con él hoy</p>
            </div>
          )}

          {/* Player info */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: "var(--surface-4)", border: "1px solid var(--border)" }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "var(--gold)" }}>
              El jugador era
            </div>
            <div className="font-display text-2xl text-white mb-0.5">{player.displayName.toUpperCase()}</div>
            <div className="text-[12px] mb-2" style={{ color: "var(--text-dim)" }}>{player.fullName}</div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {player.clubs.map((c) => (
                <span
                  key={c}
                  className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                  style={{ background: "var(--surface-3)", color: "var(--text-dim)", border: "1px solid var(--border)" }}
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[12px] italic" style={{ color: "var(--text-muted)" }}>"{player.hint}"</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {!isInfinite && (
              <button
                onClick={handleShare}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98]"
                style={{
                  background: copied ? "rgba(22,163,74,0.2)" : "var(--red)",
                  border: copied ? "1px solid rgba(22,163,74,0.4)" : "none",
                  boxShadow: copied ? "none" : "0 4px 20px rgba(232,0,29,0.3)",
                }}
              >
                {copied ? "✓ ¡Copiado!" : "Compartir resultado"}
              </button>
            )}
            <button
              onClick={handlePlayAgain}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
              style={{
                background: "var(--surface-4)",
                border: "1px solid var(--border-md)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Jugar otra partida →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
