import React, { useEffect, useState } from 'react';
import { getLenisScrollY, subscribeLenisScroll } from '../lib/lenisRoot';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = getLenisScrollY();
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setScrollProgress(Number.isFinite(progress) ? progress : 0);
    };

    handleScroll();
    const unsubLenis = subscribeLenisScroll(handleScroll);
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      unsubLenis();
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-border/50">
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-2 to-accent transition-[width] duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
