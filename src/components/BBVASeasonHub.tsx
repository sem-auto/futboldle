"use client";

import { useState } from "react";
import WordleBBVA from "@/components/WordleBBVA";
import TrayectoriaBBVA from "@/components/TrayectoriaBBVA";
import Top10BBVA from "@/components/Top10BBVA";
import StatdleBBVA from "@/components/StatdleBBVA";
import AdivinaElCrack from "@/components/AdivinaElCrack";
import JugoAquiBBVA from "@/components/JugoAquiBBVA";
import FichajeInventoBBVA from "@/components/FichajeInventoBBVA";
import ClubOcultoBBVA from "@/components/ClubOcultoBBVA";
import DueloNostalgia from "@/components/DueloNostalgia";
import { trackModeEntered } from "@/lib/analytics";

type Mode = "menu" | "wordle" | "trayectoria" | "top10" | "statdle" | "cromo" | "jugo" | "fichaje" | "club" | "duelo";
type Visual = "wordle" | "route" | "podium" | "stats" | "card" | "check" | "contract" | "shield" | "duel";

const games: Array<{ mode: Mode; title: string; subtitle: string; accent: string; badge: string; visual: Visual }> = [
  { mode: "wordle", title: "Wordle BBVA", subtitle: "Adivina el apellido del Hombre BBVA.", accent: "#d59b08", badge: "Diario", visual: "wordle" },
  { mode: "trayectoria", title: "Trayectoria BBVA", subtitle: "Reconoce al jugador por su carrera.", accent: "#197538", badge: "Diario", visual: "route" },
  { mode: "top10", title: "Top10 BBVA", subtitle: "Rankings históricos de 2005-2016.", accent: "#174ea6", badge: "Histórico", visual: "podium" },
  { mode: "statdle", title: "Statdle BBVA", subtitle: "Adivina por temporada y estadísticas.", accent: "#18181b", badge: "Nuevo", visual: "stats" },
  { mode: "cromo", title: "Cromo Oculto", subtitle: "Revela al jugador por pistas.", accent: "#7c3aed", badge: "Diario", visual: "card" },
  { mode: "jugo", title: "¿Jugó Aquí?", subtitle: "Jugador y club: verdad o trampa.", accent: "#197538", badge: "Extra", visual: "check" },
  { mode: "fichaje", title: "Fichaje o Invento", subtitle: "Operaciones raras de la era BBVA.", accent: "#d59b08", badge: "Extra", visual: "contract" },
  { mode: "club", title: "Club Oculto", subtitle: "Adivina el equipo por sus cromos.", accent: "#174ea6", badge: "Extra", visual: "shield" },
  { mode: "duelo", title: "Duelo Nostalgia", subtitle: "¿Quién tuvo más goles o asistencias?", accent: "#b81c14", badge: "Extra", visual: "duel" },
];

