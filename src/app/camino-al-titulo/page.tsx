import type { Metadata } from "next";
import Link from "next/link";
import CaminoTitulo from "@/components/CaminoTitulo";

const SITE_URL = "https://futboldle.es";
const title = "Camino al Título | Adivina el campeón mundial - Futboldle";
const description = "Adivina la selección campeona por su camino en el Mundial. Un minijuego de fútbol nostalgia dentro de Futboldle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/camino-al-titulo` },
  keywords: ["camino al titulo", "mundiales fifa", "adivinar campeon mundial", "juegos de futbol", "futboldle"],
  openGraph: { title, description, url: `${SITE_URL}/camino-al-titulo`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function CaminoAlTituloPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver a Mundiales</Link>
        <CaminoTitulo />
      </div>
    </main>
  );
}
