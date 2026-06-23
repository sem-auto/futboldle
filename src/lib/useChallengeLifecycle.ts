"use client";

import { useEffect, useRef } from "react";
import { trackChallengeAbandoned } from "./analytics";

type LifecycleInput = {
  modeId: string;
  challengeId: string;
  seasonId: string;
  completed: boolean;
  attempts?: number;
  startedAt?: number;
};

export function useChallengeLifecycle({ modeId, challengeId, seasonId, completed, attempts = 0, startedAt }: LifecycleInput) {
  const completedRef = useRef(completed);
  const attemptsRef = useRef(attempts);
  const sentRef = useRef(false);
  const startedAtRef = useRef(startedAt ?? Date.now());

  useEffect(() => { completedRef.current = completed; }, [completed]);
  useEffect(() => { attemptsRef.current = attempts; }, [attempts]);
  useEffect(() => { startedAtRef.current = startedAt ?? startedAtRef.current; }, [startedAt]);

  useEffect(() => {
    sentRef.current = false;
    startedAtRef.current = startedAt ?? Date.now();

    function abandon() {
      if (sentRef.current || completedRef.current) return;
      sentRef.current = true;
      trackChallengeAbandoned(modeId, challengeId, {
        seasonId,
        attempts: attemptsRef.current,
        timeSpent: Math.round((Date.now() - startedAtRef.current) / 1000),
      });
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") abandon();
    }

    window.addEventListener("beforeunload", abandon);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      abandon();
      window.removeEventListener("beforeunload", abandon);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [challengeId, modeId, seasonId, startedAt]);
}
