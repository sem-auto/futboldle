import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const BBVA_SOURCE = "C:/Users/mario/.codex/attachments/3447878f-95eb-4357-b811-554c984d4955/pasted-text.txt";
const WC_SOURCE = "C:/Users/mario/.codex/attachments/c5e03aa1-889f-4a5d-9dc6-0c7de8282f14/pasted-text.txt";

const generatedBBVAPlayersPath = path.join(root, "src/data/generatedBBVAPlayers.ts");
const generatedBBVATopsPath = path.join(root, "src/data/generatedBBVATop10.ts");
const generatedWCTopsPath = path.join(root, "src/data/worldcups/generatedTop10.ts");
const generatedWCPlayersPath = path.join(root, "src/data/worldcups/generatedPlayers.ts");

function fixMojibake(input) {
  let value = input;
  const chunk = /(?:[\u00c2\u00c3\u00c4\u00e2\u00f0][\u0080-\u00bf\u00c0-\u00ff]{1,4})+/g;
  for (let i = 0; i < 4; i++) {
    const next = value.replace(chunk, match => Buffer.from(match, "latin1").toString("utf8"));
    if (next === value) break;
    value = next;
  }
  return value
    .replace(/\uFFFD/g, "")
    .replace(/Â·/g, "·")
    .replace(/â/g, "-")
    .replace(/â/g, "-")
    .replace(/â€™/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€¦/g, "...")
    .replace(/Ä‡/g, "ć")
    .replace(/Å¡/g, "š")
    .replace(/Å¾/g, "ž")
    .replace(/Å/g, "ł");
}

function readText(file) {
  return fixMojibake(fs.readFileSync(file, "utf8"));
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " y ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function answerKey(name) {
  const parts = name.replace(/\([^)]*\)/g, "").trim().split(/\s+/);
  const last = parts[parts.length - 1] || name;
  return last
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
}

function norm(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
}

function esc(value) {
  return JSON.stringify(value);
}

