import { bbvaPlayers } from "@/data/bbvaPlayers";
import { activeTop10Challenges, top10Challenges, type Top10Challenge } from "@/data/top10Challenges";
import { worldCupPlayers } from "@/data/worldcups/players";
import { worldCupTournaments } from "@/data/worldcups/tournaments";

export const SITE_URL = "https://futboldle.es";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

const textFixes: Array<[string, string]> = [
  ["\u00c3\u00a1", "\u00e1"], ["\u00c3\u00a9", "\u00e9"], ["\u00c3\u00ad", "\u00ed"], ["\u00c3\u00b3", "\u00f3"], ["\u00c3\u00ba", "\u00fa"],
  ["\u00c3\u00b1", "\u00f1"], ["\u00c3\u00bc", "\u00fc"], ["\u00c3\u0081", "\u00c1"], ["\u00c3\u0089", "\u00c9"], ["\u00c3\u008d", "\u00cd"],
  ["\u00c3\u0093", "\u00d3"], ["\u00c3\u009a", "\u00da"], ["\u00c3\u0091", "\u00d1"], ["\u00c3\u009c", "\u00dc"], ["\u00c2\u00bf", "\u00bf"],
  ["\u00c2\u00a1", "\u00a1"], ["\u00c2\u00b7", "\u00b7"], ["\u00e2\u0086\u0090", "<-"], ["\u00e2\u0086\u0092", "->"],
  ["\u00e2\u0080\u0093", "-"], ["\u00e2\u0080\u0094", "-"], ["\u00e2\u0080\u009c", "\""], ["\u00e2\u0080\u009d", "\""],
  ["\u00e2\u0080\u0098", "'"], ["\u00e2\u0080\u0099", "'"],
];

export function cleanText(value: unknown) {
  let text = String(value ?? "");
  for (const [bad, good] of textFixes) text = text.split(bad).join(good);
  return text;
}

