'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  countries,
  createProject,
  medicalDeviceAnswers,
  patentStatuses,
  projectDirections,
  projectStages,
  riskClasses,
  type ProjectStage,
} from '@/entities/project';
import { useSession } from '@/entities/session';
import { emailSchema, phoneSchema, requiredString } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/Button';
import { FileUpload, type UploadedFile } from '@/shared/ui/FileUpload';
import { FormError } from '@/shared/ui/FormError';
import { RadioGroup } from '@/shared/ui/RadioGroup';
import { Select } from '@/shared/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { Textarea } from '@/shared/ui/Textarea';
import { useCompleteRegistration } from '../model/useCompleteRegistration';
import { ContactFields } from './ContactFields';
import { FormSection } from './FormSection';
import styles from './Questionnaire.module.css';

const stageValues = projectStages.map((item) => item.value) as [ProjectStage, ...ProjectStage[]];

const fileList = z.array(z.object({ id: z.string(), name: z.string(), size: z.number() }));

const schema = z
  .object({
    name: requiredString('Укажите название цифрового сервиса'),
    description: requiredString('Добавьте описание'),
    stage: z.enum(stageValues, { error: 'Выберите стадию' }),
    direction: z.string({ error: 'Выберите направление' }).min(1, 'Выберите направление'),
    website: z.union([z.literal(''), z.string().url('Укажите ссылку целиком, например https://site.ru')]),
    patentStatus: z.string({ error: 'Выберите статус' }).min(1, 'Выберите статус'),
    patentNumber: z.string(),
    patentFiles: fileList,
    medicalDevice: z.string({ error: 'Выберите вариант' }).min(1, 'Выберите вариант'),
    riskClass: z.string().optional(),
    country: z.string({ error: 'Выберите страну' }).min(1, 'Выберите страну'),
    inn: z.string().regex(/^\d{10}(\d{2})?$/, 'ИНН — 10 или 12 цифр'),
    legalName: requiredString('Укажите юридическое лицо'),
    fullName: requiredString('Укажите имя и фамилию'),
    email: emailSchema,
    phone: phoneSchema,
  })
  .superRefine((values, ctx) => {
    if (values.patentStatus !== 'none' && !values.patentNumber.trim()) {
      ctx.addIssue({ code: 'custom', path: ['patentNumber'], message: 'Укажите номер патента или заявки' });
    }
    if (values.patentStatus !== 'none' && values.patentFiles.length === 0) {
      ctx.addIssue({ code: 'custom', path: ['patentFiles'], message: 'Загрузите хотя бы один документ' });
    }
    if (values.medicalDevice === 'yes' && !values.riskClass) {
      ctx.addIssue({ code: 'custom', path: ['riskClass'], message: 'Выберите класс риска' });
    }
  });

type Values = z.infer<typeof schema>;

