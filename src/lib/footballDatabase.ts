import { seoClubs, seoNationalities, seoPlayers, seoPositions, seoRankings, seoSelections, seoWorldCups } from "./seoIndex";

export const footballDatabase = {
  players: seoPlayers,
  clubs: seoClubs,
  selections: seoSelections,
  nationalities: seoNationalities,
  positions: seoPositions,
  rankings: seoRankings,
  worldCups: seoWorldCups,
};

export type FootballPlayerEntity = typeof seoPlayers[number];
export type FootballClubEntity = typeof seoClubs[number];
export type FootballSelectionEntity = typeof seoSelections[number];
export type FootballRankingEntity = typeof seoRankings[number];

export function getFootballDatabaseStats() {
  return {
    players: footballDatabase.players.length,
    clubs: footballDatabase.clubs.length,
    selections: footballDatabase.selections.length,
    rankings: footballDatabase.rankings.length,
    worldCups: footballDatabase.worldCups.length,
    indexablePages:
      footballDatabase.players.length +
      footballDatabase.clubs.length +
      footballDatabase.selections.length +
      footballDatabase.nationalities.length +
      footballDatabase.positions.length +
      footballDatabase.rankings.length +
      footballDatabase.worldCups.length,
  };
}

