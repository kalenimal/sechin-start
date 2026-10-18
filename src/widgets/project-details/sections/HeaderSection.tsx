import Image from 'next/image';
import { Globe, UserRound } from 'lucide-react';
import { directionLabel, ProjectHighlights, projectPublicId, type Project } from '@/entities/project';
import { ReviewBlock } from '@/features/expertise-review';
import { formatDate, formatMillions } from '@/shared/lib/format';
import { Tag, TagList } from '@/shared/ui';
import { TextBlock } from '../parts';
import styles from '../ProjectDetails.module.css';

export function HeaderSection({ project }: { project: Project }) {
  return (
    <header className={styles.header}>
      <ReviewBlock id="cover" block>
        <div className={styles.media}>
          {project.cover ? (
            <Image src={project.cover} alt="" width={753} height={260} className={styles.cover} priority />
          ) : (
            <div className={styles.coverPlaceholder} />
          )}
          <span className={styles.logo}>
            {project.logo ? (
              <Image src={project.logo} alt={`Логотип ${project.name}`} width={80} height={80} />
            ) : (
              <UserRound aria-hidden />
            )}
          </span>
        </div>
      </ReviewBlock>

      <div className={styles.headerInfo}>
        <ReviewBlock id="name">
          <h1 className={styles.title}>{project.name}</h1>
          <TagList>
            {project.directions.map((direction) => (
              <Tag key={direction}>{directionLabel(direction)}</Tag>
            ))}
          </TagList>
        </ReviewBlock>
        <ReviewBlock id="meta">
          <p className={styles.meta}>
            <span>Дата создания</span> {formatDate(project.createdAt)} <span>ID</span> #{projectPublicId(project.id)}
          </p>
        </ReviewBlock>
        {project.website && (
          <ReviewBlock id="website">
            <a href={project.website} target="_blank" rel="noopener noreferrer nofollow" className={styles.website}>
              <Globe aria-hidden /> {project.website}
            </a>
          </ReviewBlock>
        )}
      </div>

      <ReviewBlock id="description" block>
        <TextBlock label="Описание">{project.description}</TextBlock>
      </ReviewBlock>
      <ReviewBlock id="highlights">
        <ProjectHighlights project={project} />
      </ReviewBlock>
      <ReviewBlock id="request">
        <p className={styles.request}>
          Запрос: <strong>{formatMillions(project.request)}</strong>
        </p>
      </ReviewBlock>
    </header>
  );
}
