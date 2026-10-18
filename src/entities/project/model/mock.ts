import type { Project } from './types';

const documents = [
  { name: 'Заявка на регистрацию ПО.pdf', size: '14.1MB' },
  { name: 'Финансовая_модель_CardioSense.pdf', size: '14.1MB' },
  { name: 'Презентация проекта.pdf', size: '14.1MB' },
  { name: 'Презентация проекта.pdf', size: '14.1MB' },
  { name: 'Описание технологии.pdf', size: '14.1MB' },
];

export const cardiosenseProject: Project = {
  id: 'cardiosense',
  ownerId: 'u-startup',
  name: 'CardioSense',
  shortDescription:
    'Платформа для удалённого мониторинга пациентов с сердечно-сосудистыми заболеваниями. Система собирает данные с носимых устройств, анализирует динамику показателей и помогает врачу раньше выявлять потенциально опасные изменения состояния пациента.',
  description:
    'Платформа для удалённого мониторинга пациентов с сердечно-сосудистыми заболеваниями. Система собирает данные с носимых устройств, анализирует динамику показателей и помогает врачу раньше выявлять потенциально опасные изменения состояния пациента.',
  logo: '/images/projects/cardiosense-logo.webp',
  cover: '/images/projects/cardiosense-banner.webp',
  directions: ['cardiology', 'digital-health'],
  createdAt: '2026-09-01',
  updatedAt: '2026-09-09',
  website: 'https://cardiosense.com',
  status: 'ready',
  statusDate: '2026-09-05',
  stage: 'early-growth',
  request: { from: 8, to: 12 },
  usp: 'Единая система непрерывного мониторинга сердечно-сосудистых показателей с автоматическим выявлением клинически значимых изменений.',
  problem:
    'Пациенты с сердечно-сосудистыми заболеваниями нуждаются в регулярном контроле состояния, однако значительная часть показателей отслеживается только во время визитов в клинику. Между приёмами врач не видит динамику пульса, сердечного ритма и других параметров, из-за чего потенциально опасные изменения могут быть выявлены слишком поздно. При этом ручной анализ данных с носимых устройств занимает много времени и плохо масштабируется при большом количестве пациентов.',
  solution:
    'CardioSense — цифровая платформа для удалённого мониторинга пациентов с сердечно-сосудистыми заболеваниями. Система собирает данные с совместимых носимых устройств, объединяет их в едином профиле пациента и анализирует динамику показателей. Алгоритмы выявляют значимые отклонения и формируют уведомления для врача, помогая быстрее обращать внимание на пациентов с повышенным риском. Врач получает структурированную картину состояния пациента, историю изменений и инструменты для дистанционного наблюдения между очными приёмами.',
  advantages: [
    'Постоянный контроль состояния пациента',
    'Выявление отклонений и рисков',
    'Снижение нагрузки на врача',
    'Единая история показателей',
    'Интеграция с медицинскими системами',
  ],
  audience: 'B2C',
  trl: 2,
  ip: {
    protected: true,
    type: 'Программное обеспечение / заявка на патент',
    patentStatus: 'Заявка подана, проводится экспертиза',
    owner: 'ООО «КардиоСенс» совместно с университетом',
    patentNumber: 'RU2026123456',
  },
  regulatory: {
    riskClass: 'IIa',
    ruRequired: true,
    ruStatus: 'Подготовка регистрационного досье',
    compliant152: true,
  },
  clinical: {
    ethicsStatus: 'Одобрено проведение исследования',
    required: true,
    phase: 'I',
    protocol: 'CS-24/07 от 18.07.2026',
  },
  documents,
  contacts: { author: 'Булгаков Алексей Алексеевич', email: 'contacts@cardiosense.com', phone: '+7 900 900 00 00' },
  company: { name: 'ООО «КардиоСенс»', legalForm: 'Юридическое лицо', inn: '7812456731', year: 2023 },
  expertise: {
    score: 86,
    date: '2026-09-05',
    summary:
      'Проект демонстрирует высокий потенциал для применения в дистанционном мониторинге пациентов с сердечно-сосудистыми заболеваниями. Решение рекомендовано к пилотированию и дальнейшему инвестиционному рассмотрению.',
    criteria: [
      { label: 'Клиническая обоснованность', score: 9, max: 10 },
      { label: 'Новизна', score: 8, max: 10 },
      { label: 'Ясность прав на ИС', score: 5, max: 10 },
      { label: 'Адекватность оценки', score: 2, max: 10 },
    ],
    committee: ['Булгаков Алексей Воронцов', 'Булгаков Алексей Воронцов', 'Булгаков Алексей Воронцов'],
  },
  communicationRequests: 0,
};

