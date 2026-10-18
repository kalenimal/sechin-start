'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { CircleHelp, FileText, Heart, Lightbulb, UserRound } from 'lucide-react';
import {
  countries,
  createProject,
  medicalDeviceAnswers,
  patentStatuses,
  projectDirections,
  projectKeys,
  projectStages,
  riskClasses,
  updateProject,
  type Project,
  type ProjectStage,
} from '@/entities/project';
import { useSession } from '@/entities/session';
import { routes } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { FileUpload } from '@/shared/ui/FileUpload';
import { FormError } from '@/shared/ui/FormError';
import { ImageUpload } from '@/shared/ui/ImageUpload';
import { MultiSelect } from '@/shared/ui/MultiSelect';
import { PhoneField } from '@/shared/ui/PhoneField';
import { RadioGroup } from '@/shared/ui/RadioGroup';
import { RangeField } from '@/shared/ui/RangeField';
import { Select } from '@/shared/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { TextLink } from '@/shared/ui/TextLink';
import { Textarea } from '@/shared/ui/Textarea';
import { toast } from '@/shared/ui/Toast';
import { audienceOptions, ciPhaseOptions, editSections, ipOwnerOptions, privacyOptions, yesNoOptions } from './options';
import { projectFormSchema, toFormValues, type ProjectFormValues } from './schema';
import styles from './ProjectEditForm.module.css';

const sectionIcons = [
  <Lightbulb key="a" />,
  <FileText key="b" />,
  <Heart key="c" />,
  <CircleHelp key="d" />,
  <UserRound key="e" />,
];

function toProjectPatch(values: ProjectFormValues): Partial<Project> {
  const toMillions = (value: string) => (value ? Math.round(Number(value) / 100_000) / 10 : 0);
  return {
    cover: values.cover,
    logo: values.logo,
    name: values.name,
    description: values.description,
    shortDescription: values.description,
    stage: values.stage as ProjectStage,
    directions: values.directions,
    website: values.website || undefined,
    request: { from: toMillions(values.amount.from), to: toMillions(values.amount.to) },
    usp: values.usp,
    problem: values.problem,
    solution: values.solution,
    advantages: values.advantages
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    audience: values.audience,
    ip: {
      protected: values.patentStatus !== 'none',
      type: values.ipType,
      patentStatus: patentStatuses.find((item) => item.value === values.patentStatus)?.label ?? '',
      owner: ipOwnerOptions.find((item) => item.value === values.ipOwner)?.label ?? '',
      patentNumber: values.patentNumber,
    },
    regulatory: {
      riskClass: riskClasses.find((item) => item.value === values.riskClass)?.label ?? '—',
      ruRequired: values.ruRequired === 'yes',
      ruStatus: values.ruStatus,
      ruNumber: values.ruNumber || undefined,
      compliant152: true,
    },
    clinical: {
      ethicsStatus: values.ethicsStatus,
      required: true,
      phase: values.ciPhase ?? '—',
      protocol: values.ciProtocol,
    },
    documents: values.documents.map((doc) => ({ name: doc.name, size: `${(doc.size / 1048576).toFixed(1)}MB` })),
    company: { name: values.legalName, legalForm: 'Юридическое лицо', inn: values.inn, year: new Date().getFullYear() },
    contacts: { author: values.author, email: values.email, phone: values.phone },
    comments: undefined,
  };
}

