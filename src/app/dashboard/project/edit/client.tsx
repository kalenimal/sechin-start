'use client';

import { ProjectEditPage } from '@/views/dashboard/project-edit';
import { useSearchParam } from '@/shared/lib/hooks/useSearchParam';

export function Client() {
  return <ProjectEditPage id={useSearchParam('id') ?? ''} />;
}
