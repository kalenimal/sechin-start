'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './MenuButton.module.css';

type MenuButtonProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  active?: boolean;
  badge?: number;
  className?: string;
};

/** Sidebar navigation item (UI KIT → Menu_Button). */
export function MenuButton({ href, icon, children, active = false, badge, className }: MenuButtonProps) {
  return (
    <Link
      href={href}
      className={cn(styles.root, active && styles.active, className)}
      aria-current={active ? 'page' : undefined}
    >
      <span className={styles.iconBox} aria-hidden>
        {icon}
      </span>
      <span className={styles.label}>{children}</span>
      {!!badge && (
        <span className={styles.badge} aria-label={`${badge} новых`}>
          {badge > 99 ? '99' : badge}
        </span>
      )}
    </Link>
  );
}
