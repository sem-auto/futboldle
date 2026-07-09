import type { Metadata } from "next";
import Link from "next/link";
import { activeTop10Challenges, getDailyTop10 } from "@/data/top10Challenges";

const SITE_URL = "https://futboldle.es";
const title = "Top10 BBVA | Completa las listas históricas";
const description = "Demuestra cuánto recuerdas de la Liga BBVA completando rankings históricos de jugadores.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/top10-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/top10-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

function ExampleRow({ n, label, value, found }: { n: number; label: string; value: string; found?: boolean }) {
  return (
    <div className="rounded-xl px-3 py-2 flex items-center gap-3" style={{ background: found ? "#eef6f0" : "#f8f5f0", border: `1px solid ${found ? "rgba(30,107,46,0.18)" : "rgba(0,0,0,0.06)"}` }}>
      <span className="grid h-8 w-8 place-items-center rounded-full font-bebas text-[20px]" style={{ background: found ? "#1e6b2e" : "#e8e3d8", color: found ? "white" : "#8a8170" }}>{n}</span>
      <div>
        <div className="font-semibold text-[13px]" style={{ color: found ? "#1e6b2e" : "#18181b" }}>{label}</div>
        <div className="text-[10px]" style={{ color: "#8a8170" }}>{value}</div>
      </div>
    </div>
  );
}

export default function Top10BBVALanding() {
  const daily = getDailyTop10();
  const sample = daily.answers.slice(0, 5);

  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Volver a Futboldle</Link>

        <section className="relative overflow-hidden rounded-[28px] px-5 py-7 md:px-8 md:py-10" style={{ background: "linear-gradient(135deg,#123d86 0%,#174ea6 48%,#101827 100%)", color: "white", boxShadow: "0 18px 40px rgba(23,78,166,0.22)" }}>
          <div className="absolute right-5 -top-8 hidden md:block font-bebas text-[170px] leading-none opacity-10">10</div>
          <div className="relative z-10 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-white/70">Rankings Liga BBVA</div>
            <h1 className="font-bebas text-[62px] md:text-[92px] leading-none mt-2">Top10 BBVA</h1>
            <p className="text-[15px] md:text-[18px] text-white/82 mt-3 max-w-2xl">Completa listas históricas de la Liga BBVA: goles, asistencias, porterías, clubes y jugadores de culto.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/tops" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ background: "#ffd04a", color: "#151515" }}>Jugar reto del día</Link>
              <Link href="/rankings" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>Ver rankings</Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4">
          <article className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 28px rgba(0,0,0,0.07)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#174ea6" }}>Reto destacado</div>
            <h2 className="font-bebas text-[40px] leading-none mt-1">{daily.title}</h2>
            <p className="text-[13px] mt-2" style={{ color: "#615f67" }}>{daily.period} · {daily.criterion}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {sample.map((answer, index) => (
                <ExampleRow key={answer.position} n={answer.position} label={index < 2 ? answer.displayName : "?????"} value={answer.detail} found={index < 2} />
              ))}
            </div>
          </article>

          <aside className="rounded-[24px] p-4 md:p-5" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.24)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#b47611" }}>Cómo se juega</div>
            <h2 className="font-bebas text-[40px] leading-none mt-1">Reto, progreso y memoria</h2>
            <div className="grid grid-cols-1 gap-3 mt-4">
              {[
                ["1", "Ves posiciones y estadísticas reales."],
                ["2", "Escribes jugadores con alias y apodos."],
                ["3", "Completas el Top10 y desbloqueas cromos."],
              ].map(([n, text]) => (
                <div key={n} className="rounded-xl p-3 flex items-center gap-3" style={{ background: "white", border: "1px solid rgba(200,146,10,0.18)" }}>
                  <span className="grid h-8 w-8 place-items-center rounded-full font-bebas text-[20px]" style={{ background: "#ffd04a", color: "#18181b" }}>{n}</span>
                  <span className="text-[13px] font-semibold" style={{ color: "#3a3a3f" }}>{text}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            ["Fácil", "Goleadores y jugadores muy reconocibles."],
            ["Medio", "Mezcla de estrellas y Hombres BBVA."],
            ["Difícil", "Listas para enfermos de la era 2005-2016."],
          ].map(([level, text]) => (
            <article key={level} className="fbl-card rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(23,78,166,0.14)" }}>
              <span className="fbl-visual-mark">{level[0]}</span>
              <div className="relative z-10 text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#174ea6" }}>Nivel</div>
              <h2 className="relative z-10 font-bebas text-[34px] leading-none mt-2">{level}</h2>
              <p className="relative z-10 text-[12px] mt-1" style={{ color: "#66646a" }}>{text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[24px] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ background: "linear-gradient(135deg,#eef3ff,#ffffff)", border: "1px solid rgba(23,78,166,0.18)" }}>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#174ea6" }}>{activeTop10Challenges.length} rankings activos</div>
            <h2 className="font-bebas text-[36px] leading-none mt-1">¿Puedes completar el Top10 de hoy?</h2>
          </div>
          <Link href="/tops" className="rounded-2xl px-5 py-3 text-center font-oswald font-semibold uppercase text-[13px]" style={{ background: "#18181b", color: "white" }}>Empezar Top10</Link>
        </section>
      </div>
    </main>
  );
}
