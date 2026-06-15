"use client";

import { getDayNumber } from "./daily";
import { FUTBOLDLE_URL, shareResult } from "./share";
import { trackChallengeShared } from "./analytics";

type ShareCommon = {
  modeId: string;
  challengeId?: string;
  seasonId?: string;
  won?: boolean;
  attempts?: number;
  timeSpent?: number;
  title?: string;
  onCopied?: () => void;
};

export function shareGameResult(text: string, common: ShareCommon) {
  const normalized = text
    .replace(/https?:\/\/futboldle\.(com|es)/g, FUTBOLDLE_URL)
    .replace(/https:\/\/futboldle-liard\.vercel\.app/g, FUTBOLDLE_URL);

  trackChallengeShared(common.modeId, common.challengeId ?? `day-${getDayNumber()}`, {
    seasonId: common.seasonId,
    won: common.won,
    attempts: common.attempts,
    timeSpent: common.timeSpent,
    dayNumber: getDayNumber(),
    shared: true,
  });

  shareResult(normalized, common.onCopied, common.title ?? "Futboldle");
}

export function buildWordleShare(rows: string[], attempts: number, won: boolean) {
  return [
    `Wordle BBVA #${getDayNumber()}`,
    rows.join(""),
    won ? `Lo resolv\u00ed en ${attempts} intento${attempts === 1 ? "" : "s"}.` : "No lo resolv\u00ed hoy.",
    FUTBOLDLE_URL,
  ].join("\n");
}

export function buildProgressiveShare(title: string, marks: string, attempts: number, won: boolean, unit = "pistas", prefix = "") {
  return [
    `${prefix}${title} #${getDayNumber()}`,
    marks,
    won ? `Lo resolv\u00ed en ${attempts} ${unit}.` : "No lo resolv\u00ed hoy.",
    FUTBOLDLE_URL,
  ].filter(Boolean).join("\n");
}

export function buildScoreShare(title: string, score: string, detail?: string) {
  return [
    `${title} #${getDayNumber()}`,
    score,
    detail,
    FUTBOLDLE_URL,
  ].filter(Boolean).join("\n");
}
