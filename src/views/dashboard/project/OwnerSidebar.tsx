import { CircleAlert, CircleCheck, CircleDashed } from 'lucide-react';
import { CompanyCard, type Project } from '@/entities/project';
import { CompanyDetailsButton } from '@/features/project/company-details';
import { routes } from '@/shared/config';
import { formatDate } from '@/shared/lib/format';
import { Button, InfoChip } from '@/shared/ui';
import styles from './ProjectPage.module.css';

/** Startup owner: moderation status, edit action and legal entity. */
export function OwnerSidebar({ project }: { project: Project }) {
  const company = (
    <CompanyCard
      company={project.company}
      variant="outlined"
      action={<CompanyDetailsButton company={project.company} color="grey" />}
    />
  );

  if (project.status === 'changes-required') {
    return (
      <>
        <div className={styles.alert} role="status">
          <CircleAlert aria-hidden />
          <p className={styles.alertTitle}>Нужно сделать изменения</p>
          <p>
            Эксперты проверили ваш проект и предложили изменения. Ознакомьтесь с комментариями, внесите правки и
            отправьте проект на повторную проверку.
          </p>
        </div>
        {company}
        <Button href={routes.projectEdit(project.id)} size="m" fullWidth>
          Внести изменения
        </Button>
      </>
    );
  }

  const onModeration = project.status === 'moderation';
  return (
    <>
      {onModeration ? (
        <InfoChip
          tone="secondary"
          icon={<CircleDashed className={styles.dashed} />}
          label="На модерации"
          value="Ожидает решения"
          className={styles.status}
        />
      ) : (
        <InfoChip
          tone="primary"
          icon={<CircleCheck />}
          label="Экспертиза пройдена"
          value={project.statusDate ? `Готов к инвестициям от ${formatDate(project.statusDate)}` : 'Валидирован'}
          className={styles.status}
        />
      )}
      {onModeration ? (
        <Button size="m" fullWidth disabled title="Проект нельзя редактировать во время модерации">
          Редактировать
        </Button>
      ) : (
        <Button href={routes.projectEdit(project.id)} size="m" color="grey" fullWidth>
          Редактировать
        </Button>
      )}
      {company}
    </>
  );
}
