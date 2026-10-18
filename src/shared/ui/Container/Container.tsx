import type { ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './Container.module.css';

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Centered 1200px public-site column with responsive side gutters. */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn(styles.container, className)}>{children}</Tag>;
}
