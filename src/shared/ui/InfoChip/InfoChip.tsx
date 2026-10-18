import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './InfoChip.module.css';

type InfoChipProps = {
  icon?: ReactNode;
  /** Small caption above the value (stacked layout) or inline prefix (inline layout). */
  label?: ReactNode;
  value?: ReactNode;
  tone?: 'grey' | 'primary' | 'secondary' | 'danger';
  layout?: 'stacked' | 'inline';
  /** Large value (20px) — "Номер патента / заявки". */
  large?: boolean;
  className?: string;
  children?: ReactNode;
};

/** Rounded info block from project pages: "Экспертиза пройдена / Готов к инвестициям", "Тип ИС: ...". */
export function InfoChip({
  icon,
  label,
  value,
  tone = 'grey',
  layout = 'stacked',
  large,
  className,
  children,
}: InfoChipProps) {
  return (
    <div className={cn(styles.chip, styles[tone], styles[layout], large && styles.large, className)}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {layout === 'stacked' ? (
        <span className={styles.body}>
          {label && <span className={styles.label}>{label}</span>}
          {value && <span className={styles.value}>{value}</span>}
          {children}
        </span>
      ) : (
        <span className={styles.inlineText}>
          {label && <span className={styles.label}>{label}</span>}
          {value && <strong className={styles.value}>{value}</strong>}
          {children}
        </span>
      )}
    </div>
  );
}
