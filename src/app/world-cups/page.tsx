"use client";

import { useEffect } from "react";
import Link from "next/link";
import { activeWorldCupTop10Challenges, mundialdleChallenges, worldCupChampionChallenges, worldCupPlayers } from "@/data/worldcups";
import { trackEvent, trackModeEntered, trackSeasonEntered } from "@/lib/analytics";

type ModeCard = {
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  accent: string;
  modeId: string;
  visual: "trophy" | "wordle" | "podium" | "medals" | "route" | "final";
  primary?: boolean;
};

const modes: ModeCard[] = [
  { href: "/world-cups/mundialdle", eyebrow: "Diario principal", title: "MUNDIALDLE", subtitle: "Adivina el jugador con pistas de Mundial, seleccion y club.", accent: "#174ea6", modeId: "mundialdle", visual: "trophy", primary: true },
  { href: "/world-cups/top10", eyebrow: "Ranking diario", title: "TOP10 MUNDIAL", subtitle: "Listas historicas del torneo para picarte con tu grupo.", accent: "#174ea6", modeId: "top10-mundial", visual: "podium", primary: true },
  { href: "/world-cups/wordle", eyebrow: "Reto rapido", title: "WORDLE MUNDIAL", subtitle: "Apellido mundialista sin pistas progresivas.", accent: "#174ea6", modeId: "worldcup-wordle", visual: "wordle", primary: true },
  { href: "/world-cups/archivo", eyebrow: "Archivo diario", title: "ARCHIVO MUNDIAL", subtitle: "Campeones, rutas y finales que cambian cada día.", accent: "#c8920a", modeId: "worldcup-archive", visual: "medals", primary: true },
];

function CardVisual({ type, accent }: { type: ModeCard["visual"]; accent: string }) {
  if (type === "wordle") {
    return (
      <div className="grid grid-cols-4 gap-1 w-[92px]">
        {["M", "U", "N", "D", "I", "A", "L", ""].map((letter, index) => (
          <span key={index} className="grid h-8 place-items-center rounded-lg font-bebas text-[18px]" style={{ background: index < 5 ? `${accent}18` : "#f1eee7", color: index < 5 ? accent : "#aaa39a", border: `1px solid ${index < 5 ? `${accent}35` : "rgba(0,0,0,0.06)"}` }}>{letter}</span>
        ))}
      </div>
    );
  }
  if (type === "podium") {
    return <div className="flex items-end gap-2 w-[110px] h-[64px]">{[2, 1, 3].map((n, i) => <span key={n} className="flex-1 rounded-t-xl grid place-items-center font-bebas" style={{ height: [38, 58, 30][i], background: `${accent}${i === 1 ? "35" : "18"}`, color: accent }}>{n}</span>)}</div>;
  }
  if (type === "route") {
    return (
      <div className="w-[118px]">
        <div className="flex items-center justify-between">
          {["A", "B", "C"].map(step => <span key={step} className="grid h-9 w-9 place-items-center rounded-full font-bebas" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>{step}</span>)}
        </div>
        <div className="h-4 fbl-route-line" />
      </div>
    );
  }
  if (type === "final") {
    return (
      <div className="rounded-xl px-3 py-2 w-[118px]" style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}>
        <div className="flex justify-between font-bebas text-[22px]" style={{ color: accent }}><span>2</span><span>1</span></div>
        <div className="h-1 rounded-full mt-1" style={{ background: `${accent}30` }} />
      </div>
    );
  }
  if (type === "medals") {
    return <div className="grid grid-cols-3 gap-2 w-[110px]">{["1", "2", "3"].map(n => <span key={n} className="grid h-12 place-items-center rounded-full font-bebas text-[22px]" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>{n}</span>)}</div>;
  }
  return (
    <div className="relative grid h-[78px] w-[64px] place-items-center rounded-2xl" style={{ background: `linear-gradient(145deg, ${accent}18, #ffffff)`, border: `1px solid ${accent}35`, boxShadow: `0 10px 22px ${accent}18` }}>
      <div className="absolute inset-x-3 top-2 h-2 rounded-full" style={{ background: `${accent}28` }} />
      <div className="relative mt-2 flex flex-col items-center">
        <div className="h-8 w-10 rounded-b-2xl rounded-t-md" style={{ background: `linear-gradient(180deg, #ffd04a, ${accent})`, border: "1px solid rgba(0,0,0,0.08)" }} />
        <div className="mt-1 h-2 w-7 rounded-sm" style={{ background: accent }} />
        <div className="h-1.5 w-10 rounded-sm" style={{ background: `${accent}40` }} />
      </div>
    </div>
  );
}