const neurovision: Project = {
  ...cardiosenseProject,
  id: 'neurovision-ai',
  ownerId: 'u-other',
  name: 'NeuroVision AI',
  shortDescription:
    'Интеллектуальная система для автоматического анализа КТ и МРТ-исследований, которая помогает выявлять патологические изменения на ранних стадиях, снижать нагрузку на врачей и ускорять подготовку диагностических заключений. Решение может использоваться как вспомогательный инструмент для радиологов в клиниках и диагностических центрах.',
  logo: undefined,
  cover: undefined,
  website: 'https://neurovision.ai',
  directions: ['ai-diagnostics', 'medtech'],
  stage: 'prototype',
  statusDate: '2026-09-12',
  updatedAt: '2026-09-18',
  request: { from: 15, to: 25 },
  company: { name: 'ООО «Нейровижн»', legalForm: 'Юридическое лицо', inn: '7701234567', year: 2024 },
  expertise: { ...cardiosenseProject.expertise!, score: 78, date: '2026-09-12' },
};

const neuroscan = (id: string, status: Project['status'], extra: Partial<Project> = {}): Project => ({
  ...cardiosenseProject,
  id,
  ownerId: 'u-startup',
  name: 'NeuroScan AI',
  shortDescription: 'AI-система для раннего выявления патологий по медицинским изображениям',
  description:
    'AI-система для раннего выявления патологий по медицинским изображениям. Алгоритмы анализируют рентгенограммы и КТ, подсвечивают подозрительные области и помогают врачу быстрее подготовить заключение.',
  logo: undefined,
  cover: undefined,
  directions: ['ai-diagnostics'],
  status,
  updatedAt: '2026-09-09',
  website: 'https://neuroscan.ai',
  company: { name: 'ООО «НейроСкан»', legalForm: 'Юридическое лицо', inn: '7701112233', year: 2025 },
  expertise: status === 'ready' ? cardiosenseProject.expertise : undefined,
  ...extra,
});

export const projectsMock: Project[] = [
  neuroscan('neuroscan-1', 'moderation'),
  neuroscan('neuroscan-2', 'changes-required', {
    comments: {
      problem:
        'Описание проблемы сформулировано слишком общо. Рекомендуется добавить конкретные данные о масштабе проблемы, указать, на какую целевую группу она влияет, и привести ссылки на исследования или статистику.',
    },
  }),
  neuroscan('neuroscan-3', 'ready'),
  { ...cardiosenseProject, ownerId: 'u-startup-2' },
  neurovision,
  {
    ...neurovision,
    id: 'pulmotrack',
    name: 'PulmoTrack',
    shortDescription:
      'Сервис домашнего контроля функции лёгких для пациентов с ХОБЛ и астмой. Портативный спирометр передаёт данные в приложение, а врач видит динамику и получает предупреждения об ухудшении.',
    directions: ['digital-health', 'medtech'],
    stage: 'mvp',
    request: { from: 5, to: 10 },
    company: { name: 'ООО «ПульмоТрек»', legalForm: 'Юридическое лицо', inn: '7703456789', year: 2025 },
    expertise: { ...cardiosenseProject.expertise!, score: 64, date: '2026-08-30' },
  },
  {
    ...neurovision,
    id: 'oncopath',
    name: 'OncoPath AI',
    shortDescription:
      'Цифровая патоморфология: система анализирует сканы гистологических препаратов, помогает патологоанатому находить опухолевые клетки и стандартизирует описание.',
    directions: ['oncology', 'ai-diagnostics'],
    stage: 'scaling',
    request: { from: 40, to: 60 },
    company: { name: 'ООО «ОнкоПат»', legalForm: 'Юридическое лицо', inn: '7704567890', year: 2022 },
    expertise: { ...cardiosenseProject.expertise!, score: 91, date: '2026-08-21' },
  },
];
