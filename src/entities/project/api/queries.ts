'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Project, ProjectFilters } from '../model/types';
import * as api from './projectApi';

export const projectKeys = {
  all: ['projects'] as const,
  mine: (ownerId: string, filters: ProjectFilters) => ['projects', 'mine', ownerId, filters] as const,
  feed: (filters: ProjectFilters) => ['projects', 'feed', filters] as const,
  favourites: ['projects', 'favourites'] as const,
  detail: (id: string) => ['projects', 'detail', id] as const,
};

export const useMyProjects = (ownerId: string, filters: ProjectFilters) =>
  useQuery({ queryKey: projectKeys.mine(ownerId, filters), queryFn: () => api.getMyProjects(ownerId, filters) });

export const useProjectFeed = (filters: ProjectFilters) =>
  useQuery({ queryKey: projectKeys.feed(filters), queryFn: () => api.getFeed(filters) });

export const useFavouriteProjects = () => useQuery({ queryKey: projectKeys.favourites, queryFn: api.getFavourites });

export const useProject = (id: string) =>
  useQuery({ queryKey: projectKeys.detail(id), queryFn: () => api.getProject(id) });

export function useToggleFavourite() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: api.toggleFavourite,
    onSuccess: () => client.invalidateQueries({ queryKey: projectKeys.all }),
  });
}

export function useRequestAccess() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: api.requestAccess,
    onSuccess: () => client.invalidateQueries({ queryKey: projectKeys.all }),
  });
}

export function useUpdateProject(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<Project>) => api.updateProject(id, patch),
    onSuccess: () => client.invalidateQueries({ queryKey: projectKeys.all }),
  });
}
