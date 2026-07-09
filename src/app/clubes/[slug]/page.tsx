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
  const title = `${club.name} | Jugadores, cromos y Liga BBVA - Futboldle`;
  const description = `${club.name}: jugadores recordados, cromos, retos relacionados y archivo de fútbol nostalgia en Futboldle.`;
  const url = canonical(`/clubes/${club.slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] } };
}

export default async function ClubSeoPage({ params }: Props) {
  const { slug } = await params;
  const club = seoClubs.find(item => item.slug === slug);
  if (!club) notFound();
  const playerLinks = club.players.map(player => ({ href: `/jugadores/${player.slug}`, label: player.name, detail: player.position }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SportsTeam", name: club.name, url: canonical(`/clubes/${club.slug}`) }) }} />
      <SeoEntityPage
        eyebrow="Club Futboldle"
        title={club.name}
        description={`${club.name} forma parte del archivo de clubes de Futboldle, con jugadores recordados de la Liga BBVA, cromos y retos relacionados.`}
        facts={[["Jugadores", club.players.length], ["Cromos", club.players.length], ["Archivo", "Liga BBVA"], ["Juegos", "4+"]]}
        sections={[
          { title: "Historia en Futboldle", body: `${club.name} aparece como club clave en cromos, trayectorias, Wordle y rankings de la era BBVA. La página agrupa jugadores y enlaces internos para explorar el archivo.` },
          { title: "Jugadores destacados", body: `Algunos nombres asociados a ${club.name}: ${club.mainPlayers.join(", ")}.`, items: playerLinks },
          { title: "Juegos relacionados", body: `Los jugadores de ${club.name} pueden aparecer en Trayectoria BBVA, Top10 BBVA, Cromo Oculto y Duelo Nostalgia.`, items: [{ href: "/", label: "Jugar retos diarios" }, { href: "/tops", label: "Ver Tops" }, { href: "/album", label: "Ver álbum" }] },
        ]}
        links={[...playerLinks.slice(0, 12), ...seoRankings.slice(0, 6).map(ranking => ({ href: `/rankings/${ranking.slug}`, label: ranking.title }))]}
      />
    </>
  );
}
