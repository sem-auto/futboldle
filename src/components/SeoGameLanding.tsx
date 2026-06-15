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
