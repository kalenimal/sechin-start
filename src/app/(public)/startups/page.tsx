import type { Metadata } from 'next';
import { StartupsPage } from '@/views/startups';
import { buildMetadata } from '@/shared/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Каталог медицинских цифровых сервисов',
  description:
    'Медицинские цифровые сервисы на разных стадиях развития: от идеи до масштабирования. Фильтр по направлениям — AI-диагностика, кардиология, Digital Health и другие.',
  path: '/startups',
});

export default function Page() {
  return <StartupsPage />;
}
