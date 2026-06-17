import type { Metadata } from "next";

const SITE_URL = "https://futboldle.es";
const title = "Mundiales 2002-2026 | Minijuegos de fútbol - Futboldle";
const description = "Juega a Mundialdle, campeones del mundo y retos diarios de Mundiales dentro de Futboldle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/world-cups` },
  keywords: ["mundialdle", "mundiales fifa", "juegos mundial futbol", "adivinar futbolista", "futboldle"],
  openGraph: { title, description, url: `${SITE_URL}/world-cups`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function WorldCupsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
