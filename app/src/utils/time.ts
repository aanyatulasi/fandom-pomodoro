export function formatClock(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function formatMinutesLabel(ms: number): string {
  const minutes = Math.round(ms / 60000);
  return `${minutes} min`;
}
