import { getAlbumEntries, getCollectionProfileStats } from "./album";
import { loadStats } from "./useStats";

type GameKey = "wordle" | "trayectoria" | "top10" | "top20" | "crack";
const GAME_COUNTS_KEY = "fbl-game-counts-v1";
const STATS_KEY = "fbl-stats-v1";

function blankCounts() {
  return { wordle: 0, trayectoria: 0, top10: 0, top20: 0, crack: 0 };
}

export function loadGameCounts() {
  try {
    const raw = localStorage.getItem(GAME_COUNTS_KEY);
    if (!raw) return blankCounts();
    return { ...blankCounts(), ...JSON.parse(raw) };
  } catch {
    try { localStorage.removeItem(GAME_COUNTS_KEY); } catch {}
    return blankCounts();
  }
}

export function recordGameCompletion(game: GameKey, uniqueKey: string) {
  try {
    const marker = `fbl-game-counted-${game}-${uniqueKey}`;
    if (localStorage.getItem(marker)) return;
    const counts = loadGameCounts();
    counts[game]++;
    localStorage.setItem(GAME_COUNTS_KEY, JSON.stringify(counts));
    localStorage.setItem(marker, "1");
  } catch {}
}

function updateGlobalStats(marker: string, won: boolean, dayKey: string) {
  try {
    if (localStorage.getItem(marker)) return;
    const current = JSON.parse(localStorage.getItem(STATS_KEY) ?? "{}");
    const stats = {
      played: typeof current.played === "number" ? current.played : 0,
      won: typeof current.won === "number" ? current.won : 0,
      streak: typeof current.streak === "number" ? current.streak : 0,
      bestStreak: typeof current.bestStreak === "number" ? current.bestStreak : 0,
      lastPlayedDate: typeof current.lastPlayedDate === "string" ? current.lastPlayedDate : "",
      dist: current.dist && typeof current.dist === "object" ? current.dist : {},
    };
    stats.played++;
    if (won) stats.won++;

    const streakMarker = `fbl-streak-counted-${dayKey}`;
    if (won && !localStorage.getItem(streakMarker)) {
      stats.streak++;
      stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
      stats.lastPlayedDate = dayKey;
      localStorage.setItem(streakMarker, "1");
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    localStorage.setItem(marker, "1");
  } catch {}
}

export function recordGameResult(game: GameKey, uniqueKey: string, won: boolean) {
  try {
    const dayKey = uniqueKey.slice(0, 10);
    updateGlobalStats(`fbl-result-counted-${game}-${uniqueKey}`, won, dayKey);
    if (won) recordGameCompletion(game, uniqueKey);
  } catch {}
}

export function getProfileSummary() {
  const stats = loadStats();
  const collection = getCollectionProfileStats();
  const counts = loadGameCounts();
  const entries = getAlbumEntries();
  const unlockedEntries = entries.filter(entry => entry.isUnlocked);
  const rarest = unlockedEntries[0];
  const clubCounts = new Map<string, { unlocked: number; total: number }>();
  for (const entry of entries) {
    for (const club of entry.player.clubs) {
      const item = clubCounts.get(club) ?? { unlocked: 0, total: 0 };
      item.total++;
      if (entry.isUnlocked) item.unlocked++;
      clubCounts.set(club, item);
    }
  }
  const mostCompletedClub = [...clubCounts.entries()]
    .filter(([, item]) => item.total > 0)
    .sort((a, b) => (b[1].unlocked / b[1].total) - (a[1].unlocked / a[1].total) || b[1].unlocked - a[1].unlocked)[0];
  const rarityEntries = Object.entries(collection.rarityProgress).sort((a, b) => b[1].unlocked - a[1].unlocked);
  const favoritePlayer = collection.favorites.length ? entries.find(entry => entry.player.id === collection.favorites[0])?.player.displayName : null;
  const lastUnlocked = unlockedEntries
    .filter(entry => entry.unlockedAt)
    .sort((a, b) => String(b.unlockedAt).localeCompare(String(a.unlockedAt)))[0];

  return {
    gamesPlayed: stats.played,
    wins: stats.won,
    losses: Math.max(0, stats.played - stats.won),
    currentStreak: stats.streak,
    bestStreak: stats.bestStreak,
    top10Completed: counts.top10,
    top20Completed: counts.top20,
    wordlesCompleted: counts.wordle,
    trayectoriasCompleted: counts.trayectoria,
    cracksCompleted: counts.crack,
    cardsUnlocked: collection.cardsUnlocked,
    collectionTotal: collection.collectionTotal,
    collectionPercent: collection.collectionPercent,
    rarityProgress: collection.rarityProgress,
    favorites: collection.favorites,
    highestRarity: rarest?.rarity ?? "Ninguna",
    rarestPlayer: rarest?.player.displayName ?? "Ninguno",
    mostCompletedClub: mostCompletedClub ? `${mostCompletedClub[0]} ${mostCompletedClub[1].unlocked}/${mostCompletedClub[1].total}` : "Ninguno",
    mostObtainedRarity: rarityEntries[0] ? `${rarityEntries[0][0]} ${rarityEntries[0][1].unlocked}` : "Ninguna",
    favoritePlayer: favoritePlayer ?? "Ninguno",
    lastUnlocked: lastUnlocked ? `${lastUnlocked.player.displayName} (${lastUnlocked.unlockedAt})` : "Ninguno",
  };
}
