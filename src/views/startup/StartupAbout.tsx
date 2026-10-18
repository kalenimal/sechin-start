import Image from 'next/image';
import type { Startup } from '@/entities/startup';
import styles from './StartupSections.module.css';

export function StartupAbout({ startup }: { startup: Startup }) {
  const { about } = startup;
  return (
    <article className={styles.about}>
      <h2 className={styles.aboutTitle}>{about.title}</h2>
      <p className={styles.lead}>{about.lead}</p>
      {about.paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
      {about.steps && (
        <div className={styles.steps}>
          {about.stepsIntro && <p>{about.stepsIntro}</p>}
          <ul>
            {about.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      )}
      {about.closing.map((text) => (
        <p key={text}>{text}</p>
      ))}
      {about.image && (
        <Image
          src={about.image}
          alt={about.imageAlt ?? startup.name}
          width={690}
          height={400}
          sizes="(max-width: 770px) 100vw, 690px"
          className={styles.aboutImage}
        />
      )}
    </article>
  );
}
