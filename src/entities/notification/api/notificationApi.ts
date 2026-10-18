'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMockTable, delay } from '@/shared/api';
import { notificationsMock } from '../model/mock';
import type { Notification } from '../model/types';

const table = createMockTable<Notification>('sp_notifications_v1', notificationsMock);

export async function getNotifications() {
  await delay(250);
  return table.all();
}

export async function markRead(id: string) {
  await delay(100);
  const item = table.find(id);
  if (item && !item.read) table.upsert({ ...item, read: true });
}

const key = ['notifications'] as const;

export const useNotifications = () => useQuery({ queryKey: key, queryFn: getNotifications });

export function useMarkRead() {
  const client = useQueryClient();
  return useMutation({ mutationFn: markRead, onSuccess: () => client.invalidateQueries({ queryKey: key }) });
}
