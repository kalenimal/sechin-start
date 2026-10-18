import type { ReactNode } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import styles from './CardsGrid.module.css';

export function CardsGrid({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return (
    <div className={`${styles.grid} stagger`} aria-busy={loading || undefined}>
      {children}
      {loading && Array.from({ length: 3 }, (_, index) => <Skeleton key={index} height={323} />)}
    </div>
  );
}
