import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "fbl_admin_token";

export function getAdminToken() {
  return process.env.FUTBOLDLE_ADMIN_TOKEN ?? "";
}

export function isAdminRequest(request: NextRequest) {
  const token = getAdminToken();
  if (!token) return process.env.NODE_ENV !== "production";
  const cookieToken = request.cookies.get(ADMIN_COOKIE)?.value;
  const headerToken = request.headers.get("x-admin-token");
  return cookieToken === token || headerToken === token;
}

export function adminUnauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

export function makeAdminCookie(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}
