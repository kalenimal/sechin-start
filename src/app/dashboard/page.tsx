import { getServerSession } from '@/entities/session/server';
import { ExpertiseRequestsPage } from '@/views/dashboard/expertise-requests';
import { MyProjectsPage } from '@/views/dashboard/my-projects';
import { MyRequestsPage } from '@/views/dashboard/my-requests';
import { ProjectFeedPage } from '@/views/dashboard/project-feed';

export const metadata = { title: 'Главная' };

/** Each role lands on its own home screen. */
export default async function Page() {
  const user = await getServerSession();
  switch (user?.role) {
    case 'investor':
      return <ProjectFeedPage />;
    case 'corporate':
      return <MyRequestsPage />;
    case 'expert':
      return <ExpertiseRequestsPage />;
    default:
      return <MyProjectsPage />;
  }
}
