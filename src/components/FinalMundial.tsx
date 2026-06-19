"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { worldCupChampionChallenges, worldCupPlayers } from "@/data/worldcups";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { shareGameResult } from "@/lib/resultShare";
import { FUTBOLDLE_URL } from "@/lib/share";
import { trackChallengeCompleted, trackChallengeFailed, trackChallengeStarted, trackEvent, trackModeEntered } from "@/lib/analytics";
import { unlockWorldCupCard } from "@/lib/worldCupCollection";
import DataReportButton from "@/components/DataReportButton";

const MODERN_FINALS = worldCupChampionChallenges.filter(final => final.year >= 2002 && final.year <= 2022);

function championNationality(value: string) {
  if (value === "Alemania Federal") return "Alemania";
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function FinalMundial() {
  const dayNumber = getDayNumber();
  const challenge = MODERN_FINALS[(dayNumber * 5 + 1) % MODERN_FINALS.length];
  const storageKey = `fbl-final-mundial-${getDayKey()}`;
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const won = selected === challenge.year;
  const gameOver = selected !== null;

  const choices = useMemo(() => {
    const years = MODERN_FINALS.map(final => final.year);
    const others = years.filter(year => year !== challenge.year).sort((a, b) => ((a * 13 + dayNumber) % 17) - ((b * 13 + dayNumber) % 17)).slice(0, 3);
    return [challenge.year, ...others].sort((a, b) => a - b);
  }, [challenge.year, dayNumber]);

  const reward = useMemo(() => {
    const nationality = championNationality(challenge.champion);
    return worldCupPlayers.find(player => player.nationality === nationality && player.worldCups.includes(challenge.year) && (player.iconicLevel === "icono" || player.iconicLevel === "legendario"))
      ?? worldCupPlayers.find(player => player.nationality === nationality && player.worldCups.includes(challenge.year));
  }, [challenge]);

  useEffect(() => {
    trackModeEntered("final-mundial", "world-cups", { challengeId: `final-${challenge.year}` });
    trackChallengeStarted("final-mundial", `final-${challenge.year}`, { seasonId: "world-cups" });
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (saved?.year === challenge.year && typeof saved.selected === "number") setSelected(saved.selected);
    } catch {}
  }, [challenge.year, storageKey]);

  function answer(year: number) {
    if (gameOver) return;
    setSelected(year);
    const correct = year === challenge.year;
    try { localStorage.setItem(storageKey, JSON.stringify({ year: challenge.year, selected: year, won: correct })); } catch {}
    const payload = { seasonId: "world-cups", won: correct, attempts: 1, timeSpent: Math.round((Date.now() - startedAt) / 1000) };
    trackChallengeCompleted("final-mundial", `final-${challenge.year}`, payload);
    if (!correct) trackChallengeFailed("final-mundial", `final-${challenge.year}`, payload);
    if (correct && reward) {
      const unlocked = unlockWorldCupCard(reward.id, `final-${challenge.year}`);
      if (unlocked) trackEvent("card_unlocked", { seasonId: "world-cups", modeId: "final-mundial", playerId: reward.id });
    }
  }

  function share() {
    const text = [`Final Mundial #${dayNumber}`, won ? "Correcto en 1 intento" : "Hoy no salio", "Final reconocida: " + (won ? "SI" : "NO"), FUTBOLDLE_URL].join("\n");
    shareGameResult(text, { modeId: "final-mundial", challengeId: `final-${challenge.year}`, seasonId: "world-cups", won, attempts: 1, title: "Final Mundial", onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1500); } });
  }

  return <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 12px 34px rgba(0,0,0,0.08)" }}><header className="px-5 py-5" style={{ background: "linear-gradient(135deg,#c8920a,#18181b)", color: "white" }}><div className="text-[9px] uppercase font-semibold tracking-[0.22em] text-white/70">Mundiales · #{dayNumber}</div><h1 className="font-bebas text-[44px] leading-none mt-1">FINAL MUNDIAL</h1><p className="text-[12px] text-white/75 mt-1">En que ano se jugo esta final?</p></header><div className="p-4 flex flex-col gap-4"><div className="rounded-2xl p-5 text-center" style={{ background: "#fff8e6", border: "1px solid rgba(200,146,10,0.24)" }}><div className="text-[9px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#c8920a" }}>Final</div><div className="font-bebas text-[34px] leading-tight mt-2">{challenge.champion}<span className="block text-[16px] my-1" style={{ color: "#9a9a8a" }}>VS</span>{challenge.runnerUp}</div><div className="text-[10px] mt-3" style={{ color: "#6b6b72" }}>Sede: {challenge.host}</div></div><div className="grid grid-cols-2 gap-2">{choices.map(year => <button key={year} onClick={() => answer(year)} disabled={gameOver} className="rounded-xl py-4 font-bebas text-[26px]" style={{ background: gameOver && year === challenge.year ? "#1e6b2e" : gameOver && year === selected ? "#b81c14" : "#eef3ff", color: gameOver && (year === challenge.year || year === selected) ? "white" : "#174ea6", border: "1px solid rgba(23,78,166,0.16)" }}>{year}</button>)}</div>{gameOver && <div className="rounded-2xl p-4 text-center" style={{ background: won ? "#f0faf2" : "#fff5f5", border: "1px solid rgba(0,0,0,0.08)" }}><div className="font-bebas text-[30px]">{won ? "FINAL RECORDADA" : `ERA ${challenge.year}`}</div><div className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>Resultado: {challenge.finalScore}</div>{won && reward && <div className="rounded-xl px-3 py-2 mt-3" style={{ background: "#fff8e6", border: "1px solid rgba(200,146,10,0.24)" }}><div className="text-[8px] uppercase font-semibold" style={{ color: "#c8920a" }}>Cromo desbloqueado</div><div className="font-bebas text-[24px]">{reward.name}</div></div>}<button onClick={share} className="w-full rounded-xl py-3 mt-3 text-[11px] font-semibold" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir resultado"}</button><div className="flex items-center justify-between mt-3"><Link href="/world-cups/album" className="text-[10px] font-semibold" style={{ color: "#174ea6" }}>Ver album</Link><DataReportButton modeId="final-mundial" challengeId={`final-${challenge.year}`} /></div></div>}</div></section>;
}
