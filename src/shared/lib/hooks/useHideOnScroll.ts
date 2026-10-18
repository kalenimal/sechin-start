'use client';

import { useEffect, useState } from 'react';

type Options = {
  /** Never hide while the page is scrolled less than this (px). */
  offset?: number;
  /** Ignore tiny scroll jitter (px). */
  tolerance?: number;
};

/**
 * Returns `hidden` = true while the user scrolls down and false as soon as they scroll up.
 * Reads scroll position in a rAF callback, so it never blocks scrolling.
 */
export function useHideOnScroll({ offset = 80, tolerance = 6 }: Options = {}) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 0);
      if (y < offset) setHidden(false);
      else if (Math.abs(y - lastY) > tolerance) setHidden(y > lastY);
      if (Math.abs(y - lastY) > tolerance || y < offset) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset, tolerance]);

  return { hidden, scrolled };
}
