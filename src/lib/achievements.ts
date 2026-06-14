"use client";

import { trackEvent } from "./analytics";

const ACHIEVEMENTS_KEY = "fbl-achievements-v1";

export type Achievement = {
  id: string;
  label: string;
  description: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-complete", label: "Primer reto completado", description: "Ya has abierto el álbum de recuerdos." },
  { id: "first-mundialdle", label: "Primer Mundialdle completado", description: "También tienes memoria mundialista." },
  { id: "streak-5", label: "5 días de racha", description: "Empieza a oler a ritual diario." },
  { id: "streak-7", label: "7 días de racha", description: "Una semana entera volviendo a jugar." },
  { id: "cards-25", label: "25 cromos desbloqueados", description: "La colección ya empieza a pesar." },
  { id: "cards-100", label: "100 cromos desbloqueados", description: "Esto ya es álbum serio." },
  { id: "rey-bbva", label: "Rey de la BBVA", description: "Has completado varios retos de la era BBVA." },
  { id: "especialista-mundialista", label: "Especialista Mundialista", description: "Mundialdle ya no te viene grande." },
];

function readUnlocked() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function getUnlockedAchievements() {
  return readUnlocked();
}

function unlockAchievement(id: string) {
  const achievement = ACHIEVEMENTS.find(item => item.id === id);
  if (!achievement) return;
  const unlocked = readUnlocked();
  if (unlocked.includes(id)) return;
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify([...unlocked, id]));
    window.dispatchEvent(new CustomEvent("fbl-achievement-unlocked", { detail: achievement }));
    trackEvent("achievement_unlocked", { achievementId: id, label: achievement.label });
  } catch {}
}

function readJson<T extends Record<string, number>>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function readAlbumCount() {
  try {
    const parsed = JSON.parse(localStorage.getItem("fbl-album-unlocked-v1") ?? "[]");
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export function syncAchievements(context: { modeId?: string; won?: boolean } = {}) {
  try {
    const stats = readJson("fbl-stats-v1", { won: 0, streak: 0 });
    const counts = readJson("fbl-game-counts-v1", { wordle: 0, trayectoria: 0, top10: 0, crack: 0 });
    const albumCount = readAlbumCount();

    if (stats.won >= 1) unlockAchievement("first-complete");
    if (context.modeId === "mundialdle" && context.won) unlockAchievement("first-mundialdle");
    if (stats.streak >= 5) unlockAchievement("streak-5");
    if (stats.streak >= 7) unlockAchievement("streak-7");
    if (albumCount >= 25) unlockAchievement("cards-25");
    if (albumCount >= 100) unlockAchievement("cards-100");
    if ((counts.wordle ?? 0) + (counts.trayectoria ?? 0) + (counts.top10 ?? 0) + (counts.crack ?? 0) >= 10) unlockAchievement("rey-bbva");
    if (context.modeId === "mundialdle" && context.won) unlockAchievement("especialista-mundialista");
  } catch {}
}
