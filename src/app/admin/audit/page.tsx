"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { bbvaPlayers, dailyWordlePlayers, getWordleMainHardPlayers } from "@/data/bbvaPlayers";
import { CAREER_AUDIT, PROJECT_PERIOD, getExcludedTrajectoryIds } from "@/data/trayectoriaAudit";
import {
  activeTop10Challenges,
  getTop10ValidationIssues,
  pendingRequestedTops,
  removedUnverifiedTops,
  top10Challenges,
} from "@/data/top10Challenges";
import { getAlbumEntries, getAlbumProgress, getTrophyShowcase } from "@/lib/album";
import { loadGameCounts } from "@/lib/profile";
import { loadStats } from "@/lib/useStats";

const STORAGE_KEYS = [
  "fbl-stats-v1",
  "fbl-game-counts-v1",
  "fbl-album-unlocked-v1",
  "fbl-album-meta-v1",
  "fbl-album-favorites-v1",
  "fbl-trophies-v1",
  "fbl-trophy-meta-v1",
  "fbl-last-card-unlock-v1",
];

const PERIOD_SUSPICIOUS_CLUBS = [
  "Crystal Palace",
  "Leeds",
  "Wolverhampton",
  "Valencia 2018",
];

const CORRECTED_PLAYERS = [
  "Piti",
  "Barkero",
  "Chory Castro",
  "Bacca",
  "Fàbregas",
  "Brahimi",
  "Nolito",
  "Jesús Navas",
];

const PENDING_PLAYERS: string[] = [];

const CLUB_NAME_ALIASES: Record<string, string> = {
  "Atlético": "Atlético de Madrid",
  "Celta": "Celta de Vigo",
  "Rayo": "Rayo Vallecano",
  "Sporting": "Sporting de Gijón",
  "Racing": "Racing Santander",
  "Alavés": "Deportivo Alavés",
};

function normalizeAuditText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z0-9]/gi, "").toUpperCase();
}

function getDuplicatePlayers() {
  const names = bbvaPlayers.map(player => normalizeAuditText(player.displayName));
  const duplicateKeys = new Set(names.filter((name, index) => names.indexOf(name) !== index));
  return bbvaPlayers
    .filter(player => duplicateKeys.has(normalizeAuditText(player.displayName)))
    .map(player => `${player.displayName} (#${player.id})`);
}

function hasBrokenEncoding(value: string) {
  return /[A-Za-z\u00c0-\u024f]\?[A-Za-z\u00c0-\u024f]/.test(value);
}

function getBrokenEncodingItems() {
  const items: string[] = [];
  for (const player of bbvaPlayers) {
    const values = [player.fullName, player.displayName, player.mainClub, player.nationality, player.position, player.hint, ...player.clubs];
    if (values.some(hasBrokenEncoding)) items.push(`Jugador ${player.id}: ${player.displayName}`);
  }
  for (const challenge of top10Challenges) {
    const values = [challenge.title, challenge.subtitle, challenge.period, challenge.criterion, challenge.source, challenge.consigna, ...challenge.answers.flatMap(answer => [answer.displayName, answer.detail, answer.hintNationality, answer.hintPosition, answer.hintClub, answer.hintInitial])];
    if (values.some(hasBrokenEncoding)) items.push(`Top10: ${challenge.title}`);
  }
  return items;
}

function getPlayersWithoutCard() {
  const albumIds = new Set(getAlbumEntries().map(entry => entry.player.id));
  return bbvaPlayers.filter(player => !albumIds.has(player.id)).map(player => player.displayName);
}

function getPlayersWithoutAutocomplete() {
  return bbvaPlayers.filter(player => !player.answer || !player.displayName || !player.fullName).map(player => player.displayName || String(player.id));
}

function getNamingIssues() {
  return bbvaPlayers.flatMap(player =>
    player.clubs
      .filter(club => CLUB_NAME_ALIASES[club])
      .map(club => `${player.displayName}: ${club} → ${CLUB_NAME_ALIASES[club]}`)
  );
}

function readLocalStorageSnapshot() {
  const snapshot: Record<string, string> = {};
  for (const key of STORAGE_KEYS) snapshot[key] = localStorage.getItem(key) ?? "";
  const dayKeys = Object.keys(localStorage)
    .filter(key => key.startsWith("fbl-day-") || key.startsWith("fbl-tray-") || key.startsWith("fbl-top10-") || key.startsWith("fbl-crack-"))
    .sort();
  for (const key of dayKeys) snapshot[key] = localStorage.getItem(key) ?? "";
  return snapshot;
}

