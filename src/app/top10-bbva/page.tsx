import type { Metadata } from "next";
import Link from "next/link";
import Top10BBVAPageClient from "@/components/Top10BBVAPageClient";

const SITE_URL = "https://futboldle.es";
const title = "Top10 BBVA | Completa el ranking diario - Futboldle";
const description = "Juega al Top10 diario de Liga BBVA: rankings históricos, posiciones ocultas, estadísticas reales y cromos desbloqueables.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/top10-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/top10-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function Top10BBVAPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="mx-auto max-w-3xl">
        <Link href="/liga-bbva" className="mb-4 inline-block text-[12px] font-semibold" style={{ color: "#6b6b72" }}>
          ← Liga BBVA
        </Link>
        <Top10BBVAPageClient />
      </div>
    </main>
  );
}
