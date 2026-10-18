import { todayIso } from '@/shared/lib/format';
import { ApiError, createMockSet, createMockTable, delay } from '@/shared/api';
import { projectsMock } from '../model/mock';
import type { Project, ProjectFilters, ProjectStatus } from '../model/types';

const table = createMockTable<Project>('sp_projects_v1', projectsMock);
const favourites = createMockSet('sp_favourites_v1', ['neurovision-ai', 'pulmotrack']);
const accessRequests = createMockSet('sp_access_requests_v1');

const matches = (project: Project, filters: ProjectFilters) => {
  const q = filters.q?.trim().toLowerCase();
  if (q && !`${project.name} ${project.shortDescription} ${project.company.name}`.toLowerCase().includes(q))
    return false;
  if (filters.status && filters.status !== 'all' && project.status !== filters.status) return false;
  if (filters.directions?.length && !filters.directions.some((d) => project.directions.includes(d))) return false;
  if (filters.stages?.length && !filters.stages.includes(project.stage)) return false;
  if (filters.amount?.from && project.request.to * 1_000_000 < filters.amount.from) return false;
  if (filters.amount?.to && project.request.from * 1_000_000 > filters.amount.to) return false;
  if (filters.scoreRanges?.length) {
    const score = project.expertise?.score ?? 0;
    const inRange = filters.scoreRanges.some((range) => {
      const [min, max] = range.split('-').map(Number);
      return score >= min && score <= max;
    });
    if (!inRange) return false;
  }
  return true;
};

export async function getMyProjects(ownerId: string, filters: ProjectFilters = {}) {
  await delay(300);
  const own = table.all().filter((project) => project.ownerId === ownerId);
  const counts = own.reduce(
    (acc, project) => ({ ...acc, [project.status]: (acc[project.status] ?? 0) + 1 }),
    {} as Partial<Record<ProjectStatus, number>>,
  );
  return { items: own.filter((project) => matches(project, filters)), total: own.length, counts };
}

/** Investor / corporate feed — only projects that passed moderation and expertise. */
export async function getFeed(filters: ProjectFilters = {}) {
  await delay(300);
  const items = table.all().filter((project) => project.status === 'ready' && matches(project, filters));
  const favs = favourites.values();
  const requested = accessRequests.values();
  return items.map((project) => ({
    ...project,
    isFavourite: favs.includes(project.id),
    accessRequested: requested.includes(project.id),
  }));
}

export async function getFavourites() {
  const feed = await getFeed();
  return feed.filter((project) => project.isFavourite);
}

export async function getProject(id: string) {
  await delay(250);
  const project = table.find(id);
  if (!project) throw new ApiError('Проект не найден', 404);
  return { ...project, isFavourite: favourites.has(id), accessRequested: accessRequests.has(id) };
}

/** `submit` re-sends the project to moderation; drafts keep the current status. */
export async function updateProject(id: string, patch: Partial<Project>, submit = true) {
  await delay(500);
  const project = table.find(id);
  if (!project) throw new ApiError('Проект не найден', 404);
  return table.upsert({
    ...project,
    ...patch,
    updatedAt: todayIso(),
    status: submit ? 'moderation' : project.status,
  });
}

export async function createProject(ownerId: string, data: Partial<Project> & Pick<Project, 'name'>) {
  await delay(500);
  const base = projectsMock[0];
  return table.upsert({
    ...base,
    expertise: undefined,
    logo: undefined,
    cover: undefined,
    documents: [],
    advantages: [],
    ...data,
    id: `p-${Date.now()}`,
    ownerId,
    status: 'moderation',
    createdAt: todayIso(),
    updatedAt: todayIso(),
  });
}

export async function toggleFavourite(id: string) {
  await delay(150);
  return favourites.toggle(id);
}

export async function requestAccess(id: string) {
  await delay(600);
  accessRequests.add(id);
}

export async function publishProject(id: string, comments: Record<string, string>, scores?: Record<string, number>) {
  await delay(600);
  const project = table.find(id);
  if (!project) throw new ApiError('Проект не найден', 404);
  const hasComments = Object.values(comments).some(Boolean);
  const criteria = scores
    ? Object.entries(scores).map(([label, score]) => ({ label, score, max: 10 }))
    : (project.expertise?.criteria ?? []);
  const total = criteria.length
    ? Math.round((criteria.reduce((s, c) => s + c.score, 0) / (criteria.length * 10)) * 100)
    : 0;
  return table.upsert({
    ...project,
    status: hasComments ? 'changes-required' : 'ready',
    statusDate: todayIso(),
    expertise: hasComments
      ? project.expertise
      : { ...(project.expertise ?? projectsMock[3].expertise!), score: total, criteria, date: todayIso() },
  });
}
