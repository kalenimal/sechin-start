import type { ProjectStage } from './dictionaries';

export type ProjectStatus = 'moderation' | 'changes-required' | 'validated' | 'ready';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  moderation: 'Ожидает решения',
  'changes-required': 'Нужно внести изменения',
  validated: 'Валидирован',
  ready: 'Готов к инвестициям',
};

export type ProjectDocument = { name: string; size: string };

export type ExpertCriterion = { label: string; score: number; max: number };

export type Project = {
  id: string;
  ownerId: string;
  name: string;
  shortDescription: string;
  description: string;
  logo?: string;
  cover?: string;
  directions: string[];
  createdAt: string;
  updatedAt: string;
  website?: string;
  status: ProjectStatus;
  statusDate?: string;
  stage: ProjectStage;
  /** Requested investment range in millions of rubles. */
  request: { from: number; to: number };
  usp: string;
  problem: string;
  solution: string;
  advantages: string[];
  audience: string;
  trl: number;
  ip: {
    protected: boolean;
    type: string;
    patentStatus: string;
    owner: string;
    patentNumber: string;
  };
  regulatory: {
    riskClass: string;
    ruRequired: boolean;
    ruStatus: string;
    ruNumber?: string;
    compliant152: boolean;
  };
  clinical: {
    ethicsStatus: string;
    required: boolean;
    phase: string;
    protocol: string;
  };
  documents: ProjectDocument[];
  contacts: { author: string; email: string; phone: string };
  company: { name: string; legalForm: string; inn: string; year: number };
  expertise?: {
    score: number;
    date: string;
    summary: string;
    criteria: ExpertCriterion[];
    committee: string[];
  };
  communicationRequests: number;
  /** Expert remarks keyed by project field (see projectFieldLabels) — shown to the owner when changes are required. */
  comments?: Record<string, string>;
};

export type ProjectFilters = {
  q?: string;
  status?: ProjectStatus | 'all';
  directions?: string[];
  stages?: ProjectStage[];
  amount?: { from?: number; to?: number };
  scoreRanges?: string[];
};
