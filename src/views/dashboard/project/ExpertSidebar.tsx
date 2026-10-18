import { CircleCheck } from 'lucide-react';
import type { ExpertiseRequest } from '@/entities/expertise';
import { CompanyCard, type Project } from '@/entities/project';
import { ReviewActions } from '@/features/expertise-review';
import { CompanyDetailsButton } from '@/features/project/company-details';
import { InfoChip } from '@/shared/ui/InfoChip';

type Props = { project: Project; expertise: ExpertiseRequest | null; reviewable: boolean };

/** Expert: legal entity plus publish / send-to-rework actions while the review is open. */
export function ExpertSidebar({ project, expertise, reviewable }: Props) {
  return (
    <>
      <CompanyCard
        company={project.company}
        variant="outlined"
        action={<CompanyDetailsButton company={project.company} color="grey" />}
      />
      {reviewable ? (
        <ReviewActions projectId={project.id} />
      ) : (
        <InfoChip
          tone="primary"
          icon={<CircleCheck />}
          label="Экспертиза"
          value={expertise?.status === 'rework' ? 'Отправлено на доработку' : 'Проверка завершена'}
        />
      )}
    </>
  );
}
