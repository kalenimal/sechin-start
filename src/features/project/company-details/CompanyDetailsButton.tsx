'use client';

import { useState } from 'react';
import type { Project } from '@/entities/project';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import styles from './CompanyDetailsButton.module.css';

export function CompanyDetailsButton({
  company,
  color = 'white',
}: {
  company: Project['company'];
  color?: 'white' | 'grey';
}) {
  const [open, setOpen] = useState(false);
  const rows = [
    ['Наименование', company.name],
    ['Организационная форма', company.legalForm],
    ['ИНН', company.inn],
    ['Год регистрации', String(company.year)],
  ];
  return (
    <>
      <Button size="m" color={color} fullWidth onClick={() => setOpen(true)}>
        Данные компании
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Данные компании">
        <dl className={styles.list}>
          {rows.map(([label, value]) => (
            <div key={label} className={styles.row}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <Button size="m" fullWidth onClick={() => setOpen(false)}>
          Закрыть
        </Button>
      </Modal>
    </>
  );
}
