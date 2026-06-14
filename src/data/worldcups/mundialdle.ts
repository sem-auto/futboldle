export type MundialdleClueTone = "gold" | "blue" | "green" | "red" | "neutral";

export type MundialdleChallenge = {
  id: string;
  playerId: string;
  worldCup: number;
  source: string;
  funFact?: string;
  clues: {
    icon: string;
    label: string;
    value: string;
    tone?: MundialdleClueTone;
  }[];
};

export const mundialdleChallenges: MundialdleChallenge[] = [
  { id: "villa-2010", playerId: "david-villa", worldCup: 2010, source: "FIFA / estadisticas del Mundial 2010", funFact: "David Villa fue el maximo goleador de Espana en el Mundial 2010.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Goles", value: "5 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Espana", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Valencia", tone: "neutral" },
    { icon: "", label: "Rol", value: "Maximo goleador espanol", tone: "gold" },
  ] },
  { id: "forlan-2010", playerId: "diego-forlan", worldCup: 2010, source: "FIFA / estadisticas del Mundial 2010", funFact: "Diego Forlan fue elegido Balon de Oro del Mundial 2010.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Premio", value: "Balon de Oro del torneo", tone: "gold" },
    { icon: "", label: "Goles", value: "5 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Uruguay", tone: "blue" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "red" },
    { icon: "", label: "Club", value: "Atletico de Madrid", tone: "neutral" },
  ] },
  { id: "messi-2022", playerId: "lionel-messi", worldCup: 2022, source: "FIFA / estadisticas del Mundial 2022", funFact: "Lionel Messi levanto el Mundial 2022 como capitan de Argentina.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2022", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon y capitan", tone: "gold" },
    { icon: "", label: "Goles", value: "7 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Argentina", tone: "blue" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "red" },
    { icon: "", label: "Club", value: "PSG", tone: "neutral" },
  ] },
  { id: "mbappe-2018", playerId: "kylian-mbappe", worldCup: 2018, source: "FIFA / estadisticas del Mundial 2018", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2018", tone: "gold" },
    { icon: "", label: "Edad", value: "19 anos", tone: "blue" },
    { icon: "", label: "Goles", value: "4 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Francia", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "neutral" },
    { icon: "", label: "Club", value: "PSG", tone: "blue" },
  ] },
  { id: "klose-2006", playerId: "miroslav-klose", worldCup: 2006, source: "FIFA / estadisticas del Mundial 2006", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Rol", value: "Maximo goleador", tone: "gold" },
    { icon: "", label: "Goles", value: "5 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Alemania", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Werder Bremen", tone: "neutral" },
  ] },
  { id: "ronaldo-2002", playerId: "ronaldo-nazario", worldCup: 2002, source: "FIFA / estadisticas del Mundial 2002", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2002", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon y maximo goleador", tone: "gold" },
    { icon: "", label: "Goles", value: "8 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Brasil", tone: "blue" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "red" },
    { icon: "", label: "Club", value: "Inter", tone: "neutral" },
  ] },
  { id: "zidane-2006", playerId: "zinedine-zidane", worldCup: 2006, source: "FIFA / Mundial 2006", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Rol", value: "Finalista", tone: "blue" },
    { icon: "", label: "Momento", value: "Final inolvidable", tone: "red" },
    { icon: "", label: "Seleccion", value: "Francia", tone: "blue" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "green" },
    { icon: "", label: "Club", value: "Real Madrid", tone: "neutral" },
  ] },
  { id: "iniesta-2010", playerId: "andres-iniesta", worldCup: 2010, source: "FIFA / Mundial 2010", funFact: "Andres Iniesta marco el gol que dio a Espana su primer Mundial.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Momento", value: "Gol en la final", tone: "green" },
    { icon: "", label: "Seleccion", value: "Espana", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Barcelona", tone: "neutral" },
  ] },
  { id: "casillas-2010", playerId: "iker-casillas", worldCup: 2010, source: "FIFA / Mundial 2010", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Rol", value: "Capitan campeon", tone: "gold" },
    { icon: "", label: "Posicion", value: "Portero", tone: "blue" },
    { icon: "", label: "Seleccion", value: "Espana", tone: "red" },
    { icon: "", label: "Momento", value: "Parada decisiva en la final", tone: "green" },
    { icon: "", label: "Club", value: "Real Madrid", tone: "neutral" },
  ] },
  { id: "neuer-2014", playerId: "manuel-neuer", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "Manuel Neuer disputo todos los minutos del Mundial 2014 y fue elegido mejor portero del torneo.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Posicion", value: "Portero", tone: "blue" },
    { icon: "", label: "Seleccion", value: "Alemania", tone: "red" },
    { icon: "", label: "Estilo", value: "Portero-libero", tone: "green" },
    { icon: "", label: "Club", value: "Bayern", tone: "neutral" },
  ] },
  { id: "sneijder-2010", playerId: "wesley-sneijder", worldCup: 2010, source: "FIFA / Mundial 2010", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Rol", value: "Finalista", tone: "blue" },
    { icon: "", label: "Goles", value: "5 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Holanda", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Inter", tone: "neutral" },
  ] },
  { id: "robben-2014", playerId: "arjen-robben", worldCup: 2014, source: "FIFA / Mundial 2014", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Rol", value: "Figura de semifinalista", tone: "green" },
    { icon: "", label: "Seleccion", value: "Holanda", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Pista", value: "Velocidad y recorte hacia dentro", tone: "gold" },
    { icon: "", label: "Club", value: "Bayern", tone: "neutral" },
  ] },
  { id: "pirlo-2006", playerId: "andrea-pirlo", worldCup: 2006, source: "FIFA / Mundial 2006", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Italia", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Pista", value: "Organizador total", tone: "green" },
    { icon: "", label: "Club", value: "AC Milan", tone: "neutral" },
  ] },
  { id: "cannavaro-2006", playerId: "fabio-cannavaro", worldCup: 2006, source: "FIFA / Mundial 2006", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Rol", value: "Capitan campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Italia", tone: "red" },
    { icon: "", label: "Posicion", value: "Defensa", tone: "blue" },
    { icon: "", label: "Pista", value: "Balon de Oro ese ano", tone: "green" },
    { icon: "", label: "Club", value: "Juventus", tone: "neutral" },
  ] },
  { id: "cristiano-2018", playerId: "cristiano-ronaldo", worldCup: 2018, source: "FIFA / Mundial 2018", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2018", tone: "gold" },
    { icon: "", label: "Partido mitico", value: "Hat-trick contra Espana", tone: "green" },
    { icon: "", label: "Seleccion", value: "Portugal", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Rol", value: "Capitan", tone: "gold" },
    { icon: "", label: "Club", value: "Real Madrid", tone: "neutral" },
  ] },
  { id: "beckham-2002", playerId: "david-beckham", worldCup: 2002, source: "FIFA / Mundial 2002", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2002", tone: "gold" },
    { icon: "", label: "Rol", value: "Capitan", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Inglaterra", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Pista", value: "Especialista a balon parado", tone: "green" },
    { icon: "", label: "Club", value: "Manchester United", tone: "neutral" },
  ] },
  { id: "rooney-2006", playerId: "wayne-rooney", worldCup: 2006, source: "FIFA / Mundial 2006", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Inglaterra", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Rol", value: "Gran esperanza inglesa", tone: "gold" },
    { icon: "", label: "Edad", value: "20 anos", tone: "green" },
    { icon: "", label: "Club", value: "Manchester United", tone: "neutral" },
  ] },
  { id: "suarez-2010", playerId: "luis-suarez", worldCup: 2010, source: "FIFA / Mundial 2010", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Uruguay", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Momento", value: "Mano decisiva contra Ghana", tone: "gold" },
    { icon: "", label: "Rol", value: "Semifinalista", tone: "green" },
    { icon: "", label: "Club", value: "Ajax", tone: "neutral" },
  ] },
  { id: "griezmann-2018", playerId: "antoine-griezmann", worldCup: 2018, source: "FIFA / Mundial 2018", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2018", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Francia", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Goles", value: "4 goles", tone: "green" },
    { icon: "", label: "Club", value: "Atletico de Madrid", tone: "neutral" },
  ] },
  { id: "modric-2018", playerId: "luka-modric", worldCup: 2018, source: "FIFA / Mundial 2018", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2018", tone: "gold" },
    { icon: "", label: "Rol", value: "Finalista", tone: "blue" },
    { icon: "", label: "Premio", value: "Balon de Oro del torneo", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Croacia", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "green" },
    { icon: "", label: "Club", value: "Real Madrid", tone: "neutral" },
  ] },
];

export function getDailyMundialdleChallenge(dayNumber: number) {
  return mundialdleChallenges[dayNumber % mundialdleChallenges.length];
}
