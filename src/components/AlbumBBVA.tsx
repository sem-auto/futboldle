"use client";
import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import {
  getAlbumEntries,
  getAlbumObjectives,
  getAlbumProgress,
  getAlbumRarityProgress,
  getCollectorLevel,
  getFeaturedClubProgress,
  getClubProgress,
  getHistoricalClubShield,
  getPlayerCuriosity,
  getUnlockedPlayers,
  toggleFavoritePlayer,
} from "@/lib/album";
import type { AlbumRarity } from "@/lib/album";
import { trackEvent } from "@/lib/analytics";

type Filter = "all" | "unlocked" | "locked";

const BBVA_FILTER_CLUBS = new Set([
  "Alavés", "Almería", "Athletic", "Athletic Club", "Atlético", "Atlético de Madrid", "Barcelona",
  "Betis", "Celta", "Celta de Vigo", "Deportivo", "Deportivo de La Coruña", "Eibar", "Espanyol",
  "Getafe", "Granada", "Las Palmas", "Levante", "Málaga", "Mallorca", "Osasuna", "Racing",
  "Rayo", "Rayo Vallecano", "Real Madrid", "Real Madrid B", "Real Sociedad", "Sevilla",
  "Valencia", "Valladolid", "Villarreal", "Zaragoza",
]);

