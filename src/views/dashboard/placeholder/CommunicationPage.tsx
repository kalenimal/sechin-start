import { routes } from '@/shared/config';
import { Button, EmptyState } from '@/shared/ui';
import { DashboardPage } from '@/widgets/dashboard-page';

/** Not designed yet — keeps navigation consistent until the chat screens are ready. */
export function CommunicationPage() {
  return (
    <DashboardPage width="centered" title="Коммуникация">
      <EmptyState
        icon="search"
        title="Раздел коммуникаций скоро появится"
        action={
          <Button href={routes.notifications} size="m">
            Перейти к уведомлениям
          </Button>
        }
      />
    </DashboardPage>
  );
}
