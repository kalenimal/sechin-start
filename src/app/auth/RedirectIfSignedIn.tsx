'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { readSessionCookie } from '@/entities/session';
import { routes } from '@/shared/config';

const ENTRY_PAGES = new Set<string>([routes.auth, routes.login]);

/** Signed-in users skip the onboarding and login screens. */
export function RedirectIfSignedIn() {
  const router = useRouter();
  const pathname = usePathname().replace(/\/$/, '');

  useEffect(() => {
    if (ENTRY_PAGES.has(pathname) && readSessionCookie()) router.replace(routes.dashboard);
  }, [pathname, router]);

  return null;
}
