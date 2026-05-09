import React, { useRef } from 'react';
import { InfiniteMovingCards } from './aceternity/InfiniteMovingCards';
import { useGSAP, gsap } from '../lib/gsapSetup';
import {
  cn,
  sectionParallaxBg,
  sectionShell,
  sectionTitleMargin,
} from '../lib/utils';
import { bindSectionHeadingReveal, bindSectionParallax } from '../lib/sectionGsap';

type CategoryRow = { label: string; names: string[]; direction: 'left' | 'right' };

const skillCategories: CategoryRow[] = [
  {
    label: '🤖 AI / ML',
    direction: 'left',
    names: [
      'Python',
      'PyTorch',
      'OpenCV',
      'Deep Learning',
      'Computer Vision',
      'Machine Learning',
      'MLflow',
      'XGBoost',
      'Scikit-learn',
      'Jupyter Notebook',
    ],
  },
  {
    label: '🌐 Full-Stack Development',
    direction: 'right',
    names: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'FastAPI',
      'REST APIs',
    ],
  },
  {
    label: '🗄️ Databases & Cloud',
    direction: 'left',
    names: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Supabase',
      'AWS',
      'Docker',
      'Kafka',
      'Bytewax',
      'Grafana',
    ],
  },
  {
    label: '⚙️ Core CS',
    direction: 'right',
    names: [
      'Python',
      'Java',
      'C++',
      'C',
      'SQL',
      'DSA',
      'OOP',
      'Git',
      'Postman',
    ],
  },
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      bindSectionParallax(section);
      bindSectionHeadingReveal(section);

      gsap.from(section.querySelectorAll('.skill-pill'), {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: { amount: 0.8, from: 'random' },
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={cn(
        'skills-section relative overflow-hidden',
        sectionShell
      )}
    >
      <div className={sectionParallaxBg} aria-hidden />
      <div className="relative z-10 container mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className={cn(sectionTitleMargin, 'text-center md:text-left')}>
          <h2 className="section-heading font-display text-[2.0625rem] font-normal md:text-[2.475rem]">
            <span className="relative inline-block">
              Skills
              <span className="heading-underline absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-9">
          {skillCategories.map((category) => (
            <div key={category.label}>
              <h3 className="mb-[1.1rem] font-dm text-[1.1rem] font-semibold tracking-wide text-foreground">
                {category.label}
              </h3>
              <InfiniteMovingCards
                items={category.names.map((name) => ({ title: name }))}
                direction={category.direction}
                cardClassName="skill-pill"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
