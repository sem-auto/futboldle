import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Wordle BBVA | Adivina al Hombre BBVA del día";
const description = "Adivina al futbolista oculto de la Liga BBVA 2005-2016. Un nuevo reto cada día.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/wordle-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/wordle-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function WordleBBVALanding() {
  return <SeoGameLanding eyebrow="Minijuego Liga BBVA" title="Wordle BBVA" description={description} bullets={["Adivina el apellido del futbolista.", "Jugadores recordados de la era BBVA.", "Reto diario para compartir."]} />;
}
