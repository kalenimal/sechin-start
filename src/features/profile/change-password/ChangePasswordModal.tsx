'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '@/entities/session';
import { routes } from '@/shared/config';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import { passwordSchema, requiredString } from '@/shared/lib/validation';
import { Button, FormError, Modal, TextField, TextLink } from '@/shared/ui';
import styles from '../profile.module.css';

const schema = z
  .object({ oldPassword: requiredString('Введите старый пароль'), password: passwordSchema, confirm: z.string() })
  .refine((values) => values.password === values.confirm, { path: ['confirm'], message: 'Пароли не совпадают' });

export function ChangePasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { run, pending, error } = useAsyncAction(authApi.changePassword);

  const close = () => {
    onClose();
    setDone(false);
    reset();
  };

  if (done) {
    return (
      <Modal
        open={open}
        onClose={close}
        title="Пароль изменён"
        description="Используйте новый пароль при следующем входе на платформу"
      >
        <Button size="m" fullWidth onClick={close}>
          Закрыть
        </Button>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="Смена пароля"
      description="Для смены пароля введите свой настоящий пароль и новый"
    >
      <form
        className={styles.modalForm}
        onSubmit={handleSubmit(
          async ({ oldPassword, password }) => (await run(oldPassword, password)).ok && setDone(true),
        )}
        noValidate
      >
        <TextField
          label="Старый пароль"
          required
          type="password"
          autoComplete="current-password"
          placeholder="Введите свой старый пароль"
          error={formState.errors.oldPassword?.message}
          {...register('oldPassword')}
        />
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
          placeholder="Введите новый пароль еще раз"
          error={formState.errors.confirm?.message}
          {...register('confirm')}
        />
        <FormError message={error} />
        <Button type="submit" size="m" fullWidth loading={pending}>
          Сменить пароль
        </Button>
        <TextLink href={routes.resetPassword} align="center">
          Я не помню свой старый пароль, хочу восстановить доступ
        </TextLink>
      </form>
    </Modal>
  );
}
