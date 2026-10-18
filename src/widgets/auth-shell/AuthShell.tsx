import type { ReactNode } from 'react';
import { Logo } from '@/shared/ui';
import { BackButton } from './BackButton';
import styles from './AuthShell.module.css';

type AuthShellProps = {
  children: ReactNode;
  /** Href for "Назад"; `history` goes one step back in the browser history. */
  back?: string | 'history';
  stepper?: ReactNode;
  centered?: boolean;
};

/** Grey auth background, centered university logo, white 598px card with optional stepper header. */
export function AuthShell({ children, back, stepper, centered }: AuthShellProps) {
  return (
    <div className={styles.page}>
      <Logo className={styles.logo} />
      <div className={styles.cardWrap}>
        {back && <BackButton href={back} className={styles.back} />}
        <div className={styles.card}>
          {stepper && <div className={styles.stepper}>{stepper}</div>}
          <div className={centered ? styles.contentCentered : styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