function parseExistingBBVAPlayers() {
  const raw = fixMojibake(fs.readFileSync(path.join(root, "src/data/bbvaPlayers.ts"), "utf8"));
  const players = [];
  const objectRegex = /\{\s*id:\s*(\d+),[\s\S]*?answer:\s*"([^"]+)"[\s\S]*?fullName:\s*"([^"]+)"[\s\S]*?displayName:\s*"([^"]+)"[\s\S]*?mainClub:\s*"([^"]+)"[\s\S]*?nationality:\s*"([^"]+)"[\s\S]*?position:\s*"([^"]+)"/g;
  let match;
  while ((match = objectRegex.exec(raw))) {
    players.push({
      id: Number(match[1]),
      answer: match[2],
      fullName: match[3],
      displayName: match[4],
      mainClub: match[5],
      nationality: match[6],
      position: match[7],
    });
  }
  return players;
}

function parseExistingWorldCupPlayers() {
  const raw = fixMojibake(fs.readFileSync(path.join(root, "src/data/worldcups/players.ts"), "utf8"));
  const ids = new Set([...raw.matchAll(/wc\("([^"]+)"/g)].map(match => match[1]));
  const names = new Map();
  for (const match of raw.matchAll(/wc\("([^"]+)",\s*"([^"]+)",\s*\[([^\]]*)\],\s*"([^"]+)",\s*"[^"]*",\s*"([^"]+)"/g)) {
    names.set(norm(match[2]), { id: match[1], name: match[2], nationality: match[4], position: match[5] });
  }
  return { ids, names };
}

function findBBVAPlayer(players, name) {
  const normalized = norm(name);
  return players.find(player =>
    norm(player.displayName) === normalized ||
    norm(player.fullName) === normalized ||
    norm(player.answer) === normalized ||
    normalized.endsWith(norm(player.displayName)) ||
    norm(player.fullName).endsWith(normalized)
  );
}

function inferPosition(name, category) {
  const key = norm(name);
  if (category === "PORTEROS" || /VALDES|CASILLAS|PALOP|BRAVO|KAMENI|COURTOIS|NAVAS|ALVES|LOPEZ|IRAIZOZ|CABALLERO|OBLAK|RULLI|MOYA|GUAITA|PINTO|CAÑIZARES|CANIZARES|FRANCO|AOUATE|ASENJO|RICARDO|ROBERTO|BETO|RICO|AREOLA|ABBONDANZIERI|HILDEBRAND|MOLINA|PRATS|FABRICIO|TOÑO|TONO|MUNUA|COLINAS/.test(key)) return "Portero";
  if (/RAMOS|PIQUE|ALVES|ALBA|CAPDEVILA|MATHIEU|MARCHENA|NAVARRO|ADRIANO|ESCUDÉ|ESCUDE|FAZIO|COKE|ALBELDA|JUANFRAN|IRAOLA|MARCELO|FILIPE|MIRANDA|GODIN|VARANE|DEULOFEU/.test(key)) return "Defensa";
  if (category === "ASISTENCIAS" || /XAVI|INIESTA|OZIL|KOKE|NAVAS|MATA|PRIETO|SUSAETA|GABI|BANEGA|CAZORLA|VALERO|GUTI|RIQUELME|BECKHAM|ALONSO|ISCO|KROOS|JAMES|DIAZ|EMANA|D'ALESSANDRO|IBAGAZA|VERDU|PAREJO/.test(key)) return "Centrocampista";
  return "Delantero";
}

function inferNationality(name, player) {
  if (player?.nationality) return player.nationality;
  const spanish = /VILLA|TORRES|RAUL|TAMUDO|GUIZA|NEGREDO|LLORENTE|SOLDADO|ADURIZ|RUBEN|SERGIO|JOAQUIN|MATA|XAVI|INIESTA|CASILLAS|VALDES|PALOP|IRAIZOZ|CAÑIZARES|CANIZARES|GUTI|ALBELDA|MARCHENA|MUNIain|MUNIAIN|JUANMI|ALCACER|ALCÁCER|VARANE|DEULOFEU|MINA|PAREJO|CANI|DUDA|JAVI|APOÑO|APONO|BEÑAT|BENAT|PEDRO|SUSAETA|PRIETO|GABI|FUEGO|MATHIEU/.test(norm(name));
  if (spanish) return "España";
  return player?.nationality ?? "Por auditar";
}

function initials(name) {
  return name
    .split(/\s+/)
    .map(part => part[0] ? `${part[0]}${"_".repeat(Math.max(2, part.length - 1))}` : "")
    .join(" ");
}

function parseRankingItems(line) {
  const cleaned = line
    .replace(/\s+/g, " ")
    .replace(/^[^A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ]*(?=[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ])/u, "")
    .replace(/^(\D[^·]*?\(\d+[^)]*\))/, "1. $1");
  const items = [];
  const regex = /(?:^|[·])\s*(\d+)\.\s*([^(·]+?)\s*\(([^)]*)\)/g;
  let match;
  while ((match = regex.exec(cleaned))) {
    items.push({ position: Number(match[1]), name: match[2].trim(), rawValue: match[3].trim() });
  }
  return items.slice(0, 10);
}

function unitForCategory(category, title) {
  const t = `${category} ${title}`.toLowerCase();
  if (t.includes("asist")) return "asistencias";
  if (t.includes("porter") || t.includes("zamor")) return "porterías a cero";
  if (t.includes("partidos")) return "partidos";
  if (t.includes("penaltis")) return "penaltis";
  if (t.includes("falta")) return "goles de falta";
  if (t.includes("pichichi")) return "trofeos";
  return "goles";
}

function categoryFromTitle(title, currentSection = "") {
  const text = `${title} ${currentSection}`.toLowerCase();
  if (text.includes("asistent")) return "ASISTENCIAS";
  if (text.includes("porter") || text.includes("zamor")) return "PORTEROS";
  if (text.includes("partidos")) return "CLUBES";
  return "GOLEADORES";
}

function makeBBVAChallenge({ title, period, criterion, category, items, sourceName = "StatBunker" }, existingPlayers, generatedPlayers, knownNames) {
  const unit = unitForCategory(category, title);
  const answers = items.map(item => {
    const player = findBBVAPlayer(existingPlayers, item.name);
    const displayName = player?.displayName ?? item.name;
    const cleanValue = item.rawValue.replace(/[^\d]/g, "");
    const value = cleanValue ? Number(cleanValue) : undefined;
    const position = inferPosition(item.name, category);
    const nationality = inferNationality(item.name, player);
    if (!player && !knownNames.has(norm(item.name))) {
      const id = 10000 + generatedPlayers.length + 1;
      generatedPlayers.push({
        id,
        answer: answerKey(item.name),
        fullName: item.name,
        displayName: item.name,
        clubs: ["Liga BBVA"],
        mainClub: "Liga BBVA",
        nationality,
        position,
        years: "2005-2016",
        hint: "Jugador añadido desde rankings auditados de Futboldle.",
        category: "low",
      });
      knownNames.add(norm(item.name));
    }
    return {
      position: item.position,
      answer: player?.answer ?? answerKey(item.name),
      displayName,
      detail: `${item.rawValue} ${unit}`,
      value,
      label: `${item.rawValue} ${unit}`,
      hintNationality: nationality,
      hintPosition: player?.position ?? position,
      hintClub: player?.mainClub ?? "Liga BBVA",
      hintInitial: initials(displayName),
    };
  });

  if (answers.length < 7) return null;
  return {
    id: `audited-bbva-${slugify(title)}-${slugify(period)}`,
    kind: "MEDIO",
    category,
    topType: "TOP HISTÓRICO VERIFICADO",
    period,
    criterion,
    source: sourceName,
    sourceName,
    sourceUrl: "https://www.statbunker.com/",
    sourceNote: "Ranking importado desde auditoría proporcionada por el proyecto y limitado al periodo indicado.",
    top20Unlockable: false,
    title,
    subtitle: period,
    consigna: `Completa el Top10: ${title}.`,
    emoji: category === "PORTEROS" ? "🧤" : category === "ASISTENCIAS" ? "🎯" : "🏆",
    answers,
  };
}

function parseBBVA() {
  const text = readText(BBVA_SOURCE);
  const existingPlayers = parseExistingBBVAPlayers();
  const generatedPlayers = [];
  const knownNames = new Set(existingPlayers.flatMap(player => [norm(player.displayName), norm(player.fullName)]));
  const challenges = [];
  let section = "";
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/Goleadores por Temporada/i.test(line)) section = "goleadores-temporada";
    if (/Asistentes por Temporada/i.test(line)) section = "asistencias-temporada";
    if (/Porter[ií]as a Cero/i.test(line)) section = "porterias-temporada";

    const season = line.match(/^(\d{4}\/\d{2}):\s*(.+)$/);
    if (season && section) {
      const [period, list] = [season[1], season[2]];
      const category = categoryFromTitle("", section);
      const baseTitle = category === "GOLEADORES" ? "Top goleadores LaLiga" : category === "ASISTENCIAS" ? "Top asistencias LaLiga" : "Top porterías a cero LaLiga";
      const title = `${baseTitle} ${period}`;
      const criterion = category === "GOLEADORES" ? `Goles en LaLiga ${period}` : category === "ASISTENCIAS" ? `Asistencias en LaLiga ${period}` : `Porterías a cero en LaLiga ${period}`;
      const challenge = makeBBVAChallenge({ title, period, criterion, category, items: parseRankingItems(list) }, existingPlayers, generatedPlayers, knownNames);
      if (challenge) challenges.push(challenge);
      continue;
    }

    const numberedTitle = line.match(/^(\d+)\.\s*([^:]+)$/);
    if (numberedTitle && i + 1 < lines.length && /[·(]/.test(lines[i + 1])) {
      const titleText = numberedTitle[2].trim();
      const list = lines[i + 1];
      if (/Nota:/i.test(list)) continue;
      const category = categoryFromTitle(titleText);
      const title = `${titleText} BBVA 2005/06-2015/16`;
      const challenge = makeBBVAChallenge({
        title,
        period: "2005/06-2015/16",
        criterion: `${titleText} en LaLiga durante la era BBVA`,
        category,
        items: parseRankingItems(list),
      }, existingPlayers, generatedPlayers, knownNames);
      if (challenge) challenges.push(challenge);
      continue;
    }

    const clubLine = line.match(/^(\d+)\.\s*([^:]+):\s*(.+)$/);
    if (clubLine) {
      const club = clubLine[2].trim();
      const items = parseRankingItems(clubLine[3]);
      if (items.length < 7) continue;
      const isGoals = /Goleadores|goles/i.test(section);
      const title = `${isGoals ? "Máximos goleadores" : "Más partidos"} ${club} 2005/06-2015/16`;
      const challenge = makeBBVAChallenge({
        title,
        period: "2005/06-2015/16",
        criterion: `${isGoals ? "Goles" : "Partidos"} acumulados en ${club} durante la era BBVA`,
        category: isGoals ? "GOLEADORES" : "CLUBES",
        items,
      }, existingPlayers, generatedPlayers, knownNames);
      if (challenge) challenges.push(challenge);
    }

    if (/Máximos Goleadores por Club/i.test(line)) section = "club-goles";
    if (/Más Partidos por Club/i.test(line)) section = "club-partidos";
  }

  const seen = new Set();
  const unique = challenges.filter(challenge => {
    if (seen.has(challenge.id)) return false;
    seen.add(challenge.id);
    return true;
  });
  return { challenges: unique, generatedPlayers };
}

