import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoSelections, seoWorldCups } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoSelections.map(selection => ({ slug: selection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const selection = seoSelections.find(item => item.slug === slug);
  if (!selection) return {};
  const title = `${selection.name} | Jugadores mundialistas y retos - Futboldle`;
  const description = `Selección de ${selection.name}: jugadores mundialistas, cromos, Mundiales y retos relacionados en Futboldle.`;
  const url = canonical(`/selecciones/${selection.slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] } };
}

export default async function SelectionSeoPage({ params }: Props) {
  const { slug } = await params;
  const selection = seoSelections.find(item => item.slug === slug);
  if (!selection) notFound();
  const players = selection.players.map(player => ({ href: `/jugadores/${player.slug}`, label: player.name, detail: player.position }));
  const worldCups = seoWorldCups.filter(cup => cup.iconicTeams.includes(selection.name)).map(cup => ({ href: `/mundial/${cup.year}`, label: `Mundial ${cup.year}`, detail: cup.champion === selection.name ? "Campeón" : "Equipo icónico" }));
  return (
    <SeoEntityPage
      eyebrow="Selección Mundialista"
      title={selection.name}
      description={`${selection.name} tiene página propia en Futboldle para agrupar jugadores mundialistas, cromos y retos relacionados con Mundiales.`}
      facts={[["Jugadores", selection.players.length], ["Archivo", "Mundiales"], ["Retos", "Mundialdle"], ["Cromos", selection.players.length]]}
      sections={[
        { title: "Jugadores", body: `Futbolistas de ${selection.name} incluidos en la base mundialista de Futboldle.`, items: players },
        { title: "Mundiales relacionados", body: `Torneos donde ${selection.name} aparece como selección destacada dentro del archivo.`, items: worldCups },
        { title: "Juegos relacionados", body: "Mundialdle, Wordle Mundial, Campeones y Camino al Título conectan selecciones y jugadores.", items: [{ href: "/world-cups", label: "Temporada Mundiales" }, { href: "/world-cups/mundialdle", label: "Mundialdle" }] },
      ]}
      links={[...players.slice(0, 12), ...worldCups]}
      ctaHref="/world-cups"
      ctaLabel="Jugar retos mundialistas"
    />
  );
}
