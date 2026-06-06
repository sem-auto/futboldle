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
  topType: "TOP HISTÓRICO VERIFICABLE";
  source: string;
  top20Unlockable?: boolean;
  title: string;
  subtitle: string;
  consigna: string;
  emoji: string;
  answers: Top10Answer[];
  extendedAnswers?: Top10Answer[];
}

export const top10Challenges: Top10Challenge[] = [
  {
    id: "goleadores-bbva-2005-2016",
    kind: "FÁCIL",
    category: "GOLEADORES",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: rankings históricos de goleadores de LaLiga 2005-2016.",
    top20Unlockable: true,
    title: "Máximos goleadores BBVA",
    subtitle: "Liga BBVA 2005-2016",
    consigna: "Completa el Top10 de goleadores de la era BBVA.",
    emoji: "⚽",
    answers: [
      { position: 1, answer: "MESSI", displayName: "Messi", detail: "319 goles", hintNationality: "Argentina", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L_____ M____" },
      { position: 2, answer: "RONALDO", displayName: "Cristiano Ronaldo", detail: "246 goles", hintNationality: "Portugal", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "C________ R______" },
      { position: 3, answer: "VILLA", displayName: "David Villa", detail: "185 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "D____ V____" },
      { position: 4, answer: "BENZEMA", displayName: "Benzema", detail: "165 goles", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "K____ B______" },
      { position: 5, answer: "FORLAN", displayName: "Forlán", detail: "128 goles", hintNationality: "Uruguay", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "D____ F_____" },
      { position: 6, answer: "HIGUAIN", displayName: "Higuaín", detail: "107 goles", hintNationality: "Argentina", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "G______ H______" },
      { position: 7, answer: "ADURIZ", displayName: "Aduriz", detail: "105 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Athletic Club", hintInitial: "A____ A_____" },
      { position: 8, answer: "NEGREDO", displayName: "Negredo", detail: "102 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "Á_____ N______" },
      { position: 9, answer: "SOLDADO", displayName: "Soldado", detail: "101 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "R______ S______" },
      { position: 10, answer: "GRIEZMANN", displayName: "Griezmann", detail: "94 goles", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "A_______ G________" },
    ],
    extendedAnswers: [
      { position: 11, answer: "KANOUTE", displayName: "Kanouté", detail: "89 goles", hintNationality: "Mali", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "F_______ K______" },
      { position: 12, answer: "FALCAO", displayName: "Falcao", detail: "70 goles", hintNationality: "Colombia", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "R______ F_____" },
      { position: 13, answer: "SUAREZ", displayName: "Luis Suárez", detail: "59 goles", hintNationality: "Uruguay", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L___ S_____" },
      { position: 14, answer: "ROSSI", displayName: "Rossi", detail: "54 goles", hintNationality: "Italia", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "G_______ R____" },
      { position: 15, answer: "ASPAS", displayName: "Aspas", detail: "53 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Celta de Vigo", hintInitial: "I___ A____" },
      { position: 16, answer: "CASTRO", displayName: "Rubén Castro", detail: "52 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Betis", hintInitial: "R_____ C______" },
      { position: 17, answer: "LLORENTE", displayName: "Llorente", detail: "50 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Athletic Club", hintInitial: "F_______ L_______" },
      { position: 18, answer: "JONAS", displayName: "Jonas", detail: "43 goles", hintNationality: "Brasil", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "J____" },
      { position: 19, answer: "NILMAR", displayName: "Nilmar", detail: "36 goles", hintNationality: "Brasil", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "N_____" },
      { position: 20, answer: "UCHE", displayName: "Ikechukwu Uche", detail: "35 goles", hintNationality: "Nigeria", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "I_________ U___" },
    ],
  },
  {
    id: "goleadores-espanoles-bbva",
    kind: "MEDIO",
    category: "GOLEADORES",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: archivo histórico de goleadores españoles en LaLiga era BBVA.",
    title: "Máximos goleadores españoles",
    subtitle: "Liga BBVA 2005-2016",
    consigna: "Completa el Top10 de goleadores españoles de la era BBVA.",
    emoji: "🇪🇸",
    answers: [
      { position: 1, answer: "VILLA", displayName: "David Villa", detail: "185 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "D____ V____" },
      { position: 2, answer: "ADURIZ", displayName: "Aduriz", detail: "105 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Athletic Club", hintInitial: "A____ A_____" },
      { position: 3, answer: "NEGREDO", displayName: "Negredo", detail: "102 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "Á_____ N______" },
      { position: 4, answer: "SOLDADO", displayName: "Soldado", detail: "101 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "R______ S______" },
      { position: 5, answer: "ASPAS", displayName: "Aspas", detail: "53 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Celta de Vigo", hintInitial: "I___ A____" },
      { position: 6, answer: "CASTRO", displayName: "Rubén Castro", detail: "52 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Betis", hintInitial: "R_____ C______" },
      { position: 7, answer: "LLORENTE", displayName: "Llorente", detail: "50 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Athletic Club", hintInitial: "F_______ L_______" },
      { position: 8, answer: "TORRES", displayName: "Fernando Torres", detail: "44 goles", hintNationality: "España", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "F_______ T_____" },
      { position: 9, answer: "MATA", displayName: "Mata", detail: "33 goles", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "J___ M___" },
      { position: 10, answer: "NAVAS", displayName: "Jesús Navas", detail: "23 goles", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "J____ N____" },
    ],
  },
  {
    id: "asistencias-bbva-2005-2016",
    kind: "MEDIO",
    category: "ASISTENCIAS",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: StatBunker/FBref y listados históricos de asistencias de LaLiga por temporada.",
    top20Unlockable: true,
    title: "Máximos asistentes BBVA",
    subtitle: "Liga BBVA 2005-2016",
    consigna: "Completa el Top10 de asistentes de la era BBVA.",
    emoji: "🎯",
    answers: [
      { position: 1, answer: "MESSI", displayName: "Messi", detail: "127 asistencias", hintNationality: "Argentina", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "L_____ M____" },
      { position: 2, answer: "RONALDO", displayName: "Cristiano Ronaldo", detail: "80 asistencias", hintNationality: "Portugal", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "C________ R______" },
      { position: 3, answer: "XAVI", displayName: "Xavi", detail: "78 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Barcelona", hintInitial: "X___ H________" },
      { position: 4, answer: "INIESTA", displayName: "Iniesta", detail: "76 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Barcelona", hintInitial: "A_____ I______" },
      { position: 5, answer: "ALVES", displayName: "Dani Alves", detail: "75 asistencias", hintNationality: "Brasil", hintPosition: "Defensa", hintClub: "Barcelona", hintInitial: "D___ A____" },
      { position: 6, answer: "BENZEMA", displayName: "Benzema", detail: "73 asistencias", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Real Madrid", hintInitial: "K____ B______" },
      { position: 7, answer: "SILVA", displayName: "David Silva", detail: "70 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "D____ S____" },
      { position: 8, answer: "JOAQUIN", displayName: "Joaquín", detail: "68 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Betis", hintInitial: "J______ S______" },
      { position: 9, answer: "NAVAS", displayName: "Jesús Navas", detail: "64 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "J____ N____" },
      { position: 10, answer: "CAZORLA", displayName: "Cazorla", detail: "62 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Villarreal", hintInitial: "S____ C______" },
    ],
    extendedAnswers: [
      { position: 11, answer: "OZIL", displayName: "Özil", detail: "54 asistencias", hintNationality: "Alemania", hintPosition: "Centrocampista", hintClub: "Real Madrid", hintInitial: "M____ Ö___" },
      { position: 12, answer: "RAKITIC", displayName: "Rakitic", detail: "52 asistencias", hintNationality: "Croacia", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "I___ R______" },
      { position: 13, answer: "FABREGAS", displayName: "Fàbregas", detail: "48 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Barcelona", hintInitial: "C____ F_______" },
      { position: 14, answer: "PEDRO", displayName: "Pedro", detail: "45 asistencias", hintNationality: "España", hintPosition: "Delantero", hintClub: "Barcelona", hintInitial: "P____ R________" },
      { position: 15, answer: "VALERON", displayName: "Valerón", detail: "42 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Deportivo", hintInitial: "J___ C_____ V______" },
      { position: 16, answer: "BANEGA", displayName: "Banega", detail: "39 asistencias", hintNationality: "Argentina", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "É___ B_____" },
      { position: 17, answer: "PAREJO", displayName: "Parejo", detail: "37 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "D____ P_____" },
      { position: 18, answer: "REYES", displayName: "Reyes", detail: "35 asistencias", hintNationality: "España", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "J___ A______ R____" },
      { position: 19, answer: "CANI", displayName: "Cani", detail: "34 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Villarreal", hintInitial: "C___" },
      { position: 20, answer: "MATA", displayName: "Mata", detail: "33 asistencias", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "J___ M___" },
    ],
  },
  {
    id: "porteros-porterias-cero-bbva",
    kind: "FÁCIL",
    category: "PORTEROS",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: listados históricos de porterías a cero de LaLiga.",
    title: "Más porterías a cero",
    subtitle: "Porteros · Liga BBVA",
    consigna: "Completa el Top10 de porteros con más porterías a cero.",
    emoji: "🧤",
    answers: [
      { position: 1, answer: "CASILLAS", displayName: "Casillas", detail: "177 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Real Madrid", hintInitial: "I___ C_______" },
      { position: 2, answer: "VALDES", displayName: "Víctor Valdés", detail: "173 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Barcelona", hintInitial: "V_____ V_____" },
      { position: 3, answer: "BRAVO", displayName: "Claudio Bravo", detail: "82 porterías a cero", hintNationality: "Chile", hintPosition: "Portero", hintClub: "Real Sociedad", hintInitial: "C______ B_____" },
      { position: 4, answer: "PALOP", displayName: "Palop", detail: "74 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Sevilla", hintInitial: "A______ P____" },
      { position: 5, answer: "ALVES", displayName: "Diego Alves", detail: "68 porterías a cero", hintNationality: "Brasil", hintPosition: "Portero", hintClub: "Valencia", hintInitial: "D____ A_____" },
      { position: 6, answer: "IRAIZOZ", displayName: "Iraizoz", detail: "65 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Athletic Club", hintInitial: "G____ I______" },
      { position: 7, answer: "KAMENI", displayName: "Kameni", detail: "59 porterías a cero", hintNationality: "Camerún", hintPosition: "Portero", hintClub: "Málaga", hintInitial: "C_____ K_____" },
      { position: 8, answer: "CABALLERO", displayName: "Caballero", detail: "52 porterías a cero", hintNationality: "Argentina", hintPosition: "Portero", hintClub: "Málaga", hintInitial: "W____ C________" },
      { position: 9, answer: "NAVAS", displayName: "Keylor Navas", detail: "48 porterías a cero", hintNationality: "Costa Rica", hintPosition: "Portero", hintClub: "Levante", hintInitial: "K_____ N____" },
      { position: 10, answer: "GUAITA", displayName: "Guaita", detail: "34 porterías a cero", hintNationality: "España", hintPosition: "Portero", hintClub: "Valencia", hintInitial: "V______ G_____" },
    ],
  },
  {
    id: "partidos-valencia-bbva",
    kind: "MEDIO",
    category: "CLUBES",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: registros históricos de apariciones del Valencia CF en la era BBVA.",
    title: "Más partidos Valencia",
    subtitle: "Valencia CF · Era BBVA",
    consigna: "Completa el Top10 de jugadores con más partidos del Valencia en la era BBVA.",
    emoji: "🦇",
    answers: [
      { position: 1, answer: "ALBELDA", displayName: "Albelda", detail: "350+ partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "D____ A______" },
      { position: 2, answer: "MARCHENA", displayName: "Marchena", detail: "300+ partidos oficiales", hintNationality: "España", hintPosition: "Defensa", hintClub: "Valencia", hintInitial: "C_____ M_______" },
      { position: 3, answer: "JOAQUIN", displayName: "Joaquín", detail: "200+ partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "J______ S______" },
      { position: 4, answer: "VILLA", displayName: "David Villa", detail: "225 partidos oficiales", hintNationality: "España", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "D____ V____" },
      { position: 5, answer: "MATA", displayName: "Mata", detail: "174 partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "J___ M___" },
      { position: 6, answer: "SILVA", displayName: "David Silva", detail: "168 partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "D____ S____" },
      { position: 7, answer: "ALVES", displayName: "Diego Alves", detail: "170+ partidos oficiales", hintNationality: "Brasil", hintPosition: "Portero", hintClub: "Valencia", hintInitial: "D____ A_____" },
      { position: 8, answer: "PAREJO", displayName: "Parejo", detail: "380+ partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "D____ P_____" },
      { position: 9, answer: "SOLDADO", displayName: "Soldado", detail: "141 partidos oficiales", hintNationality: "España", hintPosition: "Delantero", hintClub: "Valencia", hintInitial: "R______ S______" },
      { position: 10, answer: "PIATTI", displayName: "Piatti", detail: "160+ partidos oficiales", hintNationality: "Argentina", hintPosition: "Centrocampista", hintClub: "Valencia", hintInitial: "P____ P_____" },
    ],
  },
  {
    id: "partidos-atletico-bbva",
    kind: "MEDIO",
    category: "CLUBES",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: registros históricos de apariciones del Atlético de Madrid en la era BBVA.",
    title: "Más partidos Atlético",
    subtitle: "Atlético de Madrid · Era BBVA",
    consigna: "Completa el Top10 de jugadores con más partidos del Atlético en la era BBVA.",
    emoji: "🔴",
    answers: [
      { position: 1, answer: "GABI", displayName: "Gabi", detail: "400+ partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Atlético de Madrid", hintInitial: "G___" },
      { position: 2, answer: "GODIN", displayName: "Godín", detail: "389 partidos oficiales", hintNationality: "Uruguay", hintPosition: "Defensa", hintClub: "Atlético de Madrid", hintInitial: "D____ G____" },
      { position: 3, answer: "JUANFRAN", displayName: "Juanfran", detail: "350+ partidos oficiales", hintNationality: "España", hintPosition: "Defensa", hintClub: "Atlético de Madrid", hintInitial: "J_______ T_____" },
      { position: 4, answer: "KOKE", displayName: "Koke", detail: "300+ partidos oficiales en la era BBVA", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Atlético de Madrid", hintInitial: "K___" },
      { position: 5, answer: "TORRES", displayName: "Fernando Torres", detail: "250+ partidos oficiales", hintNationality: "España", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "F_______ T_____" },
      { position: 6, answer: "FORLAN", displayName: "Forlán", detail: "198 partidos oficiales", hintNationality: "Uruguay", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "D____ F_____" },
      { position: 7, answer: "FALCAO", displayName: "Falcao", detail: "91 partidos oficiales", hintNationality: "Colombia", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "R______ F_____" },
      { position: 8, answer: "GRIEZMANN", displayName: "Griezmann", detail: "100+ partidos oficiales en la era BBVA", hintNationality: "Francia", hintPosition: "Delantero", hintClub: "Atlético de Madrid", hintInitial: "A_______ G________" },
      { position: 9, answer: "ARDA", displayName: "Arda Turan", detail: "178 partidos oficiales", hintNationality: "Turquía", hintPosition: "Centrocampista", hintClub: "Atlético de Madrid", hintInitial: "A___ T____" },
      { position: 10, answer: "TIAGO", displayName: "Tiago", detail: "228 partidos oficiales", hintNationality: "Portugal", hintPosition: "Centrocampista", hintClub: "Atlético de Madrid", hintInitial: "T____ M_____" },
    ],
  },
  {
    id: "partidos-sevilla-bbva",
    kind: "MEDIO",
    category: "CLUBES",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: registros históricos de apariciones del Sevilla FC en la era BBVA.",
    title: "Más partidos Sevilla",
    subtitle: "Sevilla FC · Era BBVA",
    consigna: "Completa el Top10 de jugadores con más partidos del Sevilla en la era BBVA.",
    emoji: "⚪",
    answers: [
      { position: 1, answer: "NAVAS", displayName: "Jesús Navas", detail: "393 partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "J____ N____" },
      { position: 2, answer: "PALOP", displayName: "Palop", detail: "295 partidos oficiales", hintNationality: "España", hintPosition: "Portero", hintClub: "Sevilla", hintInitial: "A______ P____" },
      { position: 3, answer: "KANOUTE", displayName: "Kanouté", detail: "290 partidos oficiales", hintNationality: "Mali", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "F_______ K______" },
      { position: 4, answer: "REYES", displayName: "Reyes", detail: "250+ partidos oficiales", hintNationality: "España", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "J___ A______ R____" },
      { position: 5, answer: "NEGREDO", displayName: "Negredo", detail: "180 partidos oficiales", hintNationality: "España", hintPosition: "Delantero", hintClub: "Sevilla", hintInitial: "Á_____ N______" },
      { position: 6, answer: "RAKITIC", displayName: "Rakitic", detail: "149 partidos oficiales", hintNationality: "Croacia", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "I___ R______" },
      { position: 7, answer: "BANEGA", displayName: "Banega", detail: "170+ partidos oficiales", hintNationality: "Argentina", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "É___ B_____" },
      { position: 8, answer: "CAPEL", displayName: "Diego Capel", detail: "170+ partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Sevilla", hintInitial: "D____ C____" },
      { position: 9, answer: "FAZIO", displayName: "Fazio", detail: "190+ partidos oficiales", hintNationality: "Argentina", hintPosition: "Defensa", hintClub: "Sevilla", hintInitial: "F_______ F____" },
      { position: 10, answer: "ESCUDERO", displayName: "Escudero", detail: "100+ partidos oficiales desde 2015", hintNationality: "España", hintPosition: "Defensa", hintClub: "Sevilla", hintInitial: "S_____ E_______" },
    ],
  },
  {
    id: "partidos-villarreal-bbva",
    kind: "DIFÍCIL",
    category: "CLUBES",
    topType: "TOP HISTÓRICO VERIFICABLE",
    source: "Referencia: registros históricos de apariciones del Villarreal CF en la era BBVA.",
    title: "Más partidos Villarreal",
    subtitle: "Villarreal CF · Era BBVA",
    consigna: "Completa el Top10 de jugadores con más partidos del Villarreal en la era BBVA.",
    emoji: "🟡",
    answers: [
      { position: 1, answer: "BRUNO", displayName: "Bruno Soriano", detail: "425 partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Villarreal", hintInitial: "B____ S______" },
      { position: 2, answer: "SENNA", displayName: "Marcos Senna", detail: "363 partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Villarreal", hintInitial: "M_____ S____" },
      { position: 3, answer: "CANI", displayName: "Cani", detail: "327 partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Villarreal", hintInitial: "C___" },
      { position: 4, answer: "TRIGUEROS", displayName: "Trigueros", detail: "450+ partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Villarreal", hintInitial: "M_____ T________" },
      { position: 5, answer: "GASPAR", displayName: "Mario Gaspar", detail: "400+ partidos oficiales", hintNationality: "España", hintPosition: "Defensa", hintClub: "Villarreal", hintInitial: "M____ G_____" },
      { position: 6, answer: "CAZORLA", displayName: "Cazorla", detail: "334 partidos oficiales", hintNationality: "España", hintPosition: "Centrocampista", hintClub: "Villarreal", hintInitial: "S____ C______" },
      { position: 7, answer: "MUSACCHIO", displayName: "Musacchio", detail: "249 partidos oficiales", hintNationality: "Argentina", hintPosition: "Defensa", hintClub: "Villarreal", hintInitial: "M____ M________" },
      { position: 8, answer: "ROSSI", displayName: "Rossi", detail: "192 partidos oficiales", hintNationality: "Italia", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "G_______ R____" },
      { position: 9, answer: "NILMAR", displayName: "Nilmar", detail: "116 partidos oficiales", hintNationality: "Brasil", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "N_____" },
      { position: 10, answer: "UCHE", displayName: "Ikechukwu Uche", detail: "100+ partidos oficiales", hintNationality: "Nigeria", hintPosition: "Delantero", hintClub: "Villarreal", hintInitial: "I_________ U___" },
    ],
  },
];

export function getDailyTop10(): Top10Challenge {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return top10Challenges[seed % top10Challenges.length];
}
