'use client';

import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './CodeInput.module.css';

type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  invalid?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
};

/** Segmented one-time-code input (6 boxes, 80px tall). Supports paste and keyboard navigation. */
export function CodeInput({ value, onChange, length = 6, invalid, disabled, autoFocus }: CodeInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, index) => value[index] ?? '');

  const focus = (index: number) => refs.current[Math.max(0, Math.min(length - 1, index))]?.focus();

  const setChar = (index: number, char: string) => {
    const next = chars.slice();
    next[index] = char;
    onChange(next.join('').slice(0, length));
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !chars[index]) {
      event.preventDefault();
      setChar(index - 1, '');
      focus(index - 1);
    } else if (event.key === 'ArrowLeft') focus(index - 1);
    else if (event.key === 'ArrowRight') focus(index + 1);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!digits) return;
    event.preventDefault();
    onChange(digits);
    focus(digits.length);
  };

  return (
    <div className={styles.root} role="group" aria-label="Код подтверждения">
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          className={cn(styles.cell, invalid && styles.invalid)}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={char}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          aria-label={`Цифра ${index + 1}`}
          onChange={(event) => {
            const digit = event.target.value.replace(/\D/g, '').slice(-1);
            setChar(index, digit);
            if (digit) focus(index + 1);
          }}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
