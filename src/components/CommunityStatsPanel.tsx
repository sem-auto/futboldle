"use client";

type CommunityStatsView = {
  label: string;
  completion: number;
  attempts?: number | null;
  sample?: number;
  real?: boolean;
};

export default function CommunityStatsPanel({ stats, tone = "#174ea6" }: { stats: CommunityStatsView; tone?: string }) {
  if (!stats.real) {
    return (
      <div className="rounded-xl px-3 py-2 text-center" style={{ background: `${tone}10`, border: `1px solid ${tone}22`, color: "#8a8170" }}>
        <div className="text-[8px] uppercase font-semibold tracking-[0.14em]" style={{ color: "#9a9a8a" }}>Comunidad</div>
        <div className="font-oswald font-semibold text-[12px]" style={{ color: tone }}>Estadísticas en construcción</div>
      </div>
    );
  }

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
        <div className="text-[8px] uppercase font-semibold tracking-[0.14em]" style={{ color: "#9a9a8a" }}>{stats.real ? "Partidas" : "Muestra"}</div>
        <div className="font-oswald font-semibold text-[13px]" style={{ color: "#18181b" }}>{stats.real ? stats.sample : "estimado"}</div>
      </div>
      {stats.attempts ? (
        <div className="col-span-3 text-[10px] font-semibold text-center" style={{ color: "#8a8170" }}>
          Intentos medios: {stats.attempts}
        </div>
      ) : null}
    </div>
  );
}
