"use client";
import { useState, useEffect, useCallback } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDailyTop10 } from "@/data/top10Challenges";
import type { Top10Answer } from "@/data/top10Challenges";
import { getDayKey, getDayNumber } from "@/lib/daily";

function norm(s: string) {
  return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/g, "");
}

const TOP10_ALIASES: Record<string, string[]> = {
  NAVAS: ["NAVAS"],
  JOAQUIN: ["JOAQUIN", "JOAQUÍN"],
  VALERON: ["VALERON", "VALERÓN"],
  PAREJO: ["PAREJO"],
  CAZORLA: ["CAZORLA"],
  JUANFRAN: ["JUANFRAN"],
};

function answerAliases(answer: string) {
  const normalized = norm(answer);
  return TOP10_ALIASES[normalized] ?? [normalized];
}

function matchesAnswer(q: string, item: Top10Answer) {
  const nq = norm(q);
  return norm(item.answer).includes(nq) ||
    norm(item.displayName).includes(nq) ||
    answerAliases(item.answer).some(alias => alias.includes(nq));
}

function suggestPlayers(q: string, allGuesses: string[], answers: Top10Answer[]) {
  if (q.trim().length < 2) return [];
  const nq = norm(q);
  const seen = new Set<string>();
  const challengeSuggestions = answers
    .filter(a => !allGuesses.includes(norm(a.answer)) && matchesAnswer(q, a))
    .map(a => {
      seen.add(norm(a.answer));
      return { displayName: a.displayName, answer: a.answer };
    });

  const playerSuggestions = bbvaPlayers
    .filter(p => {
      const a = norm(p.answer);
      if (allGuesses.includes(a)) return false;
      if (seen.has(a)) return false;
      seen.add(a);
      return norm(p.displayName).includes(nq) || a.includes(nq) || norm(p.fullName).includes(nq);
    })
    .map(p => ({ displayName: p.displayName, answer: p.answer }));

  return [...challengeSuggestions, ...playerSuggestions].slice(0, 6);
}

interface SavedTop10 { date: string; challengeId: string; guessedAnswers: string[]; allGuesses: string[]; finished: boolean; surrendered: boolean; hintsUsed: number; }
const STORE = () => `fbl-top10-${getDayKey()}`;

function loadSaved(id: string): SavedTop10 | null {
  try {
    const raw = localStorage.getItem(STORE());
    if (!raw) return null;
    const d: SavedTop10 = JSON.parse(raw);
    if (d.date !== getDayKey() || d.challengeId !== id) return null;
    return d;
  } catch { return null; }
}

function persist(state: Omit<SavedTop10, "date">) {
  try { localStorage.setItem(STORE(), JSON.stringify({ ...state, date: getDayKey() })); } catch {}
}

