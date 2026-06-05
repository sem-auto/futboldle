"use client";
import { useState, useEffect, useCallback } from "react";
import { BBVAPlayer, getPlayerOfDay, getExtraPlayer } from "@/data/bbvaPlayers";
import { normalize } from "@/lib/normalize";
import { getDayKey, getDayNumber } from "@/lib/daily";

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

function evaluate(guess:string[],answer:string[]):LS[] {
  const r:LS[] = Array(answer.length).fill("wrong");
  const cnt:Record<string,number>={};
  answer.forEach(l=>{ cnt[l]=(cnt[l]||0)+1; });
  guess.forEach((l,i)=>{ if(l===answer[i]){r[i]="correct";cnt[l]--;} });
  guess.forEach((l,i)=>{ if(r[i]!=="correct"&&cnt[l]>0){r[i]="partial";cnt[l]--;} });
  return r;
}

function shareText(states:LS[][],won:boolean,label:string):string {
  const score = won?`${states.length}/${MAX}`:`X/${MAX}`;
  const e=(s:LS)=>s==="correct"?"🟩":s==="partial"?"🟨":"⬛";
  return `Futboldle BBVA ${label}\n${score}\n\n${states.map(r=>r.map(e).join("")).join("\n")}\n\nhttps://futboldle.es`;
}

function keyState(key:string, rows:Row[]):"correct"|"partial"|"wrong"|"idle" {
  const p: Record<string,number>={correct:3,partial:2,wrong:1,idle:0,empty:0,active:0};
  let best:"correct"|"partial"|"wrong"|"idle"="idle";
  for(const g of rows){
    if(!g.submitted) continue;
    g.letters.forEach((l,i)=>{
      if(l===key&&(p[g.states[i]]??0)>(p[best]??0)) best=g.states[i] as "correct"|"partial"|"wrong";
    });
  }
  return best;
}

function loadDayState():DayState {
  try {
    const raw=localStorage.getItem(`fbl-day-${getDayKey()}`);
    if(raw){ const d=JSON.parse(raw); if(d.date===getDayKey()) return d; }
  } catch{}
  return {date:getDayKey(),daily:null,extras:[],current:null};
}

function saveDayState(ds:DayState){ try{ localStorage.setItem(`fbl-day-${getDayKey()}`,JSON.stringify(ds)); }catch{} }

