"use client";

import { useEffect, useState } from "react";
import { FUTBOLDLE_URL, normalizeShareText, SharePayload } from "@/lib/share";

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ShareSheetHost() {
  const [payload, setPayload] = useState<SharePayload | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onOpen(event: Event) {
      const detail = (event as CustomEvent<SharePayload>).detail;
      if (!detail?.text) return;
      setCopied(false);
      setPayload({ ...detail, text: normalizeShareText(detail.text) });
    }
    window.addEventListener("fbl-open-share-sheet", onOpen);
    return () => window.removeEventListener("fbl-open-share-sheet", onOpen);
  }, []);

  if (!payload) return null;

  async function copyText() {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload.text);
      payload.onCopied?.();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      alert(payload.text);
    }
  }

  async function nativeShare() {
    if (!payload) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: payload.title, text: payload.text });
        return;
      } catch {}
    }
    await copyText();
  }

  const encoded = encodeURIComponent(payload.text);
  const textWithoutUrl = payload.text.replace(FUTBOLDLE_URL, "").trim();

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center px-3 py-4" style={{ background: "rgba(0,0,0,0.35)" }}>
      <button className="absolute inset-0 cursor-default" onClick={() => setPayload(null)} aria-label="Cerrar compartir" />
      <section className="relative w-full max-w-sm rounded-2xl overflow-hidden anim-pop"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 18px 60px rgba(0,0,0,0.28)" }}>
        <div className="px-4 py-3" style={{ background: "#18181b", color: "white" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#fac840" }}>Compartir Futboldle</div>
          <div className="font-bebas text-[26px] leading-none mt-1">PÁSASELO A TU GRUPO</div>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.70)" }}>WhatsApp, X, Instagram o copiar resultado.</p>
        </div>

        <div className="p-3">
          <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-xl p-3 text-[11px] leading-relaxed"
            style={{ background: "#f8f5f0", color: "#3a3a3f", border: "1px solid rgba(0,0,0,0.06)", fontFamily: "inherit" }}>
            {payload.text}
          </pre>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button onClick={nativeShare} className="font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl"
              style={{ background: "#18181b", color: "white" }}>
              Compartir...
            </button>
            <button onClick={copyText} className="font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl"
              style={{ background: copied ? "#1e6b2e" : "#f8f5f0", color: copied ? "white" : "#18181b", border: "1px solid rgba(0,0,0,0.08)" }}>
              {copied ? "Copiado" : "Copiar"}
            </button>
            <button onClick={() => openExternal(`https://wa.me/?text=${encoded}`)} className="font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl"
              style={{ background: "#eaf8ee", color: "#1e6b2e", border: "1px solid rgba(30,107,46,0.18)" }}>
              WhatsApp
            </button>
            <button onClick={() => openExternal(`https://twitter.com/intent/tweet?text=${encoded}`)} className="font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl"
              style={{ background: "#eef3ff", color: "#1a4fa0", border: "1px solid rgba(26,79,160,0.18)" }}>
              X
            </button>
            <button onClick={() => openExternal(`https://t.me/share/url?url=${encodeURIComponent(FUTBOLDLE_URL)}&text=${encodeURIComponent(textWithoutUrl)}`)} className="font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl"
              style={{ background: "#eef8ff", color: "#1673a8", border: "1px solid rgba(22,115,168,0.18)" }}>
              Telegram
            </button>
            <button onClick={nativeShare} className="font-oswald font-semibold uppercase tracking-wider text-[11px] py-2.5 rounded-xl"
              style={{ background: "#fff0f7", color: "#b81c62", border: "1px solid rgba(184,28,98,0.18)" }}>
              Instagram
            </button>
          </div>

          <button onClick={() => setPayload(null)} className="w-full mt-3 text-[11px] font-semibold py-2 rounded-xl"
            style={{ color: "#6b6b72" }}>
            Cerrar
          </button>
        </div>
      </section>
    </div>
  );
}

