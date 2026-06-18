import { worldCupPlayers } from "./players";

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

const featuredMundialdleChallenges: MundialdleChallenge[] = [
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
  { id: "mbappe-2018", playerId: "kylian-mbappe", worldCup: 2018, source: "FIFA / estadisticas del Mundial 2018", funFact: "Kylian Mbappe marco en la final del Mundial 2018 con solo 19 anos.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2018", tone: "gold" },
    { icon: "", label: "Edad", value: "19 anos", tone: "blue" },
    { icon: "", label: "Goles", value: "4 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Francia", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "neutral" },
    { icon: "", label: "Club", value: "PSG", tone: "blue" },
  ] },
  { id: "klose-2006", playerId: "miroslav-klose", worldCup: 2006, source: "FIFA / estadisticas del Mundial 2006", funFact: "Miroslav Klose termino su carrera como maximo goleador historico de los Mundiales.", clues: [
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
  { id: "sneijder-2010", playerId: "wesley-sneijder", worldCup: 2010, source: "FIFA / Mundial 2010", funFact: "Wesley Sneijder fue uno de los grandes protagonistas del Mundial 2010.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Rol", value: "Finalista", tone: "blue" },
    { icon: "", label: "Goles", value: "5 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Holanda", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Inter", tone: "neutral" },
  ] },
  { id: "robben-2014", playerId: "arjen-robben", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "Arjen Robben fue una de las grandes figuras de Holanda en Brasil 2014.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Rol", value: "Figura de semifinalista", tone: "green" },
    { icon: "", label: "Seleccion", value: "Holanda", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Pista", value: "Velocidad y recorte hacia dentro", tone: "gold" },
    { icon: "", label: "Club", value: "Bayern", tone: "neutral" },
  ] },
  { id: "pirlo-2006", playerId: "andrea-pirlo", worldCup: 2006, source: "FIFA / Mundial 2006", funFact: "Andrea Pirlo fue clave en la Italia campeona del Mundial 2006.", clues: [
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
  { id: "buffon-2006", playerId: "gianluigi-buffon", worldCup: 2006, source: "FIFA / Mundial 2006", funFact: "Gianluigi Buffon fue el portero titular de Italia campeona en 2006.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Italia", tone: "red" },
    { icon: "", label: "Posicion", value: "Portero", tone: "blue" },
    { icon: "", label: "Club", value: "Juventus", tone: "neutral" },
    { icon: "", label: "Pista", value: "Leyenda bajo palos", tone: "green" },
  ] },
  { id: "puyol-2010", playerId: "carles-puyol", worldCup: 2010, source: "FIFA / Mundial 2010", funFact: "Carles Puyol marco el gol de semifinales contra Alemania en 2010.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Momento", value: "Gol en semifinales", tone: "green" },
    { icon: "", label: "Seleccion", value: "Espana", tone: "red" },
    { icon: "", label: "Posicion", value: "Defensa", tone: "blue" },
    { icon: "", label: "Club", value: "Barcelona", tone: "neutral" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
  ] },
  { id: "xavi-2010", playerId: "xavi", worldCup: 2010, source: "FIFA / Mundial 2010", funFact: "Xavi fue el cerebro de la Espana campeona del Mundial 2010.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Espana", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Barcelona", tone: "neutral" },
    { icon: "", label: "Pista", value: "Control y pase", tone: "green" },
  ] },
  { id: "torres-2006", playerId: "fernando-torres", worldCup: 2006, source: "FIFA / Mundial 2006", funFact: "Fernando Torres marco tres goles en el Mundial 2006.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Goles", value: "3 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Espana", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Atletico de Madrid", tone: "neutral" },
    { icon: "", label: "Pista", value: "El Nino", tone: "gold" },
  ] },
  { id: "ronaldinho-2002", playerId: "ronaldinho", worldCup: 2002, source: "FIFA / Mundial 2002", funFact: "Ronaldinho marco un gol inolvidable de falta a Inglaterra en 2002.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2002", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Brasil", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "PSG", tone: "neutral" },
    { icon: "", label: "Momento", value: "Golazo a Inglaterra", tone: "green" },
  ] },
  { id: "kaka-2006", playerId: "kaka", worldCup: 2006, source: "FIFA / Mundial 2006", funFact: "Kaka llego al Mundial 2006 como una de las grandes estrellas de Brasil.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Brasil", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "AC Milan", tone: "neutral" },
    { icon: "", label: "Pista", value: "Elegancia y llegada", tone: "green" },
    { icon: "", label: "Rol", value: "Figura mundialista", tone: "gold" },
  ] },
  { id: "neymar-2014", playerId: "neymar", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "Neymar marco 4 goles en Brasil 2014 antes de lesionarse en cuartos.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Goles", value: "4 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Brasil", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Barcelona", tone: "neutral" },
    { icon: "", label: "Rol", value: "Figura local", tone: "gold" },
  ] },
  { id: "lahm-2014", playerId: "philipp-lahm", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "Philipp Lahm fue el capitan de Alemania campeona en Brasil 2014.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Rol", value: "Capitan campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Alemania", tone: "red" },
    { icon: "", label: "Posicion", value: "Defensa", tone: "blue" },
    { icon: "", label: "Club", value: "Bayern", tone: "neutral" },
    { icon: "", label: "Pista", value: "Lateral y lider", tone: "green" },
  ] },
  { id: "muller-2014", playerId: "thomas-muller", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "Thomas Muller marco 5 goles en el Mundial 2014.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Goles", value: "5 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Alemania", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Bayern", tone: "neutral" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
  ] },
  { id: "ozil-2010", playerId: "mesut-ozil", worldCup: 2010, source: "FIFA / Mundial 2010", funFact: "Mesut Ozil fue una de las revelaciones de Alemania en Sudafrica 2010.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Alemania", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Werder Bremen", tone: "neutral" },
    { icon: "", label: "Rol", value: "Semifinalista", tone: "green" },
    { icon: "", label: "Pista", value: "Zurda creativa", tone: "gold" },
  ] },
  { id: "henry-2006", playerId: "thierry-henry", worldCup: 2006, source: "FIFA / Mundial 2006", funFact: "Thierry Henry fue el principal delantero de Francia en el Mundial 2006.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Rol", value: "Finalista", tone: "blue" },
    { icon: "", label: "Seleccion", value: "Francia", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Arsenal", tone: "neutral" },
    { icon: "", label: "Pista", value: "Velocidad y definicion", tone: "green" },
  ] },
  { id: "pogba-2018", playerId: "paul-pogba", worldCup: 2018, source: "FIFA / Mundial 2018", funFact: "Paul Pogba marco en la final del Mundial 2018.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2018", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Momento", value: "Gol en la final", tone: "green" },
    { icon: "", label: "Seleccion", value: "Francia", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Manchester United", tone: "neutral" },
  ] },
  { id: "figo-2006", playerId: "luis-figo", worldCup: 2006, source: "FIFA / Mundial 2006", funFact: "Luis Figo capitaneo a Portugal hasta semifinales en el Mundial 2006.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2006", tone: "gold" },
    { icon: "", label: "Rol", value: "Semifinalista", tone: "green" },
    { icon: "", label: "Seleccion", value: "Portugal", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Inter", tone: "neutral" },
    { icon: "", label: "Pista", value: "Capitan y leyenda", tone: "gold" },
  ] },
  { id: "van-persie-2014", playerId: "robin-van-persie", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "Robin van Persie marco de cabeza en palomita contra Espana en Brasil 2014.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Momento", value: "Gol de palomita", tone: "green" },
    { icon: "", label: "Seleccion", value: "Holanda", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Manchester United", tone: "neutral" },
    { icon: "", label: "Rol", value: "Semifinalista", tone: "gold" },
  ] },
  { id: "cavani-2010", playerId: "edinson-cavani", worldCup: 2010, source: "FIFA / Mundial 2010", funFact: "Edinson Cavani formo parte de la Uruguay semifinalista de 2010.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2010", tone: "gold" },
    { icon: "", label: "Rol", value: "Semifinalista", tone: "green" },
    { icon: "", label: "Seleccion", value: "Uruguay", tone: "red" },
    { icon: "", label: "Posicion", value: "Delantero", tone: "blue" },
    { icon: "", label: "Club", value: "Palermo", tone: "neutral" },
    { icon: "", label: "Pista", value: "Garrote charrua", tone: "gold" },
  ] },
  { id: "james-2014", playerId: "james-rodriguez", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "James Rodriguez fue el maximo goleador del Mundial 2014 con 6 goles.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Goles", value: "6 goles", tone: "green" },
    { icon: "", label: "Seleccion", value: "Colombia", tone: "red" },
    { icon: "", label: "Posicion", value: "Centrocampista", tone: "blue" },
    { icon: "", label: "Club", value: "Monaco", tone: "neutral" },
    { icon: "", label: "Premio", value: "Bota de Oro", tone: "gold" },
  ] },
  { id: "dibu-2022", playerId: "dibu-martinez", worldCup: 2022, source: "FIFA / Mundial 2022", funFact: "Dibu Martinez fue elegido mejor portero del Mundial 2022.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2022", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Premio", value: "Guante de Oro", tone: "green" },
    { icon: "", label: "Seleccion", value: "Argentina", tone: "red" },
    { icon: "", label: "Posicion", value: "Portero", tone: "blue" },
    { icon: "", label: "Club", value: "Aston Villa", tone: "neutral" },
  ] },
  { id: "ochoa-2014", playerId: "guillermo-ochoa", worldCup: 2014, source: "FIFA / Mundial 2014", funFact: "Guillermo Ochoa firmo una actuacion memorable contra Brasil en 2014.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2014", tone: "gold" },
    { icon: "", label: "Momento", value: "Paradones contra Brasil", tone: "green" },
    { icon: "", label: "Seleccion", value: "Mexico", tone: "red" },
    { icon: "", label: "Posicion", value: "Portero", tone: "blue" },
    { icon: "", label: "Club", value: "Ajaccio", tone: "neutral" },
    { icon: "", label: "Rol", value: "Heroe inesperado", tone: "gold" },
  ] },
  { id: "courtois-2018", playerId: "thibaut-courtois", worldCup: 2018, source: "FIFA / Mundial 2018", funFact: "Thibaut Courtois fue elegido mejor portero del Mundial 2018.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2018", tone: "gold" },
    { icon: "", label: "Premio", value: "Guante de Oro", tone: "green" },
    { icon: "", label: "Seleccion", value: "Belgica", tone: "red" },
    { icon: "", label: "Posicion", value: "Portero", tone: "blue" },
    { icon: "", label: "Club", value: "Chelsea", tone: "neutral" },
    { icon: "", label: "Rol", value: "Semifinalista", tone: "gold" },
  ] },
  { id: "dida-2002", playerId: "dida", worldCup: 2002, source: "FIFA / Mundial 2002", funFact: "Dida formo parte de la Brasil campeona del Mundial 2002.", clues: [
    { icon: "", label: "Mundial", value: "Mundial 2002", tone: "gold" },
    { icon: "", label: "Rol", value: "Campeon", tone: "gold" },
    { icon: "", label: "Seleccion", value: "Brasil", tone: "red" },
    { icon: "", label: "Posicion", value: "Portero", tone: "blue" },
    { icon: "", label: "Club", value: "Corinthians", tone: "neutral" },
    { icon: "", label: "Pista", value: "Portero historico", tone: "green" },
  ] },
];

