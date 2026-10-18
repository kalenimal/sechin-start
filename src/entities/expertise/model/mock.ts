import type { ExpertiseRequest } from './types';

export const expertiseMock: ExpertiseRequest[] = [
  { id: 'exp-1', projectId: 'neurovision-ai', status: 'new', expertId: null, updatedAt: '2026-09-18' },
  { id: 'exp-2', projectId: 'pulmotrack', status: 'new', expertId: null, updatedAt: '2026-09-17' },
  { id: 'exp-3', projectId: 'neuroscan-2', status: 'rework', expertId: 'u-expert', updatedAt: '2026-09-18' },
  { id: 'exp-4', projectId: 'cardiosense', status: 'recheck', expertId: 'u-expert', updatedAt: '2026-09-16' },
  { id: 'exp-5', projectId: 'oncopath', status: 'in-review', expertId: 'u-expert-2', updatedAt: '2026-09-15' },
  { id: 'exp-6', projectId: 'neuroscan-1', status: 'in-review', expertId: 'u-expert', updatedAt: '2026-09-14' },
  { id: 'exp-7', projectId: 'neuroscan-3', status: 'done', expertId: 'u-expert-2', updatedAt: '2026-09-05' },
];
