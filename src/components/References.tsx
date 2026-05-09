import React, { useRef } from 'react';
import { User, Mail, Linkedin } from 'lucide-react';
import { useGSAP, gsap } from '../lib/gsapSetup';
import {
  cn,
  sectionParallaxBg,
  sectionShell,
  sectionTitleMargin,
} from '../lib/utils';
import { bindSectionHeadingReveal, bindSectionParallax } from '../lib/sectionGsap';

const References: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      bindSectionParallax(section);
      bindSectionHeadingReveal(section);
      gsap.from(section.querySelectorAll('.ref-card'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
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
      id="references"
      className={cn('references-section relative overflow-hidden', sectionShell)}
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
            References
            <span className="heading-underline absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
          </span>
        </h2>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="ref-card overflow-hidden rounded-xl border border-border bg-surface shadow-md">
            <div className="p-8">
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-border/60 md:mx-0">
                  <User size={48} className="text-accent-2" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-1 font-display text-xl font-normal text-foreground">
                    Dr. Bakkialakshmi V. S
                  </h3>
                  <p className="mb-4 font-dm text-muted">
                    Assistant Professor, SRM Institute of Science and Technology
                  </p>

                  <div className="space-y-2 font-dm">
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                      <Mail size={18} className="text-accent-2" />
                      <a
                        href="mailto:bakkialv@srmist.edu.in"
                        className="text-accent-2 hover:underline"
                      >
                        bakkialv@srmist.edu.in
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                      <Linkedin size={18} className="text-accent-2" />
                      <a
                        href="https://www.linkedin.com/in/bakkialakshmivs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-2 hover:underline"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-dm italic text-muted">&quot;Academic Mentor&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ref-card overflow-hidden rounded-xl border border-border bg-surface shadow-md">
            <div className="p-8">
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-border/60 md:mx-0">
                  <User size={48} className="text-accent-2" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-1 font-display text-xl font-normal text-foreground">
                    Dr. Jesline D
                  </h3>
                  <p className="mb-4 font-dm text-muted">
                    Assistant Professor, SRM Institute of Science and Technology
                  </p>
                  <div className="space-y-2 font-dm">
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                      <Mail size={18} className="text-accent-2" />
                      <a
                        href="mailto:jeslined@srmist.edu.in"
                        className="text-accent-2 hover:underline"
                      >
                        jeslined@srmist.edu.in
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-dm italic text-muted">&quot;Academic Mentor&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
