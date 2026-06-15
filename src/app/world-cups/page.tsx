"use client";

import { useEffect } from "react";
import Link from "next/link";
import { mundialdleChallenges, worldCupPlayers, worldCupTournaments } from "@/data/worldcups";
import { trackEvent, trackModeEntered, trackSeasonEntered } from "@/lib/analytics";

function ComingSoonCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <article className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#9a9a8a" }}>Proximamente</div>
      <h2 className="font-bebas text-[27px] leading-none" style={{ color: "#18181b" }}>{title}</h2>
      <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{subtitle}</p>
    </article>
  );
}

export default function WorldCupsPage() {
  useEffect(() => {
    trackEvent("season_opened_world_cups", { season: "world-cups" });
    trackSeasonEntered("world-cups", { source: "season_page" });
  }, []);

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver</Link>
          <span className="text-[10px] font-semibold px-3 py-1 rounded-full" style={{ background: "#eef3ff", color: "#174ea6", border: "1px solid rgba(23,78,166,0.18)" }}>Nueva temporada</span>
        </div>

        <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 12px 34px rgba(0,0,0,0.08)" }}>
          <div className="px-5 py-6 md:px-7 md:py-7" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">Temporada 2</div>
            <h1 className="font-bebas text-[54px] md:text-[68px] leading-none">MUNDIALES</h1>
            <p className="text-[15px] text-white/80 mt-1">2002-2026 {"\u00b7"} La primera expansion real de Futboldle.</p>
          </div>

          <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-[1.35fr_0.65fr] gap-3">
            <Link
              href="/world-cups/mundialdle"
              onClick={() => trackModeEntered("mundialdle", "world-cups", { source: "season_page" })}
              className="rounded-2xl p-4 transition-transform active:scale-[0.99]"
              style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.22)" }}
            >
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#174ea6" }}>Jugable ahora</div>
              <h2 className="font-bebas text-[40px] leading-none" style={{ color: "#18181b" }}>MUNDIALDLE</h2>
              <p className="text-[13px] mt-1" style={{ color: "#6b6b72" }}>Adivina el jugador mundialista con pistas progresivas.</p>
              <div className="mt-4 font-oswald font-semibold uppercase tracking-wider text-[12px]" style={{ color: "#174ea6" }}>Jugar {"\u2192"}</div>
            </Link>

            <div className="rounded-2xl p-4" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.20)" }}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>Base inicial</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div>
                  <div className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{worldCupPlayers.length}</div>
                  <div className="text-[10px]" style={{ color: "#9a9a8a" }}>jugadores</div>
                </div>
                <div>
                  <div className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{mundialdleChallenges.length}</div>
                  <div className="text-[10px]" style={{ color: "#9a9a8a" }}>retos</div>
                </div>
                <div>
                  <div className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{worldCupTournaments.length}</div>
                  <div className="text-[10px]" style={{ color: "#9a9a8a" }}>mundiales</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ComingSoonCard title="Once Mundial" subtitle="Completa un once usando selecciones." />
          <ComingSoonCard title="Camino al Titulo" subtitle="Adivina una seleccion por su recorrido." />
          <ComingSoonCard title="Cromo Mundial" subtitle="Revela al jugador como un cromo Panini." />
        </section>
      </div>
    </main>
  );
}
