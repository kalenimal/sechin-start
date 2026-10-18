import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SessionProvider } from '@/entities/session';
import { getServerSession } from '@/entities/session/server';
import { QueryProvider } from '@/shared/api';
import { routes } from '@/shared/config';
import { Toaster } from '@/shared/ui/Toast';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: { default: 'Личный кабинет', template: '%s | Личный кабинет' },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerSession();
  if (!user) redirect(routes.login);

  return (
    <SessionProvider user={user}>
      <QueryProvider>
        <div className={styles.shell}>
          <DashboardSidebar />
          <main className={styles.main}>{children}</main>
        </div>
        <Toaster />
      </QueryProvider>
    </SessionProvider>
  );
}
