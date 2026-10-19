'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { RegisterForm } from '@/features/auth/register';
import { useSession, type Role } from '@/entities/session';
import { routes } from '@/shared/config';
import { useHydrated } from '@/shared/lib/hooks/useHydrated';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AuthShell, AuthText, Stepper } from '@/widgets/auth-shell';

// Steps 2–3 are loaded on demand: the questionnaires (file upload, many selects) are the heaviest part of auth.
const stepFallback = () => <Skeleton height={320} />;
const VerifyEmailForm = dynamic(() => import('@/features/auth/verify-email').then((m) => m.VerifyEmailForm), {
  loading: stepFallback,
});
const StartupQuestionnaire = dynamic(() => import('@/features/questionnaire').then((m) => m.StartupQuestionnaire), {
  loading: stepFallback,
});
const InvestorQuestionnaire = dynamic(() => import('@/features/questionnaire').then((m) => m.InvestorQuestionnaire), {
  loading: stepFallback,
});
const CorporateQuestionnaire = dynamic(() => import('@/features/questionnaire').then((m) => m.CorporateQuestionnaire), {
  loading: stepFallback,
});

export type SignUpRole = Exclude<Role, 'expert'>;

const STEPS = ['Регистрация аккаунта', 'Подтверждение', 'Заполнение анкеты'];

const copy: Record<SignUpRole, { register: string; questionnaire: string; Form: React.ComponentType }> = {
  startup: { register: 'Регистрация аккаунта стартапа', questionnaire: 'Анкета стартапа', Form: StartupQuestionnaire },
  investor: {
    register: 'Регистрация аккаунта инвестора',
    questionnaire: 'Анкета инвестора',
    Form: InvestorQuestionnaire,
  },
  corporate: {
    register: 'Регистрация аккаунта корпорации',
    questionnaire: 'Анкета корпорации',
    Form: CorporateQuestionnaire,
  },
};

export function SignUpPage({ role, requestedStep }: { role: SignUpRole; requestedStep: number }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const pending = useSession((state) => state.pending);
  const setPending = useSession((state) => state.setPending);

  // Guard against deep links to later steps without completing the previous ones.
  const allowedStep = !pending || pending.role !== role ? 1 : pending.verified ? 3 : 2;
  const step = Math.min(Math.max(requestedStep, 1), allowedStep);

  useEffect(() => {
    if (hydrated && step !== requestedStep)
      router.replace(step === 1 ? routes.signUp(role) : routes.signUpStep(role, step));
  }, [hydrated, step, requestedStep, role, router]);

  // Step 1 is fully server-rendered; later steps depend on sessionStorage, so they render after hydration.
  if (!hydrated && requestedStep > 1) {
    return (
      <AuthShell stepper={<Stepper steps={STEPS} current={requestedStep - 1} />}>
        <Skeleton height={320} />
      </AuthShell>
    );
  }

  const { register, questionnaire, Form } = copy[role];
  const back = step === 1 ? routes.auth : routes.signUpStep(role, step - 1);

  return (
    <AuthShell back={back} stepper={<Stepper steps={STEPS} current={step - 1} />}>
      {step === 1 && (
        <>
          <AuthText
            title={register}
            description="Укажите электронную почту и придумайте пароль — они будут использоваться для входа на платформу"
          />
          <RegisterForm role={role} />
        </>
      )}
      {step === 2 && pending && (
        <>
          <AuthText
            title="Подтвердите почту"
            description={
              <>
                Мы отправили код подтверждения на <strong>{pending.email}</strong>, введите его здесь, чтобы продолжить
              </>
            }
          />
          <VerifyEmailForm
            onVerified={() => {
              setPending({ ...pending, verified: true });
              router.push(routes.signUpStep(role, 3));
            }}
          />
        </>
      )}
      {step === 3 && (
        <>
          <AuthText
            title={questionnaire}
            description="Заполните все обязательные данные снизу, остальные вы сможете дозаполнить после проверки"
          />
          <Form />
        </>
      )}
    </AuthShell>
  );
}

/** Reads `?step=` on the client; render inside <Suspense> (the static HTML is step 1, used as the fallback). */
export function SignUpPageFromQuery({ role }: { role: SignUpRole }) {
  const step = Number(useSearchParams().get('step')) || 1;
  return <SignUpPage role={role} requestedStep={Math.min(Math.max(step, 1), 3)} />;
}
