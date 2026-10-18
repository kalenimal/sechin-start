const rub = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });

export const formatRub = (value: number) => `${rub.format(value).replace(/ /g, ' ')} ₽`;

export const fundingProgress = (raised: number, goal: number) =>
  goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

export function pluralize(count: number, forms: [string, string, string]) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export const investorsLabel = (count: number) =>
  `${count} ${pluralize(count, ['инвестор', 'инвестора', 'инвесторов'])}`;

/** ISO date → "09.09.2026". */
export function formatDate(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split('-');
  return `${day}.${month}.${year}`;
}

export const formatMillions = (range: { from: number; to: number }) => `${range.from}–${range.to} млн ₽`;

/** Local calendar date as YYYY-MM-DD (toISOString() would shift the day in non-UTC timezones). */
export function todayIso(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
