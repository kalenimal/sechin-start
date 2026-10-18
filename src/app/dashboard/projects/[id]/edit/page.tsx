import { ProjectEditPage } from '@/views/dashboard/project-edit';

export const metadata = { title: 'Редактирование проекта' };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectEditPage id={id} />;
}
