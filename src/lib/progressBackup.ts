const BACKUP_VERSION = 1;

const REQUIRED_PREFIX = "fbl-";

export type ProgressBackup = {
  app: "Futboldle";
  version: number;
  exportedAt: string;
  storage: Record<string, string>;
};

function isSafeKey(key: string) {
  return key.startsWith(REQUIRED_PREFIX);
}

export function exportProgressBackup(): ProgressBackup {
  const storage: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !isSafeKey(key)) continue;
      const value = localStorage.getItem(key);
      if (value !== null) storage[key] = value;
    }
  } catch {}

  return {
    app: "Futboldle",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    storage,
  };
}

export function stringifyProgressBackup() {
  return JSON.stringify(exportProgressBackup(), null, 2);
}

export function importProgressBackup(raw: string) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("El JSON no es válido. Revisa que hayas pegado la copia completa.");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("El archivo de progreso no tiene el formato correcto.");
  }

  const backup = parsed as Partial<ProgressBackup>;
  if (backup.app !== "Futboldle" || typeof backup.storage !== "object" || !backup.storage || Array.isArray(backup.storage)) {
    throw new Error("Esta copia no parece ser un progreso válido de Futboldle.");
  }

  const entries = Object.entries(backup.storage).filter(([key, value]) => isSafeKey(key) && typeof value === "string");
  if (entries.length === 0) {
    throw new Error("La copia no contiene progreso restaurable.");
  }

  try {
    for (const [key, value] of entries) localStorage.setItem(key, value);
  } catch {
    throw new Error("No se pudo guardar el progreso en este navegador.");
  }

  return entries.length;
}
