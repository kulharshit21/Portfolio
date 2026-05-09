import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { cn, motionEase, sectionShell, sectionTitleMargin, viewportOnce } from '../lib/utils';

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
  return (
    <section id="education" className={sectionShell}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className={cn(
            sectionTitleMargin,
            'text-center font-display text-3xl font-normal md:text-4xl'
          )}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <span className="relative inline-block">
            Education
            <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
          </span>
        </motion.h2>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.65,
                  ease: motionEase,
                  delay: index * 0.08,
                }}
                className="rounded-xl border border-border bg-surface p-5 text-center shadow-md"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
