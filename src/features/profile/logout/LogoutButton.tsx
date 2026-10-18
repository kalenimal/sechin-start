'use client';

import { LogOut } from 'lucide-react';
import { useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { TextLink } from '@/shared/ui/TextLink';

export function LogoutButton({ className }: { className?: string }) {
  const logout = useSession((state) => state.logout);
  return (
    <TextLink
      size="m"
      align="center"
      tone="muted"
      className={className}
      icon={<LogOut aria-hidden />}
      onClick={() => {
        logout();
        // Full reload: drops all client caches of the previous user and leaves the protected layout cleanly.
        window.location.assign(routes.home);
      }}
    >
      Выйти из аккаунта
    </TextLink>
  );
}
