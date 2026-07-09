import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canonical, cleanText, OG_IMAGE, seoPlayers, seoRankings } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

function publicRankingBySlug(slug: string) {
  const ranking = seoRankings.find(item => item.slug === slug);
  if (!ranking || ranking.status !== "published" || !ranking.challenge) return null;
  return ranking;
}

export function generateStaticParams() {
  return seoRankings
    .filter(ranking => ranking.status === "published" && ranking.challenge)
    .map(ranking => ({ slug: ranking.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ranking = publicRankingBySlug(slug);
  if (!ranking) return {};

  const title = `${cleanText(ranking.title)} | Ranking futbol - Futboldle`;
  const description = cleanText(ranking.description);
  const url = canonical(`/rankings/${ranking.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

export default async function RankingSeoPage({ params }: Props) {
  const { slug } = await params;
  const ranking = publicRankingBySlug(slug);
  if (!ranking) notFound();

  const challenge = ranking.challenge;
  if (!challenge) notFound();

  const rows = challenge.answers;
  const playerLinks = rows.map(row => {
    const name = cleanText(row.displayName);
    const player = seoPlayers.find(item =>
      item.displayName.toLowerCase() === name.toLowerCase() ||
      item.name.toLowerCase() === name.toLowerCase()
    );
    return {
      href: player ? `/jugador/${player.slug}` : "/tops",
      label: name,
      detail: cleanText(row.detail || row.label || ""),
    };
  });

  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <Link href="/rankings" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>Volver a rankings</Link>
        <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 12px 34px rgba(0,0,0,0.08)" }}>
          <div className="px-5 py-7" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Ranking verificado</div>
            <h1 className="font-bebas text-[50px] md:text-[64px] leading-none mt-2">{cleanText(ranking.title)}</h1>
            <p className="text-[14px] text-white/80 mt-2">{cleanText(ranking.description)}</p>
          </div>

          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              ["Periodo", cleanText(challenge.period)],
              ["Fuente", cleanText(challenge.sourceName)],
              ["Criterio", cleanText(challenge.category)],
              ["Estado", "Publicado"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl px-3 py-3" style={{ background: "#eef3ff", border: "1px solid rgba(23,78,166,0.16)" }}>
                <div className="text-[8px] uppercase font-semibold tracking-[0.16em]" style={{ color: "#174ea6" }}>{label}</div>
                <div className="font-bebas text-[22px] leading-none mt-1" style={{ color: "#18181b" }}>{value}</div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4 overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-left" style={{ color: "#9a9a8a" }}>
                  <th className="py-2">#</th>
                  <th>Jugador</th>
                  <th>Dato</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const link = playerLinks[row.position - 1];
                  return (
                    <tr key={`${row.position}-${row.displayName}`} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                      <td className="py-2 font-bebas text-[22px]" style={{ color: "#174ea6" }}>{row.position}</td>
                      <td>
                        <Link href={link?.href ?? "/tops"} className="font-semibold" style={{ color: "#18181b" }}>
                          {cleanText(row.displayName)}
                        </Link>
                      </td>
                      <td style={{ color: "#6b6b72" }}>{cleanText(row.detail || row.label || "")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 pb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            <section className="rounded-2xl p-4" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
              <h2 className="font-bebas text-[28px] leading-none">Fuente y criterio</h2>
              <p className="text-[12px] leading-relaxed mt-2" style={{ color: "#5f5f66" }}>
                {cleanText(challenge.criterion)}. Fuente: {cleanText(challenge.source)}.
              </p>
            </section>
            <section className="rounded-2xl p-4" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
              <h2 className="font-bebas text-[28px] leading-none">Juega el reto</h2>
              <p className="text-[12px] leading-relaxed mt-2" style={{ color: "#5f5f66" }}>
                Este ranking alimenta los modos Top10 y el archivo de cromos de Futboldle.
              </p>
              <Link href="/tops" className="inline-block mt-3 text-[11px] font-semibold px-3 py-2 rounded-xl" style={{ background: "#18181b", color: "white" }}>
                Ver Top10
              </Link>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
