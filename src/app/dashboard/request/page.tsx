import { Suspense } from 'react';
import { Client } from './client';

export const metadata = { title: 'Проекты по запросу' };

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
