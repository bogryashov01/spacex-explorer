'use client';

import Link from 'next/link';

import EmptyState from '@/components/common/EmptyState/EmptyState';
import { useFavorites } from '@/hooks/useFavorites';

import styles from './FavoritesList.module.scss';

function formatLaunchDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

function getLaunchStatus(upcoming: boolean, success: boolean | null) {
  if (upcoming) {
    return 'Upcoming';
  }

  if (success === true) {
    return 'Success';
  }

  if (success === false) {
    return 'Failure';
  }

  return 'Unknown';
}

export default function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <EmptyState title="No favorite launches yet" description="Save launches from the main page to see them here." />;
  }

  return (
    <section className={styles.wrapper} aria-label="Favorite launches">
      <div className={styles.list}>
        {favorites.map((launch) => (
          <article key={launch.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {launch.patchImage ?
                <img src={launch.patchImage} alt={`${launch.name} mission patch`} className={styles.image} />
              : <div className={styles.imagePlaceholder}>No image</div>}
            </div>

            <div className={styles.content}>
              <div className={styles.topRow}>
                <h2 className={styles.title}>{launch.name}</h2>
                <span className={styles.badge}>{getLaunchStatus(launch.upcoming, launch.success)}</span>
              </div>

              <p className={styles.date}>{formatLaunchDate(launch.date_utc)}</p>

              <div className={styles.actions}>
                <Link href={`/launches/${launch.id}`} className={styles.link}>
                  View details
                </Link>

                <button type="button" onClick={() => removeFavorite(launch.id)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
