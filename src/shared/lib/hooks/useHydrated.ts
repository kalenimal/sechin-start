'use client';

import { useSyncExternalStore } from 'react';

const subscribeNoop = () => () => {};

/** false in the pre-rendered HTML and during hydration, true afterwards (safe point to read browser storage). */
export const useHydrated = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
