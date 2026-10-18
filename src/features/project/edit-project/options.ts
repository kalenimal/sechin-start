import type { SelectOption } from '@/shared/ui/Select';

export const audienceOptions: SelectOption[] = [
  { value: 'B2C', label: 'B2C' },
  { value: 'B2B', label: 'B2B' },
  { value: 'B2B2C', label: 'B2B2C' },
  { value: 'B2G', label: 'B2G' },
];

export const ipOwnerOptions: SelectOption[] = [
  { value: 'company', label: 'Юридическое лицо' },
  { value: 'with-university', label: 'Юридическое лицо совместно с университетом' },
  { value: 'individual', label: 'Физическое лицо' },
];

export const privacyOptions = [
  { value: 'on-request', label: 'Показывать документы только после подтверждения запроса' },
  { value: 'public', label: 'Показывать документы без ограничений' },
];

export const yesNoOptions = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' },
];

export const ciPhaseOptions: SelectOption[] = [
  { value: 'I', label: 'I' },
  { value: 'II', label: 'II' },
  { value: 'III', label: 'III' },
  { value: 'IV', label: 'IV' },
];

export const editSections = [
  { id: 'about', label: 'О проекте' },
  { id: 'ip', label: 'Интеллектуальная собственность и регуляторный статус' },
  { id: 'regulatory', label: 'Регуляторика и клинические исследования' },
  { id: 'company', label: 'Компания' },
  { id: 'contacts', label: 'Контактная информация' },
] as const;
