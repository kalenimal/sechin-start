import { LegalPage, offerSections } from '@/views/legal';
import { routes } from '@/shared/config';
import { buildMetadata } from '@/shared/lib/seo';

export const metadata = buildMetadata({
  title: 'Соглашение о сотрудничестве (оферта)',
  description: 'Условия доступа инвесторов и корпораций к материалам проектов платформы.',
  path: routes.offer,
});

export default function Page() {
  return (
    <LegalPage
      title="Соглашение о сотрудничестве (оферта)"
      updatedAt="01.09.2026"
      intro="Отправляя запрос на доступ к материалам проекта, пользователь принимает условия настоящей оферты."
      sections={offerSections}
    />
  );
}
