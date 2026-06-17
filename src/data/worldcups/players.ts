export type WorldCupPosition = "Portero" | "Defensa" | "Centrocampista" | "Delantero";
export type WorldCupIconicLevel = "icono" | "legendario" | "core" | "culto";
export type WorldCupCategory = "Leyenda" | "Campeon del mundo" | "Goleador" | "Heroe inesperado" | "Portero iconico";

export type WorldCupPlayer = {
  id: string;
  name: string;
  aliases: string[];
  nationality: string;
  flag: string;
  position: WorldCupPosition;
  worldCups: number[];
  mainWorldCup: number;
  iconicLevel: WorldCupIconicLevel;
  categories: WorldCupCategory[];
  worldCupRole: string;
  worldCupGoals?: number;
  clubsByWorldCup?: {
    year: number;
    club: string;
    age?: number;
  }[];
};

const championIds = new Set([
  "iker-casillas", "sergio-ramos", "carles-puyol", "xavi", "andres-iniesta", "david-villa", "fernando-torres", "sergio-busquets", "xabi-alonso", "gerard-pique", "cesc-fabregas", "david-silva",
  "lionel-messi", "angel-di-maria", "dibu-martinez",
  "ronaldo-nazario", "ronaldinho", "rivaldo", "kaka", "cafu", "roberto-carlos",
  "zinedine-zidane", "thierry-henry", "kylian-mbappe", "antoine-griezmann", "paul-pogba", "ngolo-kante",
  "miroslav-klose", "thomas-muller", "mesut-ozil", "philipp-lahm", "manuel-neuer", "bastian-schweinsteiger", "toni-kroos", "mario-gotze",
  "gianluigi-buffon", "fabio-cannavaro", "andrea-pirlo", "francesco-totti", "alessandro-del-piero", "marco-materazzi", "fabio-grosso",
]);

const heroIds = new Set(["mario-gotze", "fabio-grosso", "marco-materazzi", "james-rodriguez", "dibu-martinez", "diego-forlan"]);

const finalists = new Set([
  "zinedine-zidane", "thierry-henry", "wesley-sneijder", "arjen-robben", "robin-van-persie", "luka-modric", "javier-mascherano", "gonzalo-higuain", "sergio-aguero",
]);

const semifinalists = new Set([
  "diego-forlan", "luis-suarez", "edinson-cavani", "miroslav-klose", "thomas-muller", "bastian-schweinsteiger", "toni-kroos", "james-rodriguez",
]);

const notableGoals: Record<string, number> = {
  "david-villa": 5,
  "diego-forlan": 5,
  "lionel-messi": 7,
  "kylian-mbappe": 4,
  "miroslav-klose": 5,
  "ronaldo-nazario": 8,
  "wesley-sneijder": 5,
  "cristiano-ronaldo": 4,
  "antoine-griezmann": 4,
  "luka-modric": 2,
  "james-rodriguez": 6,
};

function inferCategories(id: string, position: WorldCupPosition, iconicLevel: WorldCupIconicLevel): WorldCupCategory[] {
  const categories: WorldCupCategory[] = [];
  if (iconicLevel === "icono" || iconicLevel === "legendario") categories.push("Leyenda");
  if (championIds.has(id)) categories.push("Campeon del mundo");
  if (position === "Delantero") categories.push("Goleador");
  if (position === "Portero") categories.push("Portero iconico");
  if (heroIds.has(id) || iconicLevel === "culto") categories.push("Heroe inesperado");
  return categories.length ? categories : ["Leyenda"];
}

function inferRole(id: string) {
  if (championIds.has(id)) return "Campeon";
  if (finalists.has(id)) return "Finalista";
  if (semifinalists.has(id)) return "Semifinalista";
  if (heroIds.has(id)) return "Heroe inesperado";
  return "Figura mundialista";
}

