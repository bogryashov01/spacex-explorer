import { ChangeEvent } from 'react';

import { defaultLaunchFilters } from '@/lib/api/constants';
import { LaunchFilters as LaunchFiltersType } from '@/lib/api/types';

import styles from './LaunchFilters.module.scss';

type LaunchFiltersProps = {
  filters: LaunchFiltersType;
  onChange: (filters: LaunchFiltersType) => void;
};

const LaunchFilters = ({ filters, onChange }: LaunchFiltersProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      search: event.target.value,
    });
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      status: event.target.value as LaunchFiltersType['status'],
    });
  };

  const handleSuccessChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      success: event.target.value as LaunchFiltersType['success'],
    });
  };

  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      from: event.target.value,
    });
  };

  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      to: event.target.value,
    });
  };

  const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      sortBy: event.target.value as LaunchFiltersType['sortBy'],
    });
  };

  const handleSortOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      sortOrder: event.target.value as LaunchFiltersType['sortOrder'],
    });
  };

  const handleReset = () => {
    onChange(defaultLaunchFilters);
  };

  return (
    <section className={styles.filters} aria-label="Launch filters">
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Search mission</span>
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search by mission name"
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Status</span>
          <select value={filters.status} onChange={handleStatusChange} className={styles.input}>
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Result</span>
          <select value={filters.success} onChange={handleSuccessChange} className={styles.input}>
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>From</span>
          <input type="date" value={filters.from} onChange={handleFromChange} className={styles.input} />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>To</span>
          <input type="date" value={filters.to} onChange={handleToChange} className={styles.input} />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Sort by</span>
          <select value={filters.sortBy} onChange={handleSortByChange} className={styles.input}>
            <option value="date_utc">Date</option>
            <option value="name">Name</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Sort order</span>
          <select value={filters.sortOrder} onChange={handleSortOrderChange} className={styles.input}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={handleReset} className={styles.button}>
          Reset filters
        </button>
      </div>
    </section>
  );
};

export default LaunchFilters;
