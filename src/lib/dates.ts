function todayStr(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function isOverdue(due: string | null): boolean {
  return !!due && due < todayStr();
}

export function formatDue(due: string): string {
  if (due === todayStr()) return 'Today';
  if (due === todayStr(1)) return 'Tomorrow';
  if (due === todayStr(-1)) return 'Yesterday';
  const [y, m, d] = due.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
