import type { Metadata } from "next";
import Link from "next/link";
import FinalMundial from "@/components/FinalMundial";
import IconUnlockToast from "@/components/IconUnlockToast";

export const metadata: Metadata = { title: "Final Mundial | Adivina el año de la final", description: "Reconoce finales históricas de los Mundiales y adivina en qué año se jugaron.", alternates: { canonical: "https://futboldle.es/world-cups/final" }, openGraph: { title: "Final Mundial - Futboldle", description: "Adivina el año de una final histórica.", url: "https://futboldle.es/world-cups/final", images: ["https://futboldle.es/og-image.png"] } };

export default function FinalMundialPage() { return <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}><IconUnlockToast /><div className="max-w-xl mx-auto flex flex-col gap-3"><Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Mundiales</Link><FinalMundial /></div></main>; }
