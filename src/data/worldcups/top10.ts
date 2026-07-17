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

const byId = new Map(worldCupPlayers.map(player => [player.id, player]));

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
    id: "wc-all-time-top-scorers",
    title: "Maximos goleadores de la historia de los Mundiales",
    subtitle: "Ranking historico FIFA",
    period: "1930-2022",
    criterion: "Goles acumulados en fases finales de la Copa Mundial FIFA",
    sourceName: "FIFA",
    sourceUrl: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/articles/world-cup-top-goalscorers-klose-ronaldo-messi-mbappe-muller",
    difficulty: "Medio",
    status: "active",
    answers: [
      answer("miroslav-klose", 16, "16 goles", ["Klose"]),
      answer("ronaldo-nazario", 15, "15 goles", ["Ronaldo", "Ronaldo Nazario", "R9", "El Fenomeno"]),
      answer("lionel-messi", 13, "13 goles", ["Messi", "Leo Messi"]),
      answer("just-fontaine", 13, "13 goles", ["Fontaine"]),
      answer("kylian-mbappe", 12, "12 goles", ["Mbappe"]),
      answer("pele", 12, "12 goles", ["Pele"]),
      answer("sandor-kocsis", 11, "11 goles", ["Kocsis", "Sandor Kocsis"]),
      answer("jurgen-klinsmann", 11, "11 goles", ["Klinsmann", "Jurgen Klinsmann"]),
      answer("helmut-rahn", 10, "10 goles", ["Rahn"]),
      answer("gary-lineker", 10, "10 goles", ["Lineker"]),
    ],
  },
];

function cleanGeneratedChallenge(challenge: WorldCupTop10Challenge): WorldCupTop10Challenge {
  const searchableText = `${challenge.id} ${challenge.title} ${challenge.subtitle} ${challenge.criterion}`.toLowerCase();
  const isEditionsTop =
    searchableText.includes("5-o-mas-ediciones") ||
    searchableText.includes("5 o mas ediciones") ||
    searchableText.includes("5 o más ediciones") ||
    searchableText.includes("ediciones distintas del mundial");
  return {
    ...challenge,
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
  if (!challenge.sourceName || !challenge.sourceUrl) return false;
  if (["https://www.fifa.com/", "https://www.statbunker.com/", "https://www.transfermarkt.com/", "https://www.transfermarkt.es/"].includes(challenge.sourceUrl)) return false;
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
