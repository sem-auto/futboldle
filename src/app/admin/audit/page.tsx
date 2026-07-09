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
import { mundialdleChallenges, worldCupChampionChallenges, worldCupPlayers, worldCupTitleRuns, worldCupTop10Challenges } from "@/data/worldcups";
import { getAlbumEntries, getAlbumProgress, getTrophyShowcase } from "@/lib/album";
import { getWorldCupAlbum, getWorldCupStreak } from "@/lib/worldCupCollection";
import { loadGameCounts } from "@/lib/profile";
import { loadStats } from "@/lib/useStats";

type CompetitionId = "bbva" | "world-cups";

function normalizeAuditText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z0-9]/gi, "").toUpperCase();
}

function hasBrokenEncoding(value: string) {
  return /(?:\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]|\u00E2[\u0080-\u00BF]{1,2}|\u00F0[\u0080-\u00BF]{2,3}|\u00D0[\u0080-\u00BF]|\uFFFD|[\u0400-\u04FF]|Espa\?a|M\?laga|Atl\?tico|Almer\?a|Jes\?s|Joaqu\?n|V\?ctor|Vald\?s|Forl\?n|seg\?n|Porter\?as|Di Mar\?a)/.test(value);
}

function uniqueDuplicates(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    const key = normalizeAuditText(value);
    if (seen.has(key)) duplicates.add(value);
    seen.add(key);
  }
  return Array.from(duplicates);
}

function readLocalStorageSnapshot(prefixes: string[]) {
  const snapshot: Record<string, string> = {};
  for (const key of Object.keys(localStorage).sort()) {
    if (prefixes.some(prefix => key.startsWith(prefix) || key === prefix)) {
      snapshot[key] = localStorage.getItem(key) ?? "";
    }
  }
  return snapshot;
}

function getBrokenBbvaItems() {
  const items: string[] = [];
  for (const player of bbvaPlayers) {
    const values = [player.fullName, player.displayName, player.mainClub, player.nationality, player.position, player.hint, ...player.clubs];
    if (values.some(hasBrokenEncoding)) items.push(`Jugador ${player.id}: ${player.displayName}`);
  }
  for (const challenge of top10Challenges) {
    const values = [challenge.title, challenge.subtitle, challenge.period, challenge.criterion, challenge.source, challenge.consigna, ...challenge.answers.flatMap(answer => [answer.displayName, answer.detail, answer.hintNationality, answer.hintPosition, answer.hintClub, answer.hintInitial])];
    if (values.filter(Boolean).some(value => hasBrokenEncoding(String(value)))) items.push(`Top10: ${challenge.title}`);
  }
  return items;
}

function getBrokenWorldCupItems() {
  const items: string[] = [];
  for (const player of worldCupPlayers) {
    const values = [player.name, player.nationality, player.position, player.worldCupRole, ...player.aliases, ...(player.clubsByWorldCup ?? []).map(item => item.club)];
    if (values.some(hasBrokenEncoding)) items.push(`Jugador ${player.id}: ${player.name}`);
  }
  for (const challenge of worldCupTop10Challenges) {
    const values = [challenge.title, challenge.subtitle, challenge.period, challenge.criterion, challenge.sourceName, ...challenge.answers.flatMap(answer => [answer.name, answer.label, answer.nationality, answer.position])];
    if (values.some(hasBrokenEncoding)) items.push(`Top10 Mundial: ${challenge.title}`);
  }
  return items;
}

function getWorldCupTopIssues() {
  const ids = new Set(worldCupPlayers.map(player => player.id));
  const issues: string[] = [];
  for (const challenge of worldCupTop10Challenges) {
    if (!challenge.sourceUrl || !challenge.sourceName) issues.push(`${challenge.title}: falta fuente.`);
    for (const answer of challenge.answers) {
      if (!ids.has(answer.playerId)) issues.push(`${challenge.title}: jugador inexistente ${answer.name}`);
      if (hasBrokenEncoding(answer.name) || hasBrokenEncoding(answer.label)) issues.push(`${challenge.title}: encoding roto en ${answer.name}`);
    }
  }
  return issues;
}

