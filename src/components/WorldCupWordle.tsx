"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { worldCupPlayers } from "@/data/worldcups";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { normalize } from "@/lib/normalize";
import { shareGameResult } from "@/lib/resultShare";
import { FUTBOLDLE_URL } from "@/lib/share";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackEvent, trackModeEntered } from "@/lib/analytics";
import { recordWorldCupDay, unlockWorldCupCard } from "@/lib/worldCupCollection";
import { syncAchievements } from "@/lib/achievements";
import DataReportButton from "@/components/DataReportButton";
import CommunityStatsPanel from "@/components/CommunityStatsPanel";
import { useCommunityDifficulty } from "@/lib/communityStats";

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

function rarityMeta(level: string) {
  if (level === "icono") return { label: "Legendario", color: "#c8920a", background: "linear-gradient(145deg,#fff3bd,#fffdf5,#e8b82e)" };
  if (level === "legendario") return { label: "Epico", color: "#6d28d9", background: "linear-gradient(145deg,#f3e8ff,#ffffff,#ddd6fe)" };
  if (level === "core") return { label: "Raro", color: "#174ea6", background: "linear-gradient(145deg,#e8f0ff,#ffffff,#c8dcff)" };
  return { label: "Comun", color: "#1e6b2e", background: "linear-gradient(145deg,#eaf8ed,#ffffff,#cdebd4)" };
}

