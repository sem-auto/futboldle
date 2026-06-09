"use client";

import { useEffect, useMemo, useState } from "react";
import { bbvaPlayers } from "@/data/bbvaPlayers";
import { getDayKey, getDayNumber } from "@/lib/daily";
import { unlockPlayer } from "@/lib/album";
import { recordGameResult } from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";
import { shareResult } from "@/lib/share";

type Role = "POR" | "DEF" | "MED" | "DEL";
type Slot = { id: string; role: Role; club: string; season: string; accepted: string[] };
type DailyXI = { title: string; formation: string; note: string; slots: Slot[] };
type FilledSlot = { slotId: string; playerName: string; playerId?: number };
type Choice = { playerName: string; slots: Slot[] } | null;

const ROLE_COLORS: Record<Role, string> = {
  POR: "#c8920a",
  DEF: "#1a4fa0",
  MED: "#1e6b2e",
  DEL: "#b81c14",
};

const DAILY_XIS: DailyXI[] = [
  {
    title: "Once hombres BBVA",
    formation: "3-4-3",
    note: "Cada casilla pide una posición y un equipo. Escribe cualquier jugador del once y se coloca donde encaje.",
    slots: [
      { id: "del1", role: "DEL", club: "Sevilla", season: "2015/16", accepted: ["Gameiro", "Konoplyanka", "Vitolo", "Reyes", "Llorente", "Immobile"] },
      { id: "del2", role: "DEL", club: "Atlético de Madrid", season: "2011/12", accepted: ["Falcao", "Adrián López", "Diego Costa", "Salvio"] },
      { id: "del3", role: "DEL", club: "Valencia", season: "2011/12", accepted: ["Soldado", "Jonas", "Aduriz", "Piatti"] },
      { id: "med1", role: "MED", club: "Sevilla", season: "2014/15", accepted: ["Iborra", "M'Bia", "Krychowiak", "Banega", "Reyes", "Denis Suárez", "Aleix Vidal"] },
      { id: "med2", role: "MED", club: "Villarreal", season: "2010/11", accepted: ["Senna", "Bruno Soriano", "Borja Valero", "Cazorla", "Cani"] },
      { id: "med3", role: "MED", club: "Valencia", season: "2011/12", accepted: ["Banega", "Albelda", "Tino Costa", "Parejo", "Canales", "Feghouli"] },
      { id: "def1", role: "DEF", club: "Espanyol", season: "2013/14", accepted: ["Sidnei", "Héctor Moreno", "Javi López", "Víctor Sánchez"] },
      { id: "def2", role: "DEF", club: "Atlético de Madrid", season: "2013/14", accepted: ["Juanfran", "Miranda", "Godín", "Filipe Luís"] },
      { id: "def3", role: "DEF", club: "Valencia", season: "2014/15", accepted: ["Otamendi", "Mustafi", "Gayà", "Barragán"] },
      { id: "por", role: "POR", club: "Málaga", season: "2012/13", accepted: ["Caballero", "Kameni"] },
    ],
  },
  {
    title: "Once archivo BBVA",
    formation: "4-3-3",
    note: "Plantillas reconocibles de la era BBVA, con nombres de plantilla que no tienen por qué salir en otros modos.",
    slots: [
      { id: "del1", role: "DEL", club: "Betis", season: "2012/13", accepted: ["Rubén Castro", "Jorge Molina", "Joel Campbell"] },
      { id: "del2", role: "DEL", club: "Villarreal", season: "2010/11", accepted: ["Rossi", "Nilmar", "Marco Ruben"] },
      { id: "del3", role: "DEL", club: "Málaga", season: "2012/13", accepted: ["Saviola", "Santa Cruz", "Eliseu", "Joaquín"] },
      { id: "med1", role: "MED", club: "Athletic Club", season: "2011/12", accepted: ["Iturraspe", "Ander Herrera", "De Marcos", "Muniain", "Susaeta", "Gurpegui"] },
      { id: "med2", role: "MED", club: "Real Sociedad", season: "2012/13", accepted: ["Xabi Prieto", "Zurutuza", "Illarramendi", "Markel", "Griezmann", "Carlos Vela"] },
      { id: "med3", role: "MED", club: "Getafe", season: "2011/12", accepted: ["Diego Castro", "Gavilán", "Casquero", "Lacen", "Parejo"] },
      { id: "def1", role: "DEF", club: "Deportivo", season: "2008/09", accepted: ["Lopo", "Filipe Luís", "Manuel Pablo", "Colotto"] },
      { id: "def2", role: "DEF", club: "Sevilla", season: "2013/14", accepted: ["Coke", "Fazio", "Pareja", "Carriço", "Fernando Navarro", "Alberto Moreno"] },
      { id: "def3", role: "DEF", club: "Barcelona", season: "2010/11", accepted: ["Puyol", "Piqué", "Dani Alves", "Abidal", "Mascherano"] },
      { id: "def4", role: "DEF", club: "Villarreal", season: "2010/11", accepted: ["Capdevila", "Mario Gaspar", "Musacchio", "Marchena", "Ángel López"] },
      { id: "por", role: "POR", club: "Espanyol", season: "2013/14", accepted: ["Kiko Casilla"] },
    ],
  },
  {
    title: "Once nostalgia pura",
    formation: "4-4-2",
    note: "Más que estrellas: jugadores de domingo de Liga, camisetas viejas y memoria de bar.",
    slots: [
      { id: "del1", role: "DEL", club: "Celta de Vigo", season: "2015/16", accepted: ["Nolito", "Iago Aspas", "Guidetti", "Orellana"] },
      { id: "del2", role: "DEL", club: "Osasuna", season: "2010/11", accepted: ["Pandiani", "Aranda", "Nino", "Juanfran"] },
      { id: "med1", role: "MED", club: "Rayo Vallecano", season: "2011/12", accepted: ["Trashorras", "Piti", "Michu", "Movilla", "Lass"] },
      { id: "med2", role: "MED", club: "Málaga", season: "2011/12", accepted: ["Cazorla", "Isco", "Duda", "Camacho", "Apoño", "Toulalan"] },
      { id: "med3", role: "MED", club: "Mallorca", season: "2011/12", accepted: ["Chory Castro", "Martí", "Nsue", "Víctor Casadesús"] },
      { id: "med4", role: "MED", club: "Racing Santander", season: "2008/09", accepted: ["Munitis", "Colsa", "Lacen", "Serrano"] },
      { id: "def1", role: "DEF", club: "Granada", season: "2013/14", accepted: ["Nyom", "Murillo", "Mainz", "Brayan Angulo"] },
      { id: "def2", role: "DEF", club: "Levante", season: "2011/12", accepted: ["Ballesteros", "Juanfran", "Nano", "Del Horno"] },
      { id: "def3", role: "DEF", club: "Sevilla", season: "2009/10", accepted: ["Escudé", "Squillaci", "Fernando Navarro", "Adriano"] },
      { id: "def4", role: "DEF", club: "Valencia", season: "2010/11", accepted: ["Jordi Alba", "Mathieu", "Marchena", "Miguel", "Ricardo Costa"] },
      { id: "por", role: "POR", club: "Villarreal", season: "2015/16", accepted: ["Areola", "Asenjo"] },
    ],
  },
];

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

