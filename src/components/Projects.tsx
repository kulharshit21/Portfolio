import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Github } from 'lucide-react';
import { useGSAP, gsap } from '../lib/gsapSetup';
import { CardHoverGlow } from './aceternity/CardHoverGlow';
import { MagneticAnchor } from './MagneticAnchor';
import { portfolioProjects } from '../lib/projectsData';
import { cn, sectionParallaxBg, sectionShell, sectionTitleMargin, motionEase } from '../lib/utils';
import { bindSectionHeadingReveal, bindSectionParallax } from '../lib/sectionGsap';

const projects = portfolioProjects;

function projectGithubHref(link: string): string {
  if (link.startsWith('http://') || link.startsWith('https://')) return link;
  return `https://github.com/kulharshit21/${link}`;
}

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openCaseStudyId, setOpenCaseStudyId] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current || !trackRef.current) return;
      const section = sectionRef.current;
      const container = containerRef.current;
      const track = trackRef.current;

      function scrollAmount() {
        return Math.max(0, track.scrollWidth - container.offsetWidth);
      }

      bindSectionParallax(section);
      bindSectionHeadingReveal(section);

      gsap.from(section.querySelectorAll('.project-card'), {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.to(track, {
        x: () => -scrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top 88px',
          end: () => `+=${scrollAmount() + 120}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cn(
        'projects-section relative overflow-hidden',
        sectionShell
      )}
    >
      <div className={sectionParallaxBg} aria-hidden />
      <div className="relative z-10 container mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className={sectionTitleMargin}>
          <h2 className="section-heading font-display text-3xl font-normal md:text-4xl">
            <span className="relative inline-block">
              Projects
              <span className="heading-underline absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
            </span>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="projects-container relative flex min-h-[min(85vh,760px)] w-full items-center overflow-hidden py-4"
        >
          <div
            ref={trackRef}
            className="projects-track flex w-max flex-nowrap gap-5 md:gap-7 will-change-transform"
          >
            {projects.map((project) => {
              const gh = projectGithubHref(project.githubLink);
              const hasCase = Boolean(project.caseStudy);
              const caseOpen = openCaseStudyId === project.id;
              return (
                <div
                  key={project.id}
                  className="project-card w-[min(88vw,420px)] shrink-0 md:w-[min(72vw,460px)]"
                >
                  <CardHoverGlow className="flex h-full min-h-[460px] flex-col md:min-h-[480px]">
                    <div className="relative h-44 flex-shrink-0 overflow-hidden md:h-48">
                      <img
                        src={project.image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
                        {project.typeBadges.map((b) => (
                          <span
                            key={`${b.emoji}-${b.label}`}
                            className="rounded-full border border-border/80 bg-bg/85 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground shadow-sm backdrop-blur-sm md:text-xs"
                          >
                            {b.emoji} {b.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="mb-1 font-mono text-[11px] text-accent-2 md:text-xs">
                        {project.period ?? '\u00A0'}
                      </p>
                      <h3 className="mb-1.5 font-display text-lg font-normal leading-snug text-foreground md:text-xl">
                        {project.title}
                      </h3>
                      <p className="mb-2 font-dm text-[13px] font-medium leading-snug text-accent-2/95 md:text-sm">
                        {project.outcome}
                      </p>
                      <p className="mb-4 flex-1 font-dm text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>

                      {hasCase ? (
                        <div className="mb-3 border-t border-border/50 pt-3">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenCaseStudyId((prev) =>
                                prev === project.id ? null : project.id
                              )
                            }
                            className="flex w-full items-center justify-between gap-2 rounded-lg border border-border/70 bg-bg/40 px-3 py-2 text-left font-mono text-[11px] font-medium text-foreground transition-colors hover:border-accent-2/40 hover:bg-accent-2/5 md:text-xs"
                            aria-expanded={caseOpen}
                            aria-controls={`case-study-${project.id}`}
                            id={`case-study-trigger-${project.id}`}
                          >
                            <span>Case study snapshot</span>
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 shrink-0 text-accent-2 transition-transform duration-300',
                                caseOpen && 'rotate-180'
                              )}
                              strokeWidth={2}
                              aria-hidden
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {caseOpen && project.caseStudy ? (
                              <motion.div
                                key="panel"
                                id={`case-study-${project.id}`}
                                role="region"
                                aria-labelledby={`case-study-trigger-${project.id}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.35,
                                  ease: motionEase,
                                }}
                                className="overflow-hidden"
                              >
                                <dl className="mt-3 space-y-3 rounded-lg border border-border/40 bg-surface/50 p-3 font-dm text-xs leading-relaxed text-muted md:text-[13px]">
                                  <div>
                                    <dt className="font-semibold text-foreground/90">
                                      Problem
                                    </dt>
                                    <dd className="mt-0.5">
                                      {project.caseStudy.problem}
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="font-semibold text-foreground/90">
                                      Role
                                    </dt>
                                    <dd className="mt-0.5">
                                      {project.caseStudy.role}
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="font-semibold text-foreground/90">
                                      Stack
                                    </dt>
                                    <dd className="mt-0.5">
                                      {project.caseStudy.stack}
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="font-semibold text-foreground/90">
                                      Result
                                    </dt>
                                    <dd className="mt-0.5">
                                      {project.caseStudy.result}
                                    </dd>
                                  </div>
                                </dl>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      ) : null}

                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border/60 bg-border/40 px-2 py-1 font-mono text-xs text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap gap-4">
                        <MagneticAnchor
                          href={gh}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-2"
                          maxOffset={8}
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </MagneticAnchor>
                      </div>
                    </div>
                  </CardHoverGlow>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
