import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://futboldle.es";
const title = "Blog de fútbol nostalgia | Futboldle";
const description = "Historias, jugadores y guías para jugar a Futboldle: Hombres BBVA, wordle fútbol, Liga BBVA 2005-2016 y Mundiales.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title, description, url: `${SITE_URL}/blog`, type: "website", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

const articles = [
  {
    href: "/que-son-los-hombres-bbva",
    title: "Qué son los Hombres BBVA",
    description: "Origen, significado y nostalgia de los futbolistas que definen la Liga BBVA 2005-2016.",
  },
  {
    href: "/100-hombres-bbva",
    title: "100 Hombres BBVA",
    description: "Una lista de jugadores perfectos para recordar plantillas, cromos y partidos de aquella época.",
  },
  {
    href: "/jugadores-liga-bbva-2005-2016",
    title: "Jugadores Liga BBVA 2005-2016",
    description: "Guía por posiciones y clubes para entender la base de datos de Futboldle.",
  },
  {
    href: "/wordle-futbol",
    title: "Wordle fútbol",
    description: "Qué es un wordle de fútbol y cómo se juega en Futboldle.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Volver a Futboldle</Link>
        <section className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          <div className="px-5 py-7" style={{ background: "linear-gradient(135deg,#18181b,#c8920a)", color: "white" }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Contenido Futboldle</div>
            <h1 className="font-bebas text-[56px] leading-none mt-2">Blog de fútbol nostalgia</h1>
            <p className="text-[15px] text-white/80 mt-2">{description}</p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {articles.map((article) => (
              <Link key={article.href} href={article.href} className="rounded-2xl p-4 block" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
                <h2 className="font-bebas text-[30px] leading-none" style={{ color: "#18181b" }}>{article.title}</h2>
                <p className="text-[12px] mt-2" style={{ color: "#6b6b72" }}>{article.description}</p>
              </Link>
            ))}
          </div>
          <nav className="px-4 pb-4 flex flex-wrap gap-2">
            {[
              ["Jugar ahora", "/"],
              ["Wordle BBVA", "/wordle-bbva"],
              ["Mundialdle", "/mundialdle"],
              ["Top10 BBVA", "/top10-bbva"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-[11px] font-semibold px-3 py-2 rounded-xl" style={{ background: "#18181b", color: "white" }}>
                {label}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