/** Full project editor (create & edit) with sticky section navigation and moderation actions. */
export function ProjectEditForm({ project }: { project?: Project }) {
  const router = useRouter();
  const client = useQueryClient();
  const user = useSession((state) => state.user)!;
  const [active, setActive] = useState<string>(editSections[0].id);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState<'moderation' | 'draft' | null>(null);
  const { register, control, handleSubmit, watch, formState } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: toFormValues(project),
  });
  const errors = formState.errors;
  const medicalDevice = watch('medicalDevice');

  // Scroll-spy for the right-hand section navigation.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    editSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const save = (mode: 'moderation' | 'draft') =>
    handleSubmit(async (values) => {
      setSaving(mode);
      setSubmitError(null);
      try {
        const patch = toProjectPatch(values);
        const saved = project
          ? await updateProject(project.id, patch, mode === 'moderation')
          : await createProject(user.id, { ...patch, name: values.name });
        await client.invalidateQueries({ queryKey: projectKeys.all });
        toast.success(mode === 'moderation' ? 'Проект отправлен на модерацию' : 'Черновик сохранён');
        router.push(routes.project(saved.id));
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Не удалось сохранить проект');
      } finally {
        setSaving(null);
      }
    });

  return (
    <form className={styles.layout} onSubmit={save('moderation')} noValidate>
      <div className={styles.form}>
        <Controller
          control={control}
          name="cover"
          render={({ field }) => <ImageUpload label="Обложка проекта" value={field.value} onChange={field.onChange} />}
        />
        <Controller
          control={control}
          name="logo"
          render={({ field }) => (
            <ImageUpload label="Логотип проекта" variant="logo" value={field.value} onChange={field.onChange} />
          )}
        />

        <section id="about" className={styles.section}>
          <h2 className={styles.sectionTitle}>О проекте</h2>
          <TextField label="Название" required error={errors.name?.message} {...register('name')} />
          <Textarea
            label="Описание"
            required
            rows={5}
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
                onChange={field.onChange}
                error={errors.stage?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="directions"
            render={({ field }) => (
              <MultiSelect
                label="Направление проекта"
                required
                options={projectDirections}
                value={field.value}
                onChange={field.onChange}
                error={errors.directions?.message}
              />
            )}
          />
          <TextField
            label="Сайт"
            type="url"
            placeholder="https://"
            error={errors.website?.message}
            {...register('website')}
          />
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <RangeField label="Предпочитаемый объём инвестиций" value={field.value} onChange={field.onChange} />
            )}
          />
          <Textarea label="Уникальное торговое предложение" rows={4} {...register('usp')} />
          <Textarea label="Описание проблемы" rows={4} {...register('problem')} />
          <Textarea label="Описание решения" rows={4} {...register('solution')} />
          <div>
            <Textarea
              label="Ключевые преимущества"
              rows={3}
              error={errors.advantages?.message}
              {...register('advantages')}
            />
            <p className={styles.hint}>Введите до 5 преимуществ через запятую, каждое до 40 символов</p>
          </div>
          <Controller
            control={control}
            name="audience"
            render={({ field }) => (
              <Select
                label="Целевая аудитория"
                required
                options={audienceOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.audience?.message}
              />
            )}
          />
        </section>

        <section id="ip" className={styles.section}>
          <h2 className={styles.sectionTitle}>Интеллектуальная собственность и регуляторный статус</h2>
          <TextField label="Тип ИС" {...register('ipType')} />
          <Controller
            control={control}
            name="patentStatus"
            render={({ field }) => (
              <Select
                label="Статус патентования"
                required
                options={patentStatuses}
                value={field.value}
                onChange={field.onChange}
                error={errors.patentStatus?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="ipOwner"
            render={({ field }) => (
              <Select
                label="Правообладатель"
                required
                options={ipOwnerOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.ipOwner?.message}
              />
            )}
          />
          <TextField
            label="Номер патента / заявки"
            placeholder="Например, RU 1234567 C1"
            {...register('patentNumber')}
          />
          <Controller
            control={control}
            name="documents"
            render={({ field }) => (
              <FileUpload label="Документы по патенту" value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name="documentsPrivacy"
            render={({ field }) => (
              <RadioGroup
                label="Конфиденциальность документов"
                options={privacyOptions}
                layout="row"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </section>

        <section id="regulatory" className={styles.section}>
          <h2 className={styles.sectionTitle}>Регуляторика и клинические исследования</h2>
          <Controller
            control={control}
            name="medicalDevice"
            render={({ field }) => (
              <RadioGroup
                label="Является ли продукт медицинским изделием?"
                layout="row"
                options={medicalDeviceAnswers}
                value={field.value}
                onChange={field.onChange}
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
                  options={riskClasses}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}
          <Controller
            control={control}
            name="ruRequired"
            render={({ field }) => (
              <RadioGroup
                label="Необходимость РУ"
                layout="row"
                options={yesNoOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <TextField label="Статус РУ" {...register('ruStatus')} />
          <TextField
            label="Номер РУ"
            hint="Введите номер, если он еще не присвоен — то оставьте поле пустым"
            {...register('ruNumber')}
          />
          <TextField label="Статус этического комитета" {...register('ethicsStatus')} />
          <Controller
            control={control}
            name="ciPhase"
            render={({ field }) => (
              <Select label="Фаза КИ" options={ciPhaseOptions} value={field.value} onChange={field.onChange} />
            )}
          />
          <TextField label="Номер и дата протокола КИ" {...register('ciProtocol')} />
        </section>

        <section id="company" className={styles.section}>
          <h2 className={styles.sectionTitle}>Компания</h2>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                label="Страна регистрации юридического лица или ИП"
                required
                options={countries}
                value={field.value}
                onChange={field.onChange}
                error={errors.country?.message}
              />
            )}
          />
          <TextField label="ИНН" required inputMode="numeric" error={errors.inn?.message} {...register('inn')} />
          <TextField
            label="Юридическое лицо или ИП"
            required
            error={errors.legalName?.message}
            {...register('legalName')}
          />
        </section>

        <section id="contacts" className={styles.section}>
          <h2 className={styles.sectionTitle}>Контактная информация</h2>
          <TextField label="Имя, фамилия, отчество" required error={errors.author?.message} {...register('author')} />
          <TextField
            label="Электронная почта"
            required
            type="email"
            error={errors.email?.message}
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
        </section>
      </div>

      <aside className={styles.sidebar}>
        <nav className={styles.nav} aria-label="Разделы анкеты">
          {editSections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(styles.navItem, active === section.id && styles.navActive)}
            >
              {sectionIcons[index]}
              {section.label}
            </a>
          ))}
        </nav>
        <FormError message={submitError ?? (Object.keys(errors).length ? 'Проверьте обязательные поля' : null)} />
        <Button type="submit" size="m" fullWidth loading={saving === 'moderation'}>
          Отправить на модерацию
        </Button>
        <Button type="button" size="m" color="grey" fullWidth loading={saving === 'draft'} onClick={save('draft')}>
          Сохранить как черновик
        </Button>
        <TextLink size="m" align="center" tone="primary" className={styles.cancel} onClick={() => router.back()}>
          Закрыть без изменений
        </TextLink>
      </aside>
    </form>
  );
}
