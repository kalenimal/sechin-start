'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '@/entities/session';
import { routes } from '@/shared/config';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import { emailSchema } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/Button';
import { FormError } from '@/shared/ui/FormError';
import { TextField } from '@/shared/ui/TextField';
import { TextLink } from '@/shared/ui/TextLink';
import styles from '../form.module.css';

const schema = z.object({ email: emailSchema });

export function RequestResetForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const { run, pending, error } = useAsyncAction(authApi.requestPasswordReset);
  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async ({ email }) => {
    if ((await run(email)).ok) setSentTo(email);
  });

  if (sentTo) {
    return (
      <div className={styles.form}>
        <p>
          Мы отправили ссылку для сброса пароля на <strong>{sentTo}</strong>. В демо-режиме можно сразу перейти к вводу
          нового пароля.
        </p>
        <Button href={routes.resetPasswordNew} fullWidth>
          Ввести новый пароль
        </Button>
        <TextLink align="center" onClick={() => setSentTo(null)}>
          Отправить ещё раз
        </TextLink>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <TextField
        label="Электронная почта"
        required
        type="email"
        autoComplete="email"
        placeholder="Введите вашу электронную почту"
        error={formState.errors.email?.message}
        {...register('email')}
      />
      <FormError message={error} />
      <Button type="submit" fullWidth loading={pending}>
        Отправить ссылку для сброса пароля
      </Button>
    </form>
  );
}
