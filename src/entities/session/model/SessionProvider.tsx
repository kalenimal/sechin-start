'use client';

import { useState, type ReactNode } from 'react';
import { createSessionStore, SessionStoreContext } from './store';
import type { SessionUser } from './types';

/** Seeds the session store with the user resolved on the server (cookie), avoiding a flash of anonymous UI. */
export function SessionProvider({ user, children }: { user: SessionUser | null; children: ReactNode }) {
  const [store] = useState(() => createSessionStore(user));
  return <SessionStoreContext.Provider value={store}>{children}</SessionStoreContext.Provider>;
}
