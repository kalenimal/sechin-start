import { HomePage } from '@/views/home';
import { buildMetadata } from '@/shared/lib/seo';

export const metadata = buildMetadata({
  title: 'Медицинские стартапы Сеченовского Университета',
  description:
    'Каталог медицинских стартапов, прошедших экспертизу Сеченовского Университета: AI-диагностика, Digital Health, MedTech. Инвестиции, пилотирование и масштабирование проектов.',
  path: '/',
});

export default function Page() {
  return <HomePage />;
}
