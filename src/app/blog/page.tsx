import type { Metadata } from "next";
import SeoContentIndex from "@/components/SeoContentIndex";

const SITE_URL = "https://futboldle.es";
const title = "Blog de fútbol nostalgia - Futboldle";
const description = "Historias, jugadores y recuerdos de Liga BBVA, Mundiales y fútbol retro.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title, description, url: `${SITE_URL}/blog`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function BlogPage() {
  return (
    <SeoContentIndex
      eyebrow="Contenido Futboldle"
      title="BLOG"
      description={description}
      ideas={["Los mejores jugadores de los Mundiales", "Hombres BBVA que nadie olvida", "Fútbol retro para jugar cada día", "Mundialdle y minijuegos de fútbol"]}
    />
  );
}
