import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type ResultRow = {
  install_id?: string;
  mode_id: string;
  challenge_id: string;
  season_id: string;
  won: boolean;
  attempts: number | null;
  time_spent?: number | null;
  created_at: string;
};

type EventRow = {
  install_id?: string;
  event_name: string;
  mode_id: string;
  challenge_id: string;
  season_id: string;
  created_at: string;
};

type ReportRow = {
  mode_id: string;
  challenge_id: string;
  status: string | null;
};

function headers() {
  return { apikey: SUPABASE_KEY!, Authorization: `Bearer ${SUPABASE_KEY}`, "content-type": "application/json" };
}

function modeLabel(modeId: string) {
  const labels: Record<string, string> = {
    wordle: "Wordle BBVA",
    trayectoria: "Trayectoria BBVA",
    top10: "Top10 BBVA",
    crack: "Cromo Oculto",
    statdle: "Statdle BBVA",
    mundialdle: "Mundialdle",
    "worldcup-wordle": "Wordle Mundial",
    "worldcup-champions": "Campeones",
    "camino-titulo": "Camino al Título",
    "final-mundial": "Final Mundial",
  };
  return labels[modeId] ?? modeId;
}

function getDifficultyLabel(completion: number) {
  if (completion >= 60) return "Fácil";
  if (completion >= 35) return "Media";
  return "Difícil";
}

async function fetchRows<T>(path: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: headers(), cache: "no-store" });
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

function emptyMetric(modeId: string, challengeId = "") {
  return {
    modeId,
    modeName: modeLabel(modeId),
    challengeId,
    seasonId: "bbva",
    plays: 0,
    wins: 0,
    starts: 0,
    abandons: 0,
    completion: 0,
    averageAttempts: null as number | null,
    difficulty: "Sin datos",
    reportCount: 0,
    pendingReports: 0,
    status: "active" as "active" | "needs_review" | "disabled",
  };
}

