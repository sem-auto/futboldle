"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WordleBBVA from "@/components/WordleBBVA";
import TrayectoriaBBVA from "@/components/TrayectoriaBBVA";
import Top10BBVA from "@/components/Top10BBVA";
import StatdleBBVA from "@/components/StatdleBBVA";
import Mundialdle from "@/components/Mundialdle";
import WorldCupWordle from "@/components/WorldCupWordle";
import DueloNostalgia from "@/components/DueloNostalgia";
import IconUnlockToast from "@/components/IconUnlockToast";
import { MobileAdBanner, SidebarAds } from "@/components/PromoBanner";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { getAlbumProgress } from "@/lib/album";
import { getWorldCupAlbum } from "@/lib/worldCupCollection";
import { trackModeEntered } from "@/lib/analytics";
import { worldCupPlayers } from "@/data/worldcups";

type HoyMode = "home" | "wordle" | "trayectoria" | "top10" | "statdle" | "mundialdle" | "world-wordle" | "duelo";

type CardConfig = {
  mode: Exclude<HoyMode, "home">;
  title: string;
  subtitle: string;
  badge: string;
  accent: string;
  seasonId: string;
  modeId: string;
  href: string;
};

const CARDS: CardConfig[] = [
  { mode: "wordle", title: "Wordle BBVA", subtitle: "Adivina el apellido del Hombre BBVA.", badge: "Principal", accent: "#c8920a", seasonId: "bbva", modeId: "wordle-bbva", href: "/wordle-bbva" },
  { mode: "trayectoria", title: "Trayectoria BBVA", subtitle: "Reconoce al jugador por su carrera.", badge: "BBVA", accent: "#1e6b2e", seasonId: "bbva", modeId: "trayectoria-bbva", href: "/trayectoria-bbva" },
  { mode: "top10", title: "Top10 BBVA", subtitle: "Completa un ranking histórico.", badge: "Difícil", accent: "#1a4fa0", seasonId: "bbva", modeId: "top10-bbva", href: "/top10-bbva" },
  { mode: "statdle", title: "Statdle BBVA", subtitle: "Pistas de temporada y datos.", badge: "Datos", accent: "#18181b", seasonId: "bbva", modeId: "statdle-bbva", href: "/statdle-bbva" },
  { mode: "mundialdle", title: "Mundialdle", subtitle: "Adivina el jugador mundialista.", badge: "Mundiales", accent: "#174ea6", seasonId: "world-cups", modeId: "mundialdle", href: "/world-cups/mundialdle" },
  { mode: "world-wordle", title: "Wordle Mundial", subtitle: "Apellido de un mundialista.", badge: "Extra", accent: "#0f172a", seasonId: "world-cups", modeId: "worldcup-wordle", href: "/world-cups/wordle" },
  { mode: "duelo", title: "Duelo Nostalgia", subtitle: "¿Quién tuvo más goles o asistencias?", badge: "Viral", accent: "#b81c14", seasonId: "bbva", modeId: "duelo-nostalgia", href: "/duelo-bbva" },
];

function getDoneState(mode: CardConfig["mode"]) {
  const key = getDayKey();
  try {
    if (mode === "wordle") {
      const value = JSON.parse(localStorage.getItem(`fbl-day-${key}`) ?? "null");
      return Boolean(value?.daily);
    }
    if (mode === "trayectoria") {
      const value = JSON.parse(localStorage.getItem(`fbl-tray-v2-${key}`) ?? "null");
      return Boolean(value?.gameOver);
    }
    if (mode === "top10") return Boolean(localStorage.getItem(`fbl-top10-done-${key}`));
    if (mode === "statdle") return Boolean(localStorage.getItem(`fbl-statdle-done-${key}`));
    if (mode === "mundialdle") return Boolean(localStorage.getItem(`fbl-mundialdle-done-${key}`));
    if (mode === "world-wordle") {
      const value = JSON.parse(localStorage.getItem(`fbl-worldcup-wordle-${key}-daily`) ?? "null");
      return Boolean(value?.gameOver);
    }
  } catch {}
  return false;
}

function HoyCard({ card, done, onOpen }: { card: CardConfig; done: boolean; onOpen: () => void }) {
  return (
    <Link
      href={card.href}
      onClick={onOpen}
      className="rounded-2xl p-4 text-left min-h-[142px] flex flex-col justify-between"
      style={{ background: "white", border: `1px solid ${card.accent}33`, boxShadow: "0 7px 20px rgba(0,0,0,0.07)" }}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] rounded-full px-2 py-1" style={{ background: `${card.accent}12`, color: card.accent }}>
            {card.badge}
          </span>
          {done ? <span className="text-[10px] font-semibold rounded-full px-2 py-1" style={{ background: "#f0faf2", color: "#1e6b2e" }}>Hecho</span> : null}
        </div>
        <h2 className="font-bebas text-[32px] leading-none mt-4" style={{ color: "#18181b" }}>{card.title}</h2>
        <p className="text-[12px] leading-snug mt-1" style={{ color: "#6b6b72" }}>{card.subtitle}</p>
      </div>
      <div className="font-oswald font-semibold uppercase tracking-wider text-[11px] mt-4" style={{ color: card.accent }}>
        {done ? "Ver resultado" : "Jugar ahora"} →
      </div>
    </Link>
  );
}

