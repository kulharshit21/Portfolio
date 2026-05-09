import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Layers,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Mail,
  FileText,
} from 'lucide-react';
import { motionEase, cn } from '../lib/utils';

const navItems = [
  { label: 'Home', target: '#home', Icon: Home },
  { label: 'Skills', target: '#skills', Icon: Layers },
  { label: 'Projects', target: '#projects', Icon: FolderKanban },
  { label: 'Experience', target: '#experience', Icon: Briefcase },
  { label: 'Education', target: '#education', Icon: GraduationCap },
  { label: 'Contact', target: '#contact', Icon: Mail },
] as const;

const resumeUrl =
  'https://drive.google.com/file/d/1-mk6PvKIvfkX3H4VDd8DaGOC3oGzlkwp/view?usp=sharing';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen((o) => !o);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (target: string) => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

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
          className="pointer-events-auto flex w-[calc(100%-1.5rem)] max-w-5xl items-center justify-between gap-3 rounded-full border border-border/80 bg-surface/75 px-3 py-2 shadow-xl backdrop-blur-xl md:px-4 md:py-2.5"
          aria-label="Main navigation"
        >
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 pl-2 font-display text-lg text-foreground md:text-xl"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
          >
            Portfolio<span className="text-accent-2">.</span>
          </motion.a>

          <ul className="hidden flex-1 items-center justify-center gap-0.5 md:flex lg:gap-1">
            {navItems.map((item) => {
              const active =
                activeSection === item.target.replace('#', '');
              return (
                <li key={item.label}>
                  <motion.a
                    href={item.target}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-2 font-dm text-xs font-medium lg:px-3.5 lg:text-sm',
                      active
                        ? 'bg-accent/15 text-accent'
                        : 'text-muted hover:text-foreground'
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.target);
                    }}
                    title={item.label}
                  >
                    <item.Icon className="h-3.5 w-3.5 shrink-0 opacity-80 lg:h-4 lg:w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2 pr-1">
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="hidden items-center gap-1.5 rounded-full border border-accent/40 bg-gradient-to-br from-accent/25 to-accent-2/20 px-3 py-2 font-dm text-xs font-semibold text-foreground shadow-md md:inline-flex"
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
                        ? 'bg-accent/15 text-accent'
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
