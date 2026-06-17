"use client";

import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameResult } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import { buildProgressiveShare, shareGameResult } from "@/lib/resultShare";

type Case = {
  club: string;
  aliases: string[];
  clues: string[];
  note: string;
};

const MAX = 4;

const CASES: Case[] = [
  { club: "Valencia", aliases: ["valencia", "valencia cf"], clues: ["Villa", "Silva", "Mata", "Mestalla"], note: "La Valencia de Villa, Silva y Mata era cromo premium." },
  { club: "Real Madrid", aliases: ["real madrid", "madrid"], clues: ["Cristiano", "Casillas", "Sergio Ramos", "Bernabéu"], note: "El Madrid de Cristiano definió media era BBVA." },
  { club: "Barcelona", aliases: ["barcelona", "barça", "barca", "fc barcelona"], clues: ["Messi", "Xavi", "Iniesta", "Camp Nou"], note: "El Barça de Guardiola y Luis Enrique marcó una época." },
  { club: "Sevilla", aliases: ["sevilla", "sevilla fc"], clues: ["Kanouté", "Luis Fabiano", "Jesús Navas", "Palop"], note: "El Sevilla europeo marcó una época BBVA." },
  { club: "Villarreal", aliases: ["villarreal"], clues: ["Senna", "Riquelme", "Forlán", "Cazorla"], note: "El Submarino tuvo una colección de talentos inolvidable." },
  { club: "Málaga", aliases: ["malaga", "málaga"], clues: ["Duda", "Isco", "Joaquín", "Caballero"], note: "La Rosaleda vivió noches grandes con Pellegrini." },
  { club: "Deportivo", aliases: ["deportivo", "depor", "dépor"], clues: ["Valerón", "Makaay", "Riki", "Riazor"], note: "Riazor siempre tiene aroma a fútbol de otra época." },
  { club: "Betis", aliases: ["betis", "real betis"], clues: ["Joaquín", "Rubén Castro", "Beñat", "Heliópolis"], note: "Betis BBVA es alegría, zurdas y goles de Rubén Castro." },
  { club: "Atlético de Madrid", aliases: ["atletico", "atlético", "atletico de madrid", "atlético de madrid"], clues: ["Forlán", "Falcao", "Agüero", "Calderón"], note: "Del Kun a Falcao: el Atleti volvió a rugir." },
  { club: "Athletic Club", aliases: ["athletic", "athletic club", "athletic bilbao"], clues: ["Iraola", "Aduriz", "Muniain", "San Mamés"], note: "San Mamés siempre fue territorio de jugadores reconocibles." },
  { club: "Real Sociedad", aliases: ["real sociedad", "la real", "sociedad"], clues: ["Xabi Prieto", "Griezmann", "Vela", "Anoeta"], note: "La Real de la era BBVA tenía muchísimo talento reconocible." },
  { club: "Celta de Vigo", aliases: ["celta", "celta de vigo"], clues: ["Iago Aspas", "Nolito", "Orellana", "Balaídos"], note: "Balaídos fue una fábrica de cromos de culto." },
  { club: "Espanyol", aliases: ["espanyol", "rcd espanyol"], clues: ["Tamudo", "Luis García", "Kiko Casilla", "Cornellà"], note: "El Espanyol tiene mucho cromo de culto BBVA." },
  { club: "Racing Santander", aliases: ["racing", "racing santander"], clues: ["Munitis", "Colsa", "Canales", "El Sardinero"], note: "Racing es nostalgia directa para quien vivió esa Liga." },
  { club: "Zaragoza", aliases: ["zaragoza", "real zaragoza"], clues: ["Aimar", "Milito", "D'Alessandro", "La Romareda"], note: "El Zaragoza de mediados de los 2000 era puro fútbol de sobremesa." },
  { club: "Mallorca", aliases: ["mallorca", "rcd mallorca"], clues: ["Eto'o", "Aduriz", "Webó", "Son Moix"], note: "Mallorca dejó delanteros y recuerdos muy de Hombres BBVA." },
  { club: "Osasuna", aliases: ["osasuna"], clues: ["Raúl García", "Pandiani", "Puñal", "El Sadar"], note: "El Sadar siempre fue uno de los campos más reconocibles de aquella Liga." },
  { club: "Getafe", aliases: ["getafe"], clues: ["Soldado", "Güiza", "Pedro León", "Coliseum"], note: "Getafe tuvo mucho jugador de culto en la era BBVA." },
  { club: "Levante", aliases: ["levante"], clues: ["Barkero", "Koné", "Keylor Navas", "Ciutat"], note: "El Levante de veteranos fue una de las grandes nostalgias de la época." },
  { club: "Rayo Vallecano", aliases: ["rayo", "rayo vallecano"], clues: ["Piti", "Trashorras", "Michu", "Vallecas"], note: "Vallecas es sinónimo de fútbol reconocible y valentía." },
  { club: "Granada", aliases: ["granada"], clues: ["Brahimi", "Mikel Rico", "Siqueira", "Los Cármenes"], note: "Granada reunió varios cromos muy recordables en su regreso a Primera." },
];

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

function getClubSuggestions(query: string) {
  const q = fold(query);
  if (q.length < 2) return [];
  const clubs = Array.from(new Set([
    ...CASES.map(item => item.club),
    ...bbvaPlayers.flatMap(player => player.clubs),
  ]));
  return clubs
    .map(club => {
      const normalized = fold(club);
      const words = club.split(/\s+/).map(fold);
      const score = normalized.startsWith(q) ? 0 : words.some(word => word.startsWith(q)) ? 1 : normalized.includes(q) ? 2 : 99;
      return { club, score };
    })
    .filter(item => item.score < 99)
    .sort((a, b) => a.score - b.score || a.club.length - b.club.length || a.club.localeCompare(b.club, "es"))
    .slice(0, 8)
    .map(item => item.club);
}

