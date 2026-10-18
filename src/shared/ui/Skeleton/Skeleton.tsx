import { cn } from '@/shared/lib/cn';
import styles from './Skeleton.module.css';

type SkeletonProps = { height?: number | string; width?: number | string; radius?: number; className?: string };

/** Shimmering placeholder shown while mock requests are in flight. */
export function Skeleton({ height = 20, width = '100%', radius = 10, className }: SkeletonProps) {
  return (
    <span className={cn(styles.skeleton, className)} style={{ height, width, borderRadius: radius }} aria-hidden />
  );
}

export function SkeletonList({ count = 3, height = 220, gap = 20 }: { count?: number; height?: number; gap?: number }) {
  return (
    <div className={styles.list} style={{ gap }} aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Загрузка…</span>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} height={height} />
      ))}
    </div>
  );
}