function flagForNationality(nationality: string) {
  const flags: Record<string, string> = {
    Espana: "\uD83C\uDDEA\uD83C\uDDF8",
    Alemania: "\uD83C\uDDE9\uD83C\uDDEA",
    Argentina: "\uD83C\uDDE6\uD83C\uDDF7",
    Brasil: "\uD83C\uDDE7\uD83C\uDDF7",
    Francia: "\uD83C\uDDEB\uD83C\uDDF7",
    Italia: "\uD83C\uDDEE\uD83C\uDDF9",
    Portugal: "\uD83C\uDDF5\uD83C\uDDF9",
    Inglaterra: "\uD83C\uDDEC\uD83C\uDDE7",
    Holanda: "\uD83C\uDDF3\uD83C\uDDF1",
    Uruguay: "\uD83C\uDDFA\uD83C\uDDFE",
    Croacia: "\uD83C\uDDED\uD83C\uDDF7",
    Colombia: "\uD83C\uDDE8\uD83C\uDDF4",
    Japon: "\uD83C\uDDEF\uD83C\uDDF5",
    Mexico: "\uD83C\uDDF2\uD83C\uDDFD",
    Belgica: "\uD83C\uDDE7\uD83C\uDDEA",
    Chile: "\uD83C\uDDE8\uD83C\uDDF1",
    Ghana: "\uD83C\uDDEC\uD83C\uDDED",
    CostaRica: "\uD83C\uDDE8\uD83C\uDDF7",
  };
  return flags[nationality] ?? "\uD83C\uDF0D";
}

const wc = (id: string, name: string, aliases: string[], nationality: string, flag: string, position: WorldCupPosition, worldCups: number[], mainWorldCup: number, iconicLevel: WorldCupIconicLevel, club?: string, age?: number): WorldCupPlayer => ({
  id,
  name,
  aliases,
  nationality,
  flag: flag || flagForNationality(nationality),
  position,
  worldCups,
  mainWorldCup,
  iconicLevel,
  categories: inferCategories(id, position, iconicLevel),
  worldCupRole: inferRole(id),
  worldCupGoals: notableGoals[id],
  clubsByWorldCup: club ? [{ year: mainWorldCup, club, age }] : undefined,
});

