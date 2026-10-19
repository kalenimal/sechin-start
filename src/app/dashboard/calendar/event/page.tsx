import { Suspense } from 'react';
import { Client } from './client';

export const metadata = { title: 'Событие' };

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
