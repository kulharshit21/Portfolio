import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn, motionEase } from '../../lib/utils';

/** Aceternity-style card: radial glow tracks cursor on hover + lift. */
export function CardHoverGlow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: motionEase }}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border bg-surface',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(232, 213, 176, 0.14), rgba(74, 158, 255, 0.06) 40%, transparent 55%)`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
