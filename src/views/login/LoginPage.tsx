import { LoginForm } from '@/features/auth/login';
import { routes } from '@/shared/config';
import { AuthShell, AuthText } from '@/widgets/auth-shell';

export function LoginPage() {
  return (
    <AuthShell back={routes.auth}>
      <AuthText title="Вход на платформу" />
      <LoginForm />
    </AuthShell>
  );
}
