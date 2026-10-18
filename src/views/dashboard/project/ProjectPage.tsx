'use client';

import { useExpertiseByProject } from '@/entities/expertise';
import { CompanyCard, useProject } from '@/entities/project';
import { useSession } from '@/entities/session';
import { ReviewProvider, type ReviewMode } from '@/features/expertise-review';
import { routes } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ProjectDetails } from '@/widgets/project-details';
import { BackLink } from '../ui/BackLink';
import { ExpertSidebar } from './ExpertSidebar';
import { InvestorSidebar } from './InvestorSidebar';
import { OwnerSidebar } from './OwnerSidebar';
import styles from './ProjectPage.module.css';

const OPEN_REVIEW_STATUSES = ['new', 'in-review', 'recheck'];

export function ProjectPage({ id }: { id: string }) {
  const user = useSession((state) => state.user)!;
  const isExpert = user.role === 'expert';
  const { data: project, isLoading, error } = useProject(id);
  const { data: expertise = null, isLoading: expertiseLoading } = useExpertiseByProject(id, isExpert);

  if (isLoading || (isExpert && expertiseLoading)) return <Skeleton height="60vh" />;
  if (error || !project) {
    return (
      <EmptyState
        title="Проект не найден"
        action={
          <Button href={routes.dashboard} size="m">
            Вернуться
          </Button>
        }
      />
    );
  }

  const isOwner = user.role === 'startup' && project.ownerId === user.id;
  const isInvestor = user.role === 'investor' || user.role === 'corporate';
  // An expert reviews a project while its expertise request is open; finished requests are read-only.
  const reviewable = isExpert && !!expertise && OPEN_REVIEW_STATUSES.includes(expertise.status);
  const mode: ReviewMode = reviewable ? 'review' : isOwner ? 'owner' : 'view';

  return (
    <ReviewProvider key={`${project.id}-${mode}`} mode={mode} initialComments={isOwner ? project.comments : {}}>
      <div className={styles.layout}>
        <BackLink href={routes.dashboard} />
        <ProjectDetails project={project} showExpertise={isInvestor} />
        <aside className={styles.sidebar}>
          {isOwner && <OwnerSidebar project={project} />}
          {isInvestor && <InvestorSidebar project={project} />}
          {isExpert && <ExpertSidebar project={project} expertise={expertise} reviewable={reviewable} />}
          {user.role === 'startup' && !isOwner && <CompanyCard company={project.company} variant="outlined" />}
        </aside>
      </div>
    </ReviewProvider>
  );
}
