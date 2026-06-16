export type WorldCupChampionChallenge = {
  year: number;
  host: string;
  champion: string;
  runnerUp: string;
  finalScore: string;
  note?: string;
};

export const worldCupChampionChallenges: WorldCupChampionChallenge[] = [
  { year: 1930, host: "Uruguay", champion: "Uruguay", runnerUp: "Argentina", finalScore: "4-2" },
  { year: 1934, host: "Italia", champion: "Italia", runnerUp: "Checoslovaquia", finalScore: "2-1" },
  { year: 1938, host: "Francia", champion: "Italia", runnerUp: "Hungr\u00eda", finalScore: "4-2" },
  { year: 1950, host: "Brasil", champion: "Uruguay", runnerUp: "Brasil", finalScore: "2-1", note: "Maracanazo" },
  { year: 1954, host: "Suiza", champion: "Alemania Federal", runnerUp: "Hungr\u00eda", finalScore: "3-2" },
  { year: 1958, host: "Suecia", champion: "Brasil", runnerUp: "Suecia", finalScore: "5-2" },
  { year: 1962, host: "Chile", champion: "Brasil", runnerUp: "Checoslovaquia", finalScore: "3-1" },
  { year: 1966, host: "Inglaterra", champion: "Inglaterra", runnerUp: "Alemania Federal", finalScore: "4-2" },
  { year: 1970, host: "M\u00e9xico", champion: "Brasil", runnerUp: "Italia", finalScore: "4-1" },
  { year: 1974, host: "Alemania Federal", champion: "Alemania Federal", runnerUp: "Holanda", finalScore: "2-1" },
  { year: 1978, host: "Argentina", champion: "Argentina", runnerUp: "Holanda", finalScore: "3-1" },
  { year: 1982, host: "Espa\u00f1a", champion: "Italia", runnerUp: "Alemania Federal", finalScore: "3-1" },
  { year: 1986, host: "M\u00e9xico", champion: "Argentina", runnerUp: "Alemania Federal", finalScore: "3-2" },
  { year: 1990, host: "Italia", champion: "Alemania Federal", runnerUp: "Argentina", finalScore: "1-0" },
  { year: 1994, host: "Estados Unidos", champion: "Brasil", runnerUp: "Italia", finalScore: "0-0, penaltis" },
  { year: 1998, host: "Francia", champion: "Francia", runnerUp: "Brasil", finalScore: "3-0" },
  { year: 2002, host: "Corea/Jap\u00f3n", champion: "Brasil", runnerUp: "Alemania", finalScore: "2-0" },
  { year: 2006, host: "Alemania", champion: "Italia", runnerUp: "Francia", finalScore: "1-1, penaltis" },
  { year: 2010, host: "Sud\u00e1frica", champion: "Espa\u00f1a", runnerUp: "Holanda", finalScore: "1-0" },
  { year: 2014, host: "Brasil", champion: "Alemania", runnerUp: "Argentina", finalScore: "1-0" },
  { year: 2018, host: "Rusia", champion: "Francia", runnerUp: "Croacia", finalScore: "4-2" },
  { year: 2022, host: "Catar", champion: "Argentina", runnerUp: "Francia", finalScore: "3-3, penaltis" },
];

const countryAliases: Record<string, string[]> = {
  "Alemania": ["Alemania", "Germany"],
  "Alemania Federal": ["Alemania Federal", "RFA", "West Germany", "Alemania", "Germany"],
  "Argentina": ["Argentina"],
  "Brasil": ["Brasil", "Brazil"],
  "Catar": ["Catar", "Qatar"],
  "Checoslovaquia": ["Checoslovaquia", "Czechoslovakia"],
  "Croacia": ["Croacia", "Croatia"],
  "Espa\u00f1a": ["Espa\u00f1a", "Espana", "Spain"],
  "Estados Unidos": ["Estados Unidos", "USA", "United States"],
  "Francia": ["Francia", "France"],
  "Holanda": ["Holanda", "Paises Bajos", "Pa\u00edses Bajos", "Netherlands"],
  "Hungr\u00eda": ["Hungr\u00eda", "Hungria", "Hungary"],
  "Inglaterra": ["Inglaterra", "England"],
  "Italia": ["Italia", "Italy"],
  "M\u00e9xico": ["M\u00e9xico", "Mexico"],
  "Suecia": ["Suecia", "Sweden"],
  "Uruguay": ["Uruguay"],
};

export const worldCupCountries = Array.from(
  new Set(worldCupChampionChallenges.flatMap((item) => [item.champion, item.runnerUp]))
).sort((a, b) => a.localeCompare(b));

export function normalizeCountryText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getCountrySuggestions(input: string, limit = 8) {
  const q = normalizeCountryText(input);
  if (!q) return [];

  return worldCupCountries
    .map((country) => {
      const aliases = countryAliases[country] ?? [country];
      const normalized = aliases.map(normalizeCountryText);
      const starts = normalized.some((item) => item.startsWith(q));
      const contains = normalized.some((item) => item.includes(q));
      return { country, score: starts ? 0 : contains ? 1 : 99 };
    })
    .filter((item) => item.score < 99)
    .sort((a, b) => a.score - b.score || a.country.localeCompare(b.country))
    .slice(0, limit)
    .map((item) => item.country);
}

export function isCountryAnswer(input: string, answer: string) {
  const q = normalizeCountryText(input);
  const accepted = countryAliases[answer] ?? [answer];
  return accepted.some((alias) => normalizeCountryText(alias) === q);
}

export function getDailyWorldCupChampion(dayNumber: number) {
  return worldCupChampionChallenges[dayNumber % worldCupChampionChallenges.length];
}
