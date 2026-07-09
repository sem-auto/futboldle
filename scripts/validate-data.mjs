import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|js|jsx|json|md)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function relative(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

const brokenEncoding = /(?:\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]|\u00E2[\u0080-\u00BF]{1,2}|\u00F0[\u0080-\u00BF]{2,3}|\u00D0[\u0080-\u00BF]|\uFFFD|[\u0400-\u04FF]|Espa\?a|M\?laga|Atl\?tico|Almer\?a|Jes\?s|Joaqu\?n|V\?ctor|Vald\?s|Forl\?n|seg\?n|Porter\?as|Di Mar\?a)/;
for (const file of walk(srcRoot)) {
  const text = fs.readFileSync(file, "utf8");
  if (brokenEncoding.test(text)) {
    const line = text.split(/\r?\n/).findIndex(item => brokenEncoding.test(item)) + 1;
    errors.push(`Encoding sospechoso en ${relative(file)}:${line}`);
  }
}

const bbvaPlayers = read("src/data/bbvaPlayers.ts");
const bbvaIds = [...bbvaPlayers.matchAll(/\bid:\s*(\d+)/g)].map(match => match[1]);
const duplicateBbvaIds = bbvaIds.filter((id, index) => bbvaIds.indexOf(id) !== index);
if (duplicateBbvaIds.length) errors.push(`IDs BBVA duplicados: ${[...new Set(duplicateBbvaIds)].join(", ")}`);

for (const required of ["Guti", "Carmelo", "Güiza", "Olinga", "Juanmi", "Deulofeu", "Varane", "Santi Mina"]) {
  if (!bbvaPlayers.includes(`displayName: "${required}"`)) errors.push(`Falta jugador BBVA requerido: ${required}`);
}

const top10 = read("src/data/top10Challenges.ts");
const youngTopStart = top10.indexOf('"id": "bbva-goleadores-mas-jovenes-2005-2016"');
if (youngTopStart < 0) {
  errors.push("Falta Top10: bbva-goleadores-mas-jovenes-2005-2016");
} else {
  const youngTop = top10.slice(youngTopStart, top10.indexOf("\n  }\n];", youngTopStart));
  const expectedOrder = ["Olinga", "Muniain", "Bojan", "Juanmi", "Javi Martínez", "Deulofeu", "Alcácer", "Varane", "Santi Mina", "Griezmann"];
  const foundOrder = [...youngTop.matchAll(/"displayName":\s*"([^"]+)"/g)].map(match => match[1]).slice(0, 10);
  if (expectedOrder.join("|") !== foundOrder.join("|")) {
    errors.push(`Top10 goleadores jóvenes no coincide. Encontrado: ${foundOrder.join(", ")}`);
  }
}

const worldCupPlayers = read("src/data/worldcups/players.ts");
const worldCupIds = [...worldCupPlayers.matchAll(/\bid:\s*"([^"]+)"/g)].map(match => match[1]);
const duplicateWorldCupIds = worldCupIds.filter((id, index) => worldCupIds.indexOf(id) !== index);
if (duplicateWorldCupIds.length) errors.push(`IDs Mundial duplicados: ${[...new Set(duplicateWorldCupIds)].join(", ")}`);

if (errors.length) {
  console.error("Validación de datos fallida:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validación de datos OK");
