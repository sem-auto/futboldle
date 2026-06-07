"use client";
import { useState, useEffect, useCallback } from "react";
import { getDayKey } from "./daily";

export interface Stats {
  played: number;
  won: number;
  streak: number;
  bestStreak: number;
  lastPlayedDate: string;
  dist: Record<string, number>;
}

const KEY = "fbl-stats-v1";

function blank(): Stats {
  return { played:0, won:0, streak:0, bestStreak:0, lastPlayedDate:"", dist:{} };
}

export function loadStats(): Stats {
  try {
    const r = localStorage.getItem(KEY);
    if (r) return { ...blank(), ...JSON.parse(r) };
  } catch {
    try { localStorage.removeItem(KEY); } catch {}
  }
  return blank();
}

export function recordResult(won: boolean, guesses: number) {
  const s = loadStats();
  if (s.lastPlayedDate === getDayKey()) return;
  s.played++;
  s.lastPlayedDate = getDayKey();
  if (won) {
    s.won++;
    s.streak++;
    if (s.streak > s.bestStreak) s.bestStreak = s.streak;
    s.dist[guesses] = (s.dist[guesses] || 0) + 1;
  } else {
    s.streak = 0;
  }
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function useStats() {
  const [stats, setStats] = useState<Stats>(blank);
  const refresh = useCallback(() => setStats(loadStats()), []);
  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);
  return { stats, refresh };
}
