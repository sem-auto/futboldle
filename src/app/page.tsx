"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import WordleBBVA from "@/components/WordleBBVA";
import TrayectoriaBBVA from "@/components/TrayectoriaBBVA";
import Top10BBVA from "@/components/Top10BBVA";
import AdivinaElCrack from "@/components/AdivinaElCrack";
import AlbumBBVA from "@/components/AlbumBBVA";
import JugoAquiBBVA from "@/components/JugoAquiBBVA";
import FichajeInventoBBVA from "@/components/FichajeInventoBBVA";
import ClubOcultoBBVA from "@/components/ClubOcultoBBVA";
import OnceBBVA from "@/components/OnceBBVA";
import QuienFaltaBBVA from "@/components/QuienFaltaBBVA";
import StatdleBBVA from "@/components/StatdleBBVA";
import Mundialdle from "@/components/Mundialdle";
import Top10Mundial from "@/components/Top10Mundial";
import DueloNostalgia from "@/components/DueloNostalgia";
import IconUnlockToast from "@/components/IconUnlockToast";
import { MobileAdBanner, SidebarAds } from "@/components/PromoBanner";
import { getDayNumber, getDayKey } from "@/lib/daily";
import { useStats } from "@/lib/useStats";
import { getAlbumProgress } from "@/lib/album";
import { shareResult } from "@/lib/share";
import { useCommunityDifficulty } from "@/lib/communityStats";
import { getDailyTop10 } from "@/data/top10Challenges";
import { getDailyStatdleChallenge } from "@/data/statdleChallenges";
import { seasons } from "@/data/product";
import { trackModeEntered, trackSeasonEntered } from "@/lib/analytics";
import { getWorldCupAlbum } from "@/lib/worldCupCollection";
import { getDailyMundialdleChallenge, getDailyWorldCupTop10, worldCupPlayers } from "@/data/worldcups";
import { bbvaPlayers } from "@/data/bbvaPlayers";

type View = "home" | "wordle" | "trayectoria" | "top10" | "top10Mundial" | "crack" | "statdle" | "mundialdle" | "album" | "jugoAqui" | "fichaje" | "clubOculto" | "duelo" | "once" | "quienFalta";

const BBVA_PHRASES = [
  "¿Te acuerdas de Apoño?",
  "Solo para enfermos de la Liga BBVA.",
  "Archivo 2005–2016.",
  "Twitter fútbol certified.",
  "El fútbol que echamos de menos.",
  "La Liga que no volverá.",
  "Hombres BBVA. Siempre.",
];

function useDailyStatus() {
  const [wordleDone, setWordleDone] = useState(false);
  const [wordleWon,  setWordleWon]  = useState(false);
  const [extras,     setExtras]     = useState(0);
  const [trayDone,   setTrayDone]   = useState(false);
  const [trayWon,    setTrayWon]    = useState(false);
  const [top10Done,  setTop10Done]  = useState(false);
  const [top10Won,   setTop10Won]   = useState(false);
  const [crackDone,  setCrackDone]  = useState(false);
  const [crackWon,   setCrackWon]   = useState(false);
  const [statdleDone, setStatdleDone] = useState(false);
  const [statdleWon, setStatdleWon] = useState(false);
  const [mundialdleDone, setMundialdleDone] = useState(false);
  const [mundialdleWon, setMundialdleWon] = useState(false);
  const [top10MundialDone, setTop10MundialDone] = useState(false);
  const [top10MundialWon, setTop10MundialWon] = useState(false);

  useEffect(() => {
    const key = getDayKey();
    try {
      // Wordle
      const r = localStorage.getItem(`fbl-day-${key}`);
      if (r) {
        const d = JSON.parse(r);
        if (d.date === key && d.daily) {
          setWordleDone(true);
          setWordleWon(!!d.daily.won);
          setExtras(d.extras?.length ?? 0);
        }
      }
    } catch {}
    try {
      // Trayectoria
      const trayNew = localStorage.getItem(`fbl-tray-v2-${key}`);
      const trayOld = localStorage.getItem(`fbl-tray-${key}`);
      if (trayNew) {
        const t = JSON.parse(trayNew);
        if (t.gameOver) { setTrayDone(true); setTrayWon(!!t.won); }
      } else if (trayOld) {
        setTrayDone(true); setTrayWon(trayOld === "won");
      }
    } catch {}
    try {
      // Top10
      const top10Done_ = localStorage.getItem(`fbl-top10-done-${key}`);
      if (top10Done_) { setTop10Done(true); setTop10Won(top10Done_ === "won"); }
      else {
        // fallback to old key
        const top10 = localStorage.getItem(`fbl-top10-${key}`);
        if (top10) {
          try {
            const t = JSON.parse(top10);
            if (t.finished) { setTop10Done(true); setTop10Won(!t.surrendered); }
          } catch {}
        }
      }
    } catch {}
    try {
      // Crack
      const crack = localStorage.getItem(`fbl-crack-done-${key}`);
      if (crack) { setCrackDone(true); setCrackWon(crack === "won"); }
    } catch {}
    try {
      const statdle = localStorage.getItem(`fbl-statdle-done-${key}`);
      if (statdle) { setStatdleDone(true); setStatdleWon(statdle === "won"); }
    } catch {}
    try {
      const mundialdle = localStorage.getItem(`fbl-mundialdle-done-${key}`);
      if (mundialdle) { setMundialdleDone(true); setMundialdleWon(mundialdle === "won"); }
    } catch {}
    try {
      const challenge = getDailyWorldCupTop10(getDayNumber());
      const saved = JSON.parse(localStorage.getItem(`fbl-wc-top10-${key}-${challenge.id}`) ?? "null");
      if (saved?.finished) {
        const guessed = Array.isArray(saved.guessed) ? saved.guessed.length : 0;
        setTop10MundialDone(true);
        setTop10MundialWon(guessed >= challenge.answers.length);
      }
    } catch {}
  }, []);

  return { wordleDone, wordleWon, extras, trayDone, trayWon, top10Done, top10Won, crackDone, crackWon, statdleDone, statdleWon, mundialdleDone, mundialdleWon, top10MundialDone, top10MundialWon };
}

