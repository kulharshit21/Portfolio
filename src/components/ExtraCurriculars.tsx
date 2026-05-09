import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, CheckCircle } from 'lucide-react';
import { cn, motionEase, sectionShell, sectionTitleMargin, viewportOnce } from '../lib/utils';

const ExtraCurriculars: React.FC = () => {
  return (
    <section id="extra-curriculars" className={sectionShell}>
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
            Extra-Curricular Activities
            <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
          </span>
        </motion.h2>

        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: motionEase }}
              className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm"
            >
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-border/80 p-4">
                  <Trophy size={32} className="text-accent-2" />
                </div>
              </div>
              <h3 className="mb-4 font-display text-xl font-normal text-foreground">
                Sports
              </h3>
              <ul className="space-y-2 font-dm text-foreground/90">
                <li className="flex items-center justify-center">
                  <CheckCircle size={16} className="mr-2 text-accent" />
                  Badminton
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle size={16} className="mr-2 text-accent" />
                  Cricket
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle size={16} className="mr-2 text-accent" />
                  Chess
                </li>
              </ul>
              <p className="mt-4 font-dm text-muted">
                Active participation in college sports events and tournaments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: motionEase, delay: 0.06 }}
              className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm"
            >
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-border/80 p-4">
                  <Users size={32} className="text-accent-2" />
                </div>
              </div>
              <h3 className="mb-4 font-display text-xl font-normal text-foreground">
                Clubs & Organizations
              </h3>
              <p className="mb-4 font-dm text-muted">ISTE Student Chapter Member</p>
              <div className="space-y-2 font-dm text-foreground/90">
                <p>Active participation in technical events and workshops.</p>
                <p>Networking and learning from industry professionals.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: motionEase, delay: 0.12 }}
              className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm"
            >
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-border/80 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent-2"
                  >
                    <path d="M12 2L4 10l2 2 6-6 6 6 2-2-8-8z"></path>
                    <path d="M4 22V14"></path>
                    <path d="M20 22V14"></path>
                    <path d="M12 14v8"></path>
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-xl font-normal text-foreground">
                Interests
              </h3>
              <p className="mb-4 font-dm text-muted">
                Interest in team-based strategic activities
              </p>
              <div className="space-y-2 font-dm text-foreground/90">
                <p>Collaborative problem-solving and strategic planning.</p>
                <p>Enjoying the challenges of team coordination and execution.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraCurriculars;
