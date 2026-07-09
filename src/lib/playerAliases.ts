import { normalize } from "@/lib/normalize";

export function foldAlias(value: string) {
  return normalize(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

const KNOWN_ALIASES: Record<string, string[]> = {
  PELE: ["Pele", "Pelé"],
  CRISTIANORONALDO: ["Cristiano", "Cristiano Ronaldo", "C. Ronaldo", "CR7", "Ronaldo"],
  RONALDONAZARIO: ["Ronaldo", "Ronaldo Nazario", "Ronaldo Nazário", "R9", "Fenomeno", "El Fenomeno"],
  RONALDO: ["Ronaldo", "R9", "Fenomeno", "El Fenomeno"],
  LIONELMESSI: ["Messi", "Leo Messi", "Lionel Messi"],
  MIROSLAVKLOSE: ["Klose", "Miroslav Klose"],
  KLOSE: ["Klose", "Miroslav Klose"],
  KYLIANMBAPPE: ["Mbappe", "Mbappé", "Kylian Mbappe", "Kylian Mbappé"],
  DAVIDVILLA: ["Villa", "David Villa", "El Guaje", "Guaje"],
  JUANMATA: ["Mata", "Juan Mata"],
  XAVIHERNANDEZ: ["Xavi", "Xavi Hernandez", "Xavi Hernández"],
  ANDRESINIESTA: ["Iniesta", "Andres Iniesta", "Andrés Iniesta"],
  KAKA: ["Kaka", "Kaká"],
  MESUTOZIL: ["Ozil", "Özil", "Mesut Ozil", "Mesut Özil"],
  CESCFABREGAS: ["Cesc", "Fabregas", "Fàbregas", "Fábregas", "Cesc Fabregas", "Cesc Fàbregas", "Cesc Fábregas"],
  ANGELDIMARIA: ["Di Maria", "Di María", "Angel Di Maria", "Ángel Di María"],
  CRISTHIANSTUANI: ["Stuani", "Cristhian Stuani"],
  ROBERTOSOLDADO: ["Soldado", "Roberto Soldado"],
  FERNANDOTORRES: ["Torres", "Fernando Torres", "El Niño", "El Nino"],
  RONALDINHO: ["Ronaldinho"],
  NEYMAR: ["Neymar", "Neymar Jr"],
  NEYMARJR: ["Neymar", "Neymar Jr"],
  FABIOCANNAVARO: ["Cannavaro", "Fabio Cannavaro"],
  IKERCASILLAS: ["Casillas", "Iker Casillas"],
  GIANLUIGIBUFFON: ["Buffon", "Gianluigi Buffon"],
  THOMASMULLER: ["Muller", "Müller", "Thomas Muller", "Thomas Müller"],
  SERGIOAGUERO: ["Aguero", "Agüero", "Kun", "Kun Aguero", "Kun Agüero", "Sergio Aguero", "Sergio Agüero"],
  GUILLERMOOCHOA: ["Ochoa", "Memo", "Memo Ochoa", "Guillermo Ochoa"],
  PETRCECH: ["Cech", "Čech", "Petr Cech", "Petr Čech"],
  NIKOLAZIGIC: ["Zigic", "Žigić", "Nikola Zigic", "Nikola Žigić"],
  DANIELGUIZA: ["Guiza", "Güiza", "Dani Guiza", "Dani Güiza", "Daniel Guiza", "Daniel Güiza"],
  GUIZA: ["Guiza", "Güiza", "Dani Guiza", "Dani Güiza"],
  ANTONIOGALDEANO: ["Apono", "Apoño", "Antonio Galdeano"],
  APONO: ["Apono", "Apoño"],
  CARLOSBACCA: ["Bacca", "Carlos Bacca"],
  BACCA: ["Bacca", "Carlos Bacca"],
  GUTI: ["Guti", "José María Gutiérrez", "Jose Maria Gutierrez", "Gutiérrez", "Gutierrez"],
  JOSEMARIAGUTIERREZ: ["Guti", "José María Gutiérrez", "Jose Maria Gutierrez"],
  CARMELOGONZALEZ: ["Carmelo", "Carmelo González", "Carmelo Gonzalez"],
  CARMELO: ["Carmelo", "Carmelo González", "Carmelo Gonzalez"],
  PEDRORODRIGUEZ: ["Pedro", "Pedrito", "Pedro Rodríguez", "Pedro Rodriguez"],
  UCHE: ["Uche", "Kalu Uche", "Ikechukwu Uche"],
};

export function getCommonFootballAliases(name: string, extraAliases: string[] = []) {
  const values = new Set<string>();
  const add = (value: string) => {
    const folded = foldAlias(value);
    if (folded) values.add(folded);
  };

  add(name);
  for (const alias of extraAliases) add(alias);

  const words = name.split(/\s+/).filter(Boolean);
  for (const word of words) add(word);
  if (words.length > 1) add(words[words.length - 1]);

  const knownKeys = Array.from(values);
  for (const key of knownKeys) {
    for (const alias of KNOWN_ALIASES[key] ?? []) add(alias);
  }

  return Array.from(values);
}

export function matchesFootballAlias(input: string, names: string[]) {
  const foldedInput = foldAlias(input);
  if (!foldedInput) return false;
  return names.some(name => getCommonFootballAliases(name).includes(foldedInput));
}
