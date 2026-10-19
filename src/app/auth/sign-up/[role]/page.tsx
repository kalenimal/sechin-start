import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { SignUpPage, SignUpPageFromQuery, type SignUpRole } from '@/views/sign-up';

const roles: SignUpRole[] = ['startup', 'investor', 'corporate'];
const titles: Record<SignUpRole, string> = {
  startup: 'Регистрация стартапа',
  investor: 'Регистрация инвестора',
  corporate: 'Регистрация корпорации',
};

type Props = { params: Promise<{ role: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return roles.map((role) => ({ role }));
}

export async function generateMetadata({ params }: Props) {
  const { role } = await params;
  return { title: titles[role as SignUpRole] ?? 'Регистрация' };
}

export default async function Page({ params }: Props) {
  const { role } = await params;
  if (!roles.includes(role as SignUpRole)) notFound();
  return (
    <Suspense fallback={<SignUpPage role={role as SignUpRole} requestedStep={1} />}>
      <SignUpPageFromQuery role={role as SignUpRole} />
    </Suspense>
  );
}
