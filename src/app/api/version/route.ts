import { NextResponse } from "next/server";
import packageJson from "../../../../package.json";

export const dynamic = "force-dynamic";

const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString();

export function GET() {
  return NextResponse.json({
    app: "futboldle",
    version: packageJson.version,
    commit:
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
      process.env.NEXT_PUBLIC_BUILD_ID ??
      "local",
    buildDate: BUILD_DATE,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "local",
    timezone: "Europe/Madrid",
  });
}
