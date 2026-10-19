export type Role = 'startup' | 'investor' | 'corporate' | 'expert';

export const ROLES: Role[] = ['startup', 'investor', 'corporate', 'expert'];

export const roleLabels: Record<Role, string> = {
  startup: 'Цифровой сервис',
  investor: 'Инвестор',
  corporate: 'Корпорация',
  expert: 'Эксперт',
};

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  phone: string;
};

export const SESSION_COOKIE = 'sp_session';

export const isRole = (value: unknown): value is Role => typeof value === 'string' && ROLES.includes(value as Role);
