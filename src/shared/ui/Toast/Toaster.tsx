'use client';

import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useToastStore } from './toastStore';
import styles from './Toast.module.css';

const icons = { success: <CircleCheck />, error: <CircleAlert />, info: <Info /> };

export function Toaster() {
  const items = useToastStore((state) => state.items);
  const dismiss = useToastStore((state) => state.dismiss);
  return (
    <div className={styles.region} role="region" aria-label="Уведомления о действиях" aria-live="polite">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(styles.toast, styles[item.tone], item.leaving && styles.leaving)}
          role={item.tone === 'error' ? 'alert' : 'status'}
        >
          <span className={styles.icon} aria-hidden>
            {icons[item.tone]}
          </span>
          <p className={styles.message}>{item.message}</p>
          <button type="button" className={styles.close} onClick={() => dismiss(item.id)} aria-label="Скрыть">
            <X aria-hidden />
          </button>
        </div>
      ))}
    </div>
  );
}
