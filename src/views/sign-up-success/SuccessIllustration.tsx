import { Lightbulb, Search, ShieldPlus } from 'lucide-react';
import styles from './SuccessIllustration.module.css';

const lines = [
  { top: 58, left: 120, width: 76 },
  { top: 66, left: 120, width: 37 },
  { top: 74, left: 120, width: 52 },
  { top: 98, left: 80, width: 112 },
  { top: 106, left: 80, width: 82 },
  { top: 114, left: 80, width: 92 },
  { top: 122, left: 80, width: 64 },
  { top: 130, left: 80, width: 103 },
  { top: 138, left: 80, width: 71 },
  { top: 210, left: 80, width: 56 },
  { top: 218, left: 80, width: 39 },
];

/** "Анкета отправлена" document illustration, built from the design primitives. */
export function SuccessIllustration() {
  return (
    <div className={styles.root} aria-hidden>
      <span className={styles.sheet} />
      {lines.map((line) => (
        <span key={`${line.top}-${line.left}`} className={styles.line} style={line} />
      ))}
      <span className={styles.badge}>
        <Lightbulb />
      </span>
      <span className={styles.shield}>
        <ShieldPlus strokeWidth={1.6} />
      </span>
      <span className={styles.search}>
        <Search strokeWidth={2.2} />
      </span>
    </div>
  );
}
