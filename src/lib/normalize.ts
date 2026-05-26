export function normalize(str: string): string {
  return str
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z]/g, "");
}

export function normalizeDisplay(str: string): string {
  return str
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function isValidLetter(char: string): boolean {
  return /^[a-zA-ZÀ-ÿ]$/.test(char);
}
