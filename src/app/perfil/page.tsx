"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getFavoritePlayers, getTrophyShowcase } from "@/lib/album";
import { getProfileSummary } from "@/lib/profile";

type Summary = ReturnType<typeof getProfileSummary>;

export default function PerfilPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [favorites, setFavorites] = useState<typeof bbvaPlayers>([]);
  const [trophyCount, setTrophyCount] = useState(0);

  useEffect(() => {
    const data = getProfileSummary();
    const favoriteIds = new Set(getFavoritePlayers());
    setSummary(data);
    setFavorites(bbvaPlayers.filter(player => favoriteIds.has(player.id)));
    setTrophyCount(getTrophyShowcase().filter(trophy => trophy.unlocked).length);
  }, []);

  if (!summary) return null;

  const winPct = summary.gamesPlayed ? Math.round((summary.wins / summary.gamesPlayed) * 100) : 0;

  async function shareProfile() {
    if (!summary) return;
    const text = `Mi colección Futboldle\n${summary.cardsUnlocked}/${summary.collectionTotal} cromos\n${trophyCount} trofeos\nRacha máxima: ${summary.bestStreak}\n\nFutboldle`;
    try { await navigator.clipboard.writeText(text); } catch { alert(text); }
  }

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[11px] font-semibold" style={{ color: "#6b6b72" }}>← Volver</Link>
          <Link href="/vitrina" className="text-[11px] font-semibold" style={{ color: "#c8920a" }}>Vitrina</Link>
        </div>

        <section className="rounded-2xl px-5 py-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#c8920a" }}>Perfil local</div>
          <h1 className="font-bebas text-[36px] leading-none" style={{ color: "#18181b" }}>TU PROGRESO</h1>
          <p className="text-[12px]" style={{ color: "#9a9a8a" }}>{summary.cardsUnlocked}/{summary.collectionTotal} cromos · {summary.collectionPercent}% colección</p>
          <button onClick={shareProfile} className="mt-3 font-oswald font-semibold uppercase tracking-wider text-[10px] px-3 py-2 rounded-lg"
            style={{ background: "#18181b", color: "white" }}>Compartir progreso</button>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            ["Partidas", summary.gamesPlayed],
            ["Victorias", `${winPct}%`],
            ["Racha actual", summary.currentStreak],
            ["Racha máxima", summary.bestStreak],
            ["Top10", summary.top10Completed],
            ["Top20", summary.top20Completed],
            ["Wordles", summary.wordlesCompleted],
            ["Trayectorias", summary.trayectoriasCompleted],
            ["Cracks", summary.cracksCompleted],
            ["Rareza máxima", summary.highestRarity],
            ["Jugador raro", summary.rarestPlayer],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl px-3 py-2" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#bbb" }}>{label}</div>
              <div className="font-bebas text-[24px] leading-none" style={{ color: "#18181b" }}>{value}</div>
            </div>
          ))}
        </section>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="font-bebas text-[22px] leading-none mb-2" style={{ color: "#18181b" }}>COLECCIÓN</div>
          <div className="grid grid-cols-4 gap-2">
            {(["ICONO", "LEGENDARIO", "CORE", "CULTO"] as const).map(rarity => (
              <div key={rarity} className="rounded-lg px-2 py-1.5" style={{ background: "#f8f5f0" }}>
                <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#9a9a8a" }}>{rarity}</div>
                <div className="font-bebas text-[18px] leading-none" style={{ color: "#18181b" }}>
                  {summary.rarityProgress[rarity].unlocked}/{summary.rarityProgress[rarity].total}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[11px] mt-3" style={{ color: "#9a9a8a" }}>Trofeos obtenidos: {trophyCount}</div>
        </section>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="font-bebas text-[22px] leading-none mb-2" style={{ color: "#18181b" }}>★ MIS FAVORITOS</div>
          {favorites.length === 0 ? (
            <div className="text-[12px]" style={{ color: "#9a9a8a" }}>Marca cromos como favoritos desde el Álbum.</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {favorites.map(player => (
                <span key={player.id} className="text-[11px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#fff8e6", color: "#8a6200" }}>{player.displayName}</span>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
