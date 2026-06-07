export type Top10Category = "GOLEADORES" | "ASISTENCIAS" | "PORTEROS" | "CLUBES";

export interface Top10Answer {
  position: number;
  answer: string;
  displayName: string;
  detail: string;
  hintNationality: string;
  hintPosition: string;
  hintClub: string;
  hintInitial: string;
}

export interface Top10Challenge {
  id: string;
  kind: "FÁCIL" | "MEDIO" | "DIFÍCIL";
  category: Top10Category;
  topType: "TOP HISTÓRICO VERIFICADO";
  period: string;
  criterion: string;
  source: string;
  sourceUrl: string;
  top20Unlockable?: boolean;
  title: string;
  subtitle: string;
  consigna: string;
  emoji: string;
  answers: Top10Answer[];
  extendedAnswers?: Top10Answer[];
}

export const removedUnverifiedTops = [
  "Máximos goleadores BBVA 2005/06-2015/16 acumulado",
  "Máximos goleadores españoles BBVA acumulado",
  "Más partidos Valencia era BBVA",
  "Más partidos Atlético era BBVA",
  "Más partidos Sevilla era BBVA",
  "Más partidos Villarreal era BBVA",
];

export const pendingRequestedTops = [
  "Top goleadores 08/09",
  "Top goleadores 09/10",
  "Top goleadores 10/11",
  "Top goleadores 11/12",
  "Top goleadores 12/13",
  "Top goleadores 13/14",
  "Top goleadores 14/15",
  "Top asistencias 08/09",
  "Top asistencias 09/10",
  "Top asistencias 10/11",
  "Top asistencias 11/12",
  "Top asistencias 13/14",
  "Top asistencias 14/15",
  "Top porterías 10/11",
  "Top porterías 11/12",
  "Top porterías 12/13",
  "Top porterías 13/14",
  "Top porterías 14/15",
  "Máximos goleadores era BBVA",
  "Máximos asistentes era BBVA",
  "Más partidos era BBVA",
  "Más partidos Valencia era BBVA",
  "Más partidos Sevilla era BBVA",
  "Más partidos Atlético era BBVA",
  "Más partidos Villarreal era BBVA",
  "Más partidos Athletic era BBVA",
  "Más porterías a cero era BBVA",
  "Más goles españoles era BBVA",
  "Más asistencias españolas era BBVA",
];