function getDailyXI() {
  return DAILY_XIS[(getDayNumber() * 7 + 3) % DAILY_XIS.length];
}

function findGlobalPlayer(name: string) {
  const key = fold(name);
  return bbvaPlayers.find(player =>
    [player.answer, player.displayName, player.fullName].some(value => {
      const playerKey = fold(value);
      return playerKey === key || playerKey.includes(key) || key.includes(playerKey);
    })
  );
}

function canonicalName(input: string, names: string[]) {
  const key = fold(input);
  return names.find(name => fold(name) === key) ?? null;
}

function allOpenNames(slots: Slot[], filled: FilledSlot[]) {
  const usedSlots = new Set(filled.map(item => item.slotId));
  const usedNames = new Set(filled.map(item => fold(item.playerName)));
  return Array.from(new Set(
    slots
      .filter(slot => !usedSlots.has(slot.id))
      .flatMap(slot => slot.accepted)
      .filter(name => !usedNames.has(fold(name)))
  ));
}

function getSuggestions(query: string, names: string[]) {
  const q = fold(query);
  if (q.length < 2) return [];
  return names
    .map(name => ({ name, score: fold(name).startsWith(q) ? 0 : fold(name).includes(q) ? 1 : 99 }))
    .filter(item => item.score < 99)
    .sort((a, b) => a.score - b.score || a.name.length - b.name.length || a.name.localeCompare(b.name, "es"))
    .slice(0, 8)
    .map(item => item.name);
}

