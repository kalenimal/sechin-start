'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { industries, projectDirections } from '@/entities/project';
import { useSession } from '@/entities/session';
import { emailSchema, phoneSchema, requiredString } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/Button';
import { FormError } from '@/shared/ui/FormError';
import { Select } from '@/shared/ui/Select';
import { useCompleteRegistration } from '../model/useCompleteRegistration';
import { ContactFields } from './ContactFields';
import { FormSection } from './FormSection';
import styles from './Questionnaire.module.css';

const schema = z.object({
  industry: z.string({ error: 'Выберите отрасль' }).min(1, 'Выберите отрасль'),
  focus: z.string({ error: 'Выберите направление' }).min(1, 'Выберите направление'),
  fullName: requiredString('Укажите имя и фамилию'),
  email: emailSchema,
  phone: phoneSchema,
});

type Values = z.infer<typeof schema>;

export function CorporateQuestionnaire() {
  const pendingEmail = useSession((state) => state.pending?.email ?? '');
  const { register, control, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: pendingEmail, phone: '' },
  });
  const errors = formState.errors;
  const complete = useCompleteRegistration('corporate');

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((v) => complete.run({ fullName: v.fullName, phone: v.phone }))}
      noValidate
    >
      <FormSection title="Основная информация">
        <Controller
          control={control}
          name="industry"
          render={({ field }) => (
            <Select
              label="Отрасль"
              required
              placeholder="Выберите отрасль"
              options={industries}
              value={field.value}
              onChange={field.onChange}
              error={errors.industry?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="focus"
          render={({ field }) => (
            <Select
              label="Фокусные направления"
              required
              placeholder="Выберите интересующие направления"
              options={projectDirections}
              value={field.value}
              onChange={field.onChange}
              error={errors.focus?.message}
            />
          )}
        />
      </FormSection>

      <ContactFields register={register} control={control} errors={errors} />

      <FormError message={complete.error} />
      <Button type="submit" fullWidth loading={complete.pending}>
        Зарегистрироваться
      </Button>
    </form>
  );
}
