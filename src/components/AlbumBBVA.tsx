"use client";
import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getPlayerRarity, getUnlockedPlayers } from "@/lib/album";

type Filter = "all" | "unlocked" | "locked";

export default function AlbumBBVA({ onBack }: { onBack: () => void }) {
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [club, setClub] = useState("Todos");
  const [position, setPosition] = useState("Todas");

  useEffect(() => setUnlocked(getUnlockedPlayers()), []);

  const clubs = useMemo(() => ["Todos", ...Array.from(new Set(bbvaPlayers.map(p => p.mainClub))).sort()], []);
  const positions = useMemo(() => ["Todas", ...Array.from(new Set(bbvaPlayers.map(p => p.position))).sort()], []);
  const unlockedSet = new Set(unlocked);
  const filtered = bbvaPlayers.filter(player => {
    const isUnlocked = unlockedSet.has(player.id);
    if (filter === "unlocked" && !isUnlocked) return false;
    if (filter === "locked" && isUnlocked) return false;
    if (club !== "Todos" && player.mainClub !== club) return false;
    if (position !== "Todas" && player.position !== position) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4 pb-10">
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-[11px] font-semibold opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#3a3a3f" }}>
        ← Volver
      </button>

      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#c8920a,#e8aa20)", boxShadow: "0 4px 20px rgba(200,146,10,0.24)" }}>
        <div className="px-5 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] mb-2 text-white/80">Colección persistente</div>
          <h2 className="font-bebas text-[34px] leading-none text-white">ÁLBUM BBVA</h2>
          <p className="text-white/80 text-[12px] mt-1">{unlocked.length} / {bbvaPlayers.length} jugadores desbloqueados</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          ["all", "Todos"],
          ["unlocked", "Desbloqueados"],
          ["locked", "Bloqueados"],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id as Filter)}
            className="text-[10px] font-oswald font-semibold uppercase tracking-wider py-2 rounded-xl"
            style={{ background: filter === id ? "#18181b" : "white", color: filter === id ? "white" : "#6b6b72", border: "1px solid rgba(0,0,0,0.08)" }}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select value={club} onChange={e => setClub(e.target.value)} className="rounded-xl px-3 py-2 text-[12px] outline-none" style={{ background: "white", border: "1px solid rgba(0,0,0,0.10)" }}>
          {clubs.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={position} onChange={e => setPosition(e.target.value)} className="rounded-xl px-3 py-2 text-[12px] outline-none" style={{ background: "white", border: "1px solid rgba(0,0,0,0.10)" }}>
          {positions.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {filtered.map(player => {
          const isUnlocked = unlockedSet.has(player.id);
          return (
            <div key={player.id} className="rounded-xl overflow-hidden min-h-[142px]" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div className="h-[4px]" style={{ background: isUnlocked ? "#c8920a" : "#ddd7ca" }} />
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="font-bebas text-[22px] leading-none" style={{ color: isUnlocked ? "#18181b" : "#c8c1b6" }}>
                    {isUnlocked ? player.displayName.toUpperCase() : "?????"}
                  </div>
                  <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded" style={{ background: isUnlocked ? "#fff8e6" : "#f1eee8", color: isUnlocked ? "#c8920a" : "#aaa" }}>
                    {isUnlocked ? getPlayerRarity(player.category) : "LOCK"}
                  </span>
                </div>
                {isUnlocked ? (
                  <>
                    <div className="text-[10px] mb-2" style={{ color: "#6b6b72" }}>{player.nationality} · {player.position}</div>
                    <div className="flex flex-wrap gap-1">
                      {player.clubs.slice(0, 3).map(clubName => (
                        <span key={clubName} className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "#f6f2ea", color: "#6b6b72" }}>{clubName}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-[11px] font-semibold" style={{ color: "#aaa" }}>No desbloqueado</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
