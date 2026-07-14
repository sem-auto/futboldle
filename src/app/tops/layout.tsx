import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_URL = "https://futboldle.es";

export const metadata: Metadata = {
  title: "Tops internos BBVA - Futboldle",
  description: "Listado interno de tops de Liga BBVA para revision y juego diario en Futboldle.",
  alternates: { canonical: `${SITE_URL}/tops` },
  robots: { index: false, follow: false },
};

export default function TopsLayout({ children }: { children: ReactNode }) {
  return children;
}
