import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './DashboardPage.module.css';

type DashboardPageProps = {
  title?: ReactNode;
  count?: number;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** `centered` — 908px content column (лента, уведомления); `wide` — full container (grid of cards). */
  width?: 'wide' | 'centered';
  children: ReactNode;
  className?: string;
};

/** Page heading inside the white dashboard container: H3 title + grey counter, optional controls, divider. */
export function DashboardPage({
  title,
  count,
  subtitle,
  actions,
  width = 'wide',
  children,
  className,
}: DashboardPageProps) {
  return (
    <div className={cn(styles.page, styles[width], className)}>
      {title && (
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <h1 className={styles.title}>
              {title}
              {count !== undefined && <span className={styles.count}> {count}</span>}
            </h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      {children}
    </div>
  );
}
