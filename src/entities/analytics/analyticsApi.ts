'use client';

import { useQuery } from '@tanstack/react-query';
import { delay } from '@/shared/api';
import { todayIso } from '@/shared/lib/format';

export type DailyStat = { date: string; views: number; requests: number };
export type Period = { from: string; to: string };

/** Deterministic pseudo-random stats so the chart is stable between reloads. */
function seeded(date: string, salt: number) {
  let hash = salt;
  for (const char of date) hash = (hash * 33 + char.charCodeAt(0)) % 1_000_003;
  return hash;
}

export async function getInvestorStats(period: Period): Promise<DailyStat[]> {
  await delay(300);
  const days: DailyStat[] = [];
  const cursor = new Date(`${period.from}T00:00:00`);
  const end = new Date(`${period.to}T00:00:00`);
  while (cursor <= end && days.length < 62) {
    const iso = todayIso(cursor);
    days.push({ date: iso, views: 4 + (seeded(iso, 7) % 12), requests: seeded(iso, 13) % 3 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export const useInvestorStats = (period: Period) =>
  useQuery({ queryKey: ['analytics', period], queryFn: () => getInvestorStats(period) });
