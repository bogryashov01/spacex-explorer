import styles from './ErrorState.module.scss';

type ErrorStateProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
};

export default function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.error} role="alert">
      <h2 className={styles.title}>{title}</h2>
      {description ?
        <p className={styles.description}>{description}</p>
      : null}

      {onRetry ?
        <button type="button" onClick={onRetry} className={styles.button}>
          Retry
        </button>
      : null}
    </div>
  );
}
