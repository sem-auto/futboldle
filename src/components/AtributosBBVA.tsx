"use client";
import { useState, useEffect, useCallback } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDayKey, getDayNumber } from "@/lib/daily";

const MAX = 8;
const DARK_RED = "#9b1c1c";
const RED2 = "#b91c1c";

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function getAttrPlayer() {
  const d = new Date();
  const seed = (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) * 23 + 19;
  const pool = bbvaPlayers.filter(p => p.category === "core");
  return pool[Math.abs(seed) % pool.length];
}

type Player = typeof bbvaPlayers[0];

function suggestPlayers(q: string, usedIds: number[]) {
  if (q.trim().length < 2) return [];
  const nq = norm(q);
  return bbvaPlayers
    .filter(p => !usedIds.includes(p.id) && (norm(p.displayName).includes(nq) || norm(p.fullName).includes(nq)))
    .slice(0, 6);
}

// Simple position grouping for partial match
function posGroup(pos: string) {
  if (pos === "Portero") return "Portero";
  if (pos === "Defensa") return "Defensa";
  if (pos === "Centrocampista") return "Centrocampista";
  return "Delantero";
}

type MatchState = "correct" | "partial" | "wrong";

interface AttrRow {
  player: Player;
  nationality: MatchState;
  position: MatchState;
  club: MatchState;     // mainClub
  years: MatchState;    // same era
  hint: "shown";
}

function compareAttr(guess: Player, target: Player): Omit<AttrRow, "hint"> {
  const nationality: MatchState =
    guess.nationality === target.nationality ? "correct" : "wrong";

  const position: MatchState =
    guess.position === target.position ? "correct" :
    posGroup(guess.position) === posGroup(target.position) ? "partial" : "wrong";

  const club: MatchState =
    guess.mainClub === target.mainClub ? "correct" :
    guess.clubs.some(c => target.clubs.includes(c)) ? "partial" : "wrong";

  const years: MatchState =
    guess.years === target.years ? "correct" :
    (() => {
      const parseStart = (y: string) => parseInt(y.split("-")[0]);
      const gS = parseStart(guess.years), tS = parseStart(target.years);
      return Math.abs(gS - tS) <= 3 ? "partial" : "wrong";
    })();

  return { player: guess, nationality, position, club, years };
}

interface SavedAttr {
  date: string;
  playerId: number;
  rows: Array<Omit<AttrRow,"hint"> & { won: boolean }>;
  gameOver: boolean;
  won: boolean;
}

const STORE = () => `fbl-attr-${getDayKey()}`;

function loadSaved(id: number): SavedAttr | null {
  try {
    const raw = localStorage.getItem(STORE());
    if (!raw) return null;
    const d: SavedAttr = JSON.parse(raw);
    if (d.date !== getDayKey() || d.playerId !== id) return null;
    return d;
  } catch { return null; }
}

function saveGame(state: Omit<SavedAttr, "date">) {
  try {
    localStorage.setItem(STORE(), JSON.stringify({ ...state, date: getDayKey() }));
    if (state.gameOver) {
      localStorage.setItem(`fbl-attr-done-${getDayKey()}`, state.won ? "won" : "lost");
    }
  } catch {}
}

const CELL_STYLE: Record<MatchState, { bg: string; border: string; color: string; icon: string }> = {
  correct: { bg: "#dcfce7", border: "rgba(22,163,74,0.40)", color: "#14532d", icon: "✅" },
  partial: { bg: "#fef9c3", border: "rgba(202,138,4,0.40)",  color: "#713f12", icon: "🟨" },
  wrong:   { bg: "#fee2e2", border: "rgba(239,68,68,0.35)",  color: "#7f1d1d", icon: "❌" },
};

const ATTR_LABELS = ["Nación","Posición","Club BBVA","Época"];

