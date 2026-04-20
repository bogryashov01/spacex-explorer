'use client';

import { useMemo, useState } from 'react';

import LaunchFilters from '@/components/launch/LaunchFilters/LaunchFilters';
import LaunchList from '@/components/launch/LaunchList/LaunchList';
import { defaultLaunchFilters } from '@/lib/api/constants';
import { LaunchFilters as LaunchFiltersType } from '@/lib/api/types';
import { useDebounce } from '@/hooks/useDebounce';

import styles from './LaunchesExplorer.module.scss';

export default function LaunchesExplorer() {
  const [filters, setFilters] = useState<LaunchFiltersType>(defaultLaunchFilters);

  const debouncedSearch = useDebounce(filters.search, 400);

  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  return (
    <section className={styles.wrapper}>
      <LaunchFilters filters={filters} onChange={setFilters} />
      <LaunchList filters={effectiveFilters} />
    </section>
  );
}
