import { LaunchFilters } from './types';

export const defaultLaunchFilters: LaunchFilters = {
  status: 'all',
  success: 'all',
  search: '',
  from: '',
  to: '',
  sortBy: 'date_utc',
  sortOrder: 'desc',
};
