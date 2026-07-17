import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoClubs, seoPlayers, seoRankings, slugify } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  const priority = new Set(["david-villa", "joaquin", "forlan", "guti", "xavi", "iniesta", "messi", "cristiano-ronaldo", "ronaldo-nazario"]);
  return seoPlayers.filter(player => priority.has(player.slug)).map(player => ({ slug: player.slug }));
}

function findPlayerBySlug(slug: string) {
  return seoPlayers.find(item => item.slug === slug || slugify(item.name) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = findPlayerBySlug(slug);
  if (!player) return {};
  const title = `${player.name} | Biografia, clubes y juegos - Futboldle`;
  const description = `${player.name}: clubes, posicion, nacionalidad, cromos, juegos donde aparece y archivo de futbol nostalgia.`;
  const url = canonical(`/jugador/${player.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "profile", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = findPlayerBySlug(slug);
  if (!player) notFound();

  const clubLinks = player.clubs
    .map(club => ({ href: `/club/${seoClubs.find(item => item.name === club)?.slug ?? ""}`, label: club }))
    .filter(item => item.href !== "/club/");
  const similar = seoPlayers
    .filter(item => item.slug !== player.slug && (item.position === player.position || item.nationality === player.nationality || item.mainClub === player.mainClub))
    .slice(0, 10)
    .map(item => ({ href: `/jugador/${item.slug}`, label: item.displayName, detail: `${item.position} - ${item.nationality}` }));
  const rankingLinks = player.kind === "worldcup"
    ? [
        { href: "/world-cups/top10", label: "Top10 Mundial", detail: "Ranking mundialista" },
        { href: "/world-cups/mundialdle", label: "Mundialdle", detail: "Juego relacionado" },
        { href: "/world-cups/wordle", label: "Wordle Mundial", detail: "Juego relacionado" },
      ]
    : seoRankings
        .filter(ranking => ranking.status === "published")
        .slice(0, 6)
        .map(ranking => ({ href: `/rankings/${ranking.slug}`, label: ranking.title, detail: "Ranking BBVA relacionado" }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: player.name,
        nationality: player.nationality,
        jobTitle: player.position,
        url: canonical(`/jugador/${player.slug}`),
      }) }} />
      <SeoEntityPage
        eyebrow={player.kind === "worldcup" ? "Jugador Mundialista" : "Jugador Liga BBVA"}
        title={player.name}
        description={`${player.bio} En Futboldle forma parte del archivo de futbol nostalgia y conecta juegos, cromos, clubes y rankings.`}
        facts={[
          ["Nacionalidad", player.nationality],
          ["Posicion", player.position],
          ["Club principal", player.mainClub || player.clubs[0] || "Archivo"],
          ["Periodo", player.years],
        ]}
        sections={[
          { title: "Perfil futbolero", body: `${player.name} aparece en Futboldle por su valor nostalgico, sus etapas reconocibles y su utilidad para retos diarios.`, items: clubLinks },
          { title: "Juegos donde aparece", body: `Puede aparecer en ${player.games.join(", ")} segun el reto diario, la temporada y el tipo de pista.`, items: player.games.map(game => ({ href: game.includes("Mundial") ? "/world-cups" : "/liga-bbva", label: game })) },
          { title: "Jugadores similares", body: "Perfiles cercanos por posicion, nacionalidad, club o epoca.", items: similar },
          { title: "Rankings y archivo", body: "Rankings y paginas de archivo conectadas para seguir explorando Futboldle.", items: rankingLinks },
        ]}
        links={[...clubLinks, ...similar, ...rankingLinks]}
        ctaHref={player.kind === "worldcup" ? "/world-cups" : "/liga-bbva"}
        ctaLabel={player.kind === "worldcup" ? "Jugar Mundiales" : "Jugar Liga BBVA"}
      />
    </>
  );
}
