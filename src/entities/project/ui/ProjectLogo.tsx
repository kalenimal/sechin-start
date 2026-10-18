import Image from 'next/image';
import { Rocket } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import styles from './ProjectLogo.module.css';

export function ProjectLogo({
  src,
  name,
  size = 44,
  className,
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn(styles.logo, className)} style={{ width: size, height: size }}>
      {src ? <Image src={src} alt={`Логотип ${name}`} width={size} height={size} /> : <Rocket aria-hidden />}
    </span>
  );
}
