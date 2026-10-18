import { ApiError, delay } from '@/shared/api';
import type { Role, SessionUser } from '../model/types';

type StoredUser = SessionUser & { password: string };

/** Demo accounts available out of the box (password for all: demo1234). */
const demoUsers: StoredUser[] = [
  {
    id: 'u-startup',
    email: 'startup@demo.ru',
    password: 'demo1234',
    role: 'startup',
    fullName: 'Алексей Алексеев',
    phone: '+7 900 900 00 00',
  },
  {
    id: 'u-investor',
    email: 'investor@demo.ru',
    password: 'demo1234',
    role: 'investor',
    fullName: 'Ирина Соколова',
    phone: '+7 900 900 00 01',
  },
  {
    id: 'u-corporate',
    email: 'corporate@demo.ru',
    password: 'demo1234',
    role: 'corporate',
    fullName: 'Павел Лебедев',
    phone: '+7 900 900 00 02',
  },
  {
    id: 'u-expert',
    email: 'expert@demo.ru',
    password: 'demo1234',
    role: 'expert',
    fullName: 'Ольга Никитина',
    phone: '+7 900 900 00 03',
  },
];

const USERS_KEY = 'sp_mock_users';

function readUsers(): StoredUser[] {
  if (typeof window === 'undefined') return demoUsers;
  try {
    const stored: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
    return [...demoUsers, ...stored];
  } catch {
    return demoUsers;
  }
}

function saveUser(user: StoredUser) {
  try {
    const stored: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
    localStorage.setItem(USERS_KEY, JSON.stringify([...stored.filter((u) => u.email !== user.email), user]));
  } catch {
    /* ignore storage errors in mock mode */
  }
}

const strip = ({ password: _password, ...user }: StoredUser): SessionUser => user;
const normalize = (email: string) => email.trim().toLowerCase();

export async function login(email: string, password: string): Promise<SessionUser> {
  await delay(600);
  const user = readUsers().find((candidate) => candidate.email === normalize(email));
  if (!user || user.password !== password) throw new ApiError('Неверная электронная почта или пароль', 401);
  return strip(user);
}

export async function checkEmailAvailable(email: string): Promise<void> {
  await delay(500);
  if (readUsers().some((user) => user.email === normalize(email))) {
    throw new ApiError('Аккаунт с такой почтой уже зарегистрирован', 409);
  }
}

/** Any 6-digit code is accepted except 000000, which emulates a wrong code. */
export async function verifyEmailCode(code: string): Promise<void> {
  await delay(500);
  if (!/^\d{6}$/.test(code) || code === '000000') throw new ApiError('Неверный код подтверждения', 400);
}

export async function resendEmailCode(): Promise<void> {
  await delay(300);
}

export async function completeRegistration(params: {
  role: Role;
  email: string;
  password: string;
  fullName: string;
  phone: string;
}): Promise<SessionUser> {
  await delay(800);
  const user: StoredUser = { id: `u-${Date.now()}`, ...params, email: normalize(params.email) };
  saveUser(user);
  return strip(user);
}

export async function requestPasswordReset(email: string): Promise<void> {
  await delay(600);
  if (!normalize(email).includes('@')) throw new ApiError('Укажите корректную почту', 400);
}

export async function setNewPassword(password: string): Promise<SessionUser> {
  await delay(600);
  if (password.length < 8) throw new ApiError('Пароль должен быть не короче 8 символов', 400);
  return strip(demoUsers[0]);
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  await delay(600);
  if (oldPassword === newPassword) throw new ApiError('Новый пароль должен отличаться от старого', 400);
}

export async function requestEmailChange(newEmail: string): Promise<void> {
  await delay(600);
  if (!normalize(newEmail).includes('@')) throw new ApiError('Укажите корректную почту', 400);
}
