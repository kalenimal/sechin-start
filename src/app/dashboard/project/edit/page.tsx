import { Suspense } from 'react';
import { Client } from './client';

export const metadata = { title: 'Редактирование проекта' };

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
