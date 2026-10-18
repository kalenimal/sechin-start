import { notFound } from 'next/navigation';
import { SignUpPage, type SignUpRole } from '@/views/sign-up';

const roles: SignUpRole[] = ['startup', 'investor', 'corporate'];
const titles: Record<SignUpRole, string> = {
  startup: 'Регистрация стартапа',
  investor: 'Регистрация инвестора',
  corporate: 'Регистрация корпорации',
};

type Props = { params: Promise<{ role: string }>; searchParams: Promise<{ step?: string }> };

export async function generateMetadata({ params }: Props) {
  const { role } = await params;
  return { title: titles[role as SignUpRole] ?? 'Регистрация' };
}

export default async function Page({ params, searchParams }: Props) {
  const [{ role }, { step }] = await Promise.all([params, searchParams]);
  if (!roles.includes(role as SignUpRole)) notFound();
  const requestedStep = Math.min(Math.max(Number(step) || 1, 1), 3);
  return <SignUpPage role={role as SignUpRole} requestedStep={requestedStep} />;
}
