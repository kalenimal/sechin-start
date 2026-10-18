'use client';

import { useEffect } from 'react';
import { useSession } from '@/entities/session';

export function ClearPendingRegistration() {
  const setPending = useSession((state) => state.setPending);
  useEffect(() => setPending(null), [setPending]);
  return null;
}
