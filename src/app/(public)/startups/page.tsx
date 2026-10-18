import type { Metadata } from 'next';
import { StartupsPage } from '@/views/startups';
import { buildMetadata } from '@/shared/lib/seo';

type Props = { searchParams: Promise<{ q?: string; tag?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, tag } = await searchParams;
  const base = buildMetadata({
    title: tag ? `Стартапы: ${tag}` : 'Каталог медицинских стартапов',
    description:
      'Медицинские стартапы на разных стадиях развития: от идеи до масштабирования. Фильтр по направлениям — AI-диагностика, кардиология, Digital Health и другие.',
    path: '/startups',
  });
  // Search result pages are thin duplicates — keep them out of the index, but follow links.
  return q ? { ...base, robots: { index: false, follow: true } } : base;
}

export default async function Page({ searchParams }: Props) {
  const { q, tag } = await searchParams;
  return <StartupsPage q={q} tag={tag} />;
}
