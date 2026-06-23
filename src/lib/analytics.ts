import { submitCommunityEvent, submitCommunityResult } from "./communityApi";

type AnalyticsEvent =
  | "game_started"
  | "game_completed"
  | "mode_started"
  | "mode_completed"
  | "statdle_started"
  | "statdle_completed"
  | "mundialdle_started"
  | "mundialdle_completed"
  | "mundialdle_failed"
  | "season_opened_world_cups"
  | "season_entered"
  | "mode_entered"
  | "challenge_started"
  | "challenge_completed"
  | "challenge_failed"
  | "challenge_shared"
  | "album_opened"
  | "collection_opened"
  | "ad_clicked"
  | "achievement_unlocked"
  | "top10_completed"
  | "card_unlocked"
  | "trophy_unlocked"
  | "album_visit"
  | "showcase_visit"
  | "data_issue_reported"
  | "share_clicked";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      target: string | Date,
      params?: AnalyticsPayload
    ) => void;
    va?: (event: string, data?: AnalyticsPayload) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  try {
    if (typeof window === "undefined") return;
    const enriched: AnalyticsPayload = {
      device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
      ...payload,
    };
    window.gtag?.("event", name, enriched);
    window.va?.(name, enriched);
    try {
      const key = "fbl-analytics-log-v1";
      const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
      const log = Array.isArray(parsed) ? parsed : [];
      log.push({ name, payload: enriched, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(log.slice(-500)));
    } catch {}
    window.dispatchEvent(new CustomEvent("fbl-analytics", { detail: { name, payload: enriched } }));
    if (name === "challenge_started" || name === "challenge_shared" || name === "mode_entered" || name === "season_entered" || name === "share_clicked") {
      const rawModeId = String(enriched.modeId ?? enriched.game ?? enriched.mode ?? "unknown");
      const modeId = rawModeId === "statdle-bbva" ? "statdle" : rawModeId;
      void submitCommunityEvent({
        eventName: name,
        modeId,
        challengeId: enriched.challengeId ? String(enriched.challengeId) : undefined,
        seasonId: enriched.seasonId ? String(enriched.seasonId) : enriched.season ? String(enriched.season) : undefined,
      });
    }
    if (name === "challenge_completed" || name === "challenge_failed" || name === "game_completed") {
      const rawModeId = String(enriched.modeId ?? enriched.game ?? "unknown");
      const modeId = rawModeId === "statdle-bbva" ? "statdle" : rawModeId;
      const challengeId = String(enriched.challengeId ?? enriched.challenge ?? `${modeId}-${new Date().toISOString().slice(0, 10)}`);
      void submitCommunityResult({ modeId, challengeId, seasonId: String(enriched.seasonId ?? enriched.season ?? "bbva"), won: Boolean(enriched.won), attempts: Number(enriched.attempts) || undefined, timeSpent: Number(enriched.timeSpent) || undefined });
    }
  } catch {}
}

export function trackWordleCompleted(payload: AnalyticsPayload = {}) {
  trackEvent("game_completed", { game: "wordle", ...payload });
}

export function trackTrayectoriaCompleted(payload: AnalyticsPayload = {}) {
  trackEvent("game_completed", { game: "trayectoria", ...payload });
}

export function trackTop10Completed(payload: AnalyticsPayload = {}) {
  trackEvent("top10_completed", payload);
}

export function trackCrackCompleted(payload: AnalyticsPayload = {}) {
  trackEvent("game_completed", { game: "crack", ...payload });
}

export function trackCromoUnlocked(payload: AnalyticsPayload = {}) {
  trackEvent("card_unlocked", payload);
}

export function trackSeasonEntered(seasonId: string, payload: AnalyticsPayload = {}) {
  trackEvent("season_entered", { seasonId, ...payload });
}

export function trackModeEntered(modeId: string, seasonId: string, payload: AnalyticsPayload = {}) {
  trackEvent("mode_entered", { modeId, seasonId, ...payload });
}

export function trackChallengeStarted(modeId: string, challengeId: string, payload: AnalyticsPayload = {}) {
  trackEvent("challenge_started", { modeId, challengeId, ...payload });
}

export function trackChallengeCompleted(modeId: string, challengeId: string, payload: AnalyticsPayload = {}) {
  trackEvent("challenge_completed", { modeId, challengeId, ...payload });
}

export function trackChallengeFailed(modeId: string, challengeId: string, payload: AnalyticsPayload = {}) {
  trackEvent("challenge_failed", { modeId, challengeId, won: false, ...payload });
}

export function trackChallengeShared(modeId: string, challengeId: string, payload: AnalyticsPayload = {}) {
  trackEvent("challenge_shared", { modeId, challengeId, ...payload });
}

export function trackAlbumOpened(payload: AnalyticsPayload = {}) {
  trackEvent("album_opened", payload);
  trackEvent("album_visit", payload);
}

export function trackAdClicked(payload: AnalyticsPayload = {}) {
  trackEvent("ad_clicked", payload);
}
