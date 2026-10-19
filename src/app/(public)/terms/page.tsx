import { LegalPage, termsSections } from '@/views/legal';
import { routes } from '@/shared/config';
import { buildMetadata } from '@/shared/lib/seo';

export const metadata = buildMetadata({
  title: 'Пользовательское соглашение',
  description: 'Условия использования платформы медицинских цифровых сервисов Сеченовского Университета.',
  path: routes.terms,
});

export default function Page() {
  return (
    <LegalPage
      title="Пользовательское соглашение"
      updatedAt="01.09.2026"
      intro="Регистрируясь на платформе, пользователь подтверждает, что ознакомился с настоящим соглашением и принимает его условия."
      sections={termsSections}
    />
  );
}
