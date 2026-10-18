'use client';

import { ExpertiseCard, useExpertiseRequests } from '@/entities/expertise';
import { useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { DashboardPage } from '@/widgets/dashboard-page';
import listStyles from '../ui/FeedList.module.css';

export function MyExpertisePage() {
  const user = useSession((state) => state.user)!;
  const { data, isLoading } = useExpertiseRequests({ expertId: user.id });
  const items = data?.items.filter((item) => item.status !== 'done') ?? [];

  return (
    <DashboardPage width="centered" title="Мои проверки">
      {!isLoading && items.length === 0 ? (
        <EmptyState
          icon="search"
          title="У вас пока нет проверок"
          action={
            <Button href={routes.dashboard} size="m">
              К заявкам на экспертизу
            </Button>
          }
        />
      ) : (
        <ul className={`${listStyles.list} stagger`}>
          {items.map((item) => (
            <li key={item.id}>
              <ExpertiseCard
                item={item}
                mine
                action={
                  <Button size="m" fullWidth href={routes.project(item.projectId)}>
                    Перейти к заявке
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
