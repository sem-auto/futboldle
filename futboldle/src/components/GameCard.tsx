"use client";

interface GameCardProps {
  icon: string;
  title: string;
  description: string;
  available: boolean;
  onClick?: () => void;
}

export default function GameCard({ icon, title, description, available, onClick }: GameCardProps) {
  return (
    <button
      onClick={available ? onClick : undefined}
      disabled={!available}
      className="w-full text-left rounded-xl p-4 transition-all duration-200 relative overflow-hidden"
      style={{
        background: "var(--bg3)",
        border: `1px solid ${available ? "var(--b2)" : "var(--b1)"}`,
        cursor: available ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        if (available) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--b-gold)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "";
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      {!available && (
        <span
          className="absolute top-2.5 right-2.5 text-[8px] font-oswald font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded"
          style={{ background: "var(--gold-dim)", color: "var(--gold)", border: "1px solid var(--b-gold)" }}
        >
          Pronto
        </span>
      )}
      <div className="text-2xl mb-2.5">{icon}</div>
      <div
        className="font-oswald font-semibold text-[15px] leading-tight mb-1"
        style={{ color: available ? "var(--cream)" : "var(--cream-dim)" }}
      >
        {title}
      </div>
      <p className="text-[11px] leading-snug" style={{ color: "var(--cream-dim)" }}>
        {description}
      </p>
      {available && (
        <div className="mt-3 text-[10px] font-oswald font-semibold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
          Jugar ahora →
        </div>
      )}
    </button>
  );
}
