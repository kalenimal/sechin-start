import styles from './FundingProgress.module.css';

type FundingProgressProps = {
  progress: number;
  caption: string;
};

export function FundingProgress({ progress, caption }: FundingProgressProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span>Собрано инвестиций</span>
        <span className={styles.caption}>{caption}</span>
      </div>
      <div className={styles.row}>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Собрано инвестиций"
        >
          <span className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.value}>{progress}%</span>
      </div>
    </div>
  );
}
