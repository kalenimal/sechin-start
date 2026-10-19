'use client';

import { ProjectPage } from '@/views/dashboard/project';
import { useSearchParam } from '@/shared/lib/hooks/useSearchParam';

export function Client() {
  return <ProjectPage id={useSearchParam('id') ?? ''} />;
}
