import Link from "next/link";

export default function SeoContentIndex({ eyebrow, title, description, ideas }: {
  eyebrow: string;
  title: string;
  description: string;
  ideas: string[];
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
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ideas.map((idea) => (
              <article key={idea} className="rounded-2xl p-4" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
                <p className="text-[13px] font-semibold" style={{ color: "#18181b" }}>{idea}</p>
                <p className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>Próximamente</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
