import { LaunchFilters } from './types';

export function buildLaunchesQuery(filters: LaunchFilters, page: number) {
  const query: Record<string, unknown> = {};

  // upcoming / past
  if (filters.status === 'upcoming') {
    query.upcoming = true;
  }

  if (filters.status === 'past') {
    query.upcoming = false;
  }

  // success / failure
  if (filters.success === 'success') {
    query.success = true;
  }

  if (filters.success === 'failure') {
    query.success = false;
  }

  // date range
  if (filters.from || filters.to) {
    query.date_utc = {
      ...(filters.from && { $gte: new Date(filters.from).toISOString() }),
      ...(filters.to && { $lte: new Date(filters.to).toISOString() }),
    };
  }

  // search
  if (filters.search.trim()) {
    query.$text = {
      $search: filters.search.trim(),
    };
  }

  return {
    query,
    options: {
      page,
      limit: 20,
      sort: {
        [filters.sortBy]: filters.sortOrder,
      },
    },
  };
}