function ActiveModeCard({ card }: { card: ModeCard }) {
  return (
    <Link
      href={card.href}
      onClick={() => trackModeEntered(card.modeId, "world-cups", { source: "season_page" })}
      className="fbl-card rounded-2xl p-4 min-h-[206px] flex flex-col justify-between"
      style={{
        background: card.primary ? "linear-gradient(180deg,#eef3ff,#ffffff)" : "linear-gradient(180deg,#fffaf0,#ffffff)",
        border: `1px solid ${card.accent}2e`,
      }}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: card.accent }}>{card.eyebrow}</div>
          <h2 className="font-bebas text-[38px] leading-none mt-3" style={{ color: "#18181b" }}>{card.title}</h2>
          <p className="text-[13px] mt-1 max-w-[220px]" style={{ color: "#615f67" }}>{card.subtitle}</p>
        </div>
        <CardVisual type={card.visual} accent={card.accent} />
      </div>
      <span className="relative z-10 mt-5 inline-flex w-fit rounded-full px-3 py-2 font-oswald font-semibold uppercase tracking-wider text-[12px]" style={{ background: card.accent, color: "white" }}>Jugar ahora</span>
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
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>Volver</Link>
          <span className="text-[10px] font-semibold px-3 py-1 rounded-full" style={{ background: "#eef3ff", color: "#174ea6", border: "1px solid rgba(23,78,166,0.18)" }}>Temporada activa</span>
        </div>

        <section
          className="relative rounded-[28px] overflow-hidden px-5 py-7 md:px-8 md:py-10"
          style={{
            background: "radial-gradient(circle at 86% 12%, rgba(255,255,255,0.18), transparent 18rem), linear-gradient(135deg,#174ea6 0%,#112b63 45%,#101827 100%)",
            color: "white",
            boxShadow: "0 18px 40px rgba(20,50,120,0.22)",
          }}
        >
          <div className="absolute right-5 -top-6 hidden md:block font-bebas text-[150px] leading-none opacity-10">COPA</div>
          <div className="absolute right-8 bottom-4 hidden md:grid h-[112px] w-[92px] place-items-center rounded-3xl bg-white/10 border border-white/15">
            <div className="h-16 w-12 rounded-b-2xl rounded-t-full bg-white/18 border border-white/20" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">Temporada 2</div>
            <h1 className="font-bebas text-[58px] md:text-[92px] leading-none mt-2">Mundiales 2002-2026</h1>
            <p className="text-[15px] md:text-[18px] text-white/82 mt-3 max-w-2xl">Jugadores, finales, campeones, rankings y rutas mundialistas con alma de archivo FIFA y cromos Panini.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/world-cups/mundialdle" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ background: "#ffd04a", color: "#151515" }}>Jugar Mundialdle</Link>
              <Link href="/world-cups/top10" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>Top10 Mundial</Link>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 28px rgba(0,0,0,0.07)" }}>
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#174ea6" }}>Retos mundialistas</div>
              <h2 className="font-bebas text-[38px] leading-none" style={{ color: "#151515" }}>Juegos Mundiales</h2>
            </div>
            <span className="hidden sm:inline-flex text-[11px] font-semibold px-3 py-1 rounded-full" style={{ color: "#174ea6", background: "#eef3ff" }}>
              Mundialdle · Wordle · Top10 · Archivo
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {modes.map(card => <ActiveModeCard key={card.href} card={card} />)}
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Jugadores", value: worldCupPlayers.length },
            { label: "Retos", value: mundialdleChallenges.length + activeWorldCupTop10Challenges.length },
            { label: "Finales", value: worldCupChampionChallenges.length },
            { label: "Periodo", value: "2002-2026" },
          ].map(item => (
            <div key={item.label} className="rounded-2xl p-4" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.20)" }}>
              <div className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#174ea6" }}>{item.label}</div>
              <div className="font-bebas text-[34px] leading-none mt-2" style={{ color: "#151515" }}>{item.value}</div>
            </div>
          ))}
        </section>

        <Link href="/world-cups/album" className="fbl-card rounded-2xl px-4 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#fff8e6,#eef3ff)", border: "1px solid rgba(200,146,10,0.28)" }}>
          <div className="flex items-center gap-3">
            <span className="fbl-mini-cromo grid h-14 w-11 place-items-center relative overflow-hidden" style={{ color: "#174ea6" }}>
              <span className="absolute inset-x-2 top-2 h-1.5 rounded-full" style={{ background: "rgba(23,78,166,0.20)" }} />
              <span className="font-bebas text-[22px] leading-none">★</span>
            </span>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>Colección propia</div>
              <div className="font-bebas text-[30px] leading-none">Álbum Mundialista</div>
            </div>
          </div>
          <span className="text-[12px] font-semibold" style={{ color: "#174ea6" }}>Ver cromos</span>
        </Link>
      </div>
    </main>
  );
}