export function StartupQuestionnaire() {
  const pendingEmail = useSession((state) => state.pending?.email ?? '');
  const { register, control, handleSubmit, watch, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { website: '', patentNumber: '', patentFiles: [], email: pendingEmail, phone: '' },
  });
  const errors = formState.errors;

  const complete = useCompleteRegistration('startup', async (user) => {
    const values = watch();
    await createProject(user.id, {
      name: values.name,
      shortDescription: values.description,
      description: values.description,
      directions: [values.direction],
      stage: values.stage,
      website: values.website || undefined,
      contacts: { author: values.fullName, email: values.email, phone: values.phone },
      company: {
        name: values.legalName,
        legalForm: 'Юридическое лицо',
        inn: values.inn,
        year: new Date().getFullYear(),
      },
      documents: values.patentFiles.map((file: UploadedFile) => ({
        name: file.name,
        size: `${(file.size / 1048576).toFixed(1)}MB`,
      })),
      ip: {
        protected: values.patentStatus !== 'none',
        type: 'Программное обеспечение',
        patentStatus: patentStatuses.find((item) => item.value === values.patentStatus)?.label ?? '',
        owner: values.legalName,
        patentNumber: values.patentNumber,
      },
    });
  });

  const patentStatus = watch('patentStatus');
  const medicalDevice = watch('medicalDevice');

  const onSubmit = handleSubmit((values) => complete.run({ fullName: values.fullName, phone: values.phone }));

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <FormSection title="Основная информация">
        <TextField
          label="Название"
          required
          placeholder="Введите название цифрового сервиса"
          error={errors.name?.message}
          {...register('name')}
        />
        <Textarea
          label="Описание"
          required
          rows={6}
          placeholder="Введите описание цифрового сервиса"
          error={errors.description?.message}
          {...register('description')}
        />
        <Controller
          control={control}
          name="stage"
          render={({ field }) => (
            <RadioGroup
              label="Стадия развития проекта"
              required
              options={projectStages}
              value={field.value}
              onChange={(value) => field.onChange(value as ProjectStage)}
              error={errors.stage?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="direction"
          render={({ field }) => (
            <Select
              label="Направление проекта"
              required
              placeholder="Выберите направление проекта здесь"
              options={projectDirections}
              value={field.value}
              onChange={field.onChange}
              error={errors.direction?.message}
            />
          )}
        />
        <TextField
          label="Сайт"
          type="url"
          placeholder="Ссылка на сайт вашего цифрового сервиса, если он имеется"
          error={errors.website?.message}
          {...register('website')}
        />
      </FormSection>

      <FormSection
        title={
          <>
            Интеллектуальная собственность
            <br />и регуляторный статус
          </>
        }
      >
        <Controller
          control={control}
          name="patentStatus"
          render={({ field }) => (
            <Select
              label="Статус патентования"
              required
              placeholder="Выберите текущий статус патента"
              options={patentStatuses}
              value={field.value}
              onChange={field.onChange}
              error={errors.patentStatus?.message}
            />
          )}
        />
        {patentStatus !== 'none' && (
          <>
            <TextField
              label="Номер патента / заявки"
              required
              placeholder="Например, RU 1234567 C1"
              error={errors.patentNumber?.message}
              {...register('patentNumber')}
            />
            <Controller
              control={control}
              name="patentFiles"
              render={({ field }) => (
                <FileUpload
                  label="Документы по патенту"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.patentFiles?.message}
                />
              )}
            />
          </>
        )}
        <Controller
          control={control}
          name="medicalDevice"
          render={({ field }) => (
            <RadioGroup
              label="Является ли продукт медицинским изделием?"
              required
              layout="row"
              options={medicalDeviceAnswers}
              value={field.value}
              onChange={field.onChange}
              error={errors.medicalDevice?.message}
            />
          )}
        />
        {medicalDevice !== 'no' && (
          <Controller
            control={control}
            name="riskClass"
            render={({ field }) => (
              <Select
                label="Класс риска медизделия"
                required={medicalDevice === 'yes'}
                placeholder="Выберите текущий класс медизделия"
                options={riskClasses}
                value={field.value}
                onChange={field.onChange}
                error={errors.riskClass?.message}
              />
            )}
          />
        )}
      </FormSection>

      <FormSection title="Компания">
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <Select
              label="Страна регистрации юридического лица или ИП"
              required
              placeholder="Выберите страну"
              options={countries}
              value={field.value}
              onChange={field.onChange}
              error={errors.country?.message}
            />
          )}
        />
        <TextField
          label="ИНН"
          required
          inputMode="numeric"
          placeholder="Укажите номер"
          error={errors.inn?.message}
          {...register('inn')}
        />
        <TextField
          label="Юридическое лицо или ИП"
          required
          placeholder="Например, ПАО Медактив"
          error={errors.legalName?.message}
          {...register('legalName')}
        />
      </FormSection>

      <ContactFields register={register} control={control} errors={errors} />

      <FormError message={complete.error} />
      <Button type="submit" fullWidth loading={complete.pending}>
        Отправить анкету на проверку
      </Button>
    </form>
  );
}
