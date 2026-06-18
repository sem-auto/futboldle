import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mundiales de futbol | Mundialdle y Wordle Mundial",
  description: "Adivina jugadores mundialistas, campeones y caminos al titulo en los minijuegos diarios de Futboldle.",
  alternates: { canonical: "https://futboldle.es/temporadas/mundiales" },
  openGraph: { title: "Mundiales - Futboldle", description: "Mundialdle, Wordle Mundial y retos de campeones.", url: "https://futboldle.es/temporadas/mundiales", images: ["https://futboldle.es/og-image.png"] },
};

const games = [{ href: "/world-cups/mundialdle", name: "Mundialdle" }, { href: "/world-cups/wordle", name: "Wordle Mundial" }, { href: "/world-cups/champions", name: "Campeones" }, { href: "/world-cups/camino", name: "Camino al Titulo" }];

export default function WorldCupsSeasonSeoPage() {
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Que es Mundialdle?", acceptedAnswer: { "@type": "Answer", text: "Un juego diario para adivinar un futbolista mundialista mediante pistas progresivas." } }, { "@type": "Question", name: "Que juegos de Mundiales hay?", acceptedAnswer: { "@type": "Answer", text: "Mundialdle, Wordle Mundial, Campeones del Mundo y Camino al Titulo." } }] };
  return <main className="min-h-dvh px-4 py-8" style={{ background: "#f6f2ea" }}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} /><article className="max-w-3xl mx-auto"><Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Futboldle</Link><header className="mt-5 rounded-3xl p-6" style={{ background: "linear-gradient(135deg,#174ea6,#0f172a)", color: "white" }}><div className="text-[10px] uppercase font-semibold tracking-[0.2em]">Temporada 2</div><h1 className="font-bebas text-[54px] leading-none mt-2">MUNDIALES</h1><p className="text-[14px] mt-2 text-white/80">Jugadores, selecciones, campeones y grandes recuerdos del torneo mas importante.</p></header><section className="grid sm:grid-cols-2 gap-3 mt-4">{games.map(game => <Link key={game.href} href={game.href} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(23,78,166,0.16)" }}><h2 className="font-bebas text-[28px]">{game.name}</h2><span className="text-[11px] font-semibold" style={{ color: "#174ea6" }}>Jugar ahora {"\u2192"}</span></Link>)}</section><Link href="/world-cups/collection" className="block rounded-2xl p-4 mt-4" style={{ background: "#fff8e6", border: "1px solid rgba(200,146,10,0.24)" }}><h2 className="font-bebas text-[28px]">COLECCION MUNDIALISTA</h2><p className="text-[12px]" style={{ color: "#6b6b72" }}>Desbloquea cromos de leyendas, campeones y heroes inesperados.</p></Link></article></main>;
}
