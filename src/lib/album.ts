import { bbvaPlayers } from "@/data/bbvaPlayers";

const ALBUM_KEY = "fbl-album-unlocked-v1";

export function getUnlockedPlayers(): number[] {
  try {
    const raw = localStorage.getItem(ALBUM_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(ALBUM_KEY);
      return [];
    }
    return parsed.filter((id): id is number => typeof id === "number" && Number.isFinite(id));
  } catch {
    try { localStorage.removeItem(ALBUM_KEY); } catch {}
    return [];
  }
}

export function unlockPlayer(playerId: number) {
  try {
    const ids = getUnlockedPlayers();
    if (ids.includes(playerId)) return;
    localStorage.setItem(ALBUM_KEY, JSON.stringify([...ids, playerId]));
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

export function getPlayerRarity(category: string) {
  return category === "core" ? "CORE" : "CULTO";
}
