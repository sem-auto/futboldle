import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Wordle BBVA | Wordle futbol Liga BBVA - Futboldle";
const description = "Juega a Wordle BBVA, el wordle de futbol para adivinar apellidos de jugadores de la Liga BBVA 2005-2016.";

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
