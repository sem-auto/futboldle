import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://futboldle.es";
const title = "Wordle fútbol | Juegos diarios para adivinar futbolistas";
const description = "Futboldle es un wordle de fútbol con retos diarios de Liga BBVA y Mundiales: adivina jugadores, trayectorias, rankings y cromos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/wordle-futbol` },
  openGraph: { title, description, url: `${SITE_URL}/wordle-futbol`, type: "article", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function WordleFutbolPage() {
  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <article className="max-w-3xl mx-auto rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <header className="px-5 py-7" style={{ background: "linear-gradient(135deg,#18181b,#174ea6)", color: "white" }}>
          <Link href="/blog" className="text-[12px] font-semibold text-white/70">← Blog Futboldle</Link>
          <h1 className="font-bebas text-[56px] leading-none mt-3">Wordle fútbol</h1>
          <p className="text-[15px] text-white/82 mt-2">{description}</p>
        </header>
        <div className="p-5 space-y-5">
          <p className="text-[15px] leading-7" style={{ color: "#3a3a3f" }}>
            Un wordle de fútbol mantiene la idea simple del juego original: pocos intentos, pistas visuales y una respuesta diaria.
            En Futboldle lo llevamos a futbolistas reconocibles, Liga BBVA, Mundiales, rankings históricos y colección de cromos.
          </p>
          <p className="text-[15px] leading-7" style={{ color: "#3a3a3f" }}>
            La gracia está en que se pueda jugar en menos de cinco minutos y compartir el resultado sin revelar la solución.
            Si recuerdas apellidos, clubes, selecciones y temporadas míticas, cada modo te da una forma distinta de probar memoria futbolera.
          </p>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Wordle BBVA", "/wordle-bbva", "Adivina el apellido del Hombre BBVA del día."],
              ["Wordle Mundial", "/world-cups/wordle", "Adivina el apellido de un mundialista."],
              ["Mundialdle", "/mundialdle", "Pistas progresivas de Mundiales."],
              ["Top10 BBVA", "/top10-bbva", "Completa rankings históricos."],
            ].map(([label, href, copy]) => (
              <Link key={href} href={href} className="rounded-2xl p-4 block" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
                <h2 className="font-bebas text-[28px] leading-none" style={{ color: "#18181b" }}>{label}</h2>
                <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{copy}</p>
              </Link>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}
