'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type ReviewMode = 'view' | 'owner' | 'review';

type ReviewContextValue = {
  mode: ReviewMode;
  comments: Record<string, string>;
  setComment: (key: string, text: string | null) => void;
};

const ReviewContext = createContext<ReviewContextValue>({ mode: 'view', comments: {}, setComment: () => {} });

/** Holds expert remarks per project block. `review` — expert edits them; `owner` — startup sees them read-only. */
export function ReviewProvider({
  mode,
  initialComments = {},
  children,
}: {
  mode: ReviewMode;
  initialComments?: Record<string, string>;
  children: ReactNode;
}) {
  const [comments, setComments] = useState(initialComments);
  const value = useMemo<ReviewContextValue>(
    () => ({
      mode,
      comments,
      setComment: (key, text) =>
        setComments((prev) => {
          const next = { ...prev };
          if (text) next[key] = text;
          else delete next[key];
          return next;
        }),
    }),
    [mode, comments],
  );
  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

export const useReview = () => useContext(ReviewContext);
