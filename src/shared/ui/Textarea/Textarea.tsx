'use client';

import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';
import fieldStyles from '../TextField/TextField.module.css';
import styles from './Textarea.module.css';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  required?: boolean;
  error?: string;
  containerClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, required, error, containerClassName, className, id, rows = 5, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={cn(fieldStyles.field, containerClassName)}>
      {label && (
        <label htmlFor={inputId} className={fieldStyles.label}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cn(styles.textarea, error && styles.invalid, className)}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        {...rest}
      />
      {error && (
        <p className={fieldStyles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