function clubBadge(clubName: string) {
  return clubName
    .replace("Atlético de Madrid", "Atlético")
    .replace("Athletic Club", "Athletic")
    .split(/\s+/)
    .map(part => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function rarityStyle(rarity: AlbumRarity) {
  if (rarity === "ICONO") return { label: "ICONO", stars: "★★★★", bar: "#18181b", bg: "#fff8e6", color: "#111" };
  if (rarity === "LEGENDARIO") return { label: "LEGENDARIO", stars: "★★★", bar: "#c8920a", bg: "#fffbf0", color: "#8a6200" };
  if (rarity === "CORE") return { label: "CORE", stars: "★★", bar: "#1e6b2e", bg: "#f0faf2", color: "#1e6b2e" };
  return { label: "CULTO", stars: "★", bar: "#7c3aed", bg: "#f5f0ff", color: "#6d28d9" };
}

function cardSurface(isUnlocked: boolean, rarity: AlbumRarity) {
  const style = rarityStyle(rarity);
  if (!isUnlocked) {
    return {
      background: "#f3efe8",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    };
  }
  const glow = rarity === "ICONO" ? "rgba(24,24,27,0.20)" : rarity === "LEGENDARIO" ? "rgba(200,146,10,0.28)" : `${style.bar}20`;
  return {
    background: `linear-gradient(145deg, ${style.bg} 0%, #fffdf7 48%, ${style.bg} 100%)`,
    border: `2px solid ${style.bar}`,
    boxShadow: `0 8px 18px rgba(0,0,0,0.11), inset 0 0 0 3px rgba(255,255,255,0.55), 0 0 18px ${glow}`,
  };
}

function getBbvaDebutYear(years: string) {
  return years.match(/\d{4}/)?.[0] ?? "Era BBVA";
}

function getBestBbvaSeason(years: string) {
  const yearsFound = years.match(/\d{4}/g) ?? [];
  const best = yearsFound[yearsFound.length - 1] ?? yearsFound[0];
  if (!best) return "Era BBVA";
  const end = String((Number(best) + 1) % 100).padStart(2, "0");
  return `${best}/${end}`;
}

function PlayerPortrait({ name, color, locked = false, size = "card" }: { name: string; color: string; locked?: boolean; size?: "card" | "modal" }) {
  const dimensions = size === "modal" ? "w-20 h-20" : "w-14 h-14";
  const head = size === "modal" ? "w-8 h-8" : "w-6 h-6";
  const body = size === "modal" ? "w-12 h-7" : "w-9 h-5";
  return (
    <div className={`${dimensions} rounded-full flex items-center justify-center relative overflow-hidden`}
      style={{ background: locked ? "#e5ded2" : "linear-gradient(135deg,#fffdf5,#efe1b8)", border: "1px solid rgba(0,0,0,0.10)", boxShadow: locked ? "none" : "inset 0 0 0 2px rgba(255,255,255,0.45)" }}>
      {locked ? (
        <span className="font-bebas text-[24px]" style={{ color: "#b8b0a4" }}>?</span>
      ) : (
        <>
          <div className={`${head} rounded-full absolute top-2`} style={{ background: color, opacity: 0.82 }} />
          <div className={`${body} rounded-t-full absolute bottom-2`} style={{ background: color, opacity: 0.72 }} />
          <span className="font-bebas text-[13px] absolute bottom-1" style={{ color: "#18181b" }}>{name.slice(0, 1).toUpperCase()}</span>
        </>
      )}
    </div>
  );
}

export default function AlbumBBVA({ onBack }: { onBack: () => void }) {
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [version, setVersion] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [club, setClub] = useState("Todos");
  const [position, setPosition] = useState("Todas");
  const [showAllCollections, setShowAllCollections] = useState(false);

  useEffect(() => setUnlocked(getUnlockedPlayers()), [version]);

  useEffect(() => {
    trackEvent("album_visit");
  }, []);

  const clubs = useMemo(() => ["Todos", ...Array.from(new Set(
    bbvaPlayers.flatMap(p => p.clubs).filter(clubName => BBVA_FILTER_CLUBS.has(clubName))
  )).sort((a, b) => a.localeCompare(b, "es"))], []);
  const positions = useMemo(() => ["Todas", ...Array.from(new Set(bbvaPlayers.map(p => p.position))).sort()], []);

  const albumProgress = getAlbumProgress();
  const collectorLevel = getCollectorLevel(albumProgress.unlockedCount);
  const rarityProgress = getAlbumRarityProgress();
  const clubProgress = getFeaturedClubProgress(["Valencia", "Atlético de Madrid", "Sevilla", "Barcelona", "Villarreal"]);
  const allClubProgress = clubs.filter(item => item !== "Todos").map(getClubProgress).filter(item => item.total > 0);
  const objectives = getAlbumObjectives();
  const entries = getAlbumEntries();
  const filtered = entries.filter(entry => {
    if (filter === "unlocked" && !entry.isUnlocked) return false;
    if (filter === "locked" && entry.isUnlocked) return false;
    if (club !== "Todos" && !entry.player.clubs.includes(club)) return false;
    if (position !== "Todas" && entry.player.position !== position) return false;
    return true;
  });
  const selected = selectedId ? entries.find(entry => entry.player.id === selectedId) : null;

  function toggleFavorite(playerId: number) {
    toggleFavoritePlayer(playerId);
    setVersion(v => v + 1);
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-[11px] font-semibold opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#3a3a3f" }}>
        ← Volver
      </button>

      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#c8920a,#e8aa20)", boxShadow: "0 4px 20px rgba(200,146,10,0.24)" }}>
        <div className="px-5 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] mb-2 text-white/80">Colección persistente</div>
          <h2 className="font-bebas text-[34px] leading-none text-white">ÁLBUM BBVA</h2>
          <p className="text-white/80 text-[12px] mt-1">
            {albumProgress.unlockedCount} / {albumProgress.total} jugadores desbloqueados · {albumProgress.percent}%
          </p>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {(["ICONO", "LEGENDARIO", "CORE", "CULTO"] as const).map(rarity => (
              <div key={rarity} className="rounded-lg px-2 py-1.5" style={{ background: "rgba(255,255,255,0.16)" }}>
                <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-white/75">{rarity}</div>
                <div className="font-bebas text-[17px] leading-none text-white">
                  {rarityProgress[rarity].unlocked}/{rarityProgress[rarity].total}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.16)" }}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-oswald font-semibold text-[11px] text-white">Nivel {collectorLevel.level}</span>
              <span className="text-[10px] text-white/80">{collectorLevel.current}/{collectorLevel.nextTarget} cromos</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.22)" }}>
              <div className="h-full rounded-full" style={{ width: `${collectorLevel.percent}%`, background: "white" }} />
            </div>
          </div>
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

      <div className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="font-bebas text-[20px] leading-none mb-2" style={{ color: "#18181b" }}>PROGRESO POR EQUIPOS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {clubProgress.map(item => (
            <button key={item.club} onClick={() => setClub(item.club)} className="text-left rounded-lg px-3 py-2"
              style={{ background: club === item.club ? "#fffbf5" : "#f8f5f0", border: `1px solid ${club === item.club ? "rgba(200,146,10,0.35)" : "rgba(0,0,0,0.06)"}` }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bebas"
                  style={{ background: "#18181b", color: "white" }}>{clubBadge(item.club)}</span>
                <span className="font-oswald font-semibold text-[12px] flex-1" style={{ color: "#18181b" }}>{item.club.replace("Atlético de Madrid", "Atlético")}</span>
                <span className="text-[10px] font-semibold" style={{ color: "#9a9a8a" }}>{item.unlocked}/{item.total} · {item.percent}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#ece8e0" }}>
                <div className="h-full rounded-full" style={{ width: `${item.percent}%`, background: "#c8920a" }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end -mt-2">
        <button onClick={() => setShowAllCollections(value => !value)} className="text-[10px] font-semibold px-3 py-2 rounded-xl" style={{ background: "#fffbf5", color: "#8a6200", border: "1px solid rgba(200,146,10,0.22)" }}>
          {showAllCollections ? "Ocultar colecciones" : "Ver todas las colecciones"}
        </button>
      </div>

      {showAllCollections && (
        <div className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="font-bebas text-[22px] leading-none mb-2" style={{ color: "#18181b" }}>TODAS LAS COLECCIONES</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto pr-1">
            {allClubProgress.map(item => (
              <button key={item.club} onClick={() => setClub(item.club)} className="text-left rounded-lg px-3 py-2" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bebas" style={{ background: "#18181b", color: "white" }}>{clubBadge(item.club)}</span>
                  <span className="font-oswald font-semibold text-[12px] flex-1" style={{ color: "#18181b" }}>{item.club}</span>
                  <span className="text-[10px] font-semibold" style={{ color: "#9a9a8a" }}>{item.unlocked}/{item.total} ? {item.percent}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#ece8e0" }}>
                  <div className="h-full rounded-full" style={{ width: `${item.percent}%`, background: "#c8920a" }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="font-bebas text-[20px] leading-none mb-2" style={{ color: "#18181b" }}>OBJETIVOS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {objectives.map(objective => (
            <div key={objective.id} className="rounded-lg px-3 py-2" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-oswald font-semibold text-[12px]" style={{ color: "#18181b" }}>{objective.label}</span>
                <span className="text-[10px] font-semibold" style={{ color: "#9a9a8a" }}>{objective.current}/{objective.target}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#ece8e0" }}>
                <div className="h-full rounded-full" style={{ width: `${objective.percent}%`, background: objective.percent >= 100 ? "#1e6b2e" : "#c8920a" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {filtered.map(({ player, isUnlocked, isFavorite, unlockedAt, rarity }) => {
          const style = rarityStyle(rarity);
          return (
            <div key={player.id} className={`rounded-xl overflow-hidden min-h-[190px] relative ${isUnlocked ? "album-card-unlocked anim-pop" : ""}`}
              style={cardSurface(isUnlocked, rarity)}>
              {isUnlocked && (
                <div className="pointer-events-none absolute inset-0 z-0"
                  style={{ background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.34) 42%, transparent 62%)", mixBlendMode: "screen" }} />
              )}
              <div className="h-[5px]" style={{ background: isUnlocked ? style.bar : "#ddd7ca" }} />
              {isUnlocked && (
                <button onClick={() => toggleFavorite(player.id)} className="absolute top-2 right-2 w-7 h-7 rounded-full text-[13px]"
                  style={{ background: "rgba(255,255,255,0.75)", color: isFavorite ? "#c8920a" : "#b8b0a4", border: "1px solid rgba(0,0,0,0.08)" }}>
                  ★
                </button>
              )}
              {isUnlocked && (
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center font-bebas text-[10px]"
                  style={{ background: "#18181b", color: "white", border: "1px solid rgba(255,255,255,0.55)", boxShadow: "0 2px 8px rgba(0,0,0,0.16)" }}>
                  {getHistoricalClubShield(player.mainClub)}
                </div>
              )}
              <button onClick={() => setSelectedId(player.id)} className="w-full text-left p-3 pt-2">
                <div className="mx-auto mb-2">
                  <PlayerPortrait name={player.displayName} color={style.bar} locked={!isUnlocked} />
                </div>
                <div className="mb-2">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: isUnlocked ? style.color : "#aaa" }}>
                    {isUnlocked ? `${style.stars} ${style.label}` : "CROMO OCULTO"}
                  </div>
                  <div className="font-bebas text-[25px] leading-none mt-1 pr-7" style={{ color: isUnlocked ? "#18181b" : "#c8c1b6" }}>
                    {isUnlocked ? player.displayName.toUpperCase() : "?????"}
                  </div>
                </div>
                {isUnlocked ? (
                  <>
                    <div className="text-[11px] mb-1.5" style={{ color: "#6b6b72" }}>⚑ {player.nationality}</div>
                    <div className="text-[11px] mb-2" style={{ color: "#6b6b72" }}>⚽ {player.position}</div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {player.clubs.map(clubName => (
                        <span key={clubName} className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.65)", color: "#6b6b72", border: "1px solid rgba(0,0,0,0.06)" }}>{clubName}</span>
                      ))}
                    </div>
                    <div className="text-[10px] leading-snug mb-2" style={{ color: "#8a6200" }}>
                      <strong>Dato curioso:</strong> {getPlayerCuriosity(player)}
                    </div>
                    {unlockedAt && <div className="text-[9px] font-semibold mt-2" style={{ color: "#9a9a8a" }}>Desbloqueado: {unlockedAt}</div>}
                  </>
                ) : (
                  <div className="flex flex-col gap-1 text-[11px] font-semibold" style={{ color: "#9a9a8a" }}>
                    <span>Pista mínima: {player.position}</span>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.40)" }} onClick={() => setSelectedId(null)}>
          <div className="w-full max-w-sm rounded-2xl overflow-hidden anim-in" style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
            <div className="h-1.5" style={{ background: rarityStyle(selected.rarity).bar }} />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: rarityStyle(selected.rarity).color }}>{selected.rarity}</div>
                  <div className="font-bebas text-[34px] leading-none" style={{ color: "#18181b" }}>
                    {selected.isUnlocked ? selected.player.displayName.toUpperCase() : "?????"}
                  </div>
                </div>
                <button onClick={() => setSelectedId(null)} className="text-[18px]" style={{ color: "#9a9a8a" }}>×</button>
              </div>
              <div className="my-4 flex justify-center">
                <PlayerPortrait name={selected.player.displayName} color={rarityStyle(selected.rarity).bar} locked={!selected.isUnlocked} size="modal" />
              </div>
              <div className="grid gap-2 text-[12px]" style={{ color: "#6b6b72" }}>
                <div><strong>Rareza:</strong> {selected.rarity}</div>
                <div><strong>Equipos:</strong> {selected.player.clubs.join(" · ")}</div>
                <div><strong>Posición:</strong> {selected.player.position}</div>
                <div><strong>Nacionalidad:</strong> {selected.player.nationality}</div>
                <div><strong>A?o debut BBVA:</strong> {getBbvaDebutYear(selected.player.years)}</div>
                <div><strong>Mejor temporada BBVA:</strong> {getBestBbvaSeason(selected.player.years)}</div>
                {selected.isUnlocked ? (
                  <>
                    <div><strong>Desbloqueado mediante:</strong> {selected.source ?? "Futboldle"}</div>
                    <div><strong>Fecha:</strong> {selected.unlockedAt ?? "Guardado"}</div>
                    <div><strong>Dato curioso:</strong> {getPlayerCuriosity(selected.player)}</div>
                    <div><strong>Logros relacionados:</strong> Top Goleadores · Top Asistencias · Colección {selected.player.mainClub}</div>
                  </>
                ) : (
                  <div><strong>Estado:</strong> todavía no desbloqueado</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
