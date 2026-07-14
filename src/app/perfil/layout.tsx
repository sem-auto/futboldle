import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://futboldle.es";
const title = "Perfil Futboldle | Estadisticas y progreso";
const description = "Gestiona tu perfil local de Futboldle, favoritos, estadisticas, progreso guardado y copia de seguridad.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/perfil` },
  openGraph: { title, description, url: `${SITE_URL}/perfil`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function PerfilLayout({ children }: { children: ReactNode }) {
  return children;
}
