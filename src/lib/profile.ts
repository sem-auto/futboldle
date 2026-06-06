import { getAlbumEntries, getCollectionProfileStats } from "./album";
import { loadStats } from "./useStats";

type GameKey = "wordle" | "trayectoria" | "top10" | "top20" | "crack";
const GAME_COUNTS_KEY = "fbl-game-counts-v1";

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

export function getProfileSummary() {
  const stats = loadStats();
  const collection = getCollectionProfileStats();
  const counts = loadGameCounts();
  const unlockedEntries = getAlbumEntries().filter(entry => entry.isUnlocked);
  const rarest = unlockedEntries[0];

  return {
    gamesPlayed: stats.played,
    wins: stats.won,
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
  };
}