export function slugify(value: string) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleFromSlug(slug: string) {
  return slug.split("-").filter(Boolean).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function playerSlug(player: { fullName?: string; displayName?: string; name?: string }) {
  return slugify(player.displayName ?? player.name ?? player.fullName ?? "");
}

export function clubSlug(club: string) {
  return slugify(club);
}

export function canonical(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function uniqueBy<T>(items: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter(item => {
    const id = key(item);
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export const seoPlayers = uniqueBy([
  ...bbvaPlayers.map(player => ({
    kind: "bbva" as const,
    id: String(player.id),
    slug: playerSlug(player),
    name: cleanText(player.fullName || player.displayName),
    displayName: cleanText(player.displayName),
    nationality: cleanText(player.nationality),
    position: cleanText(player.position),
    clubs: player.clubs.map(cleanText),
    mainClub: cleanText(player.mainClub),
    years: cleanText(player.years),
    bio: cleanText(player.hint),
    cardLabel: player.category === "core" ? "Cromo reconocible BBVA" : "Cromo de archivo BBVA",
    games: ["Wordle BBVA", "Trayectoria BBVA", "Top10 BBVA", "Cromo Oculto"],
  })),
  ...worldCupPlayers.map(player => ({
    kind: "worldcup" as const,
    id: player.id,
    slug: playerSlug({ name: player.name }),
    name: cleanText(player.name),
    displayName: cleanText(player.name),
    nationality: cleanText(player.nationality),
    position: cleanText(player.position),
    clubs: (player.clubsByWorldCup ?? []).map(item => cleanText(item.club)),
    mainClub: cleanText(player.clubsByWorldCup?.[0]?.club ?? ""),
    years: player.worldCups.join(", "),
    bio: `${cleanText(player.name)} es uno de los nombres reconocibles del archivo mundialista de Futboldle. Su Mundial principal es ${player.mainWorldCup}.`,
    cardLabel: `Cromo mundialista ${cleanText(player.iconicLevel)}`,
    games: ["Mundialdle", "Wordle Mundial", "Campeones", "Camino al Título"],
    worldCups: player.worldCups,
    mainWorldCup: player.mainWorldCup,
  })),
], player => player.slug);

export const seoClubs = uniqueBy(
  bbvaPlayers.flatMap(player => player.clubs.map(club => cleanText(club))).filter(Boolean).map(club => {
    const players = bbvaPlayers.filter(player => player.clubs.map(cleanText).includes(club));
    return {
      slug: clubSlug(club),
      name: club,
      players: players.map(player => ({
        slug: playerSlug(player),
        name: cleanText(player.displayName),
        position: cleanText(player.position),
      })),
      mainPlayers: players.slice(0, 12).map(player => cleanText(player.displayName)),
    };
  }),
  club => club.slug,
);

export const seoSelections = uniqueBy(
  worldCupPlayers
    .map(player => cleanText(player.nationality))
    .filter(selection => Boolean(selection) && slugify(selection) !== "por-auditar")
    .map(selection => {
    const players = worldCupPlayers.filter(player => cleanText(player.nationality) === selection);
    return {
      slug: slugify(selection),
      name: selection,
      players: players.map(player => ({ slug: playerSlug({ name: player.name }), name: cleanText(player.name), position: cleanText(player.position) })),
    };
  }),
  selection => selection.slug,
);

export const seoNationalities = uniqueBy(
  seoPlayers
    .map(player => player.nationality)
    .filter(nationality => Boolean(nationality) && slugify(nationality) !== "por-auditar")
    .map(nationality => {
    const players = seoPlayers.filter(player => player.nationality === nationality);
    return {
      slug: slugify(nationality),
      name: nationality,
      players: players.map(player => ({ slug: player.slug, name: player.displayName, position: player.position })),
    };
  }),
  nationality => nationality.slug,
);

export const seoPositions = uniqueBy(
  seoPlayers.map(player => player.position.split("/")[0].trim()).filter(Boolean).map(position => {
    const players = seoPlayers.filter(player => player.position.includes(position));
    return {
      slug: slugify(position),
      name: position,
      players: players.map(player => ({ slug: player.slug, name: player.displayName, nationality: player.nationality })),
    };
  }),
  position => position.slug,
);

export const seoWorldCups = worldCupTournaments.map(tournament => ({
  slug: String(tournament.year),
  year: tournament.year,
  host: Array.isArray(tournament.host) ? tournament.host.map(cleanText).join(" y ") : cleanText(tournament.host),
  champion: cleanText(tournament.champion ?? "Por disputar"),
  runnerUp: cleanText(tournament.runnerUp ?? "Por definir"),
  topScorer: cleanText(tournament.topScorer ?? "Por definir"),
  iconicTeams: tournament.iconicTeams.map(cleanText),
  players: worldCupPlayers.filter(player => player.worldCups.includes(tournament.year)).map(player => ({
    slug: playerSlug({ name: player.name }),
    name: cleanText(player.name),
    position: cleanText(player.position),
    nationality: cleanText(player.nationality),
  })),
}));

export type RankingSeo = {
  slug: string;
  title: string;
  description: string;
  status: "published" | "pending";
  challenge?: Top10Challenge;
  intent: string;
};

const rankingIntents: Array<{ slug: string; title: string; match: string[] }> = [
  { slug: "maximos-goleadores", title: "Máximos goleadores", match: ["goleadores"] },
  { slug: "maximos-asistentes", title: "Máximos asistentes", match: ["asistencias", "asistentes"] },
  { slug: "mas-expulsiones", title: "Más expulsiones", match: ["expulsiones", "rojas"] },
  { slug: "maximos-goleadores-liga-espanola", title: "Máximos goleadores Liga Española", match: ["goleadores"] },
  { slug: "maximos-goleadores-liga-bbva", title: "Máximos goleadores Liga BBVA", match: ["goleadores", "bbva"] },
  { slug: "maximos-asistentes-liga-bbva", title: "Máximos asistentes Liga BBVA", match: ["asistencias", "bbva"] },
  { slug: "maximos-goleadores-espanoles-liga-bbva", title: "Máximos goleadores españoles Liga BBVA", match: ["goleadores", "españoles"] },
  { slug: "maximos-goleadores-extranjeros-liga-bbva", title: "Máximos goleadores extranjeros Liga BBVA", match: ["goleadores", "extranjeros"] },
  { slug: "jugadores-con-mas-partidos-liga-bbva", title: "Jugadores con más partidos Liga BBVA", match: ["partidos", "bbva"] },
  { slug: "porteros-mas-porterias-cero-liga-bbva", title: "Porteros con más porterías a cero Liga BBVA", match: ["porterías"] },
  { slug: "maximos-goleadores-valencia", title: "Máximos goleadores Valencia", match: ["goleadores", "valencia"] },
  { slug: "maximos-goleadores-villarreal", title: "Máximos goleadores Villarreal", match: ["goleadores", "villarreal"] },
  { slug: "maximos-goleadores-sevilla", title: "Máximos goleadores Sevilla", match: ["goleadores", "sevilla"] },
  { slug: "maximos-goleadores-atletico-madrid", title: "Máximos goleadores Atlético de Madrid", match: ["goleadores", "atlético"] },
  { slug: "maximos-goleadores-deportivo", title: "Máximos goleadores Deportivo", match: ["goleadores", "deportivo"] },
  { slug: "maximos-goleadores-athletic", title: "Máximos goleadores Athletic Club", match: ["goleadores", "athletic"] },
  { slug: "maximos-goleadores-real-sociedad", title: "Máximos goleadores Real Sociedad", match: ["goleadores", "real sociedad"] },
  { slug: "maximos-goleadores-real-betis", title: "Máximos goleadores Real Betis", match: ["goleadores", "betis"] },
  { slug: "maximos-goleadores-malaga", title: "Máximos goleadores Málaga", match: ["goleadores", "málaga"] },
  { slug: "maximos-goleadores-espanyol", title: "Máximos goleadores Espanyol", match: ["goleadores", "espanyol"] },
  { slug: "mas-goles-de-penalti-liga-bbva", title: "Más goles de penalti Liga BBVA", match: ["penaltis"] },
  { slug: "mas-goles-de-falta-liga-bbva", title: "Más goles de falta Liga BBVA", match: ["falta"] },
  { slug: "mas-tarjetas-liga-bbva", title: "Más tarjetas Liga BBVA", match: ["tarjetas", "amarillas"] },
  { slug: "mas-penaltis-fallados-liga-bbva", title: "Más penaltis fallados Liga BBVA", match: ["penaltis fallados"] },
  { slug: "mas-goles-al-real-madrid", title: "Más goles al Real Madrid", match: ["real madrid"] },
  { slug: "mas-goles-al-barcelona", title: "Más goles al Barcelona", match: ["barcelona"] },
  { slug: "jugadores-con-mas-equipos-liga-bbva", title: "Jugadores con más equipos Liga BBVA", match: ["equipos"] },
  { slug: "goles-desde-fuera-del-area-liga-bbva", title: "Goles desde fuera del área Liga BBVA", match: ["fuera del área"] },
  { slug: "goles-como-suplente-liga-bbva", title: "Goles como suplente Liga BBVA", match: ["suplente"] },
];

function challengeText(challenge: Top10Challenge) {
  return cleanText(`${challenge.title} ${challenge.subtitle} ${challenge.criterion} ${challenge.period} ${challenge.category}`).toLowerCase();
}

function findChallengeForIntent(match: string[]) {
  const active = activeTop10Challenges.length ? activeTop10Challenges : top10Challenges;
  return active.find(challenge => {
    const text = challengeText(challenge);
    return match.every(term => text.includes(cleanText(term).toLowerCase()));
  });
}

export const seoRankings: RankingSeo[] = rankingIntents.map(intent => {
  const challenge = findChallengeForIntent(intent.match);
  return {
    slug: intent.slug,
    title: cleanText(intent.title),
    intent: intent.match.join(", "),
    status: challenge ? "published" : "pending",
    challenge,
    description: challenge
      ? `${intent.title}: ranking verificado con ${cleanText(challenge.sourceName)} para ${cleanText(challenge.period)}.`
      : `${intent.title}: página preparada para publicarse cuando exista una fuente fiable y auditada.`,
  };
});

export const seoGamePages = [
  {
    slug: "juego-hombres-bbva",
    title: "Juego Hombres BBVA",
    description: "Juega a retos diarios sobre futbolistas de la Liga BBVA 2005-2016, cromos y nostalgia futbolera.",
    keywords: ["juego hombres bbva", "hombres bbva", "liga bbva nostalgia"],
  },
  {
    slug: "quiz-liga-bbva",
    title: "Quiz Liga BBVA",
    description: "Quiz diario de Liga BBVA con trayectorias, rankings, Wordle futbolero y cromos desbloqueables.",
    keywords: ["quiz liga bbva", "quiz fútbol", "liga española antigua"],
  },
  {
    slug: "minijuegos-futbol",
    title: "Minijuegos de Fútbol",
    description: "Minijuegos rápidos de fútbol nostalgia: Wordle BBVA, Mundialdle, Top10, Statdle y retos de cromos.",
    keywords: ["minijuegos fútbol", "juegos fútbol online", "wordle fútbol"],
  },
];
