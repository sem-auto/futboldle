import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoClubs, seoRankings } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoClubs.map(club => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const club = seoClubs.find(item => item.slug === slug);
  if (!club) return {};
  const title = `${club.name} | Jugadores, cromos y retos - Futboldle`;
  const description = `${club.name}: jugadores recordados, cromos, rankings y juegos relacionados de futbol nostalgia.`;
  const url = canonical(`/club/${club.slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] } };
}

export default async function ClubPage({ params }: Props) {
  const { slug } = await params;
  const club = seoClubs.find(item => item.slug === slug);
  if (!club) notFound();
  const playerLinks = club.players.map(player => ({ href: `/jugador/${player.slug}`, label: player.name, detail: player.position }));
  const rankingLinks = seoRankings
    .filter(ranking => ranking.title.toLowerCase().includes(club.name.toLowerCase()) || ranking.status === "published")
    .slice(0, 8)
    .map(ranking => ({ href: `/ranking/${ranking.slug}`, label: ranking.title, detail: ranking.status === "published" ? "Publicado" : "Pendiente" }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SportsTeam", name: club.name, url: canonical(`/club/${club.slug}`) }) }} />
      <SeoEntityPage
        eyebrow="Club Futboldle"
        title={club.name}
        description={`${club.name} tiene pagina propia en Futboldle para agrupar jugadores, cromos, retos y rankings conectados.`}
        facts={[["Jugadores", club.players.length], ["Cromos", club.players.length], ["Archivo", "Liga BBVA"], ["Juegos", "Wordle, Top10 y mas"]]}
        sections={[
          { title: "Archivo del club", body: `${club.name} aparece en Futboldle como club clave para cromos, trayectorias, rankings y retos diarios.`, items: playerLinks },
          { title: "Jugadores destacados", body: `Nombres asociados a ${club.name}: ${club.mainPlayers.join(", ") || "archivo en crecimiento"}.`, items: playerLinks.slice(0, 16) },
          { title: "Rankings relacionados", body: "Rankings publicados o preparados para conectar busquedas de club con juegos diarios.", items: rankingLinks },
          { title: "Juegos relacionados", body: "Puedes encontrar jugadores de este club en Wordle BBVA, Trayectoria BBVA, Top10 BBVA y Cromo Oculto.", items: [{ href: "/", label: "Jugar retos diarios" }, { href: "/liga-bbva", label: "Ver Liga BBVA" }, { href: "/album", label: "Ver album" }] },
        ]}
        links={[...playerLinks.slice(0, 12), ...rankingLinks]}
        ctaHref="/liga-bbva"
        ctaLabel="Jugar Liga BBVA"
      />
    </>
  );
}