function auditLabel(item: unknown) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && "title" in item) return String((item as { title?: string }).title ?? "");
  return String(item ?? "");
}

function getCompetitionData(id: CompetitionId) {
  if (id === "world-cups") {
    const unlocked = getWorldCupAlbum();
    const topIssues = getWorldCupTopIssues();
    const broken = getBrokenWorldCupItems();
    const duplicates = uniqueDuplicates(worldCupPlayers.map(player => player.name));
    return {
      id,
      label: "Mundiales",
      period: "Mundiales 1930-2026",
      players: worldCupPlayers.map(player => ({
        id: player.id,
        name: player.name,
        status: unlocked.some(entry => entry.playerId === player.id) ? "Desbloqueado" : "Bloqueado",
        rarity: player.iconicLevel,
        teams: player.nationality,
        position: player.position,
        nationality: player.nationality,
      })),
      albumUnlocked: unlocked.length,
      albumTotal: worldCupPlayers.length,
      stats: { ...getWorldCupStreak(), played: unlocked.length, won: unlocked.length },
      top10: worldCupTop10Challenges.map(challenge => ({
        id: challenge.id,
        title: challenge.title,
        period: challenge.period,
        criterion: challenge.criterion,
        source: challenge.sourceName,
        sourceUrl: challenge.sourceUrl,
        status: challenge.status,
        answers: challenge.answers.map((answer, index) => `${index + 1}. ${answer.name} (${answer.label})`).join(" · "),
      })),
      paths: [
        ...mundialdleChallenges.slice(0, 120).map(challenge => ({ name: challenge.id, first: `Mundial ${challenge.worldCup}`, rest: challenge.clues.map(clue => `${clue.label}: ${clue.value}`).join(" · "), source: challenge.source })),
        ...worldCupChampionChallenges.map(challenge => ({ name: `Campeón ${challenge.year}`, first: challenge.host, rest: `${challenge.champion} / ${challenge.runnerUp}`, source: "World Cup finals" })),
        ...worldCupTitleRuns.map(run => ({ name: `${run.champion} ${run.year}`, first: run.host, rest: run.rivals.join(" · "), source: "World Cup path" })),
      ],
      errors: [...topIssues, ...broken.map(item => `Encoding: ${item}`)],
      pending: worldCupTop10Challenges.filter(challenge => challenge.status !== "active").map(challenge => challenge.title),
      removed: [] as string[],
      duplicates,
      broken,
      withoutCard: [],
      withoutAutocomplete: worldCupPlayers.filter(player => !player.name || !player.aliases?.length).map(player => player.name),
      storagePrefixes: ["fbl-worldcup", "fbl-mundialdle", "fbl-wc-top10", "fbl-world-cup"],
      dailyPool: worldCupPlayers.length,
    };
  }

  const albumEntries = getAlbumEntries();
  const albumProgress = getAlbumProgress();
  const top10ValidationIssues = getTop10ValidationIssues();
  const duplicatePlayers = uniqueDuplicates(bbvaPlayers.map(player => player.displayName));
  const broken = getBrokenBbvaItems();
  return {
    id,
    label: "Liga BBVA",
    period: PROJECT_PERIOD,
    players: albumEntries.map(entry => ({
      id: String(entry.player.id),
      name: entry.player.displayName,
      status: entry.isUnlocked ? "Desbloqueado" : "Bloqueado",
      rarity: entry.rarity,
      teams: entry.player.clubs.join(" · "),
      position: entry.player.position,
      nationality: entry.player.nationality,
    })),
    albumUnlocked: albumProgress.unlockedCount,
    albumTotal: albumProgress.total,
    stats: loadStats(),
    counts: loadGameCounts(),
    top10: top10Challenges.map(challenge => ({
      id: challenge.id,
      title: challenge.title,
      period: challenge.period,
      criterion: challenge.criterion,
      source: challenge.source,
      sourceUrl: challenge.sourceUrl,
      status: activeTop10Challenges.some(active => active.id === challenge.id) ? "active" : "needs_review",
      answers: challenge.answers.map(answer => `${answer.position}. ${answer.displayName} (${answer.detail})`).join(" · "),
    })),
    paths: Object.entries(CAREER_AUDIT).map(([id, audit]) => {
      const player = bbvaPlayers.find(item => item.id === Number(id));
      return { name: player?.displayName ?? id, first: audit.clubs[0], rest: audit.clubs.slice(1).join(" / "), source: audit.source };
    }),
    errors: [...top10ValidationIssues.map(issue => issue.message), ...broken.map(item => `Encoding: ${item}`)],
    pending: pendingRequestedTops.map(auditLabel),
    removed: removedUnverifiedTops.map(auditLabel),
    duplicates: duplicatePlayers,
    broken,
    withoutCard: bbvaPlayers.filter(player => !albumEntries.some(entry => entry.player.id === player.id)).map(player => player.displayName),
    withoutAutocomplete: bbvaPlayers.filter(player => !player.answer || !player.displayName || !player.fullName).map(player => player.displayName || String(player.id)),
    storagePrefixes: ["fbl-stats-v1", "fbl-game-counts-v1", "fbl-album", "fbl-troph", "fbl-day-", "fbl-tray-", "fbl-top10", "fbl-crack"],
    dailyPool: dailyWordlePlayers.length,
    trophies: getTrophyShowcase().filter(trophy => trophy.unlocked).length,
    excluded: getExcludedTrajectoryIds(bbvaPlayers.map(player => player.id)).length,
    hardWordle: getWordleMainHardPlayers().map(player => player.displayName),
  };
}

