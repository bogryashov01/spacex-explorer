import FavoritesList from '@/components/favorites/FavoritesList/FavoritesList';

import styles from './page.module.scss';

export default function FavoritesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Favorite Launches</h1>
          <p className={styles.description}>Your saved SpaceX launches are stored locally in your browser.</p>
        </header>

        <FavoritesList />
      </div>
    </main>
  );
}
