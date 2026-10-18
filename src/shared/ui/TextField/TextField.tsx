'use client';

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './TextField.module.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  endAdornment?: ReactNode;
  containerClassName?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, required, error, hint, endAdornment, containerClassName, className, id, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cn(styles.field, containerClassName)}>
      {label && (
        <label htmlFor={inputId} className={cn(styles.label, disabled && styles.labelDisabled)}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <div className={cn(styles.control, error && styles.invalid, disabled && styles.disabled)}>
        <input
          ref={ref}
          id={inputId}
          className={cn(styles.input, className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          disabled={disabled}
          {...rest}
        />
        {endAdornment && <span className={styles.adornment}>{endAdornment}</span>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${inputId}-hint`} className={styles.hint}>
            {hint}
          </p>
        )
      )}
    </div>
  );
});
