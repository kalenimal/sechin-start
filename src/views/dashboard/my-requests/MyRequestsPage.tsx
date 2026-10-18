'use client';

import { useState } from 'react';
import {
  RequestCard,
  requestStatusLabels,
  useMyRequests,
  type CorporateRequestStatus,
} from '@/entities/corporate-request';
import { NewProjectCard } from '@/entities/project';
import { useSession } from '@/entities/session';
import { CreateRequestModal } from '@/features/corporate-request/create';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { EmptyState } from '@/shared/ui/EmptyState';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { DashboardPage } from '@/widgets/dashboard-page';
import { CardsGrid } from '../ui/CardsGrid';
import styles from '../ui/Toolbar.module.css';

type Filter = CorporateRequestStatus | 'all';

export function MyRequestsPage() {
  const user = useSession((state) => state.user)!;
  const [status, setStatus] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const q = useDebounce(query);
  const { data, isLoading } = useMyRequests(user.id, { status, q });

  const options: SelectOption<Filter>[] = [
    { value: 'all', label: 'Все статусы', count: data?.total },
    ...(Object.keys(requestStatusLabels) as CorporateRequestStatus[]).map((value) => ({
      value,
      label: requestStatusLabels[value],
      count: data?.counts[value] ?? 0,
    })),
  ];

  return (
    <DashboardPage
      title="Мои запросы"
      count={data?.total}
      actions={
        <>
          <Select variant="filter" options={options} value={status} onChange={setStatus} className={styles.filter} />
          <SearchInput
            value={query}
            onValueChange={setQuery}
            placeholder="Поиск по запросам..."
            className={styles.search}
          />
        </>
      }
    >
      {!isLoading && data?.items.length === 0 && (q || status !== 'all') ? (
        <EmptyState title="По вашему запросу результатов не найдено..." />
      ) : (
        <CardsGrid loading={isLoading}>
          {!q && status === 'all' && <NewProjectCard label="Новый запрос" onClick={() => setCreating(true)} />}
          {data?.items.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </CardsGrid>
      )}
      <CreateRequestModal open={creating} onClose={() => setCreating(false)} />
    </DashboardPage>
  );
}
