'use client';

import { EventPage } from '@/views/dashboard/event';
import { useSearchParam } from '@/shared/lib/hooks/useSearchParam';

export function Client() {
  return <EventPage id={useSearchParam('id') ?? ''} />;
}
