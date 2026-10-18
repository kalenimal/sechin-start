'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { investmentFormats } from '@/entities/project';
import { useSession } from '@/entities/session';
import { emailSchema, phoneSchema, requiredString } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/Button';
import { FormError } from '@/shared/ui/FormError';
import { RangeField } from '@/shared/ui/RangeField';
import { Select } from '@/shared/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { Textarea } from '@/shared/ui/Textarea';
import { useCompleteRegistration } from '../model/useCompleteRegistration';
import { ContactFields } from './ContactFields';
import { FormSection } from './FormSection';
import styles from './Questionnaire.module.css';

const schema = z.object({
  format: z.string({ error: 'Выберите формат' }).min(1, 'Выберите формат'),
  fundName: z.string(),
  thesis: requiredString('Укажите инвестиционный тезис'),
  thesisDetails: requiredString('Расскажите о тезисе подробнее'),
  amount: z
    .object({ from: z.string(), to: z.string() })
    .refine((range) => range.from || range.to, 'Укажите хотя бы одну границу')
    .refine(
      (range) => !range.from || !range.to || Number(range.from) <= Number(range.to),
      '«От» не может быть больше «До»',
    ),
  fullName: requiredString('Укажите имя и фамилию'),
  email: emailSchema,
  phone: phoneSchema,
});

type Values = z.infer<typeof schema>;

export function InvestorQuestionnaire() {
  const pendingEmail = useSession((state) => state.pending?.email ?? '');
  const { register, control, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { fundName: '', amount: { from: '', to: '' }, email: pendingEmail, phone: '' },
  });
  const errors = formState.errors;
  const complete = useCompleteRegistration('investor');

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((v) => complete.run({ fullName: v.fullName, phone: v.phone }))}
      noValidate
    >
      <FormSection title="Основная информация">
        <Controller
          control={control}
          name="format"
          render={({ field }) => (
            <Select
              label="Формат инвестиционной деятельности"
              required
              placeholder="Выберите, в каком формате вы инвестируете"
              options={investmentFormats}
              value={field.value}
              onChange={field.onChange}
              error={errors.format?.message}
            />
          )}
        />
        <TextField label="Название компании / фонда" placeholder="Например, МедТех Инвест" {...register('fundName')} />
        <TextField
          label="Инвестиционный тезис"
          required
          placeholder="Например, AI в диагностике, MedTech, Digital Health"
          error={errors.thesis?.message}
          {...register('thesis')}
        />
        <Textarea
          label="Кратко об инвестиционном тезисе"
          required
          rows={5}
          placeholder="Какие проекты вы рассматриваете и что для вас важно"
          error={errors.thesisDetails?.message}
          {...register('thesisDetails')}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <RangeField
              label="Предпочитаемый объём инвестиций"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.amount?.message ?? errors.amount?.root?.message}
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
