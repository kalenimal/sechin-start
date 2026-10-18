'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Delete } from 'lucide-react';
import { expertScoreRanges, projectDirections, projectStages, type ProjectStage } from '@/entities/project';
import { Button } from '@/shared/ui/Button';
import { ChoiceChips } from '@/shared/ui/ChoiceChips';
import { Modal } from '@/shared/ui/Modal';
import { RangeField } from '@/shared/ui/RangeField';
import { Select } from '@/shared/ui/Select';
import { TextLink } from '@/shared/ui/TextLink';
import { emptyFeedFilters, type FeedFiltersState } from './model';
import styles from './FeedFiltersModal.module.css';

type Props = {
  open: boolean;
  initial: FeedFiltersState;
  onClose: () => void;
  onApply: (filters: FeedFiltersState) => void;
};

function Group({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupTitle}>{title}</legend>
      <p className={styles.groupHint}>{hint}</p>
      {children}
    </fieldset>
  );
}

export function FeedFiltersModal({ open, initial, onClose, onApply }: Props) {
  const [state, setState] = useState(initial);
  useEffect(() => {
    if (open) setState(initial);
  }, [open, initial]);

  const update = <K extends keyof FeedFiltersState>(key: K, value: FeedFiltersState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      width={908}
      align="left"
      title="Фильтры проектов"
      description="Подберите проекты по интересующим параметрам"
    >
      <div className={styles.groups}>
        <Group
          title="Направление проекта"
          hint="Выберите медицинские и технологические направления, которые вам интересны"
        >
          <Select
            options={[{ value: 'all', label: 'Все направления' }, ...projectDirections]}
            value={state.direction}
            onChange={(value) => update('direction', value)}
            className={styles.select}
          />
        </Group>
        <Group title="Стадия проекта" hint="Укажите уровень готовности и текущий этап развития проекта">
          <ChoiceChips
            options={projectStages}
            value={state.stages}
            onChange={(value) => update('stages', value as ProjectStage[])}
            ariaLabel="Стадия проекта"
          />
        </Group>
        <Group title="Сумма запроса" hint="Задайте подходящий диапазон требуемого финансирования">
          <RangeField value={state.amount} onChange={(value) => update('amount', value)} />
        </Group>
        <Group title="Общая экспертная оценка" hint="Отберите проекты по результатам внутренней экспертной проверки">
          <ChoiceChips
            options={expertScoreRanges}
            value={state.scores}
            onChange={(value) => update('scores', value)}
            ariaLabel="Экспертная оценка"
          />
        </Group>
      </div>
      <div className={styles.footer}>
        <TextLink size="m" tone="primary" onClick={() => setState(emptyFeedFilters)} className={styles.clear}>
          <Delete aria-hidden className={styles.clearIcon} />
          Очистить фильтры
        </TextLink>
        <Button size="m" onClick={() => onApply(state)}>
          Применить и начать поиск
        </Button>
      </div>
    </Modal>
  );
}
