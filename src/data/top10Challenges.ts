import { bbvaPlayers } from "./bbvaPlayers";

export type Top10Category = "GOLEADORES" | "ASISTENCIAS" | "PORTEROS" | "CLUBES";

export interface Top10Answer {
  position: number;
  answer: string;
  displayName: string;
  detail: string;
  value?: number;
  label?: string;
  hintNationality: string;
  hintPosition: string;
  hintClub: string;
  hintInitial: string;
  verifiedGoalkeeperOffensive?: boolean;
}

export interface Top10Challenge {
  id: string;
  kind: "FÁCIL" | "MEDIO" | "DIFÍCIL";
  category: Top10Category;
  topType: "TOP HISTÓRICO VERIFICADO";
  period: string;
  criterion: string;
  source: string;
  sourceName: "StatBunker" | "Transfermarkt" | "FBref" | "WorldFootball" | "Opta" | "FIFA Index" | "FUTWIZ";
  sourceUrl: string;
  sourceNote: string;
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
  "Más partidos Villarreal era BBVA"
];

export const pendingRequestedTops = [
  "Asistencias 09/10",
  "Goleadores 08/09",
  "Goleadores 10/11",
  "Goleadores 11/12",
  "Más goles Athletic Club",
  "Más goles Atlético de Madrid",
  "Más goles de cabeza BBVA",
  "Más goles de falta BBVA",
  "Más goles Espanyol",
  "Más goles Málaga",
  "Más goles Sevilla",
  "Más goles Valencia",
  "Más goles Villarreal",
  "Más partidos Atlético de Madrid",
  "Más partidos BBVA 2005-2016",
  "Más partidos españoles",
  "Más partidos extranjeros",
  "Más partidos sin Barça/Madrid",
  "Más penaltis marcados BBVA",
  "Más porterías a cero BBVA 2005-2016",
  "Más tarjetas amarillas BBVA",
  "Más tarjetas rojas BBVA",
  "Máximos asistentes BBVA 2005-2016",
  "Máximos asistentes españoles",
  "Máximos asistentes extranjeros",
  "Máximos goleadores BBVA 2005-2016",
  "Máximos goleadores españoles",
  "Máximos goleadores españoles sin Barça/Madrid",
  "Máximos goleadores extranjeros",
  "Máximos goleadores extranjeros sin Barça/Madrid",
  "Máximos goleadores sin Barça/Madrid",
  "Más asistencias españolas era BBVA",
  "Más goles españoles era BBVA",
  "Más partidos Atlético de Madrid era BBVA",
  "Más partidos Atlético era BBVA",
  "Más partidos era BBVA",
  "Más partidos era BBVA 2005/06-2015/16",
  "Más porterías a cero BBVA 2005/06-2015/16",
  "Más porterías a cero era BBVA",
  "Máximos asistentes BBVA 2005/06-2015/16 acumulado",
  "Máximos asistentes era BBVA",
  "Máximos asistentes españoles BBVA acumulado",
  "Máximos goleadores BBVA 2005/06-2015/16 acumulado",
  "Máximos goleadores era BBVA",
  "Máximos goleadores españoles BBVA acumulado",
  "Porterías a cero 10/11",
  "Porterías a cero 11/12",
  "Porterías a cero 12/13",
  "Porterías a cero 14/15",
  "Top asistencias 09/10",
  "Top goleadores 08/09",
  "Top goleadores 10/11",
  "Top goleadores 11/12",
  "Top porterías 10/11",
  "Top porterías 11/12",
  "Top porterías 12/13",
  "Top porterías 13/14",
  "Top porterías 14/15"
];

