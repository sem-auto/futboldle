import Link from "next/link";

function visualFor(title: string) {
  const text = title.toLowerCase();
  if (text.includes("wordle")) return { mark: "ABC", accent: "#c8920a", sample: ["F", "A", "L", "C", "A", "O"] };
  if (text.includes("top")) return { mark: "10", accent: "#174ea6", sample: ["1", "2", "3"] };
  if (text.includes("trayectoria")) return { mark: "→", accent: "#1e6b2e", sample: ["CLUB", "CLUB", "POS"] };
  if (text.includes("mundial")) return { mark: "WC", accent: "#174ea6", sample: ["2010", "ESP", "9"] };
  return { mark: "F", accent: "#c8920a", sample: ["PJ", "G", "CLUB"] };
}

export default function SeoGameLanding({ eyebrow, title, description, bullets }: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  const visual = visualFor(title);

  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Volver a Futboldle</Link>

        <section className="relative overflow-hidden rounded-[28px] px-5 py-7 md:px-8 md:py-10" style={{ background: `linear-gradient(135deg,#18181b 0%,${visual.accent} 100%)`, color: "white", boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}>
          <div className="absolute right-5 -top-8 hidden md:block font-bebas text-[170px] leading-none opacity-10">{visual.mark}</div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 items-center">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">{eyebrow}</div>
              <h1 className="font-bebas text-[58px] md:text-[86px] leading-none mt-2">{title}</h1>
              <p className="text-[15px] md:text-[18px] text-white/82 mt-3 max-w-2xl">{description}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ background: "#ffd04a", color: "#151515" }}>Jugar ahora</Link>
                <Link href="/rankings" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>Ver archivo</Link>
              </div>
            </div>
            <div className="hidden md:block rounded-3xl p-4" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
              <div className="grid grid-cols-3 gap-2">
                {visual.sample.concat(visual.sample).slice(0, 6).map((item, index) => (
                  <span key={`${item}-${index}`} className="grid h-14 place-items-center rounded-xl font-bebas text-[24px]" style={{ background: index % 2 ? "rgba(255,255,255,0.16)" : "rgba(255,208,74,0.92)", color: index % 2 ? "white" : "#18181b" }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {bullets.map((item, index) => (
            <article key={item} className="fbl-card rounded-2xl p-4 min-h-[138px]" style={{ background: "white", border: `1px solid ${visual.accent}20` }}>
              <span className="fbl-visual-mark">{index + 1}</span>
              <div className="relative z-10 text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: visual.accent }}>Clave</div>
              <p className="relative z-10 text-[13px] font-semibold mt-3" style={{ color: "#3a3a3f" }}>{item}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <article className="rounded-2xl p-4" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>Cómo se juega</h2>
            <p className="text-[12px] leading-relaxed mt-2" style={{ color: "#5f5f66" }}>
              Entra cada día, resuelve el reto y comparte el resultado. Futboldle mezcla wordle de fútbol, rankings,
              trayectorias y cromos con nostalgia de la Liga BBVA y Mundiales.
            </p>
          </article>
          <article className="rounded-2xl p-4" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>Por qué engancha</h2>
            <p className="text-[12px] leading-relaxed mt-2" style={{ color: "#5f5f66" }}>
              Partidas rápidas, jugadores reconocibles, resultados compartibles y cromos desbloqueables. La idea es
              jugar, recordar un nombre y volver mañana.
            </p>
          </article>
        </section>

        <nav className="flex flex-wrap gap-2">
          {[
            ["Liga BBVA", "/liga-bbva"],
            ["Mundiales", "/world-cups"],
            ["Rankings", "/rankings"],
            ["Álbum", "/album"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-[11px] font-semibold px-3 py-2 rounded-xl"
              style={{ background: "#fffaf0", color: "#8a6200", border: "1px solid rgba(200,146,10,0.20)" }}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
