'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RegisterForm } from '@/features/auth/register';
import { VerifyEmailForm } from '@/features/auth/verify-email';
import { CorporateQuestionnaire, InvestorQuestionnaire, StartupQuestionnaire } from '@/features/questionnaire';
import { useSession, type Role } from '@/entities/session';
import { routes } from '@/shared/config';
import { AuthShell, AuthText, Stepper } from '@/widgets/auth-shell';

export type SignUpRole = Exclude<Role, 'expert'>;

const STEPS = ['Регистрация аккаунта', 'Подтверждение', 'Заполнение анкеты'];

const copy: Record<SignUpRole, { register: string; questionnaire: string; Form: () => React.JSX.Element }> = {
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

export function SignUpPage({ role }: { role: SignUpRole }) {
  const router = useRouter();
  const requestedStep = Number(useSearchParams().get('step') ?? 1);
  const pending = useSession((state) => state.pending);
  const setPending = useSession((state) => state.setPending);

  // Guard against deep links to later steps without completing the previous ones.
  const allowedStep = !pending || pending.role !== role ? 1 : pending.verified ? 3 : 2;
  const step = Math.min(Math.max(requestedStep, 1), allowedStep);

  useEffect(() => {
    if (step !== requestedStep) router.replace(step === 1 ? routes.signUp(role) : routes.signUpStep(role, step));
  }, [step, requestedStep, role, router]);

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
