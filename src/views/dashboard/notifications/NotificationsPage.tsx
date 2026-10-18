'use client';

import { useState } from 'react';
import { NotificationItem, useMarkRead, useNotifications } from '@/entities/notification';
import { EmptyState, Tabs, type TabItem } from '@/shared/ui';
import { DashboardPage } from '@/widgets/dashboard-page';
import styles from './NotificationsPage.module.css';

type Filter = 'all' | 'unread' | 'read';

export function NotificationsPage() {
  const { data = [] } = useNotifications();
  const markRead = useMarkRead();
  const [filter, setFilter] = useState<Filter>('all');
  const unread = data.filter((item) => !item.read);
  const read = data.filter((item) => item.read);
  const items = filter === 'all' ? [...unread, ...read] : filter === 'unread' ? unread : read;

  const tabs: TabItem<Filter>[] = [
    { value: 'all', label: 'Все уведомления', count: data.length },
    { value: 'unread', label: 'Непрочитанные', count: unread.length },
    { value: 'read', label: 'Прочитанные', count: read.length },
  ];

  return (
    <DashboardPage width="centered" title="Уведомления" count={data.length}>
      <Tabs
        variant="underline"
        items={tabs}
        value={filter}
        onChange={setFilter}
        ariaLabel="Фильтр уведомлений"
        className={styles.tabs}
      />
      {items.length === 0 ? (
        <EmptyState icon="search" title="Уведомлений нет" />
      ) : (
        <ul className={`${styles.list} stagger`}>
          {items.map((item) => (
            <li key={item.id}>
              <NotificationItem notification={item} onOpen={() => !item.read && markRead.mutate(item.id)} />
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
