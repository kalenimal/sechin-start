'use client';

import { useState } from 'react';
import styles from './GroupedBarChart.module.css';

export type ChartSeries<K extends string> = { key: K; label: string; color: string };

type Props<K extends string> = {
  data: (Record<K, number> & { label: string })[];
  series: ChartSeries<K>[];
  height?: number;
  ariaLabel: string;
};

const niceMax = (value: number) => {
  if (value <= 0) return 10;
  const step = Math.pow(10, Math.floor(Math.log10(value)));
  return Math.ceil(value / step / 2) * step * 2;
};

/** Grouped vertical bars with value labels, recessive grid, per-group hover tooltip and an accessible table. */
export function GroupedBarChart<K extends string>({ data, series, height = 220, ariaLabel }: Props<K>) {
  const [hover, setHover] = useState<number | null>(null);
  const max = niceMax(Math.max(...data.flatMap((row) => series.map((s) => row[s.key])), 0));
  const ticks = [0, max / 2, max];

  return (
    <figure className={styles.figure}>
      <div className={styles.plot} style={{ height }}>
        <div className={styles.yAxis} aria-hidden>
          {ticks
            .slice()
            .reverse()
            .map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
        </div>
        <div className={styles.area}>
          {ticks.map((tick) => (
            <span key={tick} className={styles.gridLine} style={{ bottom: `${(tick / max) * 100}%` }} aria-hidden />
          ))}
          <div className={styles.groups} role="img" aria-label={ariaLabel}>
            {data.map((row, index) => (
              <div
                key={row.label}
                className={styles.group}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
                tabIndex={0}
              >
                <div className={styles.bars}>
                  {series.map((s) => (
                    <div key={s.key} className={styles.barSlot}>
                      <span className={styles.value}>{row[s.key]}</span>
                      <span
                        className={styles.bar}
                        style={{ height: `${(row[s.key] / max) * 100}%`, background: s.color }}
                      />
                    </div>
                  ))}
                </div>
                <span className={styles.xLabel}>{row.label}</span>
                {hover === index && (
                  <div className={styles.tooltip} role="tooltip">
                    <p className={styles.tooltipTitle}>{row.label}</p>
                    {series.map((s) => (
                      <p key={s.key} className={styles.tooltipRow}>
                        <span className={styles.swatch} style={{ background: s.color }} />
                        {s.label}
                        <strong>{row[s.key]}</strong>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className={styles.legend}>
        {series.map((s) => (
          <span key={s.key}>
            <span className={styles.dot} style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </figcaption>
      <table className="visually-hidden">
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th scope="col">Дата</th>
            {series.map((s) => (
              <th key={s.key} scope="col">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {series.map((s) => (
                <td key={s.key}>{row[s.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
