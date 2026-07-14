import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acceso admin - Futboldle",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  const next = params.next?.startsWith("/admin") ? params.next : "/admin/audit";
  return (
    <main className="min-h-dvh flex items-center justify-center px-4" style={{ background: "#f6f2ea" }}>
      <form method="POST" action="/api/admin-login" className="w-full max-w-sm rounded-3xl p-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 14px 34px rgba(0,0,0,0.10)" }}>
        <input type="hidden" name="next" value={next} />
        <div className="text-[10px] uppercase font-semibold tracking-[0.22em]" style={{ color: "#9a9a8a" }}>Futboldle admin</div>
        <h1 className="font-bebas text-[42px] leading-none mt-2">ACCESO PRIVADO</h1>
        <p className="text-[12px] mt-2" style={{ color: "#6b6b72" }}>Introduce el token de administración configurado en el servidor.</p>
        {params.error && <p className="text-[11px] mt-3 font-semibold" style={{ color: "#b81c14" }}>Token incorrecto.</p>}
        <input
          name="token"
          type="password"
          autoComplete="current-password"
          className="w-full mt-4 rounded-xl px-4 py-3 text-[14px] outline-none"
          style={{ border: "1px solid rgba(0,0,0,0.16)" }}
          placeholder="Token admin"
        />
        <button className="w-full mt-3 rounded-xl py-3 font-oswald font-semibold uppercase text-[12px]" style={{ background: "#18181b", color: "white" }}>
          Entrar
        </button>
      </form>
    </main>
  );
}
