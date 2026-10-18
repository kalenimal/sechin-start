import { cn } from '@/shared/lib/cn';
import styles from './ChamferFrame.module.css';

type ChamferFrameProps = {
  /** Design size of the card; the SVG stretches to the real size with a non-scaling stroke. */
  width: number;
  height: number;
  /** Which corners are cut at 45°. */
  corners?: 'br' | 'tl-br';
  cut?: number;
  radius?: number;
  stroke?: string;
  fill?: string;
  dashed?: boolean;
  className?: string;
};

function buildPath(w: number, h: number, corners: 'br' | 'tl-br', c: number, r: number) {
  const tl = corners === 'tl-br';
  return [
    tl ? `M ${c} 0.5` : `M ${r} 0.5`,
    `H ${w - r}`,
    `Q ${w - 0.5} 0.5 ${w - 0.5} ${r}`,
    `V ${h - c}`,
    `L ${w - c} ${h - 0.5}`,
    `H ${r}`,
    `Q 0.5 ${h - 0.5} 0.5 ${h - r}`,
    tl ? `V ${c} Z` : `V ${r} Q 0.5 0.5 ${r} 0.5 Z`,
  ].join(' ');
}

/** Card outline with 45° cut corners used for dashboard project / request cards. Purely decorative. */
export function ChamferFrame({
  width,
  height,
  corners = 'br',
  cut = 36,
  radius = 10,
  stroke = 'var(--color-grey)',
  fill = 'var(--color-white)',
  dashed = false,
  className,
}: ChamferFrameProps) {
  return (
    <svg
      className={cn(styles.frame, className)}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <path
        d={buildPath(width, height, corners, cut, radius)}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        strokeDasharray={dashed ? '16 10' : undefined}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
