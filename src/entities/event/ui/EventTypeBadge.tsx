import { LockKeyhole, Mic, Presentation } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { eventTypeLabels, type EventType } from '../model/types';
import styles from './EventCard.module.css';

const icons = { 'demo-day': <Presentation />, 'closed-pitch': <LockKeyhole />, webinar: <Mic /> };

export function EventTypeBadge({ type }: { type: EventType }) {
  return (
    <span className={cn(styles.badge, type === 'closed-pitch' && styles.badgeDanger)}>
      {icons[type]}
      {eventTypeLabels[type]}
    </span>
  );
}
