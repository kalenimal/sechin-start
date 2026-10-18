import type { ProjectFilters, ProjectStage } from '@/entities/project';
import type { Range } from '@/shared/ui/RangeField';

export type FeedFiltersState = {
  direction: string;
  stages: ProjectStage[];
  amount: Range;
  scores: string[];
};

export const emptyFeedFilters: FeedFiltersState = {
  direction: 'all',
  stages: [],
  amount: { from: '', to: '' },
  scores: [],
};

export function toProjectFilters(state: FeedFiltersState, q: string): ProjectFilters {
  return {
    q,
    directions: state.direction === 'all' ? undefined : [state.direction],
    stages: state.stages.length ? state.stages : undefined,
    amount: {
      from: state.amount.from ? Number(state.amount.from) : undefined,
      to: state.amount.to ? Number(state.amount.to) : undefined,
    },
    scoreRanges: state.scores.length ? state.scores : undefined,
  };
}

export const activeFiltersCount = (state: FeedFiltersState) =>
  Number(state.direction !== 'all') +
  Number(state.stages.length > 0) +
  Number(Boolean(state.amount.from || state.amount.to)) +
  Number(state.scores.length > 0);
