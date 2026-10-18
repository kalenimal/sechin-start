'use client';

import { useState } from 'react';
import { EventCard, useEvents } from '@/entities/event';
import { ParticipateButton } from '@/features/event-participation';
import { routes } from '@/shared/config';
import { pluralize } from '@/shared/lib/format';
import { Button, Select } from '@/shared/ui';
import { DashboardPage } from '@/widgets/dashboard-page';
import feedStyles from '../ui/Feed.module.css';
import listStyles from '../ui/FeedList.module.css';

type Sort = 'soon' | 'late';

export function EventsPage() {
  const [sort, setSort] = useState<Sort>('soon');
  const { data = [], isLoading } = useEvents(sort);
  return (
    <DashboardPage
      width="centered"
      title="Календарь событий"
      subtitle="Предстоящие мероприятия платформы: демо-дни, закрытые питчи и вебинары"
    >
      <div className={feedStyles.counterRow}>
        <p className={feedStyles.counter}>
          {data.length} {pluralize(data.length, ['ближайшее событие', 'ближайших события', 'ближайших событий'])}
        </p>
        <Select
          variant="filter"
          options={[
            { value: 'soon', label: 'Сначала ближайшие' },
            { value: 'late', label: 'Сначала поздние' },
          ]}
          value={sort}
          onChange={setSort}
          className={feedStyles.sort}
        />
      </div>
      <ul className={`${listStyles.list} stagger`} aria-busy={isLoading || undefined}>
        {data.map((event) => (
          <li key={event.id}>
            <EventCard
              event={event}
              href={routes.calendarEvent(event.id)}
              actions={
                <>
                  <ParticipateButton eventId={event.id} applied={event.applied} />
                  <Button href={routes.calendarEvent(event.id)} size="m" color="grey">
                    Подробнее
                  </Button>
                </>
              }
            />
          </li>
        ))}
      </ul>
    </DashboardPage>
  );
}
