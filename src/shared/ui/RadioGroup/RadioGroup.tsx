'use client';

import { useId, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Radio } from '../Checkbox';
import fieldStyles from '../TextField/TextField.module.css';
import styles from './RadioGroup.module.css';

type Option = { value: string; label: string };

type RadioGroupProps = {
  label?: ReactNode;
  required?: boolean;
  options: readonly Option[];
  value?: string | null;
  onChange: (value: string) => void;
  /** `grid` — two columns (стадия проекта); `row` — inline (да/нет). */
  layout?: 'grid' | 'row';
  error?: string;
  name?: string;
};

export function RadioGroup({
  label,
  required,
  options,
  value,
  onChange,
  layout = 'grid',
  error,
  name,
}: RadioGroupProps) {
  const id = useId();
  return (
    <fieldset className={styles.fieldset}>
      {label && (
        <legend className={cn(fieldStyles.label, styles.legend)}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </legend>
      )}
      <div className={cn(styles.options, styles[layout])}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name ?? id}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            label={<span className={styles.optionLabel}>{option.label}</span>}
          />
        ))}
      </div>
      {error && (
        <p className={fieldStyles.error} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