export default function AdminAuditPage() {
  const [mounted, setMounted] = useState(false);
  const [competitionId, setCompetitionId] = useState<CompetitionId>("bbva");
  const [storage, setStorage] = useState<Record<string, string>>({});
  const competitions = useMemo(() => [
    { id: "bbva" as const, label: "Liga BBVA" },
    { id: "world-cups" as const, label: "Mundiales" },
  ], []);
  const data = getCompetitionData(competitionId);

  function refresh() {
    setStorage(readLocalStorageSnapshot(data.storagePrefixes));
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competitionId, mounted]);

  if (!mounted) return null;

  const percent = data.albumTotal ? Math.round((data.albumUnlocked / data.albumTotal) * 100) : 0;

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea", color: "#18181b" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Link href="/" className="text-[11px] font-semibold" style={{ color: "#6b6b72" }}>← Volver</Link>
            <h1 className="font-bebas text-[36px] leading-none mt-2">AUDITORÍA FUTBOLDLE</h1>
            <p className="text-[12px]" style={{ color: "#9a9a8a" }}>Panel multi-competición · {data.period}</p>
          </div>
          <button onClick={refresh} className="font-oswald font-semibold uppercase tracking-wider text-[10px] px-3 py-2 rounded-lg" style={{ background: "#18181b", color: "white" }}>Refrescar</button>
        </div>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <label className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#9a9a8a" }}>Competición</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {competitions.map(competition => (
              <button key={competition.id} onClick={() => setCompetitionId(competition.id)} className="rounded-lg px-3 py-2 text-[11px] font-semibold" style={{ background: competitionId === competition.id ? "#18181b" : "#f8f5f0", color: competitionId === competition.id ? "white" : "#6b6b72" }}>
                {competition.label}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            ["Competición", data.label],
            ["Jugadores", data.players.length],
            ["Desbloqueados", data.albumUnlocked],
            ["% álbum", `${percent}%`],
            ["Top10", data.top10.length],
            ["Retos auditados", data.paths.length],
            ["Pendientes", data.pending.length],
            ["Retirados", data.removed.length],
            ["Duplicados", data.duplicates.length],
            ["Encoding roto", data.broken.length],
            ["Sin cromo", data.withoutCard.length],
            ["Sin autocomplete", data.withoutAutocomplete.length],
            ["Pool diario", data.dailyPool],
            ["Errores", data.errors.length],
            ["LocalStorage", Object.keys(storage).length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl px-3 py-2" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#bbb" }}>{label}</div>
              <div className="font-bebas text-[24px] leading-none">{value}</div>
            </div>
          ))}
        </section>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">ERRORES Y PENDIENTES</h2>
          <div className="grid md:grid-cols-2 gap-2 text-[11px]">
            <AuditBox title="Errores detectados" items={data.errors} danger />
            <AuditBox title="Pendientes" items={data.pending} />
            <AuditBox title="Retirados" items={data.removed} />
            <AuditBox title="Duplicados" items={data.duplicates} />
            <AuditBox title="Sin autocomplete" items={data.withoutAutocomplete} />
            <AuditBox title="Encoding roto" items={data.broken} danger />
            {competitionId === "bbva" ? <AuditBox title="Wordle principal demasiado difícil" items={(data as ReturnType<typeof getCompetitionData> & { hardWordle?: string[] }).hardWordle ?? []} /> : null}
          </div>
        </section>

        <section className="rounded-xl p-3 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">JUGADORES / ÁLBUM</h2>
          <table className="w-full text-[11px]">
            <thead style={{ color: "#9a9a8a" }}>
              <tr className="text-left"><th className="py-1 pr-3">ID</th><th className="py-1 pr-3">Jugador</th><th className="py-1 pr-3">Estado</th><th className="py-1 pr-3">Rareza</th><th className="py-1 pr-3">Club/Selección</th><th className="py-1 pr-3">Posición</th><th className="py-1 pr-3">Nacionalidad</th></tr>
            </thead>
            <tbody>
              {data.players.map(player => (
                <tr key={player.id} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <td className="py-1.5 pr-3">{player.id}</td>
                  <td className="py-1.5 pr-3 font-semibold">{player.name}</td>
                  <td className="py-1.5 pr-3">{player.status}</td>
                  <td className="py-1.5 pr-3">{player.rarity}</td>
                  <td className="py-1.5 pr-3">{player.teams}</td>
                  <td className="py-1.5 pr-3">{player.position}</td>
                  <td className="py-1.5 pr-3">{player.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl p-3 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 className="font-bebas text-[24px] leading-none mb-2">{competitionId === "bbva" ? "TRAYECTORIAS" : "RETOS MUNDIALES"}</h2>
            <table className="w-full text-[11px]">
              <tbody>
                {data.paths.map(path => (
                  <tr key={`${path.name}-${path.first}`} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <td className="py-1.5 pr-2 font-semibold">{path.name}</td>
                    <td className="py-1.5 pr-2">{path.first}</td>
                    <td className="py-1.5 pr-2">{path.rest}</td>
                    <td className="py-1.5 pr-2">{path.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl p-3 overflow-x-auto" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 className="font-bebas text-[24px] leading-none mb-2">TOP10</h2>
            <div className="flex flex-col gap-2">
              {data.top10.map(challenge => (
                <div key={challenge.id} className="rounded-lg p-2" style={{ background: challenge.status === "active" ? "#f8f5f0" : "#fff8e6" }}>
                  <div className="font-semibold text-[12px]">{challenge.title}</div>
                  <div className="text-[10px]" style={{ color: "#6b6b72" }}>{challenge.period} · {challenge.criterion}</div>
                  <a href={challenge.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold" style={{ color: "#1a4fa0" }}>{challenge.source}</a>
                  <div className="text-[10px] mt-1">{challenge.answers}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}>
          <h2 className="font-bebas text-[24px] leading-none mb-2">ESTADÍSTICAS Y LOCALSTORAGE</h2>
          <div className="grid md:grid-cols-2 gap-2 text-[11px]">
            <pre className="rounded-lg p-2 overflow-auto" style={{ background: "#18181b", color: "white" }}>{JSON.stringify({ stats: data.stats, counts: "counts" in data ? data.counts : undefined }, null, 2)}</pre>
            <pre className="rounded-lg p-2 overflow-auto max-h-80" style={{ background: "#18181b", color: "white" }}>{JSON.stringify(storage, null, 2)}</pre>
          </div>
        </section>
      </div>
    </main>
  );
}

function AuditBox({ title, items, danger = false }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <div className="rounded-lg p-2" style={{ background: items.length ? (danger ? "#fff5f5" : "#fff8e6") : "#f8f5f0" }}>
      <strong>{title}:</strong> {items.length ? items.join(" · ") : "Ninguno"}
    </div>
  );
}
