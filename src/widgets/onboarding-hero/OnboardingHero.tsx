import Image from 'next/image';
import styles from './OnboardingHero.module.css';

/** Right-hand photo panel of the onboarding screen: chamfered mask, brand glows and the platform pitch. */
export function OnboardingHero() {
  return (
    <aside className={styles.panel} aria-label="О платформе">
      <Image src="/images/onboarding-doctor.webp" alt="" fill priority sizes="50vw" className={styles.photo} />
      <span className={styles.glowTop} aria-hidden>
        <span />
      </span>
      <span className={styles.glowBottom} aria-hidden>
        <span />
      </span>
      <div className={styles.text}>
        <p className={styles.title}>
          От идеи до внедрения
          <br />в медицину
        </p>
        <p className={styles.description}>
          Платформа объединяет медицинские проекты, экспертов, инвесторов и корпорации — чтобы перспективные решения
          проходили профессиональную оценку, находили возможности для пилотирования, инвестиций и масштабирования.
        </p>
      </div>
    </aside>
  );
}