function rowsFromResult(result:GameResult, ansLen:number):Row[] {
  const rows = Array.from({length:MAX},()=>emptyRow(ansLen));
  result.letters.forEach((letters,i)=>{ rows[i]={letters,states:result.states[i],submitted:true}; });
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
      setShowHint(false); setShowResult(false);
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
  },[rows,curRow,answer,dayState,mode,extraIdx]);

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

  // ── Play extra ──
  function playExtra(){
    if(!dayState) return;
    const newExtraIdx = dayState.extras.length+1;
    setMode("extra"); setExtraIdx(newExtraIdx);
    const p=getExtraPlayer(newExtraIdx);
    const existing=dayState.extras[newExtraIdx-1]??null;
    setShowResult(false);
    startGame(p, existing);
  }

  // ── Share ──
  async function handleShare(){
    const label = mode==="daily"
      ? `Diario #${getDayNumber()}`
      : `Extra #${extraIdx}`;
    const submitted=rows.filter(r=>r.submitted);
    const text=shareText(submitted.map(r=>r.states),won,label);
    try{ await navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),2500); }
    catch{ alert(text); }
  }

  if(!loaded) return (
    <div className="flex items-center justify-center py-28">
      <span className="font-display text-4xl anim-pulse" style={{color:"var(--gold)"}}>FUTBOLDLE</span>
    </div>
  );

  const ansLen=answer.length;
  const tileW=ansLen<=5?60:ansLen<=7?52:ansLen<=9?44:38;
  const tileFz=ansLen<=5?26:ansLen<=7?22:ansLen<=9?19:16;

  const modeLabel = mode==="daily"
    ? `RETO DEL DÍA · #${getDayNumber()}`
    : `EXTRA #${extraIdx}`;

  // Is daily already completed (loaded from storage)?
  const dailyDone = !!dayState?.daily;

  return (
    <div className="flex flex-col gap-5 pb-10">

      {/* ── Back ── */}
      <button onClick={onBack} className="self-start flex items-center gap-1.5 text-sm font-semibold transition-opacity opacity-60 hover:opacity-100" style={{color:"var(--cream)"}}>
        ← Volver
      </button>

      {/* ── Header ── */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full" style={{background:"var(--gold-dim)",border:"1px solid var(--b-gold)"}}>
          <span className="text-[10px] font-oswald font-semibold uppercase tracking-[0.22em]" style={{color:"var(--gold)"}}>{modeLabel}</span>
          {mode==="daily"&&dailyDone&&(
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{background:"var(--green-bg)",color:"var(--green-text)",border:"1px solid var(--green-border)"}}>Completado ✅</span>
          )}
        </div>
        <h2 className="font-display text-4xl leading-none" style={{color:"var(--cream)"}}>WORDLE BBVA</h2>
        <p className="text-[12px] mt-1.5" style={{color:"var(--cream-dim)"}}>Adivina el apellido · <span style={{color:"var(--gold)"}}>{ansLen} letras</span> · {MAX} intentos</p>
      </div>

      {/* ── Pre-game prompt ── */}
      <div className="rounded-xl px-4 py-3 text-center" style={{background:"var(--bg4)",border:"1px solid var(--b2)"}}>
        <p className="text-[13px]" style={{color:"var(--cream-dim)"}}>
          Adivina el apellido de un{" "}
          <span className="font-oswald font-semibold" style={{color:"var(--gold)"}}>Hombre BBVA</span>
        </p>
      </div>

      {/* ── Post-3 hint ── */}
      {showHint&&!gameOver&&(
        <div className="rounded-xl px-4 py-3 anim-in" style={{background:"var(--bg4)",border:"1px solid var(--b-gold)"}}>
          <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.22em] mb-1.5" style={{color:"var(--gold)"}}>💡 Pista</div>
          <p className="text-[13px] font-semibold mb-0.5" style={{color:"var(--cream)"}}>{player.mainClub} · {player.position}</p>
          <p className="text-[12px] italic leading-relaxed" style={{color:"var(--cream-dim)"}}>&ldquo;{player.hint}&rdquo;</p>
        </div>
      )}

      {/* ── Toast ── */}
      {toast&&(
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl text-sm font-semibold anim-pop"
          style={{background:"var(--bg5)",border:"1px solid var(--b3)",color:"var(--cream)",whiteSpace:"nowrap",boxShadow:"0 12px 40px rgba(0,0,0,0.7)"}}>
          {toast}
        </div>
      )}

      {/* ── GRID ── */}
      <div className="flex flex-col gap-2 items-center" style={{perspective:"400px"}}>
        {rows.map((row,ri)=>(
          <div key={ri} className={`flex gap-2 ${shakeRow===ri?"anim-shake":""}`}>
            {Array.from({length:ansLen}).map((_,ci)=>{
              const letter=row.letters[ci]||"";
              const sub=row.submitted;
              const state=sub?row.states[ci]:letter?"active":"empty";
              const isRev=revealed[ri];

              // Static styles (pre-flip)
              let bg="var(--bg4)", border="1px solid var(--b2)", color="var(--cream)";
              if(!sub){
                if(state==="active"){ border="1px solid var(--b3)"; }
              } else if(isRev){
                if(state==="correct"){ bg="var(--green-bg)"; border="1px solid var(--green-border)"; color="var(--green-text)"; }
                else if(state==="partial"){ bg="var(--amber-bg)"; border="1px solid var(--amber-border)"; color="var(--amber-text)"; }
                else { bg="var(--wrong-bg)"; border="1px solid var(--wrong-border)"; color="var(--wrong-text)"; }
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
        <div className="flex flex-col gap-1.5 items-center mt-2">
          {KB.map((row,ri)=>(
            <div key={ri} className="flex gap-[5px]">
              {row.map(key=>{
                const ks=keyState(key,rows);
                let bg="var(--bg5)", color="var(--cream-dim)", border="1px solid var(--b1)";
                if(ks==="correct"){ bg="var(--green-bg)"; color="var(--green-text)"; border="1px solid var(--green-border)"; }
                else if(ks==="partial"){ bg="var(--amber-bg)"; color="var(--amber-text)"; border="1px solid var(--amber-border)"; }
                else if(ks==="wrong"){ bg="rgba(0,0,0,.3)"; color="var(--wrong-text)"; border="1px solid var(--b1)"; }
                const wide=key==="ENTER"||key==="⌫";
                return (
                  <button key={key} onClick={()=>handleKey(key)}
                    className="rounded-lg font-oswald font-semibold transition-all active:scale-95 select-none"
                    style={{
                      width:wide?"auto":34, minWidth:wide?52:34, height:50,
                      padding:wide?"0 8px":0,
                      fontSize:wide?10:15, letterSpacing:wide?"0.08em":"0.02em",
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
        <div className="rounded-2xl p-5 anim-in"
          style={{background:"var(--bg3)",border:"1px solid var(--b3)",boxShadow:"0 20px 60px rgba(0,0,0,.6)"}}>

          {/* Win/Lose header */}
          <div className="text-center mb-5">
            {won?(
              <>
                <div className="font-display text-5xl mb-1" style={{color:"var(--gold)"}}>¡CRACK!</div>
                <p className="text-sm font-semibold" style={{color:"var(--green-text)"}}>
                  {rows.filter(r=>r.submitted).length}/{MAX} intentos
                </p>
              </>
            ):(
              <>
                <div className="font-display text-5xl mb-1" style={{color:"var(--cream)"}}>CASI...</div>
                <p className="text-sm" style={{color:"var(--cream-dim)"}}>Mañana puede ser tu día</p>
              </>
            )}
          </div>

          {/* Cromo card */}
          <div className="rounded-xl p-4 mb-4 relative overflow-hidden" style={{background:"var(--bg5)",border:"1px solid var(--b-gold)"}}>
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style={{background:"linear-gradient(90deg,var(--gold2),var(--gold),var(--gold2))"}}/>
            <div className="pt-1">
              <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.22em] mb-1" style={{color:"var(--gold)"}}>El jugador era</div>
              <div className="font-display text-3xl leading-none mb-0.5" style={{color:"var(--cream)"}}>{player.displayName.toUpperCase()}</div>
              <div className="text-[12px] mb-3" style={{color:"var(--cream-dim)"}}>{player.fullName} · {player.nationality}</div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {player.clubs.map(c=>(
                  <span key={c} className="text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{background:"var(--bg4)",color:"var(--cream-dim)",border:"1px solid var(--b2)"}}>
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-[12px] italic leading-relaxed" style={{color:"var(--cream-dim)"}}>&ldquo;{player.hint}&rdquo;</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            {mode==="daily"&&(
              <button onClick={handleShare}
                className="w-full py-3.5 rounded-xl font-oswald font-semibold uppercase tracking-wider text-sm transition-all active:scale-[.98]"
                style={{
                  background:copied?"var(--green-bg)":"var(--gold)",
                  color:copied?"var(--green-text)":"#111",
                  border:copied?"1px solid var(--green-border)":"none",
                  boxShadow:copied?"none":"0 4px 20px var(--gold-glow)",
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
              style={{background:"var(--bg5)",border:"1px solid var(--b3)",color:"var(--cream-dim)"}}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor="var(--b-gold)"; (e.currentTarget as HTMLElement).style.color="var(--cream)"; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=""; (e.currentTarget as HTMLElement).style.color=""; }}>
              {mode==="daily"
                ? `JUGAR EXTRA #${(dayState?.extras.length??0)+1} →`
                : `JUGAR EXTRA #${extraIdx+1} →`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
