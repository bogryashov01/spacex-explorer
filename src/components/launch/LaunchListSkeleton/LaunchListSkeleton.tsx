import styles from './LaunchListSkeleton.module.scss';

type LaunchListSkeletonProps = {
  count?: number;
};

export default function LaunchListSkeleton({ count = 6 }: LaunchListSkeletonProps) {
  return (
    <div className={styles.list} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.content}>
            <div className={styles.title} />
            <div className={styles.meta} />
            <div className={styles.line} />
            <div className={styles.lineShort} />
          </div>
        </div>
      ))}
    </div>
  );
}
