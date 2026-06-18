import type { Metadata } from "next";
import Link from "next/link";
import CaminoTitulo from "@/components/CaminoTitulo";

const SITE_URL = "https://futboldle.es";
const title = "Camino al T\u00edtulo | Adivina el campe\u00f3n mundial - Futboldle";
const description = "Adivina qu\u00e9 selecci\u00f3n fue campeona del mundo viendo su recorrido de rivales.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/world-cups/camino` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/world-cups/camino`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Camino al Titulo Futboldle" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function CaminoTituloPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <div className="flex items-center justify-between"><Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver</Link><Link href="/world-cups/collection" className="text-[11px] font-semibold" style={{ color: "#174ea6" }}>Colección</Link></div>
        <CaminoTitulo />
      </div>
    </main>
  );
}
