'use client';

import { useState, type ReactNode } from 'react';
import { CircleAlert, CircleCheck, Pencil, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useReview } from '../model/ReviewContext';
import styles from './ReviewBlock.module.css';

type ReviewBlockProps = {
  id: string;
  children: ReactNode;
  /** Block stretches to the full column width (text blocks) instead of hugging content (chips). */
  block?: boolean;
  className?: string;
};

/**
 * A reviewable piece of the project page.
 * - review: outlined, click to leave a comment for the author;
 * - owner: highlights blocks that have expert remarks;
 * - view: renders children as is.
 */
export function ReviewBlock({ id, children, block = false, className }: ReviewBlockProps) {
  const { mode, comments, setComment } = useReview();
  const comment = comments[id];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment ?? '');

  if (mode === 'view' || (mode === 'owner' && !comment)) {
    return <div className={cn(block && styles.blockWidth, className)}>{children}</div>;
  }

  if (mode === 'owner') {
    return (
      <div className={cn(styles.remarked, block && styles.blockWidth, className)}>
        {children}
        <div className={styles.remark} role="note">
          <p className={styles.remarkTitle}>
            <CircleAlert aria-hidden /> Комментарий эксперта
          </p>
          <p className={styles.remarkText}>{comment}</p>
        </div>
      </div>
    );
  }

  const open = () => {
    setDraft(comment ?? '');
    setEditing(true);
  };

  return (
    <div
      className={cn(
        styles.review,
        block && styles.blockWidth,
        comment && styles.hasComment,
        editing && styles.editing,
        className,
      )}
    >
      <div
        className={styles.content}
        role="button"
        tabIndex={0}
        aria-label="Оставить комментарий к блоку"
        onClick={() => !editing && open()}
        onKeyDown={(event) =>
          (event.key === 'Enter' || event.key === ' ') && !editing && (event.preventDefault(), open())
        }
      >
        {children}
      </div>
      {editing ? (
        <div className={styles.editor}>
          <label className={styles.editorLabel} htmlFor={`comment-${id}`}>
            Ваш комментарий
          </label>
          <textarea
            id={`comment-${id}`}
            className={styles.textarea}
            value={draft}
            placeholder="Введите здесь"
            autoFocus
            rows={4}
            onChange={(event) => setDraft(event.target.value)}
          />
          <div className={styles.editorActions}>
            <button type="button" onClick={() => setEditing(false)}>
              <X aria-hidden /> Отменить
            </button>
            <button
              type="button"
              onClick={() => {
                setComment(id, draft.trim() || null);
                setEditing(false);
              }}
            >
              <CircleCheck aria-hidden /> Сохранить комментарий
            </button>
          </div>
        </div>
      ) : (
        comment && (
          <button type="button" className={styles.savedComment} onClick={open}>
            <Pencil aria-hidden />
            <span>{comment}</span>
          </button>
        )
      )}
    </div>
  );
}
