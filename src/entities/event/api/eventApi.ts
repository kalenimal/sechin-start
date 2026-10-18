'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, createMockSet, delay } from '@/shared/api';
import { eventsMock } from '../model/mock';

const applications = createMockSet('sp_event_applications_v1');

export async function getEvents(sort: 'soon' | 'late' = 'soon') {
  await delay(250);
  const items = [...eventsMock].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const applied = applications.values();
  return (sort === 'soon' ? items : items.reverse()).map((event) => ({
    ...event,
    applied: applied.includes(event.id),
  }));
}

export async function getEvent(id: string) {
  await delay(200);
  const event = eventsMock.find((item) => item.id === id);
  if (!event) throw new ApiError('Событие не найдено', 404);
  return { ...event, applied: applications.has(event.id) };
}

export type ParticipationForm = {
  format: string;
  company: string;
  position: string;
  fullName: string;
  email: string;
  phone: string;
};

export async function applyToEvent(id: string, _form: ParticipationForm) {
  await delay(600);
  applications.add(id);
}

const key = ['events'] as const;

export const useEvents = (sort: 'soon' | 'late') =>
  useQuery({ queryKey: [...key, sort], queryFn: () => getEvents(sort) });
export const useEvent = (id: string) => useQuery({ queryKey: [...key, id], queryFn: () => getEvent(id) });

export function useApplyToEvent() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: ParticipationForm }) => applyToEvent(id, form),
    onSuccess: () => client.invalidateQueries({ queryKey: key }),
  });
}
