export type StatdleChallenge = {
  id: string;
  playerId: number;
  season: string;
  source: string;
  clues: Array<{
    label: string;
    value: string;
  }>;
};

export const statdleChallenges: StatdleChallenge[] = [
  {
    id: "villa-2008-09",
    playerId: 139,
    season: "2008/09",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2008/09" },
      { label: "Partidos", value: "33 partidos" },
      { label: "Goles", value: "28 goles" },
      { label: "Club", value: "Valencia" },
      { label: "Posición", value: "Delantero" },
      { label: "Nacionalidad", value: "España" },
    ],
  },
  {
    id: "soldado-2011-12",
    playerId: 132,
    season: "2011/12",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2011/12" },
      { label: "Partidos", value: "32 partidos" },
      { label: "Goles", value: "17 goles" },
      { label: "Club", value: "Valencia" },
      { label: "Posición", value: "Delantero" },
      { label: "Nacionalidad", value: "España" },
    ],
  },
  {
    id: "falcao-2012-13",
    playerId: 135,
    season: "2012/13",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2012/13" },
      { label: "Partidos", value: "34 partidos" },
      { label: "Goles", value: "28 goles" },
      { label: "Club", value: "Atlético de Madrid" },
      { label: "Posición", value: "Delantero" },
      { label: "Nacionalidad", value: "Colombia" },
    ],
  },
  {
    id: "kanoute-2006-07",
    playerId: 131,
    season: "2006/07",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2006/07" },
      { label: "Partidos", value: "32 partidos" },
      { label: "Goles", value: "21 goles" },
      { label: "Club", value: "Sevilla" },
      { label: "Posición", value: "Delantero" },
      { label: "Nacionalidad", value: "Malí" },
    ],
  },
  {
    id: "rossi-2010-11",
    playerId: 136,
    season: "2010/11",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2010/11" },
      { label: "Partidos", value: "36 partidos" },
      { label: "Goles", value: "18 goles" },
      { label: "Club", value: "Villarreal" },
      { label: "Posición", value: "Delantero" },
      { label: "Nacionalidad", value: "Italia" },
    ],
  },
  {
    id: "cazorla-2011-12",
    playerId: 61,
    season: "2011/12",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2011/12" },
      { label: "Partidos", value: "38 partidos" },
      { label: "Goles", value: "9 goles" },
      { label: "Club", value: "Málaga" },
      { label: "Posición", value: "Centrocampista" },
      { label: "Nacionalidad", value: "España" },
    ],
  },
  {
    id: "forlan-2008-09",
    playerId: 130,
    season: "2008/09",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2008/09" },
      { label: "Partidos", value: "33 partidos" },
      { label: "Goles", value: "32 goles" },
      { label: "Club", value: "Atlético de Madrid" },
      { label: "Posición", value: "Delantero" },
      { label: "Nacionalidad", value: "Uruguay" },
    ],
  },
  {
    id: "messi-2011-12",
    playerId: 193,
    season: "2011/12",
    source: "LaLiga / StatBunker season totals",
    clues: [
      { label: "Temporada", value: "2011/12" },
      { label: "Partidos", value: "37 partidos" },
      { label: "Goles", value: "50 goles" },
      { label: "Club", value: "Barcelona" },
      { label: "Posición", value: "Delantero" },
      { label: "Nacionalidad", value: "Argentina" },
    ],
  },
];

export function getDailyStatdleChallenge(dayNumber: number) {
  return statdleChallenges[dayNumber % statdleChallenges.length];
}
