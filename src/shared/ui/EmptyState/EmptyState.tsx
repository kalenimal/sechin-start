import type { ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
  title: ReactNode;
  icon?: 'search' | 'not-found';
  action?: ReactNode;
  className?: string;
};

/** "По вашему запросу результатов не найдено..." placeholder with the dashed document illustration. */
export function EmptyState({ title, icon = 'not-found', action, className }: EmptyStateProps) {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.art} aria-hidden>
        <span className={styles.sheet}>{icon === 'not-found' && <X className={styles.cross} />}</span>
        <Search className={styles.search} />
      </div>
      <p className={styles.title}>{title}</p>
      {action}
    </div>
  );
}
