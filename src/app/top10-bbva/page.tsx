import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Top10 BBVA | Completa las listas históricas";
const description = "Demuestra cuánto recuerdas de la Liga BBVA completando rankings históricos de jugadores.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/top10-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/top10-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function Top10BBVALanding() {
  return <SeoGameLanding eyebrow="Rankings Liga BBVA" title="Top10 BBVA" description={description} bullets={["Rankings históricos verificados.", "Posiciones y estadísticas visibles.", "Reto difícil para enfermos de la BBVA."]} />;
}