function inferWCPosition(name, title) {
  const text = `${name} ${title}`.toLowerCase();
  if (/portero|arquero|clean|penaltis|shilton|barthez|buffon|casillas|neuer|taffarel|zoff|goycochea|schumacher|subasic|livakovic|martinez|krul|dida|courtois|ochoa|lloris/.test(text)) return "Portero";
  if (/defensa|cannavaro|thuram|cafu|roberto carlos|lahm|ramos|puyol|pepe|materazzi|grosso|blind|aurier|godin|lucio|maicon/.test(text)) return "Defensa";
  if (/asistent|centrocampista|maradona|xavi|iniesta|pirlo|modric|kroos|ozil|sneijder|james|pogba|mascherano|beckham|totti|schweinsteiger|riquelme|figo|deco|lato|hassler|littbarski|valbuena|cuadrado|hazard/.test(text)) return "Centrocampista";
  return "Delantero";
}

function nationalityFromWCName(name) {
  const map = {
    "Miroslav Klose": "Alemania", "Gerd Müller": "Alemania", "Jürgen Klinsmann": "Alemania", "Helmut Rahn": "Alemania", "Thomas Müller": "Alemania", "Bastian Schweinsteiger": "Alemania", "Toni Kroos": "Alemania", "Mesut Özil": "Alemania",
    "Ronaldo Nazário": "Brasil", "Pelé": "Brasil", "Ademir": "Brasil", "Leonidas": "Brasil", "Neymar": "Brasil", "Cafú": "Brasil", "Roberto Carlos": "Brasil", "Rivaldo": "Brasil", "Ronaldinho": "Brasil", "Kaká": "Brasil",
    "Lionel Messi": "Argentina", "Diego Maradona": "Argentina", "Guillermo Stábile": "Argentina", "Martín Palermo": "Argentina", "Ángel Di María": "Argentina", "Javier Mascherano": "Argentina",
    "Just Fontaine": "Francia", "Kylian Mbappé": "Francia", "Zinedine Zidane": "Francia", "Thierry Henry": "Francia", "Antoine Griezmann": "Francia", "Fabien Barthez": "Francia",
    "Cristiano Ronaldo": "Portugal", "Eusébio": "Portugal", "Deco": "Portugal", "Figo": "Portugal", "Pepe": "Portugal", "Ricardo Pereira": "Portugal",
    "Andrea Pirlo": "Italia", "Gianluigi Buffon": "Italia", "Fabio Cannavaro": "Italia", "Francesco Totti": "Italia", "Marco Materazzi": "Italia", "Fabio Grosso": "Italia", "Dino Zoff": "Italia",
    "David Villa": "España", "Iker Casillas": "España", "Xavi": "España", "Andrés Iniesta": "España", "Carles Puyol": "España", "Gavi": "España",
    "Diego Forlán": "Uruguay", "Luis Suárez": "Uruguay", "Edinson Cavani": "Uruguay",
    "Gary Lineker": "Inglaterra", "Michael Owen": "Inglaterra", "David Beckham": "Inglaterra", "Peter Shilton": "Inglaterra",
  };
  return map[name] ?? "Por auditar";
}