/* ─── Header ─── */
function Header({ onLogoClick }: { onLogoClick: () => void }) {
  const { stats } = useStats();
  const [cards, setCards] = useState(0);
  const phrase = BBVA_PHRASES[getDayNumber() % BBVA_PHRASES.length];

  useEffect(() => {
    setCards(getAlbumProgress().unlockedCount);
  }, []);

  return (
    <header className="sticky top-0 z-20" style={{ background: "white", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-4xl mx-auto px-3 md:px-4 h-10 md:h-12 flex items-center justify-between gap-2 md:gap-4">
        <button onClick={onLogoClick} className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/brand-logo.png"
            alt="Futboldle"
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-cover flex-shrink-0"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}
          />
          <span className="font-bebas text-[18px] md:text-[20px] leading-none tracking-wider" style={{ color: "#18181b" }}>FUTBOLDLE</span>
        </button>

        {/* Frase nostalgia — centro, solo desktop */}
        <div className="hidden md:block text-[10px] italic font-medium truncate" style={{ color: "#9a9a8a" }}>
          &ldquo;{phrase}&rdquo;
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/progreso" className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ background: "#fff8e6", border: "1px solid rgba(200,146,10,0.25)" }}>
            <span className="text-[11px]">🔥</span>
            <span className="font-bebas text-[14px] leading-none" style={{ color: "#c8920a" }}>{stats.streak}</span>
          </Link>
          <Link href="/progreso" className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.18)" }}>
            <span className="text-[11px]">🎴</span>
            <span className="font-bebas text-[14px] leading-none" style={{ color: "#174ea6" }}>{cards}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─── Pill de estado por juego ─── */
function GamePill({ done, won }: { done: boolean; won?: boolean }) {
  if (!done) return null;
  return (
    <span className="text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
      style={{
        background: won ? "rgba(30,107,46,0.15)" : "rgba(184,28,20,0.12)",
        color: won ? "#1e6b2e" : "#b81c14",
      }}>
      {won ? "✓" : "✗"}
    </span>
  );
}

/* ─── WORDLE card ─── */
type DifficultyInfo = { label: string; completion: number; attempts?: number | null; sample?: number; real?: boolean };

function DifficultyLine({ label, completion, color, attempts, sample, real }: DifficultyInfo & { color: string }) {
  if (!real) {
    return null;
  }

  return (
    <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[9px] font-semibold">
      <span className="px-2 py-0.5 rounded-full" style={{ background: `${color}12`, color }}>{label}</span>
      <span style={{ color: "#9a9a8a" }}>{completion}% lo completan</span>
      {sample ? <span style={{ color: "#9a9a8a" }}>{sample} partidas</span> : null}
      {attempts ? <span style={{ color: "#9a9a8a" }}>{attempts} intentos</span> : null}
    </div>
  );
}

/* ─── WORDLE card ─── */
function WordleCard({ onClick, done, won, extras, difficulty }: { onClick: () => void; done: boolean; won: boolean; extras: number; difficulty: DifficultyInfo }) {
  // Mini wordle board: 3 rows x 6 cols
  const board = [
    [{l:"F",s:"ok"},{l:"A",s:"no"},{l:"L",s:"amb"},{l:"C",s:"no"},{l:"A",s:"no"},{l:"O",s:"ok"}],
    [{l:"V",s:"ok"},{l:"I",s:"no"},{l:"L",s:"ok"},{l:"L",s:"no"},{l:"A",s:"ok"},{l:"",s:"empty"}],
  ];
  return (
    <Link href="/wordle-bbva" onClick={onClick}
      className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
      style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.09)", border: "1px solid rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>

      {/* Header dorado */}
      <div className="px-3 md:px-4 py-2.5 md:py-3 relative overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #c8920a 0%, #e8aa20 60%, #fac840 100%)" }}>
        <div className="absolute right-2 top-2 flex gap-1 opacity-15 pointer-events-none">
          {["B","B","V","A"].map((l,i) => (
            <div key={i} className="w-6 h-6 rounded border border-white flex items-center justify-center font-bebas text-xs text-white">{l}</div>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.25)", color: "white" }}>🔥 Hoy</span>
          <GamePill done={done} won={won} />
        </div>
        <h3 className="font-bebas text-[25px] md:text-[28px] leading-none text-white">WORDLE BBVA</h3>
        <p className="text-white/70 text-[10px] mt-0.5">Adivina el apellido del Hombre BBVA</p>
      </div>

      <div className="px-3 md:px-4 pt-2.5 md:pt-3 pb-3 md:pb-4 flex flex-col flex-1 justify-between">
        {/* Estado completado */}
        {done && (
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{ background: won ? "rgba(30,107,46,0.08)" : "rgba(184,28,20,0.07)", border: `1px solid ${won ? "rgba(30,107,46,0.20)" : "rgba(184,28,20,0.18)"}` }}>
              <span className="text-[10px]">{won ? "✓" : "✗"}</span>
              <span className="font-oswald font-semibold text-[10px]" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>
                Principal {won ? "completado" : "fallado"}
              </span>
            </div>
            {extras > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{ background: "rgba(200,146,10,0.08)", border: "1px solid rgba(200,146,10,0.20)" }}>
                <span className="text-[10px]">⭐</span>
                <span className="font-oswald font-semibold text-[10px]" style={{ color: "#c8920a" }}>
                  {extras} extra{extras > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Mini tablero Wordle */}
        <div className="mb-3">
          <div className="text-[7px] font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#bbb" }}>
            Ejemplo de partida
          </div>
          <div className="flex flex-col gap-1">
            {board.map((row, ri) => (
              <div key={ri} className="flex gap-1">
                {row.map(({l, s}, ci) => (
                  <div key={ci}
                    className="flex-1 h-6 rounded flex items-center justify-center font-bebas text-[12px]"
                    style={{
                      background: s === "ok" ? "var(--ok-bg)" : s === "amb" ? "var(--amb-bg)" : s === "no" ? "#f0ede6" : "#f8f5f0",
                      border: s === "ok" ? "1.5px solid var(--ok-bd)" : s === "amb" ? "1.5px solid var(--amb-bd)" : s === "no" ? "1.5px solid rgba(0,0,0,0.10)" : "1.5px dashed rgba(0,0,0,0.08)",
                      color: s === "ok" ? "var(--ok-txt)" : s === "amb" ? "var(--amb-txt)" : s === "no" ? "#aaa" : "#e0ddd8",
                    }}>
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#c8920a" }}>
          {done ? (extras > 0 ? `Extra #${extras + 1} →` : "Ver extras →") : "JUGAR →"}
        </div>
        <DifficultyLine {...difficulty} color="#c8920a" />
      </div>
    </Link>
  );
}

/* ─── TRAYECTORIA card ─── */
function TrayCard({ onClick, done, won, difficulty }: { onClick: () => void; done: boolean; won: boolean; difficulty: DifficultyInfo }) {
  return (
    <Link href="/trayectoria-bbva" onClick={onClick}
      className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
      style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.09)", border: "1px solid rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>

      <div className="px-3 md:px-4 py-2.5 md:py-3 flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #1e6b2e 0%, #28883c 100%)" }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>🆕 Hoy</span>
          <GamePill done={done} won={won} />
        </div>
        <h3 className="font-bebas text-[25px] md:text-[28px] leading-none text-white">TRAYECTORIA BBVA</h3>
        <p className="text-white/70 text-[10px] mt-0.5">Adivina por su carrera</p>
      </div>

      {/* Preview: deduction clues — no placeholders */}
      <div className="px-3 md:px-4 pt-2.5 md:pt-3 pb-3 md:pb-4 flex flex-col flex-1 justify-between">
        <div className="mb-1.5 md:mb-2">
          <div className="text-[7px] font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#bbb" }}>
            Deduce la trayectoria
          </div>
          <div className="flex flex-col gap-1 md:gap-1.5">
            {[
              { label: "Club reconocible",  value: "Se revela al empezar",  shown: false },
              { label: "Otro club",    value: "Falla para revelar",    shown: false },
              { label: "Posición",      value: "Falla para revelar",    shown: false },
            ].map(({label, value}, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold"
                  style={{ background: i===0?"#1e6b2e":"#ece8e0", color: i===0?"white":"#bbb" }}>
                  {i+1}
                </div>
                <div className="flex-1 px-2 py-1 md:py-1.5 rounded-lg text-[9px] font-semibold"
                  style={{ background: i===0?"#f0faf2":"#f6f3ee",
                    border:`1px solid ${i===0?"rgba(30,107,46,0.18)":"rgba(0,0,0,0.06)"}`,
                    color: i===0?"#1e6b2e":"#bbb" }}>
                  {i===0 ? "Club reconocible" : label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#1e6b2e" }}>
          {done ? "Ver resultado →" : "JUGAR →"}
        </div>
        <DifficultyLine {...difficulty} color="#1e6b2e" />
      </div>
    </Link>
  );
}

function StatdleCard({ onClick, done, won, difficulty }: { onClick: () => void; done: boolean; won: boolean; difficulty: DifficultyInfo }) {
  return (
    <Link href="/statdle-bbva" onClick={onClick}
      className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
      style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "1px solid rgba(200,146,10,0.24)", display: "flex", flexDirection: "column" }}>
      <div className="h-[3px]" style={{ background: "#18181b" }}/>
      <div className="px-3 md:px-4 py-3 md:py-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="text-[25px] md:text-[30px] leading-none">📊</div>
          <div className="flex items-center gap-1">
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(24,24,27,0.08)", color: "#18181b" }}>Nuevo</div>
            <GamePill done={done} won={won} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 mb-2">
          {["PJ", "G", "Club"].map((label, index) => (
            <div key={label} className="rounded-lg px-2 py-1 text-center"
              style={{ background: index === 0 ? "#fffbf5" : "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="text-[7px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#9a9a8a" }}>{label}</div>
              <div className="font-bebas text-[15px] leading-none" style={{ color: index === 0 ? "#c8920a" : "#18181b" }}>?</div>
            </div>
          ))}
        </div>
        <div className="font-bebas text-[17px] md:text-[18px] leading-none mt-1 mb-0.5" style={{ color: "#18181b" }}>STATDLE BBVA</div>
        <div className="text-[10px] leading-snug flex-1" style={{ color: "#9a9a8a" }}>Adivina por estadísticas</div>
        <div className="mt-2 font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#18181b" }}>{done ? "VER RESULTADO →" : "JUGAR →"}</div>
        <DifficultyLine {...difficulty} color="#18181b" />
      </div>
    </Link>
  );
}

function MundialdleHomeCard({ onClick, done, won, difficulty }: { onClick: () => void; done: boolean; won: boolean; difficulty: DifficultyInfo }) {
  return (
    <Link href="/world-cups/mundialdle" onClick={onClick}
      className="w-full h-full min-h-[160px] sm:min-h-[190px] text-left rounded-2xl overflow-hidden game-card"
      style={{ background: "white", boxShadow: "0 6px 18px rgba(23,78,166,0.18)", border: "1px solid rgba(23,78,166,0.30)", display: "flex", flexDirection: "column" }}>
      <div className="px-3 md:px-4 py-3 md:py-4 relative overflow-hidden flex flex-col flex-1"
        style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
        <div className="absolute right-2 top-2 text-[54px] opacity-15 leading-none">🏆</div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
            style={{ background: "#facc15", color: "#0f172a", boxShadow: "0 1px 8px rgba(250,204,21,0.35)" }}>Nuevo</span>
          <GamePill done={done} won={won} />
        </div>
        <div className="text-[27px] leading-none mb-2">🌍</div>
        <div className="font-bebas text-[21px] md:text-[23px] leading-none">MUNDIALDLE</div>
        <div className="text-[10px] leading-snug mt-0.5 flex-1 text-white/70">Adivina el jugador mundialista</div>
        <div className="flex flex-wrap gap-1 mt-3">
          {["🏆 Mundial", "🇩🇪 Selección", "🏟 Club"].map(chip => (
            <span key={chip} className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }}>{chip}</span>
          ))}
        </div>
        <div className="mt-3 font-oswald font-semibold uppercase tracking-wider text-[10px] text-white">{done ? "VER RESULTADO →" : "JUGAR →"}</div>
        <DifficultyLine {...difficulty} color="#facc15" />
      </div>
    </Link>
  );
}

/* ─── Coming soon card ─── */
interface CSCardProps {
  title: string; subtitle: string; emoji: string; accent: string;
  badge: string; deco?: React.ReactNode;
}
function CSCard({ title, subtitle, emoji, accent, badge, deco }: CSCardProps) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden"
      style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>
      {/* Thin top bar */}
      <div className="h-[3px] flex-shrink-0" style={{ background: accent }}/>
      <div className="px-4 py-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="text-[32px] leading-none">{emoji}</div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
            style={{ background: accent+"14", color: accent }}>{badge}</div>
        </div>
        {deco && <div className="mb-2">{deco}</div>}
        <div className="font-bebas text-[20px] leading-none mb-0.5" style={{ color: "#18181b" }}>{title}</div>
        <div className="text-[10px] leading-snug flex-1" style={{ color: "#9a9a8a" }}>{subtitle}</div>
        {/* Progress bar */}
        <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "#f0ede6" }}>
          <div className="h-full rounded-full" style={{ width: "30%", background: accent+"50" }}/>
        </div>
        <div className="text-[8px] mt-1 font-semibold uppercase tracking-wider" style={{ color: "#ccc" }}>Archivo futuro</div>
      </div>
    </div>
  );
}

