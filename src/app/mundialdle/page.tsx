import type { Metadata } from "next";
import Link from "next/link";
import Mundialdle from "@/components/Mundialdle";

const SITE_URL = "https://futboldle.es";
const title = "Mundialdle | Adivina el jugador mundialista - Futboldle";
const description = "Juega a Mundialdle: adivina jugadores de los Mundiales con pistas progresivas de seleccion, club, posicion, goles y rol.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/mundialdle` },
  keywords: ["mundialdle", "adivinar jugador mundial", "juego mundialistas", "wordle mundial futbol", "minijuegos futbol"],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/mundialdle`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Mundialdle Futboldle" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Mundialdle",
  url: `${SITE_URL}/mundialdle`,
  description,
  applicationCategory: "Game",
  gamePlatform: "Web",
  genre: ["Football trivia", "Word game", "Sports nostalgia"],
  inLanguage: "es",
  isPartOf: {
    "@type": "VideoGame",
    name: "Futboldle",
    url: SITE_URL,
  },
};

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Futboldle", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Mundiales", item: `${SITE_URL}/world-cups` },
    { "@type": "ListItem", position: 3, name: "Mundialdle", item: `${SITE_URL}/mundialdle` },
  ],
};

export default function MundialdleLandingPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver a Futboldle</Link>
        <section className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#174ea6" }}>Minijuego diario de Mundiales</div>
          <h1 className="font-bebas text-[40px] leading-none mt-1" style={{ color: "#18181b" }}>Mundialdle</h1>
          <p className="text-[13px] mt-1" style={{ color: "#6b6b72" }}>
            Adivina el jugador mundialista con pistas de seleccion, posicion, club, rol y Mundial.
          </p>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            ["Selecciones", "Espana, Alemania, Argentina, Brasil, Italia, Francia y mas."],
            ["Pistas claras", "Mundial, rol, goles, seleccion, posicion y club del momento."],
            ["Nostalgia", "Jugadores reconocibles de 2002 a 2026, sin relleno oscuro."],
          ].map(([heading, copy]) => (
            <article key={heading} className="rounded-2xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
              <h2 className="font-bebas text-[24px] leading-none" style={{ color: "#18181b" }}>{heading}</h2>
              <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{copy}</p>
            </article>
          ))}
        </section>
        <Mundialdle />
      </div>
    </main>
  );
}