export default function WorldCupWordle({ initialExtraIndex = 0 }: { initialExtraIndex?: number }) {
  const dayNumber = getDayNumber();
  const extraIndex = initialExtraIndex;
  const player = wordlePool[(dayNumber * 17 + 7 + extraIndex * 31) % wordlePool.length];
  const challengeId = extraIndex === 0 ? `wc-wordle-${dayNumber}` : `wc-wordle-${dayNumber}-extra-${extraIndex}`;
  const answer = useMemo(() => playerAnswer(player.name).split(""), [player.name]);
  const storageKey = `fbl-worldcup-wordle-${getDayKey()}-${extraIndex === 0 ? "daily" : `extra-${extraIndex}`}`;
  const [rows, setRows] = useState<Row[]>(() => Array.from({ length: MAX_ATTEMPTS }, () => emptyRow(answer.length)));
  const [currentGuess, setCurrentGuess] = useState("");
  const [rowIndex, setRowIndex] = useState(0);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const community = useCommunityDifficulty("worldcup-wordle", challengeId);
  const keyboardStates = useMemo(() => {
    const priority: Record<CellState, number> = { empty: 0, wrong: 1, partial: 2, correct: 3 };
    const result: Record<string, CellState> = {};
    rows.filter(row => row.submitted).forEach(row => row.letters.forEach((letter, index) => {
      const state = row.states[index] ?? "wrong";
      if (!result[letter] || priority[state] > priority[result[letter]]) result[letter] = state;
    }));
    return result;
  }, [rows]);
  const rarity = rarityMeta(player.iconicLevel);

  useEffect(() => {
    trackModeEntered("worldcup-wordle", "world-cups", { challengeId });
    trackChallengeStarted("worldcup-wordle", challengeId, { seasonId: "world-cups" });
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (saved && Array.isArray(saved.rows)) {
        setRows(saved.rows);
        setRowIndex(Number(saved.rowIndex) || 0);
        setWon(Boolean(saved.won));
        setGameOver(Boolean(saved.gameOver));
      } else {
        setRows(Array.from({ length: MAX_ATTEMPTS }, () => emptyRow(answer.length)));
        setRowIndex(0);
        setWon(false);
        setGameOver(false);
      }
    } catch {}
    setCurrentGuess("");
    setMessage("");
  }, [answer.length, challengeId, dayNumber, storageKey]);

  const persist = useCallback((nextRows: Row[], nextIndex: number, nextWon: boolean, nextOver: boolean) => {
    try { localStorage.setItem(storageKey, JSON.stringify({ rows: nextRows, rowIndex: nextIndex, won: nextWon, gameOver: nextOver })); } catch {}
  }, [storageKey]);

  const submit = useCallback(() => {
    if (gameOver) return;
    const row = rows[rowIndex];
    const guessLetters = currentGuess.split("");
    if (!row || guessLetters.length !== answer.length) { setMessage(`${answer.length} letras`); return; }
    const states = evaluate(guessLetters, answer);
    const correct = states.every(state => state === "correct");
    const nextIndex = rowIndex + 1;
    const over = correct || nextIndex >= MAX_ATTEMPTS;
    const nextRows = rows.map((item, index) => index === rowIndex ? { letters: guessLetters, states, submitted: true } : item);
    setRows(nextRows); setRowIndex(nextIndex); setWon(correct); setGameOver(over); setMessage(""); setCurrentGuess("");
    persist(nextRows, nextIndex, correct, over);
    if (over) {
      recordWorldCupDay(dayNumber);
      if (correct) {
        const unlocked = unlockWorldCupCard(player.id, challengeId);
        if (unlocked) trackEvent("card_unlocked", { seasonId: "world-cups", modeId: "worldcup-wordle", playerId: player.id });
      }
      syncAchievements({ modeId: "worldcup-wordle", won: correct });
      const payload = { seasonId: "world-cups", attempts: nextIndex, won: correct, timeSpent: Math.round((Date.now() - startedAt) / 1000) };
      trackChallengeCompleted("worldcup-wordle", challengeId, payload);
      if (!correct) trackChallengeFailed("worldcup-wordle", challengeId, payload);
    }
  }, [answer, challengeId, currentGuess, dayNumber, gameOver, persist, player.id, rowIndex, rows, startedAt]);

  const press = useCallback((key: string) => {
    if (gameOver) return;
    if (key === "ENTER") { submit(); return; }
    if (key === "⌫") setCurrentGuess(value => value.slice(0, -1));
    else setCurrentGuess(value => value.length < answer.length ? `${value}${key}` : value);
    setMessage("");
  }, [answer.length, gameOver, submit]);

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
    shareGameResult(text, { modeId: "worldcup-wordle", challengeId, seasonId: "world-cups", won, attempts: rowIndex, title: "Wordle Mundial", onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1800); } });
  }

  function playAnother() {
    const nextExtra = extraIndex + 1;
    window.location.assign(`/world-cups/wordle?extra=${nextExtra}`);
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
        <div className="text-[9px] uppercase font-semibold tracking-[0.22em] text-white/70">Mundiales · #{dayNumber}{extraIndex > 0 ? ` · Extra ${extraIndex}` : ""}</div>
        <h1 className="font-bebas text-[44px] leading-none mt-1">WORDLE MUNDIAL</h1>
        <p className="text-[12px] text-white/75 mt-1">Adivina el apellido del mundialista.</p>
      </header>
      <div className="p-4 flex flex-col gap-4">
        <CommunityStatsPanel stats={community} tone="#174ea6" />
        <div className="flex flex-col gap-1.5 items-center">
          {rows.map((row, index) => {
            const visibleLetters = row.submitted ? row.letters : index === rowIndex ? [...currentGuess.split(""), ...Array(Math.max(0, answer.length - currentGuess.length)).fill("")] : row.letters;
            return (
            <div key={index} className="flex gap-1.5">
              {visibleLetters.map((letter, cell) => (
                <div key={cell} className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center font-bebas text-[24px]" style={{ background: colors[row.states[cell]].background, color: colors[row.states[cell]].color, border: `2px solid ${colors[row.states[cell]].border}` }}>{letter}</div>
              ))}
            </div>
          )})}
        </div>
        {message && <div className="text-center text-[11px] font-semibold" style={{ color: "#b81c14" }}>{message}</div>}
        {!gameOver && <div className="flex flex-col gap-1.5">{KEYS.map((line, index) => <div key={index} className="flex justify-center gap-1">{line.map(key => {
          const state = keyboardStates[key] ?? "empty";
          const neutral = key === "ENTER" || key === "⌫";
          return <button key={key} onClick={() => press(key)} className="h-10 min-w-0 rounded-md font-semibold text-[11px] px-2 transition-colors" style={{ flex: key === "ENTER" ? 1.5 : 1, background: neutral ? "#dbe2ec" : state === "empty" ? "#e9edf4" : colors[state].background, color: neutral || state === "empty" ? "#18181b" : "white", border: state !== "empty" && !neutral ? `1px solid ${colors[state].border}` : "1px solid transparent" }}>{key}</button>})}</div>)}</div>}
        {gameOver && <div className="rounded-2xl p-4 text-center relative overflow-hidden" style={{ background: won ? rarity.background : "#fff5f5", border: `2px solid ${won ? rarity.color : "rgba(184,28,20,0.18)"}`, boxShadow: won ? `0 10px 28px ${rarity.color}25` : "none" }}>
          {won && <div className="absolute -right-12 -top-20 h-56 w-16 rotate-[28deg] opacity-50" style={{ background: "linear-gradient(90deg,transparent,white,transparent)" }} />}
          <div className="relative z-10"><div className="text-[9px] uppercase font-semibold tracking-[0.18em]" style={{ color: won ? rarity.color : "#b81c14" }}>{won ? "Nuevo cromo mundialista" : "El jugador era"}</div>
          <div className="mx-auto mt-3 w-24 h-28 rounded-xl flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.72)", border: `1px solid ${won ? rarity.color : "rgba(0,0,0,0.10)"}` }}><div className="text-[10px] font-semibold" style={{ color: rarity.color }}>{player.nationality}</div><div className="font-bebas text-[46px] leading-none mt-1">{player.name.slice(0, 1)}</div><div className="text-[8px] uppercase font-semibold mt-1" style={{ color: rarity.color }}>{won ? rarity.label : "Solucion"}</div></div>
          <div className="font-bebas text-[38px] leading-none mt-3">{player.name}</div>
          <div className="flex flex-wrap justify-center gap-1.5 mt-2"><span className="rounded-full px-2 py-1 text-[10px] font-semibold bg-white/75" style={{ color: rarity.color }}>{rarity.label}</span><span className="rounded-full px-2 py-1 text-[10px] font-semibold bg-white/75">{player.position}</span><span className="rounded-full px-2 py-1 text-[10px] font-semibold bg-white/75">Mundial {player.mainWorldCup}</span></div>
          <button onClick={share} className="w-full mt-3 py-3 rounded-xl font-oswald font-semibold uppercase text-[12px]" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Resultado copiado" : "Compartir sin revelar"}</button>
          <div className="grid grid-cols-2 gap-2 mt-2"><button onClick={playAnother} className="rounded-xl py-2.5 text-[11px] font-semibold" style={{ background: "#174ea6", color: "white" }}>Jugar otro</button><Link href="/world-cups/album" className="rounded-xl py-2.5 text-[11px] font-semibold flex items-center justify-center" style={{ background: "white", color: "#8a6200", border: "1px solid rgba(200,146,10,0.22)" }}>Ver álbum</Link></div><div className="mt-3 text-right"><DataReportButton modeId="worldcup-wordle" challengeId={challengeId} /></div></div>
        </div>}
      </div>
    </section>
  );
}