function getCase() {
  return CASES[(getDayNumber() * 7 + 3) % CASES.length];
}

function rewardPlayer(club: string) {
  const pool = bbvaPlayers.filter(player => player.mainClub === club || player.clubs.includes(club));
  return pool.length ? pool[(getDayNumber() * 7) % pool.length] : null;
}

export default function ClubOcultoBBVA({ onBack }: { onBack: () => void }) {
  const item = useMemo(getCase, []);
  const storeKey = `fbl-club-oculto-${getDayKey()}`;
  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [won, setWon] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const shownClues = done ? item.clues : item.clues.slice(0, Math.min(item.clues.length, 2 + guesses.length));
  const suggestions = hideSuggestions ? [] : getClubSuggestions(query);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        const saved = JSON.parse(raw);
        setGuesses(Array.isArray(saved.guesses) ? saved.guesses : []);
        setDone(!!saved.done);
        setWon(!!saved.won);
      }
    } catch {}
    trackEvent("game_started", { game: "club_oculto" });
  }, [storeKey]);

  function submit() {
    if (done || !query.trim()) return;
    const normalized = fold(query);
    const ok = item.aliases.some(alias => fold(alias) === normalized);
    const nextGuesses = [...guesses, query.trim()];
    const finished = ok || nextGuesses.length >= MAX;
    setGuesses(nextGuesses);
    setQuery("");
    if (finished) {
      setDone(true);
      setWon(ok);
      try { localStorage.setItem(storeKey, JSON.stringify({ guesses: nextGuesses, done: true, won: ok })); } catch {}
      recordGameResult("clubOculto", getDayKey(), ok);
      if (ok) {
        const reward = rewardPlayer(item.club);
        if (reward) unlockPlayer(reward.id, "Club oculto");
      }
      trackEvent("game_completed", { game: "club_oculto", won: ok, attempts: nextGuesses.length });
    } else {
      try { localStorage.setItem(storeKey, JSON.stringify({ guesses: nextGuesses, done: false, won: false })); } catch {}
    }
  }

  async function share() {
    const rows = Array.from({ length: MAX }, (_, index) => {
      if (won && index === guesses.length - 1) return "🟩";
      if (index < guesses.length) return "🟨";
      return "⬛";
    }).join("");
    const text = buildProgressiveShare("Club Oculto", rows, guesses.length, won, "intentos");
    shareGameResult(text, {
      modeId: "club-oculto",
      challengeId: `${getDayKey()}-${item.club}`,
      seasonId: "bbva",
      won,
      attempts: guesses.length,
      title: "Club Oculto",
      onCopied: () => { setCopied(true); setTimeout(() => setCopied(false), 1800); },
    });
  }

  return (
    <div className="flex flex-col gap-3 pb-[calc(4rem+env(safe-area-inset-bottom))] max-w-[100vw] overflow-x-hidden">
      <button onClick={onBack} className="self-start text-[11px] font-semibold opacity-60 hover:opacity-100" style={{ color: "#3a3a3f" }}>← Volver</button>
      <section className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}>
        <div className="px-5 py-4" style={{ background: "linear-gradient(135deg,#1a4fa0,#356fd0)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 mb-2">Reto rápido · #{getDayNumber()}</div>
          <h2 className="font-bebas text-[32px] leading-none text-white">CLUB OCULTO</h2>
          <p className="text-[11px] text-white/75 mt-1">Adivina el club por sus nombres de época.</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {shownClues.map(clue => (
              <div key={clue} className="rounded-xl px-3 py-3 text-center font-oswald font-semibold text-[13px]" style={{ background: "#f4f7ff", border: "1px solid rgba(26,79,160,0.16)", color: "#1a4fa0" }}>{clue}</div>
            ))}
          </div>

          {!done ? (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input value={query} onChange={event => { setQuery(event.target.value); setHideSuggestions(false); }} onKeyDown={event => {
                  if (event.key !== "Enter") return;
                  if (suggestions.length > 0) { setQuery(suggestions[0]); setHideSuggestions(true); }
                  else submit();
                }}
                  placeholder="Escribe el club" className="w-full px-4 py-3 rounded-xl outline-none text-[14px]"
                  style={{ background: "#f8f5f0", border: "1px solid rgba(0,0,0,0.10)", color: "#18181b" }} />
                {suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden max-h-72 overflow-y-auto"
                    style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                    {suggestions.map(club => (
                      <button key={club} onMouseDown={event => { event.preventDefault(); setQuery(club); setHideSuggestions(true); }}
                        className="w-full px-4 py-2.5 text-left border-b last:border-0 font-oswald font-semibold text-[13px]"
                        style={{ borderColor: "rgba(0,0,0,0.06)", color: "#18181b" }}>
                        {club}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={submit} className="font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: "#1a4fa0", color: "white" }}>Probar</button>
              <div className="text-center text-[10px]" style={{ color: "#9a9a8a" }}>{MAX - guesses.length} intentos</div>
            </div>
          ) : (
            <div className="rounded-xl p-4" style={{ background: won ? "#f0faf2" : "#fff5f5", border: `1px solid ${won ? "rgba(30,107,46,0.22)" : "rgba(184,28,20,0.18)"}` }}>
              <div className="font-bebas text-[24px] leading-none" style={{ color: won ? "#1e6b2e" : "#b81c14" }}>{won ? item.club.toUpperCase() : `ERA ${item.club.toUpperCase()}`}</div>
              <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{item.note}</p>
              <button onClick={share} className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir"}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
