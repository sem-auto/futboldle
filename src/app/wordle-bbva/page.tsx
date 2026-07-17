import type { Metadata } from "next";
import BBVAGameRoute from "@/components/BBVAGameRoute";
import PlayableGameSeo from "@/components/PlayableGameSeo";

const SITE_URL = "https://futboldle.es";
const title = "Wordle BBVA | Adivina al Hombre BBVA del d\u00eda";
const description = "Adivina al futbolista oculto de la Liga BBVA 2005-2016. Un nuevo reto cada d\u00eda.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/wordle-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/wordle-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function WordleBBVAPage() {
  return (
    <PlayableGameSeo seasonHref="/liga-bbva" seasonLabel="Liga BBVA" title="Wordle BBVA" description={description} bullets={[
      "Adivina el apellido oculto.",
      "Jugadores reconocibles de 2005-2016.",
      "Comparte el resultado sin revelar la soluci\u00f3n.",
    ]}>
      <BBVAGameRoute mode="wordle" />
    </PlayableGameSeo>
  );
}
