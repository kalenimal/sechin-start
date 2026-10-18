'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './Tabs.module.css';

export type TabItem<V extends string = string> = {
  value: V;
  label: ReactNode;
  count?: number;
  /** When set the tab renders as a link (crawlable navigation). */
  href?: string;
};

type TabsProps<V extends string> = {
  items: TabItem<V>[];
  value: V;
  onChange?: (value: V) => void;
  /** `segmented` — white bar with equal tabs (startup page); `underline` — compact text tabs (notifications); `pill` — expert filters. */
  variant?: 'segmented' | 'underline' | 'pill';
  className?: string;
  ariaLabel?: string;
};

export function Tabs<V extends string>({
  items,
  value,
  onChange,
  variant = 'segmented',
  className,
  ariaLabel,
}: TabsProps<V>) {
  return (
    <nav className={cn(styles.tabs, styles[variant], className)} aria-label={ariaLabel}>
      {items.map((item) => {
        const active = item.value === value;
        const inner = (
          <>
            <span>{item.label}</span>
            {item.count !== undefined && <span className={styles.count}>{item.count}</span>}
          </>
        );
        return item.href ? (
          <Link
            key={item.value}
            href={item.href}
            scroll={false}
            className={cn(styles.tab, active && styles.active)}
            aria-current={active ? 'page' : undefined}
          >
            {inner}
          </Link>
        ) : (
          <button
            key={item.value}
            type="button"
            className={cn(styles.tab, active && styles.active)}
            aria-pressed={active}
            onClick={() => onChange?.(item.value)}
          >
            {inner}
          </button>
        );
      })}
    </nav>
  );
}
