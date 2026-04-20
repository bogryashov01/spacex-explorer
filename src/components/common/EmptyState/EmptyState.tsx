import styles from './EmptyState.module.scss';

type EmptyStateProps = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <h2 className={styles.title}>{title}</h2>
      {description ?
        <p className={styles.description}>{description}</p>
      : null}
    </div>
  );
}
