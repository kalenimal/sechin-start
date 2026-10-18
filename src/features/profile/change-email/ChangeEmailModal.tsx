'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '@/entities/session';
import { useAsyncAction } from '@/shared/lib/hooks/useAsyncAction';
import { emailSchema } from '@/shared/lib/validation';
import { Button, FormError, Modal, TextField } from '@/shared/ui';
import styles from '../profile.module.css';

const schema = z.object({ email: emailSchema });

export function ChangeEmailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { run, pending, error } = useAsyncAction(authApi.requestEmailChange);

  const close = () => {
    onClose();
    setSent(false);
    reset();
  };

  if (sent) {
    return (
      <Modal
        open={open}
        onClose={close}
        title="Отправили ссылку для смены почты"
        description="Мы отправили ссылку с подтверждением для смены вашей почты для входа. Перейдите по ней, чтобы изменить"
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
      title="Смена электронной почты"
      description="Введите здесь свою новую почту для входа. Чтобы подтвердить изменения, мы отправим ссылку с подтверждением на вашу старую почту"
    >
      <form
        className={styles.modalForm}
        onSubmit={handleSubmit(async ({ email }) => (await run(email)).ok && setSent(true))}
        noValidate
      >
        <TextField
          label="Электронная почта"
          type="email"
          placeholder="name@mail.ru"
          error={formState.errors.email?.message}
          {...register('email')}
        />
        <FormError message={error} />
        <Button type="submit" size="m" fullWidth loading={pending}>
          Сменить почту
        </Button>
      </form>
    </Modal>
  );
}
