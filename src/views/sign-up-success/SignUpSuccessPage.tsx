import { ClearPendingRegistration } from '@/features/questionnaire';
import { routes } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { AuthShell } from '@/widgets/auth-shell';
import { SuccessIllustration } from './SuccessIllustration';
import styles from './SignUpSuccessPage.module.css';

export function SignUpSuccessPage() {
  return (
    <AuthShell centered>
      <ClearPendingRegistration />
      <SuccessIllustration />
      <h1 className={styles.title}>Анкета успешно отправлена</h1>
      <p className={styles.description}>
        Перейдите на платформу, чтобы следить за её статусом
        <br />и дальнейшими этапами рассмотрения
      </p>
      <Button href={routes.dashboard} fullWidth>
        Перейти на платформу
      </Button>
    </AuthShell>
  );
}
