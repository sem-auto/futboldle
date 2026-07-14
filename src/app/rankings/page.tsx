import type { Metadata } from "next";
import Link from "next/link";
import { cleanText, seoRankings } from "@/lib/seoIndex";
import { activeWorldCupTop10Challenges } from "@/data/worldcups/top10";

const SITE_URL = "https://futboldle.es";
const title = "Rankings de fútbol nostalgia - Futboldle";
const description = "Rankings publicados de Liga BBVA y Mundiales: goleadores, asistentes, partidos, porterías y listas históricas para jugar en Futboldle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/rankings` },
  openGraph: { title, description, url: `${SITE_URL}/rankings`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

function RankingCard({ href, title, detail, source, tone = "#174ea6", mark = "10" }: { href: string; title: string; detail: string; source?: string; tone?: string; mark?: string }) {
  return (
    <Link href={href} className="fbl-card rounded-2xl p-4 min-h-[158px] flex flex-col justify-between" style={{ background: "white", border: `1px solid ${tone}2e` }}>
      <span className="fbl-visual-mark">{mark}</span>
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl font-bebas text-[22px]" style={{ background: `${tone}14`, color: tone, border: `1px solid ${tone}25` }}>{mark}</div>
          <span className="rounded-full px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ background: `${tone}12`, color: tone }}>Verificado</span>
        </div>
        <h2 className="font-bebas text-[30px] leading-none mt-3" style={{ color: "#18181b" }}>{title}</h2>
        <p className="text-[12px] mt-1" style={{ color: "#66646a" }}>{detail}</p>
        {source ? <p className="text-[10px] mt-2" style={{ color: "#9a9a8a" }}>Fuente: {source}</p> : null}
      </div>
      <span className="relative z-10 mt-4 text-[12px] font-semibold" style={{ color: tone }}>Abrir ranking →</span>
    </Link>
  );
}

export default function RankingsPage() {
  const published = seoRankings.filter(ranking => ranking.status === "published" && ranking.challenge);
  const bbva = published.slice(0, 12);
  const world = activeWorldCupTop10Challenges.slice(0, 12);
  const popular = [
    ...bbva.slice(0, 4).map(ranking => ({
      href: `/rankings/${ranking.slug}`,
      title: cleanText(ranking.title),
      detail: cleanText(ranking.description),
      source: cleanText(ranking.challenge?.sourceName),
      tone: "#b81c14",
      mark: "BB",
    })),
    ...world.slice(0, 2).map(challenge => ({
      href: "/world-cups/top10",
      title: cleanText(challenge.title),
      detail: `${cleanText(challenge.period)} · ${cleanText(challenge.criterion)}`,
      source: cleanText(challenge.sourceName),
      tone: "#174ea6",
      mark: "WC",
    })),
  ];

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
              Listas publicadas y verificadas para jugar, discutir y recordar: Liga BBVA, Mundiales, goleadores, porterías y jugadores históricos.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/top10-bbva" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ background: "#ffd04a", color: "#151515" }}>Jugar Top10 BBVA</Link>
              <Link href="/world-cups/top10" className="rounded-2xl px-5 py-3 font-oswald font-semibold uppercase text-[13px]" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>Top10 Mundial</Link>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#174ea6" }}>Destacados</div>
          <h2 className="font-bebas text-[38px] leading-none mt-1">Rankings populares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {popular.map(ranking => <RankingCard key={`${ranking.href}-${ranking.title}`} {...ranking} />)}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#b47611" }}>Liga BBVA</div>
            <h2 className="font-bebas text-[36px] leading-none mt-1">Rankings BBVA</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {bbva.map(ranking => (
                <RankingCard
                  key={ranking.slug}
                  href={`/rankings/${ranking.slug}`}
                  title={cleanText(ranking.title)}
                  detail={cleanText(ranking.challenge?.period ?? "Liga BBVA 2005-2016")}
                  source={cleanText(ranking.challenge?.sourceName)}
                  tone="#b81c14"
                  mark="BB"
                />
              ))}
            </div>
          </div>

          <div className="rounded-[24px] p-4 md:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#174ea6" }}>Mundiales</div>
            <h2 className="font-bebas text-[36px] leading-none mt-1">Rankings Mundialistas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {world.map(challenge => (
                <RankingCard
                  key={challenge.id}
                  href="/world-cups/top10"
                  title={cleanText(challenge.title)}
                  detail={`${cleanText(challenge.period)} · ${cleanText(challenge.criterion)}`}
                  source={cleanText(challenge.sourceName)}
                  tone="#174ea6"
                  mark="WC"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
