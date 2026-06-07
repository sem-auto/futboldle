import { bbvaPlayers } from "@/data/bbvaPlayers";
import { trackEvent } from "./analytics";
import { normalize } from "./normalize";

const ALBUM_KEY = "fbl-album-unlocked-v1";
const ALBUM_META_KEY = "fbl-album-meta-v1";
const FAVORITES_KEY = "fbl-album-favorites-v1";
export type AlbumRarity = "ICONO" | "LEGENDARIO" | "CORE" | "CULTO";

const ICON_PLAYERS = new Set([
  "MESSI",
  "LIONELMESSI",
  "RONALDO",
  "CRISTIANORONALDO",
  "XAVI",
  "INIESTA",
  "CASILLAS",
  "VILLA",
  "PUYOL",
  "TORRES",
  "FERNANDOTORRES",
  "SILVA",
  "DAVIDSILVA",
]);

const LEGENDARY_PLAYERS = new Set([
  "FALCAO",
  "OZIL",
  "FABREGAS",
  "DIMARIA",
  "BALE",
  "NEYMAR",
  "BENZEMA",
  "SUAREZ",
  "GRIEZMANN",
  "RAKITIC",
  "FORLAN",
  "KANOUTE",
  "CAZORLA",
  "JESUSNAVAS",
  "NAVAS",
  "VALERON",
]);

const CORE_PLAYERS = new Set([
  "SOLDADO",
  "NEGREDO",
  "ADURIZ",
  "DIEGOCOSTA",
  "JONAS",
  "PAREJO",
  "BANEGA",
  "JOAQUIN",
  "BENAT",
  "CANALES",
  "PIATTI",
  "ROSSI",
  "MATA",
  "JUANMATA",
  "XABIPRIETO",
  "BRUNOSORIANO",
  "SERGIOGARCIA",
  "JORGEMOLINA",
  "RUBENCASTRO",
]);

const PLAYER_CURIOSITIES: Record<string, string> = {
  MESSI: "Dominó la era BBVA con Balones de Oro, goles y asistencias desde Barcelona.",
  RONALDO: "Firmó una de las etapas goleadoras más salvajes de la historia del Real Madrid.",
  VILLA: "Ganó Mundial 2010 y Eurocopas 2008 y 2012 con España.",
  SILVA: "Fue pieza clave del Valencia y de la España campeona de Europa y del mundo.",
  FORLAN: "Bota de Oro europea y Balón de Oro del Mundial 2010.",
  KANOUTE: "Elegido mejor jugador africano mientras brillaba en el Sevilla.",
  FALCAO: "Su etapa en el Atlético dejó una final europea histórica ante el Athletic.",
  TORRES: "Ídolo del Atlético antes y después de su etapa en la Premier.",
  XAVI: "Cerebro del Barça y de la selección española más dominante.",
  INIESTA: "Autor del gol del Mundial 2010 y leyenda absoluta del centro del campo.",
  NAVAS: "Canterano eterno del Sevilla y campeón del mundo con España.",
  JOAQUIN: "Uno de los extremos más reconocibles y longevos de LaLiga.",
  CAZORLA: "Talento diferencial del Villarreal y campeón de Eurocopa con España.",
  VALERON: "El Flaco fue uno de los mediapuntas más elegantes del fútbol español.",
  SOLDADO: "Vivió en Valencia su etapa más goleadora en Primera.",
  NEGREDO: "El Tiburón explotó como goleador en el Sevilla.",
  JONAS: "Delantero brasileño de enorme rendimiento en Valencia.",
  PIATTI: "Pasó por Almería y Valencia durante la era BBVA.",
  BRUNO: "Capitán y símbolo del Villarreal durante más de una década.",
  SENNA: "Campeón de Europa 2008 y leyenda del Villarreal.",
  CASILLAS: "Capitán del Real Madrid y de la España campeona de todo.",
  VALDES: "Portero del Barça de Guardiola y especialista en juego con los pies.",
  PALOP: "Portero decisivo del Sevilla europeo, incluso marcó un gol histórico.",
  KAMENI: "Guardameta icónico del Espanyol y del Málaga.",
};

const CLUB_SHIELDS: Record<string, string> = {
  Valencia: "VCF",
  "Atlético de Madrid": "ATM",
  Sevilla: "SFC",
  Barcelona: "FCB",
  Villarreal: "VIL",
  Deportivo: "DEP",
  Málaga: "MCF",
  "Athletic Club": "ATH",
};

function playerKeys(player: Pick<(typeof bbvaPlayers)[number], "answer" | "displayName" | "fullName">) {
  return [player.answer, player.displayName, player.fullName].map(normalize);
}

