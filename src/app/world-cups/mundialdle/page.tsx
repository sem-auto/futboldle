import type { Metadata } from "next";
import Link from "next/link";
import Mundialdle from "@/components/Mundialdle";

const SITE_URL = "https://futboldle.es";
const title = "Mundialdle | Adivina el jugador mundialista";
const description = "Descubre al jugador oculto utilizando pistas sobre mundiales, selecciones y clubes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/world-cups/mundialdle` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/world-cups/mundialdle`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Mundialdle Futboldle" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function MundialdlePage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver</Link>
        <Mundialdle />
      </div>
    </main>
  );
}
