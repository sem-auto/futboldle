import type { Metadata } from "next";
import Link from "next/link";
import WorldCupWordle from "@/components/WorldCupWordle";

const SITE_URL = "https://futboldle.es";
const title = "Wordle Mundial | Adivina el apellido del mundialista";
const description = "El Wordle de los Mundiales. Un nuevo reto diario para amantes del fútbol internacional.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/world-cups/wordle` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/world-cups/wordle`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Wordle Mundial Futboldle" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default async function WorldCupWordlePage({ searchParams }: { searchParams: Promise<{ extra?: string }> }) {
  const params = await searchParams;
  const parsedExtra = Number.parseInt(params.extra ?? "0", 10);
  const extraIndex = Number.isFinite(parsedExtra) ? Math.max(0, Math.min(parsedExtra, 999)) : 0;
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-xl mx-auto flex flex-col gap-3">
        <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Mundiales</Link>
        <WorldCupWordle key={extraIndex} initialExtraIndex={extraIndex} />
      </div>
    </main>
  );
}
