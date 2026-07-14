import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function filePath(file) {
  return path.join(root, file);
}

function read(file) {
  return fs.readFileSync(filePath(file), "utf8");
}

function exists(file) {
  return fs.existsSync(filePath(file));
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
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

function duplicateValues(values) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

const requiredRoutes = [
  "src/app/jugador/[slug]/page.tsx",
  "src/app/club/[slug]/page.tsx",
  "src/app/seleccion/[slug]/page.tsx",
  "src/app/rankings/[slug]/page.tsx",
  "src/app/admin/login/page.tsx",
];

for (const route of requiredRoutes) {
  assert(exists(route), `Falta ruta requerida: ${route}`);
}

const nextConfig = read("next.config.ts");
for (const [from, to] of [
  ["/jugadores/:slug", "/jugador/:slug"],
  ["/clubes/:slug", "/club/:slug"],
  ["/selecciones/:slug", "/seleccion/:slug"],
  ["/ranking/:slug", "/rankings/:slug"],
]) {
  assert(nextConfig.includes(from) && nextConfig.includes(to), `Falta redirect permanente ${from} -> ${to}`);
}

const robots = read("src/app/robots.ts");
assert(!robots.includes("/_next/"), "robots.txt no debe bloquear /_next/.");
assert(robots.includes("/admin/") && robots.includes("/api/"), "robots.txt debe ocultar admin y api.");

const sitemap = read("src/app/sitemap.ts");
for (const forbidden of ["/admin", "/api", "/debug", "/tops", "/guias"]) {
  assert(!sitemap.includes(forbidden), `sitemap no debe incluir ${forbidden}.`);
}
for (const legacy of ["/jugadores/", "/clubes/", "/selecciones/", "/ranking/"]) {
  assert(!sitemap.includes(legacy), `sitemap no debe incluir ruta legacy ${legacy}.`);
}

const layout = read("src/app/layout.tsx");
assert(!layout.includes("SearchAction"), "No debe existir SearchAction sin buscador real.");
assert(!layout.includes("maximum-scale=1"), "No debe bloquearse el zoom en viewport.");

const adminAuth = read("src/lib/serverAdminAuth.ts");
assert(adminAuth.includes("FUTBOLDLE_ADMIN_TOKEN"), "Falta token de administracion por entorno.");
assert(adminAuth.includes('path: "/"'), "La cookie admin debe funcionar tambien contra /api.");

const middleware = read("src/middleware.ts");
assert(middleware.includes("/admin") && middleware.includes("admin/login"), "Middleware debe proteger /admin y permitir /admin/login.");

const reportsApi = read("src/app/api/reports/route.ts");
assert(reportsApi.includes("isAdminRequest") && reportsApi.includes("adminUnauthorized"), "GET/PATCH de reports deben requerir admin.");
assert(reportsApi.includes("payload_too_large") && reportsApi.includes("rate_limited"), "reports debe limitar tamano y frecuencia.");

const communityApi = read("src/app/api/community/route.ts");
assert(communityApi.includes("!modeId || !challengeId") && communityApi.includes("isAdminRequest"), "community GET global debe requerir admin.");
assert(communityApi.includes("payload_too_large") && communityApi.includes("rate_limited"), "community debe limitar tamano y frecuencia.");

const eventsApi = read("src/app/api/events/route.ts");
assert(eventsApi.includes("payload_too_large") && eventsApi.includes("rate_limited"), "events debe limitar tamano y frecuencia.");

const bbvaTop10 = read("src/data/top10Challenges.ts");
assert(bbvaTop10.includes("activeTop10Challenges"), "Falta lista publica filtrada de Top10 BBVA.");
assert(bbvaTop10.includes('!JSON.stringify(challenge).includes("Por auditar")'), "Top10 BBVA publicos deben excluir Por auditar.");
assert(bbvaTop10.includes("challenge.answers.length === 10"), "Top10 BBVA publicos deben tener exactamente 10 respuestas.");
assert(!bbvaTop10.includes("activeTop10Challenges.length ? activeTop10Challenges : top10Challenges"), "Top10 BBVA no debe caer a lista sin filtrar.");

const wcTop10 = read("src/data/worldcups/top10.ts");
assert(wcTop10.includes("activeWorldCupTop10Challenges"), "Falta lista publica filtrada de Top10 Mundial.");
assert(wcTop10.includes('JSON.stringify(challenge).includes("Por auditar")'), "Top10 Mundial publicos deben excluir Por auditar.");
assert(wcTop10.includes("challenge.answers.length !== 10"), "Top10 Mundial publicos deben exigir 10 respuestas.");
assert(!wcTop10.includes("worldCupTop10Challenges.filter(challenge => challenge.status === \"active\")"), "Top10 Mundial no debe usar solo status active.");

const publicFiles = walk(path.join(root, "src", "app"));
for (const file of publicFiles) {
  const rel = relative(file);
  const text = fs.readFileSync(file, "utf8");
  if (/Estadisticas en construccion|Estadísticas en construcción|Por auditar/.test(text) && !rel.includes("admin/")) {
    warnings.push(`Texto pendiente en pagina publica: ${rel}`);
  }
}

for (const file of [
  "src/data/generatedBBVAPlayers.ts",
  "src/data/generatedBBVATop10.ts",
  "src/data/worldcups/generatedPlayers.ts",
  "src/data/worldcups/generatedTop10.ts",
]) {
  if (exists(file) && read(file).includes("Por auditar")) {
    warnings.push(`Datos pendientes conservados en ${file}; no se publican si fallan los filtros.`);
  }
}

if (exists("src/data/bbvaPlayers.ts")) {
  const bbvaPlayers = read("src/data/bbvaPlayers.ts");
  const ids = [...bbvaPlayers.matchAll(/\bid:\s*(\d+)/g)].map(match => match[1]);
  const duplicates = duplicateValues(ids);
  assert(!duplicates.length, `IDs BBVA duplicados: ${duplicates.join(", ")}`);
}

if (exists("src/data/worldcups/players.ts")) {
  const wcPlayers = read("src/data/worldcups/players.ts");
  const ids = [...wcPlayers.matchAll(/\bid:\s*"([^"]+)"/g)].map(match => match[1]);
  const duplicates = duplicateValues(ids);
  assert(!duplicates.length, `IDs Mundial duplicados: ${duplicates.join(", ")}`);
}

if (warnings.length) {
  console.warn("Avisos de validacion:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Validacion de datos fallida:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validacion de datos OK");