function flagFor(nationality) {
  return {
    Alemania: "🇩🇪", Brasil: "🇧🇷", Argentina: "🇦🇷", Francia: "🇫🇷", Portugal: "🇵🇹", Italia: "🇮🇹", España: "🇪🇸", Uruguay: "🇺🇾", Inglaterra: "🏴", Holanda: "🇳🇱", Colombia: "🇨🇴", Bélgica: "🇧🇪", Croacia: "🇭🇷", México: "🇲🇽", Camerún: "🇨🇲", Ghana: "🇬🇭", Japón: "🇯🇵"
  }[nationality] ?? "🌍";
}

function parseWC() {
  const text = readText(WC_SOURCE).replace(/Daley Blind:\s*Mathieu Valbuena/g, "Daley Blind, Mathieu Valbuena");
  const existing = parseExistingWorldCupPlayers();
  const generatedPlayers = [];
  const blocks = text.split(/\n(?=T[íi]tulo:\s*)/).filter(block => /T[íi]tulo:/i.test(block));
  const challenges = [];
  for (const block of blocks) {
    const field = label => {
      const match = block.match(new RegExp(`${label}:\\s*([^\\n]+)`, "i"));
      return match ? match[1].trim().replace(/\.$/, "") : "";
    };
    const title = field("T[íi]tulo");
    const description = field("Descripci[óo]n");
    const period = field("Periodo") || "1930-2026";
    const criterion = field("Criterio exacto") || description;
    const sourceName = (field("Fuente").split("/")[0] || "FIFA").trim();
    const names = field("Las 10 respuestas").split(",").map(name => name.trim().replace(/\.$/, "")).filter(Boolean).slice(0, 10);
    const values = field("Valor num[ée]rico").split(",").map(value => value.trim()).filter(Boolean);
    const aliases = field("Alias").split(",").map(value => value.trim().replace(/\.$/, ""));
    if (names.length < 7 || values.length < names.length) continue;
    const answers = names.map((name, index) => {
      const found = existing.names.get(norm(name));
      const id = found?.id ?? slugify(name);
      const nationality = found?.nationality ?? nationalityFromWCName(name);
      const position = found?.position ?? inferWCPosition(name, title);
      if (!found && !existing.ids.has(id)) {
        generatedPlayers.push({
          id,
          name,
          aliases: Array.from(new Set([name, aliases[index] || answerKey(name)].filter(Boolean))),
          nationality,
          flag: flagFor(nationality),
          position,
          worldCups: [Number(String(period).match(/\d{4}/)?.[0] ?? 2010)],
          mainWorldCup: Number(String(period).match(/\d{4}/)?.[0] ?? 2010),
          iconicLevel: "core",
          categories: [position === "Portero" ? "Portero iconico" : title.toLowerCase().includes("gole") ? "Goleador" : "Leyenda"],
          worldCupRole: "Figura mundialista",
        });
        existing.ids.add(id);
      }
      const numeric = Number(String(values[index]).replace(/[^\d]/g, ""));
      const unit = /asistent/i.test(title) ? "asistencias" : /partido/i.test(title) ? "partidos" : /penalt/i.test(title) ? "penaltis" : /porter|clean/i.test(title) ? "porterías a cero" : /j[oó]venes|veteranos|edad/i.test(title) ? "años" : "goles";
      return {
        playerId: id,
        name,
        aliases: Array.from(new Set([name, aliases[index] || "", answerKey(name)].filter(Boolean))),
        value: numeric,
        label: `${values[index]} ${unit}`,
        nationality,
        flag: flagFor(nationality),
        position,
      };
    });
    challenges.push({
      id: `wc-audited-${slugify(title)}`,
      title,
      subtitle: description || "Top10 mundialista",
      period,
      criterion,
      sourceName,
      sourceUrl: "https://www.fifa.com/",
      difficulty: /Alta/i.test(field("Dificultad")) ? "Difícil" : /Baja/i.test(field("Dificultad")) ? "Fácil" : "Medio",
      status: "active",
      answers,
    });
  }
  const seen = new Set();
  return {
    challenges: challenges.filter(challenge => {
      if (seen.has(challenge.id)) return false;
      seen.add(challenge.id);
      return true;
    }),
    generatedPlayers,
  };
}

function writeTS(file, name, data) {
  const banner = `// Auto-generado desde auditorías adjuntas. Edita la fuente o vuelve a ejecutar scripts/import-audited-top10.mjs.\n`;
  fs.writeFileSync(file, `${banner}export const ${name} = ${JSON.stringify(data, null, 2)};\n`, "utf8");
}

const bbva = parseBBVA();
const wc = parseWC();

writeTS(generatedBBVAPlayersPath, "generatedBBVAPlayers", bbva.generatedPlayers);
writeTS(generatedBBVATopsPath, "generatedBBVATop10Challenges", bbva.challenges);
writeTS(generatedWCPlayersPath, "generatedWorldCupPlayers", wc.generatedPlayers);
writeTS(generatedWCTopsPath, "generatedWorldCupTop10Challenges", wc.challenges);

console.log(`BBVA Top10 importados: ${bbva.challenges.length}`);
console.log(`BBVA jugadores añadidos: ${bbva.generatedPlayers.length}`);
console.log(`Mundiales Top10 importados: ${wc.challenges.length}`);
console.log(`Mundiales jugadores añadidos: ${wc.generatedPlayers.length}`);
