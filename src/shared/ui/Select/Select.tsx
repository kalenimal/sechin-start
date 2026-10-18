'use client';

import { useCallback, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, Check } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside';
import fieldStyles from '../TextField/TextField.module.css';
import styles from './Select.module.css';

export type SelectOption<V extends string = string> = { value: V; label: string; count?: number };

type SelectProps<V extends string> = {
  options: SelectOption<V>[];
  value?: V | null;
  onChange?: (value: V) => void;
  placeholder?: string;
  /** `field` — form input with a label; `filter` — toolbar dropdown "Статус проекта: Все". */
  variant?: 'field' | 'filter';
  label?: ReactNode;
  /** Text before the value in the `filter` variant. */
  prefix?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  name?: string;
  className?: string;
};

export function Select<V extends string>({
  options,
  value,
  onChange,
  placeholder = 'Выберите',
  variant = 'field',
  label,
  prefix,
  required,
  disabled,
  error,
  name,
  className,
}: SelectProps<V>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(rootRef, close, open);

  const selected = options.find((option) => option.value === value);
  const Chevron = open ? ChevronUp : ChevronDown;

  const select = (next: V) => {
    onChange?.(next);
    setOpen(false);
  };

  const openMenu = () => {
    setActive(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    );
    setOpen(true);
  };

  // Listbox keyboard support: arrows move the highlight, Enter/Space selects, Home/End jump.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => (open ? setActive((index) => Math.min(last, index + 1)) : openMenu()),
      ArrowUp: () => (open ? setActive((index) => Math.max(0, index - 1)) : openMenu()),
      Home: () => open && setActive(0),
      End: () => open && setActive(last),
      Enter: () => (open && options[active] ? select(options[active].value) : openMenu()),
      ' ': () => (open && options[active] ? select(options[active].value) : openMenu()),
      Tab: () => setOpen(false),
    };
    const handler = keys[event.key];
    if (!handler) return;
    if (event.key !== 'Tab') event.preventDefault();
    handler();
  };

  return (
    <div ref={rootRef} className={cn(variant === 'field' && fieldStyles.field, styles.root, className)}>
      {label && variant === 'field' && (
        <span id={`${id}-label`} className={cn(fieldStyles.label, disabled && fieldStyles.labelDisabled)}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </span>
      )}
      {name && <input type="hidden" name={name} value={value ?? ''} />}
      <button
        type="button"
        className={cn(styles.trigger, styles[variant], open && styles.open, error && styles.invalid)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-label={!label ? (prefix ?? placeholder) : undefined}
        disabled={disabled}
        aria-activedescendant={open && active >= 0 ? `${id}-option-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        {variant === 'filter' && <SlidersHorizontal className={styles.filterIcon} aria-hidden />}
        {variant === 'filter' && prefix && <span className={styles.prefix}>{prefix}</span>}
        <span className={cn(styles.value, !selected && variant === 'field' && styles.placeholder)}>
          {selected?.label ?? placeholder}
        </span>
        <Chevron className={styles.chevron} aria-hidden />
      </button>
      {open && (
        <ul className={styles.menu} role="listbox" aria-labelledby={label ? `${id}-label` : undefined}>
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  tabIndex={-1}
                  className={cn(
                    styles.option,
                    isSelected && styles.optionSelected,
                    index === active && styles.optionActive,
                  )}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => select(option.value)}
                >
                  <span>
                    {option.label}
                    {option.count !== undefined && <span className={styles.optionCount}>{option.count}</span>}
                  </span>
                  {isSelected && <Check className={styles.check} aria-hidden />}
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
