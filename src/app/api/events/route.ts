import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function headers() {
  return {
    apikey: SUPABASE_KEY!,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "content-type": "application/json",
    Prefer: "return=minimal",
  };
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ configured: false }, { status: 202 });

  try {
    const body = await request.json();
    if (!body?.eventName || !body?.installId) return NextResponse.json({ error: "invalid_payload" }, { status: 400 });

    const row = {
      install_id: String(body.installId).slice(0, 80),
      event_name: String(body.eventName).slice(0, 80),
      mode_id: String(body.modeId ?? "unknown").slice(0, 80),
      challenge_id: String(body.challengeId ?? "").slice(0, 120),
      season_id: String(body.seasonId ?? "bbva").slice(0, 40),
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/community_events`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(row),
    });

    if (!response.ok) return NextResponse.json({ error: "storage_failed" }, { status: 202 });
    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}
