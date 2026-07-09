"use client";

type CommunityStatsView = {
  label: string;
  completion: number;
  attempts?: number | null;
  sample?: number;
  real?: boolean;
};

export default function CommunityStatsPanel({ stats, tone = "#174ea6" }: { stats: CommunityStatsView; tone?: string }) {
  if (!stats.real) return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-xl px-3 py-2" style={{ background: `${tone}10`, border: `1px solid ${tone}22` }}>
        <div className="text-[8px] uppercase font-semibold tracking-[0.14em]" style={{ color: "#9a9a8a" }}>Dificultad</div>
        <div className="font-oswald font-semibold text-[13px]" style={{ color: tone }}>{stats.label}</div>
      </div>
      <div className="rounded-xl px-3 py-2" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="text-[8px] uppercase font-semibold tracking-[0.14em]" style={{ color: "#9a9a8a" }}>Completan</div>
        <div className="font-oswald font-semibold text-[13px]" style={{ color: "#18181b" }}>{stats.completion}%</div>
      </div>
      <div className="rounded-xl px-3 py-2" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="text-[8px] uppercase font-semibold tracking-[0.14em]" style={{ color: "#9a9a8a" }}>Partidas</div>
        <div className="font-oswald font-semibold text-[13px]" style={{ color: "#18181b" }}>{stats.sample}</div>
      </div>
      {stats.attempts ? (
        <div className="col-span-3 text-[10px] font-semibold text-center" style={{ color: "#8a8170" }}>
          Intentos medios: {stats.attempts}
        </div>
      ) : null}
    </div>
  );
}