export const top10Challenges: Top10Challenge[] = [
  {
    // Fuente consultada: StatBunker, La Liga 15/16 Top goal scorers.
    id: "statbunker-laliga-2015-16-goleadores",
    kind: "FÁCIL",
    category: "GOLEADORES",
    topType: "TOP HISTÓRICO VERIFICADO",
    period: "2015/16",
    criterion: "Goles marcados en LaLiga 2015/16",
    source: "StatBunker · La Liga 15/16 Top goal scorers",
    sourceUrl: "https://www.statbunker.com/competitions/TopGoalScorers?comp_id=518",
    top20Unlockable: true,
    title: "Top goleadores LaLiga 15/16",
    subtitle: "2015/16 · goles en Liga",
    consigna: "Completa el Top10 oficial de goleadores de LaLiga 2015/16.",
    emoji: "⚽",
    answers: [
      { position: 1, answer: "SUAREZ", displayName: "Luis Suárez", detail: "40 goles", hintNationality: "Uruguay", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L___ S_____" },
      { position: 2, answer: "RONALDO", displayName: "Cristiano Ronaldo", detail: "35 goles", hintNationality: "Portugal", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "C________ R______" },
      { position: 3, answer: "MESSI", displayName: "Messi", detail: "26 goles", hintNationality: "Argentina", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L_____ M____" },
      { position: 4, answer: "NEYMAR", displayName: "Neymar", detail: "24 goles", hintNationality: "Brasil", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "N_____" },
      { position: 5, answer: "BENZEMA", displayName: "Benzema", detail: "24 goles", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "K____ B______" },
      { position: 6, answer: "GRIEZMANN", displayName: "Griezmann", detail: "22 goles", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "A_______ G________" },
      { position: 7, answer: "ADURIZ", displayName: "Aduriz", detail: "20 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Athletic Club", hintInitial: "A____ A_____" },
      { position: 8, answer: "CASTRO", displayName: "Rubén Castro", detail: "19 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Betis", hintInitial: "R_____ C______" },
      { position: 9, answer: "BALE", displayName: "Gareth Bale", detail: "19 goles", hintNationality: "Gales", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "G_____ B___" },
      { position: 10, answer: "BORJA", displayName: "Borja Bastón", detail: "18 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Eibar", hintInitial: "B____ B_____" },
    ],
    extendedAnswers: [
      { position: 11, answer: "PEREZ", displayName: "Lucas Pérez", detail: "17 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Deportivo", hintInitial: "L____ P____" },
      { position: 12, answer: "GAMEIRO", displayName: "Gameiro", detail: "16 goles", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "K____ G______" },
      { position: 13, answer: "EL-ARABI", displayName: "El-Arabi", detail: "16 goles", hintNationality: "Marruecos", hintPosition: "Delantero", hintClub: "Granada", hintInitial: "Y______ E_-A____" },
      { position: 14, answer: "ASPAS", displayName: "Aspas", detail: "14 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Celta de Vigo", hintInitial: "I___ A____" },
      { position: 15, answer: "ALCACER", displayName: "Alcácer", detail: "13 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "P___ A______" },
      { position: 16, answer: "AGIRRETXE", displayName: "Agirretxe", detail: "13 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Real Sociedad", hintInitial: "I_____ A________" },
      { position: 17, answer: "BAKAMBU", displayName: "Bakambu", detail: "12 goles", hintNationality: "RD Congo", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "C_____ B_______" },
      { position: 18, answer: "NOLITO", displayName: "Nolito", detail: "12 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Celta de Vigo", hintInitial: "N_____" },
      { position: 19, answer: "SANABRIA", displayName: "Sanabria", detail: "11 goles", hintNationality: "Paraguay", hintPosition: "Delantero", hintClub: "Sporting Gijón", hintInitial: "A______ S_______" },
      { position: 20, answer: "VELA", displayName: "Carlos Vela", detail: "11 goles", hintNationality: "México", hintPosition: "Delantero", hintClub: "Real Sociedad", hintInitial: "C_____ V___" },
    ],
  },
  {
    // Fuente consultada: StatBunker, La Liga 15/16 Most assists.
    id: "statbunker-laliga-2015-16-asistencias",
    kind: "MEDIO",
    category: "ASISTENCIAS",
    topType: "TOP HISTÓRICO VERIFICADO",
    period: "2015/16",
    criterion: "Asistencias en LaLiga 2015/16",
    source: "StatBunker · La Liga 15/16 Most assists",
    sourceUrl: "https://www.statbunker.com/competitions/MostAssists?comp_id=518",
    title: "Top asistencias LaLiga 15/16",
    subtitle: "2015/16 · asistencias",
    consigna: "Completa el Top10 oficial de asistentes de LaLiga 2015/16.",
    emoji: "🎯",
    answers: [
      { position: 1, answer: "SUAREZ", displayName: "Luis Suárez", detail: "16 asistencias", hintNationality: "Uruguay", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L___ S_____" },
      { position: 2, answer: "MESSI", displayName: "Messi", detail: "16 asistencias", hintNationality: "Argentina", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L_____ M____" },
      { position: 3, answer: "KOKE", displayName: "Koke", detail: "14 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Atlético de Madrid", hintInitial: "K___" },
      { position: 4, answer: "NEYMAR", displayName: "Neymar", detail: "13 asistencias", hintNationality: "Brasil", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "N_____" },
      { position: 5, answer: "RONALDO", displayName: "Cristiano Ronaldo", detail: "11 asistencias", hintNationality: "Portugal", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "C________ R______" },
      { position: 6, answer: "SOLDADO", displayName: "Soldado", detail: "10 asistencias", hintNationality: "España", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "R______ S______" },
      { position: 7, answer: "KROOS", displayName: "Toni Kroos", detail: "10 asistencias", hintNationality: "Alemania", hintPosition: "Centrocampista", hintClub: "Real Madrid", hintInitial: "T___ K____" },
      { position: 8, answer: "ASENSIO", displayName: "Marco Asensio", detail: "10 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Espanyol", hintInitial: "M____ A______" },
      { position: 9, answer: "BALE", displayName: "Gareth Bale", detail: "10 asistencias", hintNationality: "Gales", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "G_____ B___" },
      { position: 10, answer: "SUSAETA", displayName: "Susaeta", detail: "8 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Athletic Club", hintInitial: "M_____ S______" },
    ],
  },
  {
    // Fuente consultada: StatBunker, La Liga 12/13 Most assists.
    id: "statbunker-laliga-2012-13-asistencias",
    kind: "DIFÍCIL",
    category: "ASISTENCIAS",
    topType: "TOP HISTÓRICO VERIFICADO",
    period: "2012/13",
    criterion: "Asistencias en LaLiga 2012/13",
    source: "StatBunker · La Liga 12/13 Most assists",
    sourceUrl: "https://www.statbunker.com/competitions/MostAssists?comp_id=413",
    title: "Top asistencias LaLiga 12/13",
    subtitle: "2012/13 · asistencias",
    consigna: "Completa el Top10 oficial de asistentes de LaLiga 2012/13.",
    emoji: "🧠",
    answers: [
      { position: 1, answer: "INIESTA", displayName: "Iniesta", detail: "16 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Barcelona", hintInitial: "A_____ I______" },
      { position: 2, answer: "OZIL", displayName: "Özil", detail: "13 asistencias", hintNationality: "Alemania", hintPosition: "Centrocampista", hintClub: "Real Madrid", hintInitial: "M____ Ö___" },
      { position: 3, answer: "MESSI", displayName: "Messi", detail: "12 asistencias", hintNationality: "Argentina", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L_____ M____" },
      { position: 4, answer: "BENZEMA", displayName: "Benzema", detail: "11 asistencias", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "K____ B______" },
      { position: 5, answer: "RONALDO", displayName: "Cristiano Ronaldo", detail: "11 asistencias", hintNationality: "Portugal", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "C________ R______" },
      { position: 6, answer: "KOKE", displayName: "Koke", detail: "10 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Atlético de Madrid", hintInitial: "K___" },
      { position: 7, answer: "FABREGAS", displayName: "Fàbregas", detail: "10 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Barcelona", hintInitial: "C____ F_______" },
      { position: 8, answer: "RAKITIC", displayName: "Rakitic", detail: "10 asistencias", hintNationality: "Croacia", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "I___ R______" },
      { position: 9, answer: "BENAT", displayName: "Beñat", detail: "9 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Betis", hintInitial: "B____ E_______" },
      { position: 10, answer: "IBAI", displayName: "Ibai Gómez", detail: "9 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Athletic Club", hintInitial: "I___ G____" },
    ],
  },
  {
    // Fuente consultada: StatBunker, La Liga 15/16 Clean sheets.
    id: "statbunker-laliga-2015-16-porterias-cero",
    kind: "MEDIO",
    category: "PORTEROS",
    topType: "TOP HISTÓRICO VERIFICADO",
    period: "2015/16",
    criterion: "Porterías a cero en LaLiga 2015/16",
    source: "StatBunker · La Liga 15/16 Clean sheets",
    sourceUrl: "https://www.statbunker.com/competitions/Top10KeepersCleanSheets?comp_id=518",
    title: "Top porterías a cero 15/16",
    subtitle: "2015/16 · clean sheets",
    consigna: "Completa el Top10 oficial de porteros con más porterías a cero.",
    emoji: "🧤",
    answers: [
      { position: 1, answer: "OBLAK", displayName: "Oblak", detail: "24 porterías a cero", hintNationality: "Eslovenia", hintPosition: "Portero", hintClub: "Atlético de Madrid", hintInitial: "J__ O____" },
      { position: 2, answer: "BRAVO", displayName: "Claudio Bravo", detail: "16 porterías a cero", hintNationality: "Chile", hintPosition: "Portero", hintClub: "Barcelona", hintInitial: "C______ B_____" },
      { position: 3, answer: "AREOLA", displayName: "Areola", detail: "15 porterías a cero", hintNationality: "Francia", hintPosition: "Portero", hintClub: "Villarreal", hintInitial: "A_______ A_____" },
      { position: 4, answer: "NAVAS", displayName: "Keylor Navas", detail: "13 porterías a cero", hintNationality: "Costa Rica", hintPosition: "Portero", hintClub: "Real Madrid", hintInitial: "K_____ N____" },
      { position: 5, answer: "IRAIZOZ", displayName: "Iraizoz", detail: "13 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Athletic Club", hintInitial: "G____ I______" },
      { position: 6, answer: "RULLI", displayName: "Rulli", detail: "12 porterías a cero", hintNationality: "Argentina", hintPosition: "Portero", hintClub: "Real Sociedad", hintInitial: "G_______ R____" },
      { position: 7, answer: "ADAN", displayName: "Adán", detail: "12 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Betis", hintInitial: "A______ A___" },
      { position: 8, answer: "RICO", displayName: "Sergio Rico", detail: "10 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Sevilla", hintInitial: "S_____ R___" },
      { position: 9, answer: "KAMENI", displayName: "Kameni", detail: "9 porterías a cero", hintNationality: "Camerún", hintPosition: "Portero", hintClub: "Málaga", hintInitial: "C_____ K_____" },
      { position: 10, answer: "VARAS", displayName: "Javi Varas", detail: "9 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Las Palmas", hintInitial: "J___ V____" },
    ],
  },
];

export function getDailyTop10(): Top10Challenge {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return top10Challenges[seed % top10Challenges.length];
}
