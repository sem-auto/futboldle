import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liga BBVA 2005-2016 | Hombres BBVA y futbol nostalgia",
  description: "Minijuegos diarios de la Liga BBVA 2005-2016: Wordle de futbolistas, trayectorias, Top10 y Statdle.",
  alternates: { canonical: "https://futboldle.es/temporadas/liga-bbva" },
  openGraph: { title: "Liga BBVA 2005-2016 - Futboldle", description: "Los Hombres BBVA vuelven en minijuegos diarios.", url: "https://futboldle.es/temporadas/liga-bbva", images: ["https://futboldle.es/og-image.png"] },
};

const games = [{ href: "/wordle-bbva", name: "Wordle BBVA" }, { href: "/trayectoria-bbva", name: "Trayectoria BBVA" }, { href: "/top10-bbva", name: "Top10 BBVA" }, { href: "/statdle-bbva", name: "Statdle BBVA" }];

export default function BbvaSeasonSeoPage() {
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Que es Futboldle Liga BBVA?", acceptedAnswer: { "@type": "Answer", text: "Una coleccion gratuita de minijuegos diarios sobre jugadores y equipos de LaLiga entre 2005 y 2016." } }, { "@type": "Question", name: "Hay un reto nuevo cada dia?", acceptedAnswer: { "@type": "Answer", text: "Si. Los retos principales cambian cada dia y guardan el progreso en el navegador." } }] };
  return <main className="min-h-dvh px-4 py-8" style={{ background: "#f6f2ea" }}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} /><article className="max-w-3xl mx-auto"><Link href="/" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Futboldle</Link><header className="mt-5 rounded-3xl p-6" style={{ background: "linear-gradient(135deg,#c8920a,#18181b)", color: "white" }}><div className="text-[10px] uppercase font-semibold tracking-[0.2em]">Temporada activa</div><h1 className="font-bebas text-[54px] leading-none mt-2">LIGA BBVA 2005-2016</h1><p className="text-[14px] mt-2 text-white/80">Minijuegos para recordar a los futbolistas, equipos y momentos de la liga que echamos de menos.</p></header><section className="grid sm:grid-cols-2 gap-3 mt-4">{games.map(game => <Link key={game.href} href={game.href} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}><h2 className="font-bebas text-[28px]">{game.name}</h2><span className="text-[11px] font-semibold" style={{ color: "#c8920a" }}>Jugar ahora {"\u2192"}</span></Link>)}</section><section className="mt-5"><h2 className="font-bebas text-[32px]">HOMBRES BBVA, CADA DIA</h2><p className="text-[14px] leading-relaxed" style={{ color: "#555" }}>Rankings verificados, trayectorias reconocibles y futbolistas que marcaron una epoca. Cada partida desbloquea cromos y alimenta tu racha.</p></section></article></main>;
}
