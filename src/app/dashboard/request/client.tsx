'use client';

import { RequestResultsPage } from '@/views/dashboard/request-results';
import { useSearchParam } from '@/shared/lib/hooks/useSearchParam';

export function Client() {
  return <RequestResultsPage id={useSearchParam('id') ?? ''} />;
}
