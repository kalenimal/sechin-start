import { CircleCheck, CircleDashed } from 'lucide-react';
import { formatDate } from '@/shared/lib/format';
import { InfoChip } from '@/shared/ui/InfoChip';
import { stageLabel } from '../model/dictionaries';
import { projectStatusLabels, type Project } from '../model/types';
import styles from './ProjectHighlights.module.css';

/** "Экспертиза пройдена · Готов к инвестициям от …" + "Стадия" chips. */
export function ProjectHighlights({ project }: { project: Project }) {
  const passed = project.status === 'ready' && project.statusDate;
  return (
    <div className={styles.row}>
      {passed && (
        <InfoChip
          tone="primary"
          icon={<CircleCheck />}
          label="Экспертиза пройдена"
          value={`${projectStatusLabels.ready} от ${formatDate(project.statusDate!)}`}
        />
      )}
      <InfoChip icon={<CircleDashed />} label="Стадия" value={stageLabel(project.stage)} />
    </div>
  );
}
