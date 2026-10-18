'use client';

import { useState } from 'react';
import { FileText, Mail } from 'lucide-react';
import { useInvestorStats, type Period } from '@/entities/analytics';
import { formatPeriodLong, PeriodPicker, presetPeriod, type PresetKey } from '@/features/analytics-period';
import { GroupedBarChart } from '@/shared/ui/GroupedBarChart';
import { DashboardPage } from '@/widgets/dashboard-page';
import styles from './AnalyticsPage.module.css';

const series = [
  { key: 'views' as const, label: 'Просмотрено проектов', color: 'var(--color-secondary)' },
  { key: 'requests' as const, label: 'Отправлено запросов', color: 'var(--color-primary)' },
];

export function AnalyticsPage() {
  const [preset, setPreset] = useState<PresetKey>('week');
  const [period, setPeriod] = useState<Period>(() => presetPeriod('week'));
  const { data = [], isLoading } = useInvestorStats(period);
  const totals = data.reduce((acc, day) => ({ views: acc.views + day.views, requests: acc.requests + day.requests }), {
    views: 0,
    requests: 0,
  });
  // Long ranges are grouped by week to keep bars readable.
  const rows =
    data.length > 14
      ? Array.from({ length: Math.ceil(data.length / 7) }, (_, index) => {
          const chunk = data.slice(index * 7, index * 7 + 7);
          return {
            label: `${chunk[0].date.slice(8, 10)}.${chunk[0].date.slice(5, 7)}–${chunk.at(-1)!.date.slice(8, 10)}.${chunk.at(-1)!.date.slice(5, 7)}`,
            views: chunk.reduce((sum, day) => sum + day.views, 0),
            requests: chunk.reduce((sum, day) => sum + day.requests, 0),
          };
        })
      : data.map((day) => ({
          label: `${day.date.slice(8, 10)}.${day.date.slice(5, 7)}`,
          views: day.views,
          requests: day.requests,
        }));

  return (
    <DashboardPage
      title="Аналитика"
      subtitle="Просмотры проектов и запросы на доступ"
      actions={
        <PeriodPicker
          value={period}
          preset={preset}
          onChange={(next, key) => {
            setPeriod(next);
            setPreset(key);
          }}
        />
      }
    >
      <h2 className={styles.period}>{formatPeriodLong(period)}</h2>
      <div className={styles.tiles}>
        <div className={styles.tile}>
          <span className={styles.tileIcon}>
            <FileText aria-hidden />
          </span>
          <span>
            <span className={styles.tileLabel}>Просмотрено проектов</span>
            <span className={styles.tileValue}>{isLoading ? '—' : totals.views}</span>
          </span>
        </div>
        <div className={styles.tile}>
          <span className={styles.tileIcon}>
            <Mail aria-hidden />
          </span>
          <span>
            <span className={styles.tileLabel}>Отправлено запросов</span>
            <span className={styles.tileValue}>{isLoading ? '—' : totals.requests}</span>
          </span>
        </div>
      </div>
      <div className={styles.chartCard}>
        {rows.length > 0 && (
          <GroupedBarChart data={rows} series={series} ariaLabel="Просмотры проектов и отправленные запросы по дням" />
        )}
      </div>
    </DashboardPage>
  );
}
