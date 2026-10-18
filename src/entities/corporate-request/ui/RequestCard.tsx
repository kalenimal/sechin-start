import Link from 'next/link';
import { CircleCheck, CircleDashed, FileX } from 'lucide-react';
import { directionLabel } from '@/entities/project';
import { routes } from '@/shared/config';
import { pluralize } from '@/shared/lib/format';
import { ChamferCard } from '@/shared/ui/ChamferCard';
import { Tag } from '@/shared/ui/Tag';
import { requestStatusLabels, type CorporateRequest } from '../model/types';
import styles from './RequestCard.module.css';

const corner = { searching: 'var(--color-secondary)', ready: 'var(--color-primary)', closed: 'var(--color-grey)' };

function statusText(request: CorporateRequest) {
  const count = request.matchedProjectIds.length;
  switch (request.status) {
    case 'searching':
      return { icon: <CircleDashed className={styles.searching} />, text: 'По запросу подбираются подходящие решения' };
    case 'ready':
      return {
        icon: <CircleCheck className={styles.ready} />,
        text: `Найдено ${count} ${pluralize(count, ['проект', 'проекта', 'проектов'])} по вашему запросу`,
      };
    case 'closed':
      return { icon: <FileX />, text: 'Запрос больше не активен' };
  }
}

export function RequestCard({ request }: { request: CorporateRequest }) {
  const { icon, text } = statusText(request);
  return (
    <ChamferCard corner={corner[request.status]} muted={request.status === 'closed'}>
      <h2 className={styles.title}>
        <Link href={routes.request(request.id)} className={styles.link}>
          {request.title}
        </Link>
      </h2>
      {request.directions[0] && <Tag className={styles.tag}>{directionLabel(request.directions[0])}</Tag>}
      <div className={styles.status}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{requestStatusLabels[request.status]}</span>
        <span className={styles.value}>{text}</span>
      </div>
    </ChamferCard>
  );
}
