import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './Tag.module.css';

type TagProps = {
  children: ReactNode;
  variant?: 'grey' | 'outline' | 'glass' | 'white';
  className?: string;
};

export function Tag({ children, variant = 'grey', className }: TagProps) {
  return <span className={cn(styles.tag, styles[variant], className)}>{children}</span>;
}

export function TagList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.list, className)}>{children}</div>;
}
