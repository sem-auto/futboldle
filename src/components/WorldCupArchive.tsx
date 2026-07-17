"use client";

import { useEffect, useState } from "react";
import CaminoTitulo from "@/components/CaminoTitulo";
import FinalMundial from "@/components/FinalMundial";
import WorldCupChampions from "@/components/WorldCupChampions";
import { getDayNumber } from "@/lib/daily";

const archiveModes = [
  {
    id: "champions",
    label: "Campeones",
    detail: "Sede, campeón y finalista.",
    Component: WorldCupChampions,
  },
  {
    id: "camino",
    label: "Camino al título",
    detail: "Adivina al campeón por sus rivales.",
    Component: CaminoTitulo,
  },
  {
    id: "final",
    label: "Final Mundial",
    detail: "Reconoce una final histórica.",
    Component: FinalMundial,
  },
] as const;

export default function WorldCupArchive() {
  const [modeIndex, setModeIndex] = useState(0);

  useEffect(() => {
    setModeIndex(getDayNumber() % archiveModes.length);
  }, []);

  const active = archiveModes[modeIndex];
  const ActiveGame = active.Component;

  return (
    <div className="flex flex-col gap-3">
      <section
        className="rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3"
        style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.18)" }}
      >
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#174ea6" }}>Archivo Mundial diario</div>
          <div className="font-bebas text-[29px] leading-none" style={{ color: "#18181b" }}>{active.label}</div>
          <p className="text-[12px] mt-1" style={{ color: "#626879" }}>{active.detail} Mañana cambia el recuerdo.</p>
        </div>
        <div className="flex gap-1.5" aria-label="Rotación del Archivo Mundial">
          {archiveModes.map((mode, index) => (
            <span
              key={mode.id}
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: index === modeIndex ? "#174ea6" : "rgba(23,78,166,0.18)" }}
            />
          ))}
        </div>
      </section>
      <ActiveGame />
    </div>
  );
}
