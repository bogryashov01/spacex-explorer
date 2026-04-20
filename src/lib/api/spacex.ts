import { fetchJson } from './client';
import { buildLaunchesQuery } from './build-launch-query';

import { Launch, PaginatedResponse, LaunchFilters, Rocket, Launchpad } from './types';

export async function getLaunchesPage(filters: LaunchFilters, page: number): Promise<PaginatedResponse<Launch>> {
  const body = buildLaunchesQuery(filters, page);

  return fetchJson<PaginatedResponse<Launch>>('/launches/query', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function getLaunchById(id: string): Promise<Launch> {
  return fetchJson<Launch>(`/launches/${id}`);
}

export async function getRocketById(id: string): Promise<Rocket> {
  return fetchJson<Rocket>(`/rockets/${id}`);
}

export async function getLaunchpadById(id: string): Promise<Launchpad> {
  return fetchJson<Launchpad>(`/launchpads/${id}`);
}
