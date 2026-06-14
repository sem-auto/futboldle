"use client";

import { useEffect, useState } from "react";
import type { Achievement } from "@/lib/achievements";

export default function AchievementToast() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    function onAchievement(event: Event) {
      const detail = (event as CustomEvent<Achievement>).detail;
      if (!detail?.label) return;
      setAchievement(detail);
      window.setTimeout(() => setAchievement(null), 4200);
    }
    window.addEventListener("fbl-achievement-unlocked", onAchievement);
    return () => window.removeEventListener("fbl-achievement-unlocked", onAchievement);
  }, []);

  if (!achievement) return null;

  return (
    <div className="fixed left-3 right-3 bottom-4 z-[85] flex justify-center pointer-events-none">
      <div className="w-full max-w-sm rounded-2xl p-3 anim-pop pointer-events-auto"
        style={{ background: "#18181b", color: "white", border: "1px solid rgba(250,200,64,0.45)", boxShadow: "0 14px 46px rgba(0,0,0,0.30)" }}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#fac840" }}>Logro desbloqueado</div>
        <div className="font-bebas text-[28px] leading-none mt-1">🏆 {achievement.label}</div>
        <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.72)" }}>{achievement.description}</p>
      </div>
    </div>
  );
}
