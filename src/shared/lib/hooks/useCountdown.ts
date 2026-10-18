'use client';

import { useCallback, useEffect, useState } from 'react';

export function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const timer = setTimeout(() => setLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);

  const restart = useCallback(() => setLeft(seconds), [seconds]);
  const label = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;

  return { left, label, restart, done: left <= 0 };
}
