"use client";

import { useEffect, useState } from "react";
import { getDayNumber } from "./daily";
import { fetchCommunityStats } from "./communityApi";

type GameKey = "wordle" | "trayectoria" | "top10" | "crack" | "statdle";

const BASE: Record<GameKey, { completion: number; attempts?: number }> = {
  wordle: { completion: 54, attempts: 4.4 },
  trayectoria: { completion: 49, attempts: 3.2 },
  top10: { completion: 28 },
  crack: { completion: 45, attempts: 3.6 },
  statdle: { completion: 52, attempts: 4.1 },
};

function stableOffset(seed: string, range: number) {
  let hash = 0;
  for (let index = 0; index < seed.length; index++) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return (hash % (range * 2 + 1)) - range;
}

export function getCommunityDifficulty(game: GameKey, seed = String(getDayNumber())) {
  const base = BASE[game];
  const completion = Math.max(12, Math.min(82, base.completion + stableOffset(`${game}-${seed}`, 14)));
  const attempts = base.attempts
    ? Math.max(2.4, Math.min(5.4, Number((base.attempts + stableOffset(`${seed}-${game}-attempts`, 5) / 10).toFixed(1))))
    : null;
  const label = completion <= 30 ? "Difícil" : completion <= 55 ? "Media" : "Fácil";
  return { completion, attempts, label };
}

export function useCommunityDifficulty(game: GameKey, challengeId: string) {
  const [difficulty, setDifficulty] = useState(() => ({ ...getCommunityDifficulty(game, challengeId), sample: 0, real: false }));
  useEffect(() => {
    let active = true;
    setDifficulty({ ...getCommunityDifficulty(game, challengeId), sample: 0, real: false });
    fetchCommunityStats(game, challengeId).then(stats => {
      if (!active || !stats || stats.plays < 5) return;
      const completion = Math.round(stats.completion);
      setDifficulty({ completion, attempts: stats.averageAttempts, label: completion <= 30 ? "Dificil" : completion <= 55 ? "Media" : "Facil", sample: stats.plays, real: true });
    });
    return () => { active = false; };
  }, [challengeId, game]);
  return difficulty;
}
