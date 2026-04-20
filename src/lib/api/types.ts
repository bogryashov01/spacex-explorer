export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  rocket: string;
  launchpad: string;
  links: {
    patch?: {
      small?: string | null;
      large?: string | null;
    };
    article?: string | null;
    wikipedia?: string | null;
    webcast?: string | null;
    flickr?: {
      original: string[];
    };
  };
};

export type Rocket = {
  id: string;
  name: string;
  type: string;
  description: string;
  company: string;
  country: string;
};

export type Launchpad = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  details: string;
};

export type PaginatedResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type LaunchStatusFilter = 'all' | 'upcoming' | 'past';
export type LaunchSuccessFilter = 'all' | 'success' | 'failure';
export type LaunchSortField = 'date_utc' | 'name';
export type SortOrder = 'asc' | 'desc';

export type LaunchFilters = {
  status: LaunchStatusFilter;
  success: LaunchSuccessFilter;
  search: string;
  from?: string;
  to?: string;
  sortBy: LaunchSortField;
  sortOrder: SortOrder;
};