export const worldCupPlayers: WorldCupPlayer[] = [
  wc("iker-casillas", "Iker Casillas", ["Casillas", "Iker"], "Espana", "", "Portero", [2002, 2006, 2010, 2014], 2010, "icono", "Real Madrid", 29),
  wc("sergio-ramos", "Sergio Ramos", ["Ramos"], "Espana", "", "Defensa", [2006, 2010, 2014, 2018], 2010, "icono", "Real Madrid", 24),
  wc("carles-puyol", "Carles Puyol", ["Puyol"], "Espana", "", "Defensa", [2002, 2006, 2010], 2010, "icono", "Barcelona", 32),
  wc("xavi", "Xavi Hernandez", ["Xavi"], "Espana", "", "Centrocampista", [2002, 2006, 2010, 2014], 2010, "icono", "Barcelona", 30),
  wc("andres-iniesta", "Andres Iniesta", ["Iniesta"], "Espana", "", "Centrocampista", [2006, 2010, 2014, 2018], 2010, "icono", "Barcelona", 26),
  wc("david-villa", "David Villa", ["Villa", "Guaje"], "Espana", "", "Delantero", [2006, 2010, 2014], 2010, "icono", "Valencia", 28),
  wc("fernando-torres", "Fernando Torres", ["Torres", "Nino"], "Espana", "", "Delantero", [2006, 2010, 2014], 2010, "legendario", "Liverpool", 26),
  wc("sergio-busquets", "Sergio Busquets", ["Busquets"], "Espana", "", "Centrocampista", [2010, 2014, 2018, 2022], 2010, "legendario", "Barcelona", 21),
  wc("xabi-alonso", "Xabi Alonso", ["Xabi Alonso"], "Espana", "", "Centrocampista", [2006, 2010, 2014], 2010, "legendario", "Real Madrid", 28),
  wc("gerard-pique", "Gerard Pique", ["Pique", "Pique"], "Espana", "", "Defensa", [2010, 2014, 2018], 2010, "legendario", "Barcelona", 23),
  wc("cesc-fabregas", "Cesc Fabregas", ["Cesc", "Fabregas", "Fabregas"], "Espana", "", "Centrocampista", [2006, 2010, 2014], 2010, "core", "Arsenal", 23),
  wc("david-silva", "David Silva", ["Silva"], "Espana", "", "Centrocampista", [2010, 2014, 2018], 2010, "legendario", "Valencia", 24),

  wc("lionel-messi", "Lionel Messi", ["Messi", "Leo Messi"], "Argentina", "", "Delantero", [2006, 2010, 2014, 2018, 2022], 2022, "icono", "PSG", 35),
  wc("sergio-aguero", "Sergio Aguero", ["Aguero", "Aguero", "Kun"], "Argentina", "", "Delantero", [2010, 2014, 2018], 2014, "legendario", "Manchester City", 26),
  wc("angel-di-maria", "Angel Di Maria", ["Di Maria", "Di Maria"], "Argentina", "", "Centrocampista", [2010, 2014, 2018, 2022], 2022, "legendario", "Juventus", 34),
  wc("javier-mascherano", "Javier Mascherano", ["Mascherano"], "Argentina", "", "Centrocampista", [2006, 2010, 2014, 2018], 2014, "legendario", "Barcelona", 30),
  wc("gonzalo-higuain", "Gonzalo Higuain", ["Higuain", "Higuain"], "Argentina", "", "Delantero", [2010, 2014, 2018], 2014, "core", "Napoli", 26),
  wc("dibu-martinez", "Dibu Martinez", ["Emiliano Martinez", "Dibu", "Martinez"], "Argentina", "", "Portero", [2022], 2022, "legendario", "Aston Villa", 30),
  wc("juan-roman-riquelme", "Juan Roman Riquelme", ["Riquelme"], "Argentina", "", "Centrocampista", [2006], 2006, "legendario", "Villarreal", 27),
  wc("carlos-tevez", "Carlos Tevez", ["Tevez", "Tevez"], "Argentina", "", "Delantero", [2006, 2010], 2010, "core", "Manchester City", 26),
  wc("hernan-crespo", "Hernan Crespo", ["Crespo"], "Argentina", "", "Delantero", [2002, 2006], 2006, "core", "Chelsea", 30),
  wc("pablo-aimar", "Pablo Aimar", ["Aimar"], "Argentina", "", "Centrocampista", [2002, 2006], 2002, "culto", "Valencia", 22),

  wc("ronaldo-nazario", "Ronaldo Nazario", ["Ronaldo", "Ronaldo Nazario", "Fenomeno"], "Brasil", "", "Delantero", [2002, 2006], 2002, "icono", "Inter", 25),
  wc("ronaldinho", "Ronaldinho", ["Ronaldinho"], "Brasil", "", "Centrocampista", [2002, 2006], 2002, "icono", "PSG", 22),
  wc("rivaldo", "Rivaldo", ["Rivaldo"], "Brasil", "", "Delantero", [2002], 2002, "legendario", "Barcelona", 30),
  wc("kaka", "Kaka", ["Kaka", "Kaka"], "Brasil", "", "Centrocampista", [2002, 2006, 2010], 2006, "legendario", "AC Milan", 24),
  wc("neymar", "Neymar", ["Neymar Jr", "Neymar"], "Brasil", "", "Delantero", [2014, 2018, 2022], 2014, "icono", "Barcelona", 22),
  wc("cafu", "Cafu", ["Cafu", "Cafu"], "Brasil", "", "Defensa", [2002, 2006], 2002, "legendario", "Roma", 32),
  wc("roberto-carlos", "Roberto Carlos", ["Roberto Carlos"], "Brasil", "", "Defensa", [2002, 2006], 2002, "legendario", "Real Madrid", 29),
  wc("adriano", "Adriano", ["Adriano"], "Brasil", "", "Delantero", [2006], 2006, "core", "Inter", 24),
  wc("dani-alves", "Dani Alves", ["Alves", "Dani Alves"], "Brasil", "", "Defensa", [2010, 2014, 2022], 2014, "legendario", "Barcelona", 31),
  wc("thiago-silva", "Thiago Silva", ["Thiago Silva"], "Brasil", "", "Defensa", [2010, 2014, 2018, 2022], 2014, "legendario", "PSG", 29),
  wc("julio-cesar", "Julio Cesar", ["Julio Cesar", "Julio Cesar"], "Brasil", "", "Portero", [2006, 2010, 2014], 2010, "core", "Inter", 30),

  wc("zinedine-zidane", "Zinedine Zidane", ["Zidane", "Zizou"], "Francia", "", "Centrocampista", [2002, 2006], 2006, "icono", "Real Madrid", 34),
  wc("thierry-henry", "Thierry Henry", ["Henry"], "Francia", "", "Delantero", [2002, 2006, 2010], 2006, "legendario", "Arsenal", 28),
  wc("kylian-mbappe", "Kylian Mbappe", ["Mbappe", "Mbappe"], "Francia", "", "Delantero", [2018, 2022], 2018, "icono", "PSG", 19),
  wc("antoine-griezmann", "Antoine Griezmann", ["Griezmann"], "Francia", "", "Delantero", [2014, 2018, 2022], 2018, "legendario", "Atletico de Madrid", 27),
  wc("karim-benzema", "Karim Benzema", ["Benzema"], "Francia", "", "Delantero", [2014], 2014, "legendario", "Real Madrid", 26),
  wc("paul-pogba", "Paul Pogba", ["Pogba"], "Francia", "", "Centrocampista", [2014, 2018], 2018, "legendario", "Manchester United", 25),
  wc("ngolo-kante", "N'Golo Kante", ["Kante", "Kante"], "Francia", "", "Centrocampista", [2018], 2018, "legendario", "Chelsea", 27),
  wc("patrick-vieira", "Patrick Vieira", ["Vieira"], "Francia", "", "Centrocampista", [2002, 2006], 2006, "core", "Juventus", 29),
  wc("franck-ribery", "Franck Ribery", ["Ribery", "Ribery"], "Francia", "", "Centrocampista", [2006, 2010, 2014], 2006, "core", "Marsella", 23),
  wc("lilian-thuram", "Lilian Thuram", ["Thuram"], "Francia", "", "Defensa", [2002, 2006], 2006, "legendario", "Juventus", 34),

  wc("miroslav-klose", "Miroslav Klose", ["Klose"], "Alemania", "", "Delantero", [2002, 2006, 2010, 2014], 2006, "icono", "Werder Bremen", 28),
  wc("thomas-muller", "Thomas Muller", ["Muller", "Muller"], "Alemania", "", "Delantero", [2010, 2014, 2018, 2022], 2014, "legendario", "Bayern", 24),
  wc("mesut-ozil", "Mesut Ozil", ["Ozil", "Ozil"], "Alemania", "", "Centrocampista", [2010, 2014, 2018], 2014, "legendario", "Arsenal", 25),
  wc("philipp-lahm", "Philipp Lahm", ["Lahm"], "Alemania", "", "Defensa", [2006, 2010, 2014], 2014, "legendario", "Bayern", 30),
  wc("manuel-neuer", "Manuel Neuer", ["Neuer"], "Alemania", "", "Portero", [2010, 2014, 2018, 2022], 2014, "icono", "Bayern", 28),
  wc("bastian-schweinsteiger", "Bastian Schweinsteiger", ["Schweinsteiger", "Bastian"], "Alemania", "", "Centrocampista", [2006, 2010, 2014], 2014, "legendario", "Bayern", 29),
  wc("michael-ballack", "Michael Ballack", ["Ballack"], "Alemania", "", "Centrocampista", [2002, 2006], 2006, "core", "Bayern", 29),
  wc("toni-kroos", "Toni Kroos", ["Kroos"], "Alemania", "", "Centrocampista", [2010, 2014, 2018], 2014, "legendario", "Real Madrid", 24),
  wc("mario-gotze", "Mario Gotze", ["Gotze", "Gotze"], "Alemania", "", "Centrocampista", [2014], 2014, "core", "Bayern", 22),
  wc("oliver-kahn", "Oliver Kahn", ["Kahn"], "Alemania", "", "Portero", [2002, 2006], 2002, "legendario", "Bayern", 33),

  wc("gianluigi-buffon", "Gianluigi Buffon", ["Buffon"], "Italia", "", "Portero", [2002, 2006, 2010, 2014], 2006, "icono", "Juventus", 28),
  wc("fabio-cannavaro", "Fabio Cannavaro", ["Cannavaro"], "Italia", "", "Defensa", [2002, 2006, 2010], 2006, "icono", "Juventus", 32),
  wc("andrea-pirlo", "Andrea Pirlo", ["Pirlo"], "Italia", "", "Centrocampista", [2002, 2006, 2010, 2014], 2006, "legendario", "AC Milan", 27),
  wc("francesco-totti", "Francesco Totti", ["Totti"], "Italia", "", "Delantero", [2002, 2006], 2006, "legendario", "Roma", 29),
  wc("alessandro-del-piero", "Alessandro Del Piero", ["Del Piero"], "Italia", "", "Delantero", [2002, 2006], 2006, "legendario", "Juventus", 31),
  wc("marco-materazzi", "Marco Materazzi", ["Materazzi"], "Italia", "", "Defensa", [2006], 2006, "core", "Inter", 32),
  wc("fabio-grosso", "Fabio Grosso", ["Grosso"], "Italia", "", "Defensa", [2006], 2006, "core", "Palermo", 28),

  wc("cristiano-ronaldo", "Cristiano Ronaldo", ["Cristiano", "Ronaldo", "CR7"], "Portugal", "", "Delantero", [2006, 2010, 2014, 2018, 2022], 2018, "icono", "Real Madrid", 33),
  wc("luis-figo", "Luis Figo", ["Figo"], "Portugal", "", "Centrocampista", [2002, 2006], 2006, "legendario", "Inter", 33),
  wc("deco", "Deco", ["Deco"], "Portugal", "", "Centrocampista", [2006, 2010], 2006, "core", "Barcelona", 28),
  wc("pepe", "Pepe", ["Pepe"], "Portugal", "", "Defensa", [2010, 2014, 2018, 2022], 2018, "legendario", "Besiktas", 35),
  wc("bruno-fernandes", "Bruno Fernandes", ["Bruno"], "Portugal", "", "Centrocampista", [2018, 2022], 2022, "core", "Manchester United", 28),

  wc("david-beckham", "David Beckham", ["Beckham"], "Inglaterra", "", "Centrocampista", [2002, 2006], 2002, "legendario", "Manchester United", 27),
  wc("wayne-rooney", "Wayne Rooney", ["Rooney"], "Inglaterra", "", "Delantero", [2006, 2010, 2014], 2006, "legendario", "Manchester United", 20),
  wc("steven-gerrard", "Steven Gerrard", ["Gerrard"], "Inglaterra", "", "Centrocampista", [2006, 2010, 2014], 2010, "core", "Liverpool", 30),
  wc("frank-lampard", "Frank Lampard", ["Lampard"], "Inglaterra", "", "Centrocampista", [2006, 2010, 2014], 2010, "core", "Chelsea", 32),
  wc("harry-kane", "Harry Kane", ["Kane"], "Inglaterra", "", "Delantero", [2018, 2022], 2018, "legendario", "Tottenham", 24),
  wc("michael-owen", "Michael Owen", ["Owen"], "Inglaterra", "", "Delantero", [2002, 2006], 2002, "core", "Liverpool", 22),

  wc("arjen-robben", "Arjen Robben", ["Robben"], "Holanda", "", "Delantero", [2006, 2010, 2014], 2014, "legendario", "Bayern", 30),
  wc("robin-van-persie", "Robin van Persie", ["Van Persie", "RVP"], "Holanda", "", "Delantero", [2006, 2010, 2014], 2014, "legendario", "Manchester United", 30),
  wc("wesley-sneijder", "Wesley Sneijder", ["Sneijder"], "Holanda", "", "Centrocampista", [2006, 2010, 2014], 2010, "legendario", "Inter", 26),
  wc("ruud-van-nistelrooy", "Ruud van Nistelrooy", ["Van Nistelrooy", "Ruud"], "Holanda", "", "Delantero", [2006], 2006, "core", "Real Madrid", 30),

  wc("diego-forlan", "Diego Forlan", ["Forlan", "Forlan"], "Uruguay", "", "Delantero", [2002, 2010, 2014], 2010, "legendario", "Atletico de Madrid", 31),
  wc("luis-suarez", "Luis Suarez", ["Suarez", "Suarez"], "Uruguay", "", "Delantero", [2010, 2014, 2018, 2022], 2010, "legendario", "Ajax", 23),
  wc("edinson-cavani", "Edinson Cavani", ["Cavani"], "Uruguay", "", "Delantero", [2010, 2014, 2018, 2022], 2010, "core", "Palermo", 23),
  wc("diego-godin", "Diego Godin", ["Godin", "Godin"], "Uruguay", "", "Defensa", [2010, 2014, 2018], 2014, "core", "Atletico de Madrid", 28),

  wc("luka-modric", "Luka Modric", ["Modric", "Modric"], "Croacia", "", "Centrocampista", [2006, 2014, 2018, 2022], 2018, "icono", "Real Madrid", 32),
  wc("james-rodriguez", "James Rodriguez", ["James", "James Rodriguez"], "Colombia", "", "Centrocampista", [2014, 2018], 2014, "legendario", "Monaco", 22),
  wc("keisuke-honda", "Keisuke Honda", ["Honda"], "Japon", "", "Centrocampista", [2010, 2014, 2018], 2010, "culto", "CSKA Moscu", 24),
  wc("rafa-marquez", "Rafa Marquez", ["Marquez", "Marquez"], "Mexico", "", "Defensa", [2002, 2006, 2010, 2014, 2018], 2010, "core", "Barcelona", 31),

  wc("raul-gonzalez", "Raul Gonzalez", ["Raul"], "Espana", "", "Delantero", [2002, 2006], 2002, "legendario", "Real Madrid", 25),
  wc("fernando-morientes", "Fernando Morientes", ["Morientes"], "Espana", "", "Delantero", [2002, 2006], 2002, "core", "Real Madrid", 26),
  wc("pedro-rodriguez", "Pedro Rodriguez", ["Pedro"], "Espana", "", "Delantero", [2010, 2014], 2010, "core", "Barcelona", 22),
  wc("jordi-alba", "Jordi Alba", ["Alba", "Jordi Alba"], "Espana", "", "Defensa", [2014, 2018, 2022], 2014, "core", "Barcelona", 25),
  wc("pepe-reina", "Pepe Reina", ["Reina"], "Espana", "", "Portero", [2006, 2010, 2014], 2010, "culto", "Liverpool", 27),
  wc("gabriel-batistuta", "Gabriel Batistuta", ["Batistuta", "Bati"], "Argentina", "", "Delantero", [2002], 2002, "legendario", "Roma", 33),
  wc("juan-sebastian-veron", "Juan Sebastian Veron", ["Veron"], "Argentina", "", "Centrocampista", [2002, 2010], 2002, "core", "Manchester United", 27),
  wc("sergio-romero", "Sergio Romero", ["Romero"], "Argentina", "", "Portero", [2010, 2014], 2014, "core", "Monaco", 27),
  wc("nicolas-otamendi", "Nicolas Otamendi", ["Otamendi"], "Argentina", "", "Defensa", [2010, 2018, 2022], 2022, "core", "Benfica", 34),
  wc("javier-zanetti", "Javier Zanetti", ["Zanetti"], "Argentina", "", "Defensa", [2002], 2002, "legendario", "Inter", 28),
  wc("marcelo", "Marcelo", ["Marcelo"], "Brasil", "", "Defensa", [2014, 2018], 2014, "legendario", "Real Madrid", 26),
  wc("maicon", "Maicon", ["Maicon"], "Brasil", "", "Defensa", [2010, 2014], 2010, "core", "Inter", 28),
  wc("david-luiz", "David Luiz", ["David Luiz"], "Brasil", "", "Defensa", [2014], 2014, "core", "Chelsea", 27),
  wc("oscar", "Oscar", ["Oscar"], "Brasil", "", "Centrocampista", [2014], 2014, "core", "Chelsea", 22),
  wc("fred-brasil", "Fred", ["Fred"], "Brasil", "", "Delantero", [2006, 2014], 2014, "culto", "Fluminense", 30),
  wc("hugo-lloris", "Hugo Lloris", ["Lloris"], "Francia", "", "Portero", [2010, 2014, 2018, 2022], 2018, "legendario", "Tottenham", 31),
  wc("raphael-varane", "Raphael Varane", ["Varane"], "Francia", "", "Defensa", [2014, 2018, 2022], 2018, "legendario", "Real Madrid", 25),
  wc("olivier-giroud", "Olivier Giroud", ["Giroud"], "Francia", "", "Delantero", [2014, 2018, 2022], 2018, "core", "Chelsea", 31),
  wc("david-trezeguet", "David Trezeguet", ["Trezeguet"], "Francia", "", "Delantero", [2002, 2006], 2006, "core", "Juventus", 28),
  wc("robert-pires", "Robert Pires", ["Pires"], "Francia", "", "Centrocampista", [2002], 2002, "core", "Arsenal", 28),
  wc("giorgio-chiellini", "Giorgio Chiellini", ["Chiellini"], "Italia", "", "Defensa", [2010, 2014], 2014, "legendario", "Juventus", 29),
  wc("alessandro-nesta", "Alessandro Nesta", ["Nesta"], "Italia", "", "Defensa", [2002, 2006], 2002, "legendario", "AC Milan", 26),
  wc("gennaro-gattuso", "Gennaro Gattuso", ["Gattuso"], "Italia", "", "Centrocampista", [2002, 2006, 2010], 2006, "core", "AC Milan", 28),
  wc("daniele-de-rossi", "Daniele De Rossi", ["De Rossi"], "Italia", "", "Centrocampista", [2006, 2010, 2014], 2006, "core", "Roma", 22),
  wc("luca-toni", "Luca Toni", ["Toni"], "Italia", "", "Delantero", [2006], 2006, "core", "Fiorentina", 29),
  wc("nani", "Nani", ["Nani"], "Portugal", "", "Delantero", [2014, 2018], 2014, "core", "Manchester United", 27),
  wc("ricardo-carvalho", "Ricardo Carvalho", ["Carvalho"], "Portugal", "", "Defensa", [2006, 2010], 2006, "core", "Chelsea", 28),
  wc("pauleta", "Pauleta", ["Pauleta"], "Portugal", "", "Delantero", [2002, 2006], 2006, "core", "PSG", 33),
  wc("rui-costa", "Rui Costa", ["Rui Costa"], "Portugal", "", "Centrocampista", [2002], 2002, "core", "AC Milan", 30),
  wc("rio-ferdinand", "Rio Ferdinand", ["Ferdinand"], "Inglaterra", "", "Defensa", [2002, 2006], 2006, "core", "Manchester United", 27),
  wc("john-terry", "John Terry", ["Terry"], "Inglaterra", "", "Defensa", [2006, 2010], 2006, "core", "Chelsea", 25),
  wc("ashley-cole", "Ashley Cole", ["Cole", "Ashley Cole"], "Inglaterra", "", "Defensa", [2002, 2006, 2010], 2006, "core", "Arsenal", 25),
  wc("joe-cole", "Joe Cole", ["Joe Cole"], "Inglaterra", "", "Centrocampista", [2002, 2006, 2010], 2006, "culto", "Chelsea", 24),
  wc("paul-scholes", "Paul Scholes", ["Scholes"], "Inglaterra", "", "Centrocampista", [2002], 2002, "legendario", "Manchester United", 27),
  wc("edwin-van-der-sar", "Edwin van der Sar", ["Van der Sar"], "Holanda", "", "Portero", [2006], 2006, "legendario", "Manchester United", 35),
  wc("rafael-van-der-vaart", "Rafael van der Vaart", ["Van der Vaart"], "Holanda", "", "Centrocampista", [2006, 2010], 2010, "core", "Real Madrid", 27),
  wc("dirk-kuyt", "Dirk Kuyt", ["Kuyt"], "Holanda", "", "Delantero", [2006, 2010, 2014], 2010, "core", "Liverpool", 29),
  wc("mark-van-bommel", "Mark van Bommel", ["Van Bommel"], "Holanda", "", "Centrocampista", [2006, 2010], 2010, "core", "Bayern", 33),
  wc("giovanni-van-bronckhorst", "Giovanni van Bronckhorst", ["Van Bronckhorst", "Gio"], "Holanda", "", "Defensa", [2006, 2010], 2010, "core", "Feyenoord", 35),
  wc("fernando-muslera", "Fernando Muslera", ["Muslera"], "Uruguay", "", "Portero", [2010, 2014, 2018, 2022], 2010, "core", "Lazio", 24),
  wc("alvaro-recoba", "Alvaro Recoba", ["Recoba"], "Uruguay", "", "Delantero", [2002], 2002, "culto", "Inter", 26),
  wc("eden-hazard", "Eden Hazard", ["Hazard"], "Belgica", "", "Delantero", [2014, 2018, 2022], 2018, "legendario", "Chelsea", 27),
  wc("kevin-de-bruyne", "Kevin De Bruyne", ["De Bruyne", "KDB"], "Belgica", "", "Centrocampista", [2014, 2018, 2022], 2018, "legendario", "Manchester City", 27),
  wc("alexis-sanchez", "Alexis Sanchez", ["Alexis"], "Chile", "", "Delantero", [2010, 2014], 2014, "core", "Barcelona", 25),
  wc("arturo-vidal", "Arturo Vidal", ["Vidal"], "Chile", "", "Centrocampista", [2010, 2014], 2014, "core", "Juventus", 27),
  wc("asamoah-gyan", "Asamoah Gyan", ["Gyan"], "Ghana", "", "Delantero", [2006, 2010, 2014], 2010, "culto", "Rennes", 24),
  wc("keylor-navas", "Keylor Navas", ["Keylor", "Navas"], "CostaRica", "", "Portero", [2014, 2018, 2022], 2014, "legendario", "Levante", 27),
  wc("dida", "Dida", ["Dida"], "Brasil", "", "Portero", [2002, 2006], 2002, "core", "Corinthians", 28),
  wc("guillermo-ochoa", "Guillermo Ochoa", ["Ochoa", "Memo Ochoa"], "Mexico", "", "Portero", [2006, 2010, 2014, 2018, 2022], 2014, "core", "Ajaccio", 28),
  wc("thibaut-courtois", "Thibaut Courtois", ["Courtois"], "Belgica", "", "Portero", [2014, 2018, 2022], 2018, "legendario", "Chelsea", 26),
  wc("petr-cech", "Petr Cech", ["Cech"], "Republica Checa", "", "Portero", [2006], 2006, "core", "Chelsea", 24),
  wc("didier-drogba", "Didier Drogba", ["Drogba"], "Costa de Marfil", "", "Delantero", [2006, 2010, 2014], 2010, "legendario", "Chelsea", 32),
  wc("samuel-etoo", "Samuel Eto'o", ["Etoo", "Eto'o"], "Camerun", "", "Delantero", [2002, 2010, 2014], 2010, "legendario", "Inter", 29),
  wc("yaya-toure", "Yaya Toure", ["Yaya", "Toure"], "Costa de Marfil", "", "Centrocampista", [2006, 2010, 2014], 2010, "core", "Barcelona", 27),
  wc("zlatan-ibrahimovic", "Zlatan Ibrahimovic", ["Zlatan", "Ibrahimovic"], "Suecia", "", "Delantero", [2002, 2006], 2006, "legendario", "Juventus", 24),
  wc("andriy-shevchenko", "Andriy Shevchenko", ["Shevchenko"], "Ucrania", "", "Delantero", [2006], 2006, "legendario", "AC Milan", 29),
  wc("robert-lewandowski", "Robert Lewandowski", ["Lewandowski"], "Polonia", "", "Delantero", [2018, 2022], 2022, "legendario", "Barcelona", 34),
  wc("ivan-rakitic", "Ivan Rakitic", ["Rakitic"], "Croacia", "", "Centrocampista", [2014, 2018], 2018, "core", "Barcelona", 30),
  wc("mario-mandzukic", "Mario Mandzukic", ["Mandzukic"], "Croacia", "", "Delantero", [2014, 2018], 2018, "core", "Juventus", 32),
  wc("ivan-perisic", "Ivan Perisic", ["Perisic"], "Croacia", "", "Centrocampista", [2014, 2018, 2022], 2018, "core", "Inter", 29),
  wc("son-heung-min", "Son Heung-min", ["Son"], "Corea del Sur", "", "Delantero", [2014, 2018, 2022], 2018, "legendario", "Tottenham", 25),
  wc("park-ji-sung", "Park Ji-sung", ["Park"], "Corea del Sur", "", "Centrocampista", [2002, 2006, 2010], 2002, "core", "PSV", 21),
  wc("tim-cahill", "Tim Cahill", ["Cahill"], "Australia", "", "Delantero", [2006, 2010, 2014, 2018], 2006, "culto", "Everton", 26),
  wc("clint-dempsey", "Clint Dempsey", ["Dempsey"], "Estados Unidos", "", "Delantero", [2006, 2010, 2014], 2010, "culto", "Fulham", 27),
  wc("yassine-bounou", "Yassine Bounou", ["Bono", "Bounou"], "Marruecos", "", "Portero", [2018, 2022], 2022, "core", "Sevilla", 31),
  wc("achraf-hakimi", "Achraf Hakimi", ["Hakimi"], "Marruecos", "", "Defensa", [2018, 2022], 2022, "core", "PSG", 24),
  wc("hakim-ziyech", "Hakim Ziyech", ["Ziyech"], "Marruecos", "", "Centrocampista", [2018, 2022], 2022, "core", "Chelsea", 29),
  wc("luis-enrique", "Luis Enrique", ["Luis Enrique"], "Espana", "", "Centrocampista", [2002], 2002, "core", "Barcelona", 32),
  wc("fernando-hierro", "Fernando Hierro", ["Hierro"], "Espana", "", "Defensa", [2002], 2002, "legendario", "Real Madrid", 34),
];
