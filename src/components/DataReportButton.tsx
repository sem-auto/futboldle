"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { submitDataReport } from "@/lib/communityApi";

const REPORTS_KEY = "fbl-data-reports-v1";
const OPTIONS = ["Solucion incorrecta", "Pista incorrecta", "Estadistica incorrecta", "Nombre o texto roto", "Otro problema"];

export default function DataReportButton({ modeId, challengeId, label = "Reportar un dato" }: { modeId: string; challengeId: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function report(issue: string) {
    const entry = { modeId, challengeId, issue, path: window.location.pathname, createdAt: new Date().toISOString() };
    try {
      const parsed = JSON.parse(localStorage.getItem(REPORTS_KEY) ?? "[]");
      const reports = Array.isArray(parsed) ? parsed : [];
      localStorage.setItem(REPORTS_KEY, JSON.stringify([...reports, entry].slice(-100)));
    } catch {}
    trackEvent("data_issue_reported", entry);
    void submitDataReport(entry);
    setSent(true);
    setTimeout(() => { setSent(false); setOpen(false); }, 1400);
  }

  return <div className="relative"><button onClick={() => setOpen(value => !value)} className="text-[10px] font-semibold underline underline-offset-2" style={{ color: "#8a8170" }}>{sent ? "Reporte enviado" : label}</button>{open && !sent && <div className="absolute z-50 bottom-7 right-0 w-56 rounded-xl p-2" style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 10px 28px rgba(0,0,0,0.14)" }}><div className="text-[9px] uppercase font-semibold tracking-[0.14em] px-2 py-1" style={{ color: "#9a9a8a" }}>Que esta mal?</div>{OPTIONS.map(option => <button key={option} onClick={() => report(option)} className="w-full text-left rounded-lg px-2 py-2 text-[11px] hover:bg-gray-50" style={{ color: "#18181b" }}>{option}</button>)}</div>}</div>;
}
