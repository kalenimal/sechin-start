'use client';

import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { useHideOnScroll } from '@/shared/lib/hooks/useHideOnScroll';
import styles from './PublicHeader.module.css';

/** Sticky header that slides away on scroll down and returns on scroll up (or when focused via keyboard). */
export function HeaderShell({ children }: { children: ReactNode }) {
  const { hidden, scrolled } = useHideOnScroll();
  return (
    <header className={cn(styles.header, hidden && styles.hidden, scrolled && styles.scrolled)}>{children}</header>
  );
}
