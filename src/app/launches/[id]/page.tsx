import LaunchDetailsView from '@/components/launch-detail/LaunchDetailsView/LaunchDetailsView';

import styles from './page.module.scss';

type LaunchDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LaunchDetailsPage({ params }: LaunchDetailsPageProps) {
  const { id } = await params;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <LaunchDetailsView id={id} />
      </div>
    </main>
  );
}