export const top10Challenges: Top10Challenge[] = [
  {
    "id": "statbunker-laliga-2015-16-goleadores",
    "kind": "FÁCIL",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles acumulados entre 2005/06 y 2015/16 excluyendo los goles marcados con Barcelona y Real Madrid",
    "source": "Auditoría manual beta · acumulado por clubes del periodo",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/FantasyFootballPlayersStats?comp_id=518",
    "sourceNote": "Ranking corregido para Futboldle el 2026-06-12. Excluye goles con Barcelona y Real Madrid; no usa totales históricos completos.",
    "top20Unlockable": true,
    "title": "Máximos goleadores sin Barça/Madrid 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · sin Barça/Madrid auditado",
    "consigna": "Completa el Top10 de goleadores sin contar goles con Barça ni Madrid.",
    "emoji": "⚽",
    "answers": [
      {
        "position": 1,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "40 goles",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L___ S_____",
        "label": "40 goles"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "35 goles",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "35 goles"
      },
      {
        "position": 3,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "26 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "26 goles"
      },
      {
        "position": 4,
        "answer": "NEYMAR",
        "displayName": "Neymar",
        "detail": "24 goles",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "N_____",
        "label": "24 goles"
      },
      {
        "position": 5,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "24 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______",
        "label": "24 goles"
      },
      {
        "position": 6,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "22 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "A_______ G________",
        "label": "22 goles"
      },
      {
        "position": 7,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "20 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____",
        "label": "20 goles"
      },
      {
        "position": 8,
        "answer": "CASTRO",
        "displayName": "Rubén Castro",
        "detail": "19 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Betis",
        "hintInitial": "R_____ C______",
        "label": "19 goles"
      },
      {
        "position": 9,
        "answer": "BALE",
        "displayName": "Gareth Bale",
        "detail": "19 goles",
        "hintNationality": "Gales",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G_____ B___",
        "label": "19 goles"
      },
      {
        "position": 10,
        "answer": "BORJA",
        "displayName": "Borja Bastón",
        "detail": "18 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Eibar",
        "hintInitial": "B____ B_____",
        "label": "18 goles"
      }
    ],
    "extendedAnswers": [
      {
        "position": 11,
        "answer": "PEREZ",
        "displayName": "Lucas Pérez",
        "detail": "17 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Deportivo",
        "hintInitial": "L____ P____",
        "label": "17 goles"
      },
      {
        "position": 12,
        "answer": "GAMEIRO",
        "displayName": "Gameiro",
        "detail": "16 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "K____ G______",
        "label": "16 goles"
      },
      {
        "position": 13,
        "answer": "EL-ARABI",
        "displayName": "El-Arabi",
        "detail": "16 goles",
        "hintNationality": "Marruecos",
        "hintPosition": "Delantero",
        "hintClub": "Granada",
        "hintInitial": "Y______ E_-A____",
        "label": "16 goles"
      },
      {
        "position": 14,
        "answer": "ASPAS",
        "displayName": "Aspas",
        "detail": "14 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Celta de Vigo",
        "hintInitial": "I___ A____",
        "label": "14 goles"
      },
      {
        "position": 15,
        "answer": "ALCACER",
        "displayName": "Alcácer",
        "detail": "13 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "P___ A______",
        "label": "13 goles"
      },
      {
        "position": 16,
        "answer": "AGIRRETXE",
        "displayName": "Agirretxe",
        "detail": "13 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "I_____ A________",
        "label": "13 goles"
      },
      {
        "position": 17,
        "answer": "BAKAMBU",
        "displayName": "Bakambu",
        "detail": "12 goles",
        "hintNationality": "RD Congo",
        "hintPosition": "Delantero",
        "hintClub": "Villarreal",
        "hintInitial": "C_____ B_______",
        "label": "12 goles"
      },
      {
        "position": 18,
        "answer": "NOLITO",
        "displayName": "Nolito",
        "detail": "12 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Celta de Vigo",
        "hintInitial": "N_____",
        "label": "12 goles"
      },
      {
        "position": 19,
        "answer": "SANABRIA",
        "displayName": "Sanabria",
        "detail": "11 goles",
        "hintNationality": "Paraguay",
        "hintPosition": "Delantero",
        "hintClub": "Sporting Gijón",
        "hintInitial": "A______ S_______",
        "label": "11 goles"
      },
      {
        "position": 20,
        "answer": "VELA",
        "displayName": "Carlos Vela",
        "detail": "11 goles",
        "hintNationality": "México",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "C_____ V___",
        "label": "11 goles"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2015-16-asistencias",
    "kind": "MEDIO",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias en LaLiga 2015/16",
    "source": "StatBunker · La Liga 15/16 Most assists",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/MostAssists?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 15/16 Most assists.",
    "title": "Top asistencias LaLiga 15/16 2005/06-2015/16",
    "subtitle": "2015/16 · asistencias",
    "consigna": "Completa el Top10 oficial de asistentes de LaLiga 2015/16.",
    "emoji": "🎯",
    "answers": [
      {
        "position": 1,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "16 asistencias",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L___ S_____",
        "label": "16 asistencias"
      },
      {
        "position": 2,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "16 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "16 asistencias"
      },
      {
        "position": 3,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "14 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___",
        "label": "14 asistencias"
      },
      {
        "position": 4,
        "answer": "NEYMAR",
        "displayName": "Neymar",
        "detail": "13 asistencias",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "N_____",
        "label": "13 asistencias"
      },
      {
        "position": 5,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "11 asistencias",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "11 asistencias"
      },
      {
        "position": 6,
        "answer": "SOLDADO",
        "displayName": "Soldado",
        "detail": "10 asistencias",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Villarreal",
        "hintInitial": "R______ S______",
        "label": "10 asistencias"
      },
      {
        "position": 7,
        "answer": "KROOS",
        "displayName": "Toni Kroos",
        "detail": "10 asistencias",
        "hintNationality": "Alemania",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "T___ K____",
        "label": "10 asistencias"
      },
      {
        "position": 8,
        "answer": "ASENSIO",
        "displayName": "Marco Asensio",
        "detail": "10 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Espanyol",
        "hintInitial": "M____ A______",
        "label": "10 asistencias"
      },
      {
        "position": 9,
        "answer": "BALE",
        "displayName": "Gareth Bale",
        "detail": "10 asistencias",
        "hintNationality": "Gales",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G_____ B___",
        "label": "10 asistencias"
      },
      {
        "position": 10,
        "answer": "SUSAETA",
        "displayName": "Susaeta",
        "detail": "8 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "M_____ S______",
        "label": "8 asistencias"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2012-13-asistencias",
    "kind": "DIFÍCIL",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias en LaLiga 2012/13",
    "source": "StatBunker · La Liga 12/13 Most assists",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/MostAssists?comp_id=413",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 12/13 Most assists.",
    "title": "Top asistencias LaLiga 12/13 2005/06-2015/16",
    "subtitle": "2012/13 · asistencias",
    "consigna": "Completa el Top10 oficial de asistentes de LaLiga 2012/13.",
    "emoji": "🧠",
    "answers": [
      {
        "position": 1,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "16 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "A_____ I______",
        "label": "16 asistencias"
      },
      {
        "position": 2,
        "answer": "OZIL",
        "displayName": "Özil",
        "detail": "13 asistencias",
        "hintNationality": "Alemania",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "M____ Ö___",
        "label": "13 asistencias"
      },
      {
        "position": 3,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "12 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "12 asistencias"
      },
      {
        "position": 4,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "11 asistencias",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______",
        "label": "11 asistencias"
      },
      {
        "position": 5,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "11 asistencias",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "11 asistencias"
      },
      {
        "position": 6,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "10 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___",
        "label": "10 asistencias"
      },
      {
        "position": 7,
        "answer": "FABREGAS",
        "displayName": "Fàbregas",
        "detail": "10 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "C____ F_______",
        "label": "10 asistencias"
      },
      {
        "position": 8,
        "answer": "RAKITIC",
        "displayName": "Rakitic",
        "detail": "10 asistencias",
        "hintNationality": "Croacia",
        "hintPosition": "Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "I___ R______",
        "label": "10 asistencias"
      },
      {
        "position": 9,
        "answer": "BENAT",
        "displayName": "Beñat",
        "detail": "9 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "B____ E_______",
        "label": "9 asistencias"
      },
      {
        "position": 10,
        "answer": "IBAI",
        "displayName": "Ibai Gómez",
        "detail": "9 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "I___ G____",
        "label": "9 asistencias"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2015-16-porterías-cero",
    "kind": "MEDIO",
    "category": "PORTEROS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Porterías a cero en LaLiga 2015/16",
    "source": "StatBunker · La Liga 15/16 Clean sheets",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/Top10KeepersCleanSheets?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 15/16 Clean sheets.",
    "title": "Top porterías a cero 15/16 2005/06-2015/16",
    "subtitle": "2015/16 · clean sheets",
    "consigna": "Completa el Top10 oficial de porteros con más porterías a cero.",
    "emoji": "🧤",
    "answers": [
      {
        "position": 1,
        "answer": "OBLAK",
        "displayName": "Oblak",
        "detail": "24 porterías a cero",
        "hintNationality": "Eslovenia",
        "hintPosition": "Portero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "J__ O____",
        "label": "24 porterías a cero"
      },
      {
        "position": 2,
        "answer": "BRAVO",
        "displayName": "Claudio Bravo",
        "detail": "16 porterías a cero",
        "hintNationality": "Chile",
        "hintPosition": "Portero",
        "hintClub": "Barcelona",
        "hintInitial": "C______ B_____",
        "label": "16 porterías a cero"
      },
      {
        "position": 3,
        "answer": "AREOLA",
        "displayName": "Areola",
        "detail": "15 porterías a cero",
        "hintNationality": "Francia",
        "hintPosition": "Portero",
        "hintClub": "Villarreal",
        "hintInitial": "A_______ A_____",
        "label": "15 porterías a cero"
      },
      {
        "position": 4,
        "answer": "NAVAS",
        "displayName": "Keylor Navas",
        "detail": "13 porterías a cero",
        "hintNationality": "Costa Rica",
        "hintPosition": "Portero",
        "hintClub": "Real Madrid",
        "hintInitial": "K_____ N____",
        "label": "13 porterías a cero"
      },
      {
        "position": 5,
        "answer": "IRAIZOZ",
        "displayName": "Iraizoz",
        "detail": "13 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Athletic Club",
        "hintInitial": "G____ I______",
        "label": "13 porterías a cero"
      },
      {
        "position": 6,
        "answer": "RULLI",
        "displayName": "Rulli",
        "detail": "12 porterías a cero",
        "hintNationality": "Argentina",
        "hintPosition": "Portero",
        "hintClub": "Real Sociedad",
        "hintInitial": "G_______ R____",
        "label": "12 porterías a cero"
      },
      {
        "position": 7,
        "answer": "ADAN",
        "displayName": "Adán",
        "detail": "12 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Betis",
        "hintInitial": "A______ A___",
        "label": "12 porterías a cero"
      },
      {
        "position": 8,
        "answer": "RICO",
        "displayName": "Sergio Rico",
        "detail": "10 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Sevilla",
        "hintInitial": "S_____ R___",
        "label": "10 porterías a cero"
      },
      {
        "position": 9,
        "answer": "KAMENI",
        "displayName": "Kameni",
        "detail": "9 porterías a cero",
        "hintNationality": "Camerún",
        "hintPosition": "Portero",
        "hintClub": "Málaga",
        "hintInitial": "C_____ K_____",
        "label": "9 porterías a cero"
      },
      {
        "position": 10,
        "answer": "VARAS",
        "displayName": "Javi Varas",
        "detail": "9 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Las Palmas",
        "hintInitial": "J___ V____",
        "label": "9 porterías a cero"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2009-10-goleadores",
    "kind": "FÁCIL",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles marcados en LaLiga 2009/10",
    "source": "StatBunker · La Liga 09/10 Top goal scorers",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/TopGoalScorers?comp_id=293",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 09/10 Top goal scorers.",
    "title": "Top goleadores LaLiga 09/10 2005/06-2015/16",
    "subtitle": "2009/10 · goles en Liga",
    "consigna": "Completa el Top10 oficial de goleadores de LaLiga 2009/10.",
    "emoji": "⚽",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "34 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "34 goles"
      },
      {
        "position": 2,
        "answer": "HIGUAIN",
        "displayName": "Higuaín",
        "detail": "27 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G______ H______",
        "label": "27 goles"
      },
      {
        "position": 3,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "26 goles",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "26 goles"
      },
      {
        "position": 4,
        "answer": "VILLA",
        "displayName": "Villa",
        "detail": "22 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "D____ V____",
        "label": "22 goles"
      },
      {
        "position": 5,
        "answer": "FORLAN",
        "displayName": "Forlán",
        "detail": "18 goles",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "D____ F_____",
        "label": "18 goles"
      },
      {
        "position": 6,
        "answer": "SOLDADO",
        "displayName": "Soldado",
        "detail": "16 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Getafe",
        "hintInitial": "R______ S______",
        "label": "16 goles"
      },
      {
        "position": 7,
        "answer": "IBRAHIMOVIC",
        "displayName": "Ibrahimovic",
        "detail": "16 goles",
        "hintNationality": "Suecia",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "Z_____ I__________",
        "label": "16 goles"
      },
      {
        "position": 8,
        "answer": "FABIANO",
        "displayName": "Luis Fabiano",
        "detail": "15 goles",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "L___ F______",
        "label": "15 goles"
      },
      {
        "position": 9,
        "answer": "LLORENTE",
        "displayName": "Llorente",
        "detail": "14 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "F_______ L_______",
        "label": "14 goles"
      },
      {
        "position": 10,
        "answer": "NINO",
        "displayName": "Nino",
        "detail": "14 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Tenerife",
        "hintInitial": "N___",
        "label": "14 goles"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2012-13-goleadores",
    "kind": "FÁCIL",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles marcados en LaLiga 2012/13",
    "source": "StatBunker · La Liga 12/13 Top goal scorers",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/TopGoalScorers?comp_id=413",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 12/13 Top goal scorers.",
    "title": "Top goleadores LaLiga 12/13 2005/06-2015/16",
    "subtitle": "2012/13 · goles en Liga",
    "consigna": "Completa el Top10 oficial de goleadores de LaLiga 2012/13.",
    "emoji": "⚽",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "46 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "46 goles"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "34 goles",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "34 goles"
      },
      {
        "position": 3,
        "answer": "FALCAO",
        "displayName": "Falcao",
        "detail": "28 goles",
        "hintNationality": "Colombia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "R______ F_____",
        "label": "28 goles"
      },
      {
        "position": 4,
        "answer": "NEGREDO",
        "displayName": "Negredo",
        "detail": "25 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "A_____ N______",
        "label": "25 goles"
      },
      {
        "position": 5,
        "answer": "SOLDADO",
        "displayName": "Soldado",
        "detail": "24 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "R______ S______",
        "label": "24 goles"
      },
      {
        "position": 6,
        "answer": "PITI",
        "displayName": "Piti",
        "detail": "18 goles",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Rayo Vallecano",
        "hintInitial": "P___",
        "label": "18 goles"
      },
      {
        "position": 7,
        "answer": "CASTRO",
        "displayName": "Rubén Castro",
        "detail": "18 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Betis",
        "hintInitial": "R_____ C______",
        "label": "18 goles"
      },
      {
        "position": 8,
        "answer": "HIGUAIN",
        "displayName": "Higuaín",
        "detail": "16 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G______ H______",
        "label": "16 goles"
      },
      {
        "position": 9,
        "answer": "VELA",
        "displayName": "Carlos Vela",
        "detail": "14 goles",
        "hintNationality": "México",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "C_____ V___",
        "label": "14 goles"
      },
      {
        "position": 10,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "14 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____",
        "label": "14 goles"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2013-14-goleadores",
    "kind": "MEDIO",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles marcados en LaLiga 2013/14",
    "source": "StatBunker · La Liga 13/14 Top goal scorers",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/TopGoalScorers?comp_id=461",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 13/14 Top goal scorers.",
    "title": "Top goleadores LaLiga 13/14 2005/06-2015/16",
    "subtitle": "2013/14 · goles en Liga",
    "consigna": "Completa el Top10 oficial de goleadores de LaLiga 2013/14.",
    "emoji": "⚽",
    "answers": [
      {
        "position": 1,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "31 goles",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "31 goles"
      },
      {
        "position": 2,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "28 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "28 goles"
      },
      {
        "position": 3,
        "answer": "COSTA",
        "displayName": "Diego Costa",
        "detail": "27 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "D____ C____",
        "label": "27 goles"
      },
      {
        "position": 4,
        "answer": "ALEXIS",
        "displayName": "Alexis Sánchez",
        "detail": "19 goles",
        "hintNationality": "Chile",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "A_____ S______",
        "label": "19 goles"
      },
      {
        "position": 5,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "17 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______",
        "label": "17 goles"
      },
      {
        "position": 6,
        "answer": "VELA",
        "displayName": "Carlos Vela",
        "detail": "16 goles",
        "hintNationality": "México",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "C_____ V___",
        "label": "16 goles"
      },
      {
        "position": 7,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "16 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____",
        "label": "16 goles"
      },
      {
        "position": 8,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "16 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "A_______ G________",
        "label": "16 goles"
      },
      {
        "position": 9,
        "answer": "PEDRO",
        "displayName": "Pedro",
        "detail": "15 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "P____ R________",
        "label": "15 goles"
      },
      {
        "position": 10,
        "answer": "GAMEIRO",
        "displayName": "Gameiro",
        "detail": "15 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "K____ G______",
        "label": "15 goles"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2014-15-goleadores",
    "kind": "FÁCIL",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles marcados en LaLiga 2014/15",
    "source": "StatBunker · La Liga 14/15 Top goal scorers",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/TopGoalScorers?comp_id=485",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 14/15 Top goal scorers.",
    "title": "Top goleadores LaLiga 14/15 2005/06-2015/16",
    "subtitle": "2014/15 · goles en Liga",
    "consigna": "Completa el Top10 oficial de goleadores de LaLiga 2014/15.",
    "emoji": "⚽",
    "answers": [
      {
        "position": 1,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "48 goles",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "48 goles"
      },
      {
        "position": 2,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "43 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "43 goles"
      },
      {
        "position": 3,
        "answer": "NEYMAR",
        "displayName": "Neymar",
        "detail": "22 goles",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "N_____",
        "label": "22 goles"
      },
      {
        "position": 4,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "22 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "A_______ G________",
        "label": "22 goles"
      },
      {
        "position": 5,
        "answer": "BACCA",
        "displayName": "Bacca",
        "detail": "20 goles",
        "hintNationality": "Colombia",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "C_____ B____",
        "label": "20 goles"
      },
      {
        "position": 6,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "18 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____",
        "label": "18 goles"
      },
      {
        "position": 7,
        "answer": "BUENO",
        "displayName": "Alberto Bueno",
        "detail": "17 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Rayo Vallecano",
        "hintInitial": "A______ B____",
        "label": "17 goles"
      },
      {
        "position": 8,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "16 goles",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L___ S_____",
        "label": "16 goles"
      },
      {
        "position": 9,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "15 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______",
        "label": "15 goles"
      },
      {
        "position": 10,
        "answer": "GARCIA",
        "displayName": "Sergio García",
        "detail": "14 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "S_____ G_____",
        "label": "14 goles"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2014-15-asistencias",
    "kind": "MEDIO",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias en LaLiga 2014/15",
    "source": "StatBunker · La Liga 14/15 Most assists",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/MostAssists?comp_id=485",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 14/15 Most assists.",
    "title": "Top asistencias LaLiga 14/15 2005/06-2015/16",
    "subtitle": "2014/15 · asistencias",
    "consigna": "Completa el Top10 oficial de asistentes de LaLiga 2014/15.",
    "emoji": "🎯",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "19 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "19 asistencias"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "16 asistencias",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "16 asistencias"
      },
      {
        "position": 3,
        "answer": "JAMES",
        "displayName": "James Rodríguez",
        "detail": "13 asistencias",
        "hintNationality": "Colombia",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "J____ R________",
        "label": "13 asistencias"
      },
      {
        "position": 4,
        "answer": "NOLITO",
        "displayName": "Nolito",
        "detail": "13 asistencias",
        "hintNationality": "España",
        "hintPosition": "Delantero / Extremo",
        "hintClub": "Celta de Vigo",
        "hintInitial": "N_____",
        "label": "13 asistencias"
      },
      {
        "position": 5,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "13 asistencias",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L___ S_____",
        "label": "13 asistencias"
      },
      {
        "position": 6,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "10 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___",
        "label": "10 asistencias"
      },
      {
        "position": 7,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "10 asistencias",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______",
        "label": "10 asistencias"
      },
      {
        "position": 8,
        "answer": "CHERYSHEV",
        "displayName": "Cheryshev",
        "detail": "9 asistencias",
        "hintNationality": "Rusia",
        "hintPosition": "Centrocampista",
        "hintClub": "Villarreal",
        "hintInitial": "D____ C________",
        "label": "9 asistencias"
      },
      {
        "position": 9,
        "answer": "BALE",
        "displayName": "Gareth Bale",
        "detail": "9 asistencias",
        "hintNationality": "Gales",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G_____ B___",
        "label": "9 asistencias"
      },
      {
        "position": 10,
        "answer": "GARCIA",
        "displayName": "Sergio García",
        "detail": "9 asistencias",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "S_____ G_____",
        "label": "9 asistencias"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2008-09-asistencias",
    "kind": "DIFÍCIL",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias en LaLiga 2008/09",
    "source": "StatBunker · La Liga 08/09 Most assists",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/MostAssists?comp_id=259",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 08/09 Most assists.",
    "title": "Top asistencias LaLiga 08/09 2005/06-2015/16",
    "subtitle": "2008/09 · asistencias",
    "consigna": "Completa el Top10 oficial de asistentes de LaLiga 2008/09.",
    "emoji": "🎯",
    "answers": [
      {
        "position": 1,
        "answer": "MATA",
        "displayName": "Juan Mata",
        "detail": "8 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "J___ M___",
        "label": "8 asistencias"
      },
      {
        "position": 2,
        "answer": "JURADO",
        "displayName": "Jurado",
        "detail": "7 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Mallorca",
        "hintInitial": "J___ M_____ J_____",
        "label": "7 asistencias"
      },
      {
        "position": 3,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "6 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "6 asistencias"
      },
      {
        "position": 4,
        "answer": "ALVES",
        "displayName": "Dani Alves",
        "detail": "5 asistencias",
        "hintNationality": "Brasil",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "D___ A____",
        "label": "5 asistencias"
      },
      {
        "position": 5,
        "answer": "MUNITIS",
        "displayName": "Munitis",
        "detail": "5 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Racing",
        "hintInitial": "P____ M______",
        "label": "5 asistencias"
      },
      {
        "position": 6,
        "answer": "XAVI",
        "displayName": "Xavi",
        "detail": "5 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "X___ H________",
        "label": "5 asistencias"
      },
      {
        "position": 7,
        "answer": "EMANA",
        "displayName": "Emaná",
        "detail": "4 asistencias",
        "hintNationality": "Camerún",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "A______ E____",
        "label": "4 asistencias"
      },
      {
        "position": 8,
        "answer": "ELISEU",
        "displayName": "Eliseu",
        "detail": "4 asistencias",
        "hintNationality": "Portugal",
        "hintPosition": "Centrocampista",
        "hintClub": "Málaga",
        "hintInitial": "E_____",
        "label": "4 asistencias"
      },
      {
        "position": 9,
        "answer": "VAART",
        "displayName": "Van der Vaart",
        "detail": "4 asistencias",
        "hintNationality": "Países Bajos",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "R_____ V__ D__ V____",
        "label": "4 asistencias"
      },
      {
        "position": 10,
        "answer": "FORLAN",
        "displayName": "Forlán",
        "detail": "4 asistencias",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "D____ F_____",
        "label": "4 asistencias"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2010-11-asistencias",
    "kind": "MEDIO",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias en LaLiga 2010/11",
    "source": "StatBunker · La Liga 10/11 Most assists",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/MostAssists?comp_id=336",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 10/11 Most assists.",
    "title": "Top asistencias LaLiga 10/11 2005/06-2015/16",
    "subtitle": "2010/11 · asistencias",
    "consigna": "Completa el Top10 oficial de asistentes de LaLiga 2010/11.",
    "emoji": "🎯",
    "answers": [
      {
        "position": 1,
        "answer": "OZIL",
        "displayName": "Özil",
        "detail": "17 asistencias",
        "hintNationality": "Alemania",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "M____ Ö___",
        "label": "17 asistencias"
      },
      {
        "position": 2,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "17 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "17 asistencias"
      },
      {
        "position": 3,
        "answer": "ALVES",
        "displayName": "Dani Alves",
        "detail": "13 asistencias",
        "hintNationality": "Brasil",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "D___ A____",
        "label": "13 asistencias"
      },
      {
        "position": 4,
        "answer": "MATA",
        "displayName": "Juan Mata",
        "detail": "12 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "J___ M___",
        "label": "12 asistencias"
      },
      {
        "position": 5,
        "answer": "PRIETO",
        "displayName": "Xabi Prieto",
        "detail": "11 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Sociedad",
        "hintInitial": "X___ P_____",
        "label": "11 asistencias"
      },
      {
        "position": 6,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "11 asistencias",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "11 asistencias"
      },
      {
        "position": 7,
        "answer": "DIMARIA",
        "displayName": "Di María",
        "detail": "11 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "Á____ D_ M____",
        "label": "11 asistencias"
      },
      {
        "position": 8,
        "answer": "VALERO",
        "displayName": "Borja Valero",
        "detail": "8 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Villarreal",
        "hintInitial": "B____ V_____",
        "label": "8 asistencias"
      },
      {
        "position": 9,
        "answer": "VALDO",
        "displayName": "Valdo",
        "detail": "8 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Levante",
        "hintInitial": "V____",
        "label": "8 asistencias"
      },
      {
        "position": 10,
        "answer": "VERDU",
        "displayName": "Joan Verdú",
        "detail": "7 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Espanyol",
        "hintInitial": "J___ V____",
        "label": "7 asistencias"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2011-12-asistencias",
    "kind": "MEDIO",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias en LaLiga 2011/12",
    "source": "StatBunker · La Liga 11/12 Most assists",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/MostAssists?comp_id=378",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 11/12 Most assists.",
    "title": "Top asistencias LaLiga 11/12 2005/06-2015/16",
    "subtitle": "2011/12 · asistencias",
    "consigna": "Completa el Top10 oficial de asistentes de LaLiga 2011/12.",
    "emoji": "🎯",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "17 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "17 asistencias"
      },
      {
        "position": 2,
        "answer": "DIMARIA",
        "displayName": "Di María",
        "detail": "15 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "Á____ D_ M____",
        "label": "15 asistencias"
      },
      {
        "position": 3,
        "answer": "OZIL",
        "displayName": "Özil",
        "detail": "15 asistencias",
        "hintNationality": "Alemania",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "M____ Ö___",
        "label": "15 asistencias"
      },
      {
        "position": 4,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "12 asistencias",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______",
        "label": "12 asistencias"
      },
      {
        "position": 5,
        "answer": "NAVAS",
        "displayName": "Jesús Navas",
        "detail": "12 asistencias",
        "hintNationality": "España",
        "hintPosition": "Extremo / Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "J____ N____",
        "label": "12 asistencias"
      },
      {
        "position": 6,
        "answer": "ALVES",
        "displayName": "Dani Alves",
        "detail": "11 asistencias",
        "hintNationality": "Brasil",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "D___ A____",
        "label": "11 asistencias"
      },
      {
        "position": 7,
        "answer": "ALONSO",
        "displayName": "Xabi Alonso",
        "detail": "10 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "X___ A_____",
        "label": "10 asistencias"
      },
      {
        "position": 8,
        "answer": "CASTRO",
        "displayName": "Chory Castro",
        "detail": "9 asistencias",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Mallorca",
        "hintInitial": "C____ C_____",
        "label": "9 asistencias"
      },
      {
        "position": 9,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "9 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "A_____ I______",
        "label": "9 asistencias"
      },
      {
        "position": 10,
        "answer": "FABREGAS",
        "displayName": "Fàbregas",
        "detail": "9 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "C____ F_______",
        "label": "9 asistencias"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2013-14-asistencias",
    "kind": "DIFÍCIL",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias en LaLiga 2013/14",
    "source": "StatBunker · La Liga 13/14 Most assists",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/MostAssists?comp_id=461",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 13/14 Most assists.",
    "title": "Top asistencias LaLiga 13/14 2005/06-2015/16",
    "subtitle": "2013/14 · asistencias",
    "consigna": "Completa el Top10 oficial de asistentes de LaLiga 2013/14.",
    "emoji": "🎯",
    "answers": [
      {
        "position": 1,
        "answer": "DIMARIA",
        "displayName": "Di María",
        "detail": "17 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "Á____ D_ M____",
        "label": "17 asistencias"
      },
      {
        "position": 2,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "15 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___",
        "label": "15 asistencias"
      },
      {
        "position": 3,
        "answer": "FABREGAS",
        "displayName": "Fàbregas",
        "detail": "13 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "C____ F_______",
        "label": "13 asistencias"
      },
      {
        "position": 4,
        "answer": "BALE",
        "displayName": "Gareth Bale",
        "detail": "12 asistencias",
        "hintNationality": "Gales",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G_____ B___",
        "label": "12 asistencias"
      },
      {
        "position": 5,
        "answer": "SUSAETA",
        "displayName": "Susaeta",
        "detail": "12 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "M_____ S______",
        "label": "12 asistencias"
      },
      {
        "position": 6,
        "answer": "VELA",
        "displayName": "Carlos Vela",
        "detail": "12 asistencias",
        "hintNationality": "México",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "C_____ V___",
        "label": "12 asistencias"
      },
      {
        "position": 7,
        "answer": "RAKITIC",
        "displayName": "Rakitic",
        "detail": "11 asistencias",
        "hintNationality": "Croacia",
        "hintPosition": "Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "I___ R______",
        "label": "11 asistencias"
      },
      {
        "position": 8,
        "answer": "GARCIA",
        "displayName": "Sergio García",
        "detail": "9 asistencias",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "S_____ G_____",
        "label": "9 asistencias"
      },
      {
        "position": 9,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "9 asistencias",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______",
        "label": "9 asistencias"
      },
      {
        "position": 10,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "9 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____",
        "label": "9 asistencias"
      }
    ]
  },
  {
    "id": "statbunker-laliga-2013-14-porterías-cero",
    "kind": "MEDIO",
    "category": "PORTEROS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2013/14 · era BBVA 2005/06-2015/16",
    "criterion": "Porterías a cero en LaLiga 2013/14",
    "source": "StatBunker · La Liga 13/14 Clean sheets",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/Top10KeepersCleanSheets?comp_id=461",
    "sourceNote": "Fuente consultada: StatBunker · La Liga 13/14 Clean sheets. Ranking corregido con el Top10 real indicado para beta.",
    "title": "Top porterías a cero 13/14 2005/06-2015/16",
    "subtitle": "2013/14 · porterías a cero",
    "consigna": "Completa el Top10 oficial de porterías a cero de LaLiga 2013/14.",
    "emoji": "🧤",
    "answers": [
      {
        "position": 1,
        "answer": "COURTOIS",
        "displayName": "Courtois",
        "detail": "20 porterías a cero",
        "value": 20,
        "label": "20 porterías a cero",
        "hintNationality": "Bélgica",
        "hintPosition": "Portero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "T______ C_______"
      },
      {
        "position": 2,
        "answer": "NAVAS",
        "displayName": "Keylor Navas",
        "detail": "17 porterías a cero",
        "value": 17,
        "label": "17 porterías a cero",
        "hintNationality": "Costa Rica",
        "hintPosition": "Portero",
        "hintClub": "Levante",
        "hintInitial": "K_____ N____"
      },
      {
        "position": 3,
        "answer": "DIEGOLOPEZ",
        "displayName": "Diego López",
        "detail": "16 porterías a cero",
        "value": 16,
        "label": "16 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Real Madrid",
        "hintInitial": "D____ L____"
      },
      {
        "position": 4,
        "answer": "VALDES",
        "displayName": "Víctor Valdés",
        "detail": "13 porterías a cero",
        "value": 13,
        "label": "13 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Barcelona",
        "hintInitial": "V_____ V_____"
      },
      {
        "position": 5,
        "answer": "CABALLERO",
        "displayName": "Caballero",
        "detail": "12 porterías a cero",
        "value": 12,
        "label": "12 porterías a cero",
        "hintNationality": "Argentina",
        "hintPosition": "Portero",
        "hintClub": "Málaga",
        "hintInitial": "W____ C________"
      },
      {
        "position": 6,
        "answer": "ALVES",
        "displayName": "Diego Alves",
        "detail": "9 porterías a cero",
        "value": 9,
        "label": "9 porterías a cero",
        "hintNationality": "Brasil",
        "hintPosition": "Portero",
        "hintClub": "Valencia",
        "hintInitial": "D____ A____"
      },
      {
        "position": 7,
        "answer": "BETO",
        "displayName": "Beto",
        "detail": "9 porterías a cero",
        "value": 9,
        "label": "9 porterías a cero",
        "hintNationality": "Portugal",
        "hintPosition": "Portero",
        "hintClub": "Sevilla",
        "hintInitial": "B___"
      },
      {
        "position": 8,
        "answer": "ASENJO",
        "displayName": "Asenjo",
        "detail": "9 porterías a cero",
        "value": 9,
        "label": "9 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Villarreal",
        "hintInitial": "S_____ A_____"
      },
      {
        "position": 9,
        "answer": "CASILLA",
        "displayName": "Kiko Casilla",
        "detail": "9 porterías a cero",
        "value": 9,
        "label": "9 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Espanyol",
        "hintInitial": "K___ C______"
      },
      {
        "position": 10,
        "answer": "ANDRESFERNANDEZ",
        "displayName": "Andrés Fernández",
        "detail": "9 porterías a cero",
        "value": 9,
        "label": "9 porterías a cero",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Osasuna",
        "hintInitial": "A_____ F________"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-goleadores",
    "kind": "FÁCIL",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles acumulados en LaLiga según StatBunker",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://betl.statbunker.com/alltimestats?comp_code=LL",
    "sourceNote": "Fuente consultada: StatBunker - datos limitados a la era BBVA 2005/06-2015/16.",
    "title": "Máximos goleadores BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · goles",
    "consigna": "Completa el Top10 histórico de goleadores de LaLiga.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "453 goles",
        "value": 453,
        "label": "453 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "311 goles",
        "value": 311,
        "label": "311 goles",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______"
      },
      {
        "position": 3,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "238 goles",
        "value": 238,
        "label": "238 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______"
      },
      {
        "position": 4,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "203 goles",
        "value": 203,
        "label": "203 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "A_______ G________"
      },
      {
        "position": 5,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "178 goles",
        "value": 178,
        "label": "178 goles",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L___ S_____"
      },
      {
        "position": 6,
        "answer": "ASPAS",
        "displayName": "Aspas",
        "detail": "163 goles",
        "value": 163,
        "label": "163 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Celta de Vigo",
        "hintInitial": "I___ A____"
      },
      {
        "position": 7,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "142 goles",
        "value": 142,
        "label": "142 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____"
      },
      {
        "position": 8,
        "answer": "NEGREDO",
        "displayName": "Negredo",
        "detail": "127 goles",
        "value": 127,
        "label": "127 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "N______"
      },
      {
        "position": 9,
        "answer": "GERARDMORENO",
        "displayName": "Gerard Moreno",
        "detail": "123 goles",
        "value": 123,
        "label": "123 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Villarreal",
        "hintInitial": "G_____ M_____"
      },
      {
        "position": 10,
        "answer": "SOLDADO",
        "displayName": "Soldado",
        "detail": "116 goles",
        "value": 116,
        "label": "116 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "R_______ S______"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-goleadores-espanoles",
    "kind": "MEDIO",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles acumulados por jugadores españoles",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://betl.statbunker.com/alltimestats?comp_code=LL",
    "sourceNote": "Fuente consultada: StatBunker - datos limitados a la era BBVA 2005/06-2015/16.",
    "title": "Máximos goleadores españoles BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · españoles",
    "consigna": "Completa el Top10 de goleadores españoles.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "ASPAS",
        "displayName": "Aspas",
        "detail": "163 goles",
        "value": 163,
        "label": "163 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Celta de Vigo",
        "hintInitial": "I___ A____"
      },
      {
        "position": 2,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "142 goles",
        "value": 142,
        "label": "142 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____"
      },
      {
        "position": 3,
        "answer": "NEGREDO",
        "displayName": "Negredo",
        "detail": "127 goles",
        "value": 127,
        "label": "127 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "N______"
      },
      {
        "position": 4,
        "answer": "GERARDMORENO",
        "displayName": "Gerard Moreno",
        "detail": "123 goles",
        "value": 123,
        "label": "123 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Villarreal",
        "hintInitial": "G_____ M_____"
      },
      {
        "position": 5,
        "answer": "SOLDADO",
        "displayName": "Soldado",
        "detail": "116 goles",
        "value": 116,
        "label": "116 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "R_______ S______"
      },
      {
        "position": 6,
        "answer": "GARCIA",
        "displayName": "Raúl García",
        "detail": "101 goles",
        "value": 101,
        "label": "101 goles",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "R___ G_____"
      },
      {
        "position": 7,
        "answer": "OYARZABAL",
        "displayName": "Oyarzabal",
        "detail": "87 goles",
        "value": 87,
        "label": "87 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "M____ O________"
      },
      {
        "position": 8,
        "answer": "LLORENTE",
        "displayName": "Llorente",
        "detail": "80 goles",
        "value": 80,
        "label": "80 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "F_______ L_______"
      },
      {
        "position": 9,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "75 goles",
        "value": 75,
        "label": "75 goles",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 10,
        "answer": "MOLINA",
        "displayName": "Jorge Molina",
        "detail": "73 goles",
        "value": 73,
        "label": "73 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Betis",
        "hintInitial": "J____ M_____"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-goleadores-extranjeros",
    "kind": "FÁCIL",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles acumulados por jugadores extranjeros",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://betl.statbunker.com/alltimestats?comp_code=LL",
    "sourceNote": "Corregido manualmente el 2026-06-12 para usar solo goles del periodo 2005/06-2015/16; no usa totales históricos completos.",
    "title": "Máximos goleadores extranjeros BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · extranjeros",
    "consigna": "Completa el Top10 de goleadores extranjeros.",
    "emoji": "🌍",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "311 goles",
        "value": 311,
        "label": "311 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "M____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "260 goles",
        "value": 260,
        "label": "260 goles",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______"
      },
      {
        "position": 3,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "111 goles",
        "value": 111,
        "label": "111 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "B______"
      },
      {
        "position": 4,
        "answer": "HIGUAIN",
        "displayName": "Higuaín",
        "detail": "107 goles",
        "value": 107,
        "label": "107 goles",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "H______"
      },
      {
        "position": 5,
        "answer": "ETOO",
        "displayName": "Eto'o",
        "detail": "94 goles",
        "value": 94,
        "label": "94 goles",
        "hintNationality": "Camerún",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "E___"
      },
      {
        "position": 6,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "90 goles",
        "value": 90,
        "label": "90 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "G________"
      },
      {
        "position": 7,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "56 goles",
        "value": 56,
        "label": "56 goles",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L___ S_____"
      },
      {
        "position": 8,
        "answer": "FORLAN",
        "displayName": "Forlán",
        "detail": "54 goles",
        "value": 54,
        "label": "54 goles",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "F_____"
      },
      {
        "position": 9,
        "answer": "KANOUTE",
        "displayName": "Kanouté",
        "detail": "52 goles",
        "value": 52,
        "label": "52 goles",
        "hintNationality": "Mal?",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "K_____"
      },
      {
        "position": 10,
        "answer": "VELA",
        "displayName": "Carlos Vela",
        "detail": "51 goles",
        "value": 51,
        "label": "51 goles",
        "hintNationality": "México",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "C_____ V___"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-sin-barca-madrid-goleadores",
    "kind": "DIFÍCIL",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Goles acumulados excluyendo jugadores asociados a Barça o Real Madrid en el reto",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://betl.statbunker.com/alltimestats?comp_code=LL",
    "sourceNote": "Corregido manualmente el 2026-06-12 para excluir goles con Barcelona y Real Madrid y usar solo 2005/06-2015/16.",
    "title": "Máximos goleadores sin Barça/Madrid 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · sin gigantes",
    "consigna": "Completa el Top10 de goleadores sin Barça ni Madrid.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "VILLA",
        "displayName": "Villa",
        "detail": "145 goles",
        "value": 145,
        "label": "145 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "V____"
      },
      {
        "position": 2,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "125 goles",
        "value": 125,
        "label": "125 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A_____"
      },
      {
        "position": 3,
        "answer": "NEGREDO",
        "displayName": "Negredo",
        "detail": "112 goles",
        "value": 112,
        "label": "112 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "N______"
      },
      {
        "position": 4,
        "answer": "SOLDADO",
        "displayName": "Soldado",
        "detail": "106 goles",
        "value": 106,
        "label": "106 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "S______"
      },
      {
        "position": 5,
        "answer": "FORLAN",
        "displayName": "Forlán",
        "detail": "94 goles",
        "value": 94,
        "label": "94 goles",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "F_____"
      },
      {
        "position": 6,
        "answer": "KANOUTE",
        "displayName": "Kanouté",
        "detail": "89 goles",
        "value": 89,
        "label": "89 goles",
        "hintNationality": "Mal?",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "K_____"
      },
      {
        "position": 7,
        "answer": "RUBENCASTRO",
        "displayName": "Rubén Castro",
        "detail": "77 goles",
        "value": 77,
        "label": "77 goles",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Betis",
        "hintInitial": "R____ C_____"
      },
      {
        "position": 8,
        "answer": "LUISFABIANO",
        "displayName": "Luis Fabiano",
        "detail": "72 goles",
        "value": 72,
        "label": "72 goles",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "L___ F_______"
      },
      {
        "position": 9,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "71 goles",
        "value": 71,
        "label": "71 goles",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "G________"
      },
      {
        "position": 10,
        "answer": "ROSSI",
        "displayName": "Rossi",
        "detail": "70 goles",
        "value": 70,
        "label": "70 goles",
        "hintNationality": "Italia",
        "hintPosition": "Delantero",
        "hintClub": "Villarreal",
        "hintInitial": "R____"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-asistencias",
    "kind": "MEDIO",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias acumuladas en LaLiga según StatBunker",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://bbs.statbunker.com/alltimestats/AllTimeCompetitionMostAssists?comp_code=LL",
    "sourceNote": "Fuente consultada: StatBunker - datos limitados a la era BBVA 2005/06-2015/16.",
    "title": "Máximos asistentes BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · asistencias",
    "consigna": "Completa el Top10 histórico de asistentes.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "167 asistencias",
        "value": 167,
        "label": "167 asistencias",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____"
      },
      {
        "position": 2,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "105 asistencias",
        "value": 105,
        "label": "105 asistencias",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______"
      },
      {
        "position": 3,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "88 asistencias",
        "value": 88,
        "label": "88 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___"
      },
      {
        "position": 4,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "86 asistencias",
        "value": 86,
        "label": "86 asistencias",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "A_______ G________"
      },
      {
        "position": 5,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "85 asistencias",
        "value": 85,
        "label": "85 asistencias",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______"
      },
      {
        "position": 6,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "74 asistencias",
        "value": 74,
        "label": "74 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 7,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "73 asistencias",
        "value": 73,
        "label": "73 asistencias",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L___ S_____"
      },
      {
        "position": 8,
        "answer": "ASPAS",
        "displayName": "Aspas",
        "detail": "68 asistencias",
        "value": 68,
        "label": "68 asistencias",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Celta de Vigo",
        "hintInitial": "I___ A____"
      },
      {
        "position": 9,
        "answer": "KROOS",
        "displayName": "Toni Kroos",
        "detail": "68 asistencias",
        "value": 68,
        "label": "68 asistencias",
        "hintNationality": "Alemania",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "T___ K____"
      },
      {
        "position": 10,
        "answer": "RAKITIC",
        "displayName": "Rakitic",
        "detail": "67 asistencias",
        "value": 67,
        "label": "67 asistencias",
        "hintNationality": "Croacia",
        "hintPosition": "Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "I___ R______"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-sin-barca-madrid-asistencias",
    "kind": "DIFÍCIL",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias acumuladas entre 2005/06 y 2015/16 excluyendo Barcelona y Real Madrid",
    "source": "StatBunker · LaLiga temporadas 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://statbunker.com/alltimestats/AllTimeCompetitionMostAssists?comp_code=LL",
    "sourceNote": "Fuente base: StatBunker. Ranking corregido para Futboldle con acumulado 2005/06-2015/16 sin Barça ni Real Madrid, según revisión manual indicada para beta.",
    "title": "Máximos asistentes sin Barça/Madrid 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · asistencias sin Barça/Madrid",
    "consigna": "Completa el Top10 de asistentes sin Barça ni Madrid.",
    "emoji": "🎯",
    "answers": [
      {
        "position": 1,
        "answer": "NAVAS",
        "displayName": "Jesús Navas",
        "detail": "77 asistencias",
        "value": 77,
        "label": "77 asistencias",
        "hintNationality": "España",
        "hintPosition": "Extremo / Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "J____ N____"
      },
      {
        "position": 2,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "66 asistencias",
        "value": 66,
        "label": "66 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___"
      },
      {
        "position": 3,
        "answer": "JOAQUIN",
        "displayName": "Joaquín",
        "detail": "62 asistencias",
        "value": 62,
        "label": "62 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "J______ S______"
      },
      {
        "position": 4,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "51 asistencias",
        "value": 51,
        "label": "51 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 5,
        "answer": "PRIETO",
        "displayName": "Xabi Prieto",
        "detail": "49 asistencias",
        "value": 49,
        "label": "49 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Sociedad",
        "hintInitial": "X___ P_____"
      },
      {
        "position": 6,
        "answer": "MATA",
        "displayName": "Juan Mata",
        "detail": "46 asistencias",
        "value": 46,
        "label": "46 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "J___ M___"
      },
      {
        "position": 7,
        "answer": "SUSAETA",
        "displayName": "Susaeta",
        "detail": "45 asistencias",
        "value": 45,
        "label": "45 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "M_____ S______"
      },
      {
        "position": 8,
        "answer": "DIEGOCASTRO",
        "displayName": "Diego Castro",
        "detail": "44 asistencias",
        "value": 44,
        "label": "44 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Getafe",
        "hintInitial": "D____ C_____"
      },
      {
        "position": 9,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "43 asistencias",
        "value": 43,
        "label": "43 asistencias",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "A_______ G________"
      },
      {
        "position": 10,
        "answer": "GABI",
        "displayName": "Gabi",
        "detail": "42 asistencias",
        "value": 42,
        "label": "42 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "G___ F________"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-asistencias-espanoles",
    "kind": "DIFÍCIL",
    "category": "ASISTENCIAS",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Asistencias de jugadores españoles",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://bbs.statbunker.com/alltimestats/AllTimeCompetitionMostAssists?comp_code=LL",
    "sourceNote": "Fuente consultada: StatBunker - datos limitados a la era BBVA 2005/06-2015/16.",
    "title": "Máximos asistentes españoles BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · españoles",
    "consigna": "Completa el Top10 de asistentes españoles.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "74 asistencias",
        "value": 74,
        "label": "74 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 2,
        "answer": "ALBA",
        "displayName": "Jordi Alba",
        "detail": "66 asistencias",
        "value": 66,
        "label": "66 asistencias",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "J____ A___"
      },
      {
        "position": 3,
        "answer": "ISCO",
        "displayName": "Isco",
        "detail": "54 asistencias",
        "value": 54,
        "label": "54 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Málaga",
        "hintInitial": "I___"
      },
      {
        "position": 4,
        "answer": "SUSAETA",
        "displayName": "Susaeta",
        "detail": "51 asistencias",
        "value": 51,
        "label": "51 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "M_____ S______"
      },
      {
        "position": 5,
        "answer": "XAVI",
        "displayName": "Xavi",
        "detail": "49 asistencias",
        "value": 49,
        "label": "49 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "X___ H________"
      },
      {
        "position": 6,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "48 asistencias",
        "value": 48,
        "label": "48 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "A_____ I______"
      },
      {
        "position": 7,
        "answer": "JOAQUIN",
        "displayName": "Joaquín",
        "detail": "48 asistencias",
        "value": 48,
        "label": "48 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "J______ S_______"
      },
      {
        "position": 8,
        "answer": "LEON",
        "displayName": "Pedro León",
        "detail": "44 asistencias",
        "value": 44,
        "label": "44 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Getafe",
        "hintInitial": "P____ L___"
      },
      {
        "position": 9,
        "answer": "GARCIA",
        "displayName": "Raúl García",
        "detail": "44 asistencias",
        "value": 44,
        "label": "44 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "R___ G_____"
      },
      {
        "position": 10,
        "answer": "CANALES",
        "displayName": "Canales",
        "detail": "44 asistencias",
        "value": 44,
        "label": "44 asistencias",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "S_____ C______"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-partidos",
    "kind": "MEDIO",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos acumulados en LaLiga",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://m.statbunker.com/alltimestats/AllTimeAppearances?comp_code=LL",
    "sourceNote": "Fuente consultada: StatBunker - datos limitados a la era BBVA 2005/06-2015/16.",
    "title": "Más partidos BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · apariciones",
    "consigna": "Completa el Top10 histórico de partidos.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "546 partidos",
        "value": 546,
        "label": "546 partidos",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "A_______ G________"
      },
      {
        "position": 2,
        "answer": "GARCIA",
        "displayName": "Raúl García",
        "detail": "541 partidos",
        "value": 541,
        "label": "541 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "R___ G_____"
      },
      {
        "position": 3,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "522 partidos",
        "value": 522,
        "label": "522 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 4,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "499 partidos",
        "value": 499,
        "label": "499 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___"
      },
      {
        "position": 5,
        "answer": "BUSQUETS",
        "displayName": "Busquets",
        "detail": "479 partidos",
        "value": 479,
        "label": "479 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "S_____ B_______"
      },
      {
        "position": 6,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "470 partidos",
        "value": 470,
        "label": "470 partidos",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____"
      },
      {
        "position": 7,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "439 partidos",
        "value": 439,
        "label": "439 partidos",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______"
      },
      {
        "position": 8,
        "answer": "RAKITIC",
        "displayName": "Rakitic",
        "detail": "436 partidos",
        "value": 436,
        "label": "436 partidos",
        "hintNationality": "Croacia",
        "hintPosition": "Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "I___ R______"
      },
      {
        "position": 9,
        "answer": "MUNAIN",
        "displayName": "Muniain",
        "detail": "434 partidos",
        "value": 434,
        "label": "434 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "I___ M______"
      },
      {
        "position": 10,
        "answer": "RAMOS",
        "displayName": "Sergio Ramos",
        "detail": "430 partidos",
        "value": 430,
        "label": "430 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Real Madrid",
        "hintInitial": "S_____ R____"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-partidos-espanoles",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de jugadores españoles",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://m.statbunker.com/alltimestats/AllTimeAppearances?comp_code=LL",
    "sourceNote": "Fuente consultada: StatBunker - datos limitados a la era BBVA 2005/06-2015/16.",
    "title": "Más partidos españoles BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · españoles",
    "consigna": "Completa el Top10 español de partidos.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "GARCIA",
        "displayName": "Raúl García",
        "detail": "541 partidos",
        "value": 541,
        "label": "541 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "R___ G_____"
      },
      {
        "position": 2,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "522 partidos",
        "value": 522,
        "label": "522 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 3,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "499 partidos",
        "value": 499,
        "label": "499 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___"
      },
      {
        "position": 4,
        "answer": "BUSQUETS",
        "displayName": "Busquets",
        "detail": "479 partidos",
        "value": 479,
        "label": "479 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "S_____ B_______"
      },
      {
        "position": 5,
        "answer": "MUNAIN",
        "displayName": "Muniain",
        "detail": "434 partidos",
        "value": 434,
        "label": "434 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "I___ M______"
      },
      {
        "position": 6,
        "answer": "RAMOS",
        "displayName": "Sergio Ramos",
        "detail": "430 partidos",
        "value": 430,
        "label": "430 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Real Madrid",
        "hintInitial": "S_____ R____"
      },
      {
        "position": 7,
        "answer": "DEMARCOS",
        "displayName": "De Marcos",
        "detail": "421 partidos",
        "value": 421,
        "label": "421 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Athletic Club",
        "hintInitial": "D_ ______"
      },
      {
        "position": 8,
        "answer": "NAVAS",
        "displayName": "Keylor Navas",
        "detail": "420 partidos",
        "value": 420,
        "label": "420 partidos",
        "hintNationality": "Costa Rica",
        "hintPosition": "Extremo / Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "J____ N____"
      },
      {
        "position": 9,
        "answer": "JOAQUIN",
        "displayName": "Joaquín",
        "detail": "407 partidos",
        "value": 407,
        "label": "407 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "J______ S_______"
      },
      {
        "position": 10,
        "answer": "MARTINEZ",
        "displayName": "Íñigo Martínez",
        "detail": "405 partidos",
        "value": 405,
        "label": "405 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Real Sociedad",
        "hintInitial": "Íñ___ ____í___"
      }
    ]
  },
  {
    "id": "statbunker-laliga-historico-penaltis",
    "kind": "MEDIO",
    "category": "GOLEADORES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Penaltis marcados en LaLiga según StatBunker",
    "source": "StatBunker - LaLiga 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://m.statbunker.com/alltimestats/AllTimePenalties?comp_code=LL",
    "sourceNote": "Fuente consultada: StatBunker - datos limitados a la era BBVA 2005/06-2015/16.",
    "title": "Más penaltis marcados BBVA 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · penaltis",
    "consigna": "Completa el Top10 de especialistas desde el punto de penalti.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "60 penaltis marcados",
        "value": 60,
        "label": "60 penaltis marcados",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C________ R______"
      },
      {
        "position": 2,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "59 penaltis marcados",
        "value": 59,
        "label": "59 penaltis marcados",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ M____"
      },
      {
        "position": 3,
        "answer": "ASPAS",
        "displayName": "Aspas",
        "detail": "38 penaltis marcados",
        "value": 38,
        "label": "38 penaltis marcados",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Celta de Vigo",
        "hintInitial": "I___ A____"
      },
      {
        "position": 4,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "32 penaltis marcados",
        "value": 32,
        "label": "32 penaltis marcados",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 5,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "26 penaltis marcados",
        "value": 26,
        "label": "26 penaltis marcados",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "K____ B______"
      },
      {
        "position": 6,
        "answer": "STUANI",
        "displayName": "Stuani",
        "detail": "25 penaltis marcados",
        "value": 25,
        "label": "25 penaltis marcados",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "C________ S_____"
      },
      {
        "position": 7,
        "answer": "OYARZABAL",
        "displayName": "Oyarzabal",
        "detail": "24 penaltis marcados",
        "value": 24,
        "label": "24 penaltis marcados",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Real Sociedad",
        "hintInitial": "M____ O________"
      },
      {
        "position": 8,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "22 penaltis marcados",
        "value": 22,
        "label": "22 penaltis marcados",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____"
      },
      {
        "position": 9,
        "answer": "GARCIA",
        "displayName": "Raúl García",
        "detail": "19 penaltis marcados",
        "value": 19,
        "label": "19 penaltis marcados",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "R___ G_____"
      },
      {
        "position": 10,
        "answer": "GERARDMORENO",
        "displayName": "Gerard Moreno",
        "detail": "19 penaltis marcados",
        "value": 19,
        "label": "19 penaltis marcados",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Villarreal",
        "hintInitial": "G_____ M_____"
      }
    ]
  },
  {
    "id": "statbunker-valencia-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Valencia CF entre 2005/06 y 2015/16",
    "source": "StatBunker · Valencia Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Valencia 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Valencia",
    "consigna": "Completa el Top10 de apariciones del Valencia en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "ALBELDA",
        "displayName": "Albelda",
        "detail": "184 partidos",
        "value": 184,
        "label": "184 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D____ A______"
      },
      {
        "position": 2,
        "answer": "JOAQUIN",
        "displayName": "Joaquín",
        "detail": "158 partidos",
        "value": 158,
        "label": "158 partidos",
        "hintNationality": "España",
        "hintPosition": "Extremo / Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "J_______ S______"
      },
      {
        "position": 3,
        "answer": "PAREJO",
        "displayName": "Parejo",
        "detail": "154 partidos",
        "value": 154,
        "label": "154 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "D___ P_____"
      },
      {
        "position": 4,
        "answer": "MARCHENA",
        "displayName": "Marchena",
        "detail": "151 partidos",
        "value": 151,
        "label": "151 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Valencia",
        "hintInitial": "C_____ M_______"
      },
      {
        "position": 5,
        "answer": "ALVES",
        "displayName": "Diego Alves",
        "detail": "146 partidos",
        "value": 146,
        "label": "146 partidos",
        "hintNationality": "Brasil",
        "hintPosition": "Portero",
        "hintClub": "Valencia",
        "hintInitial": "D____ A____"
      },
      {
        "position": 6,
        "answer": "FEGHOULI",
        "displayName": "Feghouli",
        "detail": "146 partidos",
        "value": 146,
        "label": "146 partidos",
        "hintNationality": "Argelia",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "S______ F_______"
      },
      {
        "position": 7,
        "answer": "BANEGA",
        "displayName": "Banega",
        "detail": "136 partidos",
        "value": 136,
        "label": "136 partidos",
        "hintNationality": "Argentina",
        "hintPosition": "Centrocampista",
        "hintClub": "Valencia",
        "hintInitial": "E___ B_____"
      },
      {
        "position": 8,
        "answer": "MATHIEU",
        "displayName": "Mathieu",
        "detail": "126 partidos",
        "value": 126,
        "label": "126 partidos",
        "hintNationality": "Francia",
        "hintPosition": "Defensa",
        "hintClub": "Valencia",
        "hintInitial": "J______ M_______"
      },
      {
        "position": 9,
        "answer": "JONAS",
        "displayName": "Jonas",
        "detail": "113 partidos",
        "value": 113,
        "label": "113 partidos",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "J____"
      },
      {
        "position": 10,
        "answer": "SOLDADO",
        "displayName": "Soldado",
        "detail": "101 partidos",
        "value": 101,
        "label": "101 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "R______ S______"
      }
    ]
  },
  {
    "id": "statbunker-sevilla-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Sevilla FC entre 2005/06 y 2015/16",
    "source": "StatBunker · Sevilla Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Sevilla 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Sevilla",
    "consigna": "Completa el Top10 de apariciones del Sevilla en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "NAVAS",
        "displayName": "Jesús Navas",
        "detail": "285 partidos",
        "value": 285,
        "label": "285 partidos",
        "hintNationality": "España",
        "hintPosition": "Extremo / Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "J____ N____"
      },
      {
        "position": 2,
        "answer": "PALOP",
        "displayName": "Palop",
        "detail": "217 partidos",
        "value": 217,
        "label": "217 partidos",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Sevilla",
        "hintInitial": "A_____ P____"
      },
      {
        "position": 3,
        "answer": "NAVARRO",
        "displayName": "Fernando Navarro",
        "detail": "202 partidos",
        "value": 202,
        "label": "202 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Sevilla",
        "hintInitial": "F_______ N______"
      },
      {
        "position": 4,
        "answer": "ADRIANO",
        "displayName": "Adriano",
        "detail": "157 partidos",
        "value": 157,
        "label": "157 partidos",
        "hintNationality": "Brasil",
        "hintPosition": "Defensa",
        "hintClub": "Sevilla",
        "hintInitial": "A______"
      },
      {
        "position": 5,
        "answer": "FABIANO",
        "displayName": "Luis Fabiano",
        "detail": "149 partidos",
        "value": 149,
        "label": "149 partidos",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "L___ F______"
      },
      {
        "position": 6,
        "answer": "FAZIO",
        "displayName": "Fazio",
        "detail": "148 partidos",
        "value": 148,
        "label": "148 partidos",
        "hintNationality": "Argentina",
        "hintPosition": "Defensa",
        "hintClub": "Sevilla",
        "hintInitial": "F_______ F____"
      },
      {
        "position": 7,
        "answer": "KANOUTE",
        "displayName": "Kanouté",
        "detail": "145 partidos",
        "value": 145,
        "label": "145 partidos",
        "hintNationality": "Mali",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "F_______ K______"
      },
      {
        "position": 8,
        "answer": "NEGREDO",
        "displayName": "Negredo",
        "detail": "139 partidos",
        "value": 139,
        "label": "139 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Sevilla",
        "hintInitial": "A_____ N_______"
      },
      {
        "position": 9,
        "answer": "COKE",
        "displayName": "Coke",
        "detail": "126 partidos",
        "value": 126,
        "label": "126 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Sevilla",
        "hintInitial": "C___"
      },
      {
        "position": 10,
        "answer": "RAKITIC",
        "displayName": "Rakitic",
        "detail": "117 partidos",
        "value": 117,
        "label": "117 partidos",
        "hintNationality": "Croacia",
        "hintPosition": "Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "I___ R______"
      }
    ]
  },
  {
    "id": "statbunker-villarreal-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Villarreal CF entre 2005/06 y 2015/16",
    "source": "StatBunker · Villarreal Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Villarreal 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Villarreal",
    "consigna": "Completa el Top10 de apariciones del Villarreal en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "SORIANO",
        "displayName": "Bruno Soriano",
        "detail": "230 partidos",
        "value": 230,
        "label": "230 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Villarreal",
        "hintInitial": "B____ S______"
      },
      {
        "position": 2,
        "answer": "CANI",
        "displayName": "Cani",
        "detail": "221 partidos",
        "value": 221,
        "label": "221 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Villarreal",
        "hintInitial": "C___"
      },
      {
        "position": 3,
        "answer": "GASPAR",
        "displayName": "Mario Gaspar",
        "detail": "185 partidos",
        "value": 185,
        "label": "185 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Villarreal",
        "hintInitial": "M____ G_____"
      },
      {
        "position": 4,
        "answer": "CAZORLA",
        "displayName": "Cazorla",
        "detail": "181 partidos",
        "value": 181,
        "label": "181 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Villarreal",
        "hintInitial": "S____ C______"
      },
      {
        "position": 5,
        "answer": "SENNA",
        "displayName": "Senna",
        "detail": "180 partidos",
        "value": 180,
        "label": "180 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Villarreal",
        "hintInitial": "M_____ S____"
      },
      {
        "position": 6,
        "answer": "DIEGOLOPEZ",
        "displayName": "Diego López",
        "detail": "171 partidos",
        "value": 171,
        "label": "171 partidos",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Villarreal",
        "hintInitial": "D____ L____"
      },
      {
        "position": 7,
        "answer": "MUSACCHIO",
        "displayName": "Musacchio",
        "detail": "166 partidos",
        "value": 166,
        "label": "166 partidos",
        "hintNationality": "Argentina",
        "hintPosition": "Defensa",
        "hintClub": "Villarreal",
        "hintInitial": "M____ M________"
      },
      {
        "position": 8,
        "answer": "CAPDEVILA",
        "displayName": "Capdevila",
        "detail": "140 partidos",
        "value": 140,
        "label": "140 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Villarreal",
        "hintInitial": "J___ C________"
      },
      {
        "position": 9,
        "answer": "ROSSI",
        "displayName": "Rossi",
        "detail": "136 partidos",
        "value": 136,
        "label": "136 partidos",
        "hintNationality": "Italia",
        "hintPosition": "Delantero",
        "hintClub": "Villarreal",
        "hintInitial": "G_______ R____"
      },
      {
        "position": 10,
        "answer": "TRIGUEROS",
        "displayName": "Trigueros",
        "detail": "130 partidos",
        "value": 130,
        "label": "130 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Villarreal",
        "hintInitial": "M___ T________"
      }
    ]
  },
  {
    "id": "statbunker-atletico-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Atlético de Madrid entre 2005/06 y 2015/16",
    "source": "StatBunker · Atlético de Madrid Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Atlético 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Atlético de Madrid",
    "consigna": "Completa el Top10 de apariciones del Atlético de Madrid en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "GARCIA",
        "displayName": "Raúl García",
        "detail": "216 partidos",
        "value": 216,
        "label": "216 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "R___ G_____"
      },
      {
        "position": 2,
        "answer": "GODIN",
        "displayName": "Godín",
        "detail": "213 partidos",
        "value": 213,
        "label": "213 partidos",
        "hintNationality": "Uruguay",
        "hintPosition": "Defensa",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "D____ G____"
      },
      {
        "position": 3,
        "answer": "GABI",
        "displayName": "Gabi",
        "detail": "190 partidos",
        "value": 190,
        "label": "190 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "G___"
      },
      {
        "position": 4,
        "answer": "KOKE",
        "displayName": "Koke",
        "detail": "185 partidos",
        "value": 185,
        "label": "185 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "K___"
      },
      {
        "position": 5,
        "answer": "AGUERO",
        "displayName": "Agüero",
        "detail": "175 partidos",
        "value": 175,
        "label": "175 partidos",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "S_____ A_____"
      },
      {
        "position": 6,
        "answer": "JUANFRAN",
        "displayName": "Juanfran",
        "detail": "169 partidos",
        "value": 169,
        "label": "169 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "J_______ T_____"
      },
      {
        "position": 7,
        "answer": "FILIPE",
        "displayName": "Filipe Luís",
        "detail": "147 partidos",
        "value": 147,
        "label": "147 partidos",
        "hintNationality": "Brasil",
        "hintPosition": "Defensa",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "F_____ L___"
      },
      {
        "position": 8,
        "answer": "TIAGO",
        "displayName": "Tiago",
        "detail": "147 partidos",
        "value": 147,
        "label": "147 partidos",
        "hintNationality": "Portugal",
        "hintPosition": "Centrocampista",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "T____"
      },
      {
        "position": 9,
        "answer": "FORLAN",
        "displayName": "Forlán",
        "detail": "134 partidos",
        "value": 134,
        "label": "134 partidos",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "D____ F_____"
      },
      {
        "position": 10,
        "answer": "MIRANDA",
        "displayName": "Miranda",
        "detail": "117 partidos",
        "value": 117,
        "label": "117 partidos",
        "hintNationality": "Brasil",
        "hintPosition": "Defensa",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "M______"
      }
    ]
  },
  {
    "id": "statbunker-athletic-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Athletic Club entre 2005/06 y 2015/16",
    "source": "StatBunker · Athletic Club Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Athletic Club 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Athletic Club",
    "consigna": "Completa el Top10 de apariciones del Athletic Club en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "IRAOLA",
        "displayName": "Iraola",
        "detail": "305 partidos",
        "value": 305,
        "label": "305 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ I_____"
      },
      {
        "position": 2,
        "answer": "SUSAETA",
        "displayName": "Susaeta",
        "detail": "265 partidos",
        "value": 265,
        "label": "265 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "M_____ S______"
      },
      {
        "position": 3,
        "answer": "GURPEGI",
        "displayName": "Gurpegui",
        "detail": "250 partidos",
        "value": 250,
        "label": "250 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "C_____ G_______"
      },
      {
        "position": 4,
        "answer": "IRAIZOZ",
        "displayName": "Iraizoz",
        "detail": "245 partidos",
        "value": 245,
        "label": "245 partidos",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Athletic Club",
        "hintInitial": "G____ I______"
      },
      {
        "position": 5,
        "answer": "MUNIAIN",
        "displayName": "Muniain",
        "detail": "220 partidos",
        "value": 220,
        "label": "220 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "I____ M______"
      },
      {
        "position": 6,
        "answer": "SANJOSE",
        "displayName": "San José",
        "detail": "210 partidos",
        "value": 210,
        "label": "210 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Athletic Club",
        "hintInitial": "M____ S__ J___"
      },
      {
        "position": 7,
        "answer": "DEMARCOS",
        "displayName": "De Marcos",
        "detail": "190 partidos",
        "value": 190,
        "label": "190 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Athletic Club",
        "hintInitial": "O____ D_ M_____"
      },
      {
        "position": 8,
        "answer": "MARTINEZ",
        "displayName": "Javi Martínez",
        "detail": "188 partidos",
        "value": 188,
        "label": "188 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "J___ M_______"
      },
      {
        "position": 9,
        "answer": "ADURIZ",
        "displayName": "Aduriz",
        "detail": "150 partidos",
        "value": 150,
        "label": "150 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Athletic Club",
        "hintInitial": "A____ A_____"
      },
      {
        "position": 10,
        "answer": "ITURRASPE",
        "displayName": "Iturraspe",
        "detail": "150 partidos",
        "value": 150,
        "label": "150 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Athletic Club",
        "hintInitial": "A_____ I________"
      }
    ]
  },
  {
    "id": "statbunker-betis-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Betis entre 2005/06 y 2015/16",
    "source": "StatBunker · Betis Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Betis 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Betis",
    "consigna": "Completa el Top10 de apariciones del Betis en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "CASTRO",
        "displayName": "Rubén Castro",
        "detail": "147 partidos",
        "value": 147,
        "label": "147 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Betis",
        "hintInitial": "R_____ C______"
      },
      {
        "position": 2,
        "answer": "MOLINA",
        "displayName": "Jorge Molina",
        "detail": "126 partidos",
        "value": 126,
        "label": "126 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Betis",
        "hintInitial": "J____ M_____"
      },
      {
        "position": 3,
        "answer": "JUANITO",
        "displayName": "Juanito",
        "detail": "111 partidos",
        "value": 111,
        "label": "111 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Betis",
        "hintInitial": "J______ G_______"
      },
      {
        "position": 4,
        "answer": "ARZU",
        "displayName": "Arzu",
        "detail": "105 partidos",
        "value": 105,
        "label": "105 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "A___"
      },
      {
        "position": 5,
        "answer": "MELLI",
        "displayName": "Melli",
        "detail": "104 partidos",
        "value": 104,
        "label": "104 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Betis",
        "hintInitial": "M____"
      },
      {
        "position": 6,
        "answer": "CANAS",
        "displayName": "Cañas",
        "detail": "85 partidos",
        "value": 85,
        "label": "85 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "J___ C____"
      },
      {
        "position": 7,
        "answer": "BENAT",
        "displayName": "Beñat",
        "detail": "65 partidos",
        "value": 65,
        "label": "65 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "B____ E_______"
      },
      {
        "position": 8,
        "answer": "JOAQUIN",
        "displayName": "Joaquín",
        "detail": "60 partidos",
        "value": 60,
        "label": "60 partidos",
        "hintNationality": "España",
        "hintPosition": "Extremo / Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "J_______ S______"
      },
      {
        "position": 9,
        "answer": "EMANA",
        "displayName": "Emaná",
        "detail": "58 partidos",
        "value": 58,
        "label": "58 partidos",
        "hintNationality": "Camerún",
        "hintPosition": "Centrocampista",
        "hintClub": "Betis",
        "hintInitial": "A______ E____"
      },
      {
        "position": 10,
        "answer": "VADILLO",
        "displayName": "Vadillo",
        "detail": "51 partidos",
        "value": 51,
        "label": "51 partidos",
        "hintNationality": "España",
        "hintPosition": "Extremo",
        "hintClub": "Betis",
        "hintInitial": "A_____ V______"
      }
    ]
  },
  {
    "id": "statbunker-espanyol-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Espanyol entre 2005/06 y 2015/16",
    "source": "StatBunker · Espanyol Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Espanyol 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Espanyol",
    "consigna": "Completa el Top10 de apariciones del Espanyol en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "KAMENI",
        "displayName": "Kameni",
        "detail": "222 partidos",
        "value": 222,
        "label": "222 partidos",
        "hintNationality": "Camerún",
        "hintPosition": "Portero",
        "hintClub": "Espanyol",
        "hintInitial": "C_____ K_____"
      },
      {
        "position": 2,
        "answer": "GARCIA",
        "displayName": "Sergio García",
        "detail": "200 partidos",
        "value": 200,
        "label": "200 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "S_____ G_____"
      },
      {
        "position": 3,
        "answer": "LUISGARCIA",
        "displayName": "Luis García",
        "detail": "190 partidos",
        "value": 190,
        "label": "190 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "L___ G_____"
      },
      {
        "position": 4,
        "answer": "JAVILOPEZ",
        "displayName": "Javi López",
        "detail": "160 partidos",
        "value": 160,
        "label": "160 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Espanyol",
        "hintInitial": "J___ L____"
      },
      {
        "position": 5,
        "answer": "CHICA",
        "displayName": "Chica",
        "detail": "155 partidos",
        "value": 155,
        "label": "155 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Espanyol",
        "hintInitial": "J_____ C____"
      },
      {
        "position": 6,
        "answer": "SANCHEZ",
        "displayName": "Víctor Sánchez",
        "detail": "150 partidos",
        "value": 150,
        "label": "150 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Espanyol",
        "hintInitial": "V_____ S______"
      },
      {
        "position": 7,
        "answer": "VERDU",
        "displayName": "Joan Verdú",
        "detail": "128 partidos",
        "value": 128,
        "label": "128 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Espanyol",
        "hintInitial": "J___ V____"
      },
      {
        "position": 8,
        "answer": "TAMUDO",
        "displayName": "Tamudo",
        "detail": "110 partidos",
        "value": 110,
        "label": "110 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "R___ T_____"
      },
      {
        "position": 9,
        "answer": "STUANI",
        "displayName": "Stuani",
        "detail": "103 partidos",
        "value": 103,
        "label": "103 partidos",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "C________ S_____"
      },
      {
        "position": 10,
        "answer": "CALLEJON",
        "displayName": "Callejón",
        "detail": "97 partidos",
        "value": 97,
        "label": "97 partidos",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Espanyol",
        "hintInitial": "J___ C_______"
      }
    ]
  },
  {
    "id": "statbunker-malaga-bbva-2005-2016-partidos",
    "kind": "DIFÍCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "2005/06-2015/16 · era BBVA 2005/06-2015/16",
    "criterion": "Partidos de Liga con Málaga entre 2005/06 y 2015/16",
    "source": "StatBunker · Málaga Season appearances 2005/06-2015/16",
    "sourceName": "StatBunker",
    "sourceUrl": "https://www.statbunker.com/competitions/SeasonAppearances?comp_id=518",
    "sourceNote": "Fuente consultada: StatBunker · suma manual de apariciones por temporada de LaLiga 2005/06-2015/16.",
    "title": "Más partidos Málaga 2005/06-2015/16",
    "subtitle": "2005/06-2015/16 · Málaga",
    "consigna": "Completa el Top10 de apariciones del Málaga en la era BBVA.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "DUDA",
        "displayName": "Duda",
        "detail": "250 partidos",
        "value": 250,
        "label": "250 partidos",
        "hintNationality": "Portugal",
        "hintPosition": "Centrocampista",
        "hintClub": "Málaga",
        "hintInitial": "D___"
      },
      {
        "position": 2,
        "answer": "WELIGTON",
        "displayName": "Weligton",
        "detail": "230 partidos",
        "value": 230,
        "label": "230 partidos",
        "hintNationality": "Brasil",
        "hintPosition": "Defensa",
        "hintClub": "Málaga",
        "hintInitial": "W_______"
      },
      {
        "position": 3,
        "answer": "GAMEZ",
        "displayName": "Jesús Gámez",
        "detail": "190 partidos",
        "value": 190,
        "label": "190 partidos",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Málaga",
        "hintInitial": "J____ G____"
      },
      {
        "position": 4,
        "answer": "ELISEU",
        "displayName": "Eliseu",
        "detail": "170 partidos",
        "value": 170,
        "label": "170 partidos",
        "hintNationality": "Portugal",
        "hintPosition": "Centrocampista",
        "hintClub": "Málaga",
        "hintInitial": "E_____"
      },
      {
        "position": 5,
        "answer": "CAMACHO",
        "displayName": "Camacho",
        "detail": "130 partidos",
        "value": 130,
        "label": "130 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Málaga",
        "hintInitial": "I______ C______"
      },
      {
        "position": 6,
        "answer": "CABALLERO",
        "displayName": "Caballero",
        "detail": "117 partidos",
        "value": 117,
        "label": "117 partidos",
        "hintNationality": "Argentina",
        "hintPosition": "Portero",
        "hintClub": "Málaga",
        "hintInitial": "W____ C________"
      },
      {
        "position": 7,
        "answer": "APONO",
        "displayName": "Apoño",
        "detail": "105 partidos",
        "value": 105,
        "label": "105 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Málaga",
        "hintInitial": "A____"
      },
      {
        "position": 8,
        "answer": "DEMICHELIS",
        "displayName": "Demichelis",
        "detail": "84 partidos",
        "value": 84,
        "label": "84 partidos",
        "hintNationality": "Argentina",
        "hintPosition": "Defensa",
        "hintClub": "Málaga",
        "hintInitial": "M_____ D_________"
      },
      {
        "position": 9,
        "answer": "ISCO",
        "displayName": "Isco",
        "detail": "69 partidos",
        "value": 69,
        "label": "69 partidos",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Málaga",
        "hintInitial": "I___"
      },
      {
        "position": 10,
        "answer": "RONDON",
        "displayName": "Rondón",
        "detail": "67 partidos",
        "value": 67,
        "label": "67 partidos",
        "hintNationality": "Venezuela",
        "hintPosition": "Delantero",
        "hintClub": "Málaga",
        "hintInitial": "S______ R_____"
      }
    ]
  },
  {
    "id": "fifa-11-media-bbva",
    "kind": "FÁCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "FIFA 11 · era BBVA 2005/06-2015/16",
    "criterion": "Media general en FIFA, sin potencial ni atributos parciales",
    "source": "FIFA Index · Top media FIFA 11",
    "sourceName": "FIFA Index",
    "sourceUrl": "https://www.futwiz.com/en/players/fifa11",
    "sourceNote": "Fuente consultada: FIFA Index · Top media FIFA 11.",
    "title": "Top media FIFA 11",
    "subtitle": "FIFA 11 · media general",
    "consigna": "Completa el Top10 de media general en FIFA 11.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "96 media",
        "value": 96,
        "label": "96 media",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "M_____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "94 media",
        "value": 94,
        "label": "94 media",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____ R_____"
      },
      {
        "position": 3,
        "answer": "XAVI",
        "displayName": "Xavi",
        "detail": "91 media",
        "value": 91,
        "label": "91 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "X_____"
      },
      {
        "position": 4,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "91 media",
        "value": 91,
        "label": "91 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "I_____"
      },
      {
        "position": 5,
        "answer": "CASILLAS",
        "displayName": "Casillas",
        "detail": "89 media",
        "value": 89,
        "label": "89 media",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____"
      },
      {
        "position": 6,
        "answer": "VILLA",
        "displayName": "Villa",
        "detail": "88 media",
        "value": 88,
        "label": "88 media",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "V_____"
      },
      {
        "position": 7,
        "answer": "PUYOL",
        "displayName": "Puyol",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "P_____"
      },
      {
        "position": 8,
        "answer": "ALVES",
        "displayName": "Dani Alves",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "Brasil",
        "hintPosition": "Portero",
        "hintClub": "Valencia",
        "hintInitial": "D_____ A_____"
      },
      {
        "position": 9,
        "answer": "PIQUE",
        "displayName": "Piqué",
        "detail": "85 media",
        "value": 85,
        "label": "85 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "P_____"
      },
      {
        "position": 10,
        "answer": "FORLAN",
        "displayName": "Forlán",
        "detail": "84 media",
        "value": 84,
        "label": "84 media",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "F_____"
      }
    ]
  },
  {
    "id": "fifa-12-media-bbva",
    "kind": "FÁCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "FIFA 12 · era BBVA 2005/06-2015/16",
    "criterion": "Media general en FIFA, sin potencial ni atributos parciales",
    "source": "FIFA Index · Top media FIFA 12",
    "sourceName": "FIFA Index",
    "sourceUrl": "https://fifaindex.com/players/fifa12",
    "sourceNote": "Fuente consultada: FIFA Index · Top media FIFA 12.",
    "title": "Top media FIFA 12",
    "subtitle": "FIFA 12 · media general",
    "consigna": "Completa el Top10 de media general en FIFA 12.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "94 media",
        "value": 94,
        "label": "94 media",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "M_____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "92 media",
        "value": 92,
        "label": "92 media",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____ R_____"
      },
      {
        "position": 3,
        "answer": "XAVI",
        "displayName": "Xavi",
        "detail": "92 media",
        "value": 92,
        "label": "92 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "X_____"
      },
      {
        "position": 4,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "91 media",
        "value": 91,
        "label": "91 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "I_____"
      },
      {
        "position": 5,
        "answer": "CASILLAS",
        "displayName": "Casillas",
        "detail": "89 media",
        "value": 89,
        "label": "89 media",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____"
      },
      {
        "position": 6,
        "answer": "VILLA",
        "displayName": "Villa",
        "detail": "88 media",
        "value": 88,
        "label": "88 media",
        "hintNationality": "España",
        "hintPosition": "Delantero",
        "hintClub": "Valencia",
        "hintInitial": "V_____"
      },
      {
        "position": 7,
        "answer": "PIQUE",
        "displayName": "Piqué",
        "detail": "88 media",
        "value": 88,
        "label": "88 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "P_____"
      },
      {
        "position": 8,
        "answer": "PUYOL",
        "displayName": "Puyol",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "P_____"
      },
      {
        "position": 9,
        "answer": "OZIL",
        "displayName": "Özil",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "Alemania",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "Ö___"
      },
      {
        "position": 10,
        "answer": "ALVES",
        "displayName": "Dani Alves",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "Brasil",
        "hintPosition": "Portero",
        "hintClub": "Valencia",
        "hintInitial": "D_____ A_____"
      }
    ]
  },
  {
    "id": "fifa-13-media-bbva",
    "kind": "FÁCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "FIFA 13 · era BBVA 2005/06-2015/16",
    "criterion": "Media general en FIFA, sin potencial ni atributos parciales",
    "source": "FIFA Index · Top media FIFA 13",
    "sourceName": "FIFA Index",
    "sourceUrl": "https://www.fifaindex.com/players/fifa13/",
    "sourceNote": "Fuente consultada: FIFA Index · Top media FIFA 13.",
    "title": "Top media FIFA 13",
    "subtitle": "FIFA 13 · media general",
    "consigna": "Completa el Top10 de media general en FIFA 13.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "94 media",
        "value": 94,
        "label": "94 media",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "M_____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "92 media",
        "value": 92,
        "label": "92 media",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____ R_____"
      },
      {
        "position": 3,
        "answer": "FALCAO",
        "displayName": "Falcao",
        "detail": "90 media",
        "value": 90,
        "label": "90 media",
        "hintNationality": "Colombia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "F_____"
      },
      {
        "position": 4,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "90 media",
        "value": 90,
        "label": "90 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "I_____"
      },
      {
        "position": 5,
        "answer": "XAVI",
        "displayName": "Xavi",
        "detail": "90 media",
        "value": 90,
        "label": "90 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "X_____"
      },
      {
        "position": 6,
        "answer": "CASILLAS",
        "displayName": "Casillas",
        "detail": "89 media",
        "value": 89,
        "label": "89 media",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____"
      },
      {
        "position": 7,
        "answer": "PIQUE",
        "displayName": "Piqué",
        "detail": "88 media",
        "value": 88,
        "label": "88 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Barcelona",
        "hintInitial": "P_____"
      },
      {
        "position": 8,
        "answer": "RAMOS",
        "displayName": "Sergio Ramos",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Real Madrid",
        "hintInitial": "S_____ R_____"
      },
      {
        "position": 9,
        "answer": "OZIL",
        "displayName": "Özil",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "Alemania",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "Ö___"
      },
      {
        "position": 10,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "85 media",
        "value": 85,
        "label": "85 media",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "B_____"
      }
    ]
  },
  {
    "id": "fifa-14-media-bbva",
    "kind": "FÁCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "FIFA 14 · era BBVA 2005/06-2015/16",
    "criterion": "Media general en FIFA, sin potencial ni atributos parciales",
    "source": "FIFA Index · Top media FIFA 14",
    "sourceName": "FIFA Index",
    "sourceUrl": "https://www.fifaindex.com/players/fifa14/",
    "sourceNote": "Fuente consultada: FIFA Index · Top media FIFA 14.",
    "title": "Top media FIFA 14",
    "subtitle": "FIFA 14 · media general",
    "consigna": "Completa el Top10 de media general en FIFA 14.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "94 media",
        "value": 94,
        "label": "94 media",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "M_____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "92 media",
        "value": 92,
        "label": "92 media",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____ R_____"
      },
      {
        "position": 3,
        "answer": "FALCAO",
        "displayName": "Falcao",
        "detail": "90 media",
        "value": 90,
        "label": "90 media",
        "hintNationality": "Colombia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "F_____"
      },
      {
        "position": 4,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "89 media",
        "value": 89,
        "label": "89 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "I_____"
      },
      {
        "position": 5,
        "answer": "XAVI",
        "displayName": "Xavi",
        "detail": "89 media",
        "value": 89,
        "label": "89 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "X_____"
      },
      {
        "position": 6,
        "answer": "BALE",
        "displayName": "Gareth Bale",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "Gales",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G_____ B_____"
      },
      {
        "position": 7,
        "answer": "RAMOS",
        "displayName": "Sergio Ramos",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Real Madrid",
        "hintInitial": "S_____ R_____"
      },
      {
        "position": 8,
        "answer": "CASILLAS",
        "displayName": "Casillas",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "España",
        "hintPosition": "Portero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____"
      },
      {
        "position": 9,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "85 media",
        "value": 85,
        "label": "85 media",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "B_____"
      },
      {
        "position": 10,
        "answer": "NEYMAR",
        "displayName": "Neymar",
        "detail": "84 media",
        "value": 84,
        "label": "84 media",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "N_____"
      }
    ]
  },
  {
    "id": "fifa-15-media-bbva",
    "kind": "FÁCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "FIFA 15 · era BBVA 2005/06-2015/16",
    "criterion": "Media general en FIFA, sin potencial ni atributos parciales",
    "source": "FIFA Index · Top media FIFA 15",
    "sourceName": "FIFA Index",
    "sourceUrl": "https://www.fifaindex.com/players/fifa15/",
    "sourceNote": "Fuente consultada: FIFA Index · Top media FIFA 15.",
    "title": "Top media FIFA 15",
    "subtitle": "FIFA 15 · media general",
    "consigna": "Completa el Top10 de media general en FIFA 15.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "93 media",
        "value": 93,
        "label": "93 media",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "M_____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "92 media",
        "value": 92,
        "label": "92 media",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____ R_____"
      },
      {
        "position": 3,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "89 media",
        "value": 89,
        "label": "89 media",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ S_____"
      },
      {
        "position": 4,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "89 media",
        "value": 89,
        "label": "89 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "I_____"
      },
      {
        "position": 5,
        "answer": "RAMOS",
        "displayName": "Sergio Ramos",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Real Madrid",
        "hintInitial": "S_____ R_____"
      },
      {
        "position": 6,
        "answer": "BALE",
        "displayName": "Gareth Bale",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "Gales",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G_____ B_____"
      },
      {
        "position": 7,
        "answer": "NEYMAR",
        "displayName": "Neymar",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "N_____"
      },
      {
        "position": 8,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "85 media",
        "value": 85,
        "label": "85 media",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "B_____"
      },
      {
        "position": 9,
        "answer": "RAKITIC",
        "displayName": "Rakitic",
        "detail": "83 media",
        "value": 83,
        "label": "83 media",
        "hintNationality": "Croacia",
        "hintPosition": "Centrocampista",
        "hintClub": "Sevilla",
        "hintInitial": "R_____"
      },
      {
        "position": 10,
        "answer": "GRIEZMANN",
        "displayName": "Griezmann",
        "detail": "83 media",
        "value": 83,
        "label": "83 media",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Atlético de Madrid",
        "hintInitial": "G_____"
      }
    ]
  },
  {
    "id": "fifa-16-media-bbva",
    "kind": "FÁCIL",
    "category": "CLUBES",
    "topType": "TOP HISTÓRICO VERIFICADO",
    "period": "FIFA 16 · era BBVA 2005/06-2015/16",
    "criterion": "Media general en FIFA, sin potencial ni atributos parciales",
    "source": "FIFA Index · Top media FIFA 16",
    "sourceName": "FIFA Index",
    "sourceUrl": "https://www.fifaindex.com/players/fifa16/",
    "sourceNote": "Fuente consultada: FIFA Index · Top media FIFA 16.",
    "title": "Top media FIFA 16",
    "subtitle": "FIFA 16 · media general",
    "consigna": "Completa el Top10 de media general en FIFA 16.",
    "emoji": "🏟️",
    "answers": [
      {
        "position": 1,
        "answer": "MESSI",
        "displayName": "Messi",
        "detail": "94 media",
        "value": 94,
        "label": "94 media",
        "hintNationality": "Argentina",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "M_____"
      },
      {
        "position": 2,
        "answer": "RONALDO",
        "displayName": "Cristiano Ronaldo",
        "detail": "93 media",
        "value": 93,
        "label": "93 media",
        "hintNationality": "Portugal",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "C_____ R_____"
      },
      {
        "position": 3,
        "answer": "SUAREZ",
        "displayName": "Luis Suárez",
        "detail": "90 media",
        "value": 90,
        "label": "90 media",
        "hintNationality": "Uruguay",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "L_____ S_____"
      },
      {
        "position": 4,
        "answer": "NEYMAR",
        "displayName": "Neymar",
        "detail": "88 media",
        "value": 88,
        "label": "88 media",
        "hintNationality": "Brasil",
        "hintPosition": "Delantero",
        "hintClub": "Barcelona",
        "hintInitial": "N_____"
      },
      {
        "position": 5,
        "answer": "INIESTA",
        "displayName": "Iniesta",
        "detail": "88 media",
        "value": 88,
        "label": "88 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "I_____"
      },
      {
        "position": 6,
        "answer": "BALE",
        "displayName": "Gareth Bale",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "Gales",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "G_____ B_____"
      },
      {
        "position": 7,
        "answer": "RAMOS",
        "displayName": "Sergio Ramos",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "España",
        "hintPosition": "Defensa",
        "hintClub": "Real Madrid",
        "hintInitial": "S_____ R_____"
      },
      {
        "position": 8,
        "answer": "MODRIC",
        "displayName": "Modric",
        "detail": "87 media",
        "value": 87,
        "label": "87 media",
        "hintNationality": "Croacia",
        "hintPosition": "Centrocampista",
        "hintClub": "Real Madrid",
        "hintInitial": "M_____"
      },
      {
        "position": 9,
        "answer": "BENZEMA",
        "displayName": "Benzema",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "Francia",
        "hintPosition": "Delantero",
        "hintClub": "Real Madrid",
        "hintInitial": "B_____"
      },
      {
        "position": 10,
        "answer": "BUSQUETS",
        "displayName": "Busquets",
        "detail": "86 media",
        "value": 86,
        "label": "86 media",
        "hintNationality": "España",
        "hintPosition": "Centrocampista",
        "hintClub": "Barcelona",
        "hintInitial": "B_____"
      }
    ]
  }
];

