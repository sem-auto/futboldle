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

const games: Array<{ mode: Mode; title: string; subtitle: string; accent: string; badge: string; icon: string }> = [
  { mode: "wordle", title: "Wordle BBVA", subtitle: "Adivina el apellido del Hombre BBVA.", accent: "#d59b08", badge: "Diario", icon: "W" },
  { mode: "trayectoria", title: "Trayectoria BBVA", subtitle: "Reconoce al jugador por su carrera.", accent: "#197538", badge: "Diario", icon: "T" },
  { mode: "top10", title: "Top10 BBVA", subtitle: "Rankings históricos de 2005-2016.", accent: "#174ea6", badge: "Histórico", icon: "10" },
  { mode: "statdle", title: "Statdle BBVA", subtitle: "Adivina por temporada y estadísticas.", accent: "#18181b", badge: "Nuevo", icon: "S" },
  { mode: "cromo", title: "Cromo Oculto", subtitle: "Revela al jugador por pistas.", accent: "#7c3aed", badge: "Diario", icon: "C" },
  { mode: "jugo", title: "¿Jugó Aquí?", subtitle: "Jugador y club: verdad o trampa.", accent: "#197538", badge: "Extra", icon: "J" },
  { mode: "fichaje", title: "Fichaje o Invento", subtitle: "Operaciones raras de la era BBVA.", accent: "#d59b08", badge: "Extra", icon: "F" },
  { mode: "club", title: "Club Oculto", subtitle: "Adivina el equipo por sus cromos.", accent: "#174ea6", badge: "Extra", icon: "O" },
  { mode: "duelo", title: "Duelo Nostalgia", subtitle: "¿Quién tuvo más goles o asistencias?", accent: "#b81c14", badge: "Extra", icon: "D" },
];

function GameCard({ game, onClick }: { game: (typeof games)[number]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl p-4 min-h-[152px] flex flex-col justify-between transition-transform hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(180deg,#ffffff,#fbfaf7)",
        border: `1px solid ${game.accent}33`,
        boxShadow: "0 8px 22px rgba(0,0,0,0.07)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl font-bebas text-[22px]"
          style={{ background: `${game.accent}14`, color: game.accent, border: `1px solid ${game.accent}25` }}
        >
          {game.icon}
        </span>
        <span
          className="text-[8px] uppercase font-semibold tracking-[0.18em] px-2 py-1 rounded-full"
          style={{ background: `${game.accent}12`, color: game.accent }}
        >
          {game.badge}
        </span>
      </div>
      <div>
        <h2 className="font-bebas text-[31px] leading-none mt-4" style={{ color: "#18181b" }}>{game.title}</h2>
        <p className="text-[12px] mt-1 min-h-[32px]" style={{ color: "#66646a" }}>{game.subtitle}</p>
        <span className="inline-flex mt-3 font-semibold text-[12px]" style={{ color: game.accent }}>Jugar →</span>
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
