import Link from "next/link";

export default function SeoGameLanding({ eyebrow, title, description, bullets }: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver a Futboldle</Link>
        <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          <div className="px-5 py-7" style={{ background: "linear-gradient(135deg,#18181b,#c8920a)", color: "white" }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">{eyebrow}</div>
            <h1 className="font-bebas text-[54px] leading-none mt-2">{title}</h1>
            <p className="text-[15px] text-white/80 mt-2">{description}</p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bullets.map(item => (
              <article key={item} className="rounded-2xl p-4" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
                <p className="text-[12px]" style={{ color: "#3a3a3f" }}>{item}</p>
              </article>
            ))}
          </div>
          <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <section className="rounded-2xl p-4" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
              <h2 className="font-bebas text-[26px] leading-none" style={{ color: "#18181b" }}>Cómo se juega</h2>
              <p className="text-[12px] leading-relaxed mt-2" style={{ color: "#5f5f66" }}>
                Entra cada día, resuelve el reto y comparte el resultado. Futboldle mezcla wordle de fútbol, rankings,
                trayectorias y cromos con nostalgia de la Liga BBVA y Mundiales.
              </p>
            </section>
            <section className="rounded-2xl p-4" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
              <h2 className="font-bebas text-[26px] leading-none" style={{ color: "#18181b" }}>Por qué engancha</h2>
              <p className="text-[12px] leading-relaxed mt-2" style={{ color: "#5f5f66" }}>
                Partidas rápidas, jugadores reconocibles, resultados compartibles y cromos desbloqueables. La idea es
                jugar, recordar un nombre y volver mañana.
              </p>
            </section>
          </div>
          <nav className="px-4 pb-4 flex flex-wrap gap-2">
            {[
              ["Liga BBVA", "/liga-bbva"],
              ["Mundialdle", "/mundialdle"],
              ["Álbum", "/album"],
              ["Tops", "/tops"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-[11px] font-semibold px-3 py-2 rounded-xl"
                style={{ background: "#fffaf0", color: "#8a6200", border: "1px solid rgba(200,146,10,0.20)" }}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pb-4">
            <Link href="/" className="block text-center font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
              style={{ background: "#18181b", color: "white" }}>
              Jugar ahora
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
