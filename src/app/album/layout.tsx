import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://futboldle.es";
const title = "Album Futboldle | Cromos BBVA y Mundiales";
const description = "Consulta tu album de cromos Futboldle, desbloqueos de Liga BBVA, jugadores mundialistas, rarezas y colecciones.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/album` },
  openGraph: { title, description, url: `${SITE_URL}/album`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function AlbumLayout({ children }: { children: ReactNode }) {
  return children;
}
