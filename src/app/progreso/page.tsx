"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfileSummary } from "@/lib/profile";
import { getAlbumObjectives, getAlbumProgress, getAlbumRarityProgress, getTrophyShowcase } from "@/lib/album";
import { trackAlbumOpened } from "@/lib/analytics";
import { ACHIEVEMENTS, getUnlockedAchievements } from "@/lib/achievements";

type Summary = ReturnType<typeof getProfileSummary>;
type AlbumProgress = ReturnType<typeof getAlbumProgress>;
type RarityProgress = ReturnType<typeof getAlbumRarityProgress>;
type Objective = ReturnType<typeof getAlbumObjectives>[number];
type Trophy = ReturnType<typeof getTrophyShowcase>[number];

function StatBox({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="rounded-xl px-3 py-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#9a9a8a" }}>{label}</div>
      <div className="font-bebas text-[28px] leading-none mt-1" style={{ color: "#18181b" }}>{value}</div>
      {detail && <div className="text-[10px]" style={{ color: "#9a9a8a" }}>{detail}</div>}
    </div>
  );
}

export default function ProgresoPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [album, setAlbum] = useState<AlbumProgress | null>(null);
  const [rarities, setRarities] = useState<RarityProgress | null>(null);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    setSummary(getProfileSummary());
    setAlbum(getAlbumProgress());
    setRarities(getAlbumRarityProgress());
    setObjectives(getAlbumObjectives());
    setTrophies(getTrophyShowcase());
    setAchievements(getUnlockedAchievements());
    trackAlbumOpened({ source: "progreso" });
  }, []);

  if (!summary || !album || !rarities) return null;

  const winPct = summary.gamesPlayed ? Math.round((summary.wins / summary.gamesPlayed) * 100) : 0;
  const unlockedTrophies = trophies.filter(trophy => trophy.unlocked).length;
  const nextObjective = objectives.find(objective => objective.percent < 100);

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Volver</Link>
          <div className="flex gap-2">
            <Link href="/album" className="text-[11px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#fffbf5", color: "#c8920a" }}>Álbum</Link>
            <Link href="/vitrina" className="text-[11px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#f8f5f0", color: "#6b6b72" }}>Vitrina</Link>
            <Link href="/perfil" className="text-[11px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#f8f5f0", color: "#6b6b72" }}>Perfil</Link>
          </div>
        </div>

        <section className="rounded-3xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 26px rgba(0,0,0,0.06)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#c8920a" }}>Tu progreso</div>
          <h1 className="font-bebas text-[42px] leading-none" style={{ color: "#18181b" }}>ÁLBUM, RACHA Y TROFEOS</h1>
          <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>Tu progreso se guarda en este navegador.</p>
          <div className="mt-4 rounded-2xl p-4" style={{ background: "#fffbf5", border: "1px solid rgba(200,146,10,0.22)" }}>
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>Álbum BBVA</div>
                <div className="font-bebas text-[46px] leading-none" style={{ color: "#18181b" }}>{album.unlockedCount}/{album.total}</div>
              </div>
              <div className="font-bebas text-[32px] leading-none" style={{ color: "#c8920a" }}>{album.percent}%</div>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden mt-3" style={{ background: "#efe4c9" }}>
              <div className="h-full rounded-full" style={{ width: `${album.percent}%`, background: "linear-gradient(90deg,#c8920a,#fac840)" }} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <StatBox label="Partidas" value={summary.gamesPlayed} detail="jugadas" />
          <StatBox label="Victorias" value={`${winPct}%`} detail={`${summary.wins}/${summary.gamesPlayed}`} />
          <StatBox label="Racha" value={summary.currentStreak} detail={`mejor ${summary.bestStreak}`} />
          <StatBox label="Trofeos" value={`${unlockedTrophies}/${trophies.length}`} detail="desbloqueados" />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 className="font-bebas text-[27px] leading-none" style={{ color: "#18181b" }}>RAREZAS</h2>
            <div className="mt-3 flex flex-col gap-2">
              {Object.entries(rarities).map(([rarity, value]) => (
                <div key={rarity}>
                  <div className="flex items-center justify-between text-[11px] font-semibold mb-1" style={{ color: "#6b6b72" }}>
                    <span>{rarity}</span>
                    <span>{value.unlocked}/{value.total}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f0ede6" }}>
                    <div className="h-full rounded-full" style={{ width: `${value.total ? Math.round((value.unlocked / value.total) * 100) : 0}%`, background: "#c8920a" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 className="font-bebas text-[27px] leading-none" style={{ color: "#18181b" }}>PRÓXIMA RECOMPENSA</h2>
            {nextObjective ? (
              <div className="mt-3 rounded-xl p-3" style={{ background: "#f0faf2", border: "1px solid rgba(30,107,46,0.16)" }}>
                <div className="font-oswald font-semibold text-[14px]" style={{ color: "#18181b" }}>{nextObjective.label}</div>
                <div className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>{nextObjective.current}/{nextObjective.target}</div>
                <div className="h-2 rounded-full overflow-hidden mt-2" style={{ background: "rgba(30,107,46,0.12)" }}>
                  <div className="h-full rounded-full" style={{ width: `${nextObjective.percent}%`, background: "#1e6b2e" }} />
                </div>
              </div>
            ) : (
              <p className="text-[12px] mt-2" style={{ color: "#9a9a8a" }}>Todas las recompensas disponibles están completadas.</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[27px] leading-none" style={{ color: "#18181b" }}>LOGROS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {ACHIEVEMENTS.map(item => {
              const unlocked = achievements.includes(item.id);
              return (
                <div key={item.id} className="rounded-xl px-3 py-2"
                  style={{ background: unlocked ? "#fff8e6" : "#f3efe8", border: `1px solid ${unlocked ? "rgba(200,146,10,0.25)" : "rgba(0,0,0,0.06)"}` }}>
                  <div className="font-oswald font-semibold text-[13px]" style={{ color: unlocked ? "#18181b" : "#aaa" }}>
                    {unlocked ? "🏆" : "🔒"} {item.label}
                  </div>
                  <p className="text-[10px] mt-0.5" style={{ color: "#9a9a8a" }}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
