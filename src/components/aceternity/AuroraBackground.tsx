import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/** Aceternity-style subtle animated aurora (gold + blue, no violet). */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      aria-hidden
    >
      <motion.div
        className="absolute -left-1/2 top-0 h-[120vh] w-[200%] opacity-40 blur-3xl"
        animate={{ x: ['-10%', '10%', '-10%'], y: ['0%', '5%', '0%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 30% 20%, rgba(74, 158, 255, 0.22), transparent), radial-gradient(ellipse 45% 35% at 70% 60%, rgba(232, 213, 176, 0.14), transparent)',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[70vh] w-[70vw] max-w-4xl rounded-full opacity-30 blur-[64px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, rgba(74, 158, 255, 0.35), transparent 65%)',
        }}
      />
      <motion.div
        className="absolute -bottom-20 right-0 h-[60vh] w-[60vw] max-w-3xl rounded-full opacity-25 blur-[56px]"
        animate={{ scale: [1.05, 1, 1.05] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, rgba(232, 213, 176, 0.22), transparent 70%)',
        }}
      />
    </div>
  );
}
