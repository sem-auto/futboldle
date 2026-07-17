"use client";

import { useRouter } from "next/navigation";
import StatdleBBVA from "@/components/StatdleBBVA";
import TrayectoriaBBVA from "@/components/TrayectoriaBBVA";
import WordleBBVA from "@/components/WordleBBVA";

type Mode = "wordle" | "trayectoria" | "statdle";

export default function BBVAGameRoute({ mode }: { mode: Mode }) {
  const router = useRouter();
  const onBack = () => router.push("/liga-bbva");

  if (mode === "wordle") return <WordleBBVA onBack={onBack} />;
  if (mode === "trayectoria") return <TrayectoriaBBVA onBack={onBack} />;
  return <StatdleBBVA onBack={onBack} />;
}
