import { worldCupPlayers } from "./players";
import { generatedWorldCupTop10Challenges } from "./generatedTop10";

export type WorldCupTop10Answer = {
  playerId: string;
  name: string;
  aliases: string[];
  value: number;
  label: string;
  nationality: string;
  flag: string;
  position: string;
};

export type WorldCupTop10Challenge = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  criterion: string;
  sourceName: string;
  sourceUrl: string;
  difficulty: string;
  status: "active" | "needs_review" | "disabled";
  answers: WorldCupTop10Answer[];
};

const byId = new Map<string, (typeof worldCupPlayers)[number]>();
for (const player of worldCupPlayers) {
  // Conserva la primera ficha: las fichas editoriales se cargan antes que las importadas.
  if (!byId.has(player.id)) byId.set(player.id, player);
}

const genericSourceUrls = [
  "https://www.fifa.com/",
  "https://www.statbunker.com/",
  "https://www.transfermarkt.com/",
  "https://www.transfermarkt.es/",
];

function answer(playerId: string, value: number, label: string, aliases: string[] = []): WorldCupTop10Answer {
  const player = byId.get(playerId);
  if (!player) throw new Error(`Missing World Cup player for Top10: ${playerId}`);
  return {
    playerId,
    name: player.name,
    aliases: Array.from(new Set([...player.aliases, ...aliases])),
    value,
    label,
    nationality: player.nationality,
    flag: player.flag,
    position: player.position,
  };
}

export const worldCupTop10Challenges: WorldCupTop10Challenge[] = [
  {
    id: "wc-all-time-top-scorers-through-2022",
    title: "Máximos goleadores de los Mundiales",
    subtitle: "Archivo FIFA hasta Catar 2022",
    period: "1930-2022",
    criterion: "Goles acumulados en fases finales de la Copa Mundial FIFA",
    sourceName: "FIFA",
    sourceUrl: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/articles/world-cup-top-goalscorers-klose-ronaldo-messi-mbappe-muller",
    difficulty: "Medio",
    // Instantánea histórica: se conserva para el archivo, pero no entra en la
    // rotación diaria tras la actualización del Mundial 2026.
    status: "disabled",
    answers: [
      answer("miroslav-klose", 16, "16 goles", ["Klose"]),
      answer("ronaldo-nazario", 15, "15 goles", ["Ronaldo", "Ronaldo Nazario", "R9", "El Fenomeno"]),
      answer("gerd-muller", 14, "14 goles", ["Gerd Muller", "Muller"]),
      answer("lionel-messi", 13, "13 goles", ["Messi", "Leo Messi"]),
      answer("just-fontaine", 13, "13 goles", ["Fontaine"]),
      answer("kylian-mbappe", 12, "12 goles", ["Mbappe"]),
      answer("pele", 12, "12 goles", ["Pele"]),
      answer("sandor-kocsis", 11, "11 goles", ["Kocsis", "Sandor Kocsis"]),
      answer("jurgen-klinsmann", 11, "11 goles", ["Klinsmann", "Jurgen Klinsmann"]),
      answer("helmut-rahn", 10, "10 goles", ["Rahn"]),
    ],
  },
  {
    id: "wc-most-appearances-through-2022",
    title: "Más partidos en los Mundiales",
    subtitle: "Los futbolistas con más apariciones hasta Catar 2022",
    period: "1930-2022",
    criterion: "Partidos disputados en fases finales de la Copa Mundial FIFA",
    sourceName: "FIFA",
    sourceUrl: "https://www.fifa.com/en/articles/lionel-messi-equal-lothar-matthaus-appearances-record-fifa-world-cup-qatar-2022",
    difficulty: "Difícil",
    // El Mundial 2026 cambia la tabla. Se retira hasta recalcular las diez
    // posiciones con una fuente de cierre concreta.
    status: "needs_review",
    answers: [
      answer("lionel-messi", 26, "26 partidos", ["Messi", "Leo Messi"]),
      answer("lothar-matthaus", 25, "25 partidos", ["Matthaus"]),
      answer("miroslav-klose", 24, "24 partidos", ["Klose"]),
      answer("paolo-maldini", 23, "23 partidos", ["Maldini"]),
      answer("cristiano-ronaldo", 22, "22 partidos", ["Cristiano", "CR7"]),
      answer("diego-maradona", 21, "21 partidos", ["Maradona"]),
      answer("uwe-seeler", 21, "21 partidos", ["Seeler"]),
      answer("wladyslaw-zmuda", 21, "21 partidos", ["Zmuda", "Wladyslaw Zmuda"]),
      answer("cafu", 20, "20 partidos", ["Cafu"]),
      answer("philipp-lahm", 20, "20 partidos", ["Lahm"]),
    ],
  },
  {
    id: "wc-all-time-top-scorers-2026",
    title: "Máximos goleadores de los Mundiales",
    subtitle: "Clasificación actualizada tras el Mundial 2026",
    period: "1930-2026 · actualizado el 18/07/2026",
    criterion: "Goles acumulados en fases finales de la Copa Mundial FIFA",
    sourceName: "FIFA · actualizado el 18/07/2026",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/articles/top-goalscorer-progression",
    difficulty: "Medio",
    status: "active",
    answers: [
      answer("kylian-mbappe", 22, "22 goles", ["Mbappé", "Mbappe"]),
      answer("lionel-messi", 21, "21 goles", ["Messi", "Leo Messi"]),
      answer("miroslav-klose", 16, "16 goles", ["Klose"]),
      answer("ronaldo-nazario", 15, "15 goles", ["Ronaldo", "Ronaldo Nazário", "Ronaldo Nazario", "R9", "El Fenómeno"]),
      answer("gerd-muller", 14, "14 goles", ["Gerd Müller", "Gerd Muller", "Müller", "Muller"]),
      answer("harry-kane", 14, "14 goles", ["Kane", "Harry"]),
      answer("just-fontaine", 13, "13 goles", ["Fontaine"]),
      answer("pele", 12, "12 goles", ["Pelé", "Pele"]),
      answer("sandor-kocsis", 11, "11 goles", ["Kocsis", "Sándor Kocsis", "Sandor Kocsis"]),
      answer("jurgen-klinsmann", 11, "11 goles", ["Klinsmann", "Jürgen Klinsmann", "Jurgen Klinsmann"]),
    ],
  },
];

