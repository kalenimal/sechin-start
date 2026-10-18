import Link from 'next/link';
import type { ReactNode } from 'react';
import { BriefcaseBusiness, CalendarDays, CircleCheck, Lightbulb, PencilLine, RefreshCcw, Search } from 'lucide-react';
import { directionLabel, ProjectLogo } from '@/entities/project';
import { routes } from '@/shared/config';
import { formatDate } from '@/shared/lib/format';
import { Tag, TagList } from '@/shared/ui/Tag';
import type { ExpertiseItem } from '../api/expertiseApi';
import { expertiseStatusLabels, type ExpertiseStatus } from '../model/types';
import styles from './ExpertiseCard.module.css';

const statusView: Record<ExpertiseStatus, { icon: ReactNode; text: string; mineText?: string }> = {
  new: {
    icon: <Lightbulb className={styles.primary} />,
    text: 'Заявка поступила на экспертизу и ожидает первичной проверки',
  },
  'in-review': { icon: <Search className={styles.primary} />, text: 'Эксперт проверяет проект и готовит заключение' },
  rework: {
    icon: <PencilLine className={styles.danger} />,
    text: 'Эксперт оставил замечания, проект ожидает внесения изменений',
    mineText: 'Вы оставили замечания, проект ожидает внесения изменений',
  },
  recheck: {
    icon: <RefreshCcw className={styles.danger} />,
    text: 'Ожидает повторной проверки после внесения изменений',
  },
  done: {
    icon: <CircleCheck className={styles.primary} />,
    text: 'Экспертиза завершена, проект опубликован на платформе',
  },
};

type Props = { item: ExpertiseItem; action: ReactNode; mine?: boolean };

export function ExpertiseCard({ item, action, mine }: Props) {
  const { project } = item;
  const view = statusView[item.status];
  return (
    <article className={styles.card}>
      <div className={styles.main}>
        <header className={styles.header}>
          <ProjectLogo src={project.logo} name={project.name} />
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>
              <Link href={routes.project(project.id)}>{project.name}</Link>
            </h2>
            <TagList>
              {project.directions.map((direction) => (
                <Tag key={direction}>{directionLabel(direction)}</Tag>
              ))}
            </TagList>
          </div>
        </header>
        <p className={styles.description}>{project.shortDescription}</p>
        <footer className={styles.meta}>
          <span>
            <BriefcaseBusiness aria-hidden /> {project.company.name}
          </span>
          <span>
            <CalendarDays aria-hidden /> Внесены изменения {formatDate(item.updatedAt)}
          </span>
        </footer>
      </div>
      <div className={styles.status}>
        <span className={styles.statusIcon}>{view.icon}</span>
        <p className={styles.statusTitle}>{expertiseStatusLabels[item.status]}</p>
        <p className={styles.statusText}>{(mine && view.mineText) || view.text}</p>
        <div className={styles.action}>{action}</div>
      </div>
    </article>
  );
}