function QuickGameCard({ title, subtitle, emoji, accent, onClick }: {
  title: string;
  subtitle: string;
  emoji: string;
  accent: string;
  onClick: () => void;
}) {
  const visual = title.includes("STATDLE")
    ? { mark: "ST", chips: ["PJ", "G", "%"] }
    : title.includes("JUGO") || title.includes("JUGÓ")
      ? { mark: "OK", chips: ["CLUB", "SI", "NO"] }
      : title.includes("FICHAJE")
        ? { mark: "DOC", chips: ["FIRMA", "RUMOR", "OK"] }
        : title.includes("CLUB")
          ? { mark: "ESC", chips: ["1", "2", "?"] }
          : title.includes("DUELO")
            ? { mark: "VS", chips: ["A", "VS", "B"] }
            : { mark: "F", chips: ["BBVA", "?", "!"] };

  return (
    <button onClick={onClick}
      className="fbl-card group w-full text-left rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
      style={{ background: "white", border: `1px solid ${accent}33`, boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
      <div className="h-[3px]" style={{ background: accent }} />
      <span className="fbl-visual-mark right-2 top-4 text-[46px] sm:text-[56px] group-hover:scale-105">{visual.mark}</span>
      <div className="relative z-10 px-2.5 py-2.5 sm:px-3 sm:py-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl text-[18px] sm:h-9 sm:w-9 sm:text-[20px] leading-none"
            style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}24` }}>{emoji}</span>
          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
            style={{ background: `${accent}12`, color: accent }}>Extra</span>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1">
          {visual.chips.map((chip, index) => (
            <span key={`${title}-${chip}-${index}`} className="rounded-md px-1.5 py-1 text-center text-[7px] font-bold uppercase tracking-[0.08em]"
              style={{ background: index === 1 ? `${accent}20` : "#f5f1ea", color: index === 1 ? accent : "#9a9a8a", border: `1px solid ${index === 1 ? `${accent}28` : "rgba(0,0,0,0.06)"}` }}>
              {chip}
            </span>
          ))}
        </div>
        <div className="font-bebas text-[15px] sm:text-[18px] md:text-[19px] leading-none" style={{ color: "#18181b" }}>{title}</div>
        <div className="text-[9px] sm:text-[10px] leading-snug mt-0.5 min-h-[24px]" style={{ color: "#9a9a8a" }}>{subtitle}</div>
        <div className="mt-2 font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: accent }}>JUGAR →</div>
      </div>
    </button>
  );
}

function FeaturedDuelCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fbl-card group col-span-2 sm:col-span-2 w-full text-left rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
      style={{ background: "linear-gradient(135deg,#fff7f5,#ffffff)", border: "1px solid rgba(184,28,20,0.22)", boxShadow: "0 6px 18px rgba(184,28,20,0.08)" }}
    >
      <div className="h-[3px]" style={{ background: "#b81c14" }} />
      <div className="relative px-3 py-3 sm:px-4 sm:py-4 overflow-hidden">
        <div className="absolute right-3 top-1 font-bebas text-[78px] leading-none opacity-[0.06]" style={{ color: "#b81c14" }}>VS</div>
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#b81c14" }}>Reto para picar</div>
            <div className="font-bebas text-[25px] leading-none mt-1" style={{ color: "#18181b" }}>DUELO NOSTALGIA</div>
            <div className="text-[10px] leading-snug mt-1" style={{ color: "#6b6b72" }}>Elige quién tuvo más goles, asistencias o partidos. Se entiende en 5 segundos.</div>
          </div>
          <div className="shrink-0 grid grid-cols-[1fr_auto_1fr] items-center gap-1 rounded-xl px-2 py-2" style={{ background: "white", border: "1px solid rgba(184,28,20,0.14)" }}>
            <span className="grid h-8 w-8 place-items-center rounded-lg font-bebas text-[18px]" style={{ background: "rgba(184,28,20,0.10)", color: "#b81c14" }}>A</span>
            <span className="font-bebas text-[18px]" style={{ color: "#18181b" }}>VS</span>
            <span className="grid h-8 w-8 place-items-center rounded-lg font-bebas text-[18px]" style={{ background: "rgba(200,146,10,0.12)", color: "#c8920a" }}>B</span>
          </div>
        </div>
        <div className="relative z-10 mt-3 font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#b81c14" }}>JUGAR →</div>
      </div>
    </button>
  );
}

function SeasonsBlock() {
  function statusFor(status: string) {
    if (status === "active") return { label: "Activa", color: "#1e6b2e", bg: "rgba(30,107,46,0.12)", border: "rgba(30,107,46,0.20)", card: "#f0faf2" };
    if (status === "new") return { label: "Nuevo", color: "#174ea6", bg: "rgba(23,78,166,0.12)", border: "rgba(23,78,166,0.22)", card: "#eef3ff" };
    return { label: "Próximamente", color: "#9a9a8a", bg: "#f8f5f0", border: "rgba(0,0,0,0.07)", card: "#fff" };
  }

  return (
    <section className="rounded-2xl px-3 py-3 md:px-4"
      style={{ background: "rgba(255,255,255,0.66)", border: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="flex items-end justify-between gap-2 mb-2.5">
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Explorar</div>
          <h3 className="font-bebas text-[21px] leading-none" style={{ color: "#18181b" }}>TEMPORADAS</h3>
        </div>
        <div className="text-[9px] font-semibold" style={{ color: "#9a9a8a" }}>Temporadas</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {seasons.filter(season => season.id === "bbva" || season.id === "world-cups").map(season => {
          const status = statusFor(season.status);
          const content = (
            <div className="rounded-xl px-3 py-2 h-full transition-transform active:scale-[0.98]"
              style={{ background: status.card, border: `1px solid ${status.border}` }}>
              <div className="flex items-center justify-between gap-2">
                <div className="font-bebas text-[17px] leading-none" style={{ color: "#18181b" }}>{season.name}</div>
                <span className="text-[7px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                  style={{ background: status.bg, color: status.color }}>
                  {status.label}
                </span>
              </div>
              <div className="text-[10px] mt-1" style={{ color: "#9a9a8a" }}>{season.subtitle}</div>
            </div>
          );

          if (season.id === "world-cups") {
            return <Link key={season.id} href="/world-cups" onClick={() => trackSeasonEntered("world-cups")} className="block">{content}</Link>;
          }

          return <Link key={season.id} href="/" onClick={() => trackSeasonEntered("bbva")} className="block">{content}</Link>;
        })}
      </div>
    </section>
  );
}

/* ─── Podium deco para Top 10 ─── */
function PodiumDeco() {
  return (
    <div className="flex items-end gap-1 h-8">
      {[{h:20,c:"#1a4fa030",n:"2"},{h:28,c:"#1a4fa060",n:"1"},{h:14,c:"#1a4fa020",n:"3"}].map(({h,c,n},i)=>(
        <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
          <div className="text-[8px] font-bold" style={{color:"#1a4fa0"}}>{n}</div>
          <div className="w-full rounded-t" style={{height:h,background:c}}/>
        </div>
      ))}
    </div>
  );
}

/* ─── Camisetas deco para XI ─── */
function KitsDeco() {
  return (
    <div className="flex gap-1">
      {["#b81c14","#b81c1460","#b81c1430"].map((c,i)=>(
        <div key={i} className="text-[16px]" style={{opacity:1-i*0.25}}>👕</div>
      ))}
    </div>
  );
}

/* ─── Atributos deco para Adivina ─── */
function AttrDeco() {
  return (
    <div className="flex gap-1 flex-wrap">
      {["ESP","DEL","30","RM"].map(a=>(
        <span key={a} className="text-[8px] font-bold px-1.5 py-0.5 rounded"
          style={{background:"#7c3aed14",color:"#7c3aed"}}>?</span>
      ))}
    </div>
  );
}

/* ─── Barra de progreso diaria ─── */
function DailyProgress({ wordleDone, wordleWon, trayDone, trayWon, top10Done, top10Won, crackDone, crackWon, statdleDone, statdleWon, streak }: {
  wordleDone: boolean; wordleWon: boolean; trayDone: boolean; trayWon: boolean; top10Done: boolean; top10Won: boolean; crackDone: boolean; crackWon: boolean; statdleDone: boolean; statdleWon: boolean; streak: number;
}) {
  const total = 5;
  const completed = (wordleDone&&wordleWon?1:0)+(trayDone&&trayWon?1:0)+(top10Done&&top10Won?1:0)+(crackDone&&crackWon?1:0)+(statdleDone&&statdleWon?1:0);
  const failed = (wordleDone&&!wordleWon?1:0)+(trayDone&&!trayWon?1:0)+(top10Done&&!top10Won?1:0)+(crackDone&&!crackWon?1:0)+(statdleDone&&!statdleWon?1:0);
  const pending = total - completed - failed;
  const pct = Math.round((completed / total) * 100);
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
      style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
      {/* Progress bar + counts */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold" style={{ color: "#18181b" }}>
                🔥 {completed}/{total} completados
                {failed > 0 && <span style={{color:"#b81c14"}}> · {failed} fallado{failed>1?"s":""}</span>}
                {pending > 0 && <span style={{color:"#9a9a8a"}}> · {pending} pendiente{pending>1?"s":""}</span>}
              </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] flex items-center gap-1" style={{ color: wordleDone?(wordleWon?"#1e6b2e":"#b81c14"):"#bbb" }}>
              {wordleDone?(wordleWon?"✅":"❌"):"⬜"} Wordle
            </span>
            <span className="text-[9px]" style={{ color:"#ddd" }}>·</span>
            <span className="text-[10px] flex items-center gap-1" style={{ color: trayDone?(trayWon?"#1e6b2e":"#b81c14"):"#bbb" }}>
              {trayDone?(trayWon?"✅":"❌"):"⬜"} Trayectoria
            </span>
            <span className="text-[9px]" style={{ color:"#ddd" }}>·</span>
            <span className="text-[10px] flex items-center gap-1" style={{ color: top10Done?(top10Won?"#1e6b2e":"#b81c14"):"#bbb" }}>
              {top10Done?(top10Won?"✅":"❌"):"⬜"} Top 10
            </span>
            <span className="text-[9px]" style={{ color:"#ddd" }}>·</span>
            <span className="text-[10px] flex items-center gap-1" style={{ color: crackDone?(crackWon?"#1e6b2e":"#b81c14"):"#bbb" }}>
              {crackDone?(crackWon?"✅":"❌"):"⬜"} Cromo
            </span>
            <span className="text-[9px]" style={{ color:"#ddd" }}>·</span>
            <span className="text-[10px] flex items-center gap-1" style={{ color: statdleDone?(statdleWon?"#1e6b2e":"#b81c14"):"#bbb" }}>
              {statdleDone?(statdleWon?"✅":"❌"):"⬜"} Statdle
            </span>


          </div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f0ede6" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width:`${pct}%`, background: completed===total?"#1e6b2e":"linear-gradient(90deg,#c8920a,#e8aa20)" }}/>
        </div>
      </div>
      {/* Racha */}
      {streak > 0 && (
        <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg"
          style={{ background:"#fff8e6", border:"1px solid rgba(200,146,10,0.25)" }}>
          <span className="text-[11px]">🏆</span>
          <span className="font-bebas text-[15px] leading-none" style={{ color:"#c8920a" }}>{streak}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Hoy se juega strip ─── */
function TodayStrip({ wordleDone, trayDone, onWordle, onTray }: {
  wordleDone:boolean; trayDone:boolean; onWordle:()=>void; onTray:()=>void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-semibold" style={{ color: "#9a9a8a" }}>🔥 Hoy se juega:</span>
      <button onClick={onWordle}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
        style={{ background: wordleDone ? "#fff8e6" : "#fffbf5", border: `1.5px solid ${wordleDone ? "rgba(200,146,10,0.30)" : "rgba(200,146,10,0.18)"}`, color: wordleDone ? "#c8920a" : "#9a9a8a" }}>
        {wordleDone ? "✓" : "□"} Wordle BBVA
      </button>
      <button onClick={onTray}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
        style={{ background: trayDone ? "#f0faf2" : "#f4faf5", border: `1.5px solid ${trayDone ? "rgba(30,107,46,0.30)" : "rgba(30,107,46,0.18)"}`, color: trayDone ? "#1e6b2e" : "#9a9a8a" }}>
        {trayDone ? "✓" : "□"} Trayectoria BBVA
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════ */
function dailyShareSquare(done: boolean, won: boolean) {
  if (!done) return "\u2b1c";
  return won ? "\ud83d\udfe9" : "\ud83d\udfe5";
}

function simpleSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ProfileCompact({ played, won, streak, bestStreak, albumProgress, onAlbum }: {
  played: number;
  won: number;
  streak: number;
  bestStreak: number;
  albumProgress: { unlockedCount: number; total: number; percent: number };
  onAlbum: () => void;
}) {
  const winPct = played > 0 ? Math.round((won / played) * 100) : 0;
  const nextMilestone = [7, 30, 50, 100].find(day => streak < day) ?? 100;
  const streakProgress = Math.min(100, Math.round((streak / nextMilestone) * 100));
  const remainingCards = Math.max(0, albumProgress.total - albumProgress.unlockedCount);
  const nextRewardAt = [10, 25, 50, 100, 150, 200, albumProgress.total].find(goal => albumProgress.unlockedCount < goal) ?? albumProgress.total;
  const cardsToReward = Math.max(0, nextRewardAt - albumProgress.unlockedCount);

  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl px-3 py-3"
      style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
      <button onClick={onAlbum} className="col-span-4 text-left rounded-xl px-3 py-3 transition-colors"
        style={{ background: "#fffbf5", border: "1px solid rgba(200,146,10,0.24)" }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>Álbum BBVA</div>
            <div className="font-bebas text-[34px] leading-none mt-1" style={{ color: "#18181b" }}>
              {albumProgress.unlockedCount}/{albumProgress.total}
            </div>
            <div className="text-[10px] font-semibold mt-0.5" style={{ color: "#8a6200" }}>{albumProgress.percent}% completado</div>
          </div>
          <div className="text-right text-[10px] font-semibold leading-snug max-w-[150px]" style={{ color: "#6b6b72" }}>
            Te faltan {remainingCards} cromos para completar la colección.
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden mt-3" style={{ background: "#efe4c9" }}>
          <div className="h-full rounded-full" style={{ width: `${albumProgress.percent}%`, background: "linear-gradient(90deg,#c8920a,#fac840)" }} />
        </div>
      </button>
      <div className="rounded-lg px-2 py-1.5" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#bbb" }}>Partidas</div>
        <div className="font-bebas text-[18px] leading-none" style={{ color: "#18181b" }}>{played}</div>
        <div className="text-[9px]" style={{ color: "#9a9a8a" }}>jugadas</div>
      </div>
      <div className="rounded-lg px-2 py-1.5" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#bbb" }}>Victorias</div>
        <div className="font-bebas text-[18px] leading-none" style={{ color: "#1e6b2e" }}>{winPct}%</div>
        <div className="text-[9px]" style={{ color: "#9a9a8a" }}>{won}/{played}</div>
      </div>
      <div className="rounded-lg px-2 py-1.5" style={{ background: "#fff8e6", border: "1px solid rgba(200,146,10,0.16)" }}>
        <div className="text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#c8920a" }}>Racha</div>
        <div className="font-bebas text-[18px] leading-none" style={{ color: "#c8920a" }}>{streak}</div>
        <div className="text-[9px]" style={{ color: "#9a9a8a" }}>mejor {bestStreak}</div>
      </div>
      <button onClick={onAlbum} className="rounded-lg px-2 py-1.5 text-left"
        style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#bbb" }}>Acceso</div>
        <div className="font-oswald font-semibold uppercase tracking-wider text-[10px] mt-1" style={{ color: "#c8920a" }}>Ver álbum →</div>
      </button>
      <div className="col-span-4 flex gap-2 pt-1">
        <a href="/perfil" className="text-[10px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#f8f5f0", color: "#6b6b72" }}>Perfil</a>
        <a href="/rankings" className="text-[10px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#f8f5f0", color: "#6b6b72" }}>Rankings</a>
        <a href="/vitrina" className="text-[10px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#f8f5f0", color: "#6b6b72" }}>Vitrina</a>
      </div>
      <div className="col-span-4 rounded-lg px-2 py-1.5" style={{ background: "#fffbf5", border: "1px solid rgba(200,146,10,0.16)" }}>
        <div className="flex items-center justify-between text-[9px] font-semibold mb-1" style={{ color: "#8a6200" }}>
          <span>Próximo hito de racha</span>
          <span>{streak}/{nextMilestone} días</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#efe4c9" }}>
          <div className="h-full rounded-full" style={{ width: `${streakProgress}%`, background: "#c8920a" }} />
        </div>
      </div>
      <div className="col-span-4 rounded-lg px-2 py-2" style={{ background: "#f0faf2", border: "1px solid rgba(30,107,46,0.14)" }}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#1e6b2e" }}>Próxima recompensa</div>
            <div className="text-[11px] font-semibold" style={{ color: "#18181b" }}>
              {cardsToReward === 1 ? "🎁 Próximo cromo especial en 1 cromo" : `🎁 Próximo cromo especial en ${cardsToReward} cromos`}
            </div>
          </div>
          <div className="text-[20px]">🎴</div>
        </div>
      </div>
    </div>
  );
}

function ProductHero({ onStart, onShare }: {
  completed: number;
  total: number;
  streak: number;
  cards: number;
  worldCards: number;
  onStart: () => void;
  onShare: () => void;
}) {
  return (
    <section className="rounded-3xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 24px rgba(0,0,0,0.07)" }}>
      <div className="relative px-4 py-3.5 md:px-5 md:py-4 overflow-hidden" style={{ background: "linear-gradient(135deg,#18181b 0%,#2a1b12 58%,#c8920a 150%)", color: "white" }}>
        <div className="absolute -right-4 -top-10 font-bebas text-[96px] md:text-[128px] leading-none text-white/5">F</div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#fac840" }}>Juegos diarios de fútbol</div>
            <h1 className="font-bebas text-[34px] md:text-[44px] leading-none mt-1">FUTBOLDLE</h1>
            <p className="text-[11px] md:text-[12px] text-white/75 mt-1 max-w-xl">Liga BBVA y Mundiales. Adivina jugadores, completa retos y desbloquea cromos cada día.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onStart} className="font-oswald font-semibold uppercase tracking-wider text-[11px] px-4 py-2.5 rounded-xl" style={{ background: "#fac840", color: "#18181b" }}>Jugar ahora</button>
            <button onClick={onShare} className="font-oswald font-semibold uppercase tracking-wider text-[11px] px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.18)" }}>Compartir</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Top10MundialHomeCard({ onClick, done, won, difficulty }: { onClick: () => void; done: boolean; won: boolean; difficulty: DifficultyInfo }) {
  return (
    <Link href="/world-cups/top10" onClick={onClick}
      className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
      style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "1px solid rgba(23,78,166,0.24)", display: "flex", flexDirection: "column" }}>
      <div className="h-[3px]" style={{ background: "#174ea6" }}/>
      <div className="px-3 md:px-4 py-3 md:py-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="text-[25px] md:text-[30px] leading-none">🌍</div>
          <div className="flex items-center gap-1">
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(23,78,166,0.10)", color: "#174ea6" }}>Nuevo</div>
            <GamePill done={done} won={won} />
          </div>
        </div>
        <PodiumDeco />
        <div className="font-bebas text-[17px] md:text-[18px] leading-none mt-1.5 md:mt-2 mb-0.5" style={{ color: "#18181b" }}>TOP10 MUNDIAL</div>
        <div className="text-[10px] leading-snug flex-1" style={{ color: "#9a9a8a" }}>Rankings históricos de Mundiales</div>
        <div className="mt-2 font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#174ea6" }}>{done ? "VER RESULTADO →" : "INTENTAR →"}</div>
        <DifficultyLine {...difficulty} color="#174ea6" />
      </div>
    </Link>
  );
}

function DailyMissionPanel({ wordleDone, mundialDone, anyCardUnlocked }: { wordleDone: boolean; mundialDone: boolean; anyCardUnlocked: boolean }) {
  const items = [
    { label: "Completa Wordle BBVA", done: wordleDone },
    { label: "Juega un reto Mundial", done: mundialDone },
    { label: "Desbloquea 1 cromo", done: anyCardUnlocked },
  ];
  const completed = items.filter(item => item.done).length;
  return (
    <section className="rounded-2xl px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.22)" }}>
      <div>
        <div className="text-[8px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#c8920a" }}>Misión diaria</div>
        <div className="font-bebas text-[24px] leading-none mt-1" style={{ color: "#18181b" }}>{completed}/3 completada</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item.label} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: item.done ? "#f0faf2" : "white", color: item.done ? "#1e6b2e" : "#6b6b72", border: "1px solid rgba(0,0,0,0.07)" }}>
            {item.done ? "✓" : "○"} {item.label}
          </span>
        ))}
      </div>
      <div className="text-[10px] font-semibold whitespace-nowrap" style={{ color: "#c8920a" }}>+50 XP · cromo extra</div>
    </section>
  );
}

function DiscoveryStrip({ playerName, rankingTitle, rankingHref }: { playerName: string; rankingTitle: string; rankingHref: string }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <Link href={`/jugador/${simpleSlug(playerName)}`} className="rounded-2xl px-3 py-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#9a9a8a" }}>Jugador del dia</div>
        <div className="font-bebas text-[23px] leading-none mt-1" style={{ color: "#18181b" }}>{playerName}</div>
        <div className="text-[10px] mt-1" style={{ color: "#6b6b72" }}>Perfil, cromos y juegos</div>
      </Link>
      <Link href={rankingHref} className="rounded-2xl px-3 py-3" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.16)" }}>
        <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#174ea6" }}>Ranking destacado</div>
        <div className="font-bebas text-[23px] leading-none mt-1" style={{ color: "#18181b" }}>{rankingTitle}</div>
        <div className="text-[10px] mt-1" style={{ color: "#6b6b72" }}>Tabla, fuente y reto relacionado</div>
      </Link>
      <Link href="/que-son-los-hombres-bbva" className="rounded-2xl px-3 py-3" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
        <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#c8920a" }}>Pregunta curiosa</div>
        <div className="font-bebas text-[23px] leading-none mt-1" style={{ color: "#18181b" }}>Que es un Hombre BBVA?</div>
        <div className="text-[10px] mt-1" style={{ color: "#6b6b72" }}>Origen, ejemplos y nostalgia</div>
      </Link>
    </section>
  );
}

function NextStepPanel({ pending, nextLabel, onNext, albumProgress, worldCards }: {
  pending: number;
  nextLabel: string;
  onNext: () => void;
  albumProgress: { unlockedCount: number; total: number; percent: number };
  worldCards: number;
}) {
  const nextRewardAt = [10, 25, 50, 100, 150, 200, albumProgress.total].find(goal => albumProgress.unlockedCount < goal) ?? albumProgress.total;
  const cardsToReward = Math.max(0, nextRewardAt - albumProgress.unlockedCount);
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <button onClick={onNext} className="md:col-span-2 text-left rounded-2xl px-4 py-3" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.22)" }}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#c8920a" }}>{pending > 0 ? "Siguiente reto" : "Una más"}</div>
        <div className="font-bebas text-[28px] leading-none mt-1" style={{ color: "#18181b" }}>{pending > 0 ? `Te queda ${pending} reto${pending === 1 ? "" : "s"}` : "Juega un extra de nostalgia"}</div>
        <div className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>{nextLabel}</div>
      </button>
      <Link href="/progreso" className="rounded-2xl px-4 py-3" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.18)" }}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#174ea6" }}>Colección</div>
        <div className="font-bebas text-[28px] leading-none mt-1" style={{ color: "#18181b" }}>{albumProgress.percent}% BBVA</div>
        <div className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>🎁 Especial en {cardsToReward} cromos · 🌍 {worldCards} mundialistas</div>
      </Link>
    </section>
  );
}

function CommunityPulse({ items }: { items: Array<{ name: string; stats: DifficultyInfo; color: string }> }) {
  const realItems = items.filter(item => item.stats.real && (item.stats.sample ?? 0) >= 5);
  if (realItems.length === 0) return null;
  const hardest = [...realItems].sort((a, b) => a.stats.completion - b.stats.completion)[0];
  const mostPlayed = [...realItems].sort((a, b) => (b.stats.sample ?? 0) - (a.stats.sample ?? 0))[0];
  return (
    <section className="rounded-2xl px-3 py-3 md:px-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Comunidad</div>
          <h3 className="font-bebas text-[22px] leading-none" style={{ color: "#18181b" }}>HOY SE ESTÁ JUGANDO</h3>
        </div>
        <Link href="/progreso" className="text-[9px] font-semibold" style={{ color: "#9a9a8a" }}>Ver progreso</Link>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl px-3 py-2" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
          <div className="text-[8px] uppercase font-semibold tracking-[0.14em]" style={{ color: "#c8920a" }}>Reto más duro</div>
          <div className="font-bebas text-[22px] leading-none mt-1" style={{ color: "#18181b" }}>{hardest.name}</div>
          <div className="text-[10px]" style={{ color: "#6b6b72" }}>Solo {hardest.stats.completion}% lo completan</div>
        </div>
        <div className="rounded-xl px-3 py-2" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.18)" }}>
          <div className="text-[8px] uppercase font-semibold tracking-[0.14em]" style={{ color: "#174ea6" }}>Más jugado</div>
          <div className="font-bebas text-[22px] leading-none mt-1" style={{ color: "#18181b" }}>{mostPlayed.name}</div>
          <div className="text-[10px]" style={{ color: "#6b6b72" }}>{mostPlayed.stats.sample} partidas registradas</div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const [albumProgress, setAlbumProgress] = useState({ unlockedCount: 0, total: bbvaPlayers.length, percent: 0 });
  const [worldCupProgress, setWorldCupProgress] = useState({ unlocked: 0, latest: "" });
  const { wordleDone, wordleWon, extras, trayDone, trayWon, top10Done, top10Won, crackDone, crackWon, statdleDone, statdleWon, mundialdleDone, mundialdleWon, top10MundialDone, top10MundialWon } = useDailyStatus();
  const { stats, refresh } = useStats();
  const goHome = () => setView("home");
  const hasShareableResult = wordleDone || trayDone || top10Done || crackDone || statdleDone || mundialdleDone;
  const wordleDifficulty = useCommunityDifficulty("wordle", `wordle-${getDayKey()}`);
  const trayDifficulty = useCommunityDifficulty("trayectoria", `trayectoria-${getDayKey()}`);
  const top10Difficulty = useCommunityDifficulty("top10", getDailyTop10().id);
  const crackDifficulty = useCommunityDifficulty("crack", `crack-${getDayKey()}`);
  const statdleDifficulty = useCommunityDifficulty("statdle", getDailyStatdleChallenge(getDayNumber()).id);
  const mundialdleDifficulty = useCommunityDifficulty("mundialdle", getDailyMundialdleChallenge(getDayNumber()).id);
  const top10MundialDifficulty = useCommunityDifficulty("top10-mundial", getDailyWorldCupTop10(getDayNumber()).id);
  const dailyGames = [
    { done: wordleDone, won: wordleWon, label: "Wordle BBVA", view: "wordle" as View, modeId: "wordle-bbva", seasonId: "bbva" },
    { done: trayDone, won: trayWon, label: "Trayectoria BBVA", view: "trayectoria" as View, modeId: "trayectoria-bbva", seasonId: "bbva" },
    { done: top10Done, won: top10Won, label: "Top10 BBVA", view: "top10" as View, modeId: "top10-bbva", seasonId: "bbva" },
    { done: mundialdleDone, won: mundialdleWon, label: "Mundialdle", view: "mundialdle" as View, modeId: "mundialdle", seasonId: "world-cups" },
  ];
  const completedDaily = dailyGames.filter(game => game.done && game.won).length;
  const pendingDaily = dailyGames.filter(game => !game.done).length;
  const nextGame = dailyGames.find(game => !game.done) ?? { label: "Duelo Nostalgia", view: "duelo" as View, modeId: "duelo-nostalgia", seasonId: "bbva" };
  const communityItems = [
    { name: "Wordle", stats: wordleDifficulty, color: "#c8920a" },
    { name: "Trayectoria", stats: trayDifficulty, color: "#1e6b2e" },
    { name: "Top10", stats: top10Difficulty, color: "#1a4fa0" },
    { name: "Mundialdle", stats: mundialdleDifficulty, color: "#174ea6" },
    { name: "Top10 Mundial", stats: top10MundialDifficulty, color: "#174ea6" },
    { name: "Cromo", stats: crackDifficulty, color: "#7c3aed" },
  ];

  function openMode(nextView: View, modeId: string, seasonId = "bbva") {
    trackModeEntered(modeId, seasonId, { source: "home" });
    setView(nextView);
  }

  useEffect(() => {
    setAlbumProgress(getAlbumProgress());
    const worldCards = getWorldCupAlbum();
    const latestEntry = [...worldCards].sort((a, b) => b.unlockedAt.localeCompare(a.unlockedAt))[0];
    setWorldCupProgress({ unlocked: worldCards.length, latest: worldCupPlayers.find(player => player.id === latestEntry?.playerId)?.name ?? "" });
    refresh();
  }, [view, refresh]);

  async function shareDailyResult() {
    let lastCard = "";
    try {
      const raw = localStorage.getItem("fbl-last-card-unlock-v1");
      if (raw) {
        const card = JSON.parse(raw);
        if (card?.name && card?.rarity) lastCard = `\n🎴 Último cromo: ${card.name} (${card.rarity})`;
      }
    } catch {}
    const completedCount = [wordleDone && wordleWon, trayDone && trayWon, top10Done && top10Won, mundialdleDone && mundialdleWon].filter(Boolean).length;
    const failedCount = [wordleDone && !wordleWon, trayDone && !trayWon, top10Done && !top10Won, mundialdleDone && !mundialdleWon].filter(Boolean).length;
    const lines = [
      "\u26bd Futboldle #" + getDayNumber(),
      "Minijuegos diarios de fútbol nostalgia",
      "Liga BBVA 2005-2016",
      "",
      dailyShareSquare(wordleDone, wordleWon) + " Wordle BBVA",
      dailyShareSquare(trayDone, trayWon) + " Trayectoria BBVA",
      dailyShareSquare(top10Done, top10Won) + " Top10 BBVA",
      dailyShareSquare(mundialdleDone, mundialdleWon) + " Mundialdle",
      "",
      "🔥 Hoy: " + completedCount + "/4 retos",
      failedCount > 0 ? "💥 Fallados: " + failedCount : "✅ Sin fallos",
      "\ud83c\udfb4 " + albumProgress.unlockedCount + "/" + albumProgress.total + " cromos" + lastCard,
      "\ud83d\udd25 Racha: " + stats.streak,
      "",
      "Reta a tu grupo:",
      "https://futboldle.es",
    ];
    const text = lines.join("\\n");
    shareResult(text);
  }

  if (view === "top10") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <Top10BBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "crack") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <AdivinaElCrack onBack={goHome} />
      </main>
    </div>
  );

  if (view === "statdle") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <StatdleBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "mundialdle") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <Mundialdle onBack={goHome} />
      </main>
    </div>
  );

  if (view === "top10Mundial") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <Top10Mundial onBack={goHome} />
      </main>
    </div>
  );

  if (view === "wordle") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <WordleBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "trayectoria") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <TrayectoriaBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "jugoAqui") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <JugoAquiBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "fichaje") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <FichajeInventoBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "clubOculto") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <ClubOcultoBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "duelo") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <DueloNostalgia onBack={goHome} />
      </main>
    </div>
  );

  if (view === "once") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <OnceBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "quienFalta") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <QuienFaltaBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "album") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <Header onLogoClick={goHome} />
      <main className="max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <AlbumBBVA onBack={goHome} />
      </main>
    </div>
  );

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "#f6f2ea" }}>
      <IconUnlockToast />
      <SidebarAds />
      <Header onLogoClick={goHome} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-3 md:px-4 py-2.5 md:py-5 flex flex-col gap-2.5 md:gap-4 overflow-x-hidden">

        <ProductHero
          completed={completedDaily}
          total={dailyGames.length}
          streak={stats.streak}
          cards={albumProgress.unlockedCount}
          worldCards={worldCupProgress.unlocked}
          onStart={() => openMode(nextGame.view, nextGame.modeId, nextGame.seasonId)}
          onShare={shareDailyResult}
        />

        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="font-bebas text-[28px] md:text-[32px] leading-none" style={{ color: "#18181b" }}>HOY SE JUEGA</h2>
            <p className="text-[9px]" style={{ color: "#9a9a8a" }}>
              {new Date().toLocaleDateString("es-ES", { weekday:"long", day:"numeric", month:"long" })} · Día #{getDayNumber()}
            </p>
          </div>
          {hasShareableResult ? (
            <button onClick={shareDailyResult} className="text-[10px] font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", color: "#6b6b72" }}>
              Compartir
            </button>
          ) : (
            <div className="text-[9px] font-semibold" style={{ color: "#9a9a8a" }}>Retos diarios</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          <WordleCard onClick={() => openMode("wordle", "wordle-bbva")} done={wordleDone} won={wordleWon} extras={extras} difficulty={wordleDifficulty} />
          <TrayCard onClick={() => openMode("trayectoria", "trayectoria-bbva")} done={trayDone} won={trayWon} difficulty={trayDifficulty} />
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <Link href="/top10-bbva" onClick={() => trackModeEntered("top10-bbva", "bbva", { source: "home" })}
            className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
            style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "1px solid rgba(26,79,160,0.20)", display: "flex", flexDirection: "column" }}>
            <div className="h-[3px]" style={{ background: "#1a4fa0" }}/>
            <div className="px-3 md:px-4 py-3 md:py-4 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="text-[25px] md:text-[30px] leading-none">🏆</div>
                <div className="flex items-center gap-1">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(26,79,160,0.10)", color: "#1a4fa0" }}>Hoy</div>
                  <GamePill done={top10Done} won={top10Won} />
                </div>
              </div>
              <PodiumDeco />
              <div className="font-bebas text-[17px] md:text-[18px] leading-none mt-1.5 md:mt-2 mb-0.5" style={{ color: "#18181b" }}>TOP 10 BBVA</div>
              <div className="text-[10px] leading-snug flex-1" style={{ color: "#9a9a8a" }}>Completa las listas históricas</div>
              <div className="mt-2 font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#1a4fa0" }}>{top10Done ? "VER RESULTADO →" : "JUGAR →"}</div>
              <DifficultyLine {...top10Difficulty} color="#1a4fa0" />
            </div>
          </Link>
          <MundialdleHomeCard onClick={() => openMode("mundialdle", "mundialdle", "world-cups")} done={mundialdleDone} won={mundialdleWon} difficulty={mundialdleDifficulty} />
        </div>

        <Link href="/world-cups/archivo" onClick={() => trackModeEntered("worldcup-archive", "world-cups", { source: "home" })}
          className="rounded-2xl px-4 py-4 flex items-center justify-between gap-4 overflow-hidden relative"
          style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white", boxShadow: "0 8px 20px rgba(23,78,166,0.16)" }}>
          <div className="relative z-10">
            <div className="text-[8px] uppercase font-semibold tracking-[0.2em] text-white/65">Archivo Mundial diario</div>
            <div className="font-bebas text-[32px] leading-none mt-1">UN RECUERDO CADA DÍA</div>
            <div className="text-[11px] text-white/75 mt-1">Campeones, caminos al título y finales que rotan a diario.</div>
          </div>
          <span className="relative z-10 rounded-full px-3 py-2 text-[10px] font-semibold whitespace-nowrap" style={{ background: "#f8c647", color: "#18181b" }}>Jugar →</span>
          <div className="absolute right-12 -top-8 hidden sm:block font-bebas text-[92px] leading-none text-white/5">COPA</div>
        </Link>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
          <Link href="/liga-bbva" onClick={() => trackSeasonEntered("bbva", { source: "home_season_choice" })} className="rounded-2xl px-4 py-3 flex items-center justify-between gap-4 overflow-hidden relative" style={{ background: "linear-gradient(135deg,#fff8e6,#ffffff)", color: "#18181b", border: "1px solid rgba(200,146,10,0.24)" }}>
            <div className="relative z-10">
              <div className="text-[8px] uppercase font-semibold tracking-[0.2em]" style={{ color: "#c8920a" }}>Temporada principal</div>
              <div className="font-bebas text-[28px] leading-none mt-1">LIGA BBVA</div>
              <div className="text-[10px] mt-1" style={{ color: "#6b6b72" }}>Wordle, trayectorias, Top10 y duelos de 2005-2016.</div>
            </div>
            <div className="relative z-10 rounded-full px-3 py-2 text-[10px] font-semibold whitespace-nowrap" style={{ background: "#18181b", color: "white" }}>Entrar →</div>
          </Link>
          <Link href="/world-cups" onClick={() => trackSeasonEntered("world-cups", { source: "home_season_choice" })} className="rounded-2xl px-4 py-3 flex items-center justify-between gap-4 overflow-hidden relative" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white", boxShadow: "0 6px 18px rgba(23,78,166,0.14)" }}>
            <div className="relative z-10">
              <div className="text-[8px] uppercase font-semibold tracking-[0.2em] text-white/65">Temporada Mundiales</div>
              <div className="font-bebas text-[28px] leading-none mt-1">RETOS MUNDIALISTAS</div>
              <div className="text-[10px] text-white/75 mt-1">Mundialdle, Wordle, Top10, campeones y finales.</div>
            </div>
            <div className="relative z-10 rounded-full px-3 py-2 text-[10px] font-semibold whitespace-nowrap" style={{ background: "#f8c647", color: "#18181b" }}>Entrar →</div>
            <div className="absolute right-10 -top-8 hidden sm:block font-bebas text-[92px] leading-none text-white/5">COPA</div>
          </Link>
        </section>

        <Link href="/progreso" className="rounded-xl px-3 py-2 flex items-center justify-between gap-3" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="flex items-center gap-3 text-[10px] font-semibold"><span style={{ color: "#c8920a" }}>BBVA {albumProgress.unlockedCount}/{albumProgress.total}</span><span style={{ color: "#174ea6" }}>Mundiales {worldCupProgress.unlocked}/{worldCupPlayers.length}</span></div>
          <div className="text-[9px] truncate" style={{ color: "#9a9a8a" }}>{worldCupProgress.latest ? `Ultimo: ${worldCupProgress.latest}` : "Ver progreso"}</div>
        </Link>

        <MobileAdBanner slot={0} />

        <section className="rounded-2xl px-3 py-2.5 md:px-4 md:py-4"
          style={{ background: "rgba(255,255,255,0.70)", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="flex items-end justify-between gap-2 mb-2.5">
            <div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Más nostalgia</div>
              <h3 className="font-bebas text-[21px] leading-none" style={{ color: "#18181b" }}>EXTRAS</h3>
            </div>
            <div className="text-[9px] font-semibold" style={{ color: "#9a9a8a" }}>Retos extra</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <FeaturedDuelCard onClick={() => openMode("duelo", "duelo-nostalgia")} />
            <QuickGameCard title="STATDLE BBVA" subtitle="Adivina por estadísticas de temporada." emoji="📊" accent="#18181b" onClick={() => openMode("statdle", "statdle-bbva")} />
            <QuickGameCard title="¿JUGÓ AQUÍ?" subtitle="Jugador y club. ¿Verdad o trampa?" emoji="✅" accent="#1e6b2e" onClick={() => openMode("jugoAqui", "jugo-aqui")} />
            <QuickGameCard title="FICHAJE O INVENTO" subtitle="Operaciones raras de la era BBVA." emoji="📝" accent="#c8920a" onClick={() => openMode("fichaje", "fichaje-invento")} />
          </div>
        </section>

        <MobileAdBanner slot={1} />

      </main>
    </div>
  );
}
