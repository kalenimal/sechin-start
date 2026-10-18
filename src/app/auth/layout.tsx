import type { Metadata } from 'next';
import { SessionProvider } from '@/entities/session';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider user={null}>{children}</SessionProvider>;
}
