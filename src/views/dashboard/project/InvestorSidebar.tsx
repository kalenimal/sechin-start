import { CompanyCard, ScoreDonut, type Project } from '@/entities/project';
import { CompanyDetailsButton } from '@/features/project/company-details';
import { RequestAccessButton } from '@/features/project/request-access';
import { FavouriteButton } from '@/features/project/toggle-favourite';
import styles from './ProjectPage.module.css';

type Props = { project: Project & { isFavourite?: boolean; accessRequested?: boolean } };

/** Investor / corporate: expert score shortcut, legal entity, access request and favourite. */
export function InvestorSidebar({ project }: Props) {
  return (
    <>
      {project.expertise && (
        <a href="#expertise" className={styles.score}>
          <ScoreDonut score={project.expertise.score} size={44} stroke={6} />
          <span>
            <span className={styles.scoreLabel}>Экспертная оценка</span>
            <span className={styles.scoreValue}>{project.expertise.score} / 100</span>
            <span className={styles.scoreLink}>Смотреть детали</span>
          </span>
        </a>
      )}
      <CompanyCard
        company={project.company}
        variant="outlined"
        action={<CompanyDetailsButton company={project.company} color="grey" />}
      />
      <div className={styles.actions}>
        <RequestAccessButton project={project} />
        <FavouriteButton projectId={project.id} active={project.isFavourite} />
      </div>
    </>
  );
}
