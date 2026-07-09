import type { Metadata } from "next";
import Link from "next/link";
import DueloNostalgia from "@/components/DueloNostalgia";

const SITE_URL = "https://futboldle.es";
const title = "Duelo BBVA | ¿Quién tuvo más goles o asistencias? - Futboldle";
const description = "Reto rápido de fútbol nostalgia: compara dos Hombres BBVA y adivina quién tuvo más goles o asistencias.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/duelo-bbva` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/duelo-bbva`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Duelo BBVA Futboldle" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function DueloBBVAPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-lg mx-auto flex flex-col gap-3">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>← Futboldle</Link>
        <DueloNostalgia />
      </div>
    </main>
  );
}
