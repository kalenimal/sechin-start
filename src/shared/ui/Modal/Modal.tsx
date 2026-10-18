'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import styles from './Modal.module.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  width?: number;
  className?: string;
  hideClose?: boolean;
  /** Left-aligned heading (filters modal) instead of the default centered one. */
  align?: 'center' | 'left';
};

const EXIT_MS = 180;

/** Accessible dialog rendered in a portal: Esc / overlay click to close, focus restore, scroll lock, enter + exit animation. */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  width = 598,
  className,
  hideClose,
  align = 'center',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Keep the dialog mounted for the duration of the exit animation.
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const timer = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, EXIT_MS);
    return () => clearTimeout(timer);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={cn(styles.overlay, closing && styles.overlayClosing)}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      {!hideClose && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
          <X aria-hidden />
        </button>
      )}
      <div
        ref={dialogRef}
        className={cn(styles.dialog, closing && styles.dialogClosing, className)}
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        tabIndex={-1}
      >
        {(title || description) && (
          <div className={cn(styles.heading, align === 'left' && styles.headingLeft)}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
