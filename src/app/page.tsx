"use client";
import { useState, useEffect } from "react";
import WordleBBVA from "@/components/WordleBBVA";
import TrayectoriaBBVA from "@/components/TrayectoriaBBVA";
import Top10BBVA from "@/components/Top10BBVA";
import AdivinaElCrack from "@/components/AdivinaElCrack";
import PromoBanner, { SidebarAds } from "@/components/PromoBanner";
import { getDayNumber, getDayKey } from "@/lib/daily";
import { useStats } from "@/lib/useStats";

type View = "home" | "wordle" | "trayectoria" | "top10" | "crack";

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
  }, []);

  return { wordleDone, wordleWon, extras, trayDone, trayWon, top10Done, top10Won, crackDone, crackWon };
}

/* ─── Header ─── */
function Header({ onLogoClick }: { onLogoClick: () => void }) {
  const { stats } = useStats();
  const phrase = BBVA_PHRASES[getDayNumber() % BBVA_PHRASES.length];

  return (
    <header className="sticky top-0 z-20" style={{ background: "white", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
        <button onClick={onLogoClick} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bebas text-[16px]"
            style={{ background: "#c0241c", color: "white" }}>F</div>
          <span className="font-bebas text-[20px] leading-none tracking-wider" style={{ color: "#18181b" }}>FUTBOLDLE</span>
        </button>

        {/* Frase nostalgia — centro, solo desktop */}
        <div className="hidden md:block text-[10px] italic font-medium truncate" style={{ color: "#9a9a8a" }}>
          &ldquo;{phrase}&rdquo;
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Racha si existe */}
          {stats.streak > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
              style={{ background: "#fff8e6", border: "1px solid rgba(200,146,10,0.25)" }}>
              <span className="text-[11px]">🔥</span>
              <span className="font-bebas text-[14px] leading-none" style={{ color: "#c8920a" }}>{stats.streak}</span>
            </div>
          )}
          {/* Día */}
          <div className="text-[9px] font-semibold px-2 py-1 rounded-lg"
            style={{ background: "rgba(0,0,0,0.04)", color: "#9a9a8a" }}>
            Día #{getDayNumber()}
          </div>
          {/* Social */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors" style={{ color: "#555" }}>
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
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
function WordleCard({ onClick, done, won, extras }: { onClick: () => void; done: boolean; won: boolean; extras: number }) {
  // Mini wordle board: 3 rows x 6 cols
  const board = [
    [{l:"F",s:"ok"},{l:"A",s:"no"},{l:"L",s:"amb"},{l:"C",s:"no"},{l:"A",s:"no"},{l:"O",s:"ok"}],
    [{l:"V",s:"ok"},{l:"I",s:"no"},{l:"L",s:"ok"},{l:"L",s:"no"},{l:"A",s:"ok"},{l:"",s:"empty"}],
  ];
  return (
    <button onClick={onClick}
      className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
      style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.09)", border: "1px solid rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>

      {/* Header dorado */}
      <div className="px-4 py-3 relative overflow-hidden flex-shrink-0"
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
        <h3 className="font-bebas text-[28px] leading-none text-white">WORDLE BBVA</h3>
        <p className="text-white/70 text-[10px] mt-0.5">Adivina el apellido del Hombre BBVA</p>
      </div>

      <div className="px-4 pt-3 pb-4 flex flex-col flex-1 justify-between">
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
      </div>
    </button>
  );
}

/* ─── TRAYECTORIA card ─── */
function TrayCard({ onClick, done, won }: { onClick: () => void; done: boolean; won: boolean }) {
  return (
    <button onClick={onClick}
      className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
      style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.09)", border: "1px solid rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>

      <div className="px-4 py-3 flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #1e6b2e 0%, #28883c 100%)" }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>🆕 Hoy</span>
          <GamePill done={done} won={won} />
        </div>
        <h3 className="font-bebas text-[28px] leading-none text-white">TRAYECTORIA BBVA</h3>
        <p className="text-white/70 text-[10px] mt-0.5">Adivina por su carrera</p>
      </div>

      {/* Preview: deduction clues — no placeholders */}
      <div className="px-4 pt-3 pb-4 flex flex-col flex-1 justify-between">
        <div className="mb-2">
          <div className="text-[7px] font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#bbb" }}>
            Deduce la trayectoria
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { label: "Club inicial",  value: "Se revela al empezar",  shown: false },
              { label: "Club final",    value: "Falla para revelar",    shown: false },
              { label: "Posición",      value: "Falla para revelar",    shown: false },
            ].map(({label, value}, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold"
                  style={{ background: i===0?"#1e6b2e":"#ece8e0", color: i===0?"white":"#bbb" }}>
                  {i+1}
                </div>
                <div className="flex-1 px-2 py-1.5 rounded-lg text-[9px] font-semibold"
                  style={{ background: i===0?"#f0faf2":"#f6f3ee",
                    border:`1px solid ${i===0?"rgba(30,107,46,0.18)":"rgba(0,0,0,0.06)"}`,
                    color: i===0?"#1e6b2e":"#bbb" }}>
                  {i===0 ? "Primer club visible desde el inicio" : label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#1e6b2e" }}>
          {done ? "Ver resultado →" : "JUGAR →"}
        </div>
      </div>
    </button>
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
        <div className="text-[8px] mt-1 font-semibold uppercase tracking-wider" style={{ color: "#ccc" }}>En desarrollo</div>
      </div>
    </div>
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
function DailyProgress({ wordleDone, wordleWon, trayDone, trayWon, top10Done, top10Won, crackDone, crackWon, streak }: {
  wordleDone: boolean; wordleWon: boolean; trayDone: boolean; trayWon: boolean; top10Done: boolean; top10Won: boolean; crackDone: boolean; crackWon: boolean; streak: number;
}) {
  const total = 4;
  const completed = (wordleDone&&wordleWon?1:0)+(trayDone&&trayWon?1:0)+(top10Done&&top10Won?1:0)+(crackDone&&crackWon?1:0);
  const failed = (wordleDone&&!wordleWon?1:0)+(trayDone&&!trayWon?1:0)+(top10Done&&!top10Won?1:0)+(crackDone&&!crackWon?1:0);
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
              {crackDone?(crackWon?"✅":"❌"):"⬜"} Crack
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
export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const { wordleDone, wordleWon, extras, trayDone, trayWon, top10Done, top10Won, crackDone, crackWon } = useDailyStatus();
  const { stats } = useStats();
  const n = getDayNumber() % BBVA_PHRASES.length;
  const goHome = () => setView("home");

  if (view === "top10") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-4 py-5">
        <Top10BBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "crack") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-4 py-5">
        <AdivinaElCrack onBack={goHome} />
      </main>
    </div>
  );

  if (view === "wordle") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-4 py-5">
        <WordleBBVA onBack={goHome} />
      </main>
    </div>
  );

  if (view === "trayectoria") return (
    <div className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <Header onLogoClick={goHome} />
      <main className="max-w-lg mx-auto px-4 py-5">
        <TrayectoriaBBVA onBack={goHome} />
      </main>
    </div>
  );

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <Header onLogoClick={goHome} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-5 flex flex-col gap-4">

        {/* Row 0: fecha + hoy se juega + racha */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          <div className="flex-shrink-0">
            <h2 className="font-bebas text-[24px] leading-none" style={{ color: "#18181b" }}>HOY SE JUEGA</h2>
            <p className="text-[9px]" style={{ color: "#9a9a8a" }}>
              {new Date().toLocaleDateString("es-ES", { weekday:"long", day:"numeric", month:"long" })} · Día #{getDayNumber()}
            </p>
          </div>
          <div className="sm:ml-3 flex-1">
            <TodayStrip wordleDone={wordleDone} trayDone={trayDone} onWordle={()=>setView("wordle")} onTray={()=>setView("trayectoria")}/>
          </div>
          {stats.played > 0 && (
            <div className="flex-shrink-0 text-[10px]" style={{ color: "#9a9a8a" }}>
              {stats.played} jugados · {Math.round((stats.won/stats.played)*100)}% victorias
            </div>
          )}
        </div>

        {/* Barra de progreso diaria */}
        <DailyProgress wordleDone={wordleDone} wordleWon={wordleWon} trayDone={trayDone} trayWon={trayWon} top10Done={top10Done} top10Won={top10Won} crackDone={crackDone} crackWon={crackWon} streak={stats.streak} />

        {/* Frase nostalgia */}
        <div className="text-[11px] italic text-center py-1" style={{ color: "#9a9a8a" }}>
          &ldquo;{BBVA_PHRASES[n]}&rdquo; · Liga BBVA Archive 2005–2016
        </div>

        {/* ── FILA 1: Wordle + Trayectoria (igual importancia) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <WordleCard onClick={() => setView("wordle")} done={wordleDone} won={wordleWon} extras={extras} />
          <TrayCard onClick={() => setView("trayectoria")} done={trayDone} won={trayWon} />
        </div>

        {/* ── FILA 2: Top 10 + Adivina el Crack ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* TOP 10 BBVA */}
          <button onClick={() => setView("top10")}
            className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
            style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "1px solid rgba(26,79,160,0.20)", display: "flex", flexDirection: "column" }}>
            <div className="h-[3px]" style={{ background: "#1a4fa0" }}/>
            <div className="px-4 py-4 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="text-[30px] leading-none">🏆</div>
                <div className="flex items-center gap-1">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(26,79,160,0.10)", color: "#1a4fa0" }}>Hoy</div>
                  <GamePill done={top10Done} won={top10Won} />
                </div>
              </div>
              <PodiumDeco />
              <div className="font-bebas text-[18px] leading-none mt-2 mb-0.5" style={{ color: "#18181b" }}>TOP 10 BBVA</div>
              <div className="text-[10px] leading-snug flex-1" style={{ color: "#9a9a8a" }}>Completa las listas históricas</div>
              <div className="mt-2 font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#1a4fa0" }}>{top10Done ? "VER RESULTADO →" : "JUGAR →"}</div>
            </div>
          </button>
          {/* ADIVINA EL CRACK */}
          <button onClick={() => setView("crack")}
            className="w-full h-full text-left rounded-2xl overflow-hidden game-card"
            style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "1px solid rgba(124,58,237,0.20)", display: "flex", flexDirection: "column" }}>
            <div className="h-[3px]" style={{ background: "#7c3aed" }}/>
            <div className="px-4 py-4 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="text-[30px] leading-none">🌍</div>
                <div className="flex items-center gap-1">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(124,58,237,0.10)", color: "#7c3aed" }}>Hoy</div>
                  <GamePill done={crackDone} won={crackWon} />
                </div>
              </div>
              <AttrDeco />
              <div className="font-bebas text-[18px] leading-none mt-2 mb-0.5" style={{ color: "#18181b" }}>ADIVINA EL CRACK</div>
              <div className="text-[10px] leading-snug flex-1" style={{ color: "#9a9a8a" }}>Pistas progresivas para adivinar</div>
              <div className="mt-2 font-oswald font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#7c3aed" }}>{crackDone ? "VER RESULTADO →" : "JUGAR →"}</div>
            </div>
          </button>
        </div>

        {/* Ads + footer */}
        <PromoBanner />

        <div className="text-center py-2">
          <p className="text-[9px]" style={{ color: "#ccc" }}>Futboldle · Liga BBVA Archive · No afiliado a LaLiga</p>
        </div>

      </main>
    </div>
  );
}