export type Top10ValidationIssueType =
  | "goalkeeper_offensive_metric"
  | "non_goalkeeper_keeper_metric"
  | "missing_player"
  | "broken_encoding";

export interface Top10ValidationIssue {
  type: Top10ValidationIssueType;
  challengeId: string;
  title: string;
  answer?: string;
  displayName?: string;
  message: string;
}

export type Top10Family =
  | "FIFA"
  | "Goleadores temporada"
  | "Asistencias temporada"
  | "Porterías temporada"
  | "Acumulados BBVA"
  | "Clubes"
  | "Nacionalidades"
  | "Sin Barça/Madrid";

function normalizeTop10Text(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z0-9]/gi, "").toUpperCase();
}

function hasBrokenEncoding(value: string) {
  return /[A-Za-z\u00c0-\u024f]\?[A-Za-z\u00c0-\u024f]/.test(value);
}

function resolveTop10Player(answer: Top10Answer) {
  const display = normalizeTop10Text(answer.displayName);
  const normalizedAnswer = normalizeTop10Text(answer.answer);

  return bbvaPlayers.find(player => normalizeTop10Text(player.displayName) === display) ??
    bbvaPlayers.find(player => normalizeTop10Text(player.fullName) === display) ??
    bbvaPlayers.find(player => normalizeTop10Text(player.answer) === normalizedAnswer);
}

