import type { Metadata } from "next";
import BBVAGameRoute from "@/components/BBVAGameRoute";
import PlayableGameSeo from "@/components/PlayableGameSeo";

const SITE_URL = "https://futboldle.es";
const title = "Statdle BBVA | Adivina el jugador por estad\u00edsticas";
const description = "Adivina jugadores de la Liga BBVA con pistas de temporada, club, posici\u00f3n y estad\u00edsticas reconocibles.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/statdle-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/statdle-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function StatdleBBVAPage() {
  return (
    <PlayableGameSeo seasonHref="/liga-bbva" seasonLabel="Liga BBVA" title="Statdle BBVA" description={description} bullets={[
      "Pistas de temporada, club y posici\u00f3n.",
      "Datos para recordar jugadores de la era BBVA.",
      "Resuelve, desbloquea y comparte el reto diario.",
    ]}>
      <BBVAGameRoute mode="statdle" />
    </PlayableGameSeo>
  );
}
