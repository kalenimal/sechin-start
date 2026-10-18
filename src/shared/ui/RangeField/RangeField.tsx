'use client';

import type { ReactNode } from 'react';
import { TextField } from '../TextField';
import fieldStyles from '../TextField/TextField.module.css';
import styles from './RangeField.module.css';

export type Range = { from: string; to: string };

type RangeFieldProps = {
  label?: ReactNode;
  required?: boolean;
  value: Range;
  onChange: (value: Range) => void;
  error?: string;
};

const digitsOnly = (value: string) => value.replace(/\D/g, '');
const groupDigits = (value: string) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Two money inputs "От ₽ / До ₽". */
export function RangeField({ label, required, value, onChange, error }: RangeFieldProps) {
  const ruble = <span className={styles.ruble}>₽</span>;
  return (
    <div className={fieldStyles.field}>
      {label && (
        <span className={fieldStyles.label}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </span>
      )}
      <div className={styles.row}>
        <TextField
          aria-label="Сумма от"
          placeholder="От"
          inputMode="numeric"
          value={groupDigits(value.from)}
          onChange={(event) => onChange({ ...value, from: digitsOnly(event.target.value) })}
          endAdornment={ruble}
        />
        <TextField
          aria-label="Сумма до"
          placeholder="До"
          inputMode="numeric"
          value={groupDigits(value.to)}
          onChange={(event) => onChange({ ...value, to: digitsOnly(event.target.value) })}
          endAdornment={ruble}
        />
      </div>
      {error && (
        <p className={fieldStyles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