function isGoalkeeper(position: string) {
  return position.toLowerCase().includes("portero");
}

function isOffensiveMetric(challenge: Top10Challenge) {
  const text = `${challenge.category} ${challenge.title} ${challenge.criterion}`.toLowerCase();
  return challenge.category === "GOLEADORES" ||
    challenge.category === "ASISTENCIAS" ||
    text.includes("gol") ||
    text.includes("asist") ||
    text.includes("penalti");
}

export function validateTop10Challenge(challenge: Top10Challenge): Top10ValidationIssue[] {
  const issues: Top10ValidationIssue[] = [];
  const challengeTextFields = [
    challenge.title,
    challenge.subtitle,
    challenge.period,
    challenge.criterion,
    challenge.source,
    challenge.sourceNote,
  ];

  if (challengeTextFields.some(hasBrokenEncoding)) {
    issues.push({
      type: "broken_encoding",
      challengeId: challenge.id,
      title: challenge.title,
      message: "El Top10 tiene texto con encoding roto.",
    });
  }

  for (const answer of challenge.answers) {
    const answerTextFields = [
      answer.displayName,
      answer.detail,
      answer.label ?? "",
      answer.hintNationality,
      answer.hintPosition,
      answer.hintClub,
      answer.hintInitial,
    ];

    if (answerTextFields.some(hasBrokenEncoding)) {
      issues.push({
        type: "broken_encoding",
        challengeId: challenge.id,
        title: challenge.title,
        answer: answer.answer,
        displayName: answer.displayName,
        message: `El jugador ${answer.displayName} tiene texto con encoding roto.`,
      });
      continue;
    }

    const player = resolveTop10Player(answer);
    if (!player) {
      issues.push({
        type: "missing_player",
        challengeId: challenge.id,
        title: challenge.title,
        answer: answer.answer,
        displayName: answer.displayName,
        message: `${answer.displayName} no existe en la base global de jugadores.`,
      });
      continue;
    }

    if (challenge.category === "PORTEROS" && !isGoalkeeper(player.position)) {
      issues.push({
        type: "non_goalkeeper_keeper_metric",
        challengeId: challenge.id,
        title: challenge.title,
        answer: answer.answer,
        displayName: answer.displayName,
        message: `${answer.displayName} no es portero y aparece en un ranking de porteros.`,
      });
    }

    if (isOffensiveMetric(challenge) && isGoalkeeper(player.position) && !answer.verifiedGoalkeeperOffensive) {
      issues.push({
        type: "goalkeeper_offensive_metric",
        challengeId: challenge.id,
        title: challenge.title,
        answer: answer.answer,
        displayName: answer.displayName,
        message: `${answer.displayName} es portero y aparece en una métrica ofensiva.`,
      });
    }
  }

  return issues;
}

