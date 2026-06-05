"use client";
import { useState, useEffect } from "react";

const ADS = [
  {
    id: "sidgi",
    accent: "#1e6b2e",
    accentLight: "#e8f5ea",
    eyebrow: "⏱️ Para empresas",
    title: "Control horario legal",
    desc: "Fichajes digitales listos para inspección de trabajo.",
    cta: "Ver SIDGI",
    url: "https://sem-auto.github.io/sigdi-landing/",
  },
  {
    id: "instaapply",
    accent: "#1a4fa0",
    accentLight: "#eff4ff",
    eyebrow: "🤖 Busca trabajo",
    title: "Aplica 10× más rápido con IA",
    desc: "Rellena formularios de empleo automáticamente con tu CV.",
    cta: "Probar gratis",
    url: "https://chromewebstore.google.com/detail/instaapply/fpiaeondjkdaagegkjfjlnfmpojgkjgf?pli=1",
  },
];

export function SidebarAds() {
  return (
    <>
      <aside className="fixed left-3 top-1/2 -translate-y-1/2 z-30 hidden xl:block" style={{ width: 188 }}>
        <SideCard ad={ADS[0]} />
      </aside>
      <aside className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden xl:block" style={{ width: 188 }}>
        <SideCard ad={ADS[1]} />
      </aside>
    </>
  );
}

function SideCard({ ad }: { ad: typeof ADS[0] }) {
  return (
    <a href={ad.url} target="_blank" rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden group transition-all duration-150 hover:-translate-y-1"
      style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}>
      {/* Color header */}
      <div className="px-4 pt-4 pb-3" style={{ background: ad.accentLight, borderBottom: `1px solid ${ad.accent}22` }}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: ad.accent }}>{ad.eyebrow}</div>
        <div className="font-bebas text-[20px] leading-tight" style={{ color: "#18181b" }}>{ad.title}</div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[11px] leading-snug mb-3.5" style={{ color: "#6b6b72" }}>{ad.desc}</p>
        <div className="w-full text-center font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl transition-opacity"
          style={{ background: ad.accent, color: "white" }}>
          {ad.cta} →
        </div>
        <div className="mt-2 text-center text-[7px] uppercase tracking-[0.18em]" style={{ color: "#bbb" }}>Patrocinado · Futboldle</div>
      </div>
    </a>
  );
}

export default function PromoBanner() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ADS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="xl:hidden flex flex-col gap-2">
      {ADS.map((ad, i) => (
        <a key={ad.id} href={ad.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center rounded-xl overflow-hidden transition-all duration-200 max-md:max-h-[132px]"
          style={{
            background: "white",
            border: `1.5px solid ${i === idx ? ad.accent : "rgba(0,0,0,0.08)"}`,
            boxShadow: i === idx ? "0 4px 14px rgba(0,0,0,0.10)" : "0 1px 3px rgba(0,0,0,0.06)",
            opacity: i === idx ? 1 : 0.6,
          }}>
          {/* Accent strip */}
          <div className="w-[4px] self-stretch flex-shrink-0" style={{ background: ad.accent }} />
          {/* Content */}
          <div className="flex-1 min-w-0 px-3.5 py-3 max-md:px-3 max-md:py-2">
            <div className="text-[8px] font-semibold uppercase tracking-[0.15em] mb-0.5" style={{ color: ad.accent }}>{ad.eyebrow}</div>
            <div className="font-oswald font-semibold text-[14px] max-md:text-[13px] leading-tight" style={{ color: "#18181b" }}>{ad.title}</div>
            <div className="text-[10px] max-md:text-[9px] mt-0.5 leading-snug max-md:line-clamp-2" style={{ color: "#888" }}>{ad.desc}</div>
          </div>
          {/* CTA */}
          <div className="flex-shrink-0 mx-3 max-md:mx-2">
            <div className="font-oswald font-semibold text-[10px] max-md:text-[9px] uppercase tracking-wider px-3.5 max-md:px-2.5 py-2 max-md:py-1.5 rounded-lg whitespace-nowrap"
              style={{ background: ad.accent, color: "white" }}>
              {ad.cta} →
            </div>
          </div>
        </a>
      ))}
      <div className="flex justify-center gap-1.5 mt-0.5">
        {ADS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="transition-all rounded-full"
            style={{ width: i === idx ? 20 : 6, height: 6, background: i === idx ? "#c0241c" : "rgba(0,0,0,0.15)" }} />
        ))}
      </div>
    </div>
  );
}
