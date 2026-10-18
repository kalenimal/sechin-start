export type ExpertiseStatus = 'new' | 'in-review' | 'rework' | 'recheck' | 'done';

export type ExpertiseRequest = {
  id: string;
  projectId: string;
  status: ExpertiseStatus;
  /** Expert who took the request; null for unassigned (new) requests. */
  expertId: string | null;
  updatedAt: string;
};

export const expertiseStatusLabels: Record<ExpertiseStatus, string> = {
  new: 'Новая',
  'in-review': 'На проверке',
  rework: 'На доработке',
  recheck: 'Повторная проверка',
  done: 'Завершено',
};
