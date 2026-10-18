'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi, useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import { passwordSchema } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/Button';
import { FormError } from '@/shared/ui/FormError';
import { TextField } from '@/shared/ui/TextField';
import styles from '../form.module.css';

const schema = z
  .object({ password: passwordSchema, confirm: z.string() })
  .refine((values) => values.password === values.confirm, { path: ['confirm'], message: 'Пароли не совпадают' });

export function NewPasswordForm() {
  const router = useRouter();
  const setUser = useSession((state) => state.setUser);
  const { run, pending, error } = useAsyncAction(authApi.setNewPassword);
  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async ({ password }) => {
    const result = await run(password);
    if (!result.ok) return;
    setUser(result.data);
    router.replace(routes.dashboard);
    router.refresh();
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <TextField
        label="Новый пароль"
        required
        type="password"
        autoComplete="new-password"
        placeholder="Введите новый пароль"
        error={formState.errors.password?.message}
        {...register('password')}
      />
      <TextField
        label="Подтвердите новый пароль"
        required
        type="password"
        autoComplete="new-password"
        placeholder="Введите новый пароль для подтверждения"
        error={formState.errors.confirm?.message}
        {...register('confirm')}
      />
      <FormError message={error} />
      <Button type="submit" fullWidth loading={pending}>
        Обновить пароль и войти на платформу
      </Button>
    </form>
  );
}
