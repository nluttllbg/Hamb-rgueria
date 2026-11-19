import { business, type DayKey } from '../data/business';

export interface OpeningStatus {
  isOpen: boolean;
  label: 'Aberto agora' | 'Fechado';
  detail: string;
  dayKey: DayKey;
  currentTimeMinutes: number;
}

const WEEKDAY_MAP: Record<string, DayKey> = {
  mon: 'mon',
  tue: 'tue',
  wed: 'wed',
  thu: 'thu',
  fri: 'fri',
  sat: 'sat',
  sun: 'sun',
};

export function parseTimeToMinutes(timeStr: string): number {
  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    throw new Error(`Invalid time string: ${timeStr}`);
  }
  return hours * 60 + minutes;
}

export function getSaoPauloParts(date: Date): {
  dayKey: DayKey;
  hour: number;
  minute: number;
} {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: business.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekdayRaw = parts.find((p) => p.type === 'weekday')?.value.toLowerCase().slice(0, 3) ?? 'mon';
  const hourRaw = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minuteRaw = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');

  const dayKey = WEEKDAY_MAP[weekdayRaw] ?? 'mon';
  const hour = hourRaw === 24 ? 0 : hourRaw;

  return {
    dayKey,
    hour,
    minute: minuteRaw,
  };
}

export function getOpeningStatus(date: Date = new Date()): OpeningStatus {
  const { dayKey, hour, minute } = getSaoPauloParts(date);
  const currentTimeMinutes = hour * 60 + minute;
  const [openStr, closeStr] = business.hours[dayKey];
  const openMinutes = parseTimeToMinutes(openStr);
  const closeMinutes = parseTimeToMinutes(closeStr);

  const isOpen = currentTimeMinutes >= openMinutes && currentTimeMinutes < closeMinutes;

  return {
    isOpen,
    label: isOpen ? 'Aberto agora' : 'Fechado',
    detail: isOpen ? `Até ${closeStr}` : `Abre às ${openStr}`,
    dayKey,
    currentTimeMinutes,
  };
}
