import { Suspense } from 'react';
import { DemoLogin } from './DemoLogin';

export const metadata = { title: 'Демо-вход' };

/** Mock mode: /auth/demo?role=investor&next=/dashboard signs in as a demo account. */
export default function Page() {
  return (
    <Suspense>
      <DemoLogin />
    </Suspense>
  );
}
