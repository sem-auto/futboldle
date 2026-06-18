import type { Metadata } from "next";
import Link from "next/link";
import AlbumWorldCups from "@/components/AlbumWorldCups";

export const metadata: Metadata = {
  title: "Colección Mundialista | Cromos de los Mundiales",
  description: "Completa el álbum mundialista de Futboldle y desbloquea leyendas, campeones, goleadores y héroes de los Mundiales.",
  alternates: { canonical: "https://futboldle.es/world-cups/collection" },
};

export default function WorldCupCollectionPage() {
  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/world-cups" className="text-[12px] font-semibold" style={{ color: "#6b6b72" }}>{"\u2190"} Mundiales</Link>
          <Link href="/perfil" className="text-[11px] font-semibold" style={{ color: "#174ea6" }}>Ver perfil</Link>
        </div>
        <AlbumWorldCups />
      </div>
    </main>
  );
}
