"use client";

import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameResult } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import { shareResult } from "@/lib/share";

type Case = {
  answer: string;
  club: string;
  correct: boolean;
  note: string;
};

const CASES: Case[] = [
  { answer: "BARKERO", club: "Levante", correct: true, note: "Barkero fue uno de los zurdos de culto del Levante europeo." },
  { answer: "NILMAR", club: "Valencia", correct: false, note: "Nilmar es recuerdo amarillo: Villarreal, Internacional y Santos." },
  { answer: "PIATTI", club: "Espanyol", correct: true, note: "Piatti pasó por Almería, Valencia y Espanyol." },
  { answer: "FORLAN", club: "Sevilla", correct: false, note: "Forlán brilló en Villarreal y Atlético de Madrid." },
  { answer: "JONAS", club: "Valencia", correct: true, note: "Jonas dejó goles de delantero fino en Mestalla." },
  { answer: "APOÑO", club: "Málaga", correct: true, note: "Apoño es puro Málaga de la era BBVA." },
  { answer: "KANOUTE", club: "Valencia", correct: false, note: "Kanouté es Sevilla y Tottenham, no Valencia." },
  { answer: "CAZORLA", club: "Málaga", correct: true, note: "Cazorla fue pieza clave del Málaga de Champions." },
  { answer: "MUNITIS", club: "Racing Santander", correct: true, note: "Munitis es memoria directa de El Sardinero." },
  { answer: "BACCA", club: "Sevilla", correct: true, note: "Bacca fue delantero de Europa League en Sevilla." },
  { answer: "RUBENCASTRO", club: "Betis", correct: true, note: "Rubén Castro es gol verdiblanco de manual." },
  { answer: "PANDIANI", club: "Villarreal", correct: false, note: "Pandiani se recuerda más por Deportivo, Espanyol y Osasuna." },
];

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toUpperCase();
}

function getCase() {
  return CASES[getDayNumber() % CASES.length];
}

function findPlayer(answer: string) {
  const key = fold(answer);
  return bbvaPlayers.find(player =>
    [player.answer, player.displayName, player.fullName].some(value => fold(value) === key)
  );
}

export default function JugoAquiBBVA({ onBack }: { onBack: () => void }) {
  const item = useMemo(getCase, []);
  const player = useMemo(() => findPlayer(item.answer), [item.answer]);
  const storeKey = `fbl-jugo-aqui-${getDayKey()}`;
  const [picked, setPicked] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) setPicked(JSON.parse(raw).picked);
    } catch {}
    trackEvent("game_started", { game: "jugo_aqui" });
  }, [storeKey]);

  const done = picked !== null;
  const won = picked === item.correct;

  function choose(value: boolean) {
    if (done) return;
    const ok = value === item.correct;
    setPicked(value);
    try { localStorage.setItem(storeKey, JSON.stringify({ picked: value, won: ok })); } catch {}
    recordGameResult("jugoAqui", getDayKey(), ok);
    if (ok && player) unlockPlayer(player.id, "¿Jugó aquí?");
    trackEvent("game_completed", { game: "jugo_aqui", won: ok });
  }

  async function share() {
    const text = `⚽ Futboldle\n¿Jugó aquí? #${getDayNumber()}\n${won ? "🟩" : "🟥"} ${player?.displayName ?? item.answer} / ${item.club}\n\nhttps://futboldle.es`;
    shareResult(text, () => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }

  return (
    <div className="flex flex-col gap-3 pb-[calc(4rem+env(safe-area-inset-bottom))] max-w-[100vw] overflow-x-hidden">
      <button onClick={onBack} className="self-start text-[11px] font-semibold opacity-60 hover:opacity-100" style={{ color: "#3a3a3f" }}>← Volver</button>
      <section className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}>
        <div className="px-5 py-4" style={{ background: "linear-gradient(135deg,#1e6b2e,#28883c)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-2">Reto rápido · #{getDayNumber()}</div>
          <h2 className="font-bebas text-[32px] leading-none text-white">¿JUGÓ AQUÍ?</h2>
          <p className="text-[11px] text-white/75 mt-1">Memoria BBVA pura: jugador y club.</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="rounded-xl p-4 text-center" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>{player?.displayName ?? item.answer}</div>
            <div className="text-[11px] mt-1" style={{ color: "#9a9a8a" }}>¿Jugó en <b>{item.club}</b>?</div>
          </div>

          {!done ? (
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => choose(true)} className="font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: "#1e6b2e", color: "white" }}>Sí jugó</button>
              <button onClick={() => choose(false)} className="font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: "#18181b", color: "white" }}>No jugó</button>
            </div>
          ) : (
            <div className="rounded-xl p-4" style={{ background: won ? "#f0faf2" : "#fff5f5", border: `1px solid ${won ? "rgba(30,107,46,0.22)" : "rgba(184,28,20,0.18)"}` }}>
              <div className="font-bebas text-[24px] leading-none" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>{won ? "CORRECTO" : "NO ERA"}</div>
              <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{item.note}</p>
              <button onClick={share} className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir"}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
