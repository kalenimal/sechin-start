import type { ReactNode } from 'react';
import styles from './Questionnaire.module.css';

export function FormSection({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}
