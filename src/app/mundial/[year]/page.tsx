import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoWorldCups } from "@/lib/seoIndex";

type Props = { params: Promise<{ year: string }> };

export function generateStaticParams() {
  return seoWorldCups.map(worldCup => ({ year: worldCup.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const worldCup = seoWorldCups.find(item => item.slug === year);
  if (!worldCup) return {};
  const title = `Mundial ${worldCup.year} | Campeón, final y jugadores - Futboldle`;
  const description = `Mundial ${worldCup.year}: sede, campeón, finalista, goleador, selecciones icónicas y jugadores relacionados.`;
  const url = canonical(`/mundial/${worldCup.year}`);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "article", images: [OG_IMAGE] }, twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] } };
}

export default async function MundialSeoPage({ params }: Props) {
  const { year } = await params;
  const worldCup = seoWorldCups.find(item => item.slug === year);
  if (!worldCup) notFound();
  const players = worldCup.players.map(player => ({ href: `/jugadores/${player.slug}`, label: player.name, detail: `${player.nationality} · ${player.position}` }));
  const selections = worldCup.iconicTeams.map(team => ({ href: `/selecciones/${team.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`, label: team }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SportsEvent", name: `Mundial ${worldCup.year}`, location: worldCup.host, url: canonical(`/mundial/${worldCup.year}`) }) }} />
      <SeoEntityPage
        eyebrow="Archivo Mundial"
        title={`Mundial ${worldCup.year}`}
        description={`El Mundial ${worldCup.year} se jugó en ${worldCup.host}. Campeón: ${worldCup.champion}. Finalista: ${worldCup.runnerUp}. Goleador destacado: ${worldCup.topScorer}.`}
        facts={[["Sede", worldCup.host], ["Campeón", worldCup.champion], ["Finalista", worldCup.runnerUp], ["Goleador", worldCup.topScorer]]}
        sections={[
          { title: "Resumen", body: `Página de archivo para el Mundial ${worldCup.year}, pensada para conectar jugadores, selecciones, juegos y cromos mundialistas dentro de Futboldle.` },
          { title: "Selecciones icónicas", body: `Selecciones recordadas de este Mundial: ${worldCup.iconicTeams.join(", ")}.`, items: selections },
          { title: "Jugadores relacionados", body: "Futbolistas de la base mundialista vinculados a este torneo.", items: players },
          { title: "Juegos relacionados", body: "Puedes jugar retos de Mundiales en Mundialdle, Wordle Mundial, Campeones y Camino al Título.", items: [{ href: "/world-cups", label: "Temporada Mundiales" }, { href: "/world-cups/mundialdle", label: "Mundialdle" }, { href: "/world-cups/wordle", label: "Wordle Mundial" }] },
        ]}
        links={[...players.slice(0, 12), ...selections, { href: "/world-cups", label: "Jugar Mundiales" }]}
        ctaHref="/world-cups"
        ctaLabel="Jugar retos mundialistas"
      />
    </>
  );
}
