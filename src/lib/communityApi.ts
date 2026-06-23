export type CommunityResultInput = {
  modeId: string;
  challengeId: string;
  seasonId?: string;
  won: boolean;
  attempts?: number;
  timeSpent?: number;
};

export type CommunityStats = {
  plays: number;
  wins: number;
  completion: number;
  averageAttempts: number | null;
};

export type CommunityEventInput = {
  eventName: string;
  modeId?: string;
  challengeId?: string;
  seasonId?: string;
};

function getInstallId() {
  const key = "fbl-install-id-v1";
  try {
    const current = localStorage.getItem(key);
    if (current) return current;
    const next = crypto.randomUUID();
    localStorage.setItem(key, next);
    return next;
  } catch {
    return "anonymous";
  }
}

export async function submitCommunityResult(result: CommunityResultInput) {
  try {
    await fetch("/api/community", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...result, installId: getInstallId() }),
      keepalive: true,
    });
  } catch {}
}

export async function fetchCommunityStats(modeId: string, challengeId: string): Promise<CommunityStats | null> {
  try {
    const response = await fetch(`/api/community?modeId=${encodeURIComponent(modeId)}&challengeId=${encodeURIComponent(challengeId)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.configured && data?.stats ? data.stats as CommunityStats : null;
  } catch {
    return null;
  }
}

export async function submitCommunityEvent(event: CommunityEventInput) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...event, installId: getInstallId() }),
      keepalive: true,
    });
  } catch {}
}

export async function submitDataReport(report: Record<string, string>) {
  try {
    await fetch("/api/reports", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...report, installId: getInstallId() }),
      keepalive: true,
    });
  } catch {}
}
