import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { siteStrip } from '../lib/data';
import { motionEase } from '../lib/utils';

export function CurrentlyBuilding() {
  return (
    <section
      className="border-y border-border/60 bg-surface/40 py-4 backdrop-blur-sm"
      aria-label="Current focus"
    >
      <div className="container mx-auto flex max-w-site flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-center sm:text-left sm:gap-6">
        <motion.div
          className="flex shrink-0 items-center gap-2 font-dm text-xs font-semibold uppercase tracking-wider text-accent-2"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: motionEase }}
        >
          <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden />
          {siteStrip.eyebrow}
        </motion.div>
        <p className="max-w-3xl font-dm text-sm leading-relaxed text-foreground/85">
          {siteStrip.body}
        </p>
      </div>
    </section>
  );
}
