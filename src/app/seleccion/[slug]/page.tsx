import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoSelections, seoWorldCups } from "@/lib/seoIndex";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  const priority = new Set(["espana", "argentina", "brasil", "alemania", "francia", "italia", "portugal", "inglaterra", "holanda", "uruguay"]);
  return seoSelections.filter(selection => priority.has(selection.slug)).map(selection => ({ slug: selection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const selection = seoSelections.find(item => item.slug === slug);
  if (!selection) return {};
  const title = `${selection.name} | Jugadores mundialistas y juegos - Futboldle`;
  const description = `${selection.name}: jugadores mundialistas, cromos, Mundiales y retos relacionados en Futboldle.`;
  const url = canonical(`/seleccion/${selection.slug}`);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] } };
}

export default async function SelectionPage({ params }: Props) {
  const { slug } = await params;
  const selection = seoSelections.find(item => item.slug === slug);
  if (!selection) notFound();
  const players = selection.players.map(player => ({ href: `/jugador/${player.slug}`, label: player.name, detail: player.position }));
  const worldCups = seoWorldCups
    .filter(cup => cup.iconicTeams.includes(selection.name) || cup.players.some(player => player.nationality === selection.name))
    .map(cup => ({ href: `/mundial/${cup.year}`, label: `Mundial ${cup.year}`, detail: cup.champion === selection.name ? "Campeon" : "Archivo mundialista" }));

  return (
    <SeoEntityPage
      eyebrow="Seleccion Mundialista"
      title={selection.name}
      description={`${selection.name} agrupa jugadores mundialistas, cromos y retos de Mundiales dentro de Futboldle.`}
      facts={[["Jugadores", selection.players.length], ["Archivo", "Mundiales"], ["Retos", "Mundialdle"], ["Cromos", selection.players.length]]}
      sections={[
        { title: "Jugadores", body: `Futbolistas de ${selection.name} incluidos en la base mundialista de Futboldle.`, items: players },
        { title: "Mundiales relacionados", body: `Torneos donde ${selection.name} aparece dentro del archivo mundialista.`, items: worldCups },
        { title: "Juegos relacionados", body: "Mundialdle, Wordle Mundial, Campeones y Camino al Titulo conectan selecciones y jugadores.", items: [{ href: "/world-cups", label: "Temporada Mundiales" }, { href: "/world-cups/mundialdle", label: "Mundialdle" }] },
      ]}
      links={[...players.slice(0, 12), ...worldCups]}
      ctaHref="/world-cups"
      ctaLabel="Jugar Mundiales"
    />
  );
}
