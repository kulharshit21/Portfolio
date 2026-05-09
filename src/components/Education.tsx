import React, { useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { useGSAP, gsap } from '../lib/gsapSetup';
import {
  cn,
  sectionParallaxBg,
  sectionShell,
  sectionTitleMargin,
} from '../lib/utils';
import { bindSectionHeadingReveal, bindSectionParallax } from '../lib/sectionGsap';

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  score: string;
}

const education: Education[] = [
  {
    id: 1,
    degree: 'B.Tech Computer Science',
    institution: 'SRM Institute of Science and Technology',
    period: '2023 - 2027 (Expected)',
    score: 'CGPA: 8.7',
  },
  {
    id: 2,
    degree: 'Class XII - Karnataka Board (PCMCS)',
    institution: 'Chinmaya College of Science and Commerce, Hubli',
    period: '2021 - 2023',
    score: 'Percentage: 86.7%',
  },
  {
    id: 3,
    degree: 'High School',
    institution: 'Sri Sathya Sai Loka Seva Vidya Kendra',
    period: '2019 - 2021',
    score: 'Score: 86%',
  },
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      bindSectionParallax(section);
      bindSectionHeadingReveal(section);

      gsap.from(section.querySelectorAll('.edu-card'), {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="education"
      className={cn(
        'education-section relative overflow-hidden',
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
            Education
            <span className="heading-underline absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
          </span>
        </h2>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="edu-card glass-card rounded-xl p-5 text-center"
              >
                <GraduationCap
                  size={28}
                  className="mx-auto mb-3 text-accent-2"
                />
                <h3 className="mb-1 font-display text-base font-normal text-foreground">
                  {edu.degree}
                </h3>
                <p className="mb-2 font-dm text-sm text-accent-2">
                  {edu.institution}
                </p>
                <div className="mb-3 flex items-center justify-center font-dm text-xs text-muted">
                  <Calendar size={12} className="mr-1" />
                  {edu.period}
                </div>
                <span className="inline-block rounded-full bg-border/80 px-3 py-1 font-dm text-sm font-semibold text-foreground">
                  {edu.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
