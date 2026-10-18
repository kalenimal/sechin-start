'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronRight, CircleHelp } from 'lucide-react';
import { useNotifications } from '@/entities/notification';
import { useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { Logo, MenuButton } from '@/shared/ui';
import { navigationByRole } from './navigation';
import styles from './DashboardSidebar.module.css';

export function DashboardSidebar() {
  const pathname = usePathname();
  const user = useSession((state) => state.user);
  const { data: notifications = [] } = useNotifications();
  if (!user) return null;

  const unread = notifications.filter((item) => !item.read).length;

  const items = navigationByRole[user.role];
  const isActive = (href: string, exact?: boolean) =>
    exact
      ? pathname === href || (href === routes.dashboard && pathname.startsWith('/dashboard/projects'))
      : pathname.startsWith(href);

  return (
    <aside className={styles.sidebar}>
      <Logo variant="horizontal" href={routes.dashboard} className={styles.logo} />
      <div className={styles.account}>
        <Link
          href={routes.profile}
          className={cn(styles.user, pathname === routes.profile && styles.userActive)}
          aria-current={pathname === routes.profile ? 'page' : undefined}
        >
          <span className={styles.avatar} aria-hidden>
            {(user.fullName || user.email).charAt(0).toUpperCase()}
          </span>
          <span className={styles.email} title={user.email}>
            {user.email}
          </span>
          <ChevronRight className={styles.chevron} aria-hidden />
        </Link>
        <Link
          href={routes.notifications}
          className={cn(styles.bell, pathname === routes.notifications && styles.bellActive)}
          aria-label={unread ? `Уведомления, ${unread} непрочитанных` : 'Уведомления'}
        >
          <Bell aria-hidden />
          {unread > 0 && (
            <span key={unread} className={styles.badge}>
              {unread > 99 ? '99+' : unread}
            </span>
          )}
        </Link>
      </div>
      <nav className={styles.nav} aria-label="Разделы кабинета">
        {items.map((item) => (
          <MenuButton
            key={item.href}
            href={item.href}
            icon={item.icon}
            badge={item.badge}
            active={isActive(item.href, item.exact)}
          >
            {item.label}
          </MenuButton>
        ))}
      </nav>
      <MenuButton href={routes.help} icon={<CircleHelp />} active={pathname === routes.help} className={styles.help}>
        Помощь
      </MenuButton>
    </aside>
  );
}
