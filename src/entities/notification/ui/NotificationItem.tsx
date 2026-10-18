import type { ReactNode } from 'react';
import { CircleAlert, FileChartColumnIncreasing, FileCheck, FileSearch, FileX, MessagesSquare } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { Notification, NotificationKind } from '../model/types';
import styles from './NotificationItem.module.css';

const kindView: Record<NotificationKind, { icon: ReactNode; tone: 'danger' | 'primary' | 'grey' }> = {
  maintenance: { icon: <CircleAlert />, tone: 'danger' },
  'access-request': { icon: <MessagesSquare />, tone: 'primary' },
  views: { icon: <FileChartColumnIncreasing />, tone: 'grey' },
  ready: { icon: <FileCheck />, tone: 'primary' },
  changes: { icon: <FileX />, tone: 'danger' },
  moderation: { icon: <FileSearch />, tone: 'grey' },
};

const formatDateTime = (iso: string) => {
  const [date, time] = iso.split('T');
  const [y, m, d] = date.split('-');
  return `${d}.${m}.${y} / ${time.slice(0, 5)}`;
};

export function NotificationItem({ notification, onOpen }: { notification: Notification; onOpen?: () => void }) {
  const view = kindView[notification.kind];
  return (
    <article className={cn(styles.item, notification.read && styles.read)} onClick={onOpen}>
      <span className={cn(styles.icon, styles[view.tone])} aria-hidden>
        {view.icon}
      </span>
      <div className={styles.text}>
        <h2 className={styles.title}>{notification.title}</h2>
        <p className={styles.body}>{notification.text}</p>
        <time className={styles.time} dateTime={notification.createdAt}>
          {formatDateTime(notification.createdAt)}
        </time>
      </div>
    </article>
  );
}
