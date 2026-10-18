import { CircleCheck, UsersRound } from 'lucide-react';
import type { Project } from '@/entities/project';
import { ReviewBlock } from '@/features/expertise-review';
import { cn } from '@/shared/lib/cn';
import { InfoChip } from '@/shared/ui/InfoChip';
import { Section, TextBlock } from '../parts';
import styles from '../ProjectDetails.module.css';

const TRL_LEVELS = 9;

export function AboutSection({ project }: { project: Project }) {
  return (
    <Section title="О проекте">
      <ReviewBlock id="usp" block>
        <TextBlock label="Уникальное торговое предложение" large>
          {project.usp}
        </TextBlock>
      </ReviewBlock>
      <ReviewBlock id="problem" block>
        <TextBlock label="Описание проблемы">{project.problem}</TextBlock>
      </ReviewBlock>
      <ReviewBlock id="solution" block>
        <TextBlock label="Описание решения">{project.solution}</TextBlock>
      </ReviewBlock>
      {project.advantages.length > 0 && (
        <ReviewBlock id="advantages" block>
          <div className={styles.textField}>
            <p className={styles.fieldLabelDark}>Ключевые преимущества</p>
            <div className={styles.chips}>
              {project.advantages.map((advantage) => (
                <InfoChip key={advantage} tone="primary" layout="inline" icon={<CircleCheck />}>
                  {advantage}
                </InfoChip>
              ))}
            </div>
          </div>
        </ReviewBlock>
      )}
      <ReviewBlock id="audience">
        <InfoChip layout="inline" icon={<UsersRound />} label="Целевая аудитория" value={project.audience} />
      </ReviewBlock>
      <ReviewBlock id="trl" block>
        <div className={styles.textField}>
          <p className={styles.fieldLabelDark}>Уровень технологической готовности</p>
          <div className={styles.trl}>
            <div className={styles.trlBars} role="img" aria-label={`Уровень ${project.trl} из ${TRL_LEVELS}`}>
              {Array.from({ length: TRL_LEVELS }, (_, index) => (
                <span
                  key={index}
                  className={cn(styles.trlBar, index < project.trl && styles.trlFilled)}
                  style={{ animationDelay: `${index * 60}ms` }}
                />
              ))}
            </div>
            <span className={styles.trlValue}>
              {project.trl}/{TRL_LEVELS}
            </span>
          </div>
        </div>
      </ReviewBlock>
    </Section>
  );
}
