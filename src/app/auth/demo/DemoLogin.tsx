'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi, isRole, writeSessionCookie } from '@/entities/session';
import { routes } from '@/shared/config';
import { EmptyState } from '@/shared/ui/EmptyState';

const mockMode = process.env.NEXT_PUBLIC_MOCK_API !== 'false';

export function DemoLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get('role');
  const next = params.get('next');
  const available = mockMode && isRole(role);

  useEffect(() => {
    const user = available ? authApi.getDemoUser(role) : null;
    if (!user) return;
    writeSessionCookie(user);
    router.replace(next?.startsWith('/dashboard') ? next : routes.dashboard);
  }, [available, role, next, router]);

  return available ? null : <EmptyState title="Демо-вход недоступен" />;
}
