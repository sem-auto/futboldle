"use client";

export const FUTBOLDLE_URL = "https://futboldle.es";

export type SharePayload = {
  title: string;
  text: string;
  onCopied?: () => void;
};

export function normalizeShareText(text: string) {
  return text.replace(/https:\/\/futboldle-liard\.vercel\.app/g, FUTBOLDLE_URL);
}

export function shareResult(text: string, onCopied?: () => void, title = "Futboldle") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<SharePayload>("fbl-open-share-sheet", {
    detail: { title, text: normalizeShareText(text), onCopied },
  }));
}
