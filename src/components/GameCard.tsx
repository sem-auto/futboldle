"use client";

const GAME_STYLES: Record<string, { accent: string; bg: string; bd: string; icon: string; badge?: string }> = {
  "TOP 10 BBVA":       { accent: "#1a4fa0", bg: "#f0f5ff", bd: "rgba(26,79,160,0.20)", icon: "🏆", badge: "En desarrollo" },
  "ADIVINA EL CRACK":  { accent: "#7c3aed", bg: "#faf5ff", bd: "rgba(124,58,237,0.20)", icon: "🌍", badge: "En desarrollo" },
  "XI IDEAL BBVA":     { accent: "#b81c14", bg: "#fff5f5", bd: "rgba(184,28,20,0.20)", icon: "👕", badge: "Próximo" },
};

interface Props { icon:string; title:string; description:string; available:boolean; onClick?:()=>void; }

export default function GameCard({ icon, title, description, available, onClick }: Props) {
  const style = GAME_STYLES[title] || { accent: "#6b6b72", bg: "#f6f6f6", bd: "rgba(0,0,0,0.12)", icon };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: style.bg, border: `1.5px solid ${style.bd}`, opacity: available ? 1 : 0.85 }}
    >
      {!available && (
        <div className="h-[2px]" style={{ background: style.accent, opacity: 0.4 }} />
      )}
      {available && (
        <div className="h-[2px]" style={{ background: style.accent }} />
      )}
      <div className="p-4">
        {/* Badge */}
        {style.badge && (
          <div className="inline-block text-[8px] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full mb-2"
            style={{ background: style.accent + "18", color: style.accent }}>
            {style.badge}
          </div>
        )}

        {/* Icon grande */}
        <div className="text-3xl mb-2">{style.icon || icon}</div>

        {/* Nombre */}
        <div className="font-bebas text-[20px] leading-none mb-1" style={{ color: "#18181b" }}>{title}</div>
        <p className="text-[10px] leading-snug" style={{ color: "#6b6b72" }}>{description}</p>

        {available && onClick && (
          <button onClick={onClick}
            className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[10px] py-2 rounded-lg"
            style={{ background: style.accent, color: "white" }}>
            Jugar →
          </button>
        )}
      </div>
    </div>
  );
}
