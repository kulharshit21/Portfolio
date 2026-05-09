import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Layers,
  FolderKanban,
  Briefcase,
  BadgeCheck,
  GraduationCap,
  BookOpen,
  Trophy,
  BookMarked,
  Mail,
  FileText,
} from 'lucide-react';
import { motionEase, cn } from '../lib/utils';
import {
  getLenisScrollY,
  lenisScrollToElement,
  subscribeLenisScroll,
} from '../lib/lenisRoot';

type NavItem = {
  label: string;
  /** Shorter text for the desktop pill (avoids wrap); falls back to `label`. */
  navShort?: string;
  target: string;
  Icon: typeof Home;
};

const navItems: readonly NavItem[] = [
  { label: 'Home', target: '#home', Icon: Home },
  { label: 'Skills', target: '#skills', Icon: Layers },
  { label: 'Projects', target: '#projects', Icon: FolderKanban },
  { label: 'Experience', target: '#experience', Icon: Briefcase },
  {
    label: 'Certificates',
    navShort: 'Certs',
    target: '#certifications',
    Icon: BadgeCheck,
  },
  { label: 'Education', target: '#education', Icon: GraduationCap },
  { label: 'Publications', target: '#publications', Icon: BookOpen },
  {
    label: 'Activities',
    target: '#extra-curriculars',
    Icon: Trophy,
  },
  { label: 'References', target: '#references', Icon: BookMarked },
  { label: 'Contact', target: '#contact', Icon: Mail },
];

/** IDs in scroll order; scroll-spy picks the last one whose top we've passed. */
const NAV_SECTION_IDS = navItems.map((item) =>
  item.target.replace('#', '')
) as readonly string[];

/** ~fixed header + padding so the labeled section matches what the user sees. */
const SCROLL_ACTIVE_OFFSET_PX = 112;

