import type { Metadata } from "next";
import BBVAGameRoute from "@/components/BBVAGameRoute";
import PlayableGameSeo from "@/components/PlayableGameSeo";

const SITE_URL = "https://futboldle.es";
const title = "Trayectoria BBVA | Adivina el jugador por su carrera";
const description = "Sigue las pistas de su trayectoria y descubre qu\u00e9 futbolista de la Liga BBVA es.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/trayectoria-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/trayectoria-bbva`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function TrayectoriaBBVAPage() {
  return (
    <PlayableGameSeo seasonHref="/liga-bbva" seasonLabel="Liga BBVA" title="Trayectoria BBVA" description={description} bullets={[
      "Pistas progresivas por clubes reales.",
      "Primer club reconocible y datos claros.",
      "Un reto diario para poner a prueba tu memoria futbolera.",
    ]}>
      <BBVAGameRoute mode="trayectoria" />
    </PlayableGameSeo>
  );
}
