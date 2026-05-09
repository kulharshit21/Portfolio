import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/** Cursor-following radial glow (Aceternity Spotlight); pass coords from section `onMouseMove`. */
export function Spotlight({
  mouseX,
  mouseY,
  className,
}: {
  mouseX: number;
  mouseY: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-[1] overflow-hidden',
        className
      )}
      aria-hidden
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(232, 213, 176, 0.14), transparent 55%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(74, 158, 255, 0.08), transparent 45%)`,
        }}
      />
    </div>
  );
}
