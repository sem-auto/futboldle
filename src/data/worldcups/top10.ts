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
  difficulty: "Fácil" | "Medio" | "Difícil";
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
    title: "Máximos goleadores de la historia de los Mundiales",
    subtitle: "Ranking histórico FIFA",
    period: "1930-2022",
    criterion: "Goles acumulados en fases finales de la Copa Mundial FIFA",
    sourceName: "FIFA",
    sourceUrl: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/articles/world-cup-top-goalscorers-klose-ronaldo-messi-mbappe-muller",
    difficulty: "Medio",
    status: "active",
    answers: [
      answer("miroslav-klose", 16, "16 goles", ["Klose"]),
      answer("ronaldo-nazario", 15, "15 goles", ["Ronaldo", "Ronaldo Nazario", "Ronaldo Nazário", "R9", "El Fenomeno"]),
      answer("lionel-messi", 13, "13 goles", ["Messi", "Leo Messi"]),
      answer("just-fontaine", 13, "13 goles", ["Fontaine"]),
      answer("kylian-mbappe", 12, "12 goles", ["Mbappe", "Mbappé"]),
      answer("pele", 12, "12 goles", ["Pele", "Pelé"]),
      answer("sandor-kocsis", 11, "11 goles", ["Kocsis", "Sándor Kocsis"]),
      answer("jurgen-klinsmann", 11, "11 goles", ["Klinsmann", "Jürgen Klinsmann", "Jurgen Klinsmann"]),
      answer("helmut-rahn", 10, "10 goles", ["Rahn"]),
      answer("gary-lineker", 10, "10 goles", ["Lineker"]),
    ],
  },
];

worldCupTop10Challenges.push(...generatedWorldCupTop10Challenges as WorldCupTop10Challenge[]);

export function getDailyWorldCupTop10(dayNumber: number) {
  const active = worldCupTop10Challenges.filter(challenge => challenge.status === "active");
  return active[dayNumber % active.length] ?? worldCupTop10Challenges[0];
}
