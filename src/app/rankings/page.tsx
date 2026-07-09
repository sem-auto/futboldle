import type { Metadata } from "next";
import Link from "next/link";
import { seoRankings } from "@/lib/seoIndex";

const SITE_URL = "https://futboldle.es";
const title = "Rankings de fútbol nostalgia - Futboldle";
const description = "Rankings de Liga BBVA, Mundiales, goleadores históricos y futbolistas míticos para jugar y descubrir en Futboldle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/rankings` },
  openGraph: { title, description, url: `${SITE_URL}/rankings`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

function RankingCard({ href, title, detail, tone = "#174ea6", mark = "10" }: { href: string; title: string; detail: string; tone?: string; mark?: string }) {
  return (
    <Link href={href} className="fbl-card rounded-2xl p-4 min-h-[150px] flex flex-col justify-between" style={{ background: "white", border: `1px solid ${tone}2e` }}>
      <span className="fbl-visual-mark">{mark}</span>
      <div className="relative z-10">
        <div className="grid h-10 w-10 place-items-center rounded-xl font-bebas text-[22px]" style={{ background: `${tone}14`, color: tone, border: `1px solid ${tone}25` }}>{mark}</div>
        <h2 className="font-bebas text-[30px] leading-none mt-3" style={{ color: "#18181b" }}>{title}</h2>
        <p className="text-[12px] mt-1" style={{ color: "#66646a" }}>{detail}</p>
      </div>
      <span className="relative z-10 mt-4 text-[12px] font-semibold" style={{ color: tone }}>Abrir ranking →</span>
    </Link>
  );
}

export default function RankingsPage() {
  const published = seoRankings.filter(ranking => ranking.status === "published");
  const bbva = published.filter(ranking => /bbva|liga|valencia|sevilla|villarreal|athletic|atletico|madrid|barcelona/i.test(ranking.slug)).slice(0, 8);
  const popular = published.slice(0, 6);
  const latest = published.slice(-6).reverse();

  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Volver a Futboldle</Link>

        <section className="relative overflow-hidden rounded-[28px] px-5 py-7 md:px-8 md:py-10" style={{ background: "linear-gradient(135deg,#18181b 0%,#173466 48%,#c8920a 100%)", color: "white", boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}>
          <div className="absolute right-5 -top-8 hidden md:block font-bebas text-[170px] leading-none opacity-10">TOP</div>
          <div className="relative z-10 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-white/70">Archivo Futboldle</div>
            <h1 className="font-bebas text-[62px] md:text-[92px] leading-none mt-2">Rankings</h1>
            <p className="text-[15px] md:text-[18px] text-white/82 mt-3 max-w-2xl">
              Listas históricas para jugar, discutir y recordar: goleadores, asistentes, porterías, clubes y Mundiales.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/top10-bbva" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ background: "#ffd04a", color: "#151515" }}>Jugar Top10 BBVA</Link>
              <Link href="/world-cups/top10" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>Top10 Mundial</Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4">
          <article className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#174ea6" }}>Destacados</div>
            <h2 className="font-bebas text-[38px] leading-none mt-1">Rankings populares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {popular.map((ranking, index) => (
                <RankingCard key={ranking.slug} href={`/rankings/${ranking.slug}`} title={ranking.title} detail={ranking.description} tone={index % 2 ? "#c8920a" : "#174ea6"} mark={String(index + 1)} />
              ))}
            </div>
          </article>

          <aside className="rounded-[24px] p-4 md:p-5" style={{ background: "#191716", color: "white" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#ffd04a" }}>Buscador futuro</div>
            <h2 className="font-bebas text-[38px] leading-none mt-1">Encuentra una lista</h2>
            <p className="text-[13px] text-white/70 mt-2">La estructura ya está preparada para buscar por jugador, club, temporada, Mundial o categoría.</p>
            <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Categorías</div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["BBVA", "Mundiales", "Goles", "Asistencias", "Porteros", "Clubes"].map(item => (
                  <span key={item} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "rgba(255,255,255,0.10)" }}>{item}</span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#b47611" }}>Liga BBVA</div>
            <h2 className="font-bebas text-[36px] leading-none mt-1">Rankings BBVA</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {bbva.map(ranking => <RankingCard key={ranking.slug} href={`/rankings/${ranking.slug}`} title={ranking.title} detail="Ranking de archivo BBVA" tone="#b81c14" mark="BB" />)}
            </div>
          </div>

          <div className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#174ea6" }}>Últimos añadidos</div>
            <h2 className="font-bebas text-[36px] leading-none mt-1">Archivo vivo</h2>
            <div className="flex flex-col gap-2 mt-4">
              {latest.map(ranking => (
                <Link key={ranking.slug} href={`/rankings/${ranking.slug}`} className="rounded-xl p-3 flex items-center justify-between" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <span className="text-[13px] font-semibold">{ranking.title}</span>
                  <span className="text-[12px]" style={{ color: "#174ea6" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
