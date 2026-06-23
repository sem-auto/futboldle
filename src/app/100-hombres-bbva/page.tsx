import type { Metadata } from "next";
import Link from "next/link";
import { bbvaPlayers } from "@/data/bbvaPlayers";

const SITE_URL = "https://futboldle.es";
const title = "100 Hombres BBVA | Jugadores históricos de la Liga BBVA";
const description = "Lista de 100 jugadores recordados de la Liga BBVA 2005-2016: leyendas, futbolistas de culto y nombres perfectos para jugar a Futboldle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/100-hombres-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/100-hombres-bbva`, type: "article", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

const players = bbvaPlayers.slice(0, 100);

export default function CienHombresBBVAPage() {
  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <header className="px-5 py-7" style={{ background: "linear-gradient(135deg,#18181b,#c8920a)", color: "white" }}>
          <Link href="/blog" className="text-[12px] font-semibold text-white/70">← Blog Futboldle</Link>
          <h1 className="font-bebas text-[56px] leading-none mt-3">100 Hombres BBVA</h1>
          <p className="text-[15px] text-white/82 mt-2">{description}</p>
        </header>
        <section className="p-5">
          <p className="text-[14px] leading-7" style={{ color: "#3a3a3f" }}>
            Esta lista parte de la base de Futboldle y reúne nombres reconocibles para quienes vivieron la Liga BBVA:
            porteros, defensas, centrocampistas y delanteros que funcionan como memoria colectiva del fútbol español.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {players.map((player, index) => (
              <article key={player.id} className="rounded-2xl p-3" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
                <div className="text-[10px] font-semibold" style={{ color: "#c8920a" }}>#{index + 1}</div>
                <h2 className="font-bebas text-[26px] leading-none" style={{ color: "#18181b" }}>{player.displayName}</h2>
                <p className="text-[11px]" style={{ color: "#6b6b72" }}>{player.mainClub} · {player.position}</p>
              </article>
            ))}
          </div>
          <nav className="flex flex-wrap gap-2 mt-6">
            <Link className="rounded-xl px-3 py-2 text-[12px] font-semibold" href="/que-son-los-hombres-bbva" style={{ background: "#18181b", color: "white" }}>Qué son los Hombres BBVA</Link>
            <Link className="rounded-xl px-3 py-2 text-[12px] font-semibold" href="/wordle-bbva" style={{ background: "#18181b", color: "white" }}>Jugar Wordle BBVA</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
