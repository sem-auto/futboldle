import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Trayectoria BBVA | Adivina el jugador por su carrera";
const description = "Sigue las pistas de su trayectoria y descubre qué futbolista de la Liga BBVA es.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/trayectoria-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/trayectoria-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function TrayectoriaBBVALanding() {
  return <SeoGameLanding eyebrow="Minijuego Liga BBVA" title="Trayectoria BBVA" description={description} bullets={["Pistas progresivas por clubes.", "Hombres BBVA y fútbol nostalgia.", "Ideal para recordar plantillas clásicas."]} />;
}
