import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function headers() {
  return { apikey: SUPABASE_KEY!, Authorization: `Bearer ${SUPABASE_KEY}`, "content-type": "application/json" };
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
  if (!modeId || !challengeId) return NextResponse.json({ error: "missing_query" }, { status: 400 });
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_challenge_stats`, { method: "POST", headers: headers(), body: JSON.stringify({ p_mode_id: modeId, p_challenge_id: challengeId }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ configured: true, stats: null });
  const rows = await response.json();
  const row = Array.isArray(rows) ? rows[0] : rows;
  return NextResponse.json({ configured: true, stats: row ? { plays: Number(row.plays) || 0, wins: Number(row.wins) || 0, completion: Number(row.completion) || 0, averageAttempts: row.average_attempts === null ? null : Number(row.average_attempts) } : null });
}
