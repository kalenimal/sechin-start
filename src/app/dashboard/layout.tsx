import type { Metadata } from 'next';
import { QueryProvider } from '@/shared/api';
import { Toaster } from '@/shared/ui/Toast';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import { SessionGate } from './SessionGate';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: { default: 'Личный кабинет', template: '%s | Личный кабинет' },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionGate>
      <QueryProvider>
        <div className={styles.shell}>
          <DashboardSidebar />
          <main className={styles.main}>{children}</main>
        </div>
        <Toaster />
      </QueryProvider>
    </SessionGate>
  );
}
