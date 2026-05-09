import React, { useRef } from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useGSAP, gsap, ScrollTrigger } from '../lib/gsapSetup';
import {
  cn,
  sectionParallaxBg,
  sectionShell,
  sectionTitleMargin,
} from '../lib/utils';
import { bindSectionHeadingReveal, bindSectionParallax } from '../lib/sectionGsap';

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  achievements?: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Research Intern",
    company: "Lights Innovation Lab",
    location: "Online - USA",
    period: "Oct 2024 - Dec 2025",
    description: [
      "Analyzed sleep disorder datasets using Python and statistical methods",
      "Contributed technical sections to research publications on diagnostic models"
    ]
  },
  {
    id: 2,
    role: "Intern",
    company: "RhynoEV",
    location: "Remote",
    period: "Jun 2024 - Aug 2024",
    description: [
      "Developed a WCAG-compliant React app with REST API integration",
      "Collaborated in Agile sprints; reduced bounce rate by ~20%"
    ]
  },
  {
    id: 3,
    role: "Graphics Intern",
    company: "RTips Technology",
    location: "Remote",
    period: "Jun 2025 - Jul 2025",
    description: [
      "Optimized C algorithms, improving execution time by ~15%",
      "Ensured code quality and performance testing for CI/CD integration"
    ]
  }
];

const Experience: React.FC = () => {
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
      id="experience"
      className={cn(
        'experience-section relative overflow-x-hidden',
        sectionShell
      )}
    >
      <div className={sectionParallaxBg} aria-hidden />
      <div className="relative z-10 container mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <h2
          className={cn(
            sectionTitleMargin,
            'section-heading text-center font-display text-3xl font-normal md:text-4xl'
          )}
        >
          <span className="relative inline-block">
            Experience
            <span className="heading-underline absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
          </span>
        </h2>

        <div className="relative mx-auto max-w-3xl pb-16 pt-2">
          <div
            className="pointer-events-none absolute bottom-0 left-[1.25rem] top-0 z-0 w-px overflow-hidden md:left-5"
            aria-hidden
          >
            <div className="timeline-line h-full w-full origin-top bg-accent-2/40" />
          </div>

          <div className="relative z-10 flex flex-col gap-8 md:gap-10">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className="timeline-card sticky rounded-xl border border-border bg-surface p-5 pl-8 shadow-sm md:pl-10"
                style={{
                  top: `calc(5rem + ${i * 20}px)`,
                  zIndex: i + 1,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-lg font-normal text-foreground">
                    {exp.role}
                  </h3>
                  <div className="my-2 flex items-center font-dm text-sm font-medium text-accent-2 sm:my-0">
                    <Calendar size={16} className="mr-1" />
                    {exp.period}
                  </div>
                </div>

                <p className="mt-1 font-dm text-lg font-semibold text-accent-2">
                  {exp.company}
                </p>

                <div className="mb-4 mt-1 flex items-center font-dm text-sm text-muted">
                  <MapPin size={16} className="mr-1" />
                  {exp.location}
                </div>

                <ul className="mt-0 list-none space-y-2 pl-0 font-dm text-foreground/90">
                  {exp.description.map((item, index) => (
                    <li key={index} className="list-none">
                      <div className="flex gap-2">
                        <span
                          className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {exp.achievements && (
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="mb-2 flex items-center font-dm font-medium text-accent">
                      <Award size={18} className="mr-2" />
                      Achievements
                    </div>
                    <ul className="list-none space-y-2 pl-0 font-dm text-foreground/90">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="list-none">
                          <div className="flex gap-2">
                            <span
                              className="mt-[0.55rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1">{achievement}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
