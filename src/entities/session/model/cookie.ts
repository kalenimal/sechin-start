import { isRole, SESSION_COOKIE, type SessionUser } from './types';

const MAX_AGE = 60 * 60 * 24 * 30;

export function encodeSession(user: SessionUser): string {
  return encodeURIComponent(JSON.stringify(user));
}

export function decodeSession(raw: string | undefined | null): SessionUser | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    return parsed && typeof parsed.email === 'string' && isRole(parsed.role) ? (parsed as SessionUser) : null;
  } catch {
    return null;
  }
}

/** Client-side only. Reads the mock session; the site is static, so there is no server to read it for us. */
export function readSessionCookie(): SessionUser | null {
  if (typeof document === 'undefined') return null;
  const entry = document.cookie.split('; ').find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  return decodeSession(entry?.slice(SESSION_COOKIE.length + 1));
}

/** Client-side only. Mock auth keeps the session in a cookie (a real backend would set an httpOnly one). */
export function writeSessionCookie(user: SessionUser | null) {
  if (typeof document === 'undefined') return;
  document.cookie = user
    ? `${SESSION_COOKIE}=${encodeSession(user)}; path=/; max-age=${MAX_AGE}; samesite=lax`
    : `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
