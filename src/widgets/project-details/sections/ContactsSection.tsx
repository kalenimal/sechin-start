import { Mail, Smartphone, UserRound } from 'lucide-react';
import type { Project } from '@/entities/project';
import { ReviewBlock } from '@/features/expertise-review';
import { InfoChip } from '@/shared/ui';
import { Section } from '../parts';
import styles from '../ProjectDetails.module.css';

export function ContactsSection({ contacts }: { contacts: Project['contacts'] }) {
  return (
    <Section title="Контактная информация">
      <ReviewBlock id="author">
        <div className={styles.author}>
          <span className={styles.authorAvatar}>
            <UserRound aria-hidden />
          </span>
          <div>
            <p className={styles.fieldLabel}>ФИО автора проекта</p>
            <p className={styles.authorName}>{contacts.author}</p>
          </div>
        </div>
      </ReviewBlock>
      <div className={styles.row}>
        <ReviewBlock id="email">
          <InfoChip tone="primary" layout="inline" icon={<Mail />}>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          </InfoChip>
        </ReviewBlock>
        <ReviewBlock id="phone">
          <InfoChip tone="primary" layout="inline" icon={<Smartphone />}>
            <a href={`tel:${contacts.phone.replace(/\s/g, '')}`}>{contacts.phone}</a>
          </InfoChip>
        </ReviewBlock>
      </div>
    </Section>
  );
}
