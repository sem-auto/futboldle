import { permanentRedirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LegacyClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/club/${slug}`);
}

