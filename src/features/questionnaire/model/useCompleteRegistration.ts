'use client';

import { useRouter } from 'next/navigation';
import { authApi, type Role, useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import type { SessionUser } from '@/entities/session';

/**
 * Finishes the 3-step sign-up: creates the account from the pending credentials,
 * runs the role-specific side effect (e.g. create the startup project) and opens the success screen.
 */
export function useCompleteRegistration(role: Role, afterCreate?: (user: SessionUser) => Promise<unknown>) {
  const router = useRouter();
  const pending = useSession((state) => state.pending);
  const setUser = useSession((state) => state.setUser);

  return useAsyncAction(async (contact: { fullName: string; phone: string }) => {
    if (!pending) throw new Error('Сессия регистрации истекла, начните заново');
    const user = await authApi.completeRegistration({
      role,
      email: pending.email,
      password: pending.password,
      ...contact,
    });
    await afterCreate?.(user);
    setUser(user);
    // Pending credentials are cleared on the success screen; clearing them here would make the
    // step guard on the sign-up page redirect back to step 1 before navigation completes.
    router.push(routes.signUpSuccess);
    return user;
  });
}