function openMatchingSlots(slots: Slot[], filled: FilledSlot[], playerName: string) {
  const usedSlots = new Set(filled.map(item => item.slotId));
  const key = fold(playerName);
  return slots.filter(slot =>
    !usedSlots.has(slot.id) &&
    slot.accepted.some(name => fold(name) === key)
  );
}

function filledEntry(filled: FilledSlot[], slot: Slot) {
  return filled.find(entry => entry.slotId === slot.id) ?? null;
}

function roleRows(slots: Slot[]) {
  return {
    DEL: slots.filter(slot => slot.role === "DEL"),
    MED: slots.filter(slot => slot.role === "MED"),
    DEF: slots.filter(slot => slot.role === "DEF"),
    POR: slots.filter(slot => slot.role === "POR"),
  } as Record<Role, Slot[]>;
}

export default function OnceBBVA({ onBack }: { onBack: () => void }) {
  const xi = useMemo(getDailyXI, []);
  const storeKey = `fbl-once-v6-${getDayKey()}`;
  const [filled, setFilled] = useState<FilledSlot[]>([]);
  const [misses, setMisses] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [choice, setChoice] = useState<Choice>(null);
  const [done, setDone] = useState(false);
  const [won, setWon] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const rows = roleRows(xi.slots);
  const openNames = allOpenNames(xi.slots, filled);
  const suggestions = getSuggestions(query, openNames);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        const saved = JSON.parse(raw);
        setFilled(Array.isArray(saved.filled) ? saved.filled : []);
        setMisses(Array.isArray(saved.misses) ? saved.misses : []);
        setDone(!!saved.done);
        setWon(!!saved.won);
      }
    } catch {}
    trackEvent("game_started", { game: "once_bbva", team: xi.title });
  }, [storeKey, xi.title]);

  function flash(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 1600);
  }

  function persist(nextFilled: FilledSlot[], nextMisses: string[], nextDone: boolean, nextWon: boolean) {
    try {
      localStorage.setItem(storeKey, JSON.stringify({ filled: nextFilled, misses: nextMisses, done: nextDone, won: nextWon }));
    } catch {}
  }

  function finish(nextFilled: FilledSlot[], nextMisses: string[]) {
    setDone(true);
    setWon(true);
    persist(nextFilled, nextMisses, true, true);
    recordGameResult("once", `${getDayKey()}-once`, true);
    const reward = nextFilled.map(item => item.playerId).filter((id): id is number => typeof id === "number")[0];
    if (reward) unlockPlayer(reward, "Once BBVA");
    trackEvent("game_completed", { game: "once_bbva", won: true, team: xi.title });
  }

  function placePlayer(playerName: string, slot: Slot) {
    const globalPlayer = findGlobalPlayer(playerName);
    const nextFilled = [...filled, { slotId: slot.id, playerName, playerId: globalPlayer?.id }];
    setFilled(nextFilled);
    setChoice(null);
    setQuery("");
    flash(`${playerName} colocado`);
    if (nextFilled.length === xi.slots.length) finish(nextFilled, misses);
    else persist(nextFilled, misses, false, false);
  }

  function submitName(name: string) {
    if (done) return;
    const clean = name.trim();
    if (!clean) return;
    const match = canonicalName(clean, openNames);
    if (!match) {
      const nextMisses = [...misses, clean];
      setMisses(nextMisses);
      persist(filled, nextMisses, false, false);
      flash(`${clean} no entra en este once`);
      return;
    }
    const slots = openMatchingSlots(xi.slots, filled, match);
    if (slots.length === 1) {
      placePlayer(match, slots[0]);
      return;
    }
    setChoice({ playerName: match, slots });
  }

  async function share() {
    const text = `⚽ Futboldle\nOnce BBVA #${getDayNumber()}\n${won ? "🟩" : "⬜"} ${filled.length}/11 · ${xi.title}\n\nhttps://futboldle.es`;
    shareResult(text, () => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }

  return (
    <div className="flex flex-col gap-3 pb-[calc(4rem+env(safe-area-inset-bottom))] max-w-[100vw] overflow-x-hidden">
      <button onClick={onBack} className="self-start text-[11px] font-semibold opacity-60 hover:opacity-100" style={{ color: "#3a3a3f" }}>← Volver</button>

      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-[12px] font-semibold"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", color: "#18181b", boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}>
          {toast}
        </div>
      )}

      <section className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 28px rgba(0,0,0,0.10)" }}>
        <div className="px-5 py-4" style={{ background: "linear-gradient(135deg,#b81c14,#d44234)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 mb-2">Reto rápido · #{getDayNumber()}</div>
          <h2 className="font-bebas text-[32px] leading-none text-white">ONCE BBVA</h2>
          <p className="text-[11px] text-white/75 mt-1">{xi.title} · {xi.formation}</p>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="rounded-xl px-3 py-2" style={{ background: "#fff8f7", border: "1px solid rgba(184,28,20,0.14)" }}>
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#b81c14" }}>Objetivo</div>
            <p className="text-[11px] mt-0.5" style={{ color: "#6b6b72" }}>Cada casilla tiene equipo y posición. Escribe cualquier jugador del once y se colocará donde corresponda.</p>
          </div>

          <div className="rounded-2xl px-2.5 py-4" style={{ background: "linear-gradient(180deg,#d8f0dc,#b6dfbe)", border: "1px solid rgba(30,107,46,0.18)" }}>
            {(["DEL", "MED", "DEF", "POR"] as Role[]).map(role => (
              <div key={role} className="flex justify-center gap-1.5 mb-2 last:mb-0">
                {rows[role].map(slot => {
                  const entry = filledEntry(filled, slot);
                  return (
                    <div key={slot.id} className="min-w-0 flex-1 max-w-[104px] rounded-xl px-1.5 py-2 text-center"
                      style={{ background: entry ? "white" : "rgba(255,255,255,0.52)", border: `1px solid ${ROLE_COLORS[role]}44`, color: entry ? "#18181b" : ROLE_COLORS[role] }}>
                      <div className="text-[8px] font-bold">{role}</div>
                      <div className="font-oswald font-semibold text-[10px] leading-tight truncate">{entry ? entry.playerName : slot.club}</div>
                      <div className="text-[8px] leading-tight truncate" style={{ color: entry ? "#9a9a8a" : ROLE_COLORS[role] }}>{slot.season}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {choice && !done && (
            <div className="rounded-xl p-3" style={{ background: "#fffbf5", border: "1px solid rgba(200,146,10,0.22)" }}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#c8920a" }}>Dónde colocas a {choice.playerName}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {choice.slots.map(slot => (
                  <button key={slot.id} onClick={() => placePlayer(choice.playerName, slot)}
                    className="rounded-xl px-3 py-2 text-left font-oswald font-semibold text-[12px]"
                    style={{ background: "white", border: `1px solid ${ROLE_COLORS[slot.role]}44`, color: "#18181b" }}>
                    {slot.role} · {slot.club} <span style={{ color: "#9a9a8a" }}>{slot.season}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!done ? (
            <>
              <div className="relative">
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  onKeyDown={event => { if (event.key === "Enter") submitName(suggestions[0] ?? query); }}
                  placeholder="Escribe cualquier jugador del once..."
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
                  style={{ background: "white", border: "2px solid rgba(184,28,20,0.95)", color: "#18181b" }}
                  autoComplete="off"
                  spellCheck={false}
                />
                {suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden max-h-80 overflow-y-auto"
                    style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                    {suggestions.map(name => (
                      <button key={name} onMouseDown={() => submitName(name)}
                        className="w-full px-4 py-2.5 text-left border-b last:border-0"
                        style={{ borderColor: "rgba(0,0,0,0.06)", color: "#18181b" }}>
                        <div className="font-oswald font-semibold text-[13px]">{name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px]" style={{ color: "#9a9a8a" }}>
                <span>{filled.length}/11 colocados</span>
              </div>
            </>
          ) : (
            <div className="rounded-xl p-4" style={{ background: "#f0faf2", border: "1px solid rgba(30,107,46,0.22)" }}>
              <div className="font-bebas text-[24px] leading-none" style={{ color: "#1e6b2e" }}>ONCE COMPLETADO</div>
              <p className="text-[12px] mt-1" style={{ color: "#6b6b72" }}>{xi.note}</p>
              <button onClick={share} className="mt-3 w-full font-oswald font-semibold uppercase tracking-wider text-[12px] py-3 rounded-xl" style={{ background: copied ? "#1e6b2e" : "#18181b", color: "white" }}>{copied ? "Copiado" : "Compartir"}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
