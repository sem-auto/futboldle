import Link from "next/link";

export default function PlayableGameSeo({
  seasonHref,
  seasonLabel,
  title,
  description,
  bullets,
  children,
}: {
  seasonHref: string;
  seasonLabel: string;
  title: string;
  description: string;
  bullets: string[];
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <Link href={seasonHref} className="inline-flex w-fit text-[12px] font-semibold" style={{ color: "#6b6b72" }}>
          {"\u2190"} {seasonLabel}
        </Link>

        <section aria-labelledby="game-title">
          <h1 id="game-title" className="sr-only">{title}</h1>
          {children}
        </section>

        <section className="rounded-2xl p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#c8920a" }}>Archivo Futboldle</div>
          <h2 className="mt-1 font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>{title}</h2>
          <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "#5f5f66" }}>{description}</p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {bullets.map((bullet, index) => (
              <div key={bullet} className="rounded-xl px-3 py-2.5 text-[11px] font-semibold" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.16)", color: "#5f5f66" }}>
                <span className="mr-1.5 font-bebas text-[18px]" style={{ color: "#c8920a" }}>{index + 1}</span>
                {bullet}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
