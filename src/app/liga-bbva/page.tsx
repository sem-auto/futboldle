import type { Metadata } from "next";
import Link from "next/link";
import BBVASeasonHub from "@/components/BBVASeasonHub";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { activeTop10Challenges } from "@/data/top10Challenges";
import { seoRankings } from "@/lib/seoIndex";

const SITE_URL = "https://futboldle.es";
const title = "Liga BBVA 2005-2016 | Minijuegos, Hombres BBVA y rankings - Futboldle";
const description = "Juega a Futboldle Liga BBVA: Wordle BBVA, Trayectoria, Top10, cromos, rankings y jugadores míticos de la Liga BBVA 2005-2016.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/liga-bbva` },
  keywords: ["hombres bbva", "liga bbva 2005 2016", "wordle bbva", "minijuegos liga española", "fútbol nostalgia", "jugadores liga bbva"],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/liga-bbva`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Futboldle Liga BBVA" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Futboldle Liga BBVA",
  url: `${SITE_URL}/liga-bbva`,
  description,
  applicationCategory: "Game",
  gamePlatform: "Web",
  genre: ["Football trivia", "Word game", "Sports nostalgia"],
  inLanguage: "es",
};

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Futboldle", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Liga BBVA", item: `${SITE_URL}/liga-bbva` },
  ],
};

function rankingHref(slug: string) {
  return seoRankings.some(ranking => ranking.slug === slug) ? `/rankings/${slug}` : "/top10-bbva";
}

const rankingLinks = [
  { label: "Máximos goleadores BBVA", href: rankingHref("maximos-goleadores-liga-bbva"), detail: "Ranking acumulado 2005-2016" },
  { label: "Goleadores más jóvenes BBVA", href: "/top10-bbva", detail: "Top10 de archivo" },
  { label: "Más partidos BBVA", href: rankingHref("jugadores-con-mas-partidos-liga-bbva"), detail: "Once temporadas de memoria" },
  { label: "Top10 BBVA", href: "/top10-bbva", detail: "Reto diario histórico" },
];

export default function LigaBBVALandingPage() {
  const bbvaCount = bbvaPlayers.length;
  const topCount = activeTop10Challenges.length;

  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Volver a Futboldle</Link>

        <section
          className="relative overflow-hidden rounded-[28px] px-5 py-7 md:px-8 md:py-10"
          style={{
            color: "white",
            background:
              "radial-gradient(circle at 88% 10%, rgba(255,255,255,0.15), transparent 18rem), linear-gradient(135deg,#7f1414 0%,#bd241c 48%,#171717 100%)",
            boxShadow: "0 18px 40px rgba(80,20,10,0.22)",
          }}
        >
          <div className="absolute right-5 top-4 hidden md:block font-bebas text-[130px] leading-none opacity-10">BBVA</div>
          <div className="absolute right-10 bottom-3 hidden md:block rotate-[-8deg] rounded-2xl border border-white/15 bg-white/10 px-7 py-5 shadow-2xl">
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/60">Archivo</div>
            <div className="font-bebas text-[48px] leading-none">05-16</div>
          </div>
          <div className="relative max-w-3xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">Temporada principal</div>
            <h1 className="font-bebas text-[56px] md:text-[86px] leading-none mt-2">Liga BBVA 2005-2016</h1>
            <p className="text-[15px] md:text-[18px] text-white/82 mt-3 max-w-2xl">
              Hombres BBVA, cromos, rankings y minijuegos diarios para recordar la Liga que no volverá.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="#retos-bbva" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ background: "#ffd04a", color: "#151515" }}>
                Jugar ahora
              </Link>
              <Link href="#rankings-bbva" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>
                Ver rankings BBVA
              </Link>
            </div>
          </div>
        </section>

        <section id="retos-bbva" className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 28px rgba(0,0,0,0.07)" }}>
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#b47611" }}>Retos diarios y extras</div>
              <h2 className="font-bebas text-[38px] leading-none" style={{ color: "#151515" }}>Juegos BBVA</h2>
            </div>
            <span className="hidden sm:inline-flex text-[11px] font-semibold px-3 py-1 rounded-full" style={{ color: "#8a281d", background: "#fff1e8" }}>
              Wordle · Trayectoria · Top10 · Cromos
            </span>
          </div>
          <BBVASeasonHub />
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Jugadores BBVA", value: bbvaCount },
            { label: "Retos y Top10", value: topCount },
            { label: "Temporadas", value: 11 },
            { label: "Periodo", value: "2005-2016" },
          ].map(item => (
            <div key={item.label} className="rounded-2xl p-4" style={{ background: "#fffaf0", border: "1px solid rgba(180,118,17,0.24)" }}>
              <div className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#b47611" }}>{item.label}</div>
              <div className="font-bebas text-[34px] leading-none mt-2" style={{ color: "#151515" }}>{item.value}</div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4">
          <article className="rounded-[24px] p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#b47611" }}>Archivo editorial</div>
            <h2 className="font-bebas text-[40px] leading-none mt-2" style={{ color: "#151515" }}>Hombres BBVA</h2>
            <p className="text-[14px] leading-relaxed mt-3" style={{ color: "#55515a" }}>
              Jugadores de culto, delanteros de domingo, porteros míticos, mediapuntas olvidados y equipos que marcaron una época.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
              {[
                { href: "/que-son-los-hombres-bbva", label: "Qué son los Hombres BBVA" },
                { href: "/100-hombres-bbva", label: "100 Hombres BBVA" },
                { href: "/jugadores-liga-bbva-2005-2016", label: "Jugadores Liga BBVA 2005-2016" },
              ].map(link => (
                <Link key={link.href} href={link.href} className="rounded-xl px-3 py-3 text-[12px] font-semibold" style={{ background: "#f8f5f0", color: "#171717", border: "1px solid rgba(0,0,0,0.06)" }}>
                  {link.label} →
                </Link>
              ))}
            </div>
          </article>

          <article id="rankings-bbva" className="rounded-[24px] p-5" style={{ background: "#191716", color: "white" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#ffd04a" }}>Rankings BBVA</div>
            <h2 className="font-bebas text-[40px] leading-none mt-2">Listas históricas</h2>
            <div className="mt-4 flex flex-col gap-2">
              {rankingLinks.map(link => (
                <Link key={link.label} href={link.href} className="rounded-xl p-3 flex items-center justify-between gap-3" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span>
                    <span className="block text-[13px] font-semibold">{link.label}</span>
                    <span className="block text-[10px] text-white/58 mt-0.5">{link.detail}</span>
                  </span>
                  <span className="text-[14px] text-white/70">→</span>
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[24px] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ background: "linear-gradient(135deg,#fff7df,#ffffff)", border: "1px solid rgba(180,118,17,0.24)" }}>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#b47611" }}>La Liga que no volverá</div>
            <h2 className="font-bebas text-[36px] leading-none mt-1" style={{ color: "#151515" }}>Empezar reto BBVA</h2>
            <p className="text-[13px] mt-1" style={{ color: "#65616a" }}>Wordle, Trayectoria, Top10 y cromos diarios.</p>
          </div>
          <Link href="#retos-bbva" className="rounded-2xl px-5 py-3 text-center font-oswald font-semibold uppercase text-[13px]" style={{ background: "#18181b", color: "white" }}>
            Empezar reto BBVA
          </Link>
        </section>
      </div>
    </main>
  );
}
