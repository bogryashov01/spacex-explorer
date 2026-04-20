import Link from 'next/link';

import FavoriteButton from '@/components/favorites/FavoriteButton/FavoriteButton';
import { Launch } from '@/lib/api/types';
import { FavoriteLaunch } from '@/lib/favorites/types';

import styles from './LaunchCard.module.scss';

type LaunchCardProps = {
  launch: Launch;
};

function formatLaunchDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

function getLaunchStatus(launch: Launch) {
  if (launch.upcoming) {
    return 'Upcoming';
  }

  if (launch.success === true) {
    return 'Success';
  }

  if (launch.success === false) {
    return 'Failure';
  }

  return 'Unknown';
}

export default function LaunchCard({ launch }: LaunchCardProps) {
  const image = launch.links.patch?.small ?? null;
  const status = getLaunchStatus(launch);

  const favoriteLaunch: FavoriteLaunch = {
    id: launch.id,
    name: launch.name,
    date_utc: launch.date_utc,
    success: launch.success,
    upcoming: launch.upcoming,
    patchImage: image,
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ?
          <img src={image} alt={`${launch.name} mission patch`} className={styles.image} />
        : <div className={styles.imagePlaceholder}>No image</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>{launch.name}</h2>
          <span className={styles.badge}>{status}</span>
        </div>

        <p className={styles.date}>{formatLaunchDate(launch.date_utc)}</p>

        <p className={styles.details}>{launch.details?.trim() || 'No details available for this launch.'}</p>

        <div className={styles.actions}>
          <Link href={`/launches/${launch.id}`} className={styles.link}>
            View details
          </Link>

          <FavoriteButton launch={favoriteLaunch} />
        </div>
      </div>
    </article>
  );
}
