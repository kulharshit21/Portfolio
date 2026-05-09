import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award } from 'lucide-react';
import {
  cn,
  motionEase,
  sectionShell,
  sectionTitleMargin,
  viewportOnce,
} from '../lib/utils';

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
  },
  {
    id: 4,
    role: "Hands-on Experience",
    company: "Praya Labs",
    location: "Chennai",
    period: "Oct 2024",
    description: [
      "Built IoT-integrated digital twin prototypes using Unity and sensor data",
      "Improved simulation accuracy"
    ],
    achievements: [
      "Ranked 3rd among 20+ participants"
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className={sectionShell}>
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
            Experience
            <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2"></span>
          </span>
        </motion.h2>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((exp) => (
              <div 
                key={exp.id}
                className="rounded-xl border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-lg font-normal text-foreground">{exp.role}</h3>
                  <div className="my-2 flex items-center font-dm text-sm font-medium text-accent-2 sm:my-0">
                    <Calendar size={16} className="mr-1" />
                    {exp.period}
                  </div>
                </div>
                
                <p className="mt-1 font-dm text-lg font-semibold text-accent-2">{exp.company}</p>
                
                <div className="mb-4 mt-1 flex items-center font-dm text-sm text-muted">
                  <MapPin size={16} className="mr-1" />
                  {exp.location}
                </div>
                
                <ul className="space-y-2 font-dm text-foreground/90">
                  {exp.description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-[0.6rem] mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                {exp.achievements && (
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="mb-2 flex items-center font-dm font-medium text-accent">
                      <Award size={18} className="mr-2" />
                      Achievements
                    </div>
                    <ul className="space-y-2 font-dm text-foreground/90">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-[0.6rem] mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent"></span>
                          {achievement}
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