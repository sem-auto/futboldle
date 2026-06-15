import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://futboldle.es";
const title = "Liga BBVA 2005-2016 | Hombres BBVA y futbol nostalgia - Futboldle";
const description = "Minijuegos diarios de Liga BBVA 2005-2016: Wordle BBVA, Trayectoria BBVA, Top10 BBVA, Statdle y cromos de futbol nostalgia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/liga-bbva` },
  keywords: ["hombres bbva", "futbol nostalgia", "liga bbva 2005 2016", "jugadores liga espanola antiguos", "wordle futbol", "minijuegos liga espanola"],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/liga-bbva`,
    siteName: "Futboldle",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Futboldle Liga BBVA" }],
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
  name: "Futboldle Liga BBVA",
  url: `${SITE_URL}/liga-bbva`,
  description,
  applicationCategory: "Game",
  gamePlatform: "Web",
  genre: ["Football trivia", "Word game", "Sports nostalgia"],
  inLanguage: "es",
};

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Futboldle", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Liga BBVA", item: `${SITE_URL}/liga-bbva` },
  ],
};

export default function LigaBBVALandingPage() {
  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver a Futboldle</Link>
        <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          <div className="px-5 py-7" style={{ background: "linear-gradient(135deg,#c0241c,#18181b)", color: "white" }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Temporada principal</div>
            <h1 className="font-bebas text-[54px] leading-none mt-2">Liga BBVA 2005-2016</h1>
            <p className="text-[15px] text-white/80 mt-2">Hombres BBVA, futbol nostalgia y minijuegos diarios para recordar aquella Liga.</p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Wordle BBVA", "Adivina el apellido del jugador."],
              ["Trayectoria BBVA", "Reconoce al futbolista por sus clubes."],
              ["Top10 BBVA", "Completa rankings historicos verificados."],
              ["Statdle BBVA", "Adivina por estadisticas de temporada."],
            ].map(([mode, copy]) => (
              <article key={mode} className="rounded-2xl p-4" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
                <h2 className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{mode}</h2>
                <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{copy}</p>
              </article>
            ))}
          </div>
          <div className="px-4 pb-4">
            <Link href="/" className="block text-center font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl"
              style={{ background: "#18181b", color: "white" }}>
              Jugar ahora
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
