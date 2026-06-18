"use client";

import { useEffect } from "react";
import { getDayKey } from "@/lib/daily";

export default function PwaRuntime() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").then(async registration => {
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      if (localStorage.getItem("fbl-daily-notifications-v1") !== "enabled") return;
      const day = getDayKey();
      if (localStorage.getItem("fbl-last-daily-notification-v1") === day) return;
      localStorage.setItem("fbl-last-daily-notification-v1", day);
      await registration.showNotification("Ya esta disponible el reto de hoy", { body: "Liga BBVA y Mundiales te esperan en Futboldle.", icon: "/icon.png", tag: "futboldle-daily" });
    }).catch(() => {});
  }, []);
  return null;
}
