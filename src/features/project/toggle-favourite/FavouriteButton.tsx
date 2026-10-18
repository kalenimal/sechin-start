'use client';

import { Heart } from 'lucide-react';
import { useToggleFavourite } from '@/entities/project';
import { Button, type ButtonSize } from '@/shared/ui/Button';
import { toast } from '@/shared/ui/Toast';
import styles from './FavouriteButton.module.css';

export function FavouriteButton({
  projectId,
  active,
  size = 'm',
}: {
  projectId: string;
  active?: boolean;
  size?: ButtonSize;
}) {
  const mutation = useToggleFavourite();
  return (
    <Button
      iconOnly
      size={size}
      color="grey"
      aria-label={active ? 'Убрать из избранного' : 'Добавить в избранное'}
      aria-pressed={!!active}
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate(projectId, {
          onSuccess: (added) => toast.success(added ? 'Проект добавлен в избранное' : 'Проект убран из избранного'),
          onError: () => toast.error('Не удалось обновить избранное'),
        })
      }
      className={active ? styles.active : undefined}
    >
      <Heart aria-hidden />
    </Button>
  );
}
