'use client';

import { todayIso } from '@/shared/lib/format';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProject, type Project } from '@/entities/project';
import { ApiError, createMockTable, delay } from '@/shared/api';
import { expertiseMock } from '../model/mock';
import type { ExpertiseRequest, ExpertiseStatus } from '../model/types';

export type ExpertiseItem = ExpertiseRequest & { project: Project };

const table = createMockTable<ExpertiseRequest>('sp_expertise_v1', expertiseMock);

async function withProjects(rows: ExpertiseRequest[]): Promise<ExpertiseItem[]> {
  const items = await Promise.all(
    rows.map(async (row): Promise<ExpertiseItem | null> => {
      const project = await getProject(row.projectId).catch(() => null);
      return project ? { ...row, project } : null;
    }),
  );
  return items.filter((item): item is ExpertiseItem => item !== null);
}

export async function getExpertiseRequests(filters: {
  status?: ExpertiseStatus | 'all';
  q?: string;
  expertId?: string;
}) {
  await delay(250);
  const rows = table.all().filter((row) => !filters.expertId || row.expertId === filters.expertId);
  const counts = rows.reduce<Partial<Record<ExpertiseStatus, number>>>(
    (acc, row) => ({ ...acc, [row.status]: (acc[row.status] ?? 0) + 1 }),
    {},
  );
  const filtered = rows.filter((row) => !filters.status || filters.status === 'all' || row.status === filters.status);
  const q = filters.q?.trim().toLowerCase();
  const items = (await withProjects(filtered)).filter(
    (item) =>
      !q ||
      `${item.project.name} ${item.project.company.name} ${item.project.shortDescription}`.toLowerCase().includes(q),
  );
  return { items, counts, total: rows.length };
}

export async function getExpertiseByProject(projectId: string) {
  return table.all().find((row) => row.projectId === projectId) ?? null;
}

export async function takeExpertise(id: string, expertId: string) {
  await delay(400);
  const row = table.find(id);
  if (!row) throw new ApiError('Заявка не найдена', 404);
  return table.upsert({ ...row, expertId, status: 'in-review' });
}

export async function finishExpertise(projectId: string, hasComments: boolean) {
  await delay(300);
  const row = table.all().find((item) => item.projectId === projectId);
  if (!row) return null;
  return table.upsert({ ...row, status: hasComments ? 'rework' : 'done', updatedAt: todayIso() });
}

const keys = { all: ['expertise'] as const };

export const useExpertiseRequests = (filters: Parameters<typeof getExpertiseRequests>[0]) =>
  useQuery({ queryKey: [...keys.all, filters], queryFn: () => getExpertiseRequests(filters) });

export function useTakeExpertise(expertId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => takeExpertise(id, expertId),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useFinishExpertise() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, hasComments }: { projectId: string; hasComments: boolean }) =>
      finishExpertise(projectId, hasComments),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.all }),
  });
}

export const useExpertiseByProject = (projectId: string, enabled = true) =>
  useQuery({ queryKey: [...keys.all, 'project', projectId], queryFn: () => getExpertiseByProject(projectId), enabled });
