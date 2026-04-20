'use client';

import { FavoriteLaunch } from '@/lib/favorites/types';
import { useFavorites } from '@/hooks/useFavorites';

import styles from './FavoriteButton.module.scss';

type FavoriteButtonProps = {
  launch: FavoriteLaunch;
};

export default function FavoriteButton({ launch }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(launch.id);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => toggleFavorite(launch)}
      aria-pressed={favorite}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
      {favorite ? '★ Saved' : '☆ Save'}
    </button>
  );
}
