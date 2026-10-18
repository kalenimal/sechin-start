'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { StartupTab } from '@/entities/startup';
import { routes } from '@/shared/config';
import { Tabs, type TabItem } from '@/shared/ui';

const segmentToTab: Record<string, StartupTab> = { team: 'team', reviews: 'reviews', documents: 'documents' };

export function StartupTabs({ slug }: { slug: string }) {
  const segment = useSelectedLayoutSegment();
  const active: StartupTab = (segment && segmentToTab[segment]) || 'about';
  const items: TabItem<StartupTab>[] = [
    { value: 'about', label: 'О проекте', href: routes.startup(slug) },
    { value: 'team', label: 'Команда', href: routes.startupTab(slug, 'team') },
    { value: 'reviews', label: 'Отзывы', href: routes.startupTab(slug, 'reviews') },
    { value: 'documents', label: 'Документы', href: routes.startupTab(slug, 'documents') },
  ];
  return <Tabs items={items} value={active} ariaLabel="Разделы проекта" />;
}
