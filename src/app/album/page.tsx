"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlbumBBVA from "@/components/AlbumBBVA";
import AlbumWorldCups from "@/components/AlbumWorldCups";
import IconUnlockToast from "@/components/IconUnlockToast";
import { SidebarAds } from "@/components/PromoBanner";

export default function AlbumPage() {
  const router = useRouter();
  const [collection, setCollection] = useState<"bbva" | "world-cups">("bbva");

  return (
    <main className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <div className="grid grid-cols-2 gap-2 mb-4 rounded-xl p-1" style={{ background: "rgba(0,0,0,0.05)" }}>
          <button onClick={() => setCollection("bbva")} className="rounded-lg py-2 text-[11px] font-semibold" style={{ background: collection === "bbva" ? "white" : "transparent", color: collection === "bbva" ? "#18181b" : "#6b6b72", boxShadow: collection === "bbva" ? "0 2px 8px rgba(0,0,0,0.08)" : "none" }}>Liga BBVA</button>
          <button onClick={() => setCollection("world-cups")} className="rounded-lg py-2 text-[11px] font-semibold" style={{ background: collection === "world-cups" ? "#174ea6" : "transparent", color: collection === "world-cups" ? "white" : "#6b6b72" }}>Mundiales</button>
        </div>
        {collection === "bbva" ? <AlbumBBVA onBack={() => router.push("/")} /> : (
          <div className="flex flex-col gap-4">
            <button onClick={() => router.push("/")} className="self-start text-[11px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver</button>
            <AlbumWorldCups />
          </div>
        )}
      </div>
    </main>
  );
}
