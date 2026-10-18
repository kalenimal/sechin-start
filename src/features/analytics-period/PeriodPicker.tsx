'use client';

import { useCallback, useRef, useState } from 'react';
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import type { Period } from '@/entities/analytics';
import { cn } from '@/shared/lib/cn';
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside';
import { formatPeriod, monthsNominative, presetLabels, presetPeriod, type PresetKey } from './periods';
import styles from './PeriodPicker.module.css';

type Props = { value: Period; preset: PresetKey; onChange: (period: Period, preset: PresetKey) => void };

const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const pad = (n: number) => String(n).padStart(2, '0');

/** Period dropdown: quick presets + month calendar for a custom range (click start, then end). */
export function PeriodPicker({ value, preset, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => {
    const [y, m] = value.to.split('-').map(Number);
    return { y, m: m - 1 };
  });
  const [anchor, setAnchor] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  const first = new Date(month.y, month.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - offset + 1;
    const date = new Date(month.y, month.m, day);
    return {
      iso: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      day: date.getDate(),
      inMonth: day >= 1 && day <= daysInMonth,
    };
  });

  const pickDay = (iso: string) => {
    if (!anchor) {
      setAnchor(iso);
      onChange({ from: iso, to: iso }, 'custom');
      return;
    }
    const [from, to] = anchor < iso ? [anchor, iso] : [iso, anchor];
    setAnchor(null);
    onChange({ from, to }, 'custom');
    setOpen(false);
  };

  const shift = (delta: number) =>
    setMonth(({ y, m }) => {
      const date = new Date(y, m + delta, 1);
      return { y: date.getFullYear(), m: date.getMonth() };
    });

  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div ref={ref} className={styles.root}>
      <button
        type="button"
        className={cn(styles.trigger, open && styles.open)}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        <CalendarDays aria-hidden />
        <span>{formatPeriod(value)}</span>
        <Chevron aria-hidden className={styles.chevron} />
      </button>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Выбор периода">
          <ul className={styles.presets}>
            {(Object.keys(presetLabels) as Exclude<PresetKey, 'custom'>[]).map((key) => (
              <li key={key}>
                <button
                  type="button"
                  className={styles.preset}
                  onClick={() => {
                    onChange(presetPeriod(key), key);
                    setOpen(false);
                  }}
                >
                  {presetLabels[key]}
                  {preset === key && <Check aria-hidden />}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
              <span>
                {monthsNominative[month.m]} {month.y}
              </span>
              <span className={styles.arrows}>
                <button type="button" aria-label="Предыдущий месяц" onClick={() => shift(-1)}>
                  <ChevronLeft aria-hidden />
                </button>
                <button type="button" aria-label="Следующий месяц" onClick={() => shift(1)}>
                  <ChevronRight aria-hidden />
                </button>
              </span>
            </div>
            <div className={styles.grid} role="grid">
              {weekdays.map((day) => (
                <span key={day} className={styles.weekday}>
                  {day}
                </span>
              ))}
              {cells.map((cell) => {
                const inRange = cell.iso >= value.from && cell.iso <= value.to;
                const edge = cell.iso === value.from || cell.iso === value.to;
                return (
                  <button
                    key={cell.iso}
                    type="button"
                    className={cn(
                      styles.day,
                      !cell.inMonth && styles.outside,
                      inRange && styles.inRange,
                      edge && styles.edge,
                    )}
                    onClick={() => pickDay(cell.iso)}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
