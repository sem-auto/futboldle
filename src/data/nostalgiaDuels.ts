export type NostalgiaDuelOption = {
  name: string;
  value: number;
  note: string;
  rewardName?: string;
};

export type NostalgiaDuel = {
  id: string;
  question: string;
  context: string;
  metricLabel: string;
  left: NostalgiaDuelOption;
  right: NostalgiaDuelOption;
};

export const nostalgiaDuels: NostalgiaDuel[] = [
  {
    id: "soldado-negredo-goles-bbva",
    question: "¿Quién marcó más goles en la era BBVA?",
    context: "Liga 2005/06-2015/16",
    metricLabel: "goles",
    left: { name: "Soldado", value: 106, note: "Osasuna, Getafe, Valencia y Villarreal", rewardName: "Soldado" },
    right: { name: "Negredo", value: 112, note: "Almería, Sevilla y Valencia", rewardName: "Negredo" },
  },
  {
    id: "villa-aduriz-goles-sin-grandes",
    question: "Sin contar Barça/Madrid, ¿quién hizo más goles?",
    context: "Liga BBVA nostalgia",
    metricLabel: "goles",
    left: { name: "David Villa", value: 145, note: "Zaragoza, Valencia y Atlético", rewardName: "Villa" },
    right: { name: "Aduriz", value: 125, note: "Athletic, Mallorca y Valencia", rewardName: "Aduriz" },
  },
  {
    id: "forlan-kanoute-goles",
    question: "¿Quién dejó más goles BBVA?",
    context: "Delanteros de culto",
    metricLabel: "goles",
    left: { name: "Forlán", value: 94, note: "Villarreal y Atlético", rewardName: "Forlán" },
    right: { name: "Kanouté", value: 89, note: "Sevilla", rewardName: "Kanouté" },
  },
  {
    id: "navas-joaquin-asistencias",
    question: "¿Quién repartió más asistencias?",
    context: "Extremos que olían a BBVA",
    metricLabel: "asistencias",
    left: { name: "Jesús Navas", value: 77, note: "Sevilla", rewardName: "Jesús Navas" },
    right: { name: "Joaquín", value: 62, note: "Betis, Valencia y Málaga", rewardName: "Joaquín" },
  },
  {
    id: "parejo-xabi-prieto-asistencias",
    question: "¿Quién sumó más asistencias?",
    context: "Centrocampistas con pie fino",
    metricLabel: "asistencias",
    left: { name: "Parejo", value: 51, note: "Getafe y Valencia", rewardName: "Parejo" },
    right: { name: "Xabi Prieto", value: 49, note: "Real Sociedad", rewardName: "Xabi Prieto" },
  },
  {
    id: "griezmann-rossi-goles",
    question: "¿Quién marcó más goles en este periodo?",
    context: "Delanteros zurdos y memorables",
    metricLabel: "goles",
    left: { name: "Griezmann", value: 71, note: "Real Sociedad y Atlético", rewardName: "Griezmann" },
    right: { name: "Rossi", value: 70, note: "Villarreal y Levante", rewardName: "Rossi" },
  },
  {
    id: "rubencastro-luisfabiano-goles",
    question: "¿Quién hizo más goles BBVA?",
    context: "Goleadores de club",
    metricLabel: "goles",
    left: { name: "Rubén Castro", value: 77, note: "Betis, Deportivo y Nàstic", rewardName: "Rubén Castro" },
    right: { name: "Luis Fabiano", value: 72, note: "Sevilla", rewardName: "Luis Fabiano" },
  },
  {
    id: "cazorla-banega-asistencias",
    question: "¿Quién dio más asistencias?",
    context: "Magia de centro del campo",
    metricLabel: "asistencias",
    left: { name: "Cazorla", value: 41, note: "Villarreal y Málaga", rewardName: "Cazorla" },
    right: { name: "Banega", value: 38, note: "Valencia, Atlético y Sevilla", rewardName: "Banega" },
  },
  {
    id: "diego-costa-falcao-goles-atleti",
    question: "¿Quién marcó más goles de Liga con el Atleti BBVA?",
    context: "Atlético de Simeone",
    metricLabel: "goles",
    left: { name: "Diego Costa", value: 43, note: "Atlético", rewardName: "Diego Costa" },
    right: { name: "Falcao", value: 52, note: "Atlético", rewardName: "Falcao" },
  },
  {
    id: "jonas-piatti-goles-valencia",
    question: "¿Quién marcó más con el Valencia?",
    context: "Mestalla 2010s",
    metricLabel: "goles",
    left: { name: "Jonas", value: 36, note: "Valencia", rewardName: "Jonas" },
    right: { name: "Piatti", value: 21, note: "Valencia", rewardName: "Piatti" },
  },
  {
    id: "cani-senna-asistencias",
    question: "¿Quién repartió más asistencias en Villarreal?",
    context: "Submarino amarillo",
    metricLabel: "asistencias",
    left: { name: "Cani", value: 38, note: "Villarreal", rewardName: "Cani" },
    right: { name: "Senna", value: 20, note: "Villarreal", rewardName: "Marcos Senna" },
  },
  {
    id: "duda-apono-asistencias",
    question: "¿Quién asistió más en el Málaga?",
    context: "La Rosaleda clásica",
    metricLabel: "asistencias",
    left: { name: "Duda", value: 45, note: "Málaga", rewardName: "Duda" },
    right: { name: "Apoño", value: 18, note: "Málaga", rewardName: "Apoño" },
  },
];

export function getDailyNostalgiaDuels(dayNumber: number, count = 5) {
  return Array.from({ length: count }, (_, index) => nostalgiaDuels[(dayNumber * 3 + index * 5) % nostalgiaDuels.length]);
}
