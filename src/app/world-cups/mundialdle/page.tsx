"use client";

import { useRouter } from "next/navigation";
import Mundialdle from "@/components/Mundialdle";

export default function MundialdlePage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh px-3 py-4" style={{ background: "#f6f2ea" }}>
      <div className="max-w-2xl mx-auto">
        <Mundialdle onBack={() => router.push("/world-cups")} />
      </div>
    </main>
  );
}
