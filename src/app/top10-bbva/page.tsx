import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Top10 BBVA | Rankings de Liga BBVA 2005-2016 - Futboldle";
const description = "Completa Top10 historicos de la Liga BBVA: goleadores, asistentes, porterias a cero y rankings de futbol nostalgia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/top10-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/top10-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function Top10BBVALanding() {
  return <SeoGameLanding eyebrow="Rankings Liga BBVA" title="Top10 BBVA" description={description} bullets={["Rankings historicos verificados.", "Posiciones y estadisticas visibles.", "Reto dificil para enfermos de la BBVA."]} />;
}
