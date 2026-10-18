import type { ReactNode } from 'react';
import { Container } from '@/shared/ui/Container';
import styles from './LegalPage.module.css';

export type LegalSection = { title: string; body: ReactNode };

type LegalPageProps = { title: string; updatedAt: string; intro: string; sections: LegalSection[] };

/** Long-form legal document (user agreement, offer). Content is a placeholder until legal provides final texts. */
export function LegalPage({ title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <Container as="article" className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Редакция от {updatedAt}</p>
        <p className={styles.intro}>{intro}</p>
      </header>
      <ol className={styles.sections}>
        {sections.map((section) => (
          <li key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.body}>{section.body}</div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
