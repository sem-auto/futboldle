"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { worldCupPlayers } from "@/data/worldcups";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { normalize } from "@/lib/normalize";
import { shareGameResult } from "@/lib/resultShare";
import { FUTBOLDLE_URL } from "@/lib/share";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackModeEntered } from "@/lib/analytics";
import { recordWorldCupDay, unlockWorldCupCard } from "@/lib/worldCupCollection";
import { syncAchievements } from "@/lib/achievements";

type CellState = "correct" | "partial" | "wrong" | "empty";
type Row = { letters: string[]; states: CellState[]; submitted: boolean };
const MAX_ATTEMPTS = 6;
const KEYS = ["QWERTYUIOP".split(""), "ASDFGHJKLÑ".split(""), ["ENTER", ..."ZXCVBNM".split(""), "⌫"]];

function playerAnswer(name: string) {
  return normalize(name.split(/\s+/).at(-1) ?? name).replace(/[^A-ZÑ]/g, "");
}

const wordlePool = worldCupPlayers.filter(player => {
  const answer = playerAnswer(player.name);
  return (player.iconicLevel === "icono" || player.iconicLevel === "legendario" || player.iconicLevel === "core") && answer.length >= 4 && answer.length <= 10;
});

function emptyRow(length: number): Row {
  return { letters: Array(length).fill(""), states: Array(length).fill("empty"), submitted: false };
}

function evaluate(guess: string[], answer: string[]) {
  const states: CellState[] = Array(answer.length).fill("wrong");
  const remaining: Record<string, number> = {};
  answer.forEach(letter => { remaining[letter] = (remaining[letter] ?? 0) + 1; });
  guess.forEach((letter, index) => {
    if (letter === answer[index]) { states[index] = "correct"; remaining[letter]--; }
  });
  guess.forEach((letter, index) => {
    if (states[index] !== "correct" && remaining[letter] > 0) { states[index] = "partial"; remaining[letter]--; }
  });
  return states;
}

