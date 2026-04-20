const BASE_URL = 'https://api.spacexdata.com/v4';

type FetchOptions = RequestInit & {
  params?: Record<string, string>;
};

export async function fetchJson<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...rest } = options;

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const search = new URLSearchParams(params);
    url += `?${search.toString()}`;
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...rest,
  });

  if (!response.ok) {
    const error = new Error('API Error') as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return response.json();
}