const retiredTop10Ids = new Set([
  "statbunker-laliga-historico-asistencias",
]);

export function getTop10ValidationIssues() {
  return top10Challenges.flatMap(validateTop10Challenge);
}

export const activeTop10Challenges = top10Challenges.filter(challenge => !retiredTop10Ids.has(challenge.id) && validateTop10Challenge(challenge).length === 0);

export function getTop10Family(challenge: Top10Challenge): Top10Family {
  const text = `${challenge.id} ${challenge.title} ${challenge.category}`.toLowerCase();
  if (text.includes("fifa")) return "FIFA";
  if (text.includes("sin-barca-madrid") || text.includes("sin barça/madrid")) return "Sin Barça/Madrid";
  if (challenge.category === "CLUBES" && text.includes("partidos")) return "Clubes";
  if (text.includes("español") || text.includes("extranjer")) return "Nacionalidades";
  if (challenge.category === "PORTEROS" || text.includes("porterías")) return text.includes("20") ? "Porterías temporada" : "Acumulados BBVA";
  if (challenge.category === "GOLEADORES") return /\d{4}-\d{2}|20\d{2}-\d{2}|\d{2}\/\d{2}/.test(challenge.id) ? "Goleadores temporada" : "Acumulados BBVA";
  if (challenge.category === "ASISTENCIAS") return /\d{4}-\d{2}|20\d{2}-\d{2}|\d{2}\/\d{2}/.test(challenge.id) ? "Asistencias temporada" : "Acumulados BBVA";
  return "Acumulados BBVA";
}

function getDayNumberForTop10(date = new Date()): number {
  const start = new Date("2025-01-01").getTime();
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - start) / 86400000) + 1;
}

function pickTop10ForDay(dayNumber: number, previous?: Top10Challenge): Top10Challenge {
  const publishableTop10Challenges = activeTop10Challenges.length ? activeTop10Challenges : top10Challenges;
  const total = publishableTop10Challenges.length;
  const baseIndex = Math.abs(dayNumber * 37 + 11) % total;
  const previousFamily = previous ? getTop10Family(previous) : null;

  for (let offset = 0; offset < total; offset++) {
    const candidate = publishableTop10Challenges[(baseIndex + offset) % total];
    if (!previousFamily || getTop10Family(candidate) !== previousFamily) return candidate;
  }

  return publishableTop10Challenges[baseIndex];
}

export function getDailyTop10(date = new Date()): Top10Challenge {
  const targetDay = getDayNumberForTop10(date);
  let selected = pickTop10ForDay(1);
  for (let day = 2; day <= targetDay; day++) {
    selected = pickTop10ForDay(day, selected);
  }
  return selected;
}
