import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import styles from './AuthShell.module.css';

type StepperProps = { steps: string[]; current: number };

/** Registration progress: done (filled + check), current (primary ring), upcoming (grey ring). */
export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className={styles.steps} aria-label="Шаги регистрации">
      {steps.map((label, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'upcoming';
        return (
          <li
            key={label}
            className={cn(styles.step, styles[state])}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className={styles.dot}>{state === 'done' && <Check aria-hidden />}</span>
            <span className={styles.stepLabel}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
