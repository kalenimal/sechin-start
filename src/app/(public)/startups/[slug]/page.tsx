import type { Metadata } from 'next';
import { StartupAbout } from '@/views/startup';
import { routes } from '@/shared/config';
import { buildMetadata } from '@/shared/lib/seo';
import { loadStartup, startupStaticParams } from './data';

export const generateStaticParams = startupStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const startup = await loadStartup((await params).slug);
  return buildMetadata({
    title: `${startup.name} — ${startup.tags.join(', ')}`,
    description: startup.shortDescription,
    path: routes.startup(startup.slug),
    image: startup.heroImage,
    type: 'article',
  });
}

export default async function Page({ params }: Props) {
  const startup = await loadStartup((await params).slug);
  return <StartupAbout startup={startup} />;
}
