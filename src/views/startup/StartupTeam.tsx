import Image from 'next/image';
import type { Startup } from '@/entities/startup';
import styles from './StartupSections.module.css';

export function StartupTeam({ startup }: { startup: Startup }) {
  return (
    <section aria-labelledby="team-title">
      <h2 id="team-title" className="visually-hidden">
        Команда {startup.name}
      </h2>
      <ul className={`${styles.team} stagger`}>
        {startup.team.map((member) => (
          <li key={member.name} className={styles.member}>
            <Image src={member.photo} alt={member.name} width={136} height={136} className={styles.memberPhoto} />
            <div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
