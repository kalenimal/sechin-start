import { UserRound } from 'lucide-react';
import { ScoreDonut, type Project } from '@/entities/project';
import { cn } from '@/shared/lib/cn';
import { formatDate } from '@/shared/lib/format';
import styles from './ProjectDetails.module.css';

export function ExpertiseSummary({ expertise }: { expertise: NonNullable<Project['expertise']> }) {
  return (
    <section className={styles.expertise} id="expertise" aria-labelledby="expertise-title">
      <h2 className={styles.expertiseTitle} id="expertise-title">
        Экспертиза пройдена <span>от {formatDate(expertise.date)}</span>
      </h2>
      <div className={styles.expertiseScore}>
        <ScoreDonut score={expertise.score} />
        <div className={styles.expertiseText}>
          <p className={styles.expertiseValue}>{expertise.score} / 100</p>
          <p>{expertise.summary}</p>
          <ul className={styles.criteria}>
            {expertise.criteria.map((criterion) => (
              <li
                key={criterion.label}
                className={cn(styles.criterion, criterion.score / criterion.max < 0.6 && styles.criterionLow)}
              >
                {criterion.label}{' '}
                <strong>
                  {criterion.score}/{criterion.max}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h3 className={styles.expertiseTitle}>Состав экспертного комитета</h3>
      <ul className={styles.committee}>
        {expertise.committee.map((member, index) => (
          <li key={`${member}-${index}`}>
            <span className={styles.committeeIcon}>
              <UserRound aria-hidden />
            </span>
            {member}
          </li>
        ))}
      </ul>
    </section>
  );
}
