import type { Metadata } from "next";
import Link from "next/link";
import WorldCupChampions from "@/components/WorldCupChampions";

const SITE_URL = "https://futboldle.es";
const title = "Campeones del Mundo | Juego de Mundiales - Futboldle";
const description = "Adivina campeones y finalistas de los Mundiales con pistas rápidas. Minijuego diario de fútbol nostalgia en Futboldle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/campeones-del-mundo` },
  keywords: ["campeones del mundo", "mundiales fifa", "juego mundial futbol", "futbol nostalgia", "futboldle"],
  openGraph: { title, description, url: `${SITE_URL}/campeones-del-mundo`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function CampeonesDelMundoPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver a Mundiales</Link>
        <WorldCupChampions />
      </div>
    </main>
  );
}