function summarize(results: ResultRow[], events: EventRow[], reports: ReportRow[]) {
  const byChallenge = new Map<string, ReturnType<typeof emptyMetric> & { attemptsTotal: number; attemptsCount: number; installers: Set<string>; starterKeys: Set<string>; finisherKeys: Set<string> }>();
  const byMode = new Map<string, ReturnType<typeof emptyMetric> & { attemptsTotal: number; attemptsCount: number; installers: Set<string>; starterKeys: Set<string>; finisherKeys: Set<string> }>();

  function ensureChallenge(modeId: string, challengeId: string) {
    const key = `${modeId}::${challengeId}`;
    if (!byChallenge.has(key)) byChallenge.set(key, { ...emptyMetric(modeId, challengeId), attemptsTotal: 0, attemptsCount: 0, installers: new Set(), starterKeys: new Set(), finisherKeys: new Set() });
    return byChallenge.get(key)!;
  }

  function ensureMode(modeId: string) {
    if (!byMode.has(modeId)) byMode.set(modeId, { ...emptyMetric(modeId), attemptsTotal: 0, attemptsCount: 0, installers: new Set(), starterKeys: new Set(), finisherKeys: new Set() });
    return byMode.get(modeId)!;
  }

  for (const event of events) {
    const modeId = event.mode_id || "unknown";
    const challengeId = event.challenge_id || "";
    const installId = event.install_id || "anonymous";
    const starterKey = `${installId}::${challengeId || event.created_at.slice(0, 10)}`;
    const challenge = challengeId ? ensureChallenge(modeId, challengeId) : null;
    const mode = ensureMode(modeId);
    if (event.event_name === "challenge_started") {
      mode.starterKeys.add(starterKey);
      if (challenge) challenge.starterKeys.add(starterKey);
    }
  }

  for (const result of results) {
    const modeId = result.mode_id || "unknown";
    const challengeId = result.challenge_id || "";
    const installId = result.install_id || "anonymous";
    const finisherKey = `${installId}::${challengeId}`;
    const challenge = ensureChallenge(modeId, challengeId);
    const mode = ensureMode(modeId);
    for (const item of [challenge, mode]) {
      item.seasonId = result.season_id || item.seasonId;
      item.plays++;
      item.finisherKeys.add(finisherKey);
      item.installers.add(installId);
      if (result.won) item.wins++;
      if (result.won && typeof result.attempts === "number") {
        item.attemptsTotal += result.attempts;
        item.attemptsCount++;
      }
    }
  }

  for (const report of reports) {
    const challenge = ensureChallenge(report.mode_id, report.challenge_id);
    challenge.reportCount++;
    if ((report.status ?? "pending") === "pending") challenge.pendingReports++;
  }

  function finish<T extends ReturnType<typeof emptyMetric> & { attemptsTotal: number; attemptsCount: number; installers: Set<string>; starterKeys: Set<string>; finisherKeys: Set<string> }>(item: T) {
    const starts = Math.max(item.starterKeys.size, item.plays);
    const completion = item.plays ? Math.round((item.wins / item.plays) * 100) : 0;
    return {
      modeId: item.modeId,
      modeName: item.modeName,
      challengeId: item.challengeId,
      seasonId: item.seasonId,
      plays: item.plays,
      wins: item.wins,
      starts,
      abandons: Math.max(0, starts - item.finisherKeys.size),
      completion,
      averageAttempts: item.attemptsCount ? Number((item.attemptsTotal / item.attemptsCount).toFixed(1)) : null,
      difficulty: item.plays >= 5 ? getDifficultyLabel(completion) : "Estimación",
      reportCount: item.reportCount,
      pendingReports: item.pendingReports,
      status: item.pendingReports >= 3 || item.reportCount >= 5 ? "needs_review" as const : "active" as const,
    };
  }

  const modes = [...byMode.values()].map(finish).sort((a, b) => b.plays - a.plays);
  const challenges = [...byChallenge.values()].map(finish).sort((a, b) => b.plays - a.plays);
  return {
    modes,
    mostPlayed: modes.slice(0, 8),
    mostAbandoned: [...modes].sort((a, b) => b.abandons - a.abandons).slice(0, 8),
    hardestChallenges: [...challenges].filter(item => item.plays > 0).sort((a, b) => a.completion - b.completion || b.plays - a.plays).slice(0, 12),
    challengeAudit: [...challenges].filter(item => item.pendingReports > 0 || item.status !== "active").sort((a, b) => b.pendingReports - a.pendingReports || b.reportCount - a.reportCount).slice(0, 20),
  };
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ configured: false }, { status: 202 });
  try {
    const body = await request.json();
    if (!body?.modeId || !body?.challengeId || typeof body?.won !== "boolean" || !body?.installId) return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    const row = { install_id: String(body.installId).slice(0, 80), mode_id: String(body.modeId).slice(0, 80), challenge_id: String(body.challengeId).slice(0, 120), season_id: String(body.seasonId ?? "bbva").slice(0, 40), won: body.won, attempts: Number(body.attempts) || null, time_spent: Number(body.timeSpent) || null };
    const response = await fetch(`${SUPABASE_URL}/rest/v1/community_results?on_conflict=install_id,challenge_id`, { method: "POST", headers: { ...headers(), Prefer: "resolution=merge-duplicates" }, body: JSON.stringify(row) });
    if (!response.ok) return NextResponse.json({ error: "storage_failed" }, { status: 502 });
    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ configured: false, stats: null });
  const modeId = request.nextUrl.searchParams.get("modeId")?.slice(0, 80);
  const challengeId = request.nextUrl.searchParams.get("challengeId")?.slice(0, 120);

  if (!modeId || !challengeId) {
    const [results, events, reports] = await Promise.all([
      fetchRows<ResultRow>("community_results?select=install_id,mode_id,challenge_id,season_id,won,attempts,time_spent,created_at&order=created_at.desc&limit=5000"),
      fetchRows<EventRow>("community_events?select=install_id,event_name,mode_id,challenge_id,season_id,created_at&order=created_at.desc&limit=5000"),
      fetchRows<ReportRow>("data_reports?select=mode_id,challenge_id,status&order=created_at.desc&limit=1000"),
    ]);
    return NextResponse.json({ configured: true, summary: summarize(results, events, reports) });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_challenge_stats`, { method: "POST", headers: headers(), body: JSON.stringify({ p_mode_id: modeId, p_challenge_id: challengeId }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ configured: true, stats: null });
  const rows = await response.json();
  const row = Array.isArray(rows) ? rows[0] : rows;
  return NextResponse.json({ configured: true, stats: row ? { plays: Number(row.plays) || 0, wins: Number(row.wins) || 0, completion: Number(row.completion) || 0, averageAttempts: row.average_attempts === null ? null : Number(row.average_attempts) } : null });
}
