import { useRef } from 'react';
import { useGSAP, gsap } from '../lib/gsapSetup';

/** Glowing gradient line; scaleX 0 → 1 on first scroll into view. */
export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { scaleX: 0, transformOrigin: '50% 50%' });
      gsap.to(el, {
        scaleX: 1,
        duration: 1.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return <div ref={ref} className="section-divider" aria-hidden />;
}
