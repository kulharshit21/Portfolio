import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const motionEase = [0.22, 1, 0.36, 1] as const;

/** Shared layout: fixed nav offset + tighter vertical rhythm (~½ old py-24). */
export const sectionShell =
  'relative scroll-mt-24 bg-bg py-12 text-foreground md:scroll-mt-28 md:py-14';

export const sectionTitleMargin = 'mb-6 md:mb-7';

export const viewportOnce = { once: true, margin: '-72px' as const };
