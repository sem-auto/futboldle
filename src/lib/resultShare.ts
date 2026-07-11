"use client";

import { trackChallengeShared, trackEvent } from "./analytics";
import { getDayNumber } from "./daily";
import { FUTBOLDLE_URL, shareResult } from "./share";

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

function normalizeShareText(text: string) {
  const normalizedBase = text
    .replace(/https?:\/\/futboldle\.(com|es)/g, FUTBOLDLE_URL)
    .replace(/https:\/\/futboldle-liard\.vercel\.app/g, FUTBOLDLE_URL);

  if (normalizedBase.includes("¿Puedes superarme?")) return normalizedBase;
  if (normalizedBase.includes(FUTBOLDLE_URL)) {
    return normalizedBase.replace(FUTBOLDLE_URL, `¿Puedes superarme?\n${FUTBOLDLE_URL}`);
  }

  return `${normalizedBase}\n\n¿Puedes superarme?\n${FUTBOLDLE_URL}`;
}

export function shareGameResult(text: string, common: ShareCommon) {
  const normalized = normalizeShareText(text);

  trackChallengeShared(common.modeId, common.challengeId ?? `day-${getDayNumber()}`, {
    seasonId: common.seasonId,
    won: common.won,
    attempts: common.attempts,
    timeSpent: common.timeSpent,
    dayNumber: getDayNumber(),
    shared: true,
  });
  trackEvent("share_clicked", {
    modeId: common.modeId,
    challengeId: common.challengeId,
    seasonId: common.seasonId,
  });

  shareResult(normalized, common.onCopied, common.title ?? "Futboldle");
}

export function buildWordleShare(rows: string[], attempts: number, won: boolean) {
  return [
    `Wordle BBVA #${getDayNumber()}`,
    rows.join("\n"),
    won ? `Lo resolví en ${attempts} intento${attempts === 1 ? "" : "s"}.` : "No lo resolví hoy.",
    FUTBOLDLE_URL,
  ].join("\n");
}

export function buildProgressiveShare(title: string, marks: string, attempts: number, won: boolean, unit = "pistas", prefix = "") {
  return [
    `${prefix}${title} #${getDayNumber()}`,
    marks,
    won ? `Lo resolví en ${attempts} ${unit}.` : "No lo resolví hoy.",
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
