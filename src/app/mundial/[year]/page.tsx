import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoEntityPage from "@/components/SeoEntityPage";
import { canonical, OG_IMAGE, seoWorldCups } from "@/lib/seoIndex";

type Props = { params: Promise<{ year: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return seoWorldCups
    .filter(worldCup => worldCup.year >= 2002 && worldCup.year <= 2022)
    .map(worldCup => ({ year: worldCup.slug }));
}

function selectionSlug(team: string) {
  return team.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const worldCup = seoWorldCups.find(item => item.slug === year);
  if (!worldCup) return {};
  const title = `Mundial ${worldCup.year} | Campeon, final y jugadores - Futboldle`;
  const description = `Mundial ${worldCup.year}: sede, campeon, finalista, goleador, selecciones iconicas y jugadores relacionados.`;
  const url = canonical(`/mundial/${worldCup.year}`);
  const isFuture = worldCup.year >= 2026;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: isFuture ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url, type: "article", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

export default async function MundialSeoPage({ params }: Props) {
  const { year } = await params;
  const worldCup = seoWorldCups.find(item => item.slug === year);
  if (!worldCup) notFound();
  const isFuture = worldCup.year >= 2026;
  const players = worldCup.players.map(player => ({ href: `/jugador/${player.slug}`, label: player.name, detail: `${player.nationality} · ${player.position}` }));
  const selections = worldCup.iconicTeams.map(team => ({ href: `/seleccion/${selectionSlug(team)}`, label: team }));
  const championText = isFuture ? "Torneo pendiente" : worldCup.champion;
  const runnerUpText = isFuture ? "Por definir" : worldCup.runnerUp;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SportsEvent", name: `Mundial ${worldCup.year}`, location: worldCup.host, url: canonical(`/mundial/${worldCup.year}`) }) }} />
      <SeoEntityPage
        eyebrow={isFuture ? "Mundial en preparacion" : "Archivo Mundial"}
        title={`Mundial ${worldCup.year}`}
        description={isFuture
          ? `Pagina preparada para el Mundial ${worldCup.year}. Se mantendra fuera de indexacion historica hasta tener datos oficiales completos.`
          : `El Mundial ${worldCup.year} se jugo en ${worldCup.host}. Campeon: ${worldCup.champion}. Finalista: ${worldCup.runnerUp}. Goleador destacado: ${worldCup.topScorer}.`
        }
        facts={[["Sede", worldCup.host], ["Campeon", championText], ["Finalista", runnerUpText], ["Goleador", isFuture ? "Por definir" : worldCup.topScorer]]}
        sections={[
          { title: "Resumen", body: isFuture ? `Archivo provisional del Mundial ${worldCup.year}.` : `Pagina de archivo para el Mundial ${worldCup.year}, pensada para conectar jugadores, selecciones, juegos y cromos mundialistas dentro de Futboldle.` },
          { title: "Selecciones iconicas", body: `Selecciones recordadas de este Mundial: ${worldCup.iconicTeams.join(", ")}.`, items: selections },
          { title: "Jugadores relacionados", body: "Futbolistas de la base mundialista vinculados a este torneo.", items: players },
          { title: "Juegos relacionados", body: "Puedes jugar retos de Mundiales en Mundialdle, Wordle Mundial, Campeones y Camino al Titulo.", items: [{ href: "/world-cups", label: "Temporada Mundiales" }, { href: "/world-cups/mundialdle", label: "Mundialdle" }, { href: "/world-cups/wordle", label: "Wordle Mundial" }] },
        ]}
        links={[...players.slice(0, 12), ...selections, { href: "/world-cups", label: "Jugar Mundiales" }]}
        ctaHref="/world-cups"
        ctaLabel="Jugar retos mundialistas"
      />
    </>
  );
}
