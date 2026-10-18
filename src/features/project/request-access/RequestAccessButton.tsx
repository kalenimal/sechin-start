'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { routes } from '@/shared/config';
import { directionLabel, ProjectLogo, useRequestAccess, type Project } from '@/entities/project';
import { Button, type ButtonSize } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormError } from '@/shared/ui/FormError';
import { Tag, TagList } from '@/shared/ui/Tag';
import { Modal } from '@/shared/ui/Modal';
import styles from './RequestAccessButton.module.css';

type Props = { project: Project & { accessRequested?: boolean }; size?: ButtonSize; fullWidth?: boolean };

export function RequestAccessButton({ project, size = 'm', fullWidth }: Props) {
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(true);
  const [sent, setSent] = useState(false);
  const mutation = useRequestAccess();

  if (project.accessRequested && !open) {
    return (
      <Button size={size} color="grey" disabled iconLeft={<Check aria-hidden />} fullWidth={fullWidth}>
        Запрос отправлен
      </Button>
    );
  }

  const close = () => {
    setOpen(false);
    setSent(false);
  };

  return (
    <>
      <Button size={size} onClick={() => setOpen(true)} fullWidth={fullWidth}>
        Запросить доступ
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={
          sent ? (
            'Запрос отправлен'
          ) : (
            <>
              Запросить доступ
              <br />к проекту
            </>
          )
        }
        description={
          sent
            ? 'Владелец проекта получил ваш запрос. Мы пришлём уведомление, когда доступ к документации будет открыт.'
            : 'Владелец проекта получит ваш запрос и сможет открыть доступ к документации или начать диалог'
        }
      >
        {sent ? (
          <Button fullWidth size="m" onClick={close}>
            Закрыть
          </Button>
        ) : (
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              mutation.mutate(project.id, { onSuccess: () => setSent(true) });
            }}
          >
            <div className={styles.project}>
              <ProjectLogo src={project.logo} name={project.name} size={44} />
              <div className={styles.projectText}>
                <p className={styles.projectName}>{project.name}</p>
                <TagList>
                  {project.directions.map((direction) => (
                    <Tag key={direction}>{directionLabel(direction)}</Tag>
                  ))}
                </TagList>
              </div>
            </div>
            <Checkbox
              checked={agree}
              onChange={(event) => setAgree(event.target.checked)}
              label={
                <span className={styles.agreement}>
                  Я принимаю условия{' '}
                  <Link href={routes.offer} target="_blank">
                    соглашения о сотрудничестве (оферты)
                  </Link>{' '}
                  <span className={styles.required}>*</span>
                </span>
              }
            />
            <FormError message={mutation.error?.message} />
            <Button type="submit" size="m" fullWidth disabled={!agree} loading={mutation.isPending}>
              Отправить запрос
            </Button>
            <p className={styles.note}>* Соглашение будет оформлено автоматически при отправке запроса</p>
          </form>
        )}
      </Modal>
    </>
  );
}
