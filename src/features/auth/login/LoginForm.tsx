'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi, useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import { emailSchema, requiredString } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/Button';
import { FormError } from '@/shared/ui/FormError';
import { TextField } from '@/shared/ui/TextField';
import { TextLink } from '@/shared/ui/TextLink';
import styles from '../form.module.css';

const schema = z.object({ email: emailSchema, password: requiredString('Введите пароль') });
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const setUser = useSession((state) => state.setUser);
  const { run, pending, error } = useAsyncAction(authApi.login);
  const { register, handleSubmit, formState } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await run(email, password);
    if (!result.ok) return;
    setUser(result.data);
    // Read `next` at submit time instead of useSearchParams(): keeps the form server-rendered (no CSR bailout).
    const next = new URLSearchParams(window.location.search).get('next');
    router.replace(next?.startsWith('/dashboard') ? next : routes.dashboard);
    router.refresh();
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.fields}>
        <TextField
          label="Электронная почта"
          required
          type="email"
          autoComplete="email"
          placeholder="Введите вашу электронную почту"
          error={formState.errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Пароль"
          required
          type="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          error={formState.errors.password?.message}
          {...register('password')}
        />
      </div>
      <TextLink href={routes.resetPassword} align="right">
        Забыли пароль?
      </TextLink>
      <FormError message={error} />
      <Button type="submit" fullWidth loading={pending}>
        Войти на платформу
      </Button>
      <TextLink href={routes.auth} align="center">
        У меня еще нет аккаунта
      </TextLink>
    </form>
  );
}
