import { Suspense } from 'react';
import { Client } from './client';

export const metadata = { title: 'Проект' };

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
