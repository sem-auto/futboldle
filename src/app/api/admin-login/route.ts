import { NextRequest, NextResponse } from "next/server";
import { getAdminToken, makeAdminCookie } from "@/lib/serverAdminAuth";
import { isRateLimited, requestIp } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  if (isRateLimited(`admin-login:${requestIp(request)}`, 8, 60_000)) {
    return new NextResponse("Demasiados intentos", { status: 429 });
  }

  const expected = getAdminToken();
  if (!expected && process.env.NODE_ENV === "production") {
    return new NextResponse("Admin no configurado", { status: 503 });
  }

  const form = await request.formData();
  const token = String(form.get("token") ?? "");
  const next = String(form.get("next") ?? "/admin/audit");
  const safeNext = next.startsWith("/admin") ? next : "/admin/audit";

  if (expected && token !== expected) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", safeNext);
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(new URL(safeNext, request.url), 303);
  response.cookies.set(makeAdminCookie(expected || "dev"));
  return response;
}

