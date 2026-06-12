import { format, formatDistanceToNow, isToday, parseISO } from 'date-fns';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM d, yyyy');
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'h:mm a');
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, "MMM d, yyyy 'at' h:mm a");
}

export function formatRelative(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function isDateToday(date: string | Date): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return isToday(d);
}
