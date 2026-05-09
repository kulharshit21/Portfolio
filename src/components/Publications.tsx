import React, { useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { useGSAP, gsap, ScrollTrigger } from '../lib/gsapSetup';
import {
  cn,
  sectionParallaxBg,
  sectionShell,
  sectionTitleMargin,
} from '../lib/utils';
import { bindSectionHeadingReveal, bindSectionParallax } from '../lib/sectionGsap';

interface Publication {
  id: number;
  title: string;
  venue: string;
  date: string;
  statusLabel: string;
  statusVariant: 'published' | 'accepted';
}

const publications: Publication[] = [
  {
    id: 1,
    title:
      'Enhancing Efficiency of Wind Farm Energy using Digital Twin Technology',
    venue: 'IEEE ICCCNT 2024',
    date: 'Jun 2024',
    statusLabel: '✅ Published — IEEE',
    statusVariant: 'published',
  },
  {
    id: 2,
    title:
      'HybridDR-Net: Bidirectional Cross-Attention Fusion for Multi-Stage Diabetic Retinopathy Grading',
    venue: 'HCSET 2026, Dhanalakshmi Srinivasan University',
    date: '2026',
    statusLabel: '🕐 Accepted & Presented — Proceedings Awaited',
    statusVariant: 'accepted',
  },
];

const statusPillClass: Record<Publication['statusVariant'], string> = {
  published:
    'border-emerald-500/50 bg-emerald-500/15 text-emerald-100',
  accepted:
    'border-amber-500/50 bg-amber-500/15 text-amber-100',
};

const Publications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      bindSectionParallax(section);
      bindSectionHeadingReveal(section);

      const line = section.querySelector('.timeline-line') as HTMLElement | null;
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }

      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll('.timeline-card')
      );

      cards.forEach((card, i) => {
        const x = i % 2 === 0 ? -48 : 48;
        gsap.set(card, { x, opacity: 0 });

        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(card, {
              x: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          },
        });
      });

      for (let i = 1; i < cards.length; i++) {
        const prev = cards[i - 1];
        const cur = cards[i];
        gsap.to(prev, {
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: cur,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="publications"
      className={cn(
        'publications-section relative overflow-x-hidden',
        sectionShell
      )}
    >
      <div className={sectionParallaxBg} aria-hidden />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(sectionTitleMargin, 'text-center md:text-left')}>
          <h2 className="section-heading font-display text-3xl font-normal md:text-4xl">
            <span className="relative inline-block">
              Publications
              <span className="heading-underline absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
            </span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl pb-16 pt-2">
          <div
            className="pointer-events-none absolute bottom-0 left-[1.25rem] top-0 z-0 w-px overflow-hidden md:left-5"
            aria-hidden
          >
            <div className="timeline-line h-full w-full origin-top bg-accent-2/40" />
          </div>

          <div className="relative z-10 flex flex-col gap-8 md:gap-10">
            {publications.map((pub, i) => (
              <div
                key={pub.id}
                className="timeline-card sticky rounded-xl border border-border bg-surface/90 p-5 pl-8 shadow-sm backdrop-blur-sm md:pl-10"
                style={{
                  top: `calc(5rem + ${i * 20}px)`,
                  zIndex: i + 1,
                }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 hidden shrink-0 rounded-lg border border-border/70 bg-bg/50 p-2 sm:block">
                      <BookOpen
                        className="h-5 w-5 text-accent-2"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-normal leading-snug text-foreground md:text-xl">
                        {pub.title}
                      </h3>
                      <p className="mt-2 font-dm text-sm text-accent-2">
                        {pub.venue}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {pub.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'inline-flex w-fit shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] leading-tight md:text-xs',
                      statusPillClass[pub.statusVariant]
                    )}
                  >
                    {pub.statusLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
