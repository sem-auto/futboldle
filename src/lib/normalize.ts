export function normalize(str: string): string {
  return str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z]/g,"");
}

/**
 * Remove player name/answer from a hint string to avoid spoiling the answer.
 * Replaces any occurrence of name parts (3+ chars) with "***".
 */
export function sanitizeHint(hint: string, answer: string, displayName: string): string {
  let safe = hint;
  const parts = [...answer.split(""), ...displayName.split(" ")]
    .filter(p => p.length > 3)
    .map(p => normalize(p));
  for (const part of parts) {
    const re = new RegExp(part, "gi");
    safe = safe.replace(re, "***");
  }
  return safe;
}
