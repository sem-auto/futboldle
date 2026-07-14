import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://futboldle.es";
const title = "Progreso Futboldle | Rachas, cromos y logros";
const description = "Revisa tu progreso en Futboldle: partidas, victorias, rachas, cromos, trofeos y recompensas desbloqueadas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/progreso` },
  openGraph: { title, description, url: `${SITE_URL}/progreso`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function ProgresoLayout({ children }: { children: ReactNode }) {
  return children;
}
