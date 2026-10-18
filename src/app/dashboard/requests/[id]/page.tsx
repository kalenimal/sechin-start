import { RequestResultsPage } from '@/views/dashboard/request-results';

export const metadata = { title: 'Проекты по запросу' };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RequestResultsPage id={id} />;
}
