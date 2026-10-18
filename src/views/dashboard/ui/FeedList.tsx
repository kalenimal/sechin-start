'use client';

import type { Project } from '@/entities/project';
import { ProjectFeedCard } from '@/entities/project';
import { CompanyDetailsButton } from '@/features/project/company-details';
import { RequestAccessButton } from '@/features/project/request-access';
import { FavouriteButton } from '@/features/project/toggle-favourite';
import { routes } from '@/shared/config';
import { Button, SkeletonList } from '@/shared/ui';
import styles from './FeedList.module.css';

type FeedProject = Project & { isFavourite?: boolean; accessRequested?: boolean };

export function FeedList({ projects, loading }: { projects?: FeedProject[]; loading?: boolean }) {
  if (loading) return <SkeletonList count={2} />;
  return (
    <ul className={`${styles.list} stagger`}>
      {projects?.map((project) => (
        <li key={project.id}>
          <ProjectFeedCard
            project={project}
            companyAction={<CompanyDetailsButton company={project.company} />}
            actions={
              <>
                <RequestAccessButton project={project} />
                <Button href={routes.project(project.id)} size="m" color="grey" className={styles.more}>
                  Подробнее
                </Button>
                <FavouriteButton projectId={project.id} active={project.isFavourite} />
              </>
            }
          />
        </li>
      ))}
    </ul>
  );
}