const resumeUrl =
  'https://drive.google.com/file/d/1-mk6PvKIvfkX3H4VDd8DaGOC3oGzlkwp/view?usp=sharing';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollRaf = useRef(0);
  const sectionBoundsRef = useRef<{ id: string; top: number }[]>([]);

  const toggleMenu = () => setIsOpen((o) => !o);

  const rebuildSectionBounds = useCallback(() => {
    const scrollY = getLenisScrollY();
    sectionBoundsRef.current = NAV_SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return { id, top: Number.POSITIVE_INFINITY };
      return { id, top: el.getBoundingClientRect().top + scrollY };
    });
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const y = getLenisScrollY() + SCROLL_ACTIVE_OFFSET_PX;
    let current = NAV_SECTION_IDS[0];
    const cached = sectionBoundsRef.current;
    const useCache =
      cached.length === NAV_SECTION_IDS.length &&
      cached.every((b) => b.top !== Number.POSITIVE_INFINITY);

    if (useCache) {
      for (const { id, top } of cached) {
        if (y >= top) current = id;
      }
    } else {
      const scrollY = getLenisScrollY();
      for (const id of NAV_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (y >= top) current = id;
      }
    }
    setActiveSection((prev) => (prev === current ? prev : current));
  }, []);

  const scheduleActiveFromScroll = useCallback(() => {
    if (scrollRaf.current) return;
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = 0;
      updateActiveFromScroll();
    });
  }, [updateActiveFromScroll]);

  useEffect(() => {
    rebuildSectionBounds();
    updateActiveFromScroll();

    const unsubLenis = subscribeLenisScroll(() => scheduleActiveFromScroll());

    let resizeDebounce = 0;
    const onResize = () => {
      window.clearTimeout(resizeDebounce);
      resizeDebounce = window.setTimeout(() => {
        rebuildSectionBounds();
        scheduleActiveFromScroll();
      }, 120);
    };
    window.addEventListener('resize', onResize, { passive: true });

    const raf0 = requestAnimationFrame(() => {
      rebuildSectionBounds();
      requestAnimationFrame(() => {
        rebuildSectionBounds();
        updateActiveFromScroll();
      });
    });

    const tLazyA = window.setTimeout(() => {
      rebuildSectionBounds();
      updateActiveFromScroll();
    }, 650);
    const tLazyB = window.setTimeout(() => {
      rebuildSectionBounds();
      updateActiveFromScroll();
    }, 1500);

    return () => {
      cancelAnimationFrame(raf0);
      window.clearTimeout(resizeDebounce);
      window.clearTimeout(tLazyA);
      window.clearTimeout(tLazyB);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
      unsubLenis();
      window.removeEventListener('resize', onResize);
    };
  }, [
    rebuildSectionBounds,
    scheduleActiveFromScroll,
    updateActiveFromScroll,
  ]);

  const scrollToSection = useCallback(
    (target: string) => {
      const id = target.replace(/^#/, '');
      setActiveSection(id);
      setIsOpen(false);
      lenisScrollToElement(target, { offset: -SCROLL_ACTIVE_OFFSET_PX });
      rebuildSectionBounds();
      [90, 280, 600, 1100].forEach((ms) =>
        window.setTimeout(() => {
          rebuildSectionBounds();
          updateActiveFromScroll();
        }, ms)
      );
    },
    [rebuildSectionBounds, updateActiveFromScroll]
  );

  const overlayVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.25, ease: motionEase },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
        ease: motionEase,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: motionEase },
    },
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 flex justify-center pt-4 md:pt-6 pointer-events-none">
        <nav
          data-site-nav
          className="pointer-events-auto flex w-[calc(100%-1rem)] max-w-[min(100rem,calc(100vw-1rem))] items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-2 py-2 shadow-xl backdrop-blur-xl sm:gap-2.5 sm:px-3 md:py-2.5 lg:gap-3 lg:px-4"
          aria-label="Main navigation"
        >
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 pl-1.5 font-display text-base text-foreground sm:text-lg md:text-xl"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
          >
            Portfolio<span className="text-accent-2">.</span>
          </motion.a>

          <ul className="hidden min-h-[2.5rem] min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 md:flex md:justify-center lg:gap-1">
            {navItems.map((item) => {
              const active =
                activeSection === item.target.replace('#', '');
              const linkText = item.navShort ?? item.label;
              return (
                <li key={item.target} className="shrink-0">
                  <motion.a
                    href={item.target}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={cn(
                      'flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-2 font-dm text-[11px] font-medium sm:px-2.5 sm:text-xs',
                      'lg:gap-2 lg:px-2.5 lg:text-sm',
                      active
                        ? 'bg-accent-2/15 text-accent-2 shadow-[inset_0_0_0_1px_rgba(74,158,255,0.28)]'
                        : 'text-foreground/75 hover:bg-border/50 hover:text-foreground'
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.target);
                    }}
                    title={item.label}
                  >
                    <item.Icon
                      className="h-3.5 w-3.5 shrink-0 opacity-90 lg:h-4 lg:w-4"
                      strokeWidth={2}
                    />
                    <span className="hidden lg:inline">{linkText}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 pr-0.5 sm:gap-2 sm:pr-1">
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-accent-2/35 bg-gradient-to-br from-accent-2/15 to-accent/10 px-2.5 py-2 font-dm text-xs font-semibold text-foreground shadow-md sm:inline-flex sm:px-3"
              title="Harshit Kulkarni – View Resume"
              aria-label="View Resume (opens in new tab)"
            >
              <FileText className="h-3.5 w-3.5 shrink-0 text-accent-2" strokeWidth={2} />
              Resume
            </motion.a>

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              className="rounded-full p-2 text-muted md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-30 bg-bg/90 backdrop-blur-md md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        className={cn(
          'fixed right-0 top-0 z-40 h-full w-[min(20rem,88vw)] border-l border-border bg-surface/95 shadow-2xl backdrop-blur-xl md:hidden',
          !isOpen && 'pointer-events-none'
        )}
        initial={false}
        animate={{
          x: isOpen ? 0 : '100%',
          transition: { duration: 0.4, ease: motionEase },
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto px-5 pb-8 pt-24">
          <motion.ul
            className="flex flex-col gap-1"
            variants={listVariants}
            initial="hidden"
            animate={isOpen ? 'show' : 'hidden'}
          >
            {navItems.map((item) => {
              const active =
                activeSection === item.target.replace('#', '');
              return (
                <motion.li key={item.label} variants={itemVariants}>
                  <motion.a
                    href={item.target}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3.5 font-dm text-base font-medium',
                      active
                        ? 'bg-accent-2/15 text-accent-2 shadow-[inset_0_0_0_1px_rgba(74,158,255,0.22)]'
                        : 'text-foreground hover:bg-border/60'
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.target);
                    }}
                  >
                    <item.Icon className="h-5 w-5 opacity-80" />
                    {item.label}
                  </motion.a>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            className="mt-8 border-t border-border pt-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 12,
              transition: { delay: 0.15, duration: 0.4, ease: motionEase },
            }}
          >
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="block rounded-xl bg-accent-2 py-3.5 text-center font-dm font-medium text-bg"
            >
              View Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
