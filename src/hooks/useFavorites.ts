'use client';

import { useCallback, useState } from 'react';

import { getFavoriteLaunches, removeFavoriteLaunch, toggleFavoriteLaunch } from '@/lib/favorites/storage';
import { FavoriteLaunch } from '@/lib/favorites/types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteLaunch[]>(() => getFavoriteLaunches());

  const toggleFavorite = useCallback((launch: FavoriteLaunch) => {
    const nextFavorites = toggleFavoriteLaunch(launch);
    setFavorites(nextFavorites);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    const nextFavorites = removeFavoriteLaunch(id);
    setFavorites(nextFavorites);
  }, []);

  const isFavorite = useCallback((id: string) => favorites.some((launch) => launch.id === id), [favorites]);

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
  };
}
