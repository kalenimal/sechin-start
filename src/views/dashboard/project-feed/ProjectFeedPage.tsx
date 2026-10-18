'use client';

import { useMemo, useState } from 'react';
import { useProjectFeed } from '@/entities/project';
import {
  emptyFeedFilters,
  FeedSearchBar,
  toProjectFilters,
  type FeedFiltersState,
} from '@/features/project/feed-filters';
import { pluralize } from '@/shared/lib/format';
import { EmptyState } from '@/shared/ui';
import { DashboardPage } from '@/widgets/dashboard-page';
import { FeedList } from '../ui/FeedList';
import styles from '../ui/Feed.module.css';

export function ProjectFeedPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FeedFiltersState>(emptyFeedFilters);
  const projectFilters = useMemo(() => toProjectFilters(filters, query), [filters, query]);
  const { data, isLoading } = useProjectFeed(projectFilters);
  const count = data?.length ?? 0;

  return (
    <DashboardPage
      width="centered"
      title="Лента проектов"
      subtitle="Отобранные медицинские проекты, прошедшие модерацию и экспертизу"
    >
      <FeedSearchBar query={query} onSearch={setQuery} filters={filters} onFiltersChange={setFilters} />
      {!isLoading && (
        <p className={styles.counter}>
          {count} {pluralize(count, ['проект', 'проекта', 'проектов'])}
        </p>
      )}
      {!isLoading && count === 0 ? (
        <EmptyState title="По вашему запросу результатов не найдено..." />
      ) : (
        <FeedList projects={data} loading={isLoading} />
      )}
    </DashboardPage>
  );
}
