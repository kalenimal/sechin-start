'use client';

import { useFavouriteProjects } from '@/entities/project';
import { routes } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { DashboardPage } from '@/widgets/dashboard-page';
import { FeedList } from '../ui/FeedList';

export function FavouritesPage() {
  const { data, isLoading } = useFavouriteProjects();
  return (
    <DashboardPage width="centered" title="Избранное">
      {!isLoading && data?.length === 0 ? (
        <EmptyState
          icon="search"
          title="В избранном пока пусто"
          action={
            <Button href={routes.dashboard} size="m">
              Перейти к ленте проектов
            </Button>
          }
        />
      ) : (
        <FeedList projects={data} loading={isLoading} />
      )}
    </DashboardPage>
  );
}
