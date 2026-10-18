'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './Checkbox.module.css';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode;
  variant?: 'checkbox' | 'radio';
};

/** Checkbox / RadioButton from the UI KIT: 24px, grey off-state, secondary-red on-state with a check. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, variant = 'checkbox', className, ...rest },
  ref,
) {
  return (
    <label className={cn(styles.root, rest.disabled && styles.disabled, className)}>
      <input ref={ref} type={variant} className={styles.input} {...rest} />
      <span className={cn(styles.box, variant === 'radio' && styles.round)} aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 11.1111L10.003 14.9817C10.4034 15.4977 11.1828 15.4977 11.5832 14.9817L17 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});

export const Radio = forwardRef<HTMLInputElement, Omit<CheckboxProps, 'variant'>>(function Radio(props, ref) {
  return <Checkbox ref={ref} variant="radio" {...props} />;
});
