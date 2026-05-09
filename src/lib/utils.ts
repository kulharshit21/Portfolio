import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const motionEase = [0.22, 1, 0.36, 1] as const;

/** Shared layout: fixed nav offset + tighter vertical rhythm. Transparent so global ambient bg shows through. */
export const sectionShell =
  'relative scroll-mt-24 py-10 text-foreground sm:py-12 md:scroll-mt-28 md:py-14';

export const sectionTitleMargin = 'mb-6 md:mb-7';

/** Faint parallax dot layer only (global teal grid lives on `body`; keeps sections from feeling empty). */
export const sectionParallaxBg =
  'section-bg pointer-events-none absolute inset-0 -z-0 select-none [background-image:radial-gradient(rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.65]';

export const viewportOnce = { once: true, margin: '-72px' as const };
