import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticAnchorProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
  target?: string;
  rel?: string;
  maxOffset?: number;
};

/**
 * Subtle magnetic pull toward pointer (fine pointers only — gated by hover).
 */
export function MagneticAnchor({
  href,
  className,
  children,
  'aria-label': ariaLabel,
  target,
  rel,
  maxOffset = 10,
}: MagneticAnchorProps) {
  const wrap = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22 });
  const springY = useSpring(y, { stiffness: 320, damping: 22 });

  function handleMove(e: React.MouseEvent) {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d = Math.hypot(dx, dy);
    const maxDist = 88;
    if (d > 0.5 && d < maxDist) {
      const t = 1 - d / maxDist;
      x.set((dx / d) * maxOffset * t);
      y.set((dy / d) * maxOffset * t);
    } else {
      x.set(0);
      y.set(0);
    }
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <span
      ref={wrap}
      className="relative inline-flex"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        style={{ x: springX, y: springY }}
        className={className}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      >
        {children}
      </motion.a>
    </span>
  );
}
