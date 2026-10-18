import type { SelectOption } from '@/shared/ui';

export const projectStages = [
  { value: 'idea', label: 'Идея' },
  { value: 'prototype', label: 'Прототип' },
  { value: 'mvp', label: 'MVP' },
  { value: 'early-growth', label: 'Ранний рост' },
  { value: 'scaling', label: 'Масштабирование' },
  { value: 'maturity', label: 'Зрелость' },
] as const satisfies readonly SelectOption[];

export type ProjectStage = (typeof projectStages)[number]['value'];

export const stageLabel = (stage: ProjectStage) => projectStages.find((item) => item.value === stage)?.label ?? stage;

export const projectDirections: SelectOption[] = [
  { value: 'ai-diagnostics', label: 'AI-диагностика' },
  { value: 'cardiology', label: 'Кардиология' },
  { value: 'digital-health', label: 'Digital Health' },
  { value: 'medtech', label: 'MedTech' },
  { value: 'oncology', label: 'Онкология' },
  { value: 'neurology', label: 'Неврология' },
  { value: 'telemedicine', label: 'Телемедицина' },
  { value: 'pharma', label: 'Фармацевтика' },
];

export const directionLabel = (value: string) => projectDirections.find((item) => item.value === value)?.label ?? value;

export const patentStatuses: SelectOption[] = [
  { value: 'none', label: 'Нет патента' },
  { value: 'filed', label: 'Заявка подана, проводится экспертиза' },
  { value: 'granted', label: 'Патент получен' },
  { value: 'software', label: 'Свидетельство о регистрации ПО' },
];

export const riskClasses: SelectOption[] = [
  { value: '1', label: 'I' },
  { value: '2a', label: 'IIa' },
  { value: '2b', label: 'IIb' },
  { value: '3', label: 'III' },
];

export const medicalDeviceAnswers: SelectOption[] = [
  { value: 'yes', label: 'Да, является' },
  { value: 'no', label: 'Нет, не является' },
  { value: 'unsure', label: 'Не уверен(а)' },
];

export const countries: SelectOption[] = [
  { value: 'ru', label: 'Россия' },
  { value: 'by', label: 'Беларусь' },
  { value: 'kz', label: 'Казахстан' },
  { value: 'am', label: 'Армения' },
  { value: 'uz', label: 'Узбекистан' },
];

export const investmentFormats: SelectOption[] = [
  { value: 'business-angel', label: 'Бизнес-ангел' },
  { value: 'venture-fund', label: 'Венчурный фонд' },
  { value: 'corporate-fund', label: 'Корпоративный фонд' },
  { value: 'family-office', label: 'Семейный офис' },
];

export const industries: SelectOption[] = [
  { value: 'clinics', label: 'Медицинские клиники' },
  { value: 'pharma', label: 'Фармацевтика' },
  { value: 'insurance', label: 'Страхование' },
  { value: 'it', label: 'Информационные технологии' },
  { value: 'industry', label: 'Промышленность' },
];

export const dealTypes = [
  { value: 'investment', label: 'Инвестиции (доля)' },
  { value: 'pilot', label: 'Пилотный проект,' },
  { value: 'custom', label: 'Заказная разработка' },
] as const satisfies readonly SelectOption[];

export const expertScoreRanges: SelectOption[] = Array.from({ length: 10 }, (_, index) => ({
  value: `${index * 10 + 1}-${index * 10 + 10}`,
  label: `${index * 10 + 1}-${index * 10 + 10}`,
}));
