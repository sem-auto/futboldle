import type { Metadata } from "next";
import Link from "next/link";
import WorldCupArchive from "@/components/WorldCupArchive";
import IconUnlockToast from "@/components/IconUnlockToast";

const SITE_URL = "https://futboldle.es";
const title = "Archivo Mundial | Reto diario de Mundiales - Futboldle";
const description = "Cada día un recuerdo distinto de los Mundiales: campeones, caminos al título y finales históricas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/world-cups/archivo` },
  openGraph: { title, description, url: `${SITE_URL}/world-cups/archivo`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function WorldCupArchivePage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <IconUnlockToast />
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Mundiales</Link>
          <Link href="/world-cups/album" className="text-[11px] font-semibold" style={{ color: "#174ea6" }}>Colección</Link>
        </div>
        <WorldCupArchive />
      </div>
    </main>
  );
}
