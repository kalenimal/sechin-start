'use client';

import { cn } from '@/shared/lib/cn';
import styles from './ChoiceChips.module.css';

type Option = { value: string; label: string };

type ChoiceChipsProps = {
  options: readonly Option[];
  value: string[];
  onChange: (value: string[]) => void;
  ariaLabel?: string;
};

/** Multi-select chips with a checkbox (filters modal: «Стадия проекта», «Тип сделки», «Общая экспертная оценка»). */
export function ChoiceChips({ options, value, onChange, ariaLabel }: ChoiceChipsProps) {
  const toggle = (option: string) =>
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);

  return (
    <div className={styles.list} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const checked = value.includes(option.value);
        return (
          <label key={option.value} className={cn(styles.chip, checked && styles.checked)}>
            <input type="checkbox" className={styles.input} checked={checked} onChange={() => toggle(option.value)} />
            <span className={styles.box} aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 11.1111L10.003 14.9817C10.4034 15.4977 11.1828 15.4977 11.5832 14.9817L17 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
