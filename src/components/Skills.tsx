import React from 'react';
import { motion } from 'framer-motion';
import { InfiniteMovingCards } from './aceternity/InfiniteMovingCards';
import { cn, motionEase, sectionShell, sectionTitleMargin, viewportOnce } from '../lib/utils';

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
  return (
    <section id="skills" className={sectionShell}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className={cn(sectionTitleMargin, 'text-center md:text-left')}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <h2 className="font-display text-[2.0625rem] font-normal md:text-[2.475rem]">
            <span className="relative inline-block">
              Skills
              <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-9">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.65,
                ease: motionEase,
                delay: catIdx * 0.05,
              }}
            >
              <h3 className="mb-[1.1rem] font-dm text-[1.1rem] font-semibold tracking-wide text-foreground">
                {category.label}
              </h3>
              <InfiniteMovingCards
                items={category.names.map((name) => ({ title: name }))}
                direction={category.direction}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
