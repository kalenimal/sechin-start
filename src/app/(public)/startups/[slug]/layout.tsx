import { StartupLayout } from '@/views/startup';
import { loadStartup, startupStaticParams } from './data';

export const generateStaticParams = startupStaticParams;
export const dynamicParams = false;

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export default async function Layout({ children, params }: Props) {
  const { slug } = await params;
  const startup = await loadStartup(slug);
  return <StartupLayout startup={startup}>{children}</StartupLayout>;
}
