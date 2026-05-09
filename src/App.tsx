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
    function rafLoop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(rafLoop);
    }
    function startRaf() {
      if (rafId) return;
      rafId = requestAnimationFrame(rafLoop);
    }
    function stopRaf() {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    startRaf();

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
    function onVisibility() {
      if (document.hidden) stopRaf();
      else {
        ScrollTrigger.refresh();
        snap();
        startRaf();
      }
    }
    window.addEventListener('load', onLoad, { once: true });
    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        snap();
      }, 160);
    }
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.clearTimeout(resizeTimer);
      stopRaf();
      window.removeEventListener('load', onLoad);
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (prefersReduced) {
      gsap.set('[data-site-nav]', { y: 0, opacity: 1, clearProps: 'transform' });
      gsap.set('.hero-name .hero-char', { y: 0, opacity: 1 });
      gsap.set('.hero-role', { x: 0, opacity: 1 });
      gsap.set('.hero-photo', { scale: 1, opacity: 1 });
      gsap.set('.hero-cta', { y: 0, opacity: 1 });
      return;
    }

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
    <div className="relative min-h-[100svh] min-h-screen font-dm text-foreground">
      <GlobalCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 pt-20 pb-[env(safe-area-inset-bottom,0px)] md:pt-24">
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