export function getPlayerCuriosity(player: Pick<(typeof bbvaPlayers)[number], "answer" | "displayName" | "fullName" | "mainClub">) {
  const keys = playerKeys(player);
  const found = keys.map(key => PLAYER_CURIOSITIES[key]).find(Boolean);
  return found ?? `Cromo clásico de la era BBVA asociado a ${player.mainClub}.`;
}

export function getHistoricalClubShield(clubName?: string) {
  if (!clubName) return "BBVA";
  return CLUB_SHIELDS[clubName] ?? clubName.split(/\s+/).map(part => part[0]).join("").slice(0, 3).toUpperCase();
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function loadNumberArray(key: string): number[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(key);
      return [];
    }
    return Array.from(new Set(parsed.filter((id): id is number => typeof id === "number" && Number.isFinite(id))));
  } catch {
    try { localStorage.removeItem(key); } catch {}
    return [];
  }
}

function loadAlbumMeta(): Record<string, { unlockedAt: string; source?: string }> {
  try {
    const raw = localStorage.getItem(ALBUM_META_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      localStorage.removeItem(ALBUM_META_KEY);
      return {};
    }
    return parsed as Record<string, { unlockedAt: string; source?: string }>;
  } catch {
    try { localStorage.removeItem(ALBUM_META_KEY); } catch {}
    return {};
  }
}

export function getUnlockedPlayers(): number[] {
  return loadNumberArray(ALBUM_KEY);
}

export function unlockPlayer(playerId: number, source = "Futboldle") {
  try {
    const ids = getUnlockedPlayers();
    if (ids.includes(playerId)) return;
    localStorage.setItem(ALBUM_KEY, JSON.stringify([...ids, playerId]));
    const meta = loadAlbumMeta();
    meta[playerId] = { unlockedAt: todayIso(), source };
    localStorage.setItem(ALBUM_META_KEY, JSON.stringify(meta));
    const player = bbvaPlayers.find(p => p.id === playerId);
    if (player) {
      const rarity = getPlayerRarity(player);
      localStorage.setItem("fbl-last-card-unlock-v1", JSON.stringify({ id: player.id, name: player.displayName, rarity, at: Date.now() }));
      window.dispatchEvent(new CustomEvent("fbl-card-unlocked", { detail: { id: player.id, name: player.displayName, rarity, clubs: player.clubs, position: player.position } }));
      trackEvent("card_unlocked", { playerId: player.id, player: player.displayName, rarity, source });
    }
    syncTrophies();
  } catch {}
}

export function getAlbumProgress() {
  const unlocked = getUnlockedPlayers();
  return {
    unlockedCount: unlocked.length,
    total: bbvaPlayers.length,
    percent: bbvaPlayers.length ? Math.round((unlocked.length / bbvaPlayers.length) * 100) : 0,
  };
}

export function getPlayerRarity(player: (typeof bbvaPlayers)[number]): AlbumRarity {
  const keys = playerKeys(player);
  if (keys.some(key => ICON_PLAYERS.has(key))) return "ICONO";
  if (keys.some(key => LEGENDARY_PLAYERS.has(key))) return "LEGENDARIO";
  if (keys.some(key => CORE_PLAYERS.has(key))) return "CORE";
  return "CULTO";
}

export function getAlbumRarityProgress() {
  const unlockedSet = new Set(getUnlockedPlayers());
  const empty = {
    ICONO: { unlocked: 0, total: 0 },
    LEGENDARIO: { unlocked: 0, total: 0 },
    CORE: { unlocked: 0, total: 0 },
    CULTO: { unlocked: 0, total: 0 },
  };

  return bbvaPlayers.reduce((acc, player) => {
    const rarity = getPlayerRarity(player);
    acc[rarity].total++;
    if (unlockedSet.has(player.id)) acc[rarity].unlocked++;
    return acc;
  }, empty);
}

export function compareAlbumPlayers(a: (typeof bbvaPlayers)[number], b: (typeof bbvaPlayers)[number]) {
  const rank: Record<AlbumRarity, number> = { ICONO: 0, LEGENDARIO: 1, CORE: 2, CULTO: 3 };
  return rank[getPlayerRarity(a)] - rank[getPlayerRarity(b)] ||
    a.displayName.localeCompare(b.displayName, "es");
}

export function getAlbumEntries() {
  const unlockedSet = new Set(getUnlockedPlayers());
  const favorites = new Set(getFavoritePlayers());
  const meta = loadAlbumMeta();

  return bbvaPlayers.map(player => ({
    player,
    isUnlocked: unlockedSet.has(player.id),
    isFavorite: favorites.has(player.id),
    unlockedAt: meta[player.id]?.unlockedAt ?? null,
    source: meta[player.id]?.source ?? null,
    rarity: getPlayerRarity(player),
  })).sort((a, b) => compareAlbumPlayers(a.player, b.player));
}