function getAuditErrors() {
  const errors: string[] = [];
  const playerIds = new Set(bbvaPlayers.map(player => player.id));
  const duplicateNames = bbvaPlayers
    .map(player => player.displayName)
    .filter((name, index, list) => list.indexOf(name) !== index);

  if (duplicateNames.length) {
    errors.push(`Jugadores duplicados en base global: ${Array.from(new Set(duplicateNames)).join(", ")}`);
  }


  for (const player of bbvaPlayers) {
    const suspicious = player.clubs.filter(club => PERIOD_SUSPICIOUS_CLUBS.includes(club));
    if (suspicious.length) errors.push(`${player.displayName}: club sospechoso fuera de periodo: ${suspicious.join(", ")}`);
  }

  for (const id of Object.keys(CAREER_AUDIT).map(Number)) {
    if (!playerIds.has(id)) errors.push(`Trayectoria auditada con id inexistente: ${id}`);
  }

  for (const challenge of top10Challenges) {
    if (!challenge.source || !challenge.sourceUrl) errors.push(`${challenge.title}: falta fuente o URL.`);
  }
  for (const issue of getTop10ValidationIssues()) errors.push(issue.message);

  return errors;
}

export default function AdminAuditPage() {
  const [mounted, setMounted] = useState(false);
  const [storage, setStorage] = useState<Record<string, string>>({});
  const [albumEntries, setAlbumEntries] = useState<ReturnType<typeof getAlbumEntries>>([]);
  const [stats, setStats] = useState<ReturnType<typeof loadStats> | null>(null);
  const [counts, setCounts] = useState<ReturnType<typeof loadGameCounts> | null>(null);
  const [albumProgress, setAlbumProgress] = useState<ReturnType<typeof getAlbumProgress> | null>(null);
  const [trophyCount, setTrophyCount] = useState(0);

  const errors = useMemo(getAuditErrors, []);
  const duplicatePlayers = useMemo(getDuplicatePlayers, []);
  const brokenEncodingItems = useMemo(getBrokenEncodingItems, []);
  const playersWithoutCard = useMemo(getPlayersWithoutCard, []);
  const playersWithoutAutocomplete = useMemo(getPlayersWithoutAutocomplete, []);
  const namingIssues = useMemo(getNamingIssues, []);
  const excludedTrajectoryIds = useMemo(() => getExcludedTrajectoryIds(bbvaPlayers.map(player => player.id)), []);
  const top10ValidationIssues = useMemo(getTop10ValidationIssues, []);
  const goalkeeperOffensiveIssues = top10ValidationIssues.filter(issue => issue.type === "goalkeeper_offensive_metric");
  const missingPlayerIssues = top10ValidationIssues.filter(issue => issue.type === "missing_player");
  const top10EncodingIssues = top10ValidationIssues.filter(issue => issue.type === "broken_encoding");
  const wordleMainHardPlayers = useMemo(getWordleMainHardPlayers, []);

  function refresh() {
    setStats(loadStats());
    setCounts(loadGameCounts());
    setAlbumProgress(getAlbumProgress());
    setAlbumEntries(getAlbumEntries());
    setTrophyCount(getTrophyShowcase().filter(trophy => trophy.unlocked).length);
    setStorage(readLocalStorageSnapshot());
  }

  useEffect(() => {
    setMounted(true);
    refresh();
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea", color: "#18181b" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Link href="/" className="text-[11px] font-semibold" style={{ color: "#6b6b72" }}>← Volver</Link>
            <h1 className="font-bebas text-[36px] leading-none mt-2">AUDITORÍA FUTBOLDLE</h1>
            <p className="text-[12px]" style={{ color: "#9a9a8a" }}>{PROJECT_PERIOD}</p>
          </div>
          <button onClick={refresh} className="font-oswald font-semibold uppercase tracking-wider text-[10px] px-3 py-2 rounded-lg"
            style={{ background: "#18181b", color: "white" }}>Refrescar</button>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            ["Jugadores", bbvaPlayers.length],
            ["Desbloqueados", albumProgress?.unlockedCount ?? 0],
            ["% álbum", `${albumProgress?.percent ?? 0}%`],
            ["Partidas", stats?.played ?? 0],
            ["Victorias", stats?.won ?? 0],
            ["Trofeos", trophyCount],
            ["Top10 activos", activeTop10Challenges.length],
            ["Top10 auditados", top10Challenges.length],
            ["Trayectorias", Object.keys(CAREER_AUDIT).length],
            ["Pendientes", pendingRequestedTops.length],
            ["Duplicados", duplicatePlayers.length],
            ["Encoding roto", brokenEncodingItems.length],
            ["Sin cromo", playersWithoutCard.length],
            ["Sin autocomplete", playersWithoutAutocomplete.length],
            ["Wordle diario", dailyWordlePlayers.length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl px-3 py-2" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#bbb" }}>{label}</div>
              <div className="font-bebas text-[24px] leading-none">{value}</div>
            </div>
          ))}
        </section>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">ERRORES DETECTADOS</h2>
          {errors.length === 0 ? (
            <p className="text-[12px]" style={{ color: "#1e6b2e" }}>Sin errores automáticos críticos.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {errors.map(error => (
                <div key={error} className="text-[11px] px-2 py-1 rounded-lg" style={{ background: "#fff5f5", color: "#b81c14" }}>{error}</div>
              ))}
            </div>
          )}
        </section>


        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">RESUMEN BETA</h2>
          <div className="grid md:grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}>
              <strong>Jugadores corregidos:</strong> {CORRECTED_PLAYERS.join(" · ")}
            </div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}>
              <strong>Jugadores pendientes:</strong> {PENDING_PLAYERS.length ? PENDING_PLAYERS.join(" · ") : "Ninguno"}
            </div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}>
              <strong>Duplicados detectados:</strong> {duplicatePlayers.length ? duplicatePlayers.join(" · ") : "Ninguno"}
            </div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}>
              <strong>Top10 activos con fuente:</strong> {activeTop10Challenges.length} · <strong>Solicitados pendientes:</strong> {pendingRequestedTops.length}
            </div>
          </div>
        </section>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">CALIDAD DE DATOS</h2>
          <div className="grid md:grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}><strong>Top10 activos:</strong> {activeTop10Challenges.length}</div>
            <div className="rounded-lg p-2" style={{ background: top10ValidationIssues.length ? "#fff5f5" : "#f8f5f0" }}><strong>Top10 bloqueados por validación:</strong> {top10ValidationIssues.length ? top10ValidationIssues.map(issue => `${issue.title}: ${issue.displayName ?? issue.type}`).join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: goalkeeperOffensiveIssues.length ? "#fff5f5" : "#f8f5f0" }}><strong>Top10 con portero en métrica ofensiva:</strong> {goalkeeperOffensiveIssues.length ? goalkeeperOffensiveIssues.map(issue => `${issue.title}: ${issue.displayName}`).join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: missingPlayerIssues.length ? "#fff5f5" : "#f8f5f0" }}><strong>Top10 con jugador inexistente:</strong> {missingPlayerIssues.length ? missingPlayerIssues.map(issue => `${issue.title}: ${issue.displayName}`).join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: top10EncodingIssues.length ? "#fff5f5" : "#f8f5f0" }}><strong>Top10 con encoding roto:</strong> {top10EncodingIssues.length ? top10EncodingIssues.map(issue => `${issue.title}: ${issue.displayName ?? "texto"}`).join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}><strong>Top10 pendientes:</strong> {pendingRequestedTops.length}</div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}><strong>Top10 retirados:</strong> {removedUnverifiedTops.length}</div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}><strong>Trayectorias activas:</strong> {Object.keys(CAREER_AUDIT).length} · <strong>Excluidas:</strong> {excludedTrajectoryIds.length}</div>
            <div className="rounded-lg p-2" style={{ background: brokenEncodingItems.length ? "#fff5f5" : "#f8f5f0" }}><strong>Jugadores con encoding roto:</strong> {brokenEncodingItems.length ? brokenEncodingItems.join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}><strong>Jugadores duplicados:</strong> {duplicatePlayers.length ? duplicatePlayers.join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}><strong>Jugadores sin cromo:</strong> {playersWithoutCard.length ? playersWithoutCard.join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: "#f8f5f0" }}><strong>Jugadores sin autocomplete:</strong> {playersWithoutAutocomplete.length ? playersWithoutAutocomplete.join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: wordleMainHardPlayers.length ? "#fff8e6" : "#f8f5f0" }}><strong>Jugadores difíciles en Wordle principal:</strong> {wordleMainHardPlayers.length ? wordleMainHardPlayers.map(player => player.displayName).join(" · ") : "Ninguno"}</div>
            <div className="rounded-lg p-2" style={{ background: namingIssues.length ? "#fff8e6" : "#f8f5f0" }}><strong>Jugadores con naming inconsistente:</strong> {namingIssues.length ? namingIssues.join(" · ") : "Ninguno"}</div>
          </div>
        </section>

        <section className="rounded-xl p-3 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">JUGADORES DEL ÁLBUM</h2>
          <table className="w-full text-[11px]">
            <thead style={{ color: "#9a9a8a" }}>
              <tr className="text-left">
                <th className="py-1 pr-3">ID</th>
                <th className="py-1 pr-3">Jugador</th>
                <th className="py-1 pr-3">Estado</th>
                <th className="py-1 pr-3">Rareza</th>
                <th className="py-1 pr-3">Clubes</th>
                <th className="py-1 pr-3">Posición</th>
                <th className="py-1 pr-3">Nacionalidad</th>
              </tr>
            </thead>
            <tbody>
              {albumEntries.map(entry => (
                <tr key={entry.player.id} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td className="py-1.5 pr-3">{entry.player.id}</td>
                  <td className="py-1.5 pr-3 font-semibold">{entry.player.displayName}</td>
                  <td className="py-1.5 pr-3">{entry.isUnlocked ? "Desbloqueado" : "Bloqueado"}</td>
                  <td className="py-1.5 pr-3">{entry.rarity}</td>
                  <td className="py-1.5 pr-3">{entry.player.clubs.join(" · ")}</td>
                  <td className="py-1.5 pr-3">{entry.player.position}</td>
                  <td className="py-1.5 pr-3">{entry.player.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-3 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 className="font-bebas text-[24px] leading-none mb-2">TRAYECTORIAS</h2>
            <div className="text-[11px] mb-2" style={{ color: "#9a9a8a" }}>Auditadas: {Object.keys(CAREER_AUDIT).length} · Excluidas: {excludedTrajectoryIds.length}</div>
            <table className="w-full text-[11px]">
              <tbody>
                {Object.entries(CAREER_AUDIT).map(([id, audit]) => {
                  const player = bbvaPlayers.find(item => item.id === Number(id));
                  return (
                    <tr key={id} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                      <td className="py-1.5 pr-2 font-semibold">{player?.displayName ?? id}</td>
                      <td className="py-1.5 pr-2">{audit.clubs[0]}</td>
                      <td className="py-1.5 pr-2">{audit.clubs.slice(1).join(" / ")}</td>
                      <td className="py-1.5 pr-2">{audit.source}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl p-3 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 className="font-bebas text-[24px] leading-none mb-2">TOP10</h2>
            <div className="flex flex-col gap-2">
              {top10Challenges.map(challenge => (
                <div key={challenge.id} className="rounded-lg p-2" style={{ background: "#f8f5f0" }}>
                  <div className="font-semibold text-[12px]">{challenge.title}</div>
                  <div className="text-[10px]" style={{ color: "#6b6b72" }}>{challenge.period} · {challenge.criterion}</div>
                  <a href={challenge.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold" style={{ color: "#1a4fa0" }}>{challenge.source}</a>
                  <div className="text-[10px] mt-1">{challenge.answers.map(answer => `${answer.position}. ${answer.displayName} (${answer.detail})`).join(" · ")}</div>
                </div>
              ))}
            </div>
            <h3 className="font-bebas text-[18px] leading-none mt-3 mb-1">Pendientes / retirados</h3>
            <div className="text-[10px]" style={{ color: "#9a9a8a" }}>{removedUnverifiedTops.join(" · ")}</div>
            <h3 className="font-bebas text-[18px] leading-none mt-3 mb-1">Solicitados para auditar</h3>
            <div className="text-[10px]" style={{ color: "#9a9a8a" }}>{pendingRequestedTops.join(" · ")}</div>
          </div>
        </section>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">ESTADÍSTICAS Y LOCALSTORAGE</h2>
          <div className="grid md:grid-cols-2 gap-2 text-[11px]">
            <pre className="rounded-lg p-2 overflow-auto" style={{ background: "#18181b", color: "white" }}>{JSON.stringify({ stats, counts }, null, 2)}</pre>
            <pre className="rounded-lg p-2 overflow-auto max-h-80" style={{ background: "#18181b", color: "white" }}>{JSON.stringify(storage, null, 2)}</pre>
          </div>
        </section>
      </div>
    </main>
  );
}
