import type { CorporateRequest } from './types';

const base = {
  ownerId: 'u-corporate',
  title: 'Система удаленного мониторинга здоровья сотрудников',
  directions: ['ai-diagnostics'],
  stages: ['mvp', 'scaling'],
  dealTypes: ['custom'],
  amount: {},
  createdAt: '2026-09-10',
} satisfies Partial<CorporateRequest>;

export const corporateRequestsMock: CorporateRequest[] = [
  { ...base, id: 'req-1', status: 'searching', matchedProjectIds: [] },
  {
    ...base,
    id: 'req-2',
    status: 'ready',
    matchedProjectIds: ['neurovision-ai', 'cardiosense', 'pulmotrack', 'oncopath'],
  },
  { ...base, id: 'req-3', status: 'closed', matchedProjectIds: ['cardiosense'] },
];
