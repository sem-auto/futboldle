export type WorldCupTeam = {
  id: string;
  name: string;
  flag: string;
  confederation: string;
  priority: "alta" | "media" | "baja";
};

export const worldCupTeams: WorldCupTeam[] = [
  { id: "espana", name: "España", flag: "🇪🇸", confederation: "UEFA", priority: "alta" },
  { id: "argentina", name: "Argentina", flag: "🇦🇷", confederation: "CONMEBOL", priority: "alta" },
  { id: "brasil", name: "Brasil", flag: "🇧🇷", confederation: "CONMEBOL", priority: "alta" },
  { id: "alemania", name: "Alemania", flag: "🇩🇪", confederation: "UEFA", priority: "alta" },
  { id: "francia", name: "Francia", flag: "🇫🇷", confederation: "UEFA", priority: "alta" },
  { id: "italia", name: "Italia", flag: "🇮🇹", confederation: "UEFA", priority: "alta" },
  { id: "portugal", name: "Portugal", flag: "🇵🇹", confederation: "UEFA", priority: "alta" },
  { id: "inglaterra", name: "Inglaterra", flag: "🏴", confederation: "UEFA", priority: "alta" },
  { id: "holanda", name: "Holanda", flag: "🇳🇱", confederation: "UEFA", priority: "alta" },
  { id: "uruguay", name: "Uruguay", flag: "🇺🇾", confederation: "CONMEBOL", priority: "alta" },
  { id: "croacia", name: "Croacia", flag: "🇭🇷", confederation: "UEFA", priority: "media" },
  { id: "belgica", name: "Bélgica", flag: "🇧🇪", confederation: "UEFA", priority: "media" },
  { id: "japon", name: "Japón", flag: "🇯🇵", confederation: "AFC", priority: "media" },
  { id: "corea-sur", name: "Corea del Sur", flag: "🇰🇷", confederation: "AFC", priority: "media" },
];
