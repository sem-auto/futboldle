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
  title: string;
  subtitle: string;
  consigna: string;
  emoji: string;
  answers: Top10Answer[];
}

export const top10Challenges: Top10Challenge[] = [
  {
    id: "goleadores-esp-bbva-2005-2016",
    title: "Máximos goleadores españoles",
    subtitle: "Liga BBVA 2005–2016",
    consigna: "Completa el Top 10 de goleadores españoles de la era BBVA.",
    emoji: "🥅",
    answers: [
      { position:1,  answer:"VILLA",    displayName:"David Villa",        detail:"211 goles", hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Valencia",     hintInitial:"D_____  V____" },
      { position:2,  answer:"NEGREDO",  displayName:"Álvaro Negredo",     detail:"131 goles", hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Sevilla",      hintInitial:"Á______  N______" },
      { position:3,  answer:"SOLDADO",  displayName:"Roberto Soldado",    detail:"124 goles", hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Valencia",     hintInitial:"R______  S______" },
      { position:4,  answer:"ASPAS",    displayName:"Iago Aspas",         detail:"118 goles", hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Celta de Vigo",hintInitial:"I___  A_____" },
      { position:5,  answer:"ADURIZ",   displayName:"Aritz Aduriz",       detail:"114 goles", hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Athletic Club",hintInitial:"A____  A_____" },
      { position:6,  answer:"LLORENTE", displayName:"Fernando Llorente",  detail:"109 goles", hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Athletic Club",hintInitial:"F_______  L_______" },
      { position:7,  answer:"CASTRO",   displayName:"Rubén Castro",       detail:"102 goles", hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Betis",        hintInitial:"R_____ C______" },
      { position:8,  answer:"GARCIA",   displayName:"Sergio García",      detail:"87 goles",  hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Espanyol",     hintInitial:"S_____  G_____" },
      { position:9,  answer:"MOLINA",   displayName:"Jorge Molina",       detail:"84 goles",  hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Granada",      hintInitial:"J____  M_____" },
      { position:10, answer:"TAMUDO",   displayName:"Raúl Tamudo",        detail:"76 goles",  hintNationality:"España",   hintPosition:"Delantero",        hintClub:"Espanyol",     hintInitial:"R___  T_____" },
    ],
  },
  {
    id: "porteros-imbatibles-bbva",
    title: "Porteros más imbatibles",
    subtitle: "Liga BBVA 2005–2016",
    consigna: "Completa el Top 10 de porteros con más porterías a cero.",
    emoji: "🧤",
    answers: [
      { position:1,  answer:"BRAVO",     displayName:"Claudio Bravo",     detail:"82 p. a cero", hintNationality:"Chile",       hintPosition:"Portero", hintClub:"Real Sociedad", hintInitial:"C______  B_____" },
      { position:2,  answer:"PALOP",     displayName:"Andrés Palop",      detail:"74 p. a cero", hintNationality:"España",      hintPosition:"Portero", hintClub:"Sevilla",       hintInitial:"A______  P____" },
      { position:3,  answer:"ALVES",     displayName:"Diego Alves",       detail:"68 p. a cero", hintNationality:"Brasil",      hintPosition:"Portero", hintClub:"Valencia",      hintInitial:"D____  A_____" },
      { position:4,  answer:"IRAIZOZ",   displayName:"Gorka Iraizoz",     detail:"65 p. a cero", hintNationality:"España",      hintPosition:"Portero", hintClub:"Athletic Club", hintInitial:"G____  I______" },
      { position:5,  answer:"KAMENI",    displayName:"Carlos Kameni",     detail:"59 p. a cero", hintNationality:"Camerún",     hintPosition:"Portero", hintClub:"Málaga",        hintInitial:"C_____  K_____" },
      { position:6,  answer:"CABALLERO", displayName:"Willy Caballero",   detail:"52 p. a cero", hintNationality:"Argentina",   hintPosition:"Portero", hintClub:"Málaga",        hintInitial:"W____  C________" },
      { position:7,  answer:"NAVAS",     displayName:"Keylor Navas",      detail:"48 p. a cero", hintNationality:"Costa Rica",  hintPosition:"Portero", hintClub:"Levante",       hintInitial:"K_____  N____" },
      { position:8,  answer:"AOUATE",    displayName:"Dudu Aouate",       detail:"44 p. a cero", hintNationality:"Israel",      hintPosition:"Portero", hintClub:"Mallorca",      hintInitial:"D___  A_____" },
      { position:9,  answer:"BETO",      displayName:"Beto",              detail:"38 p. a cero", hintNationality:"Portugal",    hintPosition:"Portero", hintClub:"Sevilla",       hintInitial:"B___" },
      { position:10, answer:"GUAITA",    displayName:"Vicente Guaita",    detail:"34 p. a cero", hintNationality:"España",      hintPosition:"Portero", hintClub:"Valencia",      hintInitial:"V______  G_____" },
    ],
  },
  {
    id: "goleadores-extranjeros-bbva",
    title: "Máximos goleadores extranjeros",
    subtitle: "Liga BBVA 2005–2016",
    consigna: "Completa el Top 10 de goleadores no españoles de la era BBVA.",
    emoji: "⚽",
    answers: [
      { position:1,  answer:"FORLAN",   displayName:"Diego Forlán",      detail:"128 goles", hintNationality:"Uruguay",    hintPosition:"Delantero", hintClub:"Atlético",  hintInitial:"D____  F_____" },
      { position:2,  answer:"KANOUTE",  displayName:"Frederic Kanouté",  detail:"120 goles", hintNationality:"Mali",       hintPosition:"Delantero", hintClub:"Sevilla",   hintInitial:"F_______  K______" },
      { position:3,  answer:"COSTA",    displayName:"Diego Costa",       detail:"94 goles",  hintNationality:"España",     hintPosition:"Delantero", hintClub:"Atlético",  hintInitial:"D____  C____" },
      { position:4,  answer:"FALCAO",   displayName:"Radamel Falcao",    detail:"70 goles",  hintNationality:"Colombia",   hintPosition:"Delantero", hintClub:"Atlético",  hintInitial:"R______  F_____" },
      { position:5,  answer:"FABIANO",  displayName:"Luis Fabiano",      detail:"68 goles",  hintNationality:"Brasil",     hintPosition:"Delantero", hintClub:"Sevilla",   hintInitial:"L___  F______" },
      { position:6,  answer:"ROSSI",    displayName:"Giuseppe Rossi",    detail:"52 goles",  hintNationality:"Italia",     hintPosition:"Delantero", hintClub:"Villarreal",hintInitial:"G_______  R____" },
      { position:7,  answer:"MILITO",   displayName:"Diego Milito",      detail:"48 goles",  hintNationality:"Argentina",  hintPosition:"Delantero", hintClub:"Zaragoza",  hintInitial:"D____  M_____" },
      { position:8,  answer:"NILMAR",   displayName:"Nilmar",            detail:"45 goles",  hintNationality:"Brasil",     hintPosition:"Delantero", hintClub:"Villarreal",hintInitial:"N_____" },
      { position:9,  answer:"JONAS",    displayName:"Jonas",             detail:"43 goles",  hintNationality:"Brasil",     hintPosition:"Delantero", hintClub:"Valencia",  hintInitial:"J____" },
      { position:10, answer:"UCHE",     displayName:"Ikechukwu Uche",    detail:"38 goles",  hintNationality:"Nigeria",    hintPosition:"Delantero", hintClub:"Villarreal",hintInitial:"I_________  U___" },
    ],
  },
  {
    id: "creadores-juego-bbva",
    title: "Reyes del pase y la asistencia",
    subtitle: "Liga BBVA 2005–2016",
    consigna: "Completa el Top 10 de jugadores con más asistencias de la era BBVA.",
    emoji: "🎯",
    answers: [
      { position:1,  answer:"SILVA",    displayName:"David Silva",         detail:"107 asistencias", hintNationality:"España",   hintPosition:"Centrocampista", hintClub:"Valencia",   hintInitial:"D____  S____" },
      { position:2,  answer:"JOAQUIN",  displayName:"Joaquín Sánchez",    detail:"96 asistencias",  hintNationality:"España",   hintPosition:"Centrocampista", hintClub:"Betis",      hintInitial:"J______  S______" },
      { position:3,  answer:"NAVAS",    displayName:"Jesús Navas",        detail:"89 asistencias",  hintNationality:"España",   hintPosition:"Centrocampista", hintClub:"Sevilla",    hintInitial:"J____  N____" },
      { position:4,  answer:"MATA",     displayName:"Juan Mata",           detail:"72 asistencias",  hintNationality:"España",   hintPosition:"Centrocampista", hintClub:"Valencia",   hintInitial:"J___  M___" },
      { position:5,  answer:"VALERON",  displayName:"Juan Carlos Valerón", detail:"68 asistencias",  hintNationality:"España",   hintPosition:"Centrocampista", hintClub:"Deportivo",  hintInitial:"J___  C_____  V______" },
      { position:6,  answer:"CAZORLA",  displayName:"Santi Cazorla",      detail:"64 asistencias",  hintNationality:"España",   hintPosition:"Centrocampista", hintClub:"Villarreal", hintInitial:"S____  C______" },
      { position:7,  answer:"RAKITIC",  displayName:"Ivan Rakitic",        detail:"52 asistencias",  hintNationality:"Croacia",  hintPosition:"Centrocampista", hintClub:"Sevilla",    hintInitial:"I___  R______" },
      { position:8,  answer:"BANEGA",   displayName:"Ever Banega",         detail:"49 asistencias",  hintNationality:"Argentina",hintPosition:"Centrocampista", hintClub:"Valencia",   hintInitial:"E___  B_____" },
      { position:9,  answer:"PAREJO",   displayName:"Dani Parejo",         detail:"46 asistencias",  hintNationality:"España",   hintPosition:"Centrocampista", hintClub:"Valencia",   hintInitial:"D___  P_____" },
      { position:10, answer:"PEDRO",    displayName:"Pedro Rodríguez",     detail:"44 asistencias",  hintNationality:"España",   hintPosition:"Delantero",      hintClub:"Barcelona",  hintInitial:"P____  R________" },
    ],
  },
];

export function getDailyTop10(): Top10Challenge {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return top10Challenges[seed % top10Challenges.length];
}
