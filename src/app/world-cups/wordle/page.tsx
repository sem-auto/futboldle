import type { Metadata } from "next";
import Link from "next/link";
import WorldCupWordle from "@/components/WorldCupWordle";

export const metadata: Metadata = {
  title: "Wordle Mundial | Adivina el futbolista mundialista",
  description: "Juega gratis al Wordle Mundial de Futboldle. Adivina cada día un futbolista histórico de los Mundiales.",
  alternates: { canonical: "https://futboldle.es/world-cups/wordle" },
  openGraph: { title: "Wordle Mundial - Futboldle", description: "Adivina el mundialista del día.", url: "https://futboldle.es/world-cups/wordle", images: ["https://futboldle.es/og-image.png"] },
};

export default function WorldCupWordlePage() {
  return <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}><div className="max-w-xl mx-auto flex flex-col gap-3"><Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Mundiales</Link><WorldCupWordle /></div></main>;
}
