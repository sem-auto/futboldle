"use client";
import { useRouter } from "next/navigation";
import AlbumBBVA from "@/components/AlbumBBVA";
import IconUnlockToast from "@/components/IconUnlockToast";
import { SidebarAds } from "@/components/PromoBanner";

export default function AlbumPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh" style={{ background: "#f6f2ea" }}>
      <SidebarAds />
      <IconUnlockToast />
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-5 overflow-x-hidden">
        <AlbumBBVA onBack={() => router.push("/")} />
      </div>
    </main>
  );
}
