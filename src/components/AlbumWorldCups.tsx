"use client";

import { useEffect, useMemo, useState } from "react";
import { worldCupPlayers } from "@/data/worldcups";
import { getWorldCupAlbum, getWorldCupStreak, type WorldCupAlbumEntry, type WorldCupStreak } from "@/lib/worldCupCollection";
import { trackEvent } from "@/lib/analytics";

function rarityLabel(level: string) {
  if (level === "icono") return "Legendario";
  if (level === "legendario") return "Epico";
  if (level === "core") return "Raro";
  return "Comun";
}

function rarityStyle(level: string) {
  if (level === "icono") return { color: "#9a6b00", border: "#d6a20f", background: "linear-gradient(145deg,#fff2af,#ffffff,#e8b82e)" };
  if (level === "legendario") return { color: "#6d28d9", border: "#8b5cf6", background: "linear-gradient(145deg,#f3e8ff,#ffffff,#ddd6fe)" };
  if (level === "core") return { color: "#174ea6", border: "#3b82f6", background: "linear-gradient(145deg,#e8f0ff,#ffffff,#c8dcff)" };
  return { color: "#1e6b2e", border: "#55a96a", background: "linear-gradient(145deg,#eaf8ed,#ffffff,#cdebd4)" };
}

export default function AlbumWorldCups() {
  const [entries, setEntries] = useState<WorldCupAlbumEntry[]>([]);
  const [streak, setStreak] = useState<WorldCupStreak>({ current: 0, best: 0, lastDayNumber: 0, playedDays: 0 });
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [rewardedCollections, setRewardedCollections] = useState<string[]>([]);

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
  const unlockedCards = cards.filter(card => card.entry);
  const filteredCards = cards.filter(card => filter === "all" || (filter === "unlocked" ? card.entry : !card.entry));
  const percent = Math.round((unlockedCount / worldCupPlayers.length) * 100);
  const rarityCounts = ["culto", "core", "legendario", "icono"].map(level => ({ level, count: unlockedCards.filter(card => card.player.iconicLevel === level).length }));
  const latestCards = [...unlockedCards].sort((a, b) => (b.entry?.unlockedAt ?? "").localeCompare(a.entry?.unlockedAt ?? "")).slice(0, 4);
  const miniCollections = [
    { name: "Espana 2010", country: "Espana", year: 2010, color: "#c8920a" },
    { name: "Italia 2006", country: "Italia", year: 2006, color: "#1e6b2e" },
    { name: "Alemania 2014", country: "Alemania", year: 2014, color: "#18181b" },
    { name: "Argentina 2022", country: "Argentina", year: 2022, color: "#174ea6" },
    { name: "Brasil 2002", country: "Brasil", year: 2002, color: "#e2ad00" },
  ].map(collection => {
    const members = cards.filter(card => card.player.nationality === collection.country && card.player.worldCups.includes(collection.year));
    return { ...collection, total: members.length, unlocked: members.filter(member => member.entry).length };
  }).filter(collection => collection.total > 0);

  useEffect(() => {
    const key = "fbl-worldcup-collection-rewards-v1";
    try {
      const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
      const rewarded = Array.isArray(parsed) ? parsed.filter(value => typeof value === "string") : [];
      const newlyCompleted = miniCollections.filter(collection => collection.unlocked === collection.total && !rewarded.includes(collection.name));
      const next = [...rewarded, ...newlyCompleted.map(collection => collection.name)];
      if (newlyCompleted.length) {
        localStorage.setItem(key, JSON.stringify(next));
        for (const collection of newlyCompleted) {
          const achievement = { id: `worldcup-collection-${collection.year}`, label: `Coleccion ${collection.name}`, description: "Has reunido a toda una generacion mundialista." };
          window.dispatchEvent(new CustomEvent("fbl-achievement-unlocked", { detail: achievement }));
          trackEvent("achievement_unlocked", { achievementId: achievement.id, label: achievement.label, seasonId: "world-cups" });
        }
      }
      setRewardedCollections(next);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

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
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {rarityCounts.map(item => <div key={item.level} className="rounded-lg px-2 py-1.5 bg-white/10"><div className="text-[7px] uppercase font-semibold text-white/65">{rarityLabel(item.level)}</div><div className="font-bebas text-[18px] leading-none">{item.count}</div></div>)}
          </div>
          <div className="text-[9px] text-white/70 mt-2">Insignias de selecciones: {rewardedCollections.length}/{miniCollections.length}</div>
        </div>
      </div>

      {latestCards.length > 0 && <div className="rounded-2xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}><div className="text-[9px] uppercase font-semibold tracking-[0.18em] mb-2" style={{ color: "#9a9a8a" }}>Ultimos desbloqueados</div><div className="flex gap-2 overflow-x-auto pb-1">{latestCards.map(({ player }) => { const style = rarityStyle(player.iconicLevel); return <div key={player.id} className="min-w-[130px] rounded-xl px-3 py-2" style={{ background: style.background, border: `1px solid ${style.border}` }}><div className="text-[8px] uppercase font-semibold" style={{ color: style.color }}>{rarityLabel(player.iconicLevel)}</div><div className="font-bebas text-[20px] leading-none mt-1">{player.name}</div><div className="text-[9px] mt-1" style={{ color: "#6b6b72" }}>{player.nationality}</div></div>})}</div></div>}

      <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}><div className="text-[9px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Colecciones de campeones</div><h3 className="font-bebas text-[27px] leading-none mt-1">COMPLETA UNA GENERACION</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">{miniCollections.map(collection => { const progress = Math.round(collection.unlocked / collection.total * 100); return <div key={collection.name} className="rounded-xl px-3 py-2" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}><div className="flex items-center justify-between"><span className="text-[11px] font-semibold">{collection.name}</span><span className="text-[10px]" style={{ color: collection.color }}>{collection.unlocked}/{collection.total}</span></div><div className="h-1.5 rounded-full overflow-hidden mt-2" style={{ background: "rgba(0,0,0,0.07)" }}><div className="h-full rounded-full" style={{ width: `${progress}%`, background: collection.color }} /></div>{progress === 100 && <div className="text-[9px] font-semibold mt-1" style={{ color: "#1e6b2e" }}>Coleccion completada</div>}</div>})}</div></div>

      <div className="grid grid-cols-3 gap-2 rounded-xl p-1" style={{ background: "rgba(0,0,0,0.05)" }}>
        {(["all", "unlocked", "locked"] as const).map(value => (
          <button key={value} onClick={() => setFilter(value)} className="rounded-lg py-2 text-[10px] font-semibold" style={{ background: filter === value ? "white" : "transparent", color: filter === value ? "#174ea6" : "#6b6b72" }}>
            {value === "all" ? "Todos" : value === "unlocked" ? "Desbloqueados" : "Bloqueados"}
          </button>
        ))}
      </div>

      {filteredCards.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredCards.map(({ player, entry }) => {
            const style = rarityStyle(player.iconicLevel);
            return (
            <article key={player.id} className="rounded-2xl p-3 relative overflow-hidden min-h-[150px]" style={{ background: entry ? style.background : "#ece8df", border: entry ? `2px solid ${style.border}` : "1px solid rgba(0,0,0,0.08)", boxShadow: entry ? `0 8px 18px rgba(0,0,0,0.10), 0 0 14px ${style.border}25` : "none" }}>
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: entry ? style.border : "#c9c2b7" }} />
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] mt-1" style={{ color: entry ? style.color : "#999" }}>{entry ? rarityLabel(player.iconicLevel) : "Cromo oculto"}</div>
              <div className="font-bebas text-[25px] leading-none mt-4" style={{ color: entry ? "#18181b" : "#aaa" }}>{entry ? player.name : "?????"}</div>
              <div className="text-[11px] mt-2" style={{ color: entry ? "#174ea6" : "#aaa" }}>{entry ? player.nationality : "Selección oculta"}</div>
              <div className="text-[10px]" style={{ color: entry ? "#6b6b72" : "#aaa" }}>{entry ? `${player.position} · Mundial ${player.mainWorldCup}` : "Completa retos de Mundiales"}</div>
              {entry && <div className="text-[8px] mt-3" style={{ color: "#9a9a8a" }}>Desbloqueado {new Date(entry.unlockedAt).toLocaleDateString("es-ES")}</div>}
            </article>
          )})}
        </div>
      )}
    </section>
  );
}
