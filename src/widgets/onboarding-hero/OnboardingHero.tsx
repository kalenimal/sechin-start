import Image from 'next/image';
import styles from './OnboardingHero.module.css';

/** Right-hand photo panel of the onboarding screen: chamfered mask, brand glows and the platform pitch. */
export function OnboardingHero() {
  return (
    <aside className={styles.panel} aria-label="О платформе">
      {/* The panel is hidden below 1024px, so the tiny `sizes` there keeps phones from downloading the photo. */}
      <Image
        src="/images/onboarding-doctor.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 1px, 50vw"
        className={styles.photo}
      />
      <span className={styles.glowTop} aria-hidden />
      <span className={styles.glowBottom} aria-hidden />
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
