"use client";

import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameResult } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import { shareResult } from "@/lib/share";

type Case = {
  player: string;
  club: string;
  correct: boolean;
  note: string;
};

const CASES: Case[] = [
  { player: "Saviola", club: "Málaga", correct: true, note: "Saviola pasó por La Rosaleda en 2012/13." },
  { player: "Nilmar", club: "Valencia", correct: false, note: "Nilmar no jugó en Valencia: su etapa BBVA fue Villarreal." },
  { player: "Kanouté", club: "Sevilla", correct: true, note: "Kanouté es uno de los grandes cromos del Sevilla europeo." },
  { player: "Aimar", club: "Zaragoza", correct: true, note: "Aimar tuvo etapa en Zaragoza tras Valencia." },
  { player: "Forlán", club: "Betis", correct: false, note: "Forlán no pasó por Betis: Villarreal y Atlético fueron sus clubes BBVA." },
  { player: "Miku", club: "Getafe", correct: true, note: "Miku fue delantero reconocible del Getafe." },
  { player: "Bacca", club: "AC Milan", correct: true, note: "Bacca salió del Sevilla rumbo al Milan." },
  { player: "Apoño", club: "Levante", correct: false, note: "Apoño se recuerda por Málaga, Zaragoza y Las Palmas." },
  { player: "Joaquín", club: "Fiorentina", correct: true, note: "Joaquín tuvo aventura italiana antes de volver al Betis." },
  { player: "Rakitic", club: "Barcelona", correct: true, note: "Rakitic saltó del Sevilla al Barça." },
  { player: "Valerón", club: "Sevilla", correct: false, note: "Valerón es Deportivo y Las Palmas, no Sevilla." },
  { player: "Brahimi", club: "Porto", correct: true, note: "Brahimi salió de Granada hacia Porto." },
];

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toUpperCase();
}

function findPlayer(name: string) {
  const key = fold(name);
  return bbvaPlayers.find(player =>
    [player.answer, player.displayName, player.fullName].some(value => fold(value) === key || fold(value).includes(key))
  );
}

function getCase() {
  return CASES[(getDayNumber() * 3 + 1) % CASES.length];
}

export default function FichajeInventoBBVA({ onBack }: { onBack: () => void }) {
  const item = useMemo(getCase, []);
  const player = useMemo(() => findPlayer(item.player), [item.player]);
  const storeKey = `fbl-fichaje-invento-${getDayKey()}`;
  const [picked, setPicked] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const done = picked !== null;
  const won = picked === item.correct;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) setPicked(JSON.parse(raw).picked);
    } catch {}
    trackEvent("game_started", { game: "fichaje_invento" });
  }, [storeKey]);

  function choose(value: boolean) {
    if (done) return;
    const ok = value === item.correct;
    setPicked(value);
    try { localStorage.setItem(storeKey, JSON.stringify({ picked: value, won: ok })); } catch {}
    recordGameResult("fichaje", getDayKey(), ok);
    if (ok && player) unlockPlayer(player.id, "Fichaje o invento");
    trackEvent("game_completed", { game: "fichaje_invento", won: ok });
  }

  async function share() {
    const text = `⚽ Futboldle\nFichaje o invento #${getDayNumber()}\n${won ? "🟩" : "🟥"} ${item.player} → ${item.club}\n\nhttps://futboldle.es`;
    shareResult(text, () => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }

  return (
    <div className="flex flex-col gap-3 pb-[calc(4rem+env(safe-area-inset-bottom))] max-w-[100vw] overflow-x-hidden">
      <button onClick={onBack} className="self-start text-[11px] font-semibold opacity-60 hover:opacity-100" style={{ color: "#3a3a3f" }}>← Volver</button>
      <section className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}>
        <div className="px-5 py-4" style={{ background: "linear-gradient(135deg,#c8920a,#e8aa20)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 mb-2">Reto rápido · #{getDayNumber()}</div>
          <h2 className="font-bebas text-[32px] leading-none text-white">FICHAJE O INVENTO</h2>
          <p className="text-[11px] text-white/75 mt-1">¿Pasó de verdad o es una trampa BBVA?</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="rounded-xl p-4 text-center" style={{ background: "#fffbf5", border: "1px solid rgba(200,146,10,0.18)" }}>
            <div className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>{item.player}</div>
            <div className="text-[24px] leading-none my-1" style={{ color: "#c8920a" }}>→</div>
            <div className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{item.club}</div>
          </div>

          {!done ? (
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => choose(true)} className="font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: "#1e6b2e", color: "white" }}>Fichaje real</button>
              <button onClick={() => choose(false)} className="font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: "#18181b", color: "white" }}>Invento</button>
            </div>
          ) : (
            <div className="rounded-xl p-4" style={{ background: won ? "#f0faf2" : "#fff5f5", border: `1px solid ${won ? "rgba(30,107,46,0.22)" : "rgba(184,28,20,0.18)"}` }}>
              <div className="font-bebas text-[24px] leading-none" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>{won ? "CORRECTO" : "TE LA COLARON"}</div>
              <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{item.note}</p>
              <button onClick={share} className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir"}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
