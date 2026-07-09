"use client";

import { useRouter } from "next/navigation";
import Top10BBVA from "@/components/Top10BBVA";

export default function Top10BBVAPageClient() {
  const router = useRouter();
  return <Top10BBVA onBack={() => router.push("/liga-bbva")} />;
}
