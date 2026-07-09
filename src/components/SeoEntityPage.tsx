import Link from "next/link";

type LinkItem = { href: string; label: string; detail?: string };

function initials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

export default function SeoEntityPage({
  eyebrow,
  title,
  description,
  facts,
  sections,
  links,
  ctaHref = "/",
  ctaLabel = "Jugar un reto diario",
}: {
  eyebrow: string;
  title: string;
  description: string;
  facts: Array<[string, string | number]>;
  sections: Array<{ title: string; body: string; items?: LinkItem[] }>;
  links: LinkItem[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const isWorld = /mundial/i.test(eyebrow);
  const accent = isWorld ? "#174ea6" : "#c8920a";
  const heroBg = isWorld
    ? "linear-gradient(135deg,#174ea6 0%,#112b63 48%,#101827 100%)"
    : "linear-gradient(135deg,#7f1414 0%,#bd241c 48%,#171717 100%)";

  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Volver a Futboldle</Link>
          <Link href={ctaHref} className="text-[12px] font-semibold" style={{ color: accent }}>{ctaLabel}</Link>
        </nav>

        <section className="relative overflow-hidden rounded-[28px] p-5 md:p-7" style={{ background: heroBg, color: "white", boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}>
          <div className="absolute right-5 -top-8 hidden md:block font-bebas text-[170px] leading-none opacity-10">{isWorld ? "WC" : "BBVA"}</div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[150px_1fr] gap-5 items-center">
            <div className="fbl-mini-cromo mx-auto md:mx-0 h-[190px] w-[132px] p-3 flex flex-col justify-between">
              <div className="rounded-xl h-[98px] grid place-items-center" style={{ background: `${accent}14`, border: `1px solid ${accent}28` }}>
                <span className="font-bebas text-[54px]" style={{ color: accent }}>{initials(title)}</span>
              </div>
              <div>
                <div className="text-[8px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#8a6200" }}>Cromo</div>
                <div className="font-bebas text-[24px] leading-none" style={{ color: "#18181b" }}>{title.split(" ").slice(-1)[0]}</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">{eyebrow}</div>
              <h1 className="font-bebas text-[52px] md:text-[82px] leading-none mt-2">{title}</h1>
              <p className="text-[14px] md:text-[16px] leading-relaxed text-white/82 mt-3 max-w-3xl">{description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {facts.slice(0, 4).map(([label, value]) => (
                  <span key={label} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)" }}>
                    {label}: {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {facts.map(([label, value]) => (
            <div key={label} className="rounded-2xl px-3 py-3" style={{ background: "#fffbf5", border: `1px solid ${accent}24` }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>{label}</div>
              <div className="font-bebas text-[25px] leading-none mt-1" style={{ color: "#18181b" }}>{value}</div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sections.map((section, index) => (
            <article key={section.title} className="fbl-card rounded-2xl p-4" style={{ background: index % 2 ? "#fffaf0" : "white", border: "1px solid rgba(0,0,0,0.06)" }}>
              <span className="fbl-visual-mark">{String(index + 1)}</span>
              <div className="relative z-10">
                <h2 className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>{section.title}</h2>
                <p className="text-[12px] leading-relaxed mt-2" style={{ color: "#5f5f66" }}>{section.body}</p>
                {section.items?.length ? (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {section.items.slice(0, 16).map(item => (
                      <Link key={item.href} href={item.href} className="text-[11px] font-semibold px-3 py-2 rounded-xl transition-transform hover:-translate-y-0.5" style={{ background: "white", color: "#3a3a3f", border: "1px solid rgba(0,0,0,0.07)" }}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[24px] p-4 md:p-5" style={{ background: isWorld ? "#eef3ff" : "#fffaf0", border: `1px solid ${accent}22` }}>
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: accent }}>Archivo conectado</div>
              <h2 className="font-bebas text-[36px] leading-none mt-1" style={{ color: "#18181b" }}>Enlaces relacionados</h2>
            </div>
            <Link href={ctaHref} className="hidden sm:inline-flex rounded-xl px-3 py-2 text-[11px] font-semibold" style={{ background: "#18181b", color: "white" }}>{ctaLabel}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {links.slice(0, 18).map(item => (
              <Link key={item.href} href={item.href} className="fbl-card rounded-xl px-3 py-2" style={{ background: "white", border: `1px solid ${accent}18` }}>
                <div className="text-[12px] font-semibold" style={{ color: accent }}>{item.label}</div>
                {item.detail ? <div className="text-[10px] mt-0.5" style={{ color: "#6b6b72" }}>{item.detail}</div> : null}
              </Link>
            ))}
          </div>
        </section>

        <Link href={ctaHref} className="block text-center font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-2xl" style={{ background: "#18181b", color: "white" }}>
          {ctaLabel}
        </Link>
      </div>
    </main>
  );
}
