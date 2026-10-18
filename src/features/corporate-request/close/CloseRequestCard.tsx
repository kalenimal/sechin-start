'use client';

import { useState } from 'react';
import { FileCheck } from 'lucide-react';
import { useCloseRequest } from '@/entities/corporate-request';
import { Button, Modal, toast } from '@/shared/ui';
import styles from './CloseRequestCard.module.css';

/** Sidebar card "Проект найден?" with a confirmation modal. */
export function CloseRequestCard({ requestId, closed }: { requestId: string; closed?: boolean }) {
  const [open, setOpen] = useState(false);
  const mutation = useCloseRequest();

  return (
    <aside className={styles.card}>
      <FileCheck className={styles.icon} aria-hidden strokeWidth={1.4} />
      <h2 className={styles.title}>{closed ? 'Запрос закрыт' : 'Проект найден?'}</h2>
      <p className={styles.text}>
        {closed
          ? 'Подбор новых проектов остановлен, запрос перенесён в завершённые'
          : 'Если вы нашли подходящее решение, завершите запрос — он больше не будет участвовать в подборке проектов'}
      </p>
      {!closed && (
        <Button color="secondary" size="m" fullWidth onClick={() => setOpen(true)}>
          Закрыть запрос
        </Button>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Закрыть запрос?"
        description="После закрытия подбор новых проектов будет остановлен, а запрос перейдёт в завершённые."
      >
        <div className={styles.actions}>
          <Button size="m" color="grey" fullWidth onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button
            size="m"
            fullWidth
            loading={mutation.isPending}
            onClick={() =>
              mutation.mutate(requestId, {
                onSuccess: () => {
                  setOpen(false);
                  toast.success('Запрос закрыт');
                },
              })
            }
          >
            Закрыть запрос
          </Button>
        </div>
      </Modal>
    </aside>
  );
}
