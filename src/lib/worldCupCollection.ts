export const WORLD_CUP_ALBUM_KEY = "fbl-worldcup-album-v1";
export const WORLD_CUP_STREAK_KEY = "fbl-worldcup-streak-v1";

export type WorldCupAlbumEntry = {
  playerId: string;
  unlockedAt: string;
  challengeId: string;
};

export type WorldCupStreak = {
  current: number;
  best: number;
  lastDayNumber: number;
  playedDays: number;
};

export function getWorldCupAlbum(): WorldCupAlbumEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(WORLD_CUP_ALBUM_KEY) ?? "[]");
    return Array.isArray(value)
      ? value.filter(item => item && typeof item.playerId === "string")
      : [];
  } catch {
    return [];
  }
}

export function unlockWorldCupCard(playerId: string, challengeId: string) {
  const entries = getWorldCupAlbum();
  if (entries.some(entry => entry.playerId === playerId)) return false;
  entries.push({ playerId, challengeId, unlockedAt: new Date().toISOString() });
  try {
    localStorage.setItem(WORLD_CUP_ALBUM_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event("fbl-worldcup-album-updated"));
  } catch {}
  return true;
}

export function getWorldCupStreak(): WorldCupStreak {
  const empty = { current: 0, best: 0, lastDayNumber: 0, playedDays: 0 };
  if (typeof window === "undefined") return empty;
  try {
    const value = JSON.parse(localStorage.getItem(WORLD_CUP_STREAK_KEY) ?? "null");
    if (!value || typeof value !== "object") return empty;
    return {
      current: Number(value.current) || 0,
      best: Number(value.best) || 0,
      lastDayNumber: Number(value.lastDayNumber) || 0,
      playedDays: Number(value.playedDays) || 0,
    };
  } catch {
    return empty;
  }
}

export function recordWorldCupDay(dayNumber: number): WorldCupStreak {
  const previous = getWorldCupStreak();
  if (previous.lastDayNumber === dayNumber) return previous;
  const current = previous.lastDayNumber === dayNumber - 1 ? previous.current + 1 : 1;
  const next = {
    current,
    best: Math.max(previous.best, current),
    lastDayNumber: dayNumber,
    playedDays: previous.playedDays + 1,
  };
  try {
    localStorage.setItem(WORLD_CUP_STREAK_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("fbl-worldcup-streak-updated"));
  } catch {}
  return next;
}
