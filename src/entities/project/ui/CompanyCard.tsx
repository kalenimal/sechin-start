import type { ReactNode } from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { Project } from '../model/types';
import styles from './CompanyCard.module.css';

type CompanyCardProps = {
  company: Project['company'];
  action?: ReactNode;
  variant?: 'filled' | 'outlined';
  className?: string;
};

/** Legal entity summary: briefcase, name, legal form, ИНН, year + "Данные компании" action. */
export function CompanyCard({ company, action, variant = 'filled', className }: CompanyCardProps) {
  return (
    <div className={cn(styles.card, styles[variant], className)}>
      <div className={styles.body}>
        <BriefcaseBusiness className={styles.icon} aria-hidden strokeWidth={1.5} />
        <div className={styles.names}>
          <p className={styles.name}>{company.name}</p>
          <p className={styles.form}>{company.legalForm}</p>
        </div>
        <dl className={styles.facts}>
          <div>
            <dt>ИНН:</dt> <dd>{company.inn}</dd>
          </div>
          <div>
            <dt>Год регистрации:</dt> <dd>{company.year}</dd>
          </div>
        </dl>
      </div>
      {action}
    </div>
  );
}
