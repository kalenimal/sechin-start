import type { ProjectDocument } from '@/entities/project';
import { ReviewBlock } from '@/features/expertise-review';
import { FileCard } from '@/shared/ui/FileCard';
import { Section } from '../parts';
import styles from '../ProjectDetails.module.css';

export function DocumentsSection({ documents }: { documents: ProjectDocument[] }) {
  if (!documents.length) return null;
  return (
    <Section title="Документы">
      <ReviewBlock id="documents" block>
        <div className={styles.documents}>
          {documents.map((doc, index) => (
            <FileCard key={`${doc.name}-${index}`} name={doc.name} size={doc.size} />
          ))}
        </div>
      </ReviewBlock>
    </Section>
  );
}
