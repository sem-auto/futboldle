"use client";
import { useState, useEffect } from "react";
import GameCard from "@/components/GameCard";
import WordleBBVA from "@/components/WordleBBVA";
import PromoBanner, { SidebarAds } from "@/components/PromoBanner";
import { getDayNumber, getDayKey } from "@/lib/daily";

type View = "home" | "wordle";

const QUOTES = [
  "¿Te acuerdas de Apoño?",
  "Solo los enfermos de la BBVA sacan esto.",
  "Twitter fútbol certified.",
  "Jugador de culto del día.",
  "Liga BBVA. Nunca se olvidará.",
  "El fútbol que echamos de menos.",
  "2005–2016. La época dorada.",
];

const NOSTALGIA = [
  { year: "2009-10", fact: "El Villarreal de Cazorla y Senna en semis de Europa League." },
  { year: "2011-12", fact: "El Málaga de Isco y Joaquín llega a cuartos de Champions." },
  { year: "2013-14", fact: "El Atleti de Falcao y Diego Costa gana La Liga. Histórico." },
  { year: "2012-13", fact: "El Rayo de Trashorras y Michu. Un equipo de culto eterno." },
];

function DailyStatus() {
  const [done, setDone] = useState(false);
  const [extras, setExtras] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`fbl-day-${getDayKey()}`);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.date === getDayKey()) {
          setDone(!!d.daily);
          setExtras(d.extras?.length ?? 0);
        }
      }
    } catch {}
  }, []);

  if (!done) return null;

  return (
    <div
      className="rounded-xl px-4 py-3 flex items-center justify-between"
      style={{ background: "var(--bg4)", border: "1px solid var(--green-border)" }}
    >
      <div>
        <div className="text-[10px] font-oswald font-semibold uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--green-text)" }}>
          Reto del día completado ✅
        </div>
        <div className="text-[12px]" style={{ color: "var(--cream-dim)" }}>
          {extras > 0 ? `${extras} extra${extras > 1 ? "s" : ""} jugado${extras > 1 ? "s" : ""}` : "Pulsa Jugar para ver las extras"}
        </div>
      </div>
      <div
        className="text-[10px] font-oswald font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg"
        style={{ background: "var(--green-bg)", color: "var(--green-text)", border: "1px solid var(--green-border)" }}
      >
        #{getDayNumber()}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const [quoteIdx] = useState(() => getDayNumber() % QUOTES.length);
  const [nostalgiaIdx] = useState(() => getDayNumber() % NOSTALGIA.length);

  if (view === "wordle") {
    return (
      <div className="min-h-dvh" style={{ background: "var(--bg)" }}>
        <SidebarAds />
        <header style={{ borderBottom: "1px solid var(--b1)" }}>
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setView("home")} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold"
                style={{ background: "var(--gold)", color: "#111" }}
              >
                F
              </div>
              <span className="font-display text-xl" style={{ color: "var(--cream)" }}>FUTBOLDLE</span>
            </button>
            <span
              className="text-[9px] font-oswald font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded"
              style={{ background: "var(--gold-dim)", color: "var(--gold)", border: "1px solid var(--b-gold)" }}
            >
              WORDLE BBVA
            </span>
          </div>
          {/* Gold underline */}
          <div className="h-[2px]" style={{ background: "linear-gradient(90deg, var(--gold2) 0%, var(--gold) 40%, transparent 80%)", opacity: 0.6 }} />
        </header>
        <main className="max-w-lg mx-auto px-4 py-5">
          <WordleBBVA onBack={() => setView("home")} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "var(--bg)" }}>
      <SidebarAds />

      {/* ── HEADER ── */}
      <header style={{ borderBottom: "1px solid var(--b1)" }}>
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-2xl"
              style={{ background: "var(--gold)", color: "#111", boxShadow: "0 0 20px var(--gold-glow)" }}
            >
              F
            </div>
            <div>
              <h1 className="font-display text-2xl leading-none" style={{ color: "var(--cream)" }}>FUTBOLDLE</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] mt-0.5" style={{ color: "var(--cream-dim)" }}>
                Día #{getDayNumber()} · Liga BBVA
              </p>
            </div>
          </div>
          <div
            className="text-[8px] font-oswald font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
            style={{ background: "var(--bg4)", color: "var(--gold)", border: "1px solid var(--b-gold)" }}
          >
            2005–2016
          </div>
        </div>
        <div className="h-[2px]" style={{ background: "linear-gradient(90deg, var(--gold2) 0%, var(--gold) 35%, transparent 70%)", opacity: 0.5 }} />
      </header>

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-5 gap-5">

        {/* ── HERO ── */}
        <div className="text-center py-3">
          <div
            className="inline-block text-[10px] font-oswald font-semibold uppercase tracking-[0.25em] px-3 py-1 rounded-full mb-3"
            style={{ background: "var(--gold-dim)", color: "var(--gold)", border: "1px solid var(--b-gold)" }}
          >
            {QUOTES[quoteIdx]}
          </div>
          <h2 className="font-display leading-none mb-2" style={{ fontSize: "clamp(42px,12vw,64px)", color: "var(--cream)" }}>
            MINIJUEGOS<br />
            <span style={{ color: "var(--gold)" }}>HOMBRES BBVA</span>
          </h2>
          <p className="text-[13px] font-medium" style={{ color: "var(--cream-dim)" }}>
            Minijuegos diarios para enfermos de la Liga BBVA
          </p>
          <p className="text-[10px] mt-1 tracking-wider" style={{ color: "var(--cream-ghost)" }}>
            2005–2016 · Nostalgia · Culto · Twitter fútbol
          </p>
        </div>

        {/* ── DAILY STATUS (if completed) ── */}
        <DailyStatus />

        {/* ── FEATURED: WORDLE BBVA ── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1" style={{ background: "var(--b1)" }} />
            <span className="text-[9px] font-oswald font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--cream-dim)" }}>
              Reto del día
            </span>
            <div className="h-px flex-1" style={{ background: "var(--b1)" }} />
          </div>

          <button
            onClick={() => setView("wordle")}
            className="w-full text-left rounded-2xl p-5 relative overflow-hidden transition-all duration-200"
            style={{ background: "var(--bg3)", border: "1px solid var(--b-gold)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--bg4)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "";
              (e.currentTarget as HTMLElement).style.transform = "";
            }}
          >
            {/* Gold top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, var(--gold2), var(--gold), var(--gold2))" }} />

            <div className="flex items-start justify-between mb-3 pt-1">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "var(--gold-dim)", border: "1px solid var(--b-gold)" }}
              >
                🔤
              </div>
              <span
                className="text-[9px] font-oswald font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                style={{ background: "var(--green-bg)", color: "var(--green-text)", border: "1px solid var(--green-border)" }}
              >
                Disponible
              </span>
            </div>

            <h3 className="font-display text-3xl leading-none mb-1" style={{ color: "var(--cream)" }}>
              WORDLE BBVA
            </h3>
            <p className="text-[13px] mb-4" style={{ color: "var(--cream-dim)" }}>
              Adivina el apellido del futbolista mítico en {6} intentos.
            </p>

            {/* Mini tile preview */}
            <div className="flex gap-1.5 mb-4">
              {[
                { l: "V", s: "correct" },
                { l: "A", s: "wrong" },
                { l: "L", s: "partial" },
                { l: "E", s: "wrong" },
                { l: "R", s: "wrong" },
                { l: "O", s: "wrong" },
                { l: "N", s: "correct" },
              ].map(({ l, s }, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-md flex items-center justify-center font-display text-[13px]"
                  style={{
                    background: s === "correct" ? "var(--green-bg)" : s === "partial" ? "var(--amber-bg)" : "var(--bg5)",
                    border: s === "correct" ? "1px solid var(--green-border)" : s === "partial" ? "1px solid var(--amber-border)" : "1px solid var(--b1)",
                    color: s === "correct" ? "var(--green-text)" : s === "partial" ? "var(--amber-text)" : "var(--cream-ghost)",
                  }}
                >
                  {l}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-[11px] font-oswald font-semibold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
                Jugar ahora →
              </div>
              <div className="text-[10px]" style={{ color: "var(--cream-ghost)" }}>
                Hombres BBVA · {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
              </div>
            </div>
          </button>
        </div>

        {/* ── NOSTALGIA BLOCK ── */}
        <div
          className="rounded-xl px-4 py-3.5"
          style={{ background: "var(--bg3)", border: "1px solid var(--b1)" }}
        >
          <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: "var(--gold)" }}>
            📺 Temporada mítica
          </div>
          <div className="font-display text-xl leading-none mb-1" style={{ color: "var(--cream)" }}>
            {NOSTALGIA[nostalgiaIdx].year}
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--cream-dim)" }}>
            {NOSTALGIA[nostalgiaIdx].fact}
          </p>
        </div>

        {/* ── MORE GAMES ── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1" style={{ background: "var(--b1)" }} />
            <span className="text-[9px] font-oswald font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--cream-dim)" }}>
              Próximamente
            </span>
            <div className="h-px flex-1" style={{ background: "var(--b1)" }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GameCard
              icon="📍"
              title="TRAYECTORIA BBVA"
              description="Adivina el jugador por los clubes de su carrera."
              available={false}
            />
            <GameCard
              icon="🏆"
              title="TOP 10 BBVA"
              description="Rellena listas históricas de LaLiga BBVA."
              available={false}
            />
            <GameCard
              icon="🌍"
              title="ADIVINA EL FUTBOLISTA"
              description="País, club, liga, posición y edad."
              available={false}
            />
            <div
              className="rounded-xl p-4 flex flex-col items-center justify-center text-center"
              style={{ background: "var(--bg3)", border: "1px dashed var(--b1)" }}
            >
              <div className="text-2xl mb-1.5">🔜</div>
              <p className="text-[10px] font-medium" style={{ color: "var(--cream-ghost)" }}>
                Más modos en camino
              </p>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div
          className="rounded-xl px-4 py-3 flex items-center justify-around"
          style={{ background: "var(--bg3)", border: "1px solid var(--b1)" }}
        >
          {[
            { num: "180+", label: "Jugadores" },
            { num: "2005", label: "Desde" },
            { num: "2016", label: "Hasta" },
            { num: "∞", label: "Nostalgia" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl leading-none" style={{ color: "var(--cream)" }}>{num}</div>
              <div className="text-[8px] font-oswald font-semibold uppercase tracking-[0.15em] mt-0.5" style={{ color: "var(--cream-dim)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ── PROMO BANNERS (mobile) ── */}
        <PromoBanner />

        {/* ── FOOTER ── */}
        <div className="text-center py-2">
          <p className="text-[9px]" style={{ color: "var(--cream-ghost)" }}>
            Futboldle no está afiliado a LaLiga ni a ningún club oficial. · Solo para fines de entretenimiento.
          </p>
        </div>
      </main>
    </div>
  );
}
