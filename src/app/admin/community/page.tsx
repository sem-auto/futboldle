"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Metric = {
  modeId: string;
  modeName: string;
  challengeId: string;
  plays: number;
  wins: number;
  starts: number;
  abandons: number;
  completion: number;
  averageAttempts: number | null;
  difficulty: string;
  pendingReports: number;
  reportCount: number;
  status: "active" | "needs_review" | "disabled";
};

type Report = {
  id: string;
  mode_id: string;
  challenge_id: string;
  issue: string;
  message?: string;
  path?: string;
  status?: string;
  created_at: string;
};

type Summary = {
  modes: Metric[];
  mostPlayed: Metric[];
  mostAbandoned: Metric[];
  hardestChallenges: Metric[];
  challengeAudit: Metric[];
};

const STATUSES = ["pending", "reviewed", "fixed", "rejected"];

function formatPercent(value: number) {
  return `${Number.isFinite(value) ? value : 0}%`;
}

function MetricCard({ title, value, detail }: { title: string; value: string | number; detail?: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="text-[9px] uppercase font-semibold tracking-[0.18em]" style={{ color: "#9a9a8a" }}>{title}</div>
      <div className="font-bebas text-[34px] leading-none mt-1" style={{ color: "#18181b" }}>{value}</div>
      {detail ? <div className="text-[11px] mt-1" style={{ color: "#8a8170" }}>{detail}</div> : null}
    </div>
  );
}

function Table({ title, rows, empty }: { title: string; rows: Metric[]; empty: string }) {
  return (
    <section className="rounded-2xl p-4 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{title}</h2>
      {rows.length === 0 ? <p className="text-[12px] mt-3" style={{ color: "#9a9a8a" }}>{empty}</p> : (
        <table className="w-full mt-3 text-[11px]">
          <thead>
            <tr className="text-left" style={{ color: "#9a9a8a" }}>
              <th className="py-2">Modo</th>
              <th>Reto</th>
              <th>Inicios</th>
              <th>Partidas</th>
              <th>% victoria</th>
              <th>Intentos</th>
              <th>Abandonos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={`${row.modeId}-${row.challengeId || "mode"}`} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <td className="py-2 font-semibold">{row.modeName}</td>
                <td>{row.challengeId || "modo completo"}</td>
                <td>{row.starts}</td>
                <td>{row.plays}</td>
                <td>{formatPercent(row.completion)}</td>
                <td>{row.averageAttempts ?? "-"}</td>
                <td>{row.abandons}</td>
                <td>
                  <span className="rounded-full px-2 py-1 font-semibold" style={{ background: row.status === "needs_review" ? "#fff8e6" : "#f0faf2", color: row.status === "needs_review" ? "#8a6200" : "#1e6b2e" }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default function AdminCommunityPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [communityResponse, reportsResponse] = await Promise.all([
        fetch("/api/community", { cache: "no-store" }),
        fetch("/api/reports", { cache: "no-store" }),
      ]);
      const community = await communityResponse.json();
      const reportData = await reportsResponse.json();
      setSummary(community?.summary ?? null);
      setReports(Array.isArray(reportData?.reports) ? reportData.reports : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateReport(id: string, status: string) {
    await fetch("/api/reports", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setReports(current => current.map(report => report.id === id ? { ...report, status } : report));
  }

  const pendingReports = reports.filter(report => (report.status ?? "pending") === "pending");
  const totals = useMemo(() => {
    const modes = summary?.modes ?? [];
    return {
      plays: modes.reduce((sum, row) => sum + row.plays, 0),
      starts: modes.reduce((sum, row) => sum + row.starts, 0),
      wins: modes.reduce((sum, row) => sum + row.wins, 0),
      abandons: modes.reduce((sum, row) => sum + row.abandons, 0),
    };
  }, [summary]);

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"←"} Futboldle</Link>
          <button onClick={load} className="rounded-lg px-3 py-2 text-[11px] font-semibold" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            Actualizar
          </button>
        </div>

        <section className="rounded-3xl p-5" style={{ background: "linear-gradient(135deg,#18181b,#174ea6)", color: "white" }}>
          <div className="text-[9px] uppercase font-semibold tracking-[0.22em] text-white/60">Panel admin</div>
          <h1 className="font-bebas text-[44px] leading-none mt-1">COMUNIDAD</h1>
          <p className="text-[12px] text-white/70 mt-1">Datos reales de Supabase para ver qué juegos enganchan y qué retos necesitan revisión.</p>
        </section>

        {loading ? <div className="rounded-2xl p-5" style={{ background: "white" }}>Cargando datos...</div> : (
          <>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCard title="Inicios" value={totals.starts} detail="reto abierto" />
              <MetricCard title="Partidas" value={totals.plays} detail="terminadas" />
              <MetricCard title="Victorias" value={totals.plays ? formatPercent(Math.round((totals.wins / totals.plays) * 100)) : "0%"} detail={`${totals.wins}/${totals.plays}`} />
              <MetricCard title="Reportes pendientes" value={pendingReports.length} detail={`${reports.length} totales`} />
            </section>

            <Table title="Juegos más jugados" rows={summary?.mostPlayed ?? []} empty="Todavía no hay partidas globales." />
            <Table title="Juegos con más abandonos" rows={summary?.mostAbandoned ?? []} empty="Los abandonos aparecerán cuando haya eventos de inicio suficientes." />
            <Table title="Retos con menos completados" rows={summary?.hardestChallenges ?? []} empty="Aún no hay retos con muestra." />
            <Table title="Auditoría de retos" rows={summary?.challengeAudit ?? []} empty="No hay retos marcados para revisar." />

            <section className="rounded-2xl p-4 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
              <h2 className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>REPORTES PENDIENTES</h2>
              {reports.length === 0 ? <p className="text-[12px] mt-3" style={{ color: "#9a9a8a" }}>Todavía no hay reportes.</p> : (
                <table className="w-full mt-3 text-[11px]">
                  <thead>
                    <tr className="text-left" style={{ color: "#9a9a8a" }}>
                      <th className="py-2">Fecha</th>
                      <th>Modo</th>
                      <th>Reto</th>
                      <th>Problema</th>
                      <th>Mensaje</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map(report => (
                      <tr key={report.id} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <td className="py-2">{new Date(report.created_at).toLocaleString("es-ES")}</td>
                        <td className="font-semibold">{report.mode_id}</td>
                        <td>{report.challenge_id}</td>
                        <td>{report.issue}</td>
                        <td>{report.message || report.path || "-"}</td>
                        <td>
                          <select value={report.status ?? "pending"} onChange={event => updateReport(report.id, event.target.value)} className="rounded-lg px-2 py-1" style={{ border: "1px solid rgba(0,0,0,0.12)" }}>
                            {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
