export type WorldCupPosition = "Portero" | "Defensa" | "Centrocampista" | "Delantero";
export type WorldCupIconicLevel = "icono" | "legendario" | "core" | "culto";

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
  clubsByWorldCup?: {
    year: number;
    club: string;
    age?: number;
  }[];
};

const wc = (id: string, name: string, aliases: string[], nationality: string, flag: string, position: WorldCupPosition, worldCups: number[], mainWorldCup: number, iconicLevel: WorldCupIconicLevel, club?: string, age?: number): WorldCupPlayer => ({
  id,
  name,
  aliases,
  nationality,
  flag,
  position,
  worldCups,
  mainWorldCup,
  iconicLevel,
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
];
