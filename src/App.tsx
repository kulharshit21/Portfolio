import { lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, useGSAP } from './lib/gsapSetup';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { GlobalCursor } from './components/GlobalCursor';
import { AuroraBackground } from './components/aceternity/AuroraBackground';

const BelowFold = lazy(() => import('./components/BelowFold'));

function SectionFallback() {
  return <div className="min-h-[min(40vh,320px)] w-full" aria-hidden />;
}

function AppContent() {
  useEffect(() => {
    document.title = 'Harshit Kulkarni | Computer Science Student';
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    ScrollTrigger.refresh();
    function onResize() {
      ScrollTrigger.refresh();
    }
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
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
    <div className="relative min-h-screen font-dm text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0">
        <AuroraBackground className="h-full w-full" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(31, 31, 31, 0.85) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(31, 31, 31, 0.85) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
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
