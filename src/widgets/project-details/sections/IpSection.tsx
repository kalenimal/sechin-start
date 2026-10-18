import { FileCheck, FileClock, FileCog, FileUser } from 'lucide-react';
import type { Project } from '@/entities/project';
import { ReviewBlock } from '@/features/expertise-review';
import { InfoChip } from '@/shared/ui/InfoChip';
import { CopyValue, Section } from '../parts';
import styles from '../ProjectDetails.module.css';

export function IpSection({ ip }: { ip: Project['ip'] }) {
  return (
    <Section title="Интеллектуальная собственность и регуляторный статус">
      <div className={styles.stack}>
        {ip.protected && (
          <ReviewBlock id="ip-protected">
            <InfoChip tone="primary" layout="inline" icon={<FileCheck />}>
              Защищённая интеллектуальная собственность
            </InfoChip>
          </ReviewBlock>
        )}
        <ReviewBlock id="ip-type">
          <InfoChip layout="inline" icon={<FileCog />} label="Тип ИС" value={ip.type} />
        </ReviewBlock>
        <ReviewBlock id="ip-status">
          <InfoChip layout="inline" icon={<FileClock />} label="Статус патентования" value={ip.patentStatus} />
        </ReviewBlock>
        <ReviewBlock id="ip-owner">
          <InfoChip layout="inline" icon={<FileUser />} label="Правообладатель" value={ip.owner} />
        </ReviewBlock>
        {ip.patentNumber && (
          <ReviewBlock id="ip-number">
            <InfoChip large label="Номер патента / заявки" value={<CopyValue value={ip.patentNumber} />} />
          </ReviewBlock>
        )}
      </div>
    </Section>
  );
}
