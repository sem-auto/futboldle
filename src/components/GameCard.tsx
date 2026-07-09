"use client";

const GAME_STYLES: Record<string, { accent: string; bg: string; bd: string; mark: string; chips: string[]; badge?: string }> = {
  "TOP 10 BBVA": {
    accent: "#1a4fa0",
    bg: "#f0f5ff",
    bd: "rgba(26,79,160,0.20)",
    mark: "10",
    chips: ["1", "2", "3"],
    badge: "Reto",
  },
  "ADIVINA EL CRACK": {
    accent: "#7c3aed",
    bg: "#faf5ff",
    bd: "rgba(124,58,237,0.20)",
    mark: "?",
    chips: ["?", "?", "?"],
    badge: "Pistas",
  },
  "XI IDEAL BBVA": {
    accent: "#b81c14",
    bg: "#fff5f5",
    bd: "rgba(184,28,20,0.20)",
    mark: "XI",
    chips: ["POR", "DEF", "DEL"],
    badge: "En revisión",
  },
};

interface Props {
  icon: string;
  title: string;
  description: string;
  available: boolean;
  onClick?: () => void;
}

export default function GameCard({ icon, title, description, available, onClick }: Props) {
  const style = GAME_STYLES[title] || {
    accent: "#6b6b72",
    bg: "#f6f6f6",
    bd: "rgba(0,0,0,0.12)",
    mark: icon || "F",
    chips: ["BBVA", "2005", "2016"],
  };

  return (
    <div
      className="fbl-card group rounded-xl overflow-hidden"
      style={{ background: style.bg, border: `1.5px solid ${style.bd}`, opacity: available ? 1 : 0.86 }}
    >
      <div className="h-[3px]" style={{ background: style.accent, opacity: available ? 1 : 0.5 }} />
      <span className="fbl-visual-mark right-3 top-5 text-[64px] group-hover:scale-105">{style.mark}</span>
      <div className="relative z-10 p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl text-xl font-bold"
            style={{ background: `${style.accent}14`, color: style.accent, border: `1px solid ${style.accent}22` }}
          >
            {icon}
          </div>
          {style.badge && (
            <div
              className="inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em]"
              style={{ background: style.accent + "18", color: style.accent }}
            >
              {style.badge}
            </div>
          )}
        </div>

        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {style.chips.map((chip, index) => (
            <span
              key={`${title}-${chip}-${index}`}
              className="rounded-md px-1.5 py-1 text-center text-[8px] font-bold uppercase tracking-[0.08em]"
              style={{ background: index === 1 ? `${style.accent}18` : "rgba(255,255,255,0.72)", color: index === 1 ? style.accent : "#9a9a8a", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mb-1 font-bebas text-[22px] leading-none" style={{ color: "#18181b" }}>
          {title}
        </div>
        <p className="text-[10px] leading-snug" style={{ color: "#6b6b72" }}>
          {description}
        </p>

        {available && onClick && (
          <button
            onClick={onClick}
            className="mt-3 w-full rounded-lg py-2 font-oswald text-[10px] font-semibold uppercase tracking-wider transition-transform active:scale-[0.98]"
            style={{ background: style.accent, color: "white" }}
          >
            Jugar →
          </button>
        )}
      </div>
    </div>
  );
}
