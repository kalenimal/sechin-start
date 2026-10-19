import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseBusiness, ChevronRight, Rocket } from 'lucide-react';
import { routes } from '@/shared/config';
import { Logo } from '@/shared/ui/Logo';
import { TextLink } from '@/shared/ui/TextLink';
import { OnboardingHero } from '@/widgets/onboarding-hero';
import styles from './OnboardingPage.module.css';

const options = [
  {
    role: 'startup',
    title: 'Развиваю свой цифровой сервис',
    description: 'Ищу экспертизу, пилоты и инвестиции',
    icon: <Rocket aria-hidden strokeWidth={1.5} />,
  },
  {
    role: 'investor',
    title: 'Ищу проекты для инвестиций',
    description: 'Изучаю перспективные медицинские цифровые сервисы',
    icon: <Image src="/icons/ruble.svg" alt="" width={40} height={40} />,
  },
  {
    role: 'corporate',
    title: 'Ищу решение для своей компании',
    description: 'Подбираю технологии и проекты под задачи бизнеса',
    icon: <BriefcaseBusiness aria-hidden strokeWidth={1.5} />,
  },
] as const;

export function OnboardingPage() {
  return (
    <div className={styles.page}>
      <main className={styles.left}>
        <Logo />
        <h1 className={styles.title}>
          Зарегистрируйтесь
          <br />
          или войдите
        </h1>
        <p className={styles.description}>
          Выберите вариант, который лучше всего описывает вашу цель на платформе. Если аккаунт уже есть — просто
          войдите.
        </p>
        <ul className={styles.options}>
          {options.map((option) => (
            <li key={option.role}>
              <Link href={routes.signUp(option.role)} className={styles.option}>
                <span className={styles.optionIcon}>{option.icon}</span>
                <span className={styles.optionText}>
                  <span className={styles.optionTitle}>{option.title}</span>
                  <span className={styles.optionDescription}>{option.description}</span>
                </span>
                <ChevronRight aria-hidden className={styles.chevron} strokeWidth={1.5} />
              </Link>
            </li>
          ))}
        </ul>
        <TextLink href={routes.login} align="center">
          У меня уже есть аккаунт
        </TextLink>
      </main>
      <div className={styles.right}>
        <OnboardingHero />
      </div>
    </div>
  );
}
