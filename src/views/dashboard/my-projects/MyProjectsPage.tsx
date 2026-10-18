'use client';

import { useState } from 'react';
import {
  NewProjectCard,
  ProjectStatusCard,
  projectStatusLabels,
  useMyProjects,
  type ProjectStatus,
} from '@/entities/project';
import { useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { EmptyState } from '@/shared/ui/EmptyState';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { DashboardPage } from '@/widgets/dashboard-page';
import { CardsGrid } from '../ui/CardsGrid';
import styles from '../ui/Toolbar.module.css';

type StatusFilter = ProjectStatus | 'all';

export function MyProjectsPage() {
  const user = useSession((state) => state.user)!;
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const q = useDebounce(query);
  const { data, isLoading } = useMyProjects(user.id, { status, q });

  const options: SelectOption<StatusFilter>[] = [
    { value: 'all', label: 'Все статусы', count: data?.total },
    ...(Object.keys(projectStatusLabels) as ProjectStatus[]).map((value) => ({
      value,
      label: projectStatusLabels[value],
      count: data?.counts[value] ?? 0,
    })),
  ];

  const showEmpty = !isLoading && data && data.items.length === 0 && (q || status !== 'all');

  return (
    <DashboardPage
      title="Мои проекты"
      count={data?.total}
      actions={
        <>
          <Select variant="filter" options={options} value={status} onChange={setStatus} className={styles.filter} />
          <SearchInput value={query} onValueChange={setQuery} className={styles.search} />
        </>
      }
    >
      {showEmpty ? (
        <EmptyState title="По вашему запросу результатов не найдено..." />
      ) : (
        <CardsGrid loading={isLoading}>
          {!q && status === 'all' && <NewProjectCard href={routes.projectEdit('new')} />}
          {data?.items.map((project) => (
            <ProjectStatusCard key={project.id} project={project} />
          ))}
        </CardsGrid>
      )}
    </DashboardPage>
  );
}