export default function WorldCupWordle() {
  const dayNumber = getDayNumber();
  const player = wordlePool[(dayNumber * 17 + 7) % wordlePool.length];
  const answer = useMemo(() => playerAnswer(player.name).split(""), [player.name]);
  const storageKey = `fbl-worldcup-wordle-${getDayKey()}`;
  const [rows, setRows] = useState<Row[]>(() => Array.from({ length: MAX_ATTEMPTS }, () => emptyRow(answer.length)));
  const [rowIndex, setRowIndex] = useState(0);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    trackModeEntered("worldcup-wordle", "world-cups", { challengeId: `wc-wordle-${dayNumber}` });
    trackChallengeStarted("worldcup-wordle", `wc-wordle-${dayNumber}`, { seasonId: "world-cups" });
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (saved && Array.isArray(saved.rows)) {
        setRows(saved.rows);
        setRowIndex(Number(saved.rowIndex) || 0);
        setWon(Boolean(saved.won));
        setGameOver(Boolean(saved.gameOver));
      }
    } catch {}
  }, [dayNumber, storageKey]);

  const persist = useCallback((nextRows: Row[], nextIndex: number, nextWon: boolean, nextOver: boolean) => {
    try { localStorage.setItem(storageKey, JSON.stringify({ rows: nextRows, rowIndex: nextIndex, won: nextWon, gameOver: nextOver })); } catch {}
  }, [storageKey]);

  const submit = useCallback(() => {
    if (gameOver) return;
    const row = rows[rowIndex];
    if (!row || row.letters.some(letter => !letter)) { setMessage(`${answer.length} letras`); return; }
    const states = evaluate(row.letters, answer);
    const correct = states.every(state => state === "correct");
    const nextIndex = rowIndex + 1;
    const over = correct || nextIndex >= MAX_ATTEMPTS;
    const nextRows = rows.map((item, index) => index === rowIndex ? { ...item, states, submitted: true } : item);
    setRows(nextRows); setRowIndex(nextIndex); setWon(correct); setGameOver(over); setMessage("");
    persist(nextRows, nextIndex, correct, over);
    if (over) {
      recordWorldCupDay(dayNumber);
      if (correct) unlockWorldCupCard(player.id, `wc-wordle-${dayNumber}`);
      syncAchievements({ modeId: "worldcup-wordle", won: correct });
      const payload = { seasonId: "world-cups", attempts: nextIndex, won: correct, timeSpent: Math.round((Date.now() - startedAt) / 1000) };
      trackChallengeCompleted("worldcup-wordle", `wc-wordle-${dayNumber}`, payload);
      if (!correct) trackChallengeFailed("worldcup-wordle", `wc-wordle-${dayNumber}`, payload);
    }
  }, [answer, dayNumber, gameOver, persist, player.id, rowIndex, rows, startedAt]);

  const press = useCallback((key: string) => {
    if (gameOver) return;
    if (key === "ENTER") { submit(); return; }
    setRows(current => current.map((row, index) => {
      if (index !== rowIndex) return row;
      const letters = [...row.letters];
      if (key === "⌫") {
        const last = letters.findLastIndex(Boolean);
        if (last >= 0) letters[last] = "";
      } else {
        const empty = letters.indexOf("");
        if (empty >= 0) letters[empty] = key;
      }
      return { ...row, letters };
    }));
  }, [gameOver, rowIndex, submit]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") press("ENTER");
      else if (event.key === "Backspace") press("⌫");
      else if (/^[a-zA-ZñÑ]$/.test(event.key)) press(normalize(event.key));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  function share() {
    const symbols = rows.filter(row => row.submitted).map(row => row.states.map(state => state === "correct" ? "🟩" : state === "partial" ? "🟨" : "⬛").join(""));
    const text = [`🏆 Wordle Mundial #${dayNumber}`, ...symbols, won ? `Resuelto en ${rowIndex} intentos` : "Hoy no salió", `🌍 ${FUTBOLDLE_URL}`].join("\n");
    shareGameResult(text, { modeId: "worldcup-wordle", challengeId: `wc-wordle-${dayNumber}`, seasonId: "world-cups", won, attempts: rowIndex, title: "Wordle Mundial", onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1800); } });
  }

  const colors: Record<CellState, { background: string; color: string; border: string }> = {
    correct: { background: "#1e6b2e", color: "white", border: "#1e6b2e" },
    partial: { background: "#c8920a", color: "white", border: "#c8920a" },
    wrong: { background: "#77746d", color: "white", border: "#77746d" },
    empty: { background: "white", color: "#18181b", border: "rgba(23,78,166,0.22)" },
  };

  return (
    <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 12px 34px rgba(0,0,0,0.08)" }}>
      <header className="px-5 py-5" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="text-[9px] uppercase font-semibold tracking-[0.22em] text-white/70">Mundiales · #{dayNumber}</div>
        <h1 className="font-bebas text-[44px] leading-none mt-1">WORDLE MUNDIAL</h1>
        <p className="text-[12px] text-white/75 mt-1">Adivina el apellido del mundialista.</p>
      </header>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 items-center">
          {rows.map((row, index) => (
            <div key={index} className="flex gap-1.5">
              {row.letters.map((letter, cell) => (
                <div key={cell} className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center font-bebas text-[24px]" style={{ background: colors[row.states[cell]].background, color: colors[row.states[cell]].color, border: `2px solid ${colors[row.states[cell]].border}` }}>{letter}</div>
              ))}
            </div>
          ))}
        </div>
        {message && <div className="text-center text-[11px] font-semibold" style={{ color: "#b81c14" }}>{message}</div>}
        {!gameOver && <div className="flex flex-col gap-1.5">{KEYS.map((line, index) => <div key={index} className="flex justify-center gap-1">{line.map(key => <button key={key} onClick={() => press(key)} className="h-10 min-w-0 rounded-md font-semibold text-[11px] px-2" style={{ flex: key === "ENTER" ? 1.5 : 1, background: "#e9edf4", color: "#18181b" }}>{key}</button>)}</div>)}</div>}
        {gameOver && <div className="rounded-2xl p-4 text-center" style={{ background: won ? "#f0faf2" : "#fff5f5", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="text-[9px] uppercase font-semibold tracking-[0.18em]" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>{won ? "Cromo mundialista desbloqueado" : "El jugador era"}</div>
          <div className="font-bebas text-[38px] leading-none mt-1">{player.name}</div>
          <div className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>{player.nationality} · Mundial {player.mainWorldCup}</div>
          <button onClick={share} className="w-full mt-3 py-3 rounded-xl font-oswald font-semibold uppercase text-[12px]" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Resultado copiado" : "Compartir sin revelar"}</button>
          <Link href="/world-cups/collection" className="inline-block mt-3 text-[11px] font-semibold" style={{ color: "#174ea6" }}>Ver colección mundialista</Link>
        </div>}
      </div>
    </section>
  );
}
