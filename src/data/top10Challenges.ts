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
  kind: "FÁCIL" | "DIFÍCIL";
  source: string;
  top20Unlockable?: boolean;
  title: string;
  subtitle: string;
  consigna: string;
  emoji: string;
  answers: Top10Answer[];
}

export const top10Challenges: Top10Challenge[] = [
  {
    id: "top20-goleadores-bbva-2005-2016",
    kind: "FÁCIL",
    source: "Referencia: rankings históricos de goleadores de LaLiga 2005-2016 cruzados con archivo Futboldle BBVA.",
    top20Unlockable: true,
    title: "Top goleadores BBVA",
    subtitle: "Top20 · Liga BBVA 2005-2016",
    consigna: "Completa el ranking de goleadores más reconocibles de la era BBVA.",
    emoji: "⚽",
    answers: [
      { position:1, answer:"MESSI", displayName:"Messi", detail:"319 goles", hintNationality:"Argentina", hintPosition:"Delantero", hintClub:"Barcelona", hintInitial:"L_____ M____" },
      { position:2, answer:"RONALDO", displayName:"Cristiano Ronaldo", detail:"246 goles", hintNationality:"Portugal", hintPosition:"Delantero", hintClub:"Real Madrid", hintInitial:"C________ R______" },
      { position:3, answer:"VILLA", displayName:"David Villa", detail:"185 goles", hintNationality:"España", hintPosition:"Delantero", hintClub:"Valencia", hintInitial:"D____ V____" },
      { position:4, answer:"BENZEMA", displayName:"Benzema", detail:"165 goles", hintNationality:"Francia", hintPosition:"Delantero", hintClub:"Real Madrid", hintInitial:"K____ B______" },
      { position:5, answer:"FORLAN", displayName:"Forlán", detail:"128 goles", hintNationality:"Uruguay", hintPosition:"Delantero", hintClub:"Atlético de Madrid", hintInitial:"D____ F_____" },
      { position:6, answer:"HIGUAIN", displayName:"Higuaín", detail:"107 goles", hintNationality:"Argentina", hintPosition:"Delantero", hintClub:"Real Madrid", hintInitial:"G______ H______" },
      { position:7, answer:"ADURIZ", displayName:"Aduriz", detail:"105 goles", hintNationality:"España", hintPosition:"Delantero", hintClub:"Athletic Club", hintInitial:"A____ A_____" },
      { position:8, answer:"NEGREDO", displayName:"Negredo", detail:"102 goles", hintNationality:"España", hintPosition:"Delantero", hintClub:"Sevilla", hintInitial:"Á_____ N______" },
      { position:9, answer:"SOLDADO", displayName:"Soldado", detail:"101 goles", hintNationality:"España", hintPosition:"Delantero", hintClub:"Valencia", hintInitial:"R______ S______" },
      { position:10, answer:"GRIEZMANN", displayName:"Griezmann", detail:"94 goles", hintNationality:"Francia", hintPosition:"Delantero", hintClub:"Atlético de Madrid", hintInitial:"A_______ G________" },
      { position:11, answer:"FALCAO", displayName:"Falcao", detail:"70 goles", hintNationality:"Colombia", hintPosition:"Delantero", hintClub:"Atlético de Madrid", hintInitial:"R______ F_____" },
      { position:12, answer:"SUAREZ", displayName:"Luis Suárez", detail:"59 goles", hintNationality:"Uruguay", hintPosition:"Delantero", hintClub:"Barcelona", hintInitial:"L___ S_____" },
      { position:13, answer:"KANOUTE", displayName:"Kanouté", detail:"89 goles", hintNationality:"Mali", hintPosition:"Delantero", hintClub:"Sevilla", hintInitial:"F_______ K______" },
      { position:14, answer:"ROSSI", displayName:"Rossi", detail:"54 goles", hintNationality:"Italia", hintPosition:"Delantero", hintClub:"Villarreal", hintInitial:"G_______ R____" },
      { position:15, answer:"ASPAS", displayName:"Aspas", detail:"53 goles", hintNationality:"España", hintPosition:"Delantero", hintClub:"Celta de Vigo", hintInitial:"I___ A____" },
      { position:16, answer:"CASTRO", displayName:"Rubén Castro", detail:"52 goles", hintNationality:"España", hintPosition:"Delantero", hintClub:"Betis", hintInitial:"R_____ C______" },
      { position:17, answer:"LLORENTE", displayName:"Llorente", detail:"50 goles", hintNationality:"España", hintPosition:"Delantero", hintClub:"Athletic Club", hintInitial:"F_______ L_______" },
      { position:18, answer:"JONAS", displayName:"Jonas", detail:"43 goles", hintNationality:"Brasil", hintPosition:"Delantero", hintClub:"Valencia", hintInitial:"J____" },
      { position:19, answer:"NILMAR", displayName:"Nilmar", detail:"36 goles", hintNationality:"Brasil", hintPosition:"Delantero", hintClub:"Villarreal", hintInitial:"N_____" },
      { position:20, answer:"UCHE", displayName:"Ikechukwu Uche", detail:"35 goles", hintNationality:"Nigeria", hintPosition:"Delantero", hintClub:"Villarreal", hintInitial:"I_________ U___" },
    ],
  },
  {
    id: "asistencias-bbva-2005-2016",
    kind: "FÁCIL",
    source: "Referencia: StatBunker/FBref y listados históricos de asistencias de LaLiga por temporada.",
    title: "Top asistencias BBVA",
    subtitle: "Liga BBVA 2005-2016",
    consigna: "Completa el Top de asistentes de la era BBVA.",
    emoji: "🎯",
    answers: [
      { position:1, answer:"MESSI", displayName:"Messi", detail:"127 asistencias", hintNationality:"Argentina", hintPosition:"Delantero", hintClub:"Barcelona", hintInitial:"L_____ M____" },
      { position:2, answer:"RONALDO", displayName:"Cristiano Ronaldo", detail:"80 asistencias", hintNationality:"Portugal", hintPosition:"Delantero", hintClub:"Real Madrid", hintInitial:"C________ R______" },
      { position:3, answer:"XAVI", displayName:"Xavi", detail:"78 asistencias", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Barcelona", hintInitial:"X___ H________" },
      { position:4, answer:"INIESTA", displayName:"Iniesta", detail:"76 asistencias", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Barcelona", hintInitial:"A_____ I______" },
      { position:5, answer:"ALVES", displayName:"Dani Alves", detail:"75 asistencias", hintNationality:"Brasil", hintPosition:"Defensa", hintClub:"Barcelona", hintInitial:"D___ A____" },
      { position:6, answer:"BENZEMA", displayName:"Benzema", detail:"73 asistencias", hintNationality:"Francia", hintPosition:"Delantero", hintClub:"Real Madrid", hintInitial:"K____ B______" },
      { position:7, answer:"SILVA", displayName:"David Silva", detail:"70 asistencias", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Valencia", hintInitial:"D____ S____" },
      { position:8, answer:"JOAQUIN", displayName:"Joaquín", detail:"68 asistencias", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Betis", hintInitial:"J______ S______" },
      { position:9, answer:"NAVAS", displayName:"Jesús Navas", detail:"64 asistencias", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Sevilla", hintInitial:"J____ N____" },
      { position:10, answer:"CAZORLA", displayName:"Cazorla", detail:"62 asistencias", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"S____ C______" },
    ],
  },
  {
    id: "porteros-bbva-2005-2016",
    kind: "FÁCIL",
    source: "Referencia: listados históricos de porterías a cero y archivo de porteros LaLiga 2005-2016.",
    title: "Top porteros BBVA",
    subtitle: "Porterías a cero",
    consigna: "Completa el Top 10 de porteros más recordados de la era BBVA.",
    emoji: "🧤",
    answers: [
      { position:1, answer:"CASILLAS", displayName:"Casillas", detail:"177 porterías a cero", hintNationality:"España", hintPosition:"Portero", hintClub:"Real Madrid", hintInitial:"I___ C_______" },
      { position:2, answer:"VALDES", displayName:"Víctor Valdés", detail:"173 porterías a cero", hintNationality:"España", hintPosition:"Portero", hintClub:"Barcelona", hintInitial:"V_____ V_____" },
      { position:3, answer:"BRAVO", displayName:"Claudio Bravo", detail:"82 porterías a cero", hintNationality:"Chile", hintPosition:"Portero", hintClub:"Real Sociedad", hintInitial:"C______ B_____" },
      { position:4, answer:"PALOP", displayName:"Palop", detail:"74 porterías a cero", hintNationality:"España", hintPosition:"Portero", hintClub:"Sevilla", hintInitial:"A______ P____" },
      { position:5, answer:"ALVES", displayName:"Diego Alves", detail:"68 porterías a cero", hintNationality:"Brasil", hintPosition:"Portero", hintClub:"Valencia", hintInitial:"D____ A_____" },
      { position:6, answer:"IRAIZOZ", displayName:"Iraizoz", detail:"65 porterías a cero", hintNationality:"España", hintPosition:"Portero", hintClub:"Athletic Club", hintInitial:"G____ I______" },
      { position:7, answer:"KAMENI", displayName:"Kameni", detail:"59 porterías a cero", hintNationality:"Camerún", hintPosition:"Portero", hintClub:"Málaga", hintInitial:"C_____ K_____" },
      { position:8, answer:"CABALLERO", displayName:"Caballero", detail:"52 porterías a cero", hintNationality:"Argentina", hintPosition:"Portero", hintClub:"Málaga", hintInitial:"W____ C________" },
      { position:9, answer:"NAVAS", displayName:"Keylor Navas", detail:"48 porterías a cero", hintNationality:"Costa Rica", hintPosition:"Portero", hintClub:"Levante", hintInitial:"K_____ N____" },
      { position:10, answer:"GUAITA", displayName:"Guaita", detail:"34 porterías a cero", hintNationality:"España", hintPosition:"Portero", hintClub:"Valencia", hintInitial:"V______ G_____" },
    ],
  },
  {
    id: "villarreal-culto-bbva",
    kind: "DIFÍCIL",
    source: "Referencia: registros de apariciones oficiales del Villarreal y archivo BBVA.",
    title: "Top Villarreal culto",
    subtitle: "Submarino amarillo",
    consigna: "Completa el Top de nombres clave del Villarreal BBVA.",
    emoji: "🟡",
    answers: [
      { position:1, answer:"BRUNO", displayName:"Bruno Soriano", detail:"425 partidos oficiales", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"B____ S______" },
      { position:2, answer:"CANI", displayName:"Cani", detail:"327 partidos oficiales", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"C___" },
      { position:3, answer:"SENNA", displayName:"Marcos Senna", detail:"363 partidos oficiales", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"M_____ S____" },
      { position:4, answer:"MUSACCHIO", displayName:"Musacchio", detail:"249 partidos oficiales", hintNationality:"Argentina", hintPosition:"Defensa", hintClub:"Villarreal", hintInitial:"M____ M________" },
      { position:5, answer:"GASPAR", displayName:"Mario Gaspar", detail:"400+ partidos oficiales", hintNationality:"España", hintPosition:"Defensa", hintClub:"Villarreal", hintInitial:"M____ G_____" },
      { position:6, answer:"TRIGUEROS", displayName:"Trigueros", detail:"450+ partidos oficiales", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"M_____ T________" },
      { position:7, answer:"CAZORLA", displayName:"Cazorla", detail:"334 partidos oficiales", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"S____ C______" },
      { position:8, answer:"ROSSI", displayName:"Rossi", detail:"192 partidos oficiales", hintNationality:"Italia", hintPosition:"Delantero", hintClub:"Villarreal", hintInitial:"G_______ R____" },
      { position:9, answer:"NILMAR", displayName:"Nilmar", detail:"116 partidos oficiales", hintNationality:"Brasil", hintPosition:"Delantero", hintClub:"Villarreal", hintInitial:"N_____" },
      { position:10, answer:"UCHE", displayName:"Ikechukwu Uche", detail:"100+ partidos oficiales", hintNationality:"Nigeria", hintPosition:"Delantero", hintClub:"Villarreal", hintInitial:"I_________ U___" },
    ],
  },
  {
    id: "mediocentros-culto-bbva",
    kind: "DIFÍCIL",
    source: "Referencia: archivo Futboldle BBVA y trayectorias históricas LaLiga 2005-2016.",
    title: "Mediocentros de culto",
    subtitle: "Liga BBVA",
    consigna: "Completa el Top de centrocampistas para enfermos de la BBVA.",
    emoji: "🧠",
    answers: [
      { position:1, answer:"SENNA", displayName:"Marcos Senna", detail:"Campeón Euro 2008", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"M_____ S____" },
      { position:2, answer:"VALERON", displayName:"Valerón", detail:"400+ partidos en Primera", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Deportivo", hintInitial:"J___ C_____ V______" },
      { position:3, answer:"BENAT", displayName:"Beñat", detail:"Internacional con España", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Betis", hintInitial:"B____ E_______" },
      { position:4, answer:"CAMACHO", displayName:"Camacho", detail:"Málaga de Champions", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Málaga", hintInitial:"I______ C_______" },
      { position:5, answer:"DUDA", displayName:"Duda", detail:"350+ partidos en Málaga", hintNationality:"Portugal", hintPosition:"Centrocampista", hintClub:"Málaga", hintInitial:"D___" },
      { position:6, answer:"APONO", displayName:"Apoño", detail:"Mediocentro del Málaga", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Málaga", hintInitial:"A____" },
      { position:7, answer:"BARKERO", displayName:"Barkero", detail:"Especialista a balón parado", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Levante", hintInitial:"J___ B______" },
      { position:8, answer:"DIOP", displayName:"Pape Diop", detail:"Más de 200 partidos en LaLiga", hintNationality:"Senegal", hintPosition:"Centrocampista", hintClub:"Levante", hintInitial:"P___ D___" },
      { position:9, answer:"RICO", displayName:"Mikel Rico", detail:"Athletic y Granada", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Athletic Club", hintInitial:"M____ R___" },
      { position:10, answer:"TRASHORRAS", displayName:"Trashorras", detail:"Cerebro del Rayo", hintNationality:"España", hintPosition:"Centrocampista", hintClub:"Rayo Vallecano", hintInitial:"R______ T_________" },
    ],
  },
];

export function getDailyTop10(): Top10Challenge {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return top10Challenges[seed % top10Challenges.length];
}
