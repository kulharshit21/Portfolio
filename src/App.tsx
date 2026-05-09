import { lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, useGSAP } from './lib/gsapSetup';
import { setLenisInstance, snapScrollTop } from './lib/lenisRoot';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { GlobalCursor } from './components/GlobalCursor';

const BelowFold = lazy(() => import('./components/BelowFold'));

function SectionFallback() {
  return <div className="min-h-[min(40vh,320px)] w-full" aria-hidden />;
}

function stripHashOnReload() {
  const nav = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming | undefined;
  if (nav?.type !== 'reload' || !window.location.hash) return;
  history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}`
  );
}

function AppContent() {
  useEffect(() => {
    document.title = 'Harshit Kulkarni | Computer Science Student';
    window.history.scrollRestoration = 'manual';
    stripHashOnReload();
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    setLenisInstance(lenis);
    const snap = () => snapScrollTop();

    snap();
    lenis.on('scroll', ScrollTrigger.update);
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    queueMicrotask(snap);
    requestAnimationFrame(() => {
      snap();
      ScrollTrigger.refresh();
      snap();
      requestAnimationFrame(snap);
    });

    function onLoad() {
      snap();
      ScrollTrigger.refresh();
      snap();
    }
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) snap();
    }
    window.addEventListener('load', onLoad, { once: true });
    window.addEventListener('pageshow', onPageShow);

    function onResize() {
      ScrollTrigger.refresh();
    }
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('resize', onResize);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    gsap
      .timeline()
      .from('[data-site-nav]', {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from(
        '.hero-name .hero-char',
        {
          y: 120,
          opacity: 0,
          duration: 0.9,
          stagger: 0.03,
          ease: 'power4.out',
        },
        '-=0.4'
      )
      .from(
        '.hero-role',
        { x: -40, opacity: 0, duration: 0.7 },
        '-=0.3'
      )
      .from(
        '.hero-photo',
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.5'
      )
      .from(
        '.hero-cta',
        { y: 20, opacity: 0, duration: 0.5 },
        '-=0.2'
      );
  }, []);

  return (
    <div className="relative isolate min-h-screen font-dm text-foreground">
      <div className="ambient-orbs" aria-hidden>
        <div className="ambient-orb ambient-orb--1" />
        <div className="ambient-orb ambient-orb--2" />
        <div className="ambient-orb ambient-orb--3" />
      </div>
      <GlobalCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 pt-20 md:pt-24">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <BelowFold />
        </Suspense>
      </main>
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
