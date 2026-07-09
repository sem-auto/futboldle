import type { MetadataRoute } from "next";
import { seoClubs, seoNationalities, seoPlayers, seoPositions, seoRankings, seoSelections, seoWorldCups } from "@/lib/seoIndex";

const SITE_URL = "https://futboldle.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const publishedRankings = seoRankings.filter(ranking => ranking.status === "published" && ranking.challenge);
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/hoy`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/liga-bbva`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mundialdle`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/wordle-bbva`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/trayectoria-bbva`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/top10-bbva`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/statdle-bbva`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/duelo-bbva`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/album`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tops`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/world-cups`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/world-cups/mundialdle`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    { url: `${SITE_URL}/world-cups/wordle`, lastModified: now, changeFrequency: "daily", priority: 0.88 },
    { url: `${SITE_URL}/world-cups/top10`, lastModified: now, changeFrequency: "daily", priority: 0.88 },
    { url: `${SITE_URL}/world-cups/album`, lastModified: now, changeFrequency: "daily", priority: 0.78 },
    { url: `${SITE_URL}/world-cups/final`, lastModified: now, changeFrequency: "daily", priority: 0.86 },
    { url: `${SITE_URL}/temporadas/liga-bbva`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/temporadas/mundiales`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    {
      url: `${SITE_URL}/world-cups/champions`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/campeones-del-mundo`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/world-cups/camino`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/camino-al-titulo`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.45,
    },
    {
      url: `${SITE_URL}/que-son-los-hombres-bbva`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/100-hombres-bbva`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/jugadores-liga-bbva-2005-2016`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${SITE_URL}/wordle-futbol`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/juego-hombres-bbva`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/quiz-liga-bbva`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/minijuegos-futbol`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/guias`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.45,
    },
    {
      url: `${SITE_URL}/rankings`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.45,
    },
    {
      url: `${SITE_URL}/perfil`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/progreso`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/vitrina`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return [
    ...staticPages,
    ...seoPlayers.map(player => ({ url: `${SITE_URL}/jugadores/${player.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.62 })),
    ...seoPlayers.map(player => ({ url: `${SITE_URL}/jugador/${player.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.66 })),
    ...seoClubs.map(club => ({ url: `${SITE_URL}/clubes/${club.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...seoClubs.map(club => ({ url: `${SITE_URL}/club/${club.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.64 })),
    ...seoWorldCups.map(worldCup => ({ url: `${SITE_URL}/mundial/${worldCup.year}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.62 })),
    ...seoSelections.map(selection => ({ url: `${SITE_URL}/selecciones/${selection.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.56 })),
    ...seoSelections.map(selection => ({ url: `${SITE_URL}/seleccion/${selection.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...seoNationalities.map(nationality => ({ url: `${SITE_URL}/nacionalidad/${nationality.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...seoPositions.map(position => ({ url: `${SITE_URL}/posicion/${position.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...publishedRankings.map(ranking => ({ url: `${SITE_URL}/rankings/${ranking.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.64 })),
    ...publishedRankings.map(ranking => ({ url: `${SITE_URL}/ranking/${ranking.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.66 })),
  ];
}
