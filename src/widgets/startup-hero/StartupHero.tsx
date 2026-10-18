import Image from 'next/image';
import { UsersRound } from 'lucide-react';
import type { Startup } from '@/entities/startup';
import { formatRub, investorsLabel } from '@/shared/lib/format';
import { Tag, TagList } from '@/shared/ui/Tag';
import styles from './StartupHero.module.css';

export function StartupHero({ startup }: { startup: Startup }) {
  return (
    <section className={styles.hero} aria-labelledby="startup-title">
      <Image
        src={startup.heroImage}
        alt=""
        fill
        priority
        sizes="(max-width: 1240px) 100vw, 1200px"
        className={styles.background}
      />
      <div className={styles.content}>
        {startup.wordmark && (
          <Image src={startup.wordmark} alt="" width={195} height={26} className={styles.wordmark} priority />
        )}
        <h1 id="startup-title" className={styles.title}>
          {startup.name}
        </h1>
        <p className={styles.description}>{startup.shortDescription}</p>
        <TagList>
          <Tag variant="white">{startup.stage} этап</Tag>
          {startup.tags.map((tag) => (
            <Tag key={tag} variant="glass">
              {tag}
            </Tag>
          ))}
        </TagList>
      </div>
      <aside className={styles.funding} aria-label="Инвестиции">
        <Image src="/icons/ruble.svg" alt="" width={40} height={40} className={styles.ruble} />
        <p className={styles.amount}>{formatRub(startup.raised)}</p>
        <p className={styles.caption}>Собрано инвестиций</p>
        <p className={styles.investors}>
          <UsersRound aria-hidden />
          {investorsLabel(startup.investorsCount)}
        </p>
      </aside>
    </section>
  );
}
