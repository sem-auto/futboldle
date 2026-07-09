import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Minijuegos de fútbol | Wordle fútbol, Mundialdle y Liga BBVA - Futboldle";
const description = "Minijuegos de fútbol gratis para jugar cada día: Wordle BBVA, Mundialdle, Top10, Statdle, cromos y retos de nostalgia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/minijuegos-futbol` },
  openGraph: { title, description, url: `${SITE_URL}/minijuegos-futbol`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function MinijuegosFutbol() {
  return <SeoGameLanding eyebrow="Minijuegos fútbol" title="Minijuegos de fútbol" description={description} bullets={["Partidas rápidas para móvil.", "Resultados compartibles en X y WhatsApp.", "Liga BBVA y Mundiales en una sola plataforma."]} />;
}
