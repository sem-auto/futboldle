"use client";
import { useState, useEffect } from "react";

interface Ad { id:string; tag:string; title:string; body:string; cta:string; url:string; icon:string; color:string; }

const ADS: Ad[] = [
  {
    id:"sidgi", tag:"PARA EMPRESAS", icon:"⏱️",
    title:"Control horario legal",
    body:"Fichajes simples, automáticos y listos para inspección.",
    cta:"Ver SIDGI", url:"https://sem-auto.github.io/sigdi-landing/",
    color:"rgba(93,168,78,0.25)",
  },
  {
    id:"instaapply", tag:"ENCUENTRA TRABAJO", icon:"🤖",
    title:"Aplica más rápido con IA",
    body:"Rellena formularios de empleo automáticamente con tu CV.",
    cta:"Probar gratis", url:"https://chromewebstore.google.com/detail/instaapply/fpiaeondjkdaagegkjfjlnfmpojgkjgf?pli=1",
    color:"rgba(242,201,76,0.15)",
  },
];

/* ── Desktop sticky sidebar ── */
export function SidebarAds() {
  return (
    <>
      <div className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden xl:block w-[168px]">
        <AdCard ad={ADS[0]} />
      </div>
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden xl:block w-[168px]">
        <AdCard ad={ADS[1]} />
      </div>
    </>
  );
}

function AdCard({ad}:{ad:Ad}) {
  return (
    <a href={ad.url} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="rounded-2xl p-4 transition-all duration-200"
        style={{background:"var(--bg3)",border:"1px solid var(--b2)"}}
        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor="var(--b-gold)"; }}
        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=""; }}>
        {/* top stripe */}
        <div className="h-[2px] rounded-full mb-3" style={{background:ad.color}}/>
        <div className="text-2xl mb-2">{ad.icon}</div>
        <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.2em] mb-1.5" style={{color:"var(--gold)"}}>{ad.tag}</div>
        <div className="text-[13px] font-semibold leading-snug mb-2" style={{color:"var(--cream)"}}>{ad.title}</div>
        <div className="text-[11px] leading-relaxed mb-3" style={{color:"var(--cream-dim)"}}>{ad.body}</div>
        <div className="text-[11px] font-oswald font-semibold uppercase tracking-wider py-2 rounded-lg text-center transition-colors"
          style={{background:"var(--gold-dim)",color:"var(--gold)",border:"1px solid var(--b-gold)"}}>
          {ad.cta} →
        </div>
      </div>
    </a>
  );
}

/* ── Mobile horizontal banners ── */
export default function PromoBanner() {
  const [active, setActive] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setActive(i=>(i+1)%ADS.length),7000); return ()=>clearInterval(t); },[]);

  return (
    <div className="xl:hidden w-full flex flex-col gap-2">
      <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.2em] px-1" style={{color:"var(--cream-ghost)"}}>
        Publicidad
      </div>
      {ADS.map((ad,i)=>(
        <a key={ad.id} href={ad.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300"
          style={{
            background:"var(--bg3)",
            border:`1px solid ${i===active?"var(--b-gold)":"var(--b1)"}`,
            opacity: i===active?1:0.6,
          }}>
          <div className="text-xl flex-shrink-0">{ad.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-oswald font-semibold uppercase tracking-[0.18em] mb-0.5" style={{color:"var(--gold)"}}>{ad.tag}</div>
            <div className="text-[12px] font-semibold leading-tight truncate" style={{color:"var(--cream)"}}>{ad.title}</div>
            <div className="text-[11px] mt-0.5 truncate" style={{color:"var(--cream-dim)"}}>{ad.body}</div>
          </div>
          <div className="text-[11px] font-oswald font-semibold uppercase tracking-wider flex-shrink-0 px-3 py-1.5 rounded-lg"
            style={{background:"var(--gold-dim)",color:"var(--gold)",border:"1px solid var(--b-gold)"}}>
            {ad.cta} →
          </div>
        </a>
      ))}
    </div>
  );
}
