import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ configured: false }, { status: 202 });
  try {
    const body = await request.json();
    if (!body?.modeId || !body?.challengeId || !body?.issue) return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    const row = { install_id: String(body.installId ?? "anonymous").slice(0, 80), mode_id: String(body.modeId).slice(0, 80), challenge_id: String(body.challengeId).slice(0, 120), issue: String(body.issue).slice(0, 120), path: String(body.path ?? "").slice(0, 200) };
    const response = await fetch(`${SUPABASE_URL}/rest/v1/data_reports`, { method: "POST", headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "content-type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(row) });
    if (!response.ok) return NextResponse.json({ error: "storage_failed" }, { status: 502 });
    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}
