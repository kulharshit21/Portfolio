import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Page-wide cursor: large teal blob (spring) + small dot (instant).
 */
export function GlobalCursor() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const blobX = useSpring(0, { stiffness: 80, damping: 20 });
  const blobY = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const x = e.clientX;
      const y = e.clientY;
      dotX.set(x);
      dotY.set(y);
      blobX.set(x - 200);
      blobY.set(y - 200);
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [blobX, blobY, dotX, dotY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    >
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          x: blobX,
          y: blobY,
          background:
            'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        className="absolute h-3 w-3 rounded-full bg-teal-400/80 mix-blend-screen"
        style={{ x: dotX, y: dotY, marginLeft: -6, marginTop: -6 }}
      />
    </div>
  );
}
