'use client';

import Link from 'next/link';

import ErrorState from '@/components/common/ErrorState/ErrorState';
import EmptyState from '@/components/common/EmptyState/EmptyState';

import { useLaunchDetails } from '@/hooks/useLaunchDetails';

import styles from './LaunchDetailsView.module.scss';

type LaunchDetailsViewProps = {
  id: string;
};

function formatLaunchDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(date));
}

function getLaunchStatus(upcoming: boolean, success: boolean | null): string {
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

export default function LaunchDetailsView({ id }: LaunchDetailsViewProps) {
  const { launchQuery, rocketQuery, launchpadQuery } = useLaunchDetails(id);

  const { data: launch, isLoading, isError, refetch } = launchQuery;
  const { data: rocket } = rocketQuery;
  const { data: launchpad } = launchpadQuery;

  if (isLoading) {
    return <p className={styles.message}>Loading launch details...</p>;
  }

  if (isError) {
    return <ErrorState title="Failed to load launch details" description="Please try again." onRetry={() => refetch()} />;
  }

  if (!launch) {
    return <EmptyState title="Launch not found" description="The requested launch could not be loaded." />;
  }

  const status = getLaunchStatus(launch.upcoming, launch.success);
  const images = launch.links.flickr?.original ?? [];

  return (
    <section className={styles.wrapper}>
      <Link href="/" className={styles.backLink}>
        ← Back to launches
      </Link>
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <h1 className={styles.title}>{launch.name}</h1>
          <span className={styles.badge}>{status}</span>
        </div>

        <p className={styles.date}>{formatLaunchDate(launch.date_utc)}</p>

        <p className={styles.details}>{launch.details?.trim() || 'No mission details available.'}</p>
      </header>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Launch Links</h2>

          <ul className={styles.links}>
            {launch.links.article ?
              <li>
                <a href={launch.links.article} target="_blank" rel="noreferrer">
                  Article
                </a>
              </li>
            : null}

            {launch.links.wikipedia ?
              <li>
                <a href={launch.links.wikipedia} target="_blank" rel="noreferrer">
                  Wikipedia
                </a>
              </li>
            : null}

            {launch.links.webcast ?
              <li>
                <a href={launch.links.webcast} target="_blank" rel="noreferrer">
                  Webcast
                </a>
              </li>
            : null}

            {!launch.links.article && !launch.links.wikipedia && !launch.links.webcast ?
              <li>No external links available.</li>
            : null}
          </ul>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Rocket</h2>

          {rocket ?
            <div className={styles.metaBlock}>
              <p>
                <strong>Name:</strong> {rocket.name}
              </p>
              <p>
                <strong>Type:</strong> {rocket.type}
              </p>
              <p>
                <strong>Company:</strong> {rocket.company}
              </p>
              <p>
                <strong>Country:</strong> {rocket.country}
              </p>
              <p>{rocket.description}</p>
            </div>
          : <p className={styles.muted}>Rocket information unavailable.</p>}
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Launchpad</h2>

          {launchpad ?
            <div className={styles.metaBlock}>
              <p>
                <strong>Name:</strong> {launchpad.full_name}
              </p>
              <p>
                <strong>Location:</strong> {launchpad.locality}, {launchpad.region}
              </p>
              <p>{launchpad.details}</p>
            </div>
          : <p className={styles.muted}>Launchpad information unavailable.</p>}
        </article>
      </div>

      <section className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>Gallery</h2>

        {images.length > 0 ?
          <div className={styles.gallery}>
            {images.map((imageUrl) => (
              <img key={imageUrl} src={imageUrl} alt={`${launch.name} gallery`} className={styles.galleryImage} />
            ))}
          </div>
        : <p className={styles.muted}>No gallery images available.</p>}
      </section>
    </section>
  );
}
