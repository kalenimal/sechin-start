'use client';

import { todayIso } from '@/shared/lib/format';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFeed } from '@/entities/project';
import { ApiError, createMockTable, delay } from '@/shared/api';
import { corporateRequestsMock } from '../model/mock';
import type { CorporateRequest, CorporateRequestStatus } from '../model/types';

const table = createMockTable<CorporateRequest>('sp_corporate_requests_v1', corporateRequestsMock);

export async function getMyRequests(ownerId: string, filters: { status?: CorporateRequestStatus | 'all'; q?: string }) {
  await delay(300);
  const own = table.all().filter((request) => request.ownerId === ownerId || request.ownerId === 'u-corporate');
  const q = filters.q?.trim().toLowerCase();
  const items = own.filter(
    (request) =>
      (!filters.status || filters.status === 'all' || request.status === filters.status) &&
      (!q || request.title.toLowerCase().includes(q)),
  );
  const counts = own.reduce<Partial<Record<CorporateRequestStatus, number>>>(
    (acc, request) => ({ ...acc, [request.status]: (acc[request.status] ?? 0) + 1 }),
    {},
  );
  return { items, total: own.length, counts };
}

export async function getRequest(id: string) {
  await delay(250);
  const request = table.find(id);
  if (!request) throw new ApiError('Запрос не найден', 404);
  const feed = await getFeed();
  return { request, projects: feed.filter((project) => request.matchedProjectIds.includes(project.id)) };
}

export async function createRequest(
  ownerId: string,
  data: Omit<CorporateRequest, 'id' | 'ownerId' | 'status' | 'matchedProjectIds' | 'createdAt'>,
) {
  await delay(600);
  return table.upsert({
    ...data,
    id: `req-${Date.now()}`,
    ownerId,
    status: 'searching',
    matchedProjectIds: [],
    createdAt: todayIso(),
  });
}

export async function closeRequest(id: string) {
  await delay(400);
  const request = table.find(id);
  if (!request) throw new ApiError('Запрос не найден', 404);
  return table.upsert({ ...request, status: 'closed' });
}

const keys = { all: ['corporate-requests'] as const };

export const useMyRequests = (ownerId: string, filters: { status?: CorporateRequestStatus | 'all'; q?: string }) =>
  useQuery({ queryKey: [...keys.all, 'mine', ownerId, filters], queryFn: () => getMyRequests(ownerId, filters) });

export const useRequest = (id: string) => useQuery({ queryKey: [...keys.all, id], queryFn: () => getRequest(id) });

export function useCreateRequest(ownerId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof createRequest>[1]) => createRequest(ownerId, data),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useCloseRequest() {
  const client = useQueryClient();
  return useMutation({ mutationFn: closeRequest, onSuccess: () => client.invalidateQueries({ queryKey: keys.all }) });
}