export function getFavoritePlayers(): number[] {
  return loadNumberArray(FAVORITES_KEY);
}

export function toggleFavoritePlayer(playerId: number) {
  const favorites = getFavoritePlayers();
  const next = favorites.includes(playerId) ? favorites.filter(id => id !== playerId) : [...favorites, playerId];
  try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch {}
  return next;
}

export function getClubProgress(clubName: string) {
  const unlockedSet = new Set(getUnlockedPlayers());
  const players = bbvaPlayers.filter(player => player.clubs.includes(clubName));
  const unlocked = players.filter(player => unlockedSet.has(player.id)).length;
  return {
    club: clubName,
    unlocked,
    total: players.length,
    percent: players.length ? Math.round((unlocked / players.length) * 100) : 0,
  };
}

export function getFeaturedClubProgress(clubs: string[]) {
  return clubs.map(getClubProgress).filter(item => item.total > 0);
}

export function getAlbumObjectives() {
  const progress = getAlbumProgress();
  const rarity = getAlbumRarityProgress();
  const clubObjectives = ["Valencia", "Atlético de Madrid", "Sevilla"].map(getClubProgress);

  return [
    ...clubObjectives.map(item => ({
      id: `club-${item.club}`,
      label: `Completa ${item.club.replace("Atlético de Madrid", "Atlético")}`,
      current: item.unlocked,
      target: item.total,
      percent: item.percent,
    })),
    {
      id: "iconos",
      label: "Completa los Iconos",
      current: rarity.ICONO.unlocked,
      target: rarity.ICONO.total,
      percent: rarity.ICONO.total ? Math.round((rarity.ICONO.unlocked / rarity.ICONO.total) * 100) : 0,
    },
    {
      id: "legendarios",
      label: "Completa los Legendarios",
      current: rarity.LEGENDARIO.unlocked,
      target: rarity.LEGENDARIO.total,
      percent: rarity.LEGENDARIO.total ? Math.round((rarity.LEGENDARIO.unlocked / rarity.LEGENDARIO.total) * 100) : 0,
    },
    {
      id: "50-cromos",
      label: "Consigue 50 cromos",
      current: Math.min(progress.unlockedCount, 50),
      target: 50,
      percent: Math.min(100, Math.round((progress.unlockedCount / 50) * 100)),
    },
    {
      id: "100-cromos",
      label: "Consigue 100 cromos",
      current: Math.min(progress.unlockedCount, 100),
      target: 100,
      percent: Math.min(100, Math.round((progress.unlockedCount / 100) * 100)),
    },
  ];
}

export function getCollectionProfileStats() {
  const progress = getAlbumProgress();
  return {
    cardsUnlocked: progress.unlockedCount,
    collectionTotal: progress.total,
    collectionPercent: progress.percent,
    rarityProgress: getAlbumRarityProgress(),
    favorites: getFavoritePlayers(),
  };
}

export function getCollectorLevel(unlockedCount = getAlbumProgress().unlockedCount) {
  const thresholds = [0, 15, 30, 50, 75, 100];
  const level = unlockedCount >= 100 ? 6 :
    unlockedCount >= 75 ? 5 :
    unlockedCount >= 50 ? 4 :
    unlockedCount >= 30 ? 3 :
    unlockedCount >= 15 ? 2 : 1;
  const currentFloor = thresholds[level - 1];
  const nextTarget = level >= 6 ? unlockedCount : thresholds[level];
  return {
    level,
    current: unlockedCount,
    nextTarget,
    percent: nextTarget === currentFloor ? 100 : Math.min(100, Math.round(((unlockedCount - currentFloor) / (nextTarget - currentFloor)) * 100)),
  };
}

const TROPHY_KEY = "fbl-trophies-v1";
const TROPHY_META_KEY = "fbl-trophy-meta-v1";

