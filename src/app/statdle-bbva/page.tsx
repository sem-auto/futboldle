import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Statdle BBVA | Adivina el jugador por estadisticas - Futboldle";
const description = "Statdle BBVA es un minijuego de futbol para adivinar jugadores de la Liga BBVA por estadisticas y pistas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/statdle-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/statdle-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function StatdleBBVALanding() {
  return <SeoGameLanding eyebrow="Minijuego de estadisticas" title="Statdle BBVA" description={description} bullets={["Pistas por temporada y club.", "Adivina con datos reconocibles.", "Pensado para jugar cada dia."]} />;
}
