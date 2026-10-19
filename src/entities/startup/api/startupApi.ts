import { mockRequest } from '@/shared/api';
import { startupsMock } from '../model/mock';
import type { Startup } from '../model/types';

export type StartupsQuery = { q?: string; tag?: string };

/** Pure filter, also used on the client: the catalog is pre-rendered once and filtered in the browser. */
export function filterStartups(startups: Startup[], query: StartupsQuery = {}): Startup[] {
  const q = query.q?.trim().toLowerCase();
  return startups.filter((startup) => {
    const matchesQuery =
      !q || startup.name.toLowerCase().includes(q) || startup.shortDescription.toLowerCase().includes(q);
    const matchesTag = !query.tag || startup.tags.includes(query.tag);
    return matchesQuery && matchesTag;
  });
}

export function getStartups(query: StartupsQuery = {}): Promise<Startup[]> {
  return mockRequest(() => filterStartups(startupsMock, query), 0);
}

export function getStartupBySlug(slug: string): Promise<Startup | null> {
  return mockRequest(() => startupsMock.find((startup) => startup.slug === slug) ?? null, 0);
}

export function getStartupSlugs(): string[] {
  return startupsMock.map((startup) => startup.slug);
}

export const startupsTags = Array.from(new Set(startupsMock.flatMap((startup) => startup.tags)));
