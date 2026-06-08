type AnalyticsEvent =
  | "game_started"
  | "game_completed"
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
