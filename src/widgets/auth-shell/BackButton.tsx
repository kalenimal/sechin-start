'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/ui/Button';

export function BackButton({ href, className }: { href: string; className?: string }) {
  const router = useRouter();
  if (href !== 'history') {
    return (
      <Button href={href} color="white50" iconLeft={<ChevronLeft aria-hidden />} className={className}>
        Назад
      </Button>
    );
  }
  return (
    <Button color="white50" iconLeft={<ChevronLeft aria-hidden />} className={className} onClick={() => router.back()}>
      Назад
    </Button>
  );
}
