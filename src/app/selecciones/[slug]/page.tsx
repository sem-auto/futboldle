import { permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LegacySeleccionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/seleccion/${slug}`);
}

