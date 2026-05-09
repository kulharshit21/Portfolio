import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { useGSAP, gsap } from '../lib/gsapSetup';
import { CardHoverGlow } from './aceternity/CardHoverGlow';
import { portfolioProjects } from '../lib/projectsData';
import { cn, sectionParallaxBg, sectionShell, sectionTitleMargin } from '../lib/utils';
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
            {projects.map((project) => (
              <div key={project.id} className="project-card w-[min(88vw,420px)] shrink-0 md:w-[min(72vw,460px)]">
                <CardHoverGlow className="flex h-full min-h-[440px] flex-col">
                  <div className="relative h-44 flex-shrink-0 overflow-hidden md:h-48">
                    <img
                      src={project.image}
                      alt=""
                      className="h-full w-full object-cover"
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
                    <h3 className="mb-2 font-display text-lg font-normal leading-snug text-foreground md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mb-4 flex-1 font-dm text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
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
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href={projectGithubHref(project.githubLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-2"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </motion.a>
                    </div>
                  </div>
                </CardHoverGlow>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