const featuredPlayerIds = new Set(featuredMundialdleChallenges.map(challenge => challenge.playerId));

const rosterMundialdleChallenges: MundialdleChallenge[] = worldCupPlayers
  .filter(player => !featuredPlayerIds.has(player.id))
  .map(player => {
    const club = player.clubsByWorldCup?.find(item => item.year === player.mainWorldCup)?.club
      ?? player.clubsByWorldCup?.[0]?.club
      ?? "Club no disponible";
    const clues: MundialdleChallenge["clues"] = [
      { icon: "", label: "Mundial", value: `Mundial ${player.mainWorldCup}`, tone: "gold" },
      { icon: "", label: "Rol", value: player.worldCupRole, tone: "gold" },
      { icon: "", label: "Seleccion", value: player.nationality, tone: "red" },
      { icon: "", label: "Posicion", value: player.position, tone: "blue" },
    ];
    if (typeof player.worldCupGoals === "number") {
      clues.push({ icon: "", label: "Goles", value: `${player.worldCupGoals} goles`, tone: "green" });
    }
    clues.push({ icon: "", label: "Club", value: club, tone: "neutral" });

    return {
      id: `${player.id}-${player.mainWorldCup}`,
      playerId: player.id,
      worldCup: player.mainWorldCup,
      source: `FIFA / Mundial ${player.mainWorldCup}`,
      clues,
    };
  });

export const mundialdleChallenges: MundialdleChallenge[] = [
  ...featuredMundialdleChallenges,
  ...rosterMundialdleChallenges,
];

export function getDailyMundialdleChallenge(dayNumber: number) {
  return mundialdleChallenges[dayNumber % mundialdleChallenges.length];
}
