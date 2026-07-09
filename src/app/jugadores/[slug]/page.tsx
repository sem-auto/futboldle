import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoPlayers, seoClubs, seoRankings, slugify } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const player of seoPlayers) {
    slugs.add(player.slug);
    slugs.add(slugify(player.name));
  }
  return Array.from(slugs).map(slug => ({ slug }));
}

function findPlayerBySlug(slug: string) {
  return seoPlayers.find(item => item.slug === slug || slugify(item.name) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = findPlayerBySlug(slug);
  if (!player) return {};

  const title = `${player.name} | Perfil, clubes y juegos - Futboldle`;
  const description = `${player.name}: biografia, clubes, posicion, nacionalidad, cromos y retos de Futboldle donde aparece.`;
  const url = canonical(`/jugadores/${player.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "profile", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

export default async function PlayerSeoPage({ params }: Props) {
  const { slug } = await params;
  const player = findPlayerBySlug(slug);
  if (!player) notFound();

  const relatedClubLinks = player.kind === "worldcup"
    ? []
    : player.clubs
        .map(club => ({ href: `/clubes/${seoClubs.find(item => item.name === club)?.slug ?? ""}`, label: club }))
        .filter(item => item.href !== "/clubes/");

  const similar = seoPlayers
    .filter(item => item.slug !== player.slug && item.kind === player.kind && (item.position === player.position || item.nationality === player.nationality || item.mainClub === player.mainClub))
    .slice(0, 8)
    .map(item => ({ href: `/jugadores/${item.slug}`, label: item.displayName, detail: `${item.position} - ${item.nationality}` }));

  const rankingLinks = player.kind === "worldcup"
    ? [
        { href: "/world-cups/top10", label: "Top10 Mundial", detail: "Ranking mundialista" },
        { href: "/world-cups/mundialdle", label: "Mundialdle", detail: "Juego relacionado" },
      ]
    : seoRankings
        .filter(ranking => ranking.status === "published" && ranking.challenge)
        .slice(0, 4)
        .map(ranking => ({ href: `/rankings/${ranking.slug}`, label: ranking.title, detail: "Ranking activo" }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: player.name,
        nationality: player.nationality,
        jobTitle: player.position,
        url: canonical(`/jugadores/${player.slug}`),
      }) }} />
      <SeoEntityPage
        eyebrow={player.kind === "worldcup" ? "Jugador Mundialista" : "Jugador Liga BBVA"}
        title={player.name}
        description={`${player.bio} En Futboldle aparece como ${player.cardLabel.toLowerCase()} y forma parte del archivo de futbol nostalgia.`}
        facts={[
          ["Nacionalidad", player.nationality],
          ["Posicion", player.position],
          ["Club principal", player.mainClub || player.clubs[0] || "Archivo"],
          ["Periodo", player.years],
        ]}
        sections={[
          { title: "Biografia futbolera", body: `${player.name} es uno de los perfiles incluidos en Futboldle por su valor nostalgico y por su presencia en retos diarios. Su recuerdo conecta con ${player.clubs.join(", ") || "el futbol internacional"} y con la memoria de quienes siguieron esa epoca.` },
          { title: "Clubes y etapas", body: `Clubes registrados: ${player.clubs.join(", ") || "sin club principal disponible"}. Estos clubes sirven para enlazar cromos, trayectorias y retos relacionados.`, items: relatedClubLinks },
          { title: "Juegos donde aparece", body: `${player.name} puede aparecer en modos como ${player.games.join(", ")} segun la temporada y el tipo de reto.`, items: player.games.map(game => ({ href: player.kind === "worldcup" ? "/world-cups" : "/liga-bbva", label: game })) },
          { title: "Jugadores similares", body: "Otros jugadores relacionados por posicion, nacionalidad, club o epoca.", items: similar },
        ]}
        links={[...relatedClubLinks, ...similar, ...rankingLinks]}
        ctaHref={player.kind === "worldcup" ? "/world-cups" : "/liga-bbva"}
        ctaLabel={player.kind === "worldcup" ? "Jugar Mundiales" : "Jugar Liga BBVA"}
      />
    </>
  );
}
