type AnalyticsEvent =
  | "game_started"
  | "game_completed"
  | "card_unlocked"
  | "trophy_unlocked"
  | "album_visit"
  | "showcase_visit";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  try {
    if (typeof window === "undefined") return;
    const maybeVercel = window as typeof window & { va?: (event: string, data?: AnalyticsPayload) => void };
    maybeVercel.va?.(name, payload);
    window.dispatchEvent(new CustomEvent("fbl-analytics", { detail: { name, payload } }));
  } catch {}
}
