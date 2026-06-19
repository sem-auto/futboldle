"use client";

import { useEffect } from "react";
import Link from "next/link";
import { mundialdleChallenges, worldCupChampionChallenges, worldCupPlayers } from "@/data/worldcups";
import { trackEvent, trackModeEntered, trackSeasonEntered } from "@/lib/analytics";

function ComingSoonCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <article className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#9a9a8a" }}>{"Pr\u00f3ximamente"}</div>
      <h2 className="font-bebas text-[27px] leading-none" style={{ color: "#18181b" }}>{title}</h2>
      <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{subtitle}</p>
    </article>
  );
}

function ActiveModeCard({ href, eyebrow, title, subtitle, accent, modeId }: { href: string; eyebrow: string; title: string; subtitle: string; accent: string; modeId: string }) {
  return (
    <Link
      href={href}
      onClick={() => trackModeEntered(modeId, "world-cups", { source: "season_page" })}
      className="rounded-2xl p-4 transition-transform active:scale-[0.99] h-full flex flex-col"
      style={{ background: accent === "gold" ? "#fffaf0" : "#eef3ff", border: `1px solid ${accent === "gold" ? "rgba(200,146,10,0.26)" : "rgba(23,78,166,0.22)"}` }}
    >
      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: accent === "gold" ? "#c8920a" : "#174ea6" }}>{eyebrow}</div>
      <h2 className="font-bebas text-[38px] leading-none" style={{ color: "#18181b" }}>{title}</h2>
      <p className="text-[13px] mt-1" style={{ color: "#6b6b72" }}>{subtitle}</p>
      <div className="mt-auto pt-4"><span className="inline-flex rounded-full px-3 py-2 font-oswald font-semibold uppercase tracking-wider text-[12px]" style={{ background: accent === "gold" ? "#c8920a" : "#174ea6", color: "white" }}>Jugar {"\u2192"}</span></div>
    </Link>
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
            <p className="text-[15px] text-white/80 mt-1">2002-2026 {"\u00b7"} La primera expansi{"\u00f3"}n real de Futboldle.</p>
          </div>

          <div className="p-4 md:p-5 flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
              <ActiveModeCard href="/world-cups/mundialdle" eyebrow="Jugable ahora" title="MUNDIALDLE" subtitle="Adivina el jugador mundialista con pistas progresivas." accent="blue" modeId="mundialdle" />
              <ActiveModeCard href="/world-cups/wordle" eyebrow="Nuevo diario" title="WORDLE MUNDIAL" subtitle="Adivina el apellido sin pistas progresivas." accent="blue" modeId="worldcup-wordle" />
              <ActiveModeCard href="/world-cups/champions" eyebrow="Nuevo juego" title="CAMPEONES" subtitle={"Te damos la sede. Adivina campe\u00f3n y finalista."} accent="gold" modeId="worldcup-champions" />
              <ActiveModeCard href="/world-cups/camino" eyebrow="Nuevo juego" title="CAMINO" subtitle={"Adivina el campe\u00f3n por sus rivales."} accent="gold" modeId="camino-titulo" />
            </div>

            <div className="rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.20)" }}>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>Archivo mundialista</div>
                <div className="text-[12px] mt-0.5" style={{ color: "#6b6b72" }}>Jugadores reconocibles y retos diarios sin datos de relleno.</div>
              </div>
              <div className="grid grid-cols-3 gap-5 sm:min-w-[280px]">
                <div>
                  <div className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{worldCupPlayers.length}</div>
                  <div className="text-[10px]" style={{ color: "#9a9a8a" }}>jugadores</div>
                </div>
                <div>
                  <div className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{mundialdleChallenges.length}</div>
                  <div className="text-[10px]" style={{ color: "#9a9a8a" }}>retos</div>
                </div>
                <div>
                  <div className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{worldCupChampionChallenges.length}</div>
                  <div className="text-[10px]" style={{ color: "#9a9a8a" }}>finales</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Link href="/world-cups/album" className="rounded-2xl px-4 py-3 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#fff8e6,#eef3ff)", border: "1px solid rgba(200,146,10,0.28)" }}>
          <div><div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>Colección propia</div><div className="font-bebas text-[26px] leading-none">ALBUM MUNDIALISTA</div></div>
          <span className="text-[12px] font-semibold" style={{ color: "#174ea6" }}>Ver cromos {"\u2192"}</span>
        </Link>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ComingSoonCard title="Cromo Mundial" subtitle="Revela al jugador como un cromo Panini." />
          <ComingSoonCard title={"Grupos M\u00edticos"} subtitle={"Recuerda fases de grupos hist\u00f3ricas."} />
          <ComingSoonCard title="Finales" subtitle="Momentos y goleadores de finales." />
        </section>
      </div>
    </main>
  );
}
