'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { Button, FormError, Modal } from '@/shared/ui';
import styles from './GradeModal.module.css';

export const gradeCriteria = [
  {
    key: 'Клиническая обоснованность',
    hint: 'Насколько решение подтверждено медицинской логикой, исследованиями и реальной клинической потребностью',
  },
  { key: 'Новизна', hint: 'Насколько технология или подход отличаются от существующих решений на рынке' },
  {
    key: 'Ясность прав на ИС',
    hint: 'Насколько понятно, кому принадлежат права на технологию, патенты, ПО и другие результаты разработки',
  },
  {
    key: 'Обоснованность инвестиционной оценки',
    hint: 'Насколько заявленная стартапом стоимость проекта и объём требуемых инвестиций соответствуют его стадии, результатам и потенциалу',
  },
] as const;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (scores: Record<string, number>) => void;
  pending?: boolean;
};

/** "Оцените проект перед публикацией": 1–10 scale per criterion. Low scores (<6) are highlighted red. */
export function GradeModal({ open, onClose, onSubmit, pending }: Props) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (gradeCriteria.some((criterion) => !scores[criterion.key])) {
      setError('Поставьте оценку по каждому критерию');
      return;
    }
    onSubmit(scores);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <>
          Оцените проект
          <br />
          перед публикацией
        </>
      }
      description="Поставьте оценки по ключевым критериям"
    >
      <div className={styles.list}>
        {gradeCriteria.map((criterion) => {
          const value = scores[criterion.key] ?? 0;
          const tone = value >= 6 ? styles.good : styles.bad;
          return (
            <fieldset key={criterion.key} className={styles.criterion}>
              <legend className={styles.title}>{criterion.key}</legend>
              <p className={styles.hint}>{criterion.hint}</p>
              <div className={styles.scale} role="radiogroup" aria-label={criterion.key}>
                {Array.from({ length: 10 }, (_, index) => {
                  const score = index + 1;
                  return (
                    <button
                      key={score}
                      type="button"
                      role="radio"
                      aria-checked={value === score}
                      className={cn(styles.score, score <= value && tone, value === score && styles.current)}
                      onClick={() => {
                        setScores((prev) => ({ ...prev, [criterion.key]: score }));
                        setError(null);
                      }}
                    >
                      {score}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>
      <FormError message={error} />
      <Button size="m" fullWidth className={styles.submit} loading={pending} onClick={submit}>
        Опубликовать проект
      </Button>
    </Modal>
  );
}