function cleanGeneratedChallenge(challenge: WorldCupTop10Challenge): WorldCupTop10Challenge {
  const searchableText = `${challenge.id} ${challenge.title} ${challenge.subtitle} ${challenge.criterion}`.toLowerCase();
  const hasDetailedSource = /^https?:\/\/[^/]+\/.+/.test(challenge.sourceUrl);
  const isEditionsTop =
    searchableText.includes("5-o-mas-ediciones") ||
    searchableText.includes("5 o mas ediciones") ||
    searchableText.includes("5 o más ediciones") ||
    searchableText.includes("ediciones distintas del mundial");
  return {
    ...challenge,
    // Las auditorías importadas sin página fuente concreta quedan visibles solo
    // para revisión interna y nunca entran en la rotación pública.
    status: challenge.status === "active" && !hasDetailedSource ? "needs_review" : challenge.status,
    title: isEditionsTop ? "Futbolistas con 5 o mas Mundiales jugados" : challenge.title,
    subtitle: isEditionsTop ? "El club de jugadores que disputaron cinco Copas del Mundo" : challenge.subtitle,
    criterion: isEditionsTop ? "Ediciones distintas del Mundial con al menos un minuto disputado" : challenge.criterion,
    answers: challenge.answers.map(answer => {
      const player = byId.get(answer.playerId);
      return {
        ...answer,
        name: player?.name ?? answer.name,
        aliases: Array.from(new Set([...(player?.aliases ?? []), ...answer.aliases, answer.name])),
        label: isEditionsTop ? `${answer.value} ediciones` : answer.label,
        nationality: player?.nationality ?? answer.nationality,
        flag: player?.flag ?? answer.flag,
        position: player?.position ?? answer.position,
      };
    }),
  };
}

worldCupTop10Challenges.push(...(generatedWorldCupTop10Challenges as WorldCupTop10Challenge[]).map(cleanGeneratedChallenge));

function isPublishableWorldCupTop10(challenge: WorldCupTop10Challenge) {
  if (challenge.status !== "active") return false;
  if (challenge.answers.length !== 10) return false;
  // Tras el Mundial 2026 no se pueden volver a publicar instantaneas antiguas
  // como si fueran rankings actuales.
  if (!challenge.period.includes("2026")) return false;
  if (!challenge.sourceName || !challenge.sourceUrl) return false;
  // Una portada no es una fuente verificable. Los importados con una URL genérica
  // quedan fuera del reto diario hasta que se sustituya por la página concreta.
  if (genericSourceUrls.includes(challenge.sourceUrl) || !/^https?:\/\/[^/]+\/.+/.test(challenge.sourceUrl)) return false;
  if (JSON.stringify(challenge).includes("Por auditar")) return false;
  return challenge.answers.every(answer =>
    answer.playerId &&
    answer.name &&
    answer.aliases.length > 0 &&
    answer.label &&
    answer.nationality &&
    answer.flag &&
    answer.position
  );
}

export const activeWorldCupTop10Challenges = worldCupTop10Challenges.filter(isPublishableWorldCupTop10);

export function getDailyWorldCupTop10(dayNumber: number) {
  if (!activeWorldCupTop10Challenges.length) throw new Error("No hay Top10 Mundial publicables.");
  return activeWorldCupTop10Challenges[dayNumber % activeWorldCupTop10Challenges.length];
}