export default function AtributosBBVA({ onBack }: { onBack: () => void }) {
  const target = getAttrPlayer();

  const [rows,        setRows]        = useState<Array<Omit<AttrRow,"hint"> & {won:boolean}>>([]);
  const [usedIds,     setUsedIds]     = useState<number[]>([]);
  const [gameOver,    setGameOver]    = useState(false);
  const [won,         setWon]         = useState(false);
  const [showResult,  setShowResult]  = useState(false);
  const [query,       setQuery]       = useState("");
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [copied,      setCopied]      = useState(false);
  const [loaded,      setLoaded]      = useState(false);

  useEffect(() => {
    const saved = loadSaved(target.id);
    if (saved) {
      setRows(saved.rows);
      setUsedIds(saved.rows.map(r => r.player.id));
      setGameOver(saved.gameOver);
      setWon(saved.won);
      if (saved.gameOver) setShowResult(true);
    }
    setLoaded(true);
  }, [target.id]);

  useEffect(() => { setSuggestions(suggestPlayers(query, usedIds)); }, [query, usedIds]);

  const handleGuess = useCallback((p: Player) => {
    setQuery(""); setSuggestions([]);
    const attrs = compareAttr(p, target);
    const isWon = p.id === target.id;
    const newRows = [...rows, { ...attrs, won: isWon }];
    const isOver = isWon || newRows.length >= MAX;
    const newUsedIds = [...usedIds, p.id];
    setRows(newRows);
    setUsedIds(newUsedIds);
    if (isWon) setWon(true);
    if (isOver) setGameOver(true);
    saveGame({ playerId: target.id, rows: newRows, gameOver: isOver, won: isWon });
    if (isOver) setTimeout(() => setShowResult(true), 400);
  }, [rows, usedIds, target]);

  async function share() {
    const score = won ? `${rows.length}/${MAX}` : `X/${MAX}`;
    const grid = rows.map(r => {
      const icons = [CELL_STYLE[r.nationality].icon, CELL_STYLE[r.position].icon, CELL_STYLE[r.club].icon, CELL_STYLE[r.years].icon];
      return icons.join(" ");
    }).join("\n");
    const txt = `⚽ Futboldle\nAtributos BBVA #${getDayNumber()}\n${score}\n\n${grid}\n\nhttps://futboldle-liard.vercel.app`;
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { alert(txt); }
  }

  if (!loaded) return (
    <div className="flex items-center justify-center py-16">
      <div className="font-bebas text-[20px] anim-pulse" style={{ color: DARK_RED }}>CARGANDO...</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Back */}
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-[11px] font-semibold opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#3a3a3f" }}>
        ← Volver
      </button>

      {/* Header rojo oscuro */}
      <div className="rounded-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${DARK_RED} 0%, ${RED2} 100%)`, boxShadow: `0 4px 20px rgba(155,28,28,0.30)` }}>
        <div className="px-5 py-4">
          <div className="inline-block text-[9px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-2.5"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            Reto del día · #{getDayNumber()}
          </div>
          <h2 className="font-bebas text-[30px] leading-none text-white mb-1">ATRIBUTOS BBVA</h2>
          <p className="text-[11px] text-white/70">Compara atributos para adivinar el jugador · {MAX} intentos</p>
        </div>
        <div className="px-5 pb-3 flex items-center gap-1.5">
          {Array.from({ length: MAX }).map((_, i) => (
            <div key={i} className="flex-1 h-[5px] rounded-full transition-all"
              style={{ background: i < rows.length ? (rows[i]?.won ? "white" : "rgba(255,255,255,0.40)") : i === rows.length && !gameOver ? "white" : "rgba(255,255,255,0.15)" }} />
          ))}
          <span className="text-white/50 text-[9px] font-semibold ml-1">{gameOver ? "—" : `${MAX - rows.length} left`}</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-4 gap-1.5 px-1">
        {ATTR_LABELS.map(l => (
          <div key={l} className="text-center text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#9a9a8a" }}>{l}</div>
        ))}
      </div>

      {/* Guess rows */}
      {rows.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {rows.map((row, ri) => (
            <div key={ri}>
              {/* Player name */}
              <div className="text-[10px] font-semibold mb-1 px-1" style={{ color: row.won ? DARK_RED : "#9a9a8a" }}>
                {row.won ? "✓ " : ""}{row.player.displayName}
              </div>
              {/* Attribute cells */}
              <div className="grid grid-cols-4 gap-1.5">
                {(["nationality","position","club","years"] as const).map((attr, ci) => {
                  const state = row[attr];
                  const s = CELL_STYLE[state];
                  const values: Record<string,string> = {
                    nationality: row.player.nationality,
                    position:    row.player.position,
                    club:        row.player.mainClub,
                    years:       row.player.years,
                  };
                  return (
                    <div key={ci}
                      className="flex flex-col items-center justify-center rounded-lg px-1 py-2 text-center"
                      style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                      <div className="text-[11px] mb-0.5">{s.icon}</div>
                      <div className="text-[9px] font-semibold leading-tight" style={{ color: s.color }}>
                        {values[attr]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state hint */}
      {rows.length === 0 && (
        <div className="rounded-xl px-4 py-3 text-center" style={{ background: "#fef2f2", border: `1px solid rgba(155,28,28,0.15)` }}>
          <p className="text-[11px]" style={{ color: "#6b6b72" }}>
            Escribe un jugador y compara sus atributos con el objetivo.<br/>
            <span style={{ color: DARK_RED }}>✅ correcto · 🟨 relacionado · ❌ incorrecto</span>
          </p>
        </div>
      )}

      {/* Input */}
      {!gameOver && (
        <div className="relative">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#9a9a8a" }}>
            Intento {rows.length + 1} de {MAX}
          </div>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && suggestions.length > 0) handleGuess(suggestions[0]); }}
            placeholder="Escribe el nombre del jugador..."
            className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
            style={{ background: "white", border: "2px solid rgba(0,0,0,0.12)", color: "#18181b" }}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = DARK_RED; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
            autoComplete="off" spellCheck={false} />
          {suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
              {suggestions.map(p => (
                <button key={p.id} onMouseDown={() => handleGuess(p)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left border-b last:border-0 transition-colors"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fef2f2"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                  <div>
                    <div className="font-oswald font-semibold text-[13px]" style={{ color: "#18181b" }}>{p.displayName}</div>
                    <div className="text-[10px]" style={{ color: "#9a9a8a" }}>{p.mainClub} · {p.nationality}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="anim-in rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
          <div className="px-5 py-4" style={{ background: won ? `linear-gradient(135deg,${DARK_RED},${RED2})` : "linear-gradient(135deg,#374151,#4b5563)" }}>
            <div className="font-bebas text-[30px] leading-none text-white mb-0.5">{won ? "¡ADIVINADO!" : "ERA..."}</div>
            <p className="text-white/70 text-[12px]">{won ? `En ${rows.length}/${MAX} intentos` : "No has podido descubrirle"}</p>
          </div>
          <div className="p-4" style={{ background: "white" }}>
            <div className="font-bebas text-[24px] leading-none mb-0.5" style={{ color: "#18181b" }}>{target.displayName.toUpperCase()}</div>
            <div className="text-[11px] mb-3" style={{ color: "#9a9a8a" }}>{target.fullName} · {target.nationality} · {target.position}</div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {target.clubs.map((c, i) => (
                <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-lg"
                  style={{ background: "#fef2f2", border: `1px solid rgba(155,28,28,0.18)`, color: DARK_RED }}>{c}</span>
              ))}
            </div>
            <p className="text-[11px] italic mb-4" style={{ color: "#6b6b72" }}>"{target.hint}"</p>
            <button onClick={share} className="w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
              style={{ background: copied ? "#1e6b2e" : DARK_RED, color: "white" }}>
              {copied ? "✓ Copiado" : "Compartir resultado"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
