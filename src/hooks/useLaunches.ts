import { useInfiniteQuery } from '@tanstack/react-query';

import { getLaunchesPage } from '@/lib/api/spacex';
import { LaunchFilters } from '@/lib/api/types';
import { queryKeys } from '@/lib/query/keys';

export function useLaunches(filters: LaunchFilters) {
  return useInfiniteQuery({
    queryKey: queryKeys.launches(filters),
    queryFn: ({ pageParam = 1 }) => getLaunchesPage(filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? (lastPage.nextPage ?? undefined) : undefined;
    },
  });
}
