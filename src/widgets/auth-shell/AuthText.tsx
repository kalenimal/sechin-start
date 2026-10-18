import type { ReactNode } from 'react';
import styles from './AuthText.module.css';

/** Card heading block: H2 title (40px) + optional paragraph, centered. */
export function AuthText({ title, description }: { title: ReactNode; description?: ReactNode }) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
