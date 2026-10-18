import Link from 'next/link';
import type { ReactNode } from 'react';
import { CalendarDays, CircleAlert, CircleCheck, CircleDashed, Mail } from 'lucide-react';
import { routes } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { formatDate } from '@/shared/lib/format';
import { ChamferCard } from '@/shared/ui/ChamferCard';
import { Tag } from '@/shared/ui/Tag';
import { directionLabel } from '../model/dictionaries';
import { projectStatusLabels, type Project, type ProjectStatus } from '../model/types';
import styles from './ProjectStatusCard.module.css';

type Row = { icon: ReactNode; label: string; value: string; tone?: 'danger' };

const cornerColor: Record<ProjectStatus, string> = {
  moderation: 'var(--color-secondary)',
  'changes-required': 'var(--color-red)',
  ready: '#4fd92d',
  validated: 'var(--color-primary)',
};

function rowsFor(project: Project): [Row, Row] {
  const updated: Row = { icon: <CalendarDays />, label: 'Последнее обновление', value: formatDate(project.updatedAt) };
  switch (project.status) {
    case 'moderation':
      return [
        updated,
        {
          icon: <CircleDashed className={styles.secondary} />,
          label: 'На модерации',
          value: projectStatusLabels.moderation,
        },
      ];
    case 'changes-required':
      return [
        updated,
        {
          icon: <CircleAlert className={styles.danger} />,
          label: 'Статус на платформе',
          value: projectStatusLabels['changes-required'],
          tone: 'danger',
        },
      ];
    case 'validated':
      return [updated, { icon: <CircleCheck />, label: 'Статус на платформе', value: projectStatusLabels.validated }];
    case 'ready':
      return [
        {
          icon: <Mail />,
          label: 'Запросы на коммуникацию',
          value: project.communicationRequests ? `${project.communicationRequests} новых` : 'Запросов нет',
        },
        {
          icon: <CircleCheck className={styles.success} />,
          label: 'Статус на платформе',
          value: projectStatusLabels.ready,
        },
      ];
  }
}

/** Startup dashboard card (288×323) with a cut corner coloured by moderation status. */
export function ProjectStatusCard({ project }: { project: Project }) {
  const danger = project.status === 'changes-required';
  return (
    <ChamferCard corner={cornerColor[project.status]} stroke={danger ? 'var(--color-red)' : undefined}>
      <h2 className={styles.title}>
        <Link href={routes.project(project.id)} className={styles.link}>
          {project.name}
        </Link>
      </h2>
      <p className={styles.description}>{project.shortDescription}</p>
      {project.directions[0] && <Tag className={styles.tag}>{directionLabel(project.directions[0])}</Tag>}
      <dl className={styles.status}>
        {rowsFor(project).map((row) => (
          <div key={row.label} className={styles.row}>
            <span className={styles.icon}>{row.icon}</span>
            <div>
              <dt className={cn(styles.label, row.tone === 'danger' && styles.danger)}>{row.label}</dt>
              <dd className={styles.value}>{row.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </ChamferCard>
  );
}
