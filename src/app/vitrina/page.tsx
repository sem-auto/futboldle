"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getTrophyShowcase } from "@/lib/album";

type Trophy = ReturnType<typeof getTrophyShowcase>[number];

function trophyBadge(trophy: Trophy) {
  if ("club" in trophy && trophy.club) {
    return trophy.club
      .replace("Atlético de Madrid", "Atlético")
      .replace("Athletic Club", "Athletic")
      .split(/\s+/)
      .map(part => part[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  }
  return "🏆";
}

export default function VitrinaPage() {
  const [trophies, setTrophies] = useState<Trophy[]>([]);

  useEffect(() => setTrophies(getTrophyShowcase()), []);

  const groups = useMemo(() => {
    return trophies.reduce<Record<string, Trophy[]>>((acc, trophy) => {
      acc[trophy.category] ??= [];
      acc[trophy.category].push(trophy);
      return acc;
    }, {});
  }, [trophies]);

  async function shareTrophy(trophy: Trophy) {
    const text = `🏆 ${trophy.label}\nFutboldle`;
    try { await navigator.clipboard.writeText(text); } catch { alert(text); }
  }

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[11px] font-semibold" style={{ color: "#6b6b72" }}>← Volver</Link>
          <Link href="/perfil" className="text-[11px] font-semibold" style={{ color: "#c8920a" }}>Perfil</Link>
        </div>

        <section className="rounded-2xl px-5 py-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#c8920a" }}>Logros permanentes</div>
          <h1 className="font-bebas text-[36px] leading-none" style={{ color: "#18181b" }}>VITRINA DE TROFEOS</h1>
          <p className="text-[12px]" style={{ color: "#9a9a8a" }}>{trophies.filter(t => t.unlocked).length}/{trophies.length} trofeos desbloqueados</p>
        </section>

        {Object.entries(groups).map(([category, items]) => (
          <section key={category} className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="font-bebas text-[22px] leading-none mb-2" style={{ color: "#18181b" }}>{category}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map(trophy => (
                <div key={trophy.id} className="rounded-lg px-3 py-2"
                  style={{ background: trophy.unlocked ? "#fff8e6" : "#f3efe8", border: `1px solid ${trophy.unlocked ? "rgba(200,146,10,0.30)" : "rgba(0,0,0,0.06)"}` }}>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bebas"
                      style={{ background: trophy.unlocked ? "#c8920a" : "#ddd7ca", color: "white" }}>{trophyBadge(trophy)}</span>
                    <div className="flex-1">
                      <div className="font-oswald font-semibold text-[13px]" style={{ color: trophy.unlocked ? "#18181b" : "#aaa" }}>{trophy.label}</div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: trophy.unlocked ? "#c8920a" : "#bbb" }}>
                        {trophy.unlocked ? "Desbloqueado" : "Bloqueado"}
                      </div>
                    </div>
                    {trophy.unlocked && (
                      <button onClick={() => shareTrophy(trophy)} className="text-[9px] font-semibold px-2 py-1 rounded" style={{ background: "white", color: "#c8920a" }}>
                        Compartir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
