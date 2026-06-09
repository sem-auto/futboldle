"use client";

import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers, BBVAPlayer } from "@/data/bbvaPlayers";
import PlayerSearch from "@/components/PlayerSearch";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameResult } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import { shareResult } from "@/lib/share";

type Case = {
  title: string;
  names: string[];
  answer: string;
  note: string;
};

const MAX = 4;

const CASES: Case[] = [
  { title: "Málaga Champions", names: ["Isco", "Joaquín", "Duda", "Caballero"], answer: "Demichelis", note: "Demichelis fue central clave del Málaga de Champions." },
  { title: "Villarreal de memoria", names: ["Senna", "Cazorla", "Rossi", "Nilmar"], answer: "Cani", note: "Cani era una pieza muy reconocible de aquel Villarreal." },
  { title: "Valencia de Mestalla", names: ["Villa", "Silva", "Mata", "Soldado"], answer: "Joaquín", note: "Joaquín conecta esa memoria del Valencia con la Liga BBVA." },
  { title: "Sevilla europeo", names: ["Kanouté", "Luis Fabiano", "Jesús Navas", "Palop"], answer: "Renato", note: "Renato fue parte importante del Sevilla de títulos." },
  { title: "Betis de culto", names: ["Rubén Castro", "Beñat", "Joaquín", "Emaná"], answer: "Jorge Molina", note: "Jorge Molina es gol y oficio verdiblanco." },
  { title: "Deportivo nostálgico", names: ["Valerón", "Riki", "Lopo", "Aranzubia"], answer: "Pandiani", note: "Pandiani fue uno de esos delanteros con aroma total a fútbol de otra época." },
  { title: "Getafe BBVA", names: ["Diego Castro", "Parejo", "Gavilán", "Cata Díaz"], answer: "Miku", note: "Miku fue delantero muy reconocible del Getafe." },
  { title: "Levante de Orriols", names: ["Barkero", "Juanlu", "Koné", "Ballesteros"], answer: "Iborra", note: "Iborra creció en el Levante antes de ir al Sevilla." },
];

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

function getCase() {
  return CASES[(getDayNumber() * 11 + 4) % CASES.length];
}

function isAnswer(player: BBVAPlayer, answer: string) {
  const target = fold(answer);
  return [player.answer, player.displayName, player.fullName].some(value => {
    const key = fold(value);
    return key === target || key.includes(target) || target.includes(key);
  });
}

export default function QuienFaltaBBVA({ onBack }: { onBack: () => void }) {
  const item = useMemo(getCase, []);
  const storeKey = `fbl-quien-falta-${getDayKey()}`;
  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [won, setWon] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        const saved = JSON.parse(raw);
        setGuesses(Array.isArray(saved.guesses) ? saved.guesses : []);
        setDone(!!saved.done);
        setWon(!!saved.won);
      }
    } catch {}
    trackEvent("game_started", { game: "quien_falta" });
  }, [storeKey]);

  function persist(nextGuesses: string[], nextDone: boolean, nextWon: boolean) {
    try { localStorage.setItem(storeKey, JSON.stringify({ guesses: nextGuesses, done: nextDone, won: nextWon })); } catch {}
  }

  function selectPlayer(player: BBVAPlayer) {
    if (done) return;
    setQuery("");
    const ok = isAnswer(player, item.answer);
    const nextGuesses = [...guesses, player.displayName];
    const finished = ok || nextGuesses.length >= MAX;
    setGuesses(nextGuesses);
    if (finished) {
      setDone(true);
      setWon(ok);
      persist(nextGuesses, true, ok);
      recordGameResult("quienFalta", `${getDayKey()}-quien-falta`, ok);
      if (ok) unlockPlayer(player.id, "¿Quién falta?");
      trackEvent("game_completed", { game: "quien_falta", won: ok, attempts: nextGuesses.length });
    } else {
      persist(nextGuesses, false, false);
    }
  }

  async function share() {
    const text = `⚽ Futboldle\n¿Quién falta? #${getDayNumber()}\n${won ? "🟩" : "🟥"} ${won ? guesses.length : "X"}/${MAX}\n\nhttps://futboldle.es`;
    shareResult(text, () => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }

  return (
    <div className="flex flex-col gap-3 pb-[calc(4rem+env(safe-area-inset-bottom))] max-w-[100vw] overflow-x-hidden">
      <button onClick={onBack} className="self-start text-[11px] font-semibold opacity-60 hover:opacity-100" style={{ color: "#3a3a3f" }}>← Volver</button>
      <section className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}>
        <div className="px-5 py-4" style={{ background: "linear-gradient(135deg,#7c3aed,#9b6cf5)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 mb-2">Reto rápido · #{getDayNumber()}</div>
          <h2 className="font-bebas text-[32px] leading-none text-white">¿QUIÉN FALTA?</h2>
          <p className="text-[11px] text-white/75 mt-1">{item.title}</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {item.names.map(name => (
              <div key={name} className="rounded-xl px-3 py-3 text-center font-oswald font-semibold text-[13px]" style={{ background: "#f6f2ff", border: "1px solid rgba(124,58,237,0.14)", color: "#7c3aed" }}>{name}</div>
            ))}
            <div className="rounded-xl px-3 py-3 text-center font-oswald font-semibold text-[13px]" style={{ background: "#f8f5f0", border: "1px dashed rgba(0,0,0,0.18)", color: "#9a9a8a" }}>????</div>
          </div>

          {!done ? (
            <>
              <PlayerSearch value={query} onChange={setQuery} players={bbvaPlayers} accent="#7c3aed" onSelect={selectPlayer} placeholder="Escribe el jugador que falta..." />
              <div className="flex items-center justify-between text-[10px]" style={{ color: "#9a9a8a" }}>
                <span>{MAX - guesses.length} intentos</span>
                {guesses.length > 0 && <span>Fallos: {guesses.join(" · ")}</span>}
              </div>
            </>
          ) : (
            <div className="rounded-xl p-4" style={{ background: won ? "#f0faf2" : "#fff5f5", border: `1px solid ${won ? "rgba(30,107,46,0.22)" : "rgba(184,28,20,0.18)"}` }}>
              <div className="font-bebas text-[24px] leading-none" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>{won ? item.answer.toUpperCase() : `FALTABA ${item.answer.toUpperCase()}`}</div>
              <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{item.note}</p>
              <button onClick={share} className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir"}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
