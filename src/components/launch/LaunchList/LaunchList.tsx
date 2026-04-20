'use client';

import EmptyState from '@/components/common/EmptyState/EmptyState';
import ErrorState from '@/components/common/ErrorState/ErrorState';
import LaunchCard from '@/components/launch/LaunchCard/LaunchCard';
import LaunchListSkeleton from '@/components/launch/LaunchListSkeleton/LaunchListSkeleton';

import { useLaunches } from '@/hooks/useLaunches';

import { LaunchFilters } from '@/lib/api/types';

import styles from './LaunchList.module.scss';

type LaunchListProps = {
  filters: LaunchFilters;
};

export default function LaunchList({ filters }: LaunchListProps) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useLaunches(filters);

  const launches = data?.pages.flatMap((page) => page.docs) ?? [];

  if (isLoading) {
    return <LaunchListSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load launches"
        description="Please try again. The SpaceX API may be temporarily unavailable."
        onRetry={() => refetch()}
      />
    );
  }

  if (launches.length === 0) {
    return <EmptyState title="No launches found" description="Try adjusting your search or filters to see more results." />;
  }

  return (
    <section className={styles.wrapper} aria-label="Launches list">
      <div className={styles.list}>
        {launches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>

      {hasNextPage && (
        <div className={styles.actions}>
          <button type="button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className={styles.button}>
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </button>
        </div>
      )}
    </section>
  );
}
