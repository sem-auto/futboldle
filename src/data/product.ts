export type SeasonStatus = "active" | "new" | "coming-soon";

export type Season = {
  id: string;
  name: string;
  subtitle: string;
  status: SeasonStatus;
};

export type GameMode = {
  id: string;
  seasonId: string;
  name: string;
  subtitle: string;
  status: "active" | "secondary" | "planned";
  daily: boolean;
};

export const seasons: Season[] = [
  { id: "bbva", name: "Liga BBVA", subtitle: "2005-2016", status: "active" },
  { id: "world-cups", name: "Mundiales", subtitle: "2002-2026", status: "new" },
];

export const gameModes: GameMode[] = [
  { id: "wordle-bbva", seasonId: "bbva", name: "Wordle BBVA", subtitle: "Adivina el apellido", status: "active", daily: true },
  { id: "trayectoria-bbva", seasonId: "bbva", name: "Trayectoria BBVA", subtitle: "Adivina por su carrera", status: "active", daily: true },
  { id: "top10-bbva", seasonId: "bbva", name: "Top10 BBVA", subtitle: "Rankings historicos", status: "active", daily: true },
  { id: "cromo-oculto", seasonId: "bbva", name: "Cromo Oculto", subtitle: "Revela al jugador", status: "active", daily: true },
  { id: "statdle-bbva", seasonId: "bbva", name: "Statdle BBVA", subtitle: "Adivina por estadisticas", status: "active", daily: true },
  { id: "mundialdle", seasonId: "world-cups", name: "Mundialdle", subtitle: "Adivina el jugador mundialista", status: "active", daily: true },
  { id: "jugo-aqui", seasonId: "bbva", name: "Jugo Aqui", subtitle: "Jugador y club", status: "secondary", daily: true },
  { id: "fichaje-invento", seasonId: "bbva", name: "Fichaje o Invento", subtitle: "Operaciones raras", status: "secondary", daily: true },
  { id: "club-oculto", seasonId: "bbva", name: "Club Oculto", subtitle: "Adivina el equipo", status: "secondary", daily: true },
];

export function getActiveSeason() {
  return seasons.find(season => season.status === "active") ?? seasons[0];
}