function GameVisual({ type, accent }: { type: Visual; accent: string }) {
  if (type === "wordle") {
    return (
      <div className="grid grid-cols-5 gap-1">
        {["F", "A", "L", "C", "A", "V", "I", "L", "L", "A"].map((letter, index) => (
          <span key={`${letter}-${index}`} className="grid h-7 place-items-center rounded-md font-bebas text-[18px]"
            style={{ background: index % 3 === 0 ? "#d9ead8" : index === 2 ? "#f4d77e" : "#eee9df", color: index % 3 === 0 ? "#0f5c2b" : "#8a8170", border: "1px solid rgba(0,0,0,0.08)" }}>
            {letter}
          </span>
        ))}
      </div>
    );
  }

  if (type === "route") {
    return (
      <div className="relative h-16 rounded-xl px-3 py-3" style={{ background: `${accent}0f`, border: `1px solid ${accent}24` }}>
        <div className="absolute left-6 right-6 top-1/2 h-1 -translate-y-1/2 rounded-full" style={{ background: `${accent}30` }} />
        {["VAL", "MCI", "RSO"].map((club, index) => (
          <span key={club} className="absolute top-1/2 grid h-9 w-11 -translate-y-1/2 place-items-center rounded-xl text-[10px] font-bold"
            style={{ left: `${8 + index * 36}%`, background: "white", color: accent, border: `1px solid ${accent}35` }}>
            {club}
          </span>
        ))}
      </div>
    );
  }

  if (type === "podium") {
    return (
      <div className="flex h-16 items-end gap-2">
        {[42, 58, 34].map((height, index) => (
          <div key={height} className="flex-1 rounded-t-lg text-center text-[10px] font-bold" style={{ height, background: index === 1 ? `${accent}70` : `${accent}28`, color: "#0f2348" }}>
            {index === 0 ? "2" : index === 1 ? "1" : "3"}
          </div>
        ))}
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className="grid grid-cols-4 items-end gap-2 h-16">
        {[30, 48, 22, 58].map((height, index) => (
          <div key={height} className="rounded-t-lg" style={{ height, background: index === 3 ? accent : `${accent}28` }} />
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className="mx-auto flex h-20 w-16 rotate-[-3deg] flex-col items-center justify-center rounded-xl" style={{ background: "linear-gradient(145deg,#fff,#f0e8ff)", border: `2px solid ${accent}`, boxShadow: `0 10px 22px ${accent}20` }}>
        <div className="text-[18px] font-bebas" style={{ color: accent }}>????</div>
        <div className="mt-1 h-1 w-10 rounded-full" style={{ background: `${accent}35` }} />
      </div>
    );
  }

  if (type === "check") {
    return <div className="grid h-16 grid-cols-2 gap-2"><span className="grid place-items-center rounded-xl text-[22px]" style={{ background: `${accent}16` }}>✓</span><span className="grid place-items-center rounded-xl text-[20px]" style={{ background: "#f8f5f0" }}>?</span></div>;
  }

  if (type === "contract") {
    return <div className="rounded-xl bg-white px-3 py-2" style={{ border: `1px solid ${accent}30` }}><div className="h-2 w-16 rounded-full" style={{ background: `${accent}35` }} /><div className="mt-2 h-2 w-24 rounded-full bg-stone-200" /><div className="mt-2 font-bebas text-[18px]" style={{ color: accent }}>FIRMA</div></div>;
  }

  if (type === "shield") {
    return <div className="mx-auto grid h-18 w-16 place-items-center rounded-b-3xl rounded-t-xl text-[24px]" style={{ height: 72, background: "linear-gradient(145deg,#eef3ff,#fff)", border: `2px solid ${accent}` }}>?</div>;
  }

  return (
    <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2">
      <span className="fbl-mini-cromo rotate-[-4deg]">A</span>
      <span className="font-bebas text-[30px]" style={{ color: accent }}>VS</span>
      <span className="fbl-mini-cromo rotate-[4deg]">B</span>
    </div>
  );
}

function GameCard({ game, onClick }: { game: (typeof games)[number]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fbl-card group text-left rounded-2xl p-4 min-h-[210px] flex flex-col justify-between transition-transform hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(180deg,#ffffff,#fbfaf7)",
        border: `1px solid ${game.accent}33`,
        boxShadow: "0 8px 22px rgba(0,0,0,0.07)",
      }}
    >
      <span className="fbl-visual-mark right-4 top-4 text-[76px] group-hover:scale-105">{game.visual === "podium" ? "10" : game.visual === "duel" ? "VS" : ""}</span>
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="text-[8px] uppercase font-semibold tracking-[0.18em] px-2 py-1 rounded-full"
          style={{ background: `${game.accent}12`, color: game.accent }}>
          {game.badge}
        </span>
        <span className="font-oswald text-[10px] font-semibold uppercase" style={{ color: game.accent }}>Jugar →</span>
      </div>
      <div className="relative z-10 my-4">
        <GameVisual type={game.visual} accent={game.accent} />
      </div>
      <div className="relative z-10">
        <h2 className="font-bebas text-[31px] leading-none" style={{ color: "#18181b" }}>{game.title}</h2>
        <p className="text-[12px] mt-1 min-h-[32px]" style={{ color: "#66646a" }}>{game.subtitle}</p>
      </div>
    </button>
  );
}

export default function BBVASeasonHub() {
  const [mode, setMode] = useState<Mode>("menu");
  const back = () => setMode("menu");

  function open(modeId: Mode) {
    trackModeEntered(modeId, "bbva", { source: "bbva_season_page" });
    setMode(modeId);
  }

  if (mode === "wordle") return <WordleBBVA onBack={back} />;
  if (mode === "trayectoria") return <TrayectoriaBBVA onBack={back} />;
  if (mode === "top10") return <Top10BBVA onBack={back} />;
  if (mode === "statdle") return <StatdleBBVA onBack={back} />;
  if (mode === "cromo") return <AdivinaElCrack onBack={back} />;
  if (mode === "jugo") return <JugoAquiBBVA onBack={back} />;
  if (mode === "fichaje") return <FichajeInventoBBVA onBack={back} />;
  if (mode === "club") return <ClubOcultoBBVA onBack={back} />;
  if (mode === "duelo") return <DueloNostalgia onBack={back} />;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {games.map(game => <GameCard key={game.mode} game={game} onClick={() => open(game.mode)} />)}
    </section>
  );
}
