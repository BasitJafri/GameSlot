import { BOOKING_WINDOW_DAYS } from '../config/constants';

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PK', {
    month: 'short',
    day: 'numeric',
  });
}

export function getDayLabel(dateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + 'T00:00:00');
  d.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'TODAY';
  if (diff === 1) return 'TOMORROW';
  if (diff === 2) return 'DAY AFTER TOMORROW';
  return formatDateShort(dateStr);
}

export function getDayName(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PK', { weekday: 'long' });
}

export function getBookingDates(): string[] {
  const dates: string[] = [];
  for (let i = 0; i < BOOKING_WINDOW_DAYS; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `GIN-${year}-${rand}`;
}

export function formatCurrency(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return phone;
}

export function validatePhone(phone: string): boolean {
  return /^03\d{2}-?\d{7}$/.test(phone.replace(/\s/g, ''));
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '…';
}

/** Convert minutes-since-midnight to a 12h display string, e.g. 600 → "10:00 AM" */
export function minutesToDisplay(minutes: number): string {
  const totalMin = minutes % 1440; // wrap at midnight
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
}

/** Format duration minutes as a readable label, e.g. 90 → "1h 30m", 120 → "2h" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** Returns true if range [s1,e1) overlaps with [s2,e2) */
export function rangesOverlap(s1: number, e1: number, s2: number, e2: number): boolean {
  return s1 < e2 && e1 > s2;
}
