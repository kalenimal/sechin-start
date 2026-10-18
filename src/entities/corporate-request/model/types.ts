import type { ProjectStage } from '@/entities/project';

export type CorporateRequestStatus = 'searching' | 'ready' | 'closed';

export type CorporateRequest = {
  id: string;
  ownerId: string;
  title: string;
  directions: string[];
  stages: ProjectStage[];
  dealTypes: string[];
  amount: { from?: number; to?: number };
  status: CorporateRequestStatus;
  /** Project ids matched by the platform. */
  matchedProjectIds: string[];
  createdAt: string;
};

export const requestStatusLabels: Record<CorporateRequestStatus, string> = {
  searching: 'Идёт подбор',
  ready: 'Подборка готова',
  closed: 'Снят с публикации',
};
