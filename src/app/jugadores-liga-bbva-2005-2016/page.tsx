import type { Metadata } from "next";
import Link from "next/link";
import { bbvaPlayers } from "@/data/bbvaPlayers";

const SITE_URL = "https://futboldle.es";
const title = "Jugadores Liga BBVA 2005-2016 | Futboldle";
const description = "Guía de futbolistas de la Liga BBVA 2005-2016 para jugar a Futboldle: clubes, posiciones y nombres recordados de la época.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/jugadores-liga-bbva-2005-2016` },
  openGraph: { title, description, url: `${SITE_URL}/jugadores-liga-bbva-2005-2016`, type: "article", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

const byPosition = ["Portero", "Defensa", "Centrocampista", "Delantero"].map((position) => ({
  position,
  players: bbvaPlayers.filter((player) => player.position === position).slice(0, 24),
}));

export default function JugadoresLigaBBVAPage() {
  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <header className="px-5 py-7" style={{ background: "linear-gradient(135deg,#18181b,#1f7a3a)", color: "white" }}>
          <Link href="/blog" className="text-[12px] font-semibold text-white/70">← Blog Futboldle</Link>
          <h1 className="font-bebas text-[56px] leading-none mt-3">Jugadores Liga BBVA 2005-2016</h1>
          <p className="text-[15px] text-white/82 mt-2">{description}</p>
        </header>
        <div className="p-5 space-y-6">
          <p className="text-[14px] leading-7" style={{ color: "#3a3a3f" }}>
            Futboldle usa esta época como Temporada 1 porque concentra una cantidad enorme de futbolistas memorables:
            iconos, jugadores de club, delanteros de racha, porteros míticos y nombres de culto que hacen divertida una partida diaria.
          </p>
          {byPosition.map((group) => (
            <section key={group.position}>
              <h2 className="font-bebas text-[34px] leading-none" style={{ color: "#18181b" }}>{group.position}s</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                {group.players.map((player) => (
                  <div key={player.id} className="rounded-xl p-3 text-[12px]" style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <strong>{player.displayName}</strong>
                    <span className="block" style={{ color: "#6b6b72" }}>{player.mainClub}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
          <Link href="/" className="block text-center font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: "#18181b", color: "white" }}>Jugar a Futboldle</Link>
        </div>
      </div>
    </main>
  );
}
