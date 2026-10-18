import { NewPasswordForm, RequestResetForm } from '@/features/auth/reset-password';
import { routes } from '@/shared/config';
import { AuthShell, AuthText } from '@/widgets/auth-shell';

export function ResetPasswordPage() {
  return (
    <AuthShell back={routes.login}>
      <AuthText
        title="Восстановление пароля"
        description="Введите вашу электронную почту для восстановления. На нее мы вышлем ссылку для сброса пароля"
      />
      <RequestResetForm />
    </AuthShell>
  );
}

export function NewPasswordPage() {
  return (
    <AuthShell>
      <AuthText title="Восстановление пароля" description="Введите ваш новый пароль" />
      <NewPasswordForm />
    </AuthShell>
  );
}
