"use client";
import { useState, useEffect, useCallback } from "react";
import { BBVAPlayer, getPlayerOfDay, getExtraPlayer } from "@/data/bbvaPlayers";
import { normalize } from "@/lib/normalize";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { loadGameCounts, recordGameResult } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import { useStats } from "@/lib/useStats";
import { buildWordleShare, shareGameResult } from "@/lib/resultShare";
import { getCommunityDifficulty } from "@/lib/communityStats";

const MAX = 6;
const KB  = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L","Ñ"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

type LS = "correct"|"partial"|"wrong"|"empty"|"active";

interface Row { letters:string[]; states:LS[]; submitted:boolean; }
interface GameResult { letters:string[][]; states:LS[][]; won:boolean; }

/** What we persist per day */
interface DayState {
  date:    string;
  daily:   GameResult | null;
  extras:  GameResult[];          // index 0 = Extra #1
  current: { mode:"daily"|"extra"; extraIndex:number } | null;
}

function emptyRow(n:number):Row { return {letters:Array(n).fill(""),states:Array(n).fill("empty"),submitted:false}; }

function emptyDayState(): DayState {
  return {date:getDayKey(),daily:null,extras:[],current:null};
}

function evaluate(guess:string[],answer:string[]):LS[] {
  const r:LS[] = Array(answer.length).fill("wrong");
  const cnt:Record<string,number>={};
  answer.forEach(l=>{ cnt[l]=(cnt[l]||0)+1; });
  guess.forEach((l,i)=>{ if(l===answer[i]){r[i]="correct";cnt[l]--;} });
  guess.forEach((l,i)=>{ if(r[i]!=="correct"&&cnt[l]>0){r[i]="partial";cnt[l]--;} });
  return r;
}

function shareText(states:LS[][],won:boolean):string {
  const e=(s:LS)=>s==="correct"?"🟩":s==="partial"?"🟨":"⬛";
  return buildWordleShare(states.map(r=>r.map(e).join("")), states.length, won);
}

function keyState(key:string, rows:Row[]):"correct"|"partial"|"wrong"|"idle" {
  const p: Record<string,number>={correct:3,partial:2,wrong:1,idle:0,empty:0,active:0};
  let best:"correct"|"partial"|"wrong"|"idle"="idle";
  for(const g of rows){
    if(!g.submitted) continue;
    g.letters.forEach((l,i)=>{
      if(l===key&&((p[g.states[i]] ?? 0)>(p[best] ?? 0))) best=g.states[i] as "correct"|"partial"|"wrong";
    });
  }
  return best;
}

function isValidResult(result: unknown): result is GameResult {
  if (!result || typeof result !== "object") return false;
  const r = result as Partial<GameResult>;
  return Array.isArray(r.letters) &&
    Array.isArray(r.states) &&
    typeof r.won === "boolean" &&
    r.letters.every(row => Array.isArray(row)) &&
    r.states.every(row => Array.isArray(row));
}

function sanitizeDayState(value: unknown): DayState | null {
  if (!value || typeof value !== "object") return null;
  const d = value as Partial<DayState>;
  if (d.date !== getDayKey()) return null;
  return {
    date: d.date,
    daily: isValidResult(d.daily) ? d.daily : null,
    extras: Array.isArray(d.extras) ? d.extras.filter(isValidResult) : [],
    current: null,
  };
}

function loadDayState():DayState {
  try {
    const raw=localStorage.getItem(`fbl-day-${getDayKey()}`);
    if(raw){
      const parsed = JSON.parse(raw);
      const safe = sanitizeDayState(parsed);
      if (safe) return safe;
      localStorage.removeItem(`fbl-day-${getDayKey()}`);
    }
  } catch{
    try { localStorage.removeItem(`fbl-day-${getDayKey()}`); } catch {}
  }
  return emptyDayState();
}

function saveDayState(ds:DayState){ try{ localStorage.setItem(`fbl-day-${getDayKey()}`,JSON.stringify(ds)); }catch{} }

