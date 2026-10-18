'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import styles from './SearchInput.module.css';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  value: string;
  onValueChange: (value: string) => void;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { value, onValueChange, className, placeholder = 'Поиск по проектам...', ...rest },
  ref,
) {
  return (
    <div className={cn(styles.root, value && styles.filled, className)} role="search">
      <Search className={styles.icon} aria-hidden />
      <input
        ref={ref}
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onValueChange(event.target.value)}
        {...rest}
      />
      {value && (
        <button type="button" className={styles.clear} onClick={() => onValueChange('')} aria-label="Очистить поиск">
          <X aria-hidden />
        </button>
      )}
    </div>
  );
});
