"use client";

import { useEffect, useMemo, useState } from "react";
import { worldCupPlayers } from "@/data/worldcups";
import { getWorldCupAlbum, getWorldCupStreak, type WorldCupAlbumEntry, type WorldCupStreak } from "@/lib/worldCupCollection";
import { trackEvent } from "@/lib/analytics";

function rarityLabel(level: string) {
  if (level === "icono") return "Icono";
  if (level === "legendario") return "Legendario";
  if (level === "core") return "Estrella";
  return "Culto";
}

export default function AlbumWorldCups() {
  const [entries, setEntries] = useState<WorldCupAlbumEntry[]>([]);
  const [streak, setStreak] = useState<WorldCupStreak>({ current: 0, best: 0, lastDayNumber: 0, playedDays: 0 });
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  useEffect(() => {
    const refresh = () => {
      setEntries(getWorldCupAlbum());
      setStreak(getWorldCupStreak());
    };
    refresh();
    trackEvent("collection_opened", { seasonId: "world-cups" });
    window.addEventListener("fbl-worldcup-album-updated", refresh);
    window.addEventListener("fbl-worldcup-streak-updated", refresh);
    return () => {
      window.removeEventListener("fbl-worldcup-album-updated", refresh);
      window.removeEventListener("fbl-worldcup-streak-updated", refresh);
    };
  }, []);

  const cards = useMemo(() => {
    const byId = new Map(entries.map(entry => [entry.playerId, entry]));
    return worldCupPlayers.map(player => ({ player, entry: byId.get(player.id) }));
  }, [entries]);
  const unlockedCount = cards.filter(card => card.entry).length;
  const filteredCards = cards.filter(card => filter === "all" || (filter === "unlocked" ? card.entry : !card.entry));
  const percent = Math.round((unlockedCount / worldCupPlayers.length) * 100);

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="p-5">
          <div className="text-[9px] uppercase font-semibold tracking-[0.2em] text-white/70">Colección mundialista</div>
          <h2 className="font-bebas text-[38px] leading-none mt-1">ALBUM MUNDIALES</h2>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="rounded-xl p-3 bg-white/10"><div className="font-bebas text-[26px] leading-none">{unlockedCount}/{worldCupPlayers.length}</div><div className="text-[9px] text-white/70">cromos</div></div>
            <div className="rounded-xl p-3 bg-white/10"><div className="font-bebas text-[26px] leading-none">{percent}%</div><div className="text-[9px] text-white/70">completado</div></div>
            <div className="rounded-xl p-3 bg-white/10"><div className="font-bebas text-[26px] leading-none">{streak.current}</div><div className="text-[9px] text-white/70">racha mundial</div></div>
          </div>
          <div className="h-2 rounded-full bg-white/15 overflow-hidden mt-3"><div className="h-full rounded-full" style={{ width: `${percent}%`, background: "#f8c647" }} /></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl p-1" style={{ background: "rgba(0,0,0,0.05)" }}>
        {(["all", "unlocked", "locked"] as const).map(value => (
          <button key={value} onClick={() => setFilter(value)} className="rounded-lg py-2 text-[10px] font-semibold" style={{ background: filter === value ? "white" : "transparent", color: filter === value ? "#174ea6" : "#6b6b72" }}>
            {value === "all" ? "Todos" : value === "unlocked" ? "Desbloqueados" : "Bloqueados"}
          </button>
        ))}
      </div>

      {filteredCards.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredCards.map(({ player, entry }) => (
            <article key={player.id} className="rounded-2xl p-3 relative overflow-hidden min-h-[150px]" style={{ background: entry ? "linear-gradient(145deg,#fff8e6,#eef3ff)" : "#ece8df", border: entry ? "2px solid #d6a20f" : "1px solid rgba(0,0,0,0.08)", boxShadow: entry ? "0 8px 18px rgba(0,0,0,0.10)" : "none" }}>
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: entry ? "#d6a20f" : "#c9c2b7" }} />
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] mt-1" style={{ color: entry ? "#8a6200" : "#999" }}>{entry ? rarityLabel(player.iconicLevel) : "Cromo oculto"}</div>
              <div className="font-bebas text-[25px] leading-none mt-4" style={{ color: entry ? "#18181b" : "#aaa" }}>{entry ? player.name : "?????"}</div>
              <div className="text-[11px] mt-2" style={{ color: entry ? "#174ea6" : "#aaa" }}>{entry ? player.nationality : "Selección oculta"}</div>
              <div className="text-[10px]" style={{ color: entry ? "#6b6b72" : "#aaa" }}>{entry ? `${player.position} · Mundial ${player.mainWorldCup}` : "Completa retos de Mundiales"}</div>
              {entry && <div className="text-[8px] mt-3" style={{ color: "#9a9a8a" }}>Desbloqueado {new Date(entry.unlockedAt).toLocaleDateString("es-ES")}</div>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