function rowsFromResult(result:GameResult, ansLen:number):Row[] {
  const rows = Array.from({length:MAX},()=>emptyRow(ansLen));
  result.letters.slice(0, MAX).forEach((letters,i)=>{
    rows[i]={
      letters: Array.isArray(letters) ? letters.slice(0, ansLen) : Array(ansLen).fill(""),
      states: Array.isArray(result.states[i]) ? result.states[i].slice(0, ansLen) : Array(ansLen).fill("wrong"),
      submitted:true
    };
  });
  return rows;
}

interface Props { onBack:()=>void; }

export default function WordleBBVA({onBack}:Props) {
  // Current game context
  const [mode,      setMode]      = useState<"daily"|"extra">("daily");
  const [extraIdx,  setExtraIdx]  = useState(0);   // 1-based when mode=extra
  const [player,    setPlayer]    = useState<BBVAPlayer>(()=>getPlayerOfDay());
  const [answer,    setAnswer]    = useState<string[]>([]);
  const [rows,      setRows]      = useState<Row[]>([]);
  const [curRow,    setCurRow]    = useState(0);
  const [gameOver,  setGameOver]  = useState(false);
  const [won,       setWon]       = useState(false);
  const [showHint,  setShowHint]  = useState(false);
  const [showResult,setShowResult]= useState(false);
  const [revealed,  setRevealed]  = useState<boolean[]>(Array(MAX).fill(false));
  const [shakeRow,  setShakeRow]  = useState<number|null>(null);
  const [toast,     setToast]     = useState<string|null>(null);
  const [copied,    setCopied]    = useState(false);
  const [dayState,  setDayState]  = useState<DayState|null>(null);
  const [loaded,    setLoaded]    = useState(false);
  const [compactMobile, setCompactMobile] = useState(false);
  const [wordlesCompleted, setWordlesCompleted] = useState(0);
  const { stats, refresh } = useStats();

  useEffect(() => {
    setWordlesCompleted(loadGameCounts().wordle);
  }, [showResult]);

  function flash(msg:string){ setToast(msg); setTimeout(()=>setToast(null),1800); }

  // ── Bootstrap ──
  function startGame(p:BBVAPlayer, existingResult?:GameResult|null) {
    const ans = normalize(p.answer).split("");
    setPlayer(p); setAnswer(ans);
    const rev = Array(MAX).fill(false);
    if(existingResult) {
      const r = rowsFromResult(existingResult, ans.length);
      setRows(r); setCurRow(existingResult.letters.length);
      const w=existingResult.won; const over=true;
      setWon(w); setGameOver(over);
      existingResult.letters.forEach((_,i)=>{ rev[i]=true; });
      setRevealed(rev);
      setShowHint(true);
      setTimeout(()=>setShowResult(true),300);
    } else {
      setRows(Array.from({length:MAX},()=>emptyRow(ans.length)));
      setCurRow(0); setGameOver(false); setWon(false);
      setShowHint(false);
      setShowResult(false);
      setRevealed(Array(MAX).fill(false));
    }
  }

  useEffect(()=>{
    const ds = loadDayState();
    setDayState(ds);
    const dailyPlayer = getPlayerOfDay();
    setMode("daily");
    setExtraIdx(0);
    startGame(dailyPlayer, ds.daily);
    trackEvent("game_started", { game: "wordle", mode: "daily" });
    setLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // ── Submit ──
  const submit = useCallback(()=>{
    if(!dayState) return;
    const row=rows[curRow];
    if(row.letters.join("").length!==answer.length){
      setShakeRow(curRow); setTimeout(()=>setShakeRow(null),450);
      flash(`${answer.length} letras`); return;
    }
    const states=evaluate(row.letters,answer);
    const newRows=rows.map((r,i)=>i===curRow?{...r,states,submitted:true}:r);
    setRows(newRows);

    // Reveal flip
    const flipDelay = answer.length*120+200;
    setTimeout(()=>setRevealed(prev=>{ const n=[...prev]; n[curRow]=true; return n; }),50);

    const w=states.every(s=>s==="correct");
    const next=curRow+1;
    const over=w||next>=MAX;
    setCurRow(next);
    if(next>=3&&!w) setShowHint(true);
    if(over){
      setWon(w); setGameOver(true);
      if (w) {
        unlockPlayer(player.id, "Wordle BBVA");
      }
      if (mode === "daily") {
        recordGameResult("wordle", getDayKey(), w);
        setWordlesCompleted(loadGameCounts().wordle);
        refresh();
      }
      trackEvent("game_completed", { game: "wordle", mode, won: w });
      const result:GameResult={
        letters: newRows.filter(r=>r.submitted).map(r=>r.letters),
        states:  newRows.filter(r=>r.submitted).map(r=>r.states),
        won: w,
      };
      const newDs:DayState = {...dayState};
      if(mode==="daily"){
        newDs.daily=result;
      } else {
        const exts=[...newDs.extras];
        exts[extraIdx-1]=result;
        newDs.extras=exts;
      }
      saveDayState(newDs);
      setDayState(newDs);
      setTimeout(()=>setShowResult(true),flipDelay);
    }
  },[rows,curRow,answer,dayState,mode,extraIdx,player.id,refresh]);

  // ── Key handler ──
  const handleKey=useCallback((key:string)=>{
    if(gameOver) return;
    if(key==="ENTER"){ submit(); return; }
    if(key==="⌫"||key==="BACKSPACE"){
      setRows(prev=>{
        const u=[...prev]; const r={...u[curRow],letters:[...u[curRow].letters]};
        const last=r.letters.map((l,i)=>l?i:-1).filter(i=>i>=0).pop();
        if(last!==undefined) r.letters[last]="";
        u[curRow]=r; return u;
      }); return;
    }
    const l=normalize(key);
    if(!l||l.length!==1) return;
    setRows(prev=>{
      const u=[...prev]; const r={...u[curRow],letters:[...u[curRow].letters]};
      const ei=r.letters.findIndex(x=>!x);
      if(ei===-1) return prev;
      r.letters[ei]=l; u[curRow]=r; return u;
    });
  },[gameOver,curRow,submit]);

  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{
      if(e.ctrlKey||e.metaKey||e.altKey) return;
      if(e.key==="Enter") handleKey("ENTER");
      else if(e.key==="Backspace") handleKey("⌫");
      else if(e.key.length===1) handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown",h);
    return ()=>window.removeEventListener("keydown",h);
  },[handleKey]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setCompactMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ── Play extra ──
  function playExtra(){
    if(!dayState) return;
    const newExtraIdx = dayState.extras.length+1;
    setMode("extra"); setExtraIdx(newExtraIdx);
    const p=getExtraPlayer(newExtraIdx);
    const existing=dayState.extras[newExtraIdx-1] ?? null;
    setShowResult(false);
    startGame(p, existing);
  }

  // ── Share ──
  async function handleShare(){
    const submitted=rows.filter(r=>r.submitted);
    const text=shareText(submitted.map(r=>r.states),won);
    shareGameResult(text, {
      modeId: "wordle-bbva",
      challengeId: mode === "daily" ? getDayKey() : `${getDayKey()}-extra-${extraIdx}`,
      seasonId: "bbva",
      won,
      attempts: submitted.length,
      title: "Wordle BBVA",
      onCopied: () => { setCopied(true); setTimeout(()=>setCopied(false),2500); },
    });
  }

  if(!loaded) return (
    <div className="flex items-center justify-center py-28">
      <span className="font-display text-4xl anim-pulse" style={{color:"var(--gold)"}}>FUTBOLDLE</span>
    </div>
  );

  const ansLen=answer.length;
  const tileW=compactMobile
    ? ansLen<=5?48:ansLen<=7?42:ansLen<=9?35:30
    : ansLen<=5?60:ansLen<=7?52:ansLen<=9?44:38;
  const tileFz=compactMobile
    ? ansLen<=5?21:ansLen<=7?18:ansLen<=9?16:14
    : ansLen<=5?26:ansLen<=7?22:ansLen<=9?19:16;

  const modeLabel = mode==="daily"
    ? `RETO DEL DÍA · #${getDayNumber()}`
    : `EXTRA #${extraIdx}`;
  const community = getCommunityDifficulty("wordle", `${getDayKey()}-${player.id}`);

  // Is daily already completed (loaded from storage)?
  const dailyDone = !!dayState?.daily;

  return (
    <div className="flex flex-col gap-3 md:gap-5 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-10 max-w-[100vw] overflow-x-hidden">

      {/* ── Back ── */}
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-xs md:text-sm font-semibold transition-opacity opacity-60 hover:opacity-100" style={{color:"#18181b"}}>
        ← Volver
      </button>

      {/* ── Header ── */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-1.5 md:mb-2 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full" style={{background:"var(--gold-dim)",border:"1px solid var(--b-gold)"}}>
          <span className="text-[10px] font-oswald font-semibold uppercase tracking-[0.22em]" style={{color:"var(--gold)"}}>{modeLabel}</span>
          {mode==="daily"&&dailyDone&&(
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{background:"var(--ok-bg)",color:"var(--ok-txt)",border:"1px solid var(--ok-bd)"}}>Completado ✅</span>
          )}
        </div>
        <h2 className="font-display text-[30px] md:text-4xl leading-none" style={{color:"#18181b"}}>WORDLE BBVA</h2>
        <p className="text-[11px] md:text-[12px] mt-1 md:mt-1.5" style={{color:"var(--txt3)"}}>Adivina el apellido · <span style={{color:"var(--gold)"}}>{ansLen} letras</span> · {MAX} intentos</p>
      </div>

      {/* ── Pre-game prompt ── */}
      <div className="rounded-xl px-3 md:px-4 py-2 md:py-3 text-center" style={{background:"white",border:"1px solid var(--b2)"}}>
        <p className="text-[13px]" style={{color:"var(--txt3)"}}>
          Adivina el apellido de un{" "}
          <span className="font-oswald font-semibold" style={{color:"var(--gold)"}}>Hombre BBVA</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 rounded-xl px-3 py-2" style={{ background: "white", border: "1px solid var(--b2)" }}>
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#bbb" }}>Dificultad</div>
          <div className="font-oswald font-semibold text-[12px]" style={{ color: "#18181b" }}>{community.label}</div>
        </div>
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#bbb" }}>Completan</div>
          <div className="font-oswald font-semibold text-[12px]" style={{ color: "#1e6b2e" }}>{community.completion}%</div>
        </div>
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#bbb" }}>Media</div>
          <div className="font-oswald font-semibold text-[12px]" style={{ color: "var(--gold)" }}>{community.attempts} intentos</div>
        </div>
      </div>

      {showHint && !gameOver && (
        <div className="rounded-xl px-4 py-3 anim-in" style={{ background: "white", border: "1px solid var(--b-gold)" }}>
          <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.22em] mb-1.5" style={{ color: "var(--gold)" }}>
            Pista
          </div>
          <p className="text-[13px] font-semibold mb-0.5" style={{ color: "#18181b" }}>
            {player.mainClub} · {player.position}
          </p>
          <p className="text-[12px] italic leading-relaxed" style={{ color: "var(--txt3)" }}>
            &ldquo;{player.hint}&rdquo;
          </p>
        </div>
      )}

      {/* ── Toast ── */}
      {toast&&(
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl text-sm font-semibold anim-pop"
          style={{background:"white",border:"1px solid var(--b3)",color:"#18181b",whiteSpace:"nowrap",boxShadow:"0 12px 40px rgba(0,0,0,0.7)"}}>
          {toast}
        </div>
      )}

      {/* ── GRID ── */}
      <div className="flex flex-col gap-1 md:gap-2 items-center max-w-full" style={{perspective:"400px"}}>
        {rows.map((row,ri)=>(
          <div key={ri} className={`flex gap-1 md:gap-2 ${shakeRow===ri?"anim-shake":""}`}>
            {Array.from({length:ansLen}).map((_,ci)=>{
              const letter=row.letters[ci]||"";
              const sub=row.submitted;
              const state=sub?row.states[ci]:letter?"active":"empty";
              const isRev=revealed[ri];

              // Static styles — EMPTY always pure white
              let bg="white", border="1px solid rgba(0,0,0,0.13)", color="#18181b";
              if(!sub){
                if(state==="active"){ border="2px solid rgba(0,0,0,0.35)"; }
                // state==="empty": white bg, thin border — no color
              } else if(isRev){
                if(state==="correct"){  bg="rgba(26,107,42,0.16)"; border="2px solid rgba(26,107,42,0.55)"; color="#0e4a1c"; }
                else if(state==="partial"){ bg="rgba(160,96,0,0.14)"; border="2px solid rgba(160,96,0,0.50)"; color="#6b4000"; }
                else { bg="#ebebeb"; border="2px solid rgba(0,0,0,0.20)"; color="rgba(0,0,0,0.40)"; }
              } else {
                // submitted but flip animation pending — white
                bg="white"; border="1px solid rgba(0,0,0,0.13)";
              }

              const flipCls=sub&&isRev
                ? state==="correct"?"flip-correct":state==="partial"?"flip-partial":"flip-wrong"
                : "";
              const justTyped=ri===curRow&&!sub&&letter;

              return (
                <div key={ci}
                  className={`flex items-center justify-center rounded-lg font-display select-none ${flipCls} ${justTyped?"tile-bounce":""}`}
                  style={{
                    width:tileW, height:tileW,
                    fontSize:tileFz,
                    background:bg, border, color,
                    animationDelay:flipCls?`${ci*110}ms`:"0ms",
                    animationFillMode:"both",
                    transition:"border-color .15s",
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── KEYBOARD ── */}
      {!showResult&&(
        <div className="flex flex-col gap-[3px] md:gap-1.5 items-center mt-1.5 md:mt-2 w-full max-w-[100vw] overflow-hidden px-0">
          {KB.map((row,ri)=>(
            <div key={ri} className="flex gap-[3px] md:gap-[5px] max-w-full">
              {row.map(key=>{
                const ks=keyState(key,rows);
                let bg="white", color="var(--txt3)", border="1px solid var(--b1)";
                if(ks==="correct"){ bg="var(--ok-bg)"; color="var(--ok-txt)"; border="1px solid var(--ok-bd)"; }
                else if(ks==="partial"){ bg="var(--amb-bg)"; color="var(--amb-txt)"; border="1px solid var(--amb-bd)"; }
                else if(ks==="wrong"){ bg="rgba(0,0,0,.3)"; color="rgba(0,0,0,0.40)"; border="1px solid var(--b1)"; }
                const wide=key==="ENTER"||key==="⌫";
                return (
                  <button key={key} onClick={()=>handleKey(key)}
                    className={`h-[48px] md:h-[50px] rounded-lg font-oswald font-semibold transition-all active:scale-95 select-none ${wide ? "w-auto min-w-[56px] md:min-w-[52px] px-1 md:px-2 text-[9px] md:text-[10px]" : "w-[33px] md:w-[34px] px-0 text-[14px] md:text-[15px]"}`}
                    style={{
                      letterSpacing:wide?"0.08em":"0.02em",
                      background:bg, color, border,
                    }}>
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── RESULT PANEL ── */}
      {showResult&&(
        <div className="rounded-2xl p-3 md:p-5 anim-in"
          style={{background:"white",border:"1px solid var(--b3)",boxShadow:"0 20px 60px rgba(0,0,0,.6)"}}>

          {/* Win/Lose header */}
          <div className="text-center mb-2 md:mb-5">
            {won?(
              <>
                <div className="font-display text-3xl md:text-5xl mb-0.5 md:mb-1" style={{color:"var(--gold)"}}>¡CRACK!</div>
                <p className="text-xs md:text-sm font-semibold" style={{color:"var(--ok-txt)"}}>
                  {rows.filter(r=>r.submitted).length}/{MAX} intentos
                </p>
              </>
            ):(
              <>
                <div className="font-display text-3xl md:text-5xl mb-0.5 md:mb-1" style={{color:"#18181b"}}>CASI...</div>
                <p className="text-xs md:text-sm" style={{color:"var(--txt3)"}}>Mañana puede ser tu día</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2 md:mb-4">
            <div className="rounded-lg px-2 py-1.5 text-center" style={{ background: "var(--gold-bg)", border: "1px solid var(--gold-bd)" }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--gold)" }}>Wordles</div>
              <div className="font-bebas text-[18px] leading-none" style={{ color: "#18181b" }}>{wordlesCompleted}</div>
            </div>
            <div className="rounded-lg px-2 py-1.5 text-center" style={{ background: "var(--grass-bg)", border: "1px solid var(--grass-bd)" }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--grass)" }}>Racha</div>
              <div className="font-bebas text-[18px] leading-none" style={{ color: "#18181b" }}>{stats.streak}</div>
            </div>
          </div>

          {/* Cromo card */}
          <div className="rounded-xl p-2.5 md:p-4 mb-2 md:mb-4 relative overflow-hidden" style={{background:"white",border:"1px solid var(--b-gold)"}}>
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style={{background:"linear-gradient(90deg,var(--gold2),var(--gold),var(--gold2))"}}/>
            <div className="pt-1">
              <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.22em] mb-1" style={{color:"var(--gold)"}}>El jugador era</div>
              <div className="font-display text-xl md:text-3xl leading-none mb-0.5" style={{color:"#18181b"}}>{player.displayName.toUpperCase()}</div>
              <div className="text-[11px] md:text-[12px] mb-2 md:mb-3" style={{color:"var(--txt3)"}}>{player.fullName} · {player.nationality}</div>
              <div className="flex flex-wrap gap-1 md:gap-1.5 mb-1.5 md:mb-3">
                {player.clubs.map(c=>(
                  <span key={c} className="text-[10px] md:text-[11px] font-semibold px-1.5 md:px-2 py-0.5 rounded"
                    style={{background:"white",color:"var(--txt3)",border:"1px solid var(--b2)"}}>
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-[10px] md:text-[12px] italic leading-snug md:leading-relaxed" style={{color:"var(--txt3)"}}>&ldquo;{player.hint}&rdquo;</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 pb-[env(safe-area-inset-bottom)]">
            {mode==="daily"&&(
              <button onClick={handleShare}
                className="w-full py-2.5 md:py-3.5 rounded-xl font-oswald font-semibold uppercase tracking-wider text-xs md:text-sm transition-all active:scale-[.98]"
                style={{
                  background:copied?"var(--ok-bg)":"var(--gold)",
                  color:copied?"var(--ok-txt)":"#111",
                  border:copied?"1px solid var(--ok-bd)":"none",
                  boxShadow:copied?"none":"0 4px 20px rgba(184,136,32,0.25)",
                }}>
                {copied?"✓ COPIADO":"COMPARTIR RESULTADO"}
              </button>
            )}
            {mode==="extra"&&(
              <button onClick={handleShare}
                className="w-full py-3 rounded-xl font-oswald font-semibold uppercase tracking-wider text-sm transition-all active:scale-[.98]"
                style={{background:"transparent",border:"1px solid var(--b-gold)",color:"var(--gold)"}}>
                COMPARTIR EXTRA #{extraIdx}
              </button>
            )}
            <button onClick={playExtra}
              className="w-full py-3 rounded-xl font-oswald font-semibold uppercase tracking-wider text-sm transition-all active:scale-[.98]"
              style={{background:"white",border:"1px solid var(--b3)",color:"var(--txt3)"}}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor="var(--b-gold)"; (e.currentTarget as HTMLElement).style.color="#18181b"; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=""; (e.currentTarget as HTMLElement).style.color=""; }}>
              {mode==="daily"
                ? `JUGAR EXTRA #${(dayState?.extras.length ?? 0)+1} →`
                : `JUGAR EXTRA #${extraIdx+1} →`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
