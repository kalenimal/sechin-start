'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside';
import type { SelectOption } from '../Select';
import fieldStyles from '../TextField/TextField.module.css';
import selectStyles from '../Select/Select.module.css';

type MultiSelectProps = {
  label?: ReactNode;
  required?: boolean;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
};

/** Dropdown with multiple choice; selected labels are joined with commas ("Кардиология, Digital Health"). */
export function MultiSelect({
  label,
  required,
  options,
  value,
  onChange,
  placeholder = 'Выберите',
  error,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  const selected = options.filter((option) => value.includes(option.value));
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div ref={ref} className={cn(fieldStyles.field, selectStyles.root)}>
      {label && (
        <span className={fieldStyles.label}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </span>
      )}
      <button
        type="button"
        className={cn(
          selectStyles.trigger,
          selectStyles.field,
          open && selectStyles.open,
          error && selectStyles.invalid,
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn(selectStyles.value, !selected.length && selectStyles.placeholder)}>
          {selected.length ? selected.map((option) => option.label).join(', ') : placeholder}
        </span>
        <Chevron className={selectStyles.chevron} aria-hidden />
      </button>
      {open && (
        <ul className={selectStyles.menu} role="listbox" aria-multiselectable>
          {options.map((option) => {
            const checked = value.includes(option.value);
            return (
              <li key={option.value} role="option" aria-selected={checked}>
                <button
                  type="button"
                  className={cn(selectStyles.option, checked && selectStyles.optionSelected)}
                  onClick={() =>
                    onChange(checked ? value.filter((item) => item !== option.value) : [...value, option.value])
                  }
                >
                  {option.label}
                  {checked && <Check className={selectStyles.check} aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {error && (
        <p className={fieldStyles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
