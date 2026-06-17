import type { Metadata } from "next";
import Link from "next/link";
import OnceMundial from "@/components/OnceMundial";

const SITE_URL = "https://futboldle.es";
const title = "Once Mundial | Completa un once por selecciones - Futboldle";
const description = "Te damos selecciones de Mundiales y tienes que escribir jugadores mundialistas validos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/world-cups/once` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/world-cups/once`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Once Mundial Futboldle" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function OnceMundialPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver</Link>
        <OnceMundial />
      </div>
    </main>
  );
}
