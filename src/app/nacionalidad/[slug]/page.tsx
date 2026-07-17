import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoNationalities, seoPositions } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  const priority = new Set(["espana", "argentina", "brasil", "alemania", "francia", "italia", "portugal", "inglaterra", "uruguay"]);
  return seoNationalities.filter(nationality => priority.has(nationality.slug)).map(nationality => ({ slug: nationality.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const nationality = seoNationalities.find(item => item.slug === slug);
  if (!nationality) return {};
  const title = `Jugadores de ${nationality.name} | Futboldle`;
  const description = `Futbolistas de ${nationality.name} en Futboldle: Liga BBVA, Mundiales, cromos y retos diarios.`;
  const url = canonical(`/nacionalidad/${nationality.slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] } };
}

export default async function NationalitySeoPage({ params }: Props) {
  const { slug } = await params;
  const nationality = seoNationalities.find(item => item.slug === slug);
  if (!nationality) notFound();
  const players = nationality.players.map(player => ({ href: `/jugador/${player.slug}`, label: player.name, detail: player.position }));
  return (
    <SeoEntityPage
      eyebrow="Nacionalidad"
      title={`Jugadores de ${nationality.name}`}
      description={`Archivo de jugadores de ${nationality.name} presentes en Futboldle, tanto en Liga BBVA como en Mundiales.`}
      facts={[["Jugadores", nationality.players.length], ["Juegos", "BBVA + Mundial"], ["Cromos", nationality.players.length], ["Archivo", "Futboldle"]]}
      sections={[
        { title: "Listado de jugadores", body: `Futbolistas de ${nationality.name} enlazados a páginas individuales, juegos y cromos.`, items: players },
        { title: "Posiciones relacionadas", body: "Explora jugadores por demarcación para encontrar porteros, defensas, centrocampistas y delanteros.", items: seoPositions.map(position => ({ href: `/posicion/${position.slug}`, label: position.name })) },
      ]}
      links={players}
    />
  );
}
