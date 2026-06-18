"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & { prompt: () => Promise<void> };

export default function PwaControls() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("unsupported");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    if ("Notification" in window) setPermission(Notification.permission);
    const onInstall = (event: Event) => { event.preventDefault(); setInstallPrompt(event as InstallPromptEvent); };
    window.addEventListener("beforeinstallprompt", onInstall);
    return () => window.removeEventListener("beforeinstallprompt", onInstall);
  }, []);

  async function install() {
    if (!installPrompt) { setMessage("Usa la opción 'Instalar aplicación' de tu navegador."); return; }
    await installPrompt.prompt();
    setInstallPrompt(null);
  }

  async function notifications() {
    if (!("Notification" in window)) { setMessage("Este navegador no admite notificaciones."); return; }
    const next = await Notification.requestPermission();
    setPermission(next);
    if (next === "granted") {
      localStorage.setItem("fbl-daily-notifications-v1", "enabled");
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification("Futboldle activado", { body: "El reto diario te espera.", icon: "/icon.png" });
      setMessage("Avisos diarios activados.");
    }
  }

  return <section className="rounded-xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}><div className="font-bebas text-[22px]">FUTBOLDLE EN TU MOVIL</div><p className="text-[11px] mt-1" style={{ color: "#6b6b72" }}>Instala la web y activa el aviso del reto diario.</p><div className="flex flex-wrap gap-2 mt-3"><button onClick={install} className="rounded-lg px-3 py-2 text-[10px] font-semibold" style={{ background: "#18181b", color: "white" }}>Instalar Futboldle</button><button onClick={notifications} disabled={permission === "granted"} className="rounded-lg px-3 py-2 text-[10px] font-semibold" style={{ background: "#eef3ff", color: "#174ea6" }}>{permission === "granted" ? "Avisos activados" : "Activar aviso diario"}</button></div>{message && <div className="text-[10px] mt-2" style={{ color: "#1e6b2e" }}>{message}</div>}</section>;
}
