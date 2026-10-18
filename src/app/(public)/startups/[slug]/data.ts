import { cache } from 'react';
import { notFound } from 'next/navigation';
import { getStartupBySlug, getStartupSlugs } from '@/entities/startup';

export const loadStartup = cache(async (slug: string) => {
  const startup = await getStartupBySlug(slug);
  if (!startup) notFound();
  return startup;
});

export const startupStaticParams = () => getStartupSlugs().map((slug) => ({ slug }));
