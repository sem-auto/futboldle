export function getDayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export function getDayNumber(): number {
  const start = new Date("2025-01-01").getTime();
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.floor((today.getTime()-start)/86400000)+1;
}

export function getDailySeed(): number {
  const d = new Date();
  return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
}
