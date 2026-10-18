import type { Metadata } from 'next';
import { StartupDocuments } from '@/views/startup';
import { routes } from '@/shared/config';
import { buildMetadata } from '@/shared/lib/seo';
import { loadStartup, startupStaticParams } from '../data';

export const generateStaticParams = startupStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const startup = await loadStartup((await params).slug);
  return buildMetadata({
    title: `Документы ${startup.name}`,
    description: `Документы проекта ${startup.name}. ${startup.shortDescription}`,
    path: routes.startupTab(startup.slug, 'documents'),
    image: startup.heroImage,
  });
}

export default async function Page({ params }: Props) {
  const startup = await loadStartup((await params).slug);
  return <StartupDocuments startup={startup} />;
}
