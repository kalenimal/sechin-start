'use client';

import { useState } from 'react';
import { useCreateRequest } from '@/entities/corporate-request';
import { dealTypes, directionLabel, projectDirections, projectStages, type ProjectStage } from '@/entities/project';
import { useSession } from '@/entities/session';
import { Button } from '@/shared/ui/Button';
import { ChoiceChips } from '@/shared/ui/ChoiceChips';
import { FormError } from '@/shared/ui/FormError';
import { Modal } from '@/shared/ui/Modal';
import { RangeField, type Range } from '@/shared/ui/RangeField';
import { Select } from '@/shared/ui/Select';
import { toast } from '@/shared/ui/Toast';
import styles from './CreateRequestModal.module.css';

export function CreateRequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const user = useSession((state) => state.user)!;
  const [direction, setDirection] = useState<string | null>(null);
  const [stages, setStages] = useState<ProjectStage[]>([]);
  const [deals, setDeals] = useState<string[]>([]);
  const [amount, setAmount] = useState<Range>({ from: '', to: '' });
  const [error, setError] = useState<string | null>(null);
  const mutation = useCreateRequest(user.id);

  const submit = () => {
    if (!direction) return setError('Выберите фокусное направление');
    if (!stages.length) return setError('Выберите хотя бы одну стадию проекта');
    setError(null);
    mutation.mutate(
      {
        title: `Подбор решений: ${directionLabel(direction)}`,
        directions: [direction],
        stages,
        dealTypes: deals,
        amount: { from: amount.from ? Number(amount.from) : undefined, to: amount.to ? Number(amount.to) : undefined },
      },
      {
        onSuccess: () => {
          toast.success('Запрос создан — начинаем подбор проектов');
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Новый запрос"
      description="Опишите задачу компании — мы подберём подходящие проекты и технологические решения"
    >
      <div className={styles.groups}>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Фокусные направления</h3>
          <Select
            options={projectDirections}
            value={direction}
            onChange={setDirection}
            placeholder="Выберите интересующие направления"
          />
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Стадия проекта</h3>
          <p className={styles.groupHint}>Укажите уровень готовности и текущий этап развития проекта</p>
          <ChoiceChips
            options={projectStages}
            value={stages}
            onChange={(value) => setStages(value as ProjectStage[])}
            ariaLabel="Стадия проекта"
          />
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Тип сделки</h3>
          <p className={styles.groupHint}>Выберите подходящий формат взаимодействия с проектом</p>
          <ChoiceChips options={dealTypes} value={deals} onChange={setDeals} ariaLabel="Тип сделки" />
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Сумма запроса</h3>
          <p className={styles.groupHint}>Задайте подходящий диапазон требуемого финансирования</p>
          <RangeField value={amount} onChange={setAmount} />
        </section>
      </div>
      <FormError message={error ?? mutation.error?.message} />
      <Button size="m" fullWidth className={styles.submit} loading={mutation.isPending} onClick={submit}>
        Создать запрос
      </Button>
    </Modal>
  );
}
