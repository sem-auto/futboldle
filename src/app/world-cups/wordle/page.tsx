import type { Metadata } from "next";
import Link from "next/link";
import WorldCupWordle from "@/components/WorldCupWordle";

export const metadata: Metadata = {
  title: "Wordle Mundial | Adivina el futbolista mundialista",
  description: "Juega gratis al Wordle Mundial de Futboldle. Adivina cada día un futbolista histórico de los Mundiales.",
  alternates: { canonical: "https://futboldle.es/world-cups/wordle" },
  openGraph: { title: "Wordle Mundial - Futboldle", description: "Adivina el mundialista del día.", url: "https://futboldle.es/world-cups/wordle", images: ["https://futboldle.es/og-image.png"] },
};

export default async function WorldCupWordlePage({ searchParams }: { searchParams: Promise<{ extra?: string }> }) {
  const params = await searchParams;
  const parsedExtra = Number.parseInt(params.extra ?? "0", 10);
  const extraIndex = Number.isFinite(parsedExtra) ? Math.max(0, Math.min(parsedExtra, 999)) : 0;
  return <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}><div className="max-w-xl mx-auto flex flex-col gap-3"><Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Mundiales</Link><WorldCupWordle key={extraIndex} initialExtraIndex={extraIndex} /></div></main>;
}
