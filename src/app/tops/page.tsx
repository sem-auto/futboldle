"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getDailyTop10, top10Challenges } from "@/data/top10Challenges";
import type { Top10Category } from "@/data/top10Challenges";

const FILTERS: Array<"TODOS" | Top10Category> = ["TODOS", "GOLEADORES", "ASISTENCIAS", "PORTEROS", "CLUBES"];

export default function TopsPage() {
  const [filter, setFilter] = useState<"TODOS" | Top10Category>("TODOS");
  const [completed, setCompleted] = useState<string[]>([]);
  const dailyTop = useMemo(() => getDailyTop10(), []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fbl-top-completed-v1");
      const parsed = raw ? JSON.parse(raw) : [];
      setCompleted(Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : []);
    } catch {}
  }, []);

  const visible = filter === "TODOS" ? top10Challenges : top10Challenges.filter(top => top.category === filter);

  function statusFor(id: string) {
    if (completed.includes(id)) return { label: "✅ Completado", color: "#1e6b2e", bg: "#f0faf2" };
    if (id === dailyTop.id) return { label: "🟡 En progreso", color: "#c8920a", bg: "#fff8e6" };
    return { label: "🔒 Bloqueado", color: "#9a9a8a", bg: "#f3efe8" };
  }

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[11px] font-semibold" style={{ color: "#6b6b72" }}>← Volver</Link>
          <Link href="/perfil" className="text-[11px] font-semibold" style={{ color: "#c8920a" }}>Perfil</Link>
        </div>

        <section className="rounded-2xl px-5 py-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#1a4fa0" }}>Archivo histórico BBVA</div>
          <h1 className="font-bebas text-[36px] leading-none" style={{ color: "#18181b" }}>CATÁLOGO DE TOPS</h1>
          <p className="text-[12px]" style={{ color: "#9a9a8a" }}>Goleadores, asistencias, porteros y clubes de la Liga BBVA 2005-2016.</p>
        </section>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {FILTERS.map(item => (
            <button key={item} onClick={() => setFilter(item)}
              className="font-oswald font-semibold uppercase tracking-wider text-[10px] px-3 py-2 rounded-lg whitespace-nowrap"
              style={{ background: filter === item ? "#18181b" : "white", color: filter === item ? "white" : "#6b6b72", border: "1px solid rgba(0,0,0,0.08)" }}>
              {item}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {visible.map(top => {
            const status = statusFor(top.id);
            return (
              <article key={top.id} className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#1a4fa0" }}>{top.category}</div>
                    <h2 className="font-bebas text-[24px] leading-none" style={{ color: "#18181b" }}>{top.title}</h2>
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap" style={{ color: status.color, background: status.bg }}>
                    {status.label}
                  </span>
                </div>
                <p className="text-[11px] mb-2" style={{ color: "#9a9a8a" }}>{top.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold" style={{ color: "#6b6b72" }}>{top.kind} · {top.answers.length} puestos</span>
                  {top.extendedAnswers && <span className="text-[10px] font-semibold" style={{ color: "#c8920a" }}>Top20 desbloqueable</span>}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
