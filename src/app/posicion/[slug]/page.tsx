import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoNationalities, seoPositions } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return seoPositions.map(position => ({ slug: position.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const position = seoPositions.find(item => item.slug === slug);
  if (!position) return {};
  const title = `${position.name}s | Jugadores de fútbol en Futboldle`;
  const description = `Archivo de ${position.name.toLowerCase()}s en Futboldle: jugadores de Liga BBVA, Mundiales, cromos y retos diarios.`;
  const url = canonical(`/posicion/${position.slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] } };
}

export default async function PositionSeoPage({ params }: Props) {
  const { slug } = await params;
  const position = seoPositions.find(item => item.slug === slug);
  if (!position) notFound();
  const players = position.players.map(player => ({ href: `/jugador/${player.slug}`, label: player.name, detail: player.nationality }));
  return (
    <SeoEntityPage
      eyebrow="Posición"
      title={position.name}
      description={`Jugadores que aparecen como ${position.name.toLowerCase()}s dentro del archivo de Futboldle.`}
      facts={[["Jugadores", position.players.length], ["Juegos", "Retos diarios"], ["Cromos", position.players.length], ["Archivo", "Fútbol nostalgia"]]}
      sections={[
        { title: "Jugadores por posición", body: `Listado de futbolistas catalogados como ${position.name.toLowerCase()}s.`, items: players },
        { title: "Nacionalidades", body: "Cruza esta posición con nacionalidades para descubrir más páginas del archivo.", items: seoNationalities.slice(0, 16).map(item => ({ href: `/nacionalidad/${item.slug}`, label: item.name })) },
      ]}
      links={players}
    />
  );
}
