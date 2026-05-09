import React, { lazy, Suspense, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Globe, Mail, Phone } from 'lucide-react';
import HarshitPhoto from '../Harshit Photo.jpg';
import { heroContent } from '../lib/data';
import { cn, motionEase, viewportOnce } from '../lib/utils';
import { lenisScrollToElement, NAV_SCROLL_OFFSET_PX } from '../lib/lenisRoot';

const HeroParticleCanvas = lazy(() =>
  import('./ParticleField').then((m) => ({ default: m.HeroParticleCanvas }))
);

type NamePart = { readonly text: string; readonly emphasized: boolean };
type NameLine = { readonly parts: readonly NamePart[] };

function HeroNameChars({
  lines,
  className,
}: {
  lines: readonly NameLine[];
  className?: string;
}) {
  let charIndex = 0;
  return (
    <div className={cn('leading-none', className)}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="block">
          {line.parts.map((part, partIdx) => (
            <span key={partIdx} className="whitespace-nowrap">
              {[...part.text].map((char) => {
                const i = charIndex++;
                return (
                  <span
                    key={`${lineIdx}-${partIdx}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ height: '1.08em' }}
                  >
                    <span
                      className={cn(
                        'hero-char inline-block',
                        part.emphasized ? 'text-accent-2' : 'text-foreground'
                      )}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function MagneticGetInTouch({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d = Math.hypot(dx, dy);
    const maxDist = 100;
    const maxOffset = 15;
    if (d > 0.5 && d < maxDist) {
      const t = 1 - d / maxDist;
      x.set((dx / d) * maxOffset * t);
      y.set((dy / d) * maxOffset * t);
    } else {
      x.set(0);
      y.set(0);
    }
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      data-magnetic-cta
      className={cn('group/cta relative inline-flex', className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.button
        type="button"
        style={{ x: springX, y: springY }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        onClick={() => {
          lenisScrollToElement('#contact', {
            offset: -NAV_SCROLL_OFFSET_PX,
          });
        }}
        className="magnetic-cta-btn relative overflow-hidden rounded-full bg-accent-2 px-[1.65rem] py-[0.825rem] font-dm text-[1.05rem] font-medium text-bg shadow-md"
        aria-label="Scroll to contact section"
      >
        <span className="relative z-10">{label}</span>
      </motion.button>
    </div>
  );
}

const Hero: React.FC = () => {
  const particleMouse = useRef({ x: 0, y: 0 });

  function onHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    particleMouse.current.x =
      r.width > 0 ? ((e.clientX - r.left) / r.width) * 2 - 1 : 0;
    particleMouse.current.y =
      r.height > 0 ? ((e.clientY - r.top) / r.height) * 2 - 1 : 0;
  }

  return (
    <section
      id="home"
      onMouseMove={onHeroMouseMove}
      className="group/hero relative isolate min-h-[100svh] min-h-screen scroll-mt-24 overflow-hidden bg-bg py-12 font-dm text-foreground sm:py-16 md:scroll-mt-28 md:py-20"
      aria-label="Hero section"
    >
      <Suspense fallback={null}>
        <HeroParticleCanvas mouse={particleMouse} />
      </Suspense>

      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -left-[12%] top-[6%] h-[min(72vh,560px)] w-[min(72vh,560px)] rounded-full opacity-45 blur-[100px]"
          style={{
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.42) 0%, transparent 68%)',
            animation: 'hero-orb-drift-a 60s linear infinite',
          }}
        />
        <div
          className="absolute -right-[8%] bottom-[4%] h-[min(68vh,520px)] w-[min(68vh,520px)] rounded-full opacity-38 blur-[88px]"
          style={{
            background:
              'radial-gradient(circle, rgba(34, 211, 238, 0.32) 0%, transparent 68%)',
            animation: 'hero-orb-drift-b 60s linear infinite',
          }}
        />
        <div
          className="absolute left-[22%] bottom-[18%] h-[min(58vh,480px)] w-[min(58vh,480px)] rounded-full opacity-32 blur-[96px]"
          style={{
            background:
              'radial-gradient(circle, rgba(74, 158, 255, 0.36) 0%, transparent 70%)',
            animation: 'hero-orb-drift-c 60s linear infinite',
          }}
        />
      </div>

      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="hero-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0"
            />
          </filter>
        </defs>
      </svg>
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{ filter: 'url(#hero-noise)' }}
      />
      <div className="pointer-events-none hero-vignette absolute inset-0 z-[2]" aria-hidden />

      <a
        href="#skills"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent-2 focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to main content
      </a>

      <div className="hero-chromatic-wrap relative z-10 container mx-auto flex min-h-[calc(100svh-6rem)] min-h-[calc(100vh-6rem)] max-w-site flex-col px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-8 xl:gap-10">
          <div className="min-w-0">
            <div className="flex gap-5 md:gap-6">
              <motion.div
                className="mt-[0.35em] w-px shrink-0 origin-top bg-accent-2"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.85,
                  ease: motionEase,
                  delay: 0.12,
                }}
                style={{ height: 'clamp(5rem, 18vw, 10.75rem)' }}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <h1 className="hero-name font-display text-[clamp(2.475rem,5.5vw,4.675rem)] font-normal leading-[1.08] tracking-tight sm:text-[clamp(2.75rem,5.72vw,4.95rem)]">
                  <HeroNameChars
                    lines={heroContent.nameLines}
                    className="leading-[1.08]"
                  />
                </h1>

                <p className="hero-role mt-5 max-w-2xl text-left text-[1.1rem] text-muted sm:text-[1.24rem] md:mt-6 md:text-[1.375rem]">
                  {heroContent.role}
                </p>

                <div className="hero-cta mt-8 flex flex-wrap gap-4 md:mt-9">
                  <MagneticGetInTouch label={heroContent.getInTouchLabel} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:items-center lg:justify-center">
            <div className="hero-photo relative">
              <div className="relative size-[min(14.25rem,48vw)] md:size-[16.5rem] lg:size-[18rem] xl:size-[19.25rem]">
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_42px_rgba(20,184,166,0.18)]"
                  style={{
                    background:
                      'conic-gradient(from 90deg, rgba(56,189,248,0.82), rgba(34,211,238,0.55), rgba(74,158,255,0.88), rgba(56,189,248,0.82))',
                    WebkitMask:
                      'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2.5px))',
                    mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2.5px))',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  aria-hidden
                />
                <div
                  className="absolute inset-[3px] z-[1] rounded-full bg-bg"
                  aria-hidden
                />
                <TiltPortraitInner
                  alt={heroContent.portraitAlt}
                  src={HarshitPhoto}
                />
              </div>
            </div>
          </div>
        </div>

        <motion.a
          href="#skills"
          className="mb-8 mt-2 inline-flex flex-col items-center gap-1 self-start text-muted lg:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: motionEase, delay: 1.55 }}
          aria-label="Scroll to skills"
        >
          <motion.span
            animate={{
              opacity: [0.4, 1, 0.4],
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="h-8 w-8 text-accent-2/90" strokeWidth={2} />
          </motion.span>
        </motion.a>

        <motion.div
          className="relative z-10 mt-4 max-w-5xl px-0 md:mt-8"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: motionEase }}
        >
          <div className="rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-md sm:p-8">
            <h2 className="mb-6 text-center font-display text-2xl font-normal text-foreground">
              <span className="relative inline-block">
                About Me
                <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
              </span>
            </h2>

            <div className="space-y-6">
              <div>
                <p className="mb-4 text-foreground/90 leading-[1.65]">
                  Pre-final year Computer Science student focused on AI/ML,
                  software development, and cloud-backed applications. Experienced
                  in building projects involving machine learning, computer vision,
                  backend APIs, databases, and full-stack systems.
                </p>

                <div className="mt-6 space-y-2 text-foreground/90 leading-relaxed">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-accent-2" />
                    <span>Chennai, Tamil Nadu 603203</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-accent-2" />
                    <a
                      href="mailto:hk0534@srmist.edu.in"
                      className="text-accent-2 hover:underline"
                    >
                      hk0534@srmist.edu.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-accent-2" />
                    <a
                      href="mailto:kulharshit21@gmail.com"
                      className="text-accent-2 hover:underline"
                    >
                      kulharshit21@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-accent-2" />
                    <a
                      href="tel:+918310381878"
                      className="text-accent-2 hover:underline"
                    >
                      +91 8310381878
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="mr-1 self-center text-xs uppercase tracking-wider text-muted">
                    Languages:
                  </span>
                  <span className="rounded-full bg-border/80 px-3 py-1 font-dm text-sm text-foreground">
                    English <span className="text-accent-2">· Professional</span>
                  </span>
                  <span className="rounded-full bg-border/80 px-3 py-1 font-dm text-sm text-foreground">
                    Kannada <span className="text-accent-2">· Native</span>
                  </span>
                  <span className="rounded-full bg-border/80 px-3 py-1 font-dm text-sm text-foreground">
                    Hindi <span className="text-accent-2">· Professional</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <motion.a
                  href="https://github.com/kulharshit21"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-border"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/harshit-kulkarni-4a6554276"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-2"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-bg"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.researchgate.net/profile/Harshit-Kulkarni-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-2/90"
                  aria-label="ResearchGate"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-bg"
                  >
                    <path d="M19.586 0c-2.183 0-4.226 1.6-4.226 5.337 0 1.7.362 2.808 1.088 3.562.485.483 1.18.703 2.115.703 1.63 0 2.83-1.146 3.578-2.1l.19-.296-.946-.946-.177.304c-.466.774-1.15 1.384-1.702 1.384-.292 0-.457-.143-.58-.291-.4-.483-.596-1.415-.596-2.32 0-2.336.887-3.387 2.256-3.387.792 0 1.402.236 1.775.825.26.416.293.965.293 1.24 0 .132-.007.252-.01.344l-.16.601h1.742v-1.5c0-1.099-.458-2.012-1.282-2.563C20.39.238 19.416 0 18.584 0h1.002zM4.164 4.997c-2.724 0-4.164 1.433-4.164 4.325 0 2.537 1.234 4.328 3.16 4.328.755 0 1.738-.428 2.435-1.268v.998h1.574V4.997H4.164zm11.768 0c-.802 0-1.436.371-1.918 1.144V4.997h-1.72v8.653h1.72v-4.4c0-.962.601-2.337 1.404-2.337.185 0 .358.046.52.153.364.21.536.613.536 1.28v5.304h1.657V8.21c0-2.113-1.042-3.213-2.2-3.213zM4.59 6.424h1.433c.185 1.262.822 3.084 2.121 4.628l.922.994.922-.994c1.299-1.294 1.936-3.116 2.121-4.628H13.5c-.256 1.674-1.226 3.805-2.698 5.248l2.51 3.072h-1.881l-1.581-1.912-1.548 1.912H6.421l2.51-3.072c-1.471-1.444-2.442-3.574-2.698-5.248h-1.26l-0.383-.1z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://scholar.google.com/citations?user=vNAKXr8AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-2/90"
                  aria-label="Google Scholar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-bg"
                  >
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function TiltPortraitInner({ alt, src }: { alt: string; src: string }) {
  const rotateX = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 });
  const shadowX = useSpring(0, { stiffness: 200, damping: 25 });
  const shadowY = useSpring(0, { stiffness: 200, damping: 25 });

  const imgShadow = useMotionTemplate`${shadowX}px ${shadowY}px 42px rgba(20, 184, 166, 0.22), 0 18px 36px rgba(0, 0, 0, 0.5)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(-px * 24);
    rotateX.set(py * 24);
    shadowX.set(-px * 22);
    shadowY.set(py * 18);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    shadowX.set(0);
    shadowY.set(0);
  }

  return (
    <motion.div
      className="absolute inset-[3px] z-[2] cursor-default overflow-hidden rounded-full"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 960,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className="size-full object-cover object-[center_18%]"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{ boxShadow: imgShadow }}
      />
    </motion.div>
  );
}

export default Hero;
