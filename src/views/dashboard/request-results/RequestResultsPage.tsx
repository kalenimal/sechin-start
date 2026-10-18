'use client';

import { useMemo, useState } from 'react';
import { FileSearch } from 'lucide-react';
import { useRequest } from '@/entities/corporate-request';
import { CloseRequestCard } from '@/features/corporate-request/close';
import { routes } from '@/shared/config';
import { pluralize } from '@/shared/lib/format';
import { Button, EmptyState, Select, Tag } from '@/shared/ui';
import { BackLink } from '../ui/BackLink';
import { FeedList } from '../ui/FeedList';
import feedStyles from '../ui/Feed.module.css';
import styles from './RequestResultsPage.module.css';

type Sort = 'new' | 'old';

export function RequestResultsPage({ id }: { id: string }) {
  const { data, isLoading, error } = useRequest(id);
  const [sort, setSort] = useState<Sort>('new');
  const projects = useMemo(() => {
    const items = [...(data?.projects ?? [])];
    return sort === 'new' ? items : items.reverse();
  }, [data, sort]);

  if (error)
    return (
      <EmptyState
        title="Запрос не найден"
        action={
          <Button href={routes.dashboard} size="m">
            К моим запросам
          </Button>
        }
      />
    );

  const searching = data?.request.status === 'searching';

  return (
    <div className={styles.layout}>
      <BackLink href={routes.dashboard} />
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Проекты по вашему запросу</h1>
          {data && (
            <Tag className={styles.requestTag}>
              <FileSearch aria-hidden /> {data.request.title}
            </Tag>
          )}
          <p className={styles.subtitle}>
            Мы подобрали проекты, которые соответствуют выбранным направлениям, стадии развития, формату взаимодействия
            и бюджету
          </p>
        </header>
        {searching ? (
          <div className={styles.processing}>
            <EmptyState
              icon="search"
              title="Ваш запрос обрабатывается, ожидайте"
              action={
                <Button href={routes.dashboard} size="m">
                  Вернуться назад
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className={feedStyles.counterRow}>
              <p className={feedStyles.counter}>
                {projects.length} {pluralize(projects.length, ['проект', 'проекта', 'проектов'])}
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
            <FeedList projects={projects} loading={isLoading} />
          </>
        )}
      </div>
      {data && !searching && <CloseRequestCard requestId={id} closed={data.request.status === 'closed'} />}
    </div>
  );
}
