import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://futboldle.es";
const title = "Vitrina Futboldle | Trofeos y logros";
const description = "Consulta la vitrina de trofeos Futboldle, logros de coleccion, rachas y recompensas desbloqueadas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/vitrina` },
  openGraph: { title, description, url: `${SITE_URL}/vitrina`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function VitrinaLayout({ children }: { children: ReactNode }) {
  return children;
}
