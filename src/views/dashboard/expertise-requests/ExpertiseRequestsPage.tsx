'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExpertiseCard, useExpertiseRequests, useTakeExpertise } from '@/entities/expertise';
import { useSession } from '@/entities/session';
import { FeedSearchBar } from '@/features/project/feed-filters';
import { routes } from '@/shared/config';
import { pluralize } from '@/shared/lib/format';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Select } from '@/shared/ui/Select';
import { Tabs, type TabItem } from '@/shared/ui/Tabs';
import { toast } from '@/shared/ui/Toast';
import { DashboardPage } from '@/widgets/dashboard-page';
import feedStyles from '../ui/Feed.module.css';
import listStyles from '../ui/FeedList.module.css';

type Tab = 'all' | 'new' | 'in-review' | 'rework' | 'done';
type Sort = 'new' | 'old';

export function ExpertiseRequestsPage() {
  const router = useRouter();
  const user = useSession((state) => state.user)!;
  const [tab, setTab] = useState<Tab>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('new');
  const { data, isLoading } = useExpertiseRequests({ status: tab, q: query });
  const take = useTakeExpertise(user.id);

  const tabs: TabItem<Tab>[] = [
    { value: 'all', label: 'Все заявки', count: data?.total },
    { value: 'new', label: 'Новые', count: data?.counts.new ?? 0 },
    { value: 'in-review', label: 'На проверке', count: data?.counts['in-review'] ?? 0 },
    { value: 'rework', label: 'На доработке', count: data?.counts.rework ?? 0 },
    { value: 'done', label: 'Завершено', count: data?.counts.done ?? 0 },
  ];

  const items = [...(data?.items ?? [])].sort((a, b) =>
    sort === 'new' ? b.updatedAt.localeCompare(a.updatedAt) : a.updatedAt.localeCompare(b.updatedAt),
  );

  return (
    <DashboardPage
      width="centered"
      title="Заявки на экспертизу"
      subtitle="Проверяйте проекты и оставляйте экспертные заключения с комментариями"
    >
      <FeedSearchBar query={query} onSearch={setQuery} />
      <Tabs variant="pill" items={tabs} value={tab} onChange={setTab} ariaLabel="Статус заявок" />
      <div className={feedStyles.counterRow}>
        <p className={feedStyles.counter}>
          Найдено {items.length} {pluralize(items.length, ['заявка', 'заявки', 'заявок'])}
        </p>
        <Select
          variant="filter"
          options={[
            { value: 'new', label: 'Сначала новые' },
            { value: 'old', label: 'Сначала старые' },
          ]}
          value={sort}
          onChange={setSort}
          className={feedStyles.sort}
        />
      </div>
      {!isLoading && items.length === 0 ? (
        <EmptyState title="По вашему запросу результатов не найдено..." />
      ) : (
        <ul className={`${listStyles.list} stagger`} aria-busy={isLoading || undefined}>
          {items.map((item) => (
            <li key={item.id}>
              <ExpertiseCard
                item={item}
                mine={item.expertId === user.id}
                action={
                  item.status === 'new' ? (
                    <Button
                      size="m"
                      fullWidth
                      loading={take.isPending && take.variables === item.id}
                      onClick={() =>
                        take.mutate(item.id, {
                          onSuccess: () => {
                            toast.success('Заявка принята на экспертизу');
                            router.push(routes.project(item.projectId));
                          },
                        })
                      }
                    >
                      Принять на экспертизу
                    </Button>
                  ) : (
                    <Button size="m" fullWidth href={routes.project(item.projectId)}>
                      Перейти к заявке
                    </Button>
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
