'use client';

import Image from 'next/image';
import { CalendarDays, MapPin, UsersRound } from 'lucide-react';
import { eventDateParts, EventTypeBadge, useEvent } from '@/entities/event';
import { ParticipateButton } from '@/features/event-participation';
import { routes } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { InfoChip } from '@/shared/ui/InfoChip';
import { Skeleton } from '@/shared/ui/Skeleton';
import { BackLink } from '../ui/BackLink';
import styles from './EventPage.module.css';

export function EventPage({ id }: { id: string }) {
  const { data: event, isLoading, error } = useEvent(id);
  if (isLoading) return <Skeleton height="60vh" />;
  if (error || !event)
    return (
      <EmptyState
        title="Событие не найдено"
        action={
          <Button href={routes.calendar} size="m">
            К календарю
          </Button>
        }
      />
    );
  const date = eventDateParts(event.startsAt);

  return (
    <div className={styles.layout}>
      <BackLink href={routes.calendar} />
      <article className={styles.content}>
        <Image src={event.banner} alt="" width={753} height={260} className={styles.banner} priority />
        <header className={styles.header}>
          <EventTypeBadge type={event.type} />
          <h1 className={styles.title}>{event.title}</h1>
          <p className={styles.description}>{event.description}</p>
        </header>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Повестка</h2>
          <ol className={styles.agenda}>
            {event.agenda.map((item) => (
              <li key={item.start} className={styles.agendaItem}>
                <span className={styles.time}>
                  <CalendarDays aria-hidden /> {item.start} - {item.end}
                </span>
                <div className={styles.agendaText}>
                  <h3 className={styles.agendaTitle}>{item.title}</h3>
                  <p className={styles.agendaDescription}>{item.text}</p>
                  {item.speaker && (
                    <div className={styles.person}>
                      <Image src={item.speaker.photo} alt="" width={30} height={30} className={styles.personPhoto} />
                      <span>
                        <span className={styles.personName}>{item.speaker.name}</span>
                        <span className={styles.personRole}>{item.speaker.role}</span>
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Список участников</h2>
          <p className={styles.description}>
            Медицинские стартапы, инвесторы, представители клиник, корпораций, научных центров и экспертного сообщества
          </p>
          <ul className={styles.people}>
            {event.participants.map((person) => (
              <li key={person.name} className={styles.personCard}>
                <Image src={person.photo} alt="" width={30} height={30} className={styles.personPhoto} />
                <span>
                  <span className={styles.personName}>{person.name}</span>
                  <span className={styles.personRole}>{person.role}</span>
                </span>
              </li>
            ))}
            <li className={styles.personCard}>
              <span className={styles.more}>
                <UsersRound aria-hidden />
              </span>
              <span className={styles.personName}>И еще более {event.participantsMore} участников</span>
            </li>
          </ul>
        </section>
      </article>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarDate}>
          {date.day} {date.monthShort}, {date.weekday}
        </p>
        <p className={styles.sidebarTime}>{date.time}</p>
        <InfoChip layout="inline" icon={<MapPin />} className={styles.location}>
          {event.location}
        </InfoChip>
        <ParticipateButton eventId={event.id} applied={event.applied} fullWidth />
      </aside>
    </div>
  );
}
