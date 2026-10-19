import { HomePage } from '@/views/home';
import { buildMetadata } from '@/shared/lib/seo';

export const metadata = buildMetadata({
  title: 'Медицинские цифровые сервисы Сеченовского Университета',
  description:
    'Каталог медицинских цифровых сервисов, прошедших экспертизу Сеченовского Университета: AI-диагностика, Digital Health, MedTech. Инвестиции, пилотирование и масштабирование проектов.',
  path: '/',
});

export default function Page() {
  return <HomePage />;
}
