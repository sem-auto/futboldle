export type WorldCupTitleRun = {
  id: string;
  year: number;
  champion: string;
  host: string;
  rivals: string[];
  finalScore: string;
  aliases: string[];
  note: string;
};

export const worldCupTitleRuns: WorldCupTitleRun[] = [
  {
    id: "argentina-2022",
    year: 2022,
    champion: "Argentina",
    host: "Catar",
    rivals: ["Arabia Saud\u00ed", "M\u00e9xico", "Polonia", "Australia", "Holanda", "Croacia", "Francia"],
    finalScore: "3-3, penaltis",
    aliases: ["Argentina", "Argentina 2022"],
    note: "El camino de Messi hasta levantar la Copa en Lusail.",
  },
  {
    id: "francia-2018",
    year: 2018,
    champion: "Francia",
    host: "Rusia",
    rivals: ["Australia", "Per\u00fa", "Dinamarca", "Argentina", "Uruguay", "B\u00e9lgica", "Croacia"],
    finalScore: "4-2",
    aliases: ["Francia", "Francia 2018"],
    note: "Mbapp\u00e9, Griezmann y Pogba hicieron campeona a Francia.",
  },
  {
    id: "alemania-2014",
    year: 2014,
    champion: "Alemania",
    host: "Brasil",
    rivals: ["Portugal", "Ghana", "Estados Unidos", "Argelia", "Francia", "Brasil", "Argentina"],
    finalScore: "1-0",
    aliases: ["Alemania", "Germany", "Alemania 2014"],
    note: "El 7-1 de semifinales y el gol de G\u00f6tze marcaron Brasil 2014.",
  },
  {
    id: "espana-2010",
    year: 2010,
    champion: "Espa\u00f1a",
    host: "Sud\u00e1frica",
    rivals: ["Suiza", "Honduras", "Chile", "Portugal", "Paraguay", "Alemania", "Holanda"],
    finalScore: "1-0",
    aliases: ["Espa\u00f1a", "Espana", "Spain", "Espa\u00f1a 2010"],
    note: "El Mundial de Iniesta, Casillas, Xavi, Villa y una generaci\u00f3n irrepetible.",
  },
  {
    id: "italia-2006",
    year: 2006,
    champion: "Italia",
    host: "Alemania",
    rivals: ["Ghana", "Estados Unidos", "Rep\u00fablica Checa", "Australia", "Ucrania", "Alemania", "Francia"],
    finalScore: "1-1, penaltis",
    aliases: ["Italia", "Italy", "Italia 2006"],
    note: "Cannavaro, Buffon, Pirlo y una defensa para la historia.",
  },
  {
    id: "brasil-2002",
    year: 2002,
    champion: "Brasil",
    host: "Corea/Jap\u00f3n",
    rivals: ["Turqu\u00eda", "China", "Costa Rica", "B\u00e9lgica", "Inglaterra", "Turqu\u00eda", "Alemania"],
    finalScore: "2-0",
    aliases: ["Brasil", "Brazil", "Brasil 2002"],
    note: "Ronaldo, Rivaldo y Ronaldinho cerraron una Brasil de videojuego.",
  },
];

export function getDailyTitleRun(dayNumber: number) {
  return worldCupTitleRuns[dayNumber % worldCupTitleRuns.length];
}
