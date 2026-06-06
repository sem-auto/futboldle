"use client";
import { useEffect, useState } from "react";

export default function IconUnlockToast() {
  const [card, setCard] = useState<{ name: string; rarity: string; clubs: string[]; position: string } | null>(null);

  useEffect(() => {
    function onCard(event: Event) {
      const detail = (event as CustomEvent<{ name?: string; rarity?: string; clubs?: string[]; position?: string }>).detail;
      if (!detail?.name) return;
      setCard({ name: detail.name, rarity: detail.rarity ?? "CROMO", clubs: detail.clubs ?? [], position: detail.position ?? "Jugador" });
      window.setTimeout(() => setCard(null), 3200);
    }
    window.addEventListener("fbl-card-unlocked", onCard);
    return () => window.removeEventListener("fbl-card-unlocked", onCard);
  }, []);

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 pointer-events-none">
      <div className="w-full max-w-xs rounded-2xl px-5 py-4 text-center anim-pop pointer-events-auto"
        style={{ background: "#18181b", color: "white", border: "1px solid rgba(200,146,10,0.55)", boxShadow: "0 18px 60px rgba(0,0,0,0.35)" }}>
        <div className="mx-auto mb-3 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "#fff8e6", color: "#18181b", border: "1px solid rgba(200,146,10,0.55)" }}>
          <span className="font-bebas text-[30px]">{card.name.slice(0, 1).toUpperCase()}</span>
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#fac840" }}>🎴 NUEVO CROMO</div>
        <div className="font-bebas text-[30px] leading-none mt-1">{card.name.toUpperCase()}</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mt-1" style={{ color: "#fac840" }}>{card.rarity}</div>
        <div className="mt-2 text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.76)" }}>
          <div>{card.position}</div>
          {card.clubs.length > 0 && <div>{card.clubs.join(" · ")}</div>}
        </div>
        <a href="/album" className="inline-flex mt-4 font-oswald font-semibold uppercase tracking-wider text-[11px] px-4 py-2 rounded-lg"
          style={{ background: "#fac840", color: "#111" }}>
          Ver álbum
        </a>
      </div>
    </div>
  );
}
