import type { Metadata } from "next";
import HoyClient from "@/components/HoyClient";

const SITE_URL = "https://futboldle.es";
const title = "Retos de hoy | Futboldle";
const description = "Juega los retos diarios de Futboldle: Wordle BBVA, Trayectoria, Top10, Statdle, Mundialdle y Wordle Mundial.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/hoy` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/hoy`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Retos diarios de Futboldle" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function HoyPage() {
  return <HoyClient />;
}
