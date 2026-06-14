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
  | "achievement_unlocked"
  | "top10_completed"
  | "card_unlocked"
  | "trophy_unlocked"
  | "album_visit"
  | "showcase_visit";

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
    window.gtag?.("event", name, payload);
    window.va?.(name, payload);
    window.dispatchEvent(new CustomEvent("fbl-analytics", { detail: { name, payload } }));
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
