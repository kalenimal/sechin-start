import styles from './ScoreDonut.module.css';

/** Circular expert score indicator (86 / 100). */
export function ScoreDonut({ score, size = 120, stroke = 16 }: { score: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const length = 2 * Math.PI * radius;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={styles.donut}
      role="img"
      aria-label={`Экспертная оценка ${score} из 100`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-primary-10)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={stroke}
        strokeDasharray={`${(score / 100) * length} ${length}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={styles.progress}
        style={{ '--length': length } as React.CSSProperties}
      />
    </svg>
  );
}
