import type { Metadata } from "next";
import Link from "next/link";
import Top10Mundial from "@/components/Top10Mundial";
import { SITE_URL } from "@/lib/seoIndex";

const title = "Top10 Mundial | Rankings historicos de Mundiales - Futboldle";
const description =
  "Completa rankings historicos de la Copa Mundial: goleadores, leyendas y datos verificados de Mundiales.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/world-cups/top10`,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/world-cups/top10`,
    siteName: "Futboldle",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Futboldle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function Top10MundialPage() {
  return (
    <main>
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <Link href="/world-cups" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
          Volver a Mundiales
        </Link>
      </div>
      <Top10Mundial />
    </main>
  );
}
