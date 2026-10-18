import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { InfoChip } from '@/shared/ui';
import { eventDateParts } from '../lib';
import type { PlatformEvent } from '../model/types';
import { EventTypeBadge } from './EventTypeBadge';
import styles from './EventCard.module.css';

export function EventCard({ event, href, actions }: { event: PlatformEvent; href: string; actions?: ReactNode }) {
  const date = eventDateParts(event.startsAt);
  return (
    <article className={styles.card}>
      <time className={styles.date} dateTime={event.startsAt}>
        <span className={styles.day}>{date.day}</span>
        <span className={styles.month}>
          {date.month}, {date.weekday}
        </span>
      </time>
      <div className={styles.body}>
        <EventTypeBadge type={event.type} />
        <h2 className={styles.title}>
          <Link href={href}>{event.title}</Link>
        </h2>
        <p className={styles.description}>{event.shortDescription}</p>
        <div className={styles.chips}>
          <InfoChip layout="inline" icon={<Clock />} className={styles.chip}>
            {date.day} {date.month} · {date.time}
          </InfoChip>
          <InfoChip layout="inline" icon={<MapPin />} className={styles.chip}>
            {event.location}
          </InfoChip>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <Image src={event.image} alt="" width={240} height={280} className={styles.image} sizes="240px" />
    </article>
  );
}