export default function Top10BBVA({ onBack }: { onBack: () => void }) {
  const challenge = getDailyTop10();

  const [guessedAnswers, setGuessedAnswers] = useState<string[]>([]);
  const [allGuesses,     setAllGuesses]     = useState<string[]>([]);
  const [hintsUsed,      setHintsUsed]      = useState(0);
  const [finished,       setFinished]       = useState(false);
  const [surrendered,    setSurrendered]    = useState(false);
  const [wrongFlash,     setWrongFlash]     = useState("");
  const [query,          setQuery]          = useState("");
  const [suggestions,    setSuggestions]    = useState<{displayName:string;answer:string}[]>([]);
  const [copied,         setCopied]         = useState(false);
  const [loaded,         setLoaded]         = useState(false);

  useEffect(() => {
    const saved = loadSaved(challenge.id);
    if (saved) {
      setGuessedAnswers(saved.guessedAnswers);
      setAllGuesses(saved.allGuesses);
      setFinished(saved.finished);
      setSurrendered(saved.surrendered);
      setHintsUsed(saved.hintsUsed);
    }
    setLoaded(true);
  }, [challenge.id]);

  useEffect(() => { setSuggestions(suggestPlayers(query, allGuesses, challenge.answers)); }, [query, allGuesses, challenge.answers]);

  const handleGuess = useCallback((displayName: string, answer: string) => {
    setQuery(""); setSuggestions([]);
    const normAnswer = norm(answer);
    const newAll = [...allGuesses, normAnswer];
    setAllGuesses(newAll);
    const hit = challenge.answers.find(a => norm(a.answer) === normAnswer);
    if (hit && !guessedAnswers.includes(norm(hit.answer))) {
      const newGuessed = [...guessedAnswers, norm(hit.answer)];
      setGuessedAnswers(newGuessed);
      const done = newGuessed.length === challenge.answers.length;
      if (done) {
        setFinished(true);
        try { localStorage.setItem(STORE().replace("top10","top10"), ""); } catch {} // handled in persist
      }
      persist({ challengeId: challenge.id, guessedAnswers: newGuessed, allGuesses: newAll, finished: done, surrendered: false, hintsUsed });
    } else {
      setWrongFlash(displayName);
      setTimeout(() => setWrongFlash(""), 1400);
      persist({ challengeId: challenge.id, guessedAnswers, allGuesses: newAll, finished: false, surrendered: false, hintsUsed });
    }
  }, [allGuesses, guessedAnswers, challenge, hintsUsed]);

  function submitQuery() {
    if (suggestions.length > 0) {
      handleGuess(suggestions[0].displayName, suggestions[0].answer);
      return;
    }

    const exactAlias = challenge.answers.find(item =>
      !guessedAnswers.includes(norm(item.answer)) &&
      answerAliases(item.answer).some(alias => alias === norm(query))
    );
    if (exactAlias) handleGuess(exactAlias.displayName, exactAlias.answer);
  }

  function handleHint() {
    const newHints = hintsUsed + 1;
    setHintsUsed(newHints);
    persist({ challengeId: challenge.id, guessedAnswers, allGuesses, finished, surrendered, hintsUsed: newHints });
  }

  function handleSurrender() {
    setSurrendered(true);
    setFinished(true);
    try { localStorage.setItem(`fbl-top10-done-${getDayKey()}`, "lost"); } catch {}
    persist({ challengeId: challenge.id, guessedAnswers, allGuesses, finished: true, surrendered: true, hintsUsed });
  }

  // Save completion flag when finished naturally
  useEffect(() => {
    if (finished && !surrendered) {
      try { localStorage.setItem(`fbl-top10-done-${getDayKey()}`, "won"); } catch {}
    }
  }, [finished, surrendered]);

  const wrongCount = allGuesses.length - guessedAnswers.length;
  const pct = Math.round((guessedAnswers.length / challenge.answers.length) * 100);
  const done = finished;

  // Which hints are visible for "current unsolved item"
  // Find first unsolved item and show hints for it
  const unsolvedItem = challenge.answers.find(a => !guessedAnswers.includes(norm(a.answer)));
  const hintLabels = ["Nacionalidad", "Posición", "Club principal", "Inicial"];
  const hintValues = unsolvedItem ? [
    unsolvedItem.hintNationality ?? "—",
    unsolvedItem.hintPosition ?? "—",
    unsolvedItem.hintClub ?? "—",
    unsolvedItem.hintInitial ?? "—",
  ] : [];

  async function share() {
    const score = surrendered ? `X/${challenge.answers.length}` : `${guessedAnswers.length}/${challenge.answers.length}`;
    const grid = challenge.answers.map(a => guessedAnswers.includes(norm(a.answer)) ? "🟦" : "⬛").join("");
    const txt = `Futboldle TOP 10 #${getDayNumber()}\n${challenge.title}\n${score}\n\n${grid}\n\nhttps://futboldle.es`;
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { alert(txt); }
  }

  if (!loaded) return (
    <div className="flex items-center justify-center py-16">
      <div className="font-bebas text-[20px] anim-pulse" style={{ color: "#1a4fa0" }}>CARGANDO...</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 pb-10">
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-[11px] font-semibold opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#3a3a3f" }}>
        ← Volver
      </button>

      {/* Header */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1a3a80 0%,#2260c8 100%)", boxShadow: "0 4px 20px rgba(26,79,160,0.30)" }}>
        <div className="px-5 py-4">
          <div className="inline-block text-[9px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-2.5"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            {challenge.emoji} Reto del día · #{getDayNumber()}
          </div>
          <h2 className="font-bebas text-[28px] leading-none text-white mb-1">{challenge.title.toUpperCase()}</h2>
          <p className="text-white/70 text-[11px] mb-1">{challenge.subtitle}</p>
          <p className="text-white/90 text-[12px] font-semibold">{challenge.consigna}</p>
        </div>
        <div className="px-5 pb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/60 text-[10px] font-semibold">{guessedAnswers.length}/{challenge.answers.length} encontrados</span>
            <span className="text-white/60 text-[10px]">{pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: done ? "#4ade80" : "white" }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-[10px]" style={{ color: "#9a9a8a" }}>
        <span>✅ <strong style={{ color: "#1a4fa0" }}>{guessedAnswers.length}</strong> acertados</span>
        <span>·</span>
        <span>❌ <strong style={{ color: "#9a9a8a" }}>{wrongCount}</strong> fallados</span>
        <span>·</span>
        <span>🔍 <strong style={{ color: "#18181b" }}>{challenge.answers.length - guessedAnswers.length}</strong> restantes</span>
      </div>

      {/* Ranking */}
      <div className="flex flex-col gap-1">
        {challenge.answers.map(item => {
          const found = guessedAnswers.includes(norm(item.answer));
          const revealed = done;
          return (
            <div key={item.position}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200"
              style={{ background: found ? "#eff4ff" : (revealed && surrendered) ? "#fff5f5" : "white",
                border: `1px solid ${found ? "rgba(26,79,160,0.22)" : (revealed && surrendered) ? "rgba(184,28,20,0.15)" : "rgba(0,0,0,0.08)"}`,
                boxShadow: found ? "0 1px 6px rgba(26,79,160,0.08)" : "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-bebas text-[14px]"
                style={{ background: found ? "#1a4fa0" : "#f0ede6", color: found ? "white" : "#bbb",
                  boxShadow: found ? "0 2px 6px rgba(26,79,160,0.30)" : "none" }}>
                {item.position}
              </div>
              <div className="flex-1 min-w-0">
                {found || (revealed && surrendered) ? (
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-oswald font-semibold text-[13px] leading-none" style={{ color: found ? "#18181b" : "#b81c14" }}>
                        {item.displayName}
                      </div>
                      <div className="text-[9px] mt-0.5" style={{ color: "#9a9a8a" }}>{item.detail}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[44, 28].map((w, j) => <div key={j} className="h-2 rounded-full" style={{ width: w, background: "#e8e4dc" }} />)}
                    </div>
                    {item.detail && <div className="text-[10px] font-semibold" style={{ color: "#6b6b72" }}>{item.detail}</div>}
                  </div>
                )}
              </div>
              {found && <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0" style={{ background: "#1a4fa0" }}>✓</div>}
            </div>
          );
        })}
      </div>

      {/* Hint system */}
      {!done && unsolvedItem && hintsUsed > 0 && (
        <div className="rounded-xl p-3.5" style={{ background: "#fffbf0", border: "1px solid rgba(200,146,10,0.25)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "#c8920a" }}>
            Pistas del jugador oculto
          </div>
          <div className="flex flex-col gap-1">
            {hintLabels.slice(0, hintsUsed).map((lbl, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] w-24 flex-shrink-0" style={{ color: "#c8920a" }}>{lbl}</span>
                <span className="font-oswald font-semibold text-[12px]" style={{ color: "#18181b" }}>{hintValues[i]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wrong flash */}
      {wrongFlash && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 anim-pop px-5 py-2.5 rounded-xl text-[12px] font-semibold"
          style={{ background: "#fff5f5", border: "1px solid rgba(184,28,20,0.25)", color: "#b81c14", boxShadow: "0 4px 16px rgba(0,0,0,0.10)", whiteSpace: "nowrap" }}>
          ✗ {wrongFlash} — no está en esta lista
        </div>
      )}

      {/* Input + buttons */}
      {!done && (
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") submitQuery(); }}
              placeholder="Escribe el nombre del jugador..."
              className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
              style={{ background: "white", border: "2px solid rgba(0,0,0,0.12)", color: "#18181b" }}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#1a4fa0"; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
              autoComplete="off" spellCheck={false} />
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden max-h-64 overflow-y-auto"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                {suggestions.map((s, i) => (
                  <button key={i} onMouseDown={() => handleGuess(s.displayName, s.answer)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left border-b last:border-0 transition-colors"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#eff4ff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}>
                    <span className="font-oswald font-semibold text-[13px]" style={{ color: "#18181b" }}>{s.displayName}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(26,79,160,0.08)", color: "#1a4fa0" }}>↵</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hint + Surrender */}
          <div className="flex gap-2">
            {hintsUsed < 4 && unsolvedItem && (
              <button onClick={handleHint}
                className="flex-1 font-oswald font-semibold uppercase tracking-wider text-[10px] py-2.5 rounded-xl transition-all"
                style={{ background: "#fffbf0", border: "1px solid rgba(200,146,10,0.30)", color: "#c8920a" }}>
                💡 Pista ({4 - hintsUsed} restantes)
              </button>
            )}
            <button onClick={() => { if (confirm("¿Rendirse y revelar las respuestas?")) handleSurrender(); }}
              className="flex-1 font-oswald font-semibold uppercase tracking-wider text-[10px] py-2.5 rounded-xl transition-all"
              style={{ background: "#fff5f5", border: "1px solid rgba(184,28,20,0.22)", color: "#b81c14" }}>
              🏳 Rendirse
            </button>
          </div>
        </div>
      )}

      {/* Final */}
      {done && (
        <div className="anim-in rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
          <div className="px-5 py-4" style={{ background: surrendered ? "linear-gradient(135deg,#b81c14,#d42018)" : "linear-gradient(135deg,#1a3a80,#2260c8)" }}>
            <div className="font-bebas text-[28px] leading-none text-white mb-0.5">{surrendered ? "RENDIDO" : "¡COMPLETADO!"}</div>
            <p className="text-white/70 text-[12px]">{surrendered ? "Has revelado todas las respuestas" : `${allGuesses.length} intentos · ${wrongCount} fallados`}</p>
          </div>
          <div className="p-4" style={{ background: "white" }}>
            <div className="flex gap-1 mb-4 flex-wrap">
              {challenge.answers.map(a => (
                <span key={a.position} className="text-[16px]">{guessedAnswers.includes(norm(a.answer)) ? "🟦" : "⬛"}</span>
              ))}
            </div>
            <button onClick={share} className="w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
              style={{ background: copied ? "#1e6b2e" : "#1a4fa0", color: "white" }}>
              {copied ? "✓ Copiado" : "Compartir resultado"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