export default function HoyClient() {
  const [mode, setMode] = useState<HoyMode>("home");
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});
  const [bbvaCards, setBbvaCards] = useState(0);
  const [worldCards, setWorldCards] = useState(0);

  useEffect(() => {
    setDoneMap(Object.fromEntries(CARDS.map((card) => [card.mode, getDoneState(card.mode)])));
    setBbvaCards(getAlbumProgress().unlockedCount);
    setWorldCards(getWorldCupAlbum().length);
  }, [mode]);

  function open(card: CardConfig) {
    trackModeEntered(card.modeId, card.seasonId, { source: "hoy" });
    setMode(card.mode);
  }

  const back = () => setMode("home");

  if (mode !== "home") {
    return (
      <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
        <SidebarAds />
        <IconUnlockToast />
        <main className="max-w-2xl mx-auto px-3 py-4 flex flex-col gap-3">
          <button onClick={back} className="text-left text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Volver a retos de hoy</button>
          {mode === "wordle" && <WordleBBVA onBack={back} />}
          {mode === "trayectoria" && <TrayectoriaBBVA onBack={back} />}
          {mode === "top10" && <Top10BBVA onBack={back} />}
          {mode === "statdle" && <StatdleBBVA onBack={back} />}
          {mode === "mundialdle" && <Mundialdle onBack={back} />}
          {mode === "world-wordle" && <WorldCupWordle />}
          {mode === "duelo" && <DueloNostalgia onBack={back} />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <main className="max-w-4xl mx-auto px-3 py-4 md:py-6 flex flex-col gap-4">
        <header className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          <div className="px-5 py-6" style={{ background: "linear-gradient(135deg,#18181b,#c8920a)", color: "white" }}>
            <Link href="/" className="text-[12px] font-semibold text-white/70">← Futboldle</Link>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 mt-5">Reto diario · #{getDayNumber()}</div>
            <h1 className="font-bebas text-[58px] leading-none mt-1">Juegos diarios de fútbol nostalgia</h1>
            <p className="text-[14px] text-white/82 mt-2 max-w-xl">Liga BBVA + Mundiales. Juega, comparte y desbloquea cromos.</p>
          </div>
          <div className="p-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl p-3" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
              <div className="font-bebas text-[28px] leading-none" style={{ color: "#c8920a" }}>{bbvaCards}</div>
              <div className="text-[10px]" style={{ color: "#6b6b72" }}>cromos BBVA</div>
            </div>
            <div className="rounded-2xl p-3" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.18)" }}>
              <div className="font-bebas text-[28px] leading-none" style={{ color: "#174ea6" }}>{worldCards}/{worldCupPlayers.length}</div>
              <div className="text-[10px]" style={{ color: "#6b6b72" }}>mundiales</div>
            </div>
            <Link href="/progreso" className="rounded-2xl p-3 flex flex-col justify-center" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="font-oswald text-[12px] font-semibold uppercase" style={{ color: "#18181b" }}>Ver progreso</div>
              <div className="text-[10px]" style={{ color: "#6b6b72" }}>racha y álbum</div>
            </Link>
          </div>
        </header>

        <section>
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-[9px] uppercase font-semibold tracking-[0.20em]" style={{ color: "#9a9a8a" }}>Hoy se juega</div>
              <h2 className="font-bebas text-[34px] leading-none" style={{ color: "#18181b" }}>Elige reto</h2>
            </div>
            <span className="text-[10px] font-semibold" style={{ color: "#9a9a8a" }}>{CARDS.length} retos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CARDS.map((card) => <HoyCard key={card.mode} card={card} done={Boolean(doneMap[card.mode])} onOpen={() => trackModeEntered(card.modeId, card.seasonId, { source: "hoy" })} />)}
          </div>
        </section>

        <MobileAdBanner slot={0} />

        <section className="rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div>
            <div className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>Comparte sin revelar</div>
            <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>Los resultados llevan “¿Puedes superarme?” para traer a más gente desde X y WhatsApp.</p>
          </div>
          <Link href="/world-cups" className="rounded-xl px-4 py-3 text-center text-[12px] font-semibold" style={{ background: "#174ea6", color: "white" }}>Mundiales →</Link>
        </section>
      </main>
    </div>
  );
}
