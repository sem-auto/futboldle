"use client";
import { useState } from "react";
import GameCard from "@/components/GameCard";
import WordleBBVA from "@/components/WordleBBVA";
import PromoBanner from "@/components/PromoBanner";
import { getDayNumber } from "@/lib/daily";

type View = "home" | "wordle";

export default function HomePage() {
  const [view, setView] = useState<View>("home");

  if (view === "wordle") {
    return (
      <div className="min-h-dvh" style={{ background: "var(--surface)" }}>
        {/* Header */}
        <header style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                style={{ background: "var(--red)", boxShadow: "0 0 12px var(--red-dim)" }}
              >
                ⚽
              </div>
              <span className="font-display text-xl text-white">FUTBOLDLE</span>
            </button>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--red)" }}
            >
              WORDLE BBVA
            </span>
          </div>
          <div className="h-[1.5px] w-full" style={{ background: "linear-gradient(90deg, var(--red) 0%, transparent 50%)", opacity: 0.5 }} />
        </header>

        <main className="max-w-lg mx-auto px-4 py-5">
          <WordleBBVA onBack={() => setView("home")} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "var(--surface)" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "var(--red)", boxShadow: "0 0 16px var(--red-glow)" }}
            >
              ⚽
            </div>
            <div>
              <h1 className="font-display text-2xl text-white leading-none">FUTBOLDLE</h1>
              <p className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                Día #{getDayNumber()}
              </p>
            </div>
          </div>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg"
            style={{
              background: "var(--red-dim)",
              color: "var(--red)",
              border: "1px solid rgba(232,0,29,0.2)",
            }}
          >
            Liga BBVA
          </div>
        </div>
        <div className="h-[1.5px]" style={{ background: "linear-gradient(90deg, var(--red) 0%, transparent 55%)", opacity: 0.5 }} />
      </header>

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-5 gap-5">

        {/* Hero */}
        <div className="text-center pt-2">
          <h2 className="font-display text-5xl text-white leading-tight">
            MINIJUEGOS<br />
            <span style={{ color: "var(--red)" }}>HOMBRES BBVA</span>
          </h2>
          <p className="text-[13px] mt-2 font-medium" style={{ color: "var(--text-muted)" }}>
            Minijuegos diarios para enfermos de LaLiga.
          </p>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            LaLiga 2005-2016 · Nostalgia · Culto · Twitter fútbol
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Reto del día
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Featured game - Wordle BBVA */}
        <button
          onClick={() => setView("wordle")}
          className="w-full rounded-2xl p-5 text-left transition-all duration-200 relative overflow-hidden group"
          style={{
            background: "var(--surface-3)",
            border: "1px solid rgba(232,0,29,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,0,29,0.6)";
            (e.currentTarget as HTMLElement).style.background = "var(--surface-4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,0,29,0.3)";
            (e.currentTarget as HTMLElement).style.background = "var(--surface-3)";
          }}
        >
          {/* Glow accent */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(232,0,29,0.08) 0%, transparent 70%)",
              transform: "translate(20%, -20%)",
            }}
          />

          <div className="flex items-start justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: "var(--red-dim)", border: "1px solid rgba(232,0,29,0.2)" }}
            >
              🔤
            </div>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(22,163,74,0.15)",
                color: "#4ade80",
                border: "1px solid rgba(22,163,74,0.3)",
              }}
            >
              Disponible
            </span>
          </div>

          <h3 className="font-display text-3xl text-white mb-1">WORDLE BBVA</h3>
          <p className="text-[13px] mb-3" style={{ color: "var(--text-muted)" }}>
            Adivina el apellido del futbolista mítico en 6 intentos.
          </p>

          {/* Mini grid preview */}
          <div className="flex gap-1 mb-3">
            {["B","B","V","A"].map((l, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-md flex items-center justify-center font-display text-sm font-bold"
                style={{
                  background: i === 0 ? "rgba(22,163,74,0.22)" : i === 2 ? "rgba(234,179,8,0.18)" : "var(--surface-4)",
                  border: i === 0 ? "1px solid rgba(22,163,74,0.4)" : i === 2 ? "1px solid rgba(234,179,8,0.4)" : "1px solid var(--border-md)",
                  color: i === 0 ? "#4ade80" : i === 2 ? "#fbbf24" : "rgba(255,255,255,0.5)",
                }}
              >
                {l}
              </div>
            ))}
          </div>

          <div
            className="text-[12px] font-bold uppercase tracking-wider flex items-center gap-1"
            style={{ color: "var(--red)" }}
          >
            Jugar ahora
            <span className="text-base">→</span>
          </div>
        </button>

        {/* More games section */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Juega más
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Game cards grid */}
        <div className="grid grid-cols-2 gap-3">
          <GameCard
            icon="📍"
            title="TRAYECTORIA BBVA"
            description="Adivina el jugador por los clubes de su carrera."
            tag="Próximamente"
            available={false}
          />
          <GameCard
            icon="🏆"
            title="TOP 10 BBVA"
            description="Rellena listas históricas de LaLiga."
            tag="Próximamente"
            available={false}
          />
          <GameCard
            icon="🌍"
            title="ADIVINA EL FUTBOLISTA"
            description="Adivina por país, club, liga, posición y edad."
            tag="Próximamente"
            available={false}
          />
          <div
            className="rounded-2xl p-4 flex flex-col items-center justify-center text-center"
            style={{ background: "var(--surface-3)", border: "1px dashed var(--border)" }}
          >
            <div className="text-2xl mb-2">🔜</div>
            <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>
              Más juegos en camino
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="rounded-xl px-4 py-3 flex items-center justify-around"
          style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}
        >
          {[
            { num: "124+", label: "Jugadores" },
            { num: "2005", label: "Desde" },
            { num: "2016", label: "Hasta" },
            { num: "∞", label: "Nostalgia" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-xl text-white leading-none">{num}</div>
              <div className="text-[9px] uppercase tracking-[0.12em] mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Promo */}
        <PromoBanner />

        {/* Footer */}
        <div className="text-center pb-2">
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>
            Futboldle no está afiliado a LaLiga ni a ningún club oficial.
          </p>
        </div>
      </main>
    </div>
  );
}
