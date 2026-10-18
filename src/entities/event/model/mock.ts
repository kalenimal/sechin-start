import type { PlatformEvent } from './types';

const speakerPhoto = '/images/events/speaker.webp';

const base: Omit<PlatformEvent, 'id' | 'type' | 'startsAt'> = {
  title: 'Демо-день медицинских стартапов 2026',
  shortDescription:
    'Презентация перспективных MedTech-проектов перед экспертами, инвесторами и представителями корпораций',
  description:
    'Презентация отобранных медицинских стартапов перед инвесторами, экспертами и представителями корпораций. Команды представят свои решения, расскажут о текущей стадии проекта, результатах исследований и планах по развитию.',
  location: 'Сеченовский Университет, Москва',
  image: '/images/events/demo-day.webp',
  banner: '/images/events/demo-day-banner.webp',
  agenda: [
    {
      start: '10:00',
      end: '10:30',
      title: 'Регистрация участников',
      text: 'Сбор гостей, получение бейджей и знакомство с программой демо-дня',
    },
    {
      start: '10:30',
      end: '11:30',
      title: 'Открытие демо-дня',
      text: 'Приветственное слово организаторов и краткое представление формата мероприятия',
    },
    {
      start: '11:30',
      end: '14:30',
      title: 'Питчи MedTech-проектов',
      text: 'Команды представят свои решения, текущие результаты и планы по развитию',
      speaker: { name: 'Алиса Щерба', role: 'CEO МедИнвест', photo: speakerPhoto },
    },
    {
      start: '14:30',
      end: '15:30',
      title: 'Экспертная сессия',
      text: 'Эксперты зададут вопросы командам и дадут обратную связь по представленным проектам',
    },
    {
      start: '15:30',
      end: '16:30',
      title: 'Встречи с инвесторами и корпорациями',
      text: 'Персональное общение стартапов с потенциальными партнёрами, инвесторами и заказчиками',
    },
  ],
  participants: [
    { name: 'Анна Смирнова', role: 'Директор по инновациям ГК «МедТех Альянс»', photo: speakerPhoto },
    { name: 'Дарья Белова', role: 'CEO NeuroVision AI', photo: speakerPhoto },
    { name: 'Алексей Морозов', role: 'Investment Manager HealthBridge Ventures', photo: speakerPhoto },
    { name: 'Андрей Ковалёв', role: 'Руководитель R&D BIOTECH SYSTEMS', photo: speakerPhoto },
  ],
  participantsMore: 100,
};

export const eventsMock: PlatformEvent[] = [
  { ...base, id: 'demo-day-2026', type: 'demo-day', startsAt: '2026-10-12T16:00:00' },
  {
    ...base,
    id: 'closed-pitch-cardio',
    type: 'closed-pitch',
    startsAt: '2026-10-19T12:00:00',
    title: 'Закрытый питч: кардиология и Digital Health',
  },
  {
    ...base,
    id: 'closed-pitch-ai',
    type: 'closed-pitch',
    startsAt: '2026-10-26T15:00:00',
    title: 'Закрытый питч: AI в медицинской диагностике',
  },
  {
    ...base,
    id: 'webinar-regulatory',
    type: 'webinar',
    startsAt: '2026-11-02T11:00:00',
    title: 'Вебинар: регистрация медизделий с ИИ',
    location: 'Онлайн',
  },
  {
    ...base,
    id: 'demo-day-winter',
    type: 'demo-day',
    startsAt: '2026-12-07T16:00:00',
    title: 'Зимний демо-день Сеченовского Университета',
  },
];
