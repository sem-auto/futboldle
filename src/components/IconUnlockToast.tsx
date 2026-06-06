"use client";
import { useEffect, useState } from "react";

export default function IconUnlockToast() {
  const [card, setCard] = useState<{ name: string; rarity: string } | null>(null);

  useEffect(() => {
    function onCard(event: Event) {
      const detail = (event as CustomEvent<{ name?: string; rarity?: string }>).detail;
      if (!detail?.name) return;
      setCard({ name: detail.name, rarity: detail.rarity ?? "CROMO" });
      window.setTimeout(() => setCard(null), 3200);
    }
    window.addEventListener("fbl-card-unlocked", onCard);
    return () => window.removeEventListener("fbl-card-unlocked", onCard);
  }, []);

  if (!card) return null;

  return (
    <div className="fixed left-1/2 top-16 z-[80] -translate-x-1/2 rounded-2xl px-5 py-3 text-center anim-pop"
      style={{ background: "#18181b", color: "white", border: "1px solid rgba(200,146,10,0.55)", boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#fac840" }}>✨ NUEVO CROMO DESBLOQUEADO</div>
      <div className="font-bebas text-[28px] leading-none mt-1">{card.name.toUpperCase()}</div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mt-1" style={{ color: "#fac840" }}>{card.rarity}</div>
    </div>
  );
}
