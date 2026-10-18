import type { Notification } from './types';

const items: Omit<Notification, 'id' | 'read'>[] = [
  {
    kind: 'maintenance',
    title: 'Технические работы на платформе',
    text: '16 сентября с 02:00 до 04:00 часть функций может быть временно недоступна',
    createdAt: '2026-09-15T13:33:00',
  },
  {
    kind: 'access-request',
    title: 'Новый запрос на доступ',
    text: 'Инвестор запросил доступ к документации проекта',
    createdAt: '2026-09-15T13:33:00',
  },
  {
    kind: 'views',
    title: 'Проект просмотрели',
    text: 'За сутки ваш проект посмотрели 12 инвесторов и представителей компаний',
    createdAt: '2026-09-15T13:33:00',
  },
  {
    kind: 'ready',
    title: 'Проект готов к инвестициям / пилоту',
    text: 'Мы получили анкету и передали её на первичную проверку',
    createdAt: '2026-09-15T13:33:00',
  },
  {
    kind: 'changes',
    title: 'Требуются изменения',
    text: 'Эксперт оставил комментарии. Внесите изменения и отправьте проект повторно',
    createdAt: '2026-09-15T13:33:00',
  },
  {
    kind: 'moderation',
    title: 'Проект отправлен на модерацию',
    text: 'Мы получили анкету и передали её на первичную проверку',
    createdAt: '2026-09-15T13:33:00',
  },
];

export const notificationsMock: Notification[] = [
  ...items.map((item, index) => ({ ...item, id: `n-${index}`, read: false })),
  ...items.map((item, index) => ({ ...item, id: `n-read-${index}`, read: true, createdAt: '2026-09-14T10:12:00' })),
];
