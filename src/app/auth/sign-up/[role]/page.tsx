import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { SignUpPage, type SignUpRole } from '@/views/auth';

const roles: SignUpRole[] = ['startup', 'investor', 'corporate'];
const titles: Record<SignUpRole, string> = {
  startup: 'Регистрация стартапа',
  investor: 'Регистрация инвестора',
  corporate: 'Регистрация корпорации',
};

type Props = { params: Promise<{ role: string }> };

export const generateStaticParams = () => roles.map((role) => ({ role }));

export async function generateMetadata({ params }: Props) {
  const { role } = await params;
  return { title: titles[role as SignUpRole] ?? 'Регистрация' };
}

export default async function Page({ params }: Props) {
  const { role } = await params;
  if (!roles.includes(role as SignUpRole)) notFound();
  return (
    <Suspense>
      <SignUpPage role={role as SignUpRole} />
    </Suspense>
  );
}
