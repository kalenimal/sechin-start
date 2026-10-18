import { todayIso } from '@/shared/lib/format';
import type { Period } from '@/entities/analytics';

export type PresetKey = 'all' | 'today' | 'week' | 'last-week' | 'month' | 'last-month' | 'custom';

const iso = (date: Date) => todayIso(date);

const startOfWeek = (date: Date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
  return copy;
};

export function presetPeriod(key: Exclude<PresetKey, 'custom'>, today = new Date()): Period {
  const d = new Date(today);
  switch (key) {
    case 'today':
      return { from: iso(d), to: iso(d) };
    case 'week': {
      const start = startOfWeek(d);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { from: iso(start), to: iso(end) };
    }
    case 'last-week': {
      const start = startOfWeek(d);
      start.setDate(start.getDate() - 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { from: iso(start), to: iso(end) };
    }
    case 'month':
      return {
        from: iso(new Date(d.getFullYear(), d.getMonth(), 1)),
        to: iso(new Date(d.getFullYear(), d.getMonth() + 1, 0)),
      };
    case 'last-month':
      return {
        from: iso(new Date(d.getFullYear(), d.getMonth() - 1, 1)),
        to: iso(new Date(d.getFullYear(), d.getMonth(), 0)),
      };
    case 'all':
      return { from: iso(new Date(d.getFullYear(), d.getMonth() - 1, 1)), to: iso(d) };
  }
}

export const presetLabels: Record<Exclude<PresetKey, 'custom'>, string> = {
  all: 'Все время',
  today: 'Сегодня',
  week: 'Эта неделя',
  'last-week': 'Прошлая неделя',
  month: 'Этот месяц',
  'last-month': 'Прошлый месяц',
};

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
export const monthsNominative = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

/** "7-13 сентября 2026" / "28 августа – 3 сентября 2026". */
export function formatPeriod({ from, to }: Period) {
  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  if (from === to) return `${fd} ${months[fm - 1]} ${fy}`;
  if (fm === tm && fy === ty) return `${fd}-${td} ${months[tm - 1]} ${ty}`;
  return `${fd} ${months[fm - 1]} – ${td} ${months[tm - 1]} ${ty}`;
}

export function formatPeriodLong({ from, to }: Period) {
  const [, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  if (from === to) return `За ${fd} ${months[fm - 1]} ${ty}`;
  return fm === tm
    ? `За период с ${fd} по ${td} ${months[tm - 1]} ${ty}`
    : `За период с ${fd} ${months[fm - 1]} по ${td} ${months[tm - 1]} ${ty}`;
}
