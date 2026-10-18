'use client';

import { useState, type FormEvent } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/shared/ui';
import { activeFiltersCount, type FeedFiltersState } from './model';
import { FeedFiltersModal } from './FeedFiltersModal';
import styles from './FeedSearchBar.module.css';

type FeedSearchBarProps = {
  query: string;
  onSearch: (query: string) => void;
  filters?: FeedFiltersState;
  onFiltersChange?: (filters: FeedFiltersState) => void;
  placeholder?: string;
};

/** Search input with inline "Фильтры" and "Поиск" buttons (лента проектов / заявки на экспертизу). */
export function FeedSearchBar({
  query,
  onSearch,
  filters,
  onFiltersChange,
  placeholder = 'Ищите по проектам, компаниям и направлениям',
}: FeedSearchBarProps) {
  const [value, setValue] = useState(query);
  const [open, setOpen] = useState(false);
  const count = filters ? activeFiltersCount(filters) : 0;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <>
      <form className={styles.bar} role="search" onSubmit={submit}>
        <Search className={styles.icon} aria-hidden />
        <input
          className={styles.input}
          type="search"
          value={value}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(event) => {
            setValue(event.target.value);
            if (!event.target.value) onSearch('');
          }}
        />
        {filters && onFiltersChange && (
          <button type="button" className={styles.filters} onClick={() => setOpen(true)}>
            <SlidersHorizontal aria-hidden />
            Фильтры
            {count > 0 && <span className={styles.count}>{count}</span>}
          </button>
        )}
        <Button type="submit" size="s" className={styles.submit}>
          Поиск
        </Button>
      </form>
      {filters && onFiltersChange && (
        <FeedFiltersModal
          open={open}
          initial={filters}
          onClose={() => setOpen(false)}
          onApply={(next) => {
            onFiltersChange(next);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
