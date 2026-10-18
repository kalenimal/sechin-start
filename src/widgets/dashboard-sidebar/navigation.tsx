import { CalendarDays, FileChartPie, FileSearch, Heart, Mail, Rocket, Search } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Role } from '@/entities/session';
import { routes } from '@/shared/config';

export type NavItem = { href: string; label: string; icon: ReactNode; badge?: number; exact?: boolean };

const calendar: NavItem = { href: routes.calendar, label: 'Календарь событий', icon: <CalendarDays /> };
/** Chat isn't implemented yet; the badge mirrors the design until the messaging API exists. */
const UNREAD_MESSAGES_MOCK = 99;
const communication: NavItem = {
  href: routes.communication,
  label: 'Коммуникация',
  icon: <Mail />,
  badge: UNREAD_MESSAGES_MOCK,
};
const favourites: NavItem = { href: routes.favourites, label: 'Избранное', icon: <Heart /> };

export const navigationByRole: Record<Role, NavItem[]> = {
  startup: [{ href: routes.dashboard, label: 'Мои проекты', icon: <Rocket />, exact: true }, communication, calendar],
  investor: [
    { href: routes.dashboard, label: 'Лента проектов', icon: <Rocket />, exact: true },
    favourites,
    communication,
    { href: routes.analytics, label: 'Аналитика', icon: <FileChartPie /> },
    calendar,
  ],
  corporate: [
    { href: routes.dashboard, label: 'Мои запросы', icon: <FileSearch />, exact: true },
    favourites,
    communication,
    calendar,
  ],
  expert: [
    { href: routes.dashboard, label: 'Заявки на проверку', icon: <FileSearch />, exact: true },
    { href: routes.myExpertise, label: 'Мои проверки', icon: <Search /> },
    calendar,
  ],
};
