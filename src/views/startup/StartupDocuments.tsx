import type { Startup } from '@/entities/startup';
import { FileCard } from '@/shared/ui/FileCard';
import styles from './StartupSections.module.css';

export function StartupDocuments({ startup }: { startup: Startup }) {
  return (
    <section aria-labelledby="documents-title">
      <h2 id="documents-title" className="visually-hidden">
        Документы {startup.name}
      </h2>
      <ul className={`${styles.documents} stagger`}>
        {startup.documents.map((doc, index) => (
          <li key={`${doc.name}-${index}`}>
            <FileCard name={doc.name} size={doc.size} variant="wide" />
          </li>
        ))}
      </ul>
    </section>
  );
}
