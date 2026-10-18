'use client';

import { useCallback, useRef, useState } from 'react';

export type AsyncResult<R> = { ok: true; data: R } | { ok: false; error: string };

const toMessage = (err: unknown) => (err instanceof Error ? err.message : 'Что-то пошло не так, попробуйте ещё раз');

/**
 * Wraps an async call with pending / error state.
 * `run` never throws: it resolves to `{ ok, data }` so callers can branch on success
 * even for actions that return `void`.
 */
export function useAsyncAction<A extends unknown[], R>(action: (...args: A) => Promise<R>) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Keep the latest action without re-creating `run` on every render (actions are often inline lambdas).
  const actionRef = useRef(action);
  actionRef.current = action;

  const run = useCallback(async (...args: A): Promise<AsyncResult<R>> => {
    setPending(true);
    setError(null);
    try {
      return { ok: true, data: await actionRef.current(...args) };
    } catch (err) {
      const message = toMessage(err);
      setError(message);
      return { ok: false, error: message };
    } finally {
      setPending(false);
    }
  }, []);

  return { run, pending, error, setError };
}
