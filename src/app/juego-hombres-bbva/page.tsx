import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Juego Hombres BBVA | Minijuegos de Liga BBVA - Futboldle";
const description = "Juega gratis al juego de Hombres BBVA con Wordle, trayectorias, rankings, cromos y retos diarios de fútbol nostalgia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/juego-hombres-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/juego-hombres-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function JuegoHombresBBVA() {
  return <SeoGameLanding eyebrow="Juego fútbol nostalgia" title="Juego Hombres BBVA" description={description} bullets={["Retos diarios de Liga BBVA 2005-2016.", "Cromos y rachas para volver cada día.", "Top10, Wordle, trayectorias y duelos de nostalgia."]} />;
}
