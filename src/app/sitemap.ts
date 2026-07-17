import type { MetadataRoute } from "next";
import { seoClubs, seoNationalities, seoPlayers, seoPositions, seoRankings, seoSelections, seoWorldCups } from "@/lib/seoIndex";

const SITE_URL = "https://futboldle.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedRankings = seoRankings.filter(ranking => ranking.status === "published" && ranking.challenge);
  const publishedWorldCups = seoWorldCups.filter(worldCup => worldCup.year < 2026);
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/hoy`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/liga-bbva`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mundialdle`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/wordle-bbva`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/trayectoria-bbva`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/top10-bbva`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/statdle-bbva`,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/duelo-bbva`,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/album`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/world-cups`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/world-cups/mundialdle`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    { url: `${SITE_URL}/world-cups/wordle`, changeFrequency: "daily", priority: 0.88 },
    { url: `${SITE_URL}/world-cups/top10`, changeFrequency: "daily", priority: 0.88 },
    { url: `${SITE_URL}/world-cups/album`, changeFrequency: "daily", priority: 0.78 },
    { url: `${SITE_URL}/world-cups/final`, changeFrequency: "daily", priority: 0.86 },
    { url: `${SITE_URL}/temporadas/liga-bbva`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/temporadas/mundiales`, changeFrequency: "weekly", priority: 0.85 },
    {
      url: `${SITE_URL}/world-cups/champions`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/campeones-del-mundo`,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/world-cups/camino`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/camino-al-titulo`,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.45,
    },
    {
      url: `${SITE_URL}/que-son-los-hombres-bbva`,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/100-hombres-bbva`,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/jugadores-liga-bbva-2005-2016`,
      changeFrequency: "monthly",
      priority: 0.74,
    },
    {
      url: `${SITE_URL}/wordle-futbol`,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/juego-hombres-bbva`,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/quiz-liga-bbva`,
      changeFrequency: "monthly",
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/minijuegos-futbol`,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/rankings`,
      changeFrequency: "weekly",
      priority: 0.45,
    },
    {
      url: `${SITE_URL}/perfil`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/progreso`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/vitrina`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return [
    ...staticPages,
    ...seoPlayers.map(player => ({ url: `${SITE_URL}/jugador/${player.slug}`, changeFrequency: "monthly" as const, priority: 0.66 })),
    ...seoClubs.map(club => ({ url: `${SITE_URL}/club/${club.slug}`, changeFrequency: "monthly" as const, priority: 0.64 })),
    ...publishedWorldCups.map(worldCup => ({ url: `${SITE_URL}/mundial/${worldCup.year}`, changeFrequency: "monthly" as const, priority: 0.62 })),
    ...seoSelections.map(selection => ({ url: `${SITE_URL}/seleccion/${selection.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...seoNationalities.map(nationality => ({ url: `${SITE_URL}/nacionalidad/${nationality.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...seoPositions.map(position => ({ url: `${SITE_URL}/posicion/${position.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...publishedRankings.map(ranking => ({ url: `${SITE_URL}/rankings/${ranking.slug}`, changeFrequency: "weekly" as const, priority: 0.64 })),
  ];
}
