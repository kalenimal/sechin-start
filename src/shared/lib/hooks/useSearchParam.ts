'use client';

import { useSearchParams } from 'next/navigation';

/** Reads one query param. Callers must sit inside <Suspense> — static pages resolve the query on the client. */
export function useSearchParam(name: string): string | null {
  return useSearchParams().get(name);
}
