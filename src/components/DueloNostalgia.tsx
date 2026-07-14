"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDailyNostalgiaDuels, type NostalgiaDuel } from "@/data/nostalgiaDuels";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { normalize } from "@/lib/normalize";
import { unlockPlayer } from "@/lib/album";
import { shareGameResult } from "@/lib/resultShare";
import { FUTBOLDLE_URL } from "@/lib/share";
import { trackChallengeCompleted, trackChallengeStarted, trackModeEntered } from "@/lib/analytics";
import DataReportButton from "@/components/DataReportButton";

const MODE_ID = "duelo-nostalgia";

function rewardPlayerId(name?: string) {
  if (!name) return null;
  const key = normalize(name);
  return bbvaPlayers.find((player) => [player.displayName, player.fullName, player.answer].some((value) => normalize(value) === key))?.id ?? null;
}

function optionWinner(duel: NostalgiaDuel) {
  return duel.left.value >= duel.right.value ? "left" : "right";
}

function ChoiceCard({
  name,
  note,
  value,
  metricLabel,
  selected,
  revealed,
  correct,
  onClick,
}: {
  name: string;
  note: string;
  value: number;
  metricLabel: string;
  selected: boolean;
  revealed: boolean;
  correct: boolean;
  onClick: () => void;
}) {
  const border = revealed ? (correct ? "rgba(30,107,46,0.45)" : selected ? "rgba(184,28,20,0.38)" : "rgba(0,0,0,0.08)") : "rgba(200,146,10,0.22)";
  const bg = revealed ? (correct ? "#f0faf2" : selected ? "#fff5f5" : "white") : "white";
  const badge = revealed ? (correct ? "GANA" : selected ? "PIERDE" : "") : "ELIGE";

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      className="rounded-2xl p-4 text-left transition-transform active:scale-[0.99]"
      style={{ background: bg, border: `1px solid ${border}`, boxShadow: "0 7px 20px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: correct && revealed ? "#1e6b2e" : selected && revealed ? "#b81c14" : "#c8920a" }}>{badge}</div>
          <div className="font-bebas text-[34px] leading-none" style={{ color: "#18181b" }}>{name}</div>
          <div className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>{note}</div>
        </div>
        {revealed ? (
          <div className="rounded-xl px-3 py-2 text-center" style={{ background: correct ? "#1e6b2e" : "#f8f5f0", color: correct ? "white" : "#9a9a8a" }}>
            <div className="font-bebas text-[28px] leading-none">{value}</div>
              <div className="text-[8px] uppercase font-semibold">{metricLabel}</div>
          </div>
        ) : (
          <div className="rounded-xl px-3 py-2 text-center" style={{ background: "#fff8e6", color: "#c8920a" }}>
              <div className="font-bebas text-[28px] leading-none">?</div>
            <div className="text-[8px] uppercase font-semibold">{metricLabel}</div>
          </div>
        )}
      </div>
    </button>
  );
}

export default function DueloNostalgia({ onBack }: { onBack?: () => void }) {
  const dayNumber = getDayNumber();
  const challengeId = `duelo-${dayNumber}`;
  const storageKey = `fbl-duelo-nostalgia-${getDayKey()}`;
  const duels = useMemo(() => getDailyNostalgiaDuels(dayNumber, 5), [dayNumber]);
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState<("left" | "right")[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const duel = duels[round] ?? duels[duels.length - 1];
  const finished = answers.length >= duels.length;
  const score = answers.reduce((total, answer, index) => total + (answer === optionWinner(duels[index]) ? 1 : 0), 0);

  useEffect(() => {
    trackModeEntered(MODE_ID, "bbva", { challengeId });
    trackChallengeStarted(MODE_ID, challengeId, { seasonId: "bbva" });
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (saved?.challengeId === challengeId && Array.isArray(saved.answers)) {
        setAnswers(saved.answers.filter((item: string) => item === "left" || item === "right").slice(0, duels.length));
        setRound(Math.min(Number(saved.round) || 0, duels.length - 1));
        setRevealed(Boolean(saved.revealed));
      }
    } catch {}
  }, [challengeId, duels.length, storageKey]);

  function persist(nextAnswers: ("left" | "right")[], nextRound: number, nextRevealed: boolean) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ challengeId, answers: nextAnswers, round: nextRound, revealed: nextRevealed }));
    } catch {}
  }

  function choose(side: "left" | "right") {
    if (revealed || finished) return;
    const nextAnswers = [...answers, side];
    const correct = side === optionWinner(duel);
    setAnswers(nextAnswers);
    setRevealed(true);
    persist(nextAnswers, round, true);

    if (correct) {
      const winner = side === "left" ? duel.left : duel.right;
      const id = rewardPlayerId(winner.rewardName ?? winner.name);
      if (id) unlockPlayer(id, "Duelo de nostalgia");
    }

    if (nextAnswers.length >= duels.length) {
      const finalScore = nextAnswers.reduce((total, answer, index) => total + (answer === optionWinner(duels[index]) ? 1 : 0), 0);
      trackChallengeCompleted(MODE_ID, challengeId, {
        seasonId: "bbva",
        won: finalScore >= 3,
        attempts: duels.length,
        score: finalScore,
        timeSpent: Math.round((Date.now() - startedAt) / 1000),
      });
    }
  }

  function nextRound() {
    const next = Math.min(round + 1, duels.length - 1);
    setRound(next);
    setRevealed(false);
    persist(answers, next, false);
  }

  function restartExtra() {
    setAnswers([]);
    setRound((round + 2) % duels.length);
    setRevealed(false);
  }

  function share() {
    const marks = answers.map((answer, index) => answer === optionWinner(duels[index]) ? "🟩" : "⬛").join("");
    const text = [
      `Duelo de Nostalgia #${dayNumber}`,
      marks,
      `${score}/${duels.length} aciertos`,
      "¿Puedes superarme?",
      FUTBOLDLE_URL,
    ].join("\n");
    shareGameResult(text, {
      modeId: MODE_ID,
      challengeId,
      seasonId: "bbva",
      won: score >= 3,
      attempts: duels.length,
      title: "Duelo de Nostalgia",
      onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1500); },
    });
  }

  return (
    <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 12px 34px rgba(0,0,0,0.08)" }}>
      <header className="px-5 py-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#18181b,#b81c14)", color: "white" }}>
        <button onClick={onBack} className="text-[12px] font-semibold text-white/70 mb-5">← Volver</button>
        <div className="text-[9px] uppercase font-semibold tracking-[0.22em] text-white/70">BBVA · #{dayNumber}</div>
        <h1 className="font-bebas text-[48px] leading-none mt-1">DUELO DE NOSTALGIA</h1>
        <p className="text-[13px] text-white/78 mt-1">Elige quién tuvo más. Rápido, picante y para compartir.</p>
        <div className="absolute right-6 top-4 font-bebas text-[96px] leading-none text-white/8">VS</div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-xl px-3 py-2" style={{ background: "#fff8e6", border: "1px solid rgba(200,146,10,0.22)" }}>
            <div className="text-[8px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#c8920a" }}>Ronda</div>
            <div className="font-bebas text-[26px] leading-none">{Math.min(answers.length + 1, duels.length)}/{duels.length}</div>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            {duels.map((item, index) => {
              const answered = answers[index];
              const ok = answered && answered === optionWinner(item);
              return (
                <span
                  key={`${item.question}-${index}`}
                  className="h-2.5 w-7 rounded-full"
                  style={{ background: !answered ? "#e8e4dc" : ok ? "#1e6b2e" : "#b81c14" }}
                />
              );
            })}
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Marcador</div>
            <div className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>{score}/{answers.length}</div>
          </div>
        </div>

        {!finished ? (
          <>
            <div className="rounded-2xl p-4 text-center" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div className="text-[9px] uppercase font-semibold tracking-[0.20em]" style={{ color: "#9a9a8a" }}>{duel.context}</div>
              <div className="font-bebas text-[34px] leading-tight mt-1" style={{ color: "#18181b" }}>{duel.question}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ChoiceCard {...duel.left} metricLabel={duel.metricLabel} selected={answers[round] === "left"} revealed={revealed} correct={optionWinner(duel) === "left"} onClick={() => choose("left")} />
              <ChoiceCard {...duel.right} metricLabel={duel.metricLabel} selected={answers[round] === "right"} revealed={revealed} correct={optionWinner(duel) === "right"} onClick={() => choose("right")} />
            </div>

            {revealed ? (
              <button onClick={nextRound} className="w-full rounded-xl py-3 font-oswald font-semibold uppercase text-[12px]" style={{ background: "#18181b", color: "white" }}>
                {answers.length >= duels.length ? "Ver resultado" : "Siguiente duelo"}
              </button>
            ) : null}
          </>
        ) : (
          <div className="rounded-2xl p-5 text-center" style={{ background: score >= 3 ? "#f0faf2" : "#fff8e6", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="text-[9px] uppercase font-semibold tracking-[0.20em]" style={{ color: score >= 3 ? "#1e6b2e" : "#c8920a" }}>
              {score >= 3 ? "Duelo ganado" : "Duelo completado"}
            </div>
            <div className="font-bebas text-[58px] leading-none mt-2" style={{ color: "#18181b" }}>{score}/{duels.length}</div>
            <p className="text-[12px] mt-2" style={{ color: "#6b6b72" }}>Comparte el marcador sin revelar las respuestas y reta a tu grupo.</p>
            <button onClick={share} className="w-full rounded-xl py-3 mt-4 font-oswald font-semibold uppercase text-[12px]" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir resultado"}</button>
            <button onClick={restartExtra} className="w-full rounded-xl py-3 mt-2 text-[11px] font-semibold" style={{ background: "white", color: "#b81c14", border: "1px solid rgba(184,28,20,0.18)" }}>Jugar otra tanda</button>
            <div className="flex items-center justify-between mt-4">
              <Link href="/album" className="text-[11px] font-semibold" style={{ color: "#174ea6" }}>Ver álbum BBVA</Link>
              <DataReportButton modeId={MODE_ID} challengeId={challengeId} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
