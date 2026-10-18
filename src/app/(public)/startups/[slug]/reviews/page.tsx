import type { Metadata } from 'next';
import { StartupReviews } from '@/views/startup';
import { routes } from '@/shared/config';
import { buildMetadata } from '@/shared/lib/seo';
import { loadStartup, startupStaticParams } from '../data';

export const generateStaticParams = startupStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const startup = await loadStartup((await params).slug);
  return buildMetadata({
    title: `Отзывы ${startup.name}`,
    description: `Отзывы экспертов и врачей о проекте ${startup.name}. ${startup.shortDescription}`,
    path: routes.startupTab(startup.slug, 'reviews'),
    image: startup.heroImage,
  });
}

export default async function Page({ params }: Props) {
  const startup = await loadStartup((await params).slug);
  return <StartupReviews startup={startup} />;
}
