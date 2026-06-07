export type CareerAudit = {
  spanishClub: string;
  otherClub: string;
  extraClub?: string;
  shortClue: string;
  source: string;
  sourceUrl: string;
};

export const PROJECT_PERIOD = "Liga BBVA / LaLiga 2005-2016";

// Trayectorias jugables auditadas. Los clubes de fuera de Espana solo se usan
// como contexto real cuando ayudan a resolver el jugador.
export const CAREER_AUDIT: Record<number, CareerAudit> = {
  1: { spanishClub: "Valencia", otherClub: "Almería", shortClue: "Especialista en penaltis.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  2: { spanishClub: "Málaga", otherClub: "Espanyol", shortClue: "Portero camerunés.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  3: { spanishClub: "Sevilla", otherClub: "Valencia", shortClue: "Portero goleador europeo.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  5: { spanishClub: "Real Sociedad", otherClub: "Barcelona", shortClue: "Portero chileno.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  7: { spanishClub: "Valencia", otherClub: "Getafe", shortClue: "Canterano de Mestalla.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  9: { spanishClub: "Levante", otherClub: "Real Madrid", shortClue: "Portero costarricense.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  21: { spanishClub: "Atlético de Madrid", otherClub: "Deportivo", shortClue: "Lateral izquierdo brasileño.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  22: { spanishClub: "Villarreal", otherClub: "Deportivo", extraClub: "Atlético", shortClue: "Campeón del mundo.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  24: { spanishClub: "Atlético de Madrid", otherClub: "Villarreal", shortClue: "Central uruguayo.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  28: { spanishClub: "Valencia", otherClub: "Sevilla", shortClue: "Central francés.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  32: { spanishClub: "Valencia", otherClub: "Barcelona", shortClue: "Lateral zurdo.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  33: { spanishClub: "Atlético de Madrid", otherClub: "Osasuna", shortClue: "Lateral de Simeone.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  37: { spanishClub: "Valencia", otherClub: "Barcelona", shortClue: "Central-lateral francés.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  40: { spanishClub: "Sevilla", otherClub: "Rayo Vallecano", shortClue: "Lateral de Europa League.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  60: { spanishClub: "Deportivo", otherClub: "Las Palmas", shortClue: "Mediapunta elegante.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  61: { spanishClub: "Villarreal", otherClub: "Málaga", shortClue: "Zurda de lujo.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  63: { spanishClub: "Betis", otherClub: "Valencia", extraClub: "Málaga", shortClue: "Extremo eterno.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  65: { spanishClub: "Sevilla", otherClub: "Manchester City", shortClue: "Banda derecha sevillista.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  70: { spanishClub: "Valencia", otherClub: "Zaragoza", extraClub: "Villarreal", shortClue: "Mediocentro brasileño.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  74: { spanishClub: "Valencia", otherClub: "Almería", shortClue: "Extremo argentino.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  76: { spanishClub: "Betis", otherClub: "Athletic Club", shortClue: "Mediocentro vasco.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  89: { spanishClub: "Málaga", otherClub: "Las Palmas", shortClue: "Zurda malaguista.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  132: { spanishClub: "Valencia", otherClub: "Getafe", extraClub: "Villarreal", shortClue: "Nueve español.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  137: { spanishClub: "Villarreal", otherClub: "Internacional", extraClub: "Santos", shortClue: "Delantero brasileño.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  143: { spanishClub: "Betis", otherClub: "Las Palmas", shortClue: "Goleador canario.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  168: { spanishClub: "Sevilla", otherClub: "Club Brugge", shortClue: "Delantero colombiano.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  169: { spanishClub: "Sevilla", otherClub: "Atlético de Madrid", extraClub: "Lorient", shortClue: "Delantero francés.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  171: { spanishClub: "Sporting", otherClub: "Levante", extraClub: "Granada", shortClue: "Delantero de área.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  224: { spanishClub: "Levante", otherClub: "Eibar", shortClue: "El Comandante.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  225: { spanishClub: "Sevilla", otherClub: "Levante", shortClue: "Mediocentro alto.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  226: { spanishClub: "Getafe", otherClub: "Sporting", shortClue: "Extremo zurdo.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
  227: { spanishClub: "Athletic Club", otherClub: "Granada", shortClue: "Mediocentro de recorrido.", source: "Transfermarkt", sourceUrl: "https://www.transfermarkt.com/" },
};

export function getExcludedTrajectoryIds(allIds: number[]) {
  const audited = new Set(Object.keys(CAREER_AUDIT).map(Number));
  return allIds.filter(id => !audited.has(id));
}
