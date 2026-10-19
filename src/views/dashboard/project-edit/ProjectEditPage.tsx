'use client';

import { useProject } from '@/entities/project';
import { useSession } from '@/entities/session';
import { ProjectEditForm } from '@/features/project/edit-project';
import { routes } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Skeleton } from '@/shared/ui/Skeleton';
import { BackLink } from '../ui/BackLink';
import styles from './ProjectEditPage.module.css';

function EditExisting({ id }: { id: string }) {
  const user = useSession((state) => state.user)!;
  const { data, isLoading, error } = useProject(id);
  if (isLoading) return <Skeleton height="60vh" />;
  if (error || !data) return <EmptyState title="Проект не найден" />;
  if (data.ownerId !== user.id) {
    return (
      <EmptyState
        title="Редактировать проект может только его владелец"
        action={
          <Button href={routes.project(id)} size="m">
            К проекту
          </Button>
        }
      />
    );
  }
  return <ProjectEditForm project={data} />;
}

export function ProjectEditPage({ id }: { id: string }) {
  const user = useSession((state) => state.user)!;
  if (user.role !== 'startup') {
    return (
      <EmptyState
        title="Раздел доступен только цифровым сервисам"
        action={
          <Button href={routes.dashboard} size="m">
            На главную
          </Button>
        }
      />
    );
  }
  return (
    <div className={styles.page}>
      <BackLink href={id === 'new' ? routes.dashboard : routes.project(id)} />
      {id === 'new' ? <ProjectEditForm /> : <EditExisting id={id} />}
    </div>
  );
}
