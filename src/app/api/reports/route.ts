import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const VALID_STATUSES = new Set(["pending", "reviewed", "fixed", "rejected"]);

function headers(prefer = "return=representation") {
  return {
    apikey: SUPABASE_KEY!,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "content-type": "application/json",
    Prefer: prefer,
  };
}

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ configured: false, reports: [] });

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/data_reports?select=id,mode_id,challenge_id,issue,message,path,status,created_at&order=created_at.desc&limit=300`,
    { headers: headers(), cache: "no-store" }
  );

  if (!response.ok) return NextResponse.json({ configured: true, reports: [] });
  const rows = await response.json();
  return NextResponse.json({ configured: true, reports: Array.isArray(rows) ? rows : [] });
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ configured: false }, { status: 202 });
  try {
    const body = await request.json();
    if (!body?.modeId || !body?.challengeId || !body?.issue) return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    const row = {
      install_id: String(body.installId ?? "anonymous").slice(0, 80),
      mode_id: String(body.modeId).slice(0, 80),
      challenge_id: String(body.challengeId).slice(0, 120),
      issue: String(body.issue).slice(0, 120),
      message: String(body.message ?? "").slice(0, 500),
      path: String(body.path ?? "").slice(0, 200),
      status: "pending",
    };
    const response = await fetch(`${SUPABASE_URL}/rest/v1/data_reports`, {
      method: "POST",
      headers: headers("return=minimal"),
      body: JSON.stringify(row),
    });
    if (!response.ok) return NextResponse.json({ error: "storage_failed" }, { status: 502 });
    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ configured: false }, { status: 202 });

  try {
    const body = await request.json();
    const id = String(body?.id ?? "");
    const status = String(body?.status ?? "");
    if (!id || !VALID_STATUSES.has(status)) return NextResponse.json({ error: "invalid_payload" }, { status: 400 });

    const response = await fetch(`${SUPABASE_URL}/rest/v1/data_reports?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({
        status,
        reviewed_at: status === "pending" ? null : new Date().toISOString(),
      }),
    });

    if (!response.ok) return NextResponse.json({ error: "storage_failed" }, { status: 502 });
    const rows = await response.json();
    return NextResponse.json({ ok: true, configured: true, report: Array.isArray(rows) ? rows[0] : null });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
}
