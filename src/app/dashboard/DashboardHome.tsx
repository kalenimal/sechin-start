'use client';

import dynamic from 'next/dynamic';
import { useSession } from '@/entities/session';

// Each role has its own home screen; loading them lazily keeps the other roles' code out of the bundle.
const MyProjectsPage = dynamic(() => import('@/views/dashboard/my-projects').then((m) => m.MyProjectsPage));
const ProjectFeedPage = dynamic(() => import('@/views/dashboard/project-feed').then((m) => m.ProjectFeedPage));
const MyRequestsPage = dynamic(() => import('@/views/dashboard/my-requests').then((m) => m.MyRequestsPage));
const ExpertiseRequestsPage = dynamic(() =>
  import('@/views/dashboard/expertise-requests').then((m) => m.ExpertiseRequestsPage),
);

export function DashboardHome() {
  const role = useSession((state) => state.user?.role);
  switch (role) {
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
