"use client";
import { useEffect, useState } from "react";
import { shareResult } from "@/lib/share";

export default function IconUnlockToast() {
  const [card, setCard] = useState<{ name: string; rarity: string; clubs: string[]; position: string; source?: string; season?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onCard(event: Event) {
      const detail = (event as CustomEvent<{ name?: string; rarity?: string; clubs?: string[]; position?: string; source?: string; season?: string }>).detail;
      if (!detail?.name) return;
      setCopied(false);
      setCard({ name: detail.name, rarity: detail.rarity ?? "CROMO", clubs: detail.clubs ?? [], position: detail.position ?? "Jugador", source: detail.source, season: detail.season });
      window.setTimeout(() => setCard(null), 6200);
    }
    window.addEventListener("fbl-card-unlocked", onCard);
    return () => window.removeEventListener("fbl-card-unlocked", onCard);
  }, []);

  if (!card) return null;

  async function shareCard() {
    if (!card) return;
    const text = `🎴 Nuevo cromo en Futboldle\n${card.name} · ${card.rarity}\n${card.position}${card.clubs.length ? ` · ${card.clubs.join(" / ")}` : ""}\n${card.source ? `Origen: ${card.source}` : ""}\n\nhttps://futboldle.es`;
    shareResult(text, () => { setCopied(true); window.setTimeout(() => setCopied(false), 1800); });
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 pointer-events-none">
      <div className="w-full max-w-xs rounded-2xl p-3 text-center anim-pop pointer-events-auto"
        style={{ background: "linear-gradient(145deg,#18181b,#2a1d12)", color: "white", border: "1px solid rgba(200,146,10,0.55)", boxShadow: "0 18px 60px rgba(0,0,0,0.35)" }}>
        <div className="rounded-xl px-4 py-4 overflow-hidden relative"
          style={{ background: "linear-gradient(145deg,#fff8e6,#f2d37d)", color: "#18181b", border: "1px solid rgba(255,255,255,0.50)" }}>
          <div className="absolute inset-x-0 top-0 h-10" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)" }} />
          <div className="mx-auto mb-3 w-16 h-16 rounded-full flex items-center justify-center relative"
            style={{ background: "#18181b", color: "#fac840", border: "2px solid rgba(200,146,10,0.75)" }}>
            <span className="font-bebas text-[30px]">{card.name.slice(0, 1).toUpperCase()}</span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#8a6406" }}>HAS DESBLOQUEADO</div>
          <div className="font-bebas text-[30px] leading-none mt-1">{card.name.toUpperCase()}</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mt-1" style={{ color: "#8a6406" }}>{card.rarity}</div>
          <div className="mt-2 text-[11px] leading-snug" style={{ color: "#4b3b20" }}>
            <div>{card.position}</div>
            {card.clubs.length > 0 && <div>{card.clubs.join(" · ")}</div>}
            {card.source && <div className="mt-1 font-semibold">{card.source}</div>}
            {card.season && <div>{card.season}</div>}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href="/album" className="font-oswald font-semibold uppercase tracking-wider text-[11px] px-3 py-2 rounded-lg"
            style={{ background: "#fac840", color: "#111" }}>
            Ver álbum
          </a>
          <button onClick={shareCard} className="font-oswald font-semibold uppercase tracking-wider text-[11px] px-3 py-2 rounded-lg"
            style={{ background: copied ? "#1e6b2e" : "white", color: copied ? "white" : "#18181b" }}>
            {copied ? "Copiado" : "Compartir"}
          </button>
        </div>
        <button onClick={() => setCard(null)} className="mt-2 w-full font-oswald font-semibold uppercase tracking-wider text-[10px] px-3 py-2 rounded-lg"
          style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>
          Seguir jugando
        </button>
      </div>
    </div>
  );
}
