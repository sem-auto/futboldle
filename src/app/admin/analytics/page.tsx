"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type EventEntry = { name: string; at: string; payload?: Record<string, unknown> };
type ReportEntry = { modeId: string; challengeId: string; issue: string; path: string; createdAt: string };

export default function LocalAnalyticsPage() {
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [reports, setReports] = useState<ReportEntry[]>([]);

  useEffect(() => {
    try {
      const eventData = JSON.parse(localStorage.getItem("fbl-analytics-log-v1") ?? "[]");
      const reportData = JSON.parse(localStorage.getItem("fbl-data-reports-v1") ?? "[]");
      setEvents(Array.isArray(eventData) ? eventData : []);
      setReports(Array.isArray(reportData) ? reportData : []);
    } catch {}
  }, []);

  const summary = useMemo(() => {
    const count = (name: string) => events.filter(event => event.name === name).length;
    return { started: count("challenge_started"), completed: count("challenge_completed"), failed: count("challenge_failed"), shared: count("challenge_shared") };
  }, [events]);

  const modes = useMemo(() => {
    const rows = new Map<string, { entered: number; started: number; completed: number; shared: number }>();
    for (const event of events) {
      const mode = String(event.payload?.modeId ?? event.payload?.game ?? "sin-modo");
      const row = rows.get(mode) ?? { entered: 0, started: 0, completed: 0, shared: 0 };
      if (event.name === "mode_entered") row.entered++;
      if (event.name === "challenge_started") row.started++;
      if (event.name === "challenge_completed") row.completed++;
      if (event.name === "challenge_shared") row.shared++;
      rows.set(mode, row);
    }
    return [...rows.entries()].filter(([mode]) => mode !== "sin-modo").sort((a, b) => b[1].started - a[1].started);
  }, [events]);

  return <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}><div className="max-w-5xl mx-auto flex flex-col gap-4"><div className="flex items-center justify-between"><Link href="/admin/audit" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Auditoria</Link><span className="text-[10px]" style={{ color: "#9a9a8a" }}>Datos de este navegador</span></div><section className="rounded-2xl p-5" style={{ background: "#18181b", color: "white" }}><div className="text-[9px] uppercase font-semibold tracking-[0.2em] text-white/60">Panel de pruebas</div><h1 className="font-bebas text-[40px] leading-none mt-1">ANALYTICS LOCAL</h1><p className="text-[11px] text-white/65 mt-1">Google Analytics contiene los datos globales. Esta vista sirve para comprobar eventos durante desarrollo.</p></section><section className="grid grid-cols-2 md:grid-cols-4 gap-2">{[["Iniciados",summary.started],["Completados",summary.completed],["Fallados",summary.failed],["Compartidos",summary.shared]].map(([label,value])=><div key={label} className="rounded-xl p-3" style={{ background:"white",border:"1px solid rgba(0,0,0,0.08)" }}><div className="text-[8px] uppercase font-semibold" style={{color:"#9a9a8a"}}>{label}</div><div className="font-bebas text-[30px]">{value}</div></div>)}</section><section className="rounded-2xl p-4 overflow-x-auto" style={{ background:"white",border:"1px solid rgba(0,0,0,0.08)" }}><h2 className="font-bebas text-[26px]">RENDIMIENTO POR MODO</h2><table className="w-full mt-3 text-[11px]"><thead><tr className="text-left" style={{color:"#9a9a8a"}}><th className="py-2">Modo</th><th>Entradas</th><th>Inicios</th><th>Completados</th><th>%</th><th>Compartidos</th></tr></thead><tbody>{modes.map(([mode,row])=><tr key={mode} style={{borderTop:"1px solid rgba(0,0,0,0.06)"}}><td className="py-2 font-semibold">{mode}</td><td>{row.entered}</td><td>{row.started}</td><td>{row.completed}</td><td>{row.started?Math.round(row.completed/row.started*100):0}%</td><td>{row.shared}</td></tr>)}</tbody></table></section><section className="rounded-2xl p-4" style={{ background:"white",border:"1px solid rgba(0,0,0,0.08)" }}><h2 className="font-bebas text-[26px]">REPORTES DE DATOS ({reports.length})</h2>{reports.length===0?<p className="text-[11px] mt-2" style={{color:"#9a9a8a"}}>Todavia no hay reportes en este navegador.</p>:<div className="flex flex-col gap-2 mt-3">{[...reports].reverse().map((report,index)=><div key={`${report.createdAt}-${index}`} className="rounded-xl px-3 py-2" style={{background:"#fff8e6"}}><div className="text-[11px] font-semibold">{report.modeId} · {report.issue}</div><div className="text-[9px]" style={{color:"#9a9a8a"}}>{report.challengeId} · {new Date(report.createdAt).toLocaleString("es-ES")}</div></div>)}</div>}</section></div></main>;
}
