import type { Metadata } from "next";
import SeoGameLanding from "@/components/SeoGameLanding";

const SITE_URL = "https://futboldle.es";
const title = "Quiz Liga BBVA | Retos diarios de fútbol nostalgia - Futboldle";
const description = "Quiz diario de Liga BBVA con jugadores clásicos, rankings históricos, clubes, trayectorias y cromos desbloqueables.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/quiz-liga-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/quiz-liga-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function QuizLigaBBVA() {
  return <SeoGameLanding eyebrow="Quiz Liga BBVA" title="Quiz Liga BBVA" description={description} bullets={["Adivina futbolistas por pistas.", "Completa rankings reales y auditados.", "Construye tu álbum de cromos BBVA."]} />;
}
