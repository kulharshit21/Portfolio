import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/** Ambient aurora + drifting orbs (teal / blue / cream) — tuned to read on #0a0a0a below the fold. */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 90% 65% at 20% -10%, rgba(74, 158, 255, 0.12), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 30%, rgba(20, 184, 166, 0.08), transparent 55%)',
        }}
      />
      <motion.div
        className="absolute -left-1/2 top-0 h-[130vh] w-[220%] blur-3xl"
        animate={{ x: ['-14%', '12%', '-14%'], y: ['0%', '8%', '0%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          opacity: 0.55,
          background:
            'radial-gradient(ellipse 45% 38% at 28% 25%, rgba(74, 158, 255, 0.32), transparent), radial-gradient(ellipse 42% 36% at 72% 55%, rgba(232, 213, 176, 0.2), transparent), radial-gradient(ellipse 35% 30% at 48% 80%, rgba(20, 184, 166, 0.12), transparent)',
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[15%] h-[85vh] w-[85vw] max-w-5xl rounded-full blur-[72px]"
        animate={{ scale: [1, 1.12, 1], x: ['-2%', '4%', '-2%'] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          opacity: 0.45,
          background:
            'radial-gradient(circle, rgba(74, 158, 255, 0.42) 0%, rgba(74, 158, 255, 0.08) 45%, transparent 70%)',
        }}
      />
      <motion.div
        className="absolute -bottom-24 right-[-5%] h-[75vh] w-[70vw] max-w-4xl rounded-full blur-[64px]"
        animate={{ scale: [1.08, 1, 1.08], y: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          opacity: 0.4,
          background:
            'radial-gradient(circle, rgba(232, 213, 176, 0.28) 0%, transparent 68%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[50vh] w-[55vw] -translate-x-1/2 rounded-full blur-[80px]"
        animate={{ opacity: [0.22, 0.38, 0.22], rotate: [0, 6, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.18), transparent 65%)',
        }}
      />
    </div>
  );
}
