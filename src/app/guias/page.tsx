import type { Metadata } from "next";
import SeoContentIndex from "@/components/SeoContentIndex";

const SITE_URL = "https://futboldle.es";
const title = "Guías de juegos de fútbol - Futboldle";
const description = "Guías para jugar a Wordle BBVA, Mundialdle, Top10 BBVA y minijuegos diarios de fútbol.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/guias` },
  openGraph: { title, description, url: `${SITE_URL}/guias`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function GuiasPage() {
  return (
    <SeoContentIndex
      eyebrow="Guías"
      title="GUÍAS"
      description={description}
      ideas={["Cómo jugar a Mundialdle", "Cómo jugar a Wordle BBVA", "Cómo compartir resultados", "Cómo completar cromos en Futboldle"]}
    />
  );
}
