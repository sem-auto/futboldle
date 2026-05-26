"use client";
import { useState, useEffect } from "react";

interface BannerItem {
  id: string;
  tag: string;
  title: string;
  text: string;
  cta: string;
  url: string;
  icon: string;
}

const BANNERS: BannerItem[] = [
  {
    id: "sidgi",
    tag: "PARA EMPRESAS",
    title: "Control horario legal",
    text: "Fichajes simples, automáticos y listos para inspección.",
    cta: "Ver SIDGI",
    url: "https://sem-auto.github.io/sigdi-landing/",
    icon: "⏱️",
  },
  {
    id: "instaapply",
    tag: "ENCUENTRA TRABAJO",
    title: "Busca trabajo más rápido",
    text: "Una IA que rellena formularios de empleo por ti usando tu CV.",
    cta: "Probar gratis",
    url: "https://chromewebstore.google.com/detail/instaapply/fpiaeondjkdaagegkjfjlnfmpojgkjgf?pli=1",
    icon: "🤖",
  },
];

export default function PromoBanner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % BANNERS.length), 8000);
    return () => clearInterval(t);
  }, []);

  const b = BANNERS[idx];

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <a
        href={b.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all group"
        style={{
          background: "var(--surface-3)",
          border: "1px solid var(--border)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.borderColor = "rgba(232,0,29,0.3)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.borderColor = "")
        }
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
          style={{ background: "var(--surface-4)" }}
        >
          {b.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5"
            style={{ color: "var(--red)" }}
          >
            {b.tag}
          </div>
          <div className="text-white text-[13px] font-semibold leading-tight truncate">
            {b.title}
          </div>
          <div
            className="text-[11px] truncate mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            {b.text}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors"
            style={{
              background: "var(--red-dim)",
              color: "var(--red)",
              border: "1px solid rgba(232,0,29,0.2)",
            }}
          >
            {b.cta} →
          </span>
        </div>
      </a>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background: i === idx ? "var(--red)" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
