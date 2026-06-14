export type WorldCupTournament = {
  year: number;
  host: string | string[];
  champion?: string;
  runnerUp?: string;
  topScorer?: string;
  iconicTeams: string[];
};

export const worldCupTournaments: WorldCupTournament[] = [
  { year: 2002, host: ["Corea del Sur", "Japón"], champion: "Brasil", runnerUp: "Alemania", topScorer: "Ronaldo", iconicTeams: ["Brasil", "Alemania", "Turquía", "Corea del Sur", "Senegal"] },
  { year: 2006, host: "Alemania", champion: "Italia", runnerUp: "Francia", topScorer: "Miroslav Klose", iconicTeams: ["Italia", "Francia", "Alemania", "Portugal", "Argentina"] },
  { year: 2010, host: "Sudáfrica", champion: "España", runnerUp: "Holanda", topScorer: "Thomas Müller", iconicTeams: ["España", "Holanda", "Alemania", "Uruguay", "Ghana"] },
  { year: 2014, host: "Brasil", champion: "Alemania", runnerUp: "Argentina", topScorer: "James Rodríguez", iconicTeams: ["Alemania", "Argentina", "Brasil", "Holanda", "Colombia"] },
  { year: 2018, host: "Rusia", champion: "Francia", runnerUp: "Croacia", topScorer: "Harry Kane", iconicTeams: ["Francia", "Croacia", "Bélgica", "Inglaterra", "Uruguay"] },
  { year: 2022, host: "Qatar", champion: "Argentina", runnerUp: "Francia", topScorer: "Kylian Mbappé", iconicTeams: ["Argentina", "Francia", "Marruecos", "Croacia", "Brasil"] },
  { year: 2026, host: ["Estados Unidos", "México", "Canadá"], iconicTeams: ["Argentina", "Francia", "Brasil", "España", "Inglaterra"] },
];
