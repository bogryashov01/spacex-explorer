import styles from './page.module.scss';
import LaunchesExplorer from '@/components/launch/LaunchesExplorer/LaunchesExplorer';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>SpaceX Explorer</h1>
          <p className={styles.description}>Explore SpaceX launches with server-side pagination, filtering, and details.</p>
        </header>

        <LaunchesExplorer />
      </div>
    </main>
  );
}
