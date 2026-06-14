import type { WorldCupPosition } from "./players";

export type WorldCupAppearance = {
  playerId: string;
  year: number;
  team: string;
  flag: string;
  club?: string;
  age?: number;
  position: WorldCupPosition;
  role?: string;
};

export const worldCupAppearances: WorldCupAppearance[] = [
  { playerId: "david-villa", year: 2010, team: "España", flag: "🇪🇸", club: "Valencia", age: 28, position: "Delantero", role: "máximo goleador de España" },
  { playerId: "lionel-messi", year: 2022, team: "Argentina", flag: "🇦🇷", club: "PSG", age: 35, position: "Delantero", role: "campeón y capitán" },
  { playerId: "kylian-mbappe", year: 2018, team: "Francia", flag: "🇫🇷", club: "PSG", age: 19, position: "Delantero", role: "campeón" },
  { playerId: "manuel-neuer", year: 2014, team: "Alemania", flag: "🇩🇪", club: "Bayern", age: 28, position: "Portero", role: "campeón" },
  { playerId: "andres-iniesta", year: 2010, team: "España", flag: "🇪🇸", club: "Barcelona", age: 26, position: "Centrocampista", role: "gol en la final" },
];
