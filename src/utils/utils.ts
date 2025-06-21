export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const padded = (n: number) => String(n).padStart(2, '0');

  if (hours > 0) return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
  return `${padded(minutes)}:${padded(seconds)}`;
}


export default formatDuration;