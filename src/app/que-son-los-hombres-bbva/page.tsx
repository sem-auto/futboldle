import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://futboldle.es";
const title = "Qué son los Hombres BBVA | Futboldle";
const description = "Origen, significado y jugadores icónicos de los Hombres BBVA: la nostalgia de la Liga BBVA 2005-2016 convertida en minijuegos diarios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/que-son-los-hombres-bbva` },
  openGraph: { title, description, url: `${SITE_URL}/que-son-los-hombres-bbva`, type: "article", images: [`${SITE_URL}/og-image.png`] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

const paragraphs = [
  "Los Hombres BBVA son una forma de recordar una época muy concreta del fútbol español: la Liga BBVA que va, en el imaginario popular, de mediados de los 2000 hasta mediados de los 2010. No son solo estrellas mundiales. Son esos jugadores que aparecen en una conversación entre amigos y provocan una sonrisa inmediata: un delantero que metía quince goles sin hacer ruido, un mediapunta de culto, un portero de equipo sufrido, un lateral que parecía llevar toda la vida en el mismo club.",
  "El término se ha hecho fuerte porque mezcla nostalgia, memoria futbolera y una sensación muy reconocible: la de recordar cromos, resúmenes, partidos de domingo, fichajes raros y plantillas que quizá no ganaron títulos, pero quedaron grabadas. Un Hombre BBVA no necesita ser Messi o Cristiano. De hecho, muchas veces la gracia está en el punto medio: jugadores suficientemente conocidos para que el aficionado los recuerde, pero no tan obvios como para que el juego pierda emoción.",
  "En Futboldle usamos esa idea como base de varios minijuegos diarios. Wordle BBVA propone adivinar el apellido de un futbolista de aquella etapa. Trayectoria BBVA juega con clubes reconocibles de su carrera. Top10 BBVA recupera rankings históricos. Statdle BBVA utiliza datos de temporada, posición y club. La intención es que cada reto se entienda rápido y produzca ese pequeño golpe de memoria: 'claro, este jugaba ahí'.",
  "La Liga BBVA 2005-2016 fue especialmente rica para este tipo de nostalgia. Estaban el Valencia de Villa, Silva, Mata y Joaquín; el Sevilla de Kanouté, Luis Fabiano, Palop, Rakitic y Jesús Navas; el Villarreal de Senna, Cazorla, Rossi y Bruno Soriano; el Deportivo tardío, el Málaga de Champions, el Betis de Rubén Castro, el Athletic de Iraola y Aduriz, el Atlético que pasó de Forlán y Agüero al equipo de Simeone, y muchos clubes medianos llenos de nombres inolvidables.",
  "También es una etapa perfecta porque conviven varias capas de recuerdo. Están los iconos absolutos, como Xavi, Iniesta, Casillas, Villa, Messi o Cristiano. Están los legendarios de club, como Valerón, Joaquín, Aduriz, Kanouté, Forlán, Cazorla o David Silva. Y están los cromos de culto: Barkero, Apoño, Duda, Pandiani, Munitis, Diego Castro, Chory Castro, Joan Verdú, Cani, Piti o Trashorras. Futboldle intenta respetar esas capas para que el juego sea divertido y no una enciclopedia imposible.",
  "La clave de un buen reto BBVA es el equilibrio. Si solo salen superestrellas, se resuelve demasiado fácil y no engancha. Si salen jugadores demasiado oscuros, el usuario siente que el juego le está haciendo trampa. Por eso la base de datos debe estar cuidada: jugadores reconocibles, trayectorias reales, rankings verificables y pistas que ayuden sin regalar la respuesta.",
  "Los Hombres BBVA no son una lista cerrada. Son una cultura compartida entre aficionados que crecieron viendo esa liga. Cada persona tiene los suyos. Para algunos será Diego Tristán; para otros, Duda. Para unos, Aimar; para otros, Cani. Esa subjetividad es parte del encanto, pero en los retos de Futboldle diferenciamos entre nostalgia subjetiva y datos objetivos. Los Top10, por ejemplo, tienen que estar verificados. Las trayectorias tienen que ser reales. El recuerdo puede ser emocional, pero el juego necesita credibilidad.",
  "Por eso Futboldle no quiere ser solo una página de preguntas sueltas. La idea es construir una rutina diaria: entrar, jugar, compartir el resultado, desbloquear cromos y volver mañana. La colección funciona como un álbum digital de recuerdos. Cada cromo recupera un jugador y una pequeña historia. La racha añade tensión diaria. Los resultados compartibles hacen que otros entren a probar si recuerdan más.",
  "Si buscas hombres BBVA, wordle fútbol, minijuegos de fútbol o juegos de fútbol nostalgia, Futboldle está pensado exactamente para eso: partidas cortas, memoria futbolera y nombres que no estaban en todos los titulares, pero sí en la cabeza de quien vivió aquella liga.",
];

export default function HombresBBVAPage() {
  return (
    <main className="min-h-dvh px-3 py-5" style={{ background: "#f6f2ea" }}>
      <article className="max-w-3xl mx-auto rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <header className="px-5 py-7" style={{ background: "linear-gradient(135deg,#18181b,#c8920a)", color: "white" }}>
          <Link href="/blog" className="text-[12px] font-semibold text-white/70">← Blog Futboldle</Link>
          <h1 className="font-bebas text-[56px] leading-none mt-3">Qué son los Hombres BBVA</h1>
          <p className="text-[15px] text-white/82 mt-2">{description}</p>
        </header>
        <div className="p-5 space-y-5">
          {paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)} className="text-[15px] leading-7" style={{ color: "#3a3a3f" }}>{paragraph}</p>)}
          <section className="rounded-2xl p-4" style={{ background: "#fffaf0", border: "1px solid rgba(200,146,10,0.18)" }}>
            <h2 className="font-bebas text-[32px] leading-none">Juega con la nostalgia BBVA</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link className="rounded-xl px-3 py-2 text-[12px] font-semibold" href="/wordle-bbva" style={{ background: "#18181b", color: "white" }}>Wordle BBVA</Link>
              <Link className="rounded-xl px-3 py-2 text-[12px] font-semibold" href="/trayectoria-bbva" style={{ background: "#18181b", color: "white" }}>Trayectoria BBVA</Link>
              <Link className="rounded-xl px-3 py-2 text-[12px] font-semibold" href="/top10-bbva" style={{ background: "#18181b", color: "white" }}>Top10 BBVA</Link>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
