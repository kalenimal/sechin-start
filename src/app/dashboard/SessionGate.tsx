'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { readSessionCookie, SessionProvider, type SessionUser } from '@/entities/session';
import { routes } from '@/shared/config';
import styles from './layout.module.css';

/**
 * Client-side guard for the cabinet. The site is a static export, so the session cookie is read in the
 * browser: until then an empty shell is shown, without a session the user is sent to the login page.
 */
export function SessionGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // undefined = not resolved yet (pre-rendered HTML and the first client render must match).
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    const session = readSessionCookie();
    setUser(session);
    if (!session) router.replace(`${routes.login}?next=${encodeURIComponent(pathname + window.location.search)}`);
  }, [router, pathname]);

  if (!user) return <div className={styles.shell} aria-busy="true" />;
  return <SessionProvider user={user}>{children}</SessionProvider>;
}
