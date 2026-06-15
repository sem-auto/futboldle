"use client";

import { useEffect, useState } from "react";

const ADS = [
  {
    id: "sidgi",
    accent: "#1e6b2e",
    accentLight: "#e8f5ea",
    eyebrowIcon: "\u23f1\ufe0f",
    eyebrow: "Para empresas",
    title: "Control horario legal",
    desc: "Fichajes digitales listos para inspeccion de trabajo.",
    cta: "Ver SIDGI",
    url: "https://sem-auto.github.io/sigdi-landing/",
  },
  {
    id: "instaapply",
    accent: "#1a4fa0",
    accentLight: "#eff4ff",
    eyebrowIcon: "\ud83e\udd16",
    eyebrow: "Busca trabajo",
    title: "Aplica 10x mas rapido con IA",
    desc: "Rellena formularios de empleo automaticamente con tu CV.",
    cta: "Probar gratis",
    url: "https://chromewebstore.google.com/detail/instaapply/fpiaeondjkdaagegkjfjlnfmpojgkjgf?pli=1",
  },
];

export function SidebarAds() {
  return (
    <>
      <aside
        className="fixed left-3 top-24 z-20 hidden xl:block"
        style={{ width: "clamp(160px,13vw,188px)" }}
        aria-label="Publicidad izquierda"
      >
        <SideCard ad={ADS[0]} />
      </aside>
      <aside
        className="fixed right-3 top-24 z-20 hidden xl:block"
        style={{ width: "clamp(160px,13vw,188px)" }}
        aria-label="Publicidad derecha"
      >
        <SideCard ad={ADS[1]} />
      </aside>
    </>
  );
}

function SideCard({ ad }: { ad: typeof ADS[0] }) {
  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden group transition-all duration-150 hover:-translate-y-1"
      style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}
    >
      <div className="px-4 pt-4 pb-3" style={{ background: ad.accentLight, borderBottom: `1px solid ${ad.accent}22` }}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: ad.accent }}>
          <span aria-hidden="true">{ad.eyebrowIcon}</span> {ad.eyebrow}
        </div>
        <div className="font-bebas text-[20px] leading-tight" style={{ color: "#18181b" }}>{ad.title}</div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[11px] leading-snug mb-3.5" style={{ color: "#6b6b72" }}>{ad.desc}</p>
        <div
          className="w-full text-center font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl transition-opacity"
          style={{ background: ad.accent, color: "white" }}
        >
          {ad.cta} {"\u2192"}
        </div>
        <div className="mt-2 text-center text-[7px] uppercase tracking-[0.18em]" style={{ color: "#bbb" }}>Patrocinado {"\u00b7"} Futboldle</div>
      </div>
    </a>
  );
}

export default function PromoBanner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(current => (current + 1) % ADS.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="xl:hidden flex flex-col gap-2">
      {ADS.map((ad, index) => (
        <a
          key={ad.id}
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center rounded-xl overflow-hidden transition-all duration-200 max-md:max-h-[128px] max-md:max-w-full"
          style={{
            background: "white",
            border: `1.5px solid ${index === idx ? ad.accent : "rgba(0,0,0,0.08)"}`,
            boxShadow: index === idx ? "0 4px 14px rgba(0,0,0,0.10)" : "0 1px 3px rgba(0,0,0,0.06)",
            opacity: index === idx ? 1 : 0.6,
          }}
        >
          <div className="w-[4px] self-stretch flex-shrink-0" style={{ background: ad.accent }} />
          <div className="flex-1 min-w-0 px-3.5 py-3 max-md:px-3 max-md:py-2">
            <div className="text-[8px] font-semibold uppercase tracking-[0.15em] mb-0.5" style={{ color: ad.accent }}>
              <span aria-hidden="true">{ad.eyebrowIcon}</span> {ad.eyebrow}
            </div>
            <div className="font-oswald font-semibold text-[14px] max-md:text-[13px] leading-tight" style={{ color: "#18181b" }}>{ad.title}</div>
            <div className="text-[10px] max-md:text-[9px] mt-0.5 leading-snug max-md:line-clamp-2" style={{ color: "#888" }}>{ad.desc}</div>
          </div>
          <div className="flex-shrink-0 mx-3 max-md:mx-2">
            <div
              className="font-oswald font-semibold text-[10px] max-md:text-[9px] uppercase tracking-wider px-3.5 max-md:px-2.5 py-2 max-md:py-1.5 rounded-lg whitespace-nowrap"
              style={{ background: ad.accent, color: "white" }}
            >
              {ad.cta} {"\u2192"}
            </div>
          </div>
        </a>
      ))}
      <div className="flex justify-center gap-1.5 mt-0.5">
        {ADS.map((_, index) => (
          <button
            key={index}
            onClick={() => setIdx(index)}
            className="transition-all rounded-full"
            style={{ width: index === idx ? 20 : 6, height: 6, background: index === idx ? "#c0241c" : "rgba(0,0,0,0.15)" }}
            aria-label={`Ver anuncio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
