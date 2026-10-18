'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import styles from './PublicHeader.module.css';

const links = [
  { href: routes.home, label: 'Главная', match: (path: string) => path === '/' },
  { href: routes.startups, label: 'Стартапы', match: (path: string) => path.startsWith('/startups') },
];

export function PublicNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      {links.map((link) => {
        const active = link.match(pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(styles.navLink, active && styles.navLinkActive)}
            aria-current={active ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
