import type { Metadata } from "next";
import Link from "next/link";
import WorldCupChampions from "@/components/WorldCupChampions";

const SITE_URL = "https://futboldle.es";
const title = "Campeones del Mundo | Adivina el ganador del Mundial - Futboldle";
const description = "Te damos el a\u00f1o del Mundial y tienes que adivinar el campe\u00f3n. En modo dif\u00edcil tambi\u00e9n el finalista.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/world-cups/champions` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/world-cups/champions`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Campeones del Mundo Futboldle" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function WorldCupChampionsPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver</Link>
        <WorldCupChampions />
      </div>
    </main>
  );
}
