import { gsap } from './gsapSetup';

/** Parallax dot-grid layer inside a section (expects `.section-bg`). */
export function bindSectionParallax(section: HTMLElement) {
  const bg = section.querySelector('.section-bg');
  if (!bg) return;
  gsap.to(bg, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true as const,
    },
  });
}

/** Subtle underline glow while section scrolls into view (skipped if reduced motion). */
function bindHeadingUnderlineScrub(section: HTMLElement) {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }
  const underlines = section.querySelectorAll('.heading-underline');
  if (!underlines.length) return;
  gsap.fromTo(
    underlines,
    {
      filter: 'brightness(1)',
      boxShadow: '0 0 0 rgba(74, 158, 255, 0)',
    },
    {
      filter: 'brightness(1.12)',
      boxShadow: '0 0 22px rgba(74, 158, 255, 0.28)',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 38%',
        scrub: 0.9,
      },
    }
  );
}

/** `.section-heading` + `.heading-underline` one-shot reveal. */
export function bindSectionHeadingReveal(section: HTMLElement) {
  gsap.from(section.querySelectorAll('.section-heading'), {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      once: true,
    },
  });

  gsap.fromTo(
    section.querySelectorAll('.heading-underline'),
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out',
      transformOrigin: 'left center',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
      },
    }
  );

  bindHeadingUnderlineScrub(section);
}
