'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import { useApplyToEvent } from '@/entities/event';
import { useSession } from '@/entities/session';
import { emailSchema, phoneSchema, requiredString } from '@/shared/lib/validation';
import { Button, type ButtonSize } from '@/shared/ui/Button';
import { FormError } from '@/shared/ui/FormError';
import { Modal } from '@/shared/ui/Modal';
import { PhoneField } from '@/shared/ui/PhoneField';
import { TextField } from '@/shared/ui/TextField';
import styles from './ParticipateButton.module.css';

const schema = z.object({
  format: requiredString('Укажите формат участия'),
  company: z.string(),
  position: requiredString('Укажите должность'),
  fullName: requiredString('Укажите ФИО'),
  email: emailSchema,
  phone: phoneSchema,
});
type Values = z.infer<typeof schema>;

export function ParticipateButton({
  eventId,
  applied,
  size = 'm',
  fullWidth,
}: {
  eventId: string;
  applied?: boolean;
  size?: ButtonSize;
  fullWidth?: boolean;
}) {
  const user = useSession((state) => state.user);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const mutation = useApplyToEvent();
  const { register, control, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      format: '',
      company: '',
      position: '',
      fullName: user?.fullName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  });

  const close = () => {
    setOpen(false);
    setSent(false);
  };

  return (
    <>
      {applied && !open ? (
        <Button size={size} color="grey" disabled iconLeft={<Check aria-hidden />} fullWidth={fullWidth}>
          Заявка отправлена
        </Button>
      ) : (
        <Button size={size} fullWidth={fullWidth} onClick={() => setOpen(true)}>
          Участвовать
        </Button>
      )}
      {sent ? (
        <Modal
          open={open}
          onClose={close}
          title="Заявка отправлена"
          description="Организатор получил ваш запрос. Мы уведомим вас после подтверждения участия."
        >
          <Button size="m" fullWidth onClick={close}>
            Закрыть
          </Button>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={close}
          title="Запрос на участие"
          description="Отправьте заявку на участие в мероприятии. Организатор рассмотрит запрос и сообщит о решении"
        >
          <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmit((form) =>
              mutation.mutate({ id: eventId, form }, { onSuccess: () => setSent(true) }),
            )}
          >
            <TextField
              label="Формат участия"
              required
              placeholder="Например, участник, представитель компании, инвестор"
              error={formState.errors.format?.message}
              {...register('format')}
            />
            <TextField
              label="Компания / организация"
              placeholder="Например, ООО «КардиоСенс»"
              {...register('company')}
            />
            <TextField
              label="Должность"
              required
              placeholder="Например, директор по развитию"
              error={formState.errors.position?.message}
              {...register('position')}
            />
            <TextField
              label="Имя, фамилия, отчество"
              required
              error={formState.errors.fullName?.message}
              {...register('fullName')}
            />
            <TextField
              label="Электронная почта"
              required
              type="email"
              error={formState.errors.email?.message}
              {...register('email')}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => (
                <PhoneField
                  required
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />
            <FormError message={mutation.error?.message} />
            <Button type="submit" size="m" fullWidth loading={mutation.isPending} className={styles.submit}>
              Отправить запрос
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
