import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { ChamferFrame } from '../ChamferFrame';
import styles from './ChamferCard.module.css';

type ChamferCardProps = {
  children: ReactNode;
  /** Colour of the folded corner mark in the cut bottom-right corner. */
  corner?: string;
  stroke?: string;
  muted?: boolean;
  className?: string;
};

/** 288×323 dashboard tile with a 45° cut corner and a status-coloured corner mark. */
export function ChamferCard({ children, corner, stroke, muted, className }: ChamferCardProps) {
  return (
    <article className={cn(styles.card, muted && styles.muted, className)}>
      <ChamferFrame width={288} height={323} stroke={stroke} />
      {corner && <span className={styles.corner} style={{ background: corner }} aria-hidden />}
      <div className={styles.body}>{children}</div>
    </article>
  );
}
