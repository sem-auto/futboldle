import type { Metadata } from "next";
import SeoContentIndex from "@/components/SeoContentIndex";

const SITE_URL = "https://futboldle.es";
const title = "Rankings de fútbol nostalgia - Futboldle";
const description = "Rankings de Liga BBVA, Mundiales, goleadores históricos y futbolistas míticos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/rankings` },
  openGraph: { title, description, url: `${SITE_URL}/rankings`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function RankingsPage() {
  return (
    <SeoContentIndex
      eyebrow="Rankings"
      title="RANKINGS"
      description={description}
      ideas={["Máximos goleadores de los Mundiales", "Mejores jugadores de la Liga BBVA", "Equipos míticos 2005-2016", "Porteros históricos de Mundiales"]}
    />
  );
}
