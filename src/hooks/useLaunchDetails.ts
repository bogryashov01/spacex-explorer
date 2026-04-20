import { useQuery } from '@tanstack/react-query';

import { getLaunchById, getLaunchpadById, getRocketById } from '@/lib/api/spacex';
import { queryKeys } from '@/lib/query/keys';

export function useLaunchDetails(id: string) {
  const launchQuery = useQuery({
    queryKey: queryKeys.launch(id),
    queryFn: () => getLaunchById(id),
    enabled: Boolean(id),
  });

  const rocketId = launchQuery.data?.rocket;
  const launchpadId = launchQuery.data?.launchpad;

  const rocketQuery = useQuery({
    queryKey: rocketId ? queryKeys.rocket(rocketId) : ['rocket', 'missing'],
    queryFn: () => getRocketById(rocketId as string),
    enabled: Boolean(rocketId),
  });

  const launchpadQuery = useQuery({
    queryKey: launchpadId ? queryKeys.launchpad(launchpadId) : ['launchpad', 'missing'],
    queryFn: () => getLaunchpadById(launchpadId as string),
    enabled: Boolean(launchpadId),
  });

  return {
    launchQuery,
    rocketQuery,
    launchpadQuery,
  };
}
