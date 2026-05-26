"use client";

interface GameCardProps {
  icon: string;
  title: string;
  description: string;
  tag?: string;
  available: boolean;
  accent?: string;
  onClick?: () => void;
}

export default function GameCard({
  icon,
  title,
  description,
  tag,
  available,
  onClick,
}: GameCardProps) {
  return (
    <button
      onClick={available ? onClick : undefined}
      disabled={!available}
      className="w-full text-left rounded-2xl p-4 transition-all duration-200 group relative overflow-hidden"
      style={{
        background: "var(--surface-3)",
        border: available
          ? "1px solid var(--border-md)"
          : "1px solid var(--border)",
        opacity: available ? 1 : 0.65,
        cursor: available ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        if (available) {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(232,0,29,0.4)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "";
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      {/* Tag */}
      {tag && (
        <span
          className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
          style={
            available
              ? {
                  background: "rgba(22,163,74,0.15)",
                  color: "#4ade80",
                  border: "1px solid rgba(22,163,74,0.3)",
                }
              : {
                  background: "rgba(245,197,24,0.1)",
                  color: "var(--gold)",
                  border: "1px solid rgba(245,197,24,0.2)",
                }
          }
        >
          {tag}
        </span>
      )}

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-3"
        style={{ background: "var(--surface-4)" }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl mb-1 text-white leading-none"
        style={{ letterSpacing: "0.04em" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-[12px] leading-snug" style={{ color: "var(--text-muted)" }}>
        {description}
      </p>

      {/* CTA */}
      {available && (
        <div
          className="mt-3 text-[11px] font-bold uppercase tracking-wider"
          style={{ color: "var(--red)" }}
        >
          Jugar ahora →
        </div>
      )}
    </button>
  );
}
