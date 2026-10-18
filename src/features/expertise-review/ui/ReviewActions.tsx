'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleCheck } from 'lucide-react';
import { useFinishExpertise } from '@/entities/expertise';
import { projectKeys, publishProject } from '@/entities/project';
import { routes } from '@/shared/config';
import { useQueryClient } from '@tanstack/react-query';
import { Button, FormError, toast } from '@/shared/ui';
import { useReview } from '../model/ReviewContext';
import { GradeModal } from './GradeModal';
import styles from './ReviewActions.module.css';

/** Expert sidebar: publish (with grading) or send remarks back to the author. */
export function ReviewActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const client = useQueryClient();
  const { comments } = useReview();
  const finish = useFinishExpertise();
  const [grading, setGrading] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remarks = Object.keys(comments).length;

  const complete = async (scores?: Record<string, number>) => {
    setPending(true);
    setError(null);
    try {
      await publishProject(projectId, comments, scores);
      await finish.mutateAsync({ projectId, hasComments: remarks > 0 });
      await client.invalidateQueries({ queryKey: projectKeys.all });
      toast.success(remarks > 0 ? 'Замечания отправлены автору проекта' : 'Проект опубликован на платформе');
      router.push(routes.myExpertise);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить результат');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={styles.root}>
      {remarks > 0 ? (
        <Button size="m" color="secondary" fullWidth loading={pending} onClick={() => complete()}>
          Отправить на доработку ({remarks})
        </Button>
      ) : (
        <Button size="m" fullWidth onClick={() => setGrading(true)}>
          Подтвердить публикацию
        </Button>
      )}
      <FormError message={error} />
      <div className={styles.hint}>
        <CircleCheck aria-hidden />
        <p className={styles.hintTitle}>Завершите проверку проекта</p>
        <p>
          Если всё в порядке — подтвердите публикацию. Если требуется доработка, нажмите на нужный блок и оставьте
          комментарий для автора
        </p>
      </div>
      <GradeModal open={grading} onClose={() => setGrading(false)} pending={pending} onSubmit={complete} />
    </div>
  );
}
