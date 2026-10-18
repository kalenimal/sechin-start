import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/shared/config';
import { fundingProgress, investorsLabel } from '@/shared/lib/format';
import { Tag, TagList } from '@/shared/ui/Tag';
import type { Startup } from '../model/types';
import { FundingProgress } from './FundingProgress';
import styles from './StartupCard.module.css';

type StartupCardProps = {
  startup: Startup;
  /** Only the LCP card (first in the grid) should be prioritised — several priority images compete for bandwidth. */
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
};

export function StartupCard({ startup, priority = false, headingLevel: Heading = 'h3' }: StartupCardProps) {
  const progress = fundingProgress(startup.raised, startup.goal);
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={startup.cover}
          alt={`Обложка проекта ${startup.name}`}
          fill
          sizes="(max-width: 640px) calc(100vw - 52px), (max-width: 1024px) 45vw, 364px"
          className={styles.cover}
          priority={priority}
        />
        <Image src={startup.founderPhoto} alt="" width={82} height={82} className={styles.avatar} priority={priority} />
      </div>
      <div className={styles.body}>
        <Heading className={styles.title}>
          <Link href={routes.startup(startup.slug)} className={styles.link}>
            {startup.name}
          </Link>
        </Heading>
        <p className={styles.description}>{startup.shortDescription}</p>
        <div className={styles.tags}>
          <Tag variant="outline">{startup.stage} этап</Tag>
          <TagList>
            {startup.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
        </div>
        <FundingProgress progress={progress} caption={investorsLabel(startup.investorsCount)} />
      </div>
    </article>
  );
}
