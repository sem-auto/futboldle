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
  wc("iker-casillas", "Iker Casillas", ["Casillas", "Iker"], "España", "🇪🇸", "Portero", [2002, 2006, 2010, 2014], 2010, "icono", "Real Madrid", 29),
  wc("sergio-ramos", "Sergio Ramos", ["Ramos"], "España", "🇪🇸", "Defensa", [2006, 2010, 2014, 2018], 2010, "icono", "Real Madrid", 24),
  wc("carles-puyol", "Carles Puyol", ["Puyol"], "España", "🇪🇸", "Defensa", [2002, 2006, 2010], 2010, "icono", "Barcelona", 32),
  wc("xavi", "Xavi Hernández", ["Xavi"], "España", "🇪🇸", "Centrocampista", [2002, 2006, 2010, 2014], 2010, "icono", "Barcelona", 30),
  wc("andres-iniesta", "Andrés Iniesta", ["Iniesta"], "España", "🇪🇸", "Centrocampista", [2006, 2010, 2014, 2018], 2010, "icono", "Barcelona", 26),
  wc("david-villa", "David Villa", ["Villa", "Guaje"], "España", "🇪🇸", "Delantero", [2006, 2010, 2014], 2010, "icono", "Valencia", 28),
  wc("fernando-torres", "Fernando Torres", ["Torres", "Niño"], "España", "🇪🇸", "Delantero", [2006, 2010, 2014], 2010, "legendario", "Liverpool", 26),
  wc("sergio-busquets", "Sergio Busquets", ["Busquets"], "España", "🇪🇸", "Centrocampista", [2010, 2014, 2018, 2022], 2010, "legendario", "Barcelona", 21),
  wc("xabi-alonso", "Xabi Alonso", ["Xabi Alonso"], "España", "🇪🇸", "Centrocampista", [2006, 2010, 2014], 2010, "legendario", "Real Madrid", 28),
  wc("gerard-pique", "Gerard Piqué", ["Piqué", "Pique"], "España", "🇪🇸", "Defensa", [2010, 2014, 2018], 2010, "legendario", "Barcelona", 23),
  wc("cesc-fabregas", "Cesc Fàbregas", ["Cesc", "Fàbregas", "Fabregas"], "España", "🇪🇸", "Centrocampista", [2006, 2010, 2014], 2010, "core", "Arsenal", 23),
  wc("david-silva", "David Silva", ["Silva"], "España", "🇪🇸", "Centrocampista", [2010, 2014, 2018], 2010, "legendario", "Valencia", 24),

  wc("lionel-messi", "Lionel Messi", ["Messi", "Leo Messi"], "Argentina", "🇦🇷", "Delantero", [2006, 2010, 2014, 2018, 2022], 2022, "icono", "PSG", 35),
  wc("sergio-aguero", "Sergio Agüero", ["Agüero", "Aguero", "Kun"], "Argentina", "🇦🇷", "Delantero", [2010, 2014, 2018], 2014, "legendario", "Manchester City", 26),
  wc("angel-di-maria", "Ángel Di María", ["Di María", "Di Maria"], "Argentina", "🇦🇷", "Centrocampista", [2010, 2014, 2018, 2022], 2022, "legendario", "Juventus", 34),
  wc("javier-mascherano", "Javier Mascherano", ["Mascherano"], "Argentina", "🇦🇷", "Centrocampista", [2006, 2010, 2014, 2018], 2014, "legendario", "Barcelona", 30),
  wc("gonzalo-higuain", "Gonzalo Higuaín", ["Higuaín", "Higuain"], "Argentina", "🇦🇷", "Delantero", [2010, 2014, 2018], 2014, "core", "Napoli", 26),
  wc("dibu-martinez", "Dibu Martínez", ["Emiliano Martínez", "Dibu", "Martínez"], "Argentina", "🇦🇷", "Portero", [2022], 2022, "legendario", "Aston Villa", 30),
  wc("juan-roman-riquelme", "Juan Román Riquelme", ["Riquelme"], "Argentina", "🇦🇷", "Centrocampista", [2006], 2006, "legendario", "Villarreal", 27),
  wc("carlos-tevez", "Carlos Tévez", ["Tévez", "Tevez"], "Argentina", "🇦🇷", "Delantero", [2006, 2010], 2010, "core", "Manchester City", 26),
  wc("hernan-crespo", "Hernán Crespo", ["Crespo"], "Argentina", "🇦🇷", "Delantero", [2002, 2006], 2006, "core", "Chelsea", 30),
  wc("pablo-aimar", "Pablo Aimar", ["Aimar"], "Argentina", "🇦🇷", "Centrocampista", [2002, 2006], 2002, "culto", "Valencia", 22),

  wc("ronaldo-nazario", "Ronaldo Nazário", ["Ronaldo", "Ronaldo Nazario", "Fenómeno"], "Brasil", "🇧🇷", "Delantero", [2002, 2006], 2002, "icono", "Inter", 25),
  wc("ronaldinho", "Ronaldinho", ["Ronaldinho"], "Brasil", "🇧🇷", "Centrocampista", [2002, 2006], 2002, "icono", "PSG", 22),
  wc("rivaldo", "Rivaldo", ["Rivaldo"], "Brasil", "🇧🇷", "Delantero", [2002], 2002, "legendario", "Barcelona", 30),
  wc("kaka", "Kaká", ["Kaka", "Kaká"], "Brasil", "🇧🇷", "Centrocampista", [2002, 2006, 2010], 2006, "legendario", "AC Milan", 24),
  wc("neymar", "Neymar", ["Neymar Jr", "Neymar"], "Brasil", "🇧🇷", "Delantero", [2014, 2018, 2022], 2014, "icono", "Barcelona", 22),
  wc("cafu", "Cafú", ["Cafu", "Cafú"], "Brasil", "🇧🇷", "Defensa", [2002, 2006], 2002, "legendario", "Roma", 32),
  wc("roberto-carlos", "Roberto Carlos", ["Roberto Carlos"], "Brasil", "🇧🇷", "Defensa", [2002, 2006], 2002, "legendario", "Real Madrid", 29),
  wc("adriano", "Adriano", ["Adriano"], "Brasil", "🇧🇷", "Delantero", [2006], 2006, "core", "Inter", 24),
  wc("dani-alves", "Dani Alves", ["Alves", "Dani Alves"], "Brasil", "🇧🇷", "Defensa", [2010, 2014, 2022], 2014, "legendario", "Barcelona", 31),
  wc("thiago-silva", "Thiago Silva", ["Thiago Silva"], "Brasil", "🇧🇷", "Defensa", [2010, 2014, 2018, 2022], 2014, "legendario", "PSG", 29),
  wc("julio-cesar", "Júlio César", ["Julio Cesar", "Júlio César"], "Brasil", "🇧🇷", "Portero", [2006, 2010, 2014], 2010, "core", "Inter", 30),
  wc("zinedine-zidane", "Zinedine Zidane", ["Zidane", "Zizou"], "Francia", "🇫🇷", "Centrocampista", [2002, 2006], 2006, "icono", "Real Madrid", 34),
  wc("thierry-henry", "Thierry Henry", ["Henry"], "Francia", "🇫🇷", "Delantero", [2002, 2006, 2010], 2006, "legendario", "Arsenal", 28),
  wc("kylian-mbappe", "Kylian Mbappé", ["Mbappé", "Mbappe"], "Francia", "🇫🇷", "Delantero", [2018, 2022], 2018, "icono", "PSG", 19),
  wc("antoine-griezmann", "Antoine Griezmann", ["Griezmann"], "Francia", "🇫🇷", "Delantero", [2014, 2018, 2022], 2018, "legendario", "Atlético de Madrid", 27),
  wc("karim-benzema", "Karim Benzema", ["Benzema"], "Francia", "🇫🇷", "Delantero", [2014], 2014, "legendario", "Real Madrid", 26),
  wc("paul-pogba", "Paul Pogba", ["Pogba"], "Francia", "🇫🇷", "Centrocampista", [2014, 2018], 2018, "legendario", "Manchester United", 25),
  wc("ngolo-kante", "N'Golo Kanté", ["Kanté", "Kante"], "Francia", "🇫🇷", "Centrocampista", [2018], 2018, "legendario", "Chelsea", 27),
  wc("patrick-vieira", "Patrick Vieira", ["Vieira"], "Francia", "🇫🇷", "Centrocampista", [2002, 2006], 2006, "core", "Juventus", 29),
  wc("franck-ribery", "Franck Ribéry", ["Ribéry", "Ribery"], "Francia", "🇫🇷", "Centrocampista", [2006, 2010, 2014], 2006, "core", "Marsella", 23),
  wc("lilian-thuram", "Lilian Thuram", ["Thuram"], "Francia", "🇫🇷", "Defensa", [2002, 2006], 2006, "legendario", "Juventus", 34),

  wc("miroslav-klose", "Miroslav Klose", ["Klose"], "Alemania", "🇩🇪", "Delantero", [2002, 2006, 2010, 2014], 2014, "icono", "Lazio", 36),
  wc("thomas-muller", "Thomas Müller", ["Müller", "Muller"], "Alemania", "🇩🇪", "Delantero", [2010, 2014, 2018, 2022], 2010, "legendario", "Bayern", 20),
  wc("mesut-ozil", "Mesut Özil", ["Özil", "Ozil"], "Alemania", "🇩🇪", "Centrocampista", [2010, 2014, 2018], 2010, "legendario", "Werder Bremen", 21),
  wc("philipp-lahm", "Philipp Lahm", ["Lahm"], "Alemania", "🇩🇪", "Defensa", [2006, 2010, 2014], 2014, "legendario", "Bayern", 30),
  wc("manuel-neuer", "Manuel Neuer", ["Neuer"], "Alemania", "🇩🇪", "Portero", [2010, 2014, 2018, 2022], 2014, "icono", "Bayern", 28),
  wc("bastian-schweinsteiger", "Bastian Schweinsteiger", ["Schweinsteiger"], "Alemania", "🇩🇪", "Centrocampista", [2006, 2010, 2014], 2014, "legendario", "Bayern", 29),
  wc("michael-ballack", "Michael Ballack", ["Ballack"], "Alemania", "🇩🇪", "Centrocampista", [2002, 2006], 2002, "core", "Bayer Leverkusen", 25),
  wc("toni-kroos", "Toni Kroos", ["Kroos"], "Alemania", "🇩🇪", "Centrocampista", [2010, 2014, 2018], 2014, "legendario", "Bayern", 24),
  wc("sami-khedira", "Sami Khedira", ["Khedira"], "Alemania", "🇩🇪", "Centrocampista", [2010, 2014, 2018], 2014, "core", "Real Madrid", 27),
  wc("mario-gotze", "Mario Götze", ["Götze", "Gotze"], "Alemania", "🇩🇪", "Centrocampista", [2014, 2022], 2014, "core", "Bayern", 22),

  wc("gianluigi-buffon", "Gianluigi Buffon", ["Buffon"], "Italia", "🇮🇹", "Portero", [2002, 2006, 2010, 2014], 2006, "icono", "Juventus", 28),
  wc("fabio-cannavaro", "Fabio Cannavaro", ["Cannavaro"], "Italia", "🇮🇹", "Defensa", [2002, 2006, 2010], 2006, "icono", "Juventus", 32),
  wc("andrea-pirlo", "Andrea Pirlo", ["Pirlo"], "Italia", "🇮🇹", "Centrocampista", [2006, 2010, 2014], 2006, "legendario", "AC Milan", 27),
  wc("francesco-totti", "Francesco Totti", ["Totti"], "Italia", "🇮🇹", "Delantero", [2002, 2006], 2006, "legendario", "Roma", 29),
  wc("alessandro-del-piero", "Alessandro Del Piero", ["Del Piero"], "Italia", "🇮🇹", "Delantero", [2002, 2006], 2006, "legendario", "Juventus", 31),
  wc("marco-materazzi", "Marco Materazzi", ["Materazzi"], "Italia", "🇮🇹", "Defensa", [2006], 2006, "culto", "Inter", 32),
  wc("fabio-grosso", "Fabio Grosso", ["Grosso"], "Italia", "🇮🇹", "Defensa", [2006], 2006, "culto", "Palermo", 28),
  wc("gennaro-gattuso", "Gennaro Gattuso", ["Gattuso"], "Italia", "🇮🇹", "Centrocampista", [2002, 2006, 2010], 2006, "core", "AC Milan", 28),
  wc("giorgio-chiellini", "Giorgio Chiellini", ["Chiellini"], "Italia", "🇮🇹", "Defensa", [2010, 2014], 2014, "core", "Juventus", 29),
  wc("luca-toni", "Luca Toni", ["Toni", "Luca Toni"], "Italia", "🇮🇹", "Delantero", [2006], 2006, "core", "Fiorentina", 29),

  wc("cristiano-ronaldo", "Cristiano Ronaldo", ["Cristiano", "CR7", "Ronaldo"], "Portugal", "🇵🇹", "Delantero", [2006, 2010, 2014, 2018, 2022], 2018, "icono", "Real Madrid", 33),
  wc("luis-figo", "Luis Figo", ["Figo"], "Portugal", "🇵🇹", "Centrocampista", [2002, 2006], 2006, "legendario", "Inter", 33),
  wc("deco", "Deco", ["Deco"], "Portugal", "🇵🇹", "Centrocampista", [2006, 2010], 2006, "core", "Barcelona", 28),
  wc("pepe", "Pepe", ["Pepe"], "Portugal", "🇵🇹", "Defensa", [2010, 2014, 2018, 2022], 2018, "legendario", "Besiktas", 35),
  wc("bruno-fernandes", "Bruno Fernandes", ["Bruno Fernandes"], "Portugal", "🇵🇹", "Centrocampista", [2018, 2022], 2022, "core", "Manchester United", 28),
  wc("ricardo-carvalho", "Ricardo Carvalho", ["Carvalho"], "Portugal", "🇵🇹", "Defensa", [2006, 2010], 2006, "core", "Chelsea", 28),
  wc("nani", "Nani", ["Nani"], "Portugal", "🇵🇹", "Centrocampista", [2010, 2014], 2010, "core", "Manchester United", 23),
  wc("joao-felix", "João Félix", ["Joao Felix", "João Félix"], "Portugal", "🇵🇹", "Delantero", [2022], 2022, "core", "Atlético de Madrid", 23),

  wc("david-beckham", "David Beckham", ["Beckham"], "Inglaterra", "🏴", "Centrocampista", [2002, 2006], 2002, "legendario", "Manchester United", 27),
  wc("wayne-rooney", "Wayne Rooney", ["Rooney"], "Inglaterra", "🏴", "Delantero", [2006, 2010, 2014], 2006, "legendario", "Manchester United", 20),
  wc("steven-gerrard", "Steven Gerrard", ["Gerrard"], "Inglaterra", "🏴", "Centrocampista", [2006, 2010, 2014], 2006, "legendario", "Liverpool", 26),
  wc("frank-lampard", "Frank Lampard", ["Lampard"], "Inglaterra", "🏴", "Centrocampista", [2006, 2010, 2014], 2006, "legendario", "Chelsea", 28),
  wc("harry-kane", "Harry Kane", ["Kane"], "Inglaterra", "🏴", "Delantero", [2018, 2022], 2018, "legendario", "Tottenham", 24),
  wc("michael-owen", "Michael Owen", ["Owen"], "Inglaterra", "🏴", "Delantero", [2002, 2006], 2002, "core", "Liverpool", 22),
  wc("rio-ferdinand", "Rio Ferdinand", ["Ferdinand"], "Inglaterra", "🏴", "Defensa", [2002, 2006], 2006, "core", "Manchester United", 27),
  wc("john-terry", "John Terry", ["Terry"], "Inglaterra", "🏴", "Defensa", [2006, 2010], 2006, "core", "Chelsea", 25),

  wc("arjen-robben", "Arjen Robben", ["Robben"], "Holanda", "🇳🇱", "Delantero", [2006, 2010, 2014], 2010, "legendario", "Bayern", 26),
  wc("robin-van-persie", "Robin van Persie", ["Van Persie", "Robin Van Persie"], "Holanda", "🇳🇱", "Delantero", [2006, 2010, 2014], 2014, "legendario", "Manchester United", 30),
  wc("wesley-sneijder", "Wesley Sneijder", ["Sneijder"], "Holanda", "🇳🇱", "Centrocampista", [2006, 2010, 2014], 2010, "legendario", "Inter", 26),
  wc("ruud-van-nistelrooy", "Ruud van Nistelrooy", ["Van Nistelrooy", "Ruud Van Nistelrooy"], "Holanda", "🇳🇱", "Delantero", [2006], 2006, "core", "Manchester United", 29),
  wc("dirk-kuyt", "Dirk Kuyt", ["Kuyt"], "Holanda", "🇳🇱", "Delantero", [2006, 2010, 2014], 2010, "core", "Liverpool", 29),
  wc("rafael-van-der-vaart", "Rafael van der Vaart", ["Van der Vaart"], "Holanda", "🇳🇱", "Centrocampista", [2006, 2010], 2010, "core", "Real Madrid", 27),

  wc("diego-forlan", "Diego Forlán", ["Forlán", "Forlan"], "Uruguay", "🇺🇾", "Delantero", [2002, 2010, 2014], 2010, "legendario", "Atlético de Madrid", 31),
  wc("luis-suarez", "Luis Suárez", ["Suárez", "Suarez"], "Uruguay", "🇺🇾", "Delantero", [2010, 2014, 2018, 2022], 2010, "legendario", "Ajax", 23),
  wc("edinson-cavani", "Edinson Cavani", ["Cavani"], "Uruguay", "🇺🇾", "Delantero", [2010, 2014, 2018, 2022], 2018, "core", "PSG", 31),
  wc("diego-godin", "Diego Godín", ["Godín", "Godin"], "Uruguay", "🇺🇾", "Defensa", [2010, 2014, 2018, 2022], 2014, "core", "Atlético de Madrid", 28),
  wc("federico-valverde", "Federico Valverde", ["Valverde", "Fede Valverde"], "Uruguay", "🇺🇾", "Centrocampista", [2022], 2022, "core", "Real Madrid", 24),

  wc("luka-modric", "Luka Modrić", ["Modrić", "Modric"], "Croacia", "🇭🇷", "Centrocampista", [2006, 2014, 2018, 2022], 2018, "legendario", "Real Madrid", 32),
  wc("ivan-rakitic", "Ivan Rakitić", ["Rakitić", "Rakitic"], "Croacia", "🇭🇷", "Centrocampista", [2014, 2018], 2018, "core", "Barcelona", 30),
  wc("eden-hazard", "Eden Hazard", ["Hazard"], "Bélgica", "🇧🇪", "Delantero", [2014, 2018, 2022], 2018, "legendario", "Chelsea", 27),
  wc("kevin-de-bruyne", "Kevin De Bruyne", ["De Bruyne"], "Bélgica", "🇧🇪", "Centrocampista", [2014, 2018, 2022], 2018, "legendario", "Manchester City", 27),
  wc("romelu-lukaku", "Romelu Lukaku", ["Lukaku"], "Bélgica", "🇧🇪", "Delantero", [2014, 2018, 2022], 2018, "core", "Manchester United", 25),
  wc("didier-drogba", "Didier Drogba", ["Drogba"], "Costa de Marfil", "🇨🇮", "Delantero", [2006, 2010, 2014], 2010, "legendario", "Chelsea", 32),
  wc("samuel-etoo", "Samuel Eto'o", ["Eto'o", "Etoo"], "Camerún", "🇨🇲", "Delantero", [2002, 2010, 2014], 2010, "legendario", "Inter", 29),
  wc("yaya-toure", "Yaya Touré", ["Yaya Toure", "Touré"], "Costa de Marfil", "🇨🇮", "Centrocampista", [2006, 2010, 2014], 2010, "core", "Barcelona", 27),
  wc("park-ji-sung", "Park Ji-sung", ["Park", "Park Ji Sung"], "Corea del Sur", "🇰🇷", "Centrocampista", [2002, 2006, 2010], 2002, "core", "PSV", 21),
  wc("son-heung-min", "Son Heung-min", ["Son", "Heung-min Son"], "Corea del Sur", "🇰🇷", "Delantero", [2014, 2018, 2022], 2022, "core", "Tottenham", 30),
  wc("keisuke-honda", "Keisuke Honda", ["Honda"], "Japón", "🇯🇵", "Centrocampista", [2010, 2014, 2018], 2010, "core", "CSKA Moscú", 24),
  wc("tim-cahill", "Tim Cahill", ["Cahill"], "Australia", "🇦🇺", "Centrocampista", [2006, 2010, 2014, 2018], 2006, "core", "Everton", 26),
];

export function findWorldCupPlayer(playerId: string) {
  return worldCupPlayers.find(player => player.id === playerId);
}
