import { FavoriteLaunch } from './types';

const FAVORITES_STORAGE_KEY = 'spacex-favorite-launches';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function getFavoriteLaunches(): FavoriteLaunch[] {
  if (!isBrowser()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue) as FavoriteLaunch[];
  } catch {
    return [];
  }
}

export function saveFavoriteLaunches(favorites: FavoriteLaunch[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function isLaunchFavorite(id: string): boolean {
  const favorites = getFavoriteLaunches();

  return favorites.some((launch) => launch.id === id);
}

export function toggleFavoriteLaunch(launch: FavoriteLaunch): FavoriteLaunch[] {
  const favorites = getFavoriteLaunches();
  const exists = favorites.some((item) => item.id === launch.id);

  const nextFavorites = exists ? favorites.filter((item) => item.id !== launch.id) : [launch, ...favorites];

  saveFavoriteLaunches(nextFavorites);

  return nextFavorites;
}

export function removeFavoriteLaunch(id: string): FavoriteLaunch[] {
  const favorites = getFavoriteLaunches();
  const nextFavorites = favorites.filter((item) => item.id !== id);

  saveFavoriteLaunches(nextFavorites);

  return nextFavorites;
}
