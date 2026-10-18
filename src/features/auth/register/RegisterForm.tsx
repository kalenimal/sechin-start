'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi, type Role, useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import { emailSchema, passwordSchema } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormError } from '@/shared/ui/FormError';
import { TextField } from '@/shared/ui/TextField';
import { TextLink } from '@/shared/ui/TextLink';
import styles from '../form.module.css';

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
  agree: z.literal(true, { error: 'Необходимо принять условия соглашения' }),
});
type Values = z.infer<typeof schema>;

export function RegisterForm({ role }: { role: Role }) {
  const router = useRouter();
  const setPending = useSession((state) => state.setPending);
  const { run, pending, error } = useAsyncAction(authApi.checkEmailAvailable);
  const { register, control, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { agree: true as const },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    if (!(await run(email)).ok) return;
    setPending({ role, email, password, verified: false });
    router.push(routes.signUpStep(role, 2));
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
          autoComplete="new-password"
          placeholder="Введите пароль"
          error={formState.errors.password?.message}
          {...register('password')}
        />
      </div>
      <Controller
        control={control}
        name="agree"
        render={({ field, fieldState }) => (
          <div>
            <Checkbox
              checked={!!field.value}
              onChange={(event) => field.onChange(event.target.checked)}
              label={
                <span className={styles.agreement}>
                  Подтверждаю, что ознакомился(ась) с{' '}
                  <Link href={routes.terms} target="_blank">
                    Пользовательским соглашением
                  </Link>{' '}
                  и принимаю его условия в полном объёме
                </span>
              }
            />
            {fieldState.error && <FormError message={fieldState.error.message} />}
          </div>
        )}
      />
      <FormError message={error} />
      <Button type="submit" fullWidth loading={pending}>
        Продолжить
      </Button>
      <TextLink href={routes.login} align="center">
        У меня уже есть аккаунт
      </TextLink>
    </form>
  );
}
