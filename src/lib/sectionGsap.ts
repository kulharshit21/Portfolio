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
}
