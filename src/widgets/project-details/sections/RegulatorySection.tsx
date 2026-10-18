import { FileCheck } from 'lucide-react';
import type { Project } from '@/entities/project';
import { ReviewBlock } from '@/features/expertise-review';
import { InfoChip } from '@/shared/ui/InfoChip';
import { Section, yesNo } from '../parts';
import styles from '../ProjectDetails.module.css';

export function RegulatorySection({ regulatory, clinical }: Pick<Project, 'regulatory' | 'clinical'>) {
  return (
    <Section title="Регуляторика и клинические исследования">
      <div className={styles.stack}>
        <h3 className={styles.subTitle}>Регуляторный статус</h3>
        <ReviewBlock id="risk-class">
          <InfoChip large label="Класс риска медизделия" value={regulatory.riskClass} />
        </ReviewBlock>
        <div className={styles.row}>
          <ReviewBlock id="ru-required">
            <InfoChip layout="inline" label="Необходимость РУ" value={yesNo(regulatory.ruRequired)} />
          </ReviewBlock>
          <ReviewBlock id="ru-status">
            <InfoChip layout="inline" label="Статус РУ" value={regulatory.ruStatus} />
          </ReviewBlock>
        </div>
        <ReviewBlock id="ru-number">
          <InfoChip large label="Номер РУ" value={regulatory.ruNumber ?? 'Не присвоен'} />
        </ReviewBlock>
        {regulatory.compliant152 && (
          <ReviewBlock id="fz152">
            <InfoChip tone="primary" layout="inline" icon={<FileCheck />}>
              Соответствует требованиям 152-ФЗ
            </InfoChip>
          </ReviewBlock>
        )}
      </div>
      <div className={styles.stack}>
        <h3 className={styles.subTitle}>Клинические исследования</h3>
        <div className={styles.row}>
          <ReviewBlock id="ethics">
            <InfoChip layout="inline" label="Статус этического комитета" value={clinical.ethicsStatus} />
          </ReviewBlock>
          <ReviewBlock id="ci-required">
            <InfoChip layout="inline" label="Необходимость КИ" value={yesNo(clinical.required)} />
          </ReviewBlock>
          <ReviewBlock id="ci-phase">
            <InfoChip layout="inline" label="Фаза КИ" value={clinical.phase} />
          </ReviewBlock>
        </div>
        <ReviewBlock id="ci-protocol">
          <InfoChip large label="Номер и дата протокола КИ" value={clinical.protocol} />
        </ReviewBlock>
      </div>
    </Section>
  );
}