export const TROPHY_DEFINITIONS = [
  ...["Valencia", "Atlético de Madrid", "Sevilla", "Barcelona", "Villarreal", "Deportivo", "Málaga", "Athletic Club"].map(club => ({
    id: `collector-${normalize(club)}`,
    category: "COLECCIONISTA",
    label: `Coleccionista ${club.replace("Atlético de Madrid", "Atlético").replace("Athletic Club", "Athletic")}`,
    club,
  })),
  { id: "legendary-50", category: "LEYENDAS", label: "50% legendarios" },
  { id: "legendary-all", category: "LEYENDAS", label: "Todos los legendarios" },
  { id: "icon-first", category: "ICONOS", label: "Primer icono" },
  { id: "icon-5", category: "ICONOS", label: "5 iconos" },
  { id: "icon-all", category: "ICONOS", label: "Todos los iconos" },
  { id: "collection-25", category: "COLECCIÓN", label: "25 cromos" },
  { id: "collection-50", category: "COLECCIÓN", label: "50 cromos" },
  { id: "collection-100", category: "COLECCIÓN", label: "100 cromos" },
  { id: "collection-150", category: "COLECCIÓN", label: "150 cromos" },
  { id: "collection-all", category: "COLECCIÓN", label: "Colección completa" },
  { id: "top10-10", category: "TOPS", label: "10 Top10 completados" },
  { id: "top10-25", category: "TOPS", label: "25 Top10 completados" },
  { id: "top10-50", category: "TOPS", label: "50 Top10 completados" },
  { id: "streak-7", category: "RACHAS", label: "7 días" },
  { id: "streak-30", category: "RACHAS", label: "30 días" },
  { id: "streak-100", category: "RACHAS", label: "100 días" },
] as const;

export function getUnlockedTrophies(): string[] {
  return loadTrophyIds();
}

function loadTrophyIds(): string[] {
  try {
    const raw = localStorage.getItem(TROPHY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return Array.from(new Set(parsed.filter((id): id is string => typeof id === "string")));
  } catch {
    return [];
  }
}

function loadTrophyMeta(): Record<string, { unlockedAt: string }> {
  try {
    const raw = localStorage.getItem(TROPHY_META_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Record<string, { unlockedAt: string }>;
  } catch {
    return {};
  }
}

export function syncTrophies() {
  try {
    const earned = new Set(loadTrophyIds());
    const progress = getAlbumProgress();
    const rarity = getAlbumRarityProgress();
    let top10Completed = 0;
    let bestStreak = 0;
    try {
      const counts = JSON.parse(localStorage.getItem("fbl-game-counts-v1") ?? "{}");
      top10Completed = typeof counts.top10 === "number" ? counts.top10 : 0;
    } catch {}
    try {
      const stats = JSON.parse(localStorage.getItem("fbl-stats-v1") ?? "{}");
      bestStreak = typeof stats.bestStreak === "number" ? stats.bestStreak : 0;
    } catch {}
    const before = new Set(earned);
    for (const trophy of TROPHY_DEFINITIONS) {
      if ("club" in trophy) {
        const clubProgress = getClubProgress(trophy.club);
        if (clubProgress.total > 0 && clubProgress.unlocked === clubProgress.total) earned.add(trophy.id);
      }
    }
    if (rarity.LEGENDARIO.total > 0 && rarity.LEGENDARIO.unlocked / rarity.LEGENDARIO.total >= 0.5) earned.add("legendary-50");
    if (rarity.LEGENDARIO.total > 0 && rarity.LEGENDARIO.unlocked === rarity.LEGENDARIO.total) earned.add("legendary-all");
    if (rarity.ICONO.unlocked >= 1) earned.add("icon-first");
    if (rarity.ICONO.unlocked >= 5) earned.add("icon-5");
    if (rarity.ICONO.total > 0 && rarity.ICONO.unlocked === rarity.ICONO.total) earned.add("icon-all");
    if (progress.unlockedCount >= 25) earned.add("collection-25");
    if (progress.unlockedCount >= 50) earned.add("collection-50");
    if (progress.unlockedCount >= 100) earned.add("collection-100");
    if (progress.unlockedCount >= 150) earned.add("collection-150");
    if (progress.unlockedCount === progress.total) earned.add("collection-all");
    if (top10Completed >= 10) earned.add("top10-10");
    if (top10Completed >= 25) earned.add("top10-25");
    if (top10Completed >= 50) earned.add("top10-50");
    if (bestStreak >= 7) earned.add("streak-7");
    if (bestStreak >= 30) earned.add("streak-30");
    if (bestStreak >= 100) earned.add("streak-100");
    localStorage.setItem(TROPHY_KEY, JSON.stringify([...earned]));
    const trophyMeta = loadTrophyMeta();
    for (const id of earned) {
      if (!before.has(id)) {
        trophyMeta[id] = { unlockedAt: todayIso() };
        trackEvent("trophy_unlocked", { trophyId: id });
      }
    }
    localStorage.setItem(TROPHY_META_KEY, JSON.stringify(trophyMeta));
    return [...earned];
  } catch {
    return loadTrophyIds();
  }
}

export function getTrophyShowcase() {
  const earned = new Set(syncTrophies());
  const meta = loadTrophyMeta();
  return TROPHY_DEFINITIONS.map(trophy => ({
    ...trophy,
    unlocked: earned.has(trophy.id),
    unlockedAt: meta[trophy.id]?.unlockedAt ?? null,
  }));
}
