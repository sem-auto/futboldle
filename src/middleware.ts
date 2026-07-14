import { NextRequest, NextResponse } from "next/server";
import { getAdminToken, isAdminRequest } from "@/lib/serverAdminAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!getAdminToken() && process.env.NODE_ENV === "production") {
      return new NextResponse("Admin no configurado", {
        status: 503,
        headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
      });
    }
    if (!isAdminRequest(request)) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

