import { useEffect, useId, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/**
 * Custom pointer cursor (SVG, crisp on retina) — follows the mouse directly (no spring lag).
 * Subtle motion on the shape only. Disabled on coarse pointers; restores OS cursor.
 */
export function GlobalCursor() {
  const gradId = useId().replace(/:/g, '');
  const [finePointer, setFinePointer] = useState(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = prev;
    };
  }, [finePointer]);

  useEffect(() => {
    if (!finePointer) return;
    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  /* Tip of arrow at (0,0) in viewBox → hotspot matches clientX/Y */
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    >
      <motion.div
        className="absolute left-0 top-0 will-change-transform"
        style={{
          x,
          y,
        }}
      >
        <motion.svg
          width={30}
          height={30}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          style={{
            shapeRendering: 'geometricPrecision',
            transformOrigin: '0 0',
          }}
          initial={false}
          animate={{ scale: [1, 1.025, 1] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <defs>
            <linearGradient
              id={gradId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="50%" stopColor="#2a9fd4" />
              <stop offset="100%" stopColor="#4a9eff" />
            </linearGradient>
          </defs>
          <path
            d="M0.75 0.75 L0.75 21.2 L7.15 14.8 L11.35 24.85 L15.6 22.1 L11.25 12.65 L21.25 12.65 L0.75 0.75 Z"
            fill={`url(#${gradId})`}
            stroke="#e8d5b0"
            strokeWidth={1.15}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{
              filter:
                'drop-shadow(0 1px 2px rgba(0,0,0,0.55)) drop-shadow(0 0 6px rgba(20,184,166,0.35))',
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
