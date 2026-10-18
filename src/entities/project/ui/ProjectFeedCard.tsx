import Link from 'next/link';
import type { ReactNode } from 'react';
import { routes } from '@/shared/config';
import { formatMillions } from '@/shared/lib/format';
import { Tag, TagList } from '@/shared/ui';
import { directionLabel } from '../model/dictionaries';
import type { Project } from '../model/types';
import { CompanyCard } from './CompanyCard';
import { ProjectHighlights } from './ProjectHighlights';
import { ProjectLogo } from './ProjectLogo';
import styles from './ProjectFeedCard.module.css';

type ProjectFeedCardProps = {
  project: Project;
  actions?: ReactNode;
  companyAction?: ReactNode;
};

/** Investor / corporate feed card: project summary on the left, legal entity on the right. */
export function ProjectFeedCard({ project, actions, companyAction }: ProjectFeedCardProps) {
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
        <ProjectHighlights project={project} />
        <p className={styles.request}>
          Запрос: <strong>{formatMillions(project.request)}</strong>
        </p>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <CompanyCard company={project.company} action={companyAction} className={styles.company} />
    </article>
  );
}
