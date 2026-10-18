'use client';

import type { ReactNode } from 'react';
import { Copy } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { toast } from '@/shared/ui/Toast';
import styles from './ProjectDetails.module.css';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export function TextBlock({ label, children, large }: { label: string; children: ReactNode; large?: boolean }) {
  return (
    <div className={styles.textField}>
      <p className={styles.fieldLabel}>{label}</p>
      <div className={cn(styles.fieldText, large && styles.fieldTextLarge)}>{children}</div>
    </div>
  );
}

export function CopyValue({ value }: { value: string }) {
  return (
    <span className={styles.copyValue}>
      {value}
      <button
        type="button"
        className={styles.copy}
        aria-label="Скопировать"
        onClick={(event) => {
          event.stopPropagation();
          navigator.clipboard
            ?.writeText(value)
            .then(() => toast.success('Номер скопирован'))
            .catch(() => toast.error('Не удалось скопировать'));
        }}
      >
        <Copy aria-hidden />
      </button>
    </span>
  );
}

export const yesNo = (value: boolean) => (value ? 'Да' : 'Нет');
