import { mockRequest } from '@/shared/api';
import { startupsMock } from '../model/mock';
import type { Startup } from '../model/types';

export type StartupsQuery = { q?: string; tag?: string };

export function getStartups(query: StartupsQuery = {}): Promise<Startup[]> {
  const q = query.q?.trim().toLowerCase();
  return mockRequest(
    () =>
      startupsMock.filter((startup) => {
        const matchesQuery =
          !q || startup.name.toLowerCase().includes(q) || startup.shortDescription.toLowerCase().includes(q);
        const matchesTag = !query.tag || startup.tags.includes(query.tag);
        return matchesQuery && matchesTag;
      }),
    0,
  );
}

export function getStartupBySlug(slug: string): Promise<Startup | null> {
  return mockRequest(() => startupsMock.find((startup) => startup.slug === slug) ?? null, 0);
}

export function getStartupSlugs(): string[] {
  return startupsMock.map((startup) => startup.slug);
}

export const startupsTags = Array.from(new Set(startupsMock.flatMap((startup) => startup.tags)));
