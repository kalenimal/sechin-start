'use client';

import { createContext, useContext } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';
import { writeSessionCookie } from './cookie';
import type { Role, SessionUser } from './types';

export type PendingRegistration = { role: Role; email: string; password: string; verified: boolean };

export type SessionState = {
  user: SessionUser | null;
  pending: PendingRegistration | null;
  setUser: (user: SessionUser | null) => void;
  updateUser: (patch: Partial<SessionUser>) => void;
  setPending: (pending: PendingRegistration | null) => void;
  logout: () => void;
};

const PENDING_KEY = 'sp_pending_registration';

const readPending = (): PendingRegistration | null => {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_KEY) ?? 'null');
  } catch {
    return null;
  }
};

/** A store per provider (= per request on the server) so sessions never leak between users during SSR. */
export const createSessionStore = (user: SessionUser | null) =>
  createStore<SessionState>()((set, get) => ({
    user,
    pending: readPending(),
    setUser: (next) => {
      writeSessionCookie(next);
      set({ user: next });
    },
    updateUser: (patch) => {
      const current = get().user;
      if (!current) return;
      const next = { ...current, ...patch };
      writeSessionCookie(next);
      set({ user: next });
    },
    setPending: (pending) => {
      try {
        if (pending) sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
        else sessionStorage.removeItem(PENDING_KEY);
      } catch {
        /* storage may be unavailable (private mode) — keep in memory only */
      }
      set({ pending });
    },
    // Keeps `user` in memory so mounted screens don't crash; callers must leave the page right after.
    logout: () => writeSessionCookie(null),
  }));

export const SessionStoreContext = createContext<StoreApi<SessionState> | null>(null);

export function useSession<T>(selector: (state: SessionState) => T): T {
  const store = useContext(SessionStoreContext);
  if (!store) throw new Error('useSession must be used inside <SessionProvider>');
  return useStore(store, selector);
}
