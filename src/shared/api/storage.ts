/** Tiny localStorage-backed table used by mock APIs to persist user changes between reloads. */
export function createMockTable<T extends { id: string }>(key: string, seed: T[]) {
  const read = (): T[] => {
    if (typeof window === 'undefined') return seed;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T[]) : seed;
    } catch {
      return seed;
    }
  };
  const write = (rows: T[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(rows));
    } catch {
      /* storage unavailable — changes live until reload */
    }
  };
  return {
    all: read,
    find: (id: string) => read().find((row) => row.id === id) ?? null,
    upsert: (row: T) => {
      const rows = read();
      const index = rows.findIndex((item) => item.id === row.id);
      if (index === -1) rows.unshift(row);
      else rows[index] = row;
      write(rows);
      return row;
    },
    remove: (id: string) => write(read().filter((row) => row.id !== id)),
  };
}

export function createMockSet(key: string, seed: string[] = []) {
  const read = (): string[] => {
    if (typeof window === 'undefined') return seed;
    try {
      return JSON.parse(localStorage.getItem(key) ?? 'null') ?? seed;
    } catch {
      return seed;
    }
  };
  const write = (values: string[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(values));
    } catch {
      /* ignore */
    }
  };
  return {
    values: read,
    has: (value: string) => read().includes(value),
    toggle: (value: string) => {
      const values = read();
      const next = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
      write(next);
      return next.includes(value);
    },
    add: (value: string) => {
      const values = read();
      if (!values.includes(value)) write([...values, value]);
    },
  };
}
