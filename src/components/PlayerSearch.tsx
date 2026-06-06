"use client";
import { BBVAPlayer } from "@/data/bbvaPlayers";
import { normalize } from "@/lib/normalize";

type Props = {
  value: string;
  players: BBVAPlayer[];
  usedIds?: number[];
  accent: string;
  onChange: (value: string) => void;
  onSelect: (player: BBVAPlayer) => void;
  onEnterNoMatch?: () => void;
  placeholder?: string;
};

function scorePlayer(player: BBVAPlayer, query: string) {
  const q = normalize(query);
  const nameFields = [
    normalize(player.displayName),
    normalize(player.fullName),
    ...player.fullName.split(/\s+/).map(normalize),
    ...player.displayName.split(/\s+/).map(normalize),
  ].filter(Boolean);
  const aliasFields = [normalize(player.answer)].filter(Boolean);

  if (nameFields.some(f => f === q || f.startsWith(q))) return 0;
  if (nameFields.some(f => f.includes(q))) return 1;
  if (aliasFields.some(f => f === q || f.startsWith(q) || f.includes(q))) return 2;
  return 99;
}

function getSuggestions(players: BBVAPlayer[], query: string, usedIds: number[]) {
  if (query.trim().length < 2) return [];
  const used = new Set(usedIds);
  return players
    .filter(player => !used.has(player.id))
    .map(player => ({ player, score: scorePlayer(player, query) }))
    .filter(item => item.score < 99)
    .sort((a, b) => a.score - b.score || a.player.displayName.localeCompare(b.player.displayName, "es"))
    .slice(0, 8)
    .map(item => item.player);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = normalize(query);
  const normalizedText = normalize(text);
  const idx = normalizedText.indexOf(q);
  if (!q || idx < 0) return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length);
  return (
    <>
      {before}
      <mark className="rounded px-0.5" style={{ background: "rgba(200,146,10,0.18)", color: "inherit" }}>{match}</mark>
      {after}
    </>
  );
}

export default function PlayerSearch({
  value,
  players,
  usedIds = [],
  accent,
  onChange,
  onSelect,
  onEnterNoMatch,
  placeholder = "Escribe el nombre del jugador...",
}: Props) {
  const suggestions = getSuggestions(players, value, usedIds);
  const showEmpty = value.trim().length >= 2 && suggestions.length === 0;

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key !== "Enter") return;
          if (suggestions.length > 0) onSelect(suggestions[0]);
          else onEnterNoMatch?.();
        }}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
        style={{ background: "white", border: "2px solid rgba(0,0,0,0.12)", color: "#18181b" }}
        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = accent; }}
        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,0,0,0.12)"; }}
        autoComplete="off"
        spellCheck={false}
      />

      {(suggestions.length > 0 || showEmpty) && (
        <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden max-h-80 overflow-y-auto"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          {suggestions.map(player => (
            <button
              key={player.id}
              onMouseDown={() => onSelect(player)}
              className="w-full px-4 py-2.5 text-left border-b last:border-0 transition-colors"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${accent}12`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}
            >
              <div className="font-oswald font-semibold text-[13px]" style={{ color: "#18181b" }}>
                <Highlight text={player.displayName} query={value} />
              </div>
              <div className="text-[10px] mt-0.5 truncate" style={{ color: "#9a9a8a" }}>{player.clubs.slice(0, 3).join(" · ")}</div>
            </button>
          ))}
          {showEmpty && (
            <div className="px-4 py-3 text-[12px] font-semibold" style={{ color: "#9a9a8a" }}>
              No se encontraron jugadores
            </div>
          )}
        </div>
      )}
    </div>
  );
}
