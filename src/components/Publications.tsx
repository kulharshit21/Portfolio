import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { cn, motionEase, sectionShell, sectionTitleMargin, viewportOnce } from '../lib/utils';

interface Publication {
  id: number;
  title: string;
  venue: string;
  date: string;
  statusLabel: string;
  statusVariant: 'published' | 'accepted';
}

const publications: Publication[] = [
  {
    id: 1,
    title:
      'Enhancing Efficiency of Wind Farm Energy using Digital Twin Technology',
    venue: 'IEEE ICCCNT 2024',
    date: 'Jun 2024',
    statusLabel: '✅ Published — IEEE',
    statusVariant: 'published',
  },
  {
    id: 2,
    title:
      'HybridDR-Net: Bidirectional Cross-Attention Fusion for Multi-Stage Diabetic Retinopathy Grading',
    venue: 'HCSET 2026, Dhanalakshmi Srinivasan University',
    date: '2026',
    statusLabel: '🕐 Accepted & Presented — Proceedings Awaited',
    statusVariant: 'accepted',
  },
];

const statusPillClass: Record<Publication['statusVariant'], string> = {
  published:
    'border-emerald-500/50 bg-emerald-500/15 text-emerald-100',
  accepted:
    'border-amber-500/50 bg-amber-500/15 text-amber-100',
};

const Publications: React.FC = () => {
  return (
    <section id="publications" className={sectionShell}>
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className={cn(
            sectionTitleMargin,
            'text-center md:text-left'
          )}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <h2 className="font-display text-3xl font-normal md:text-4xl">
            <span className="relative inline-block">
              Publications
              <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.65,
                ease: motionEase,
                delay: index * 0.06,
              }}
              className="rounded-xl border border-border bg-surface/90 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 hidden shrink-0 rounded-lg border border-border/70 bg-bg/50 p-2 sm:block">
                    <BookOpen
                      className="h-5 w-5 text-accent-2"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-normal leading-snug text-foreground md:text-xl">
                      {pub.title}
                    </h3>
                    <p className="mt-2 font-dm text-sm text-accent-2">
                      {pub.venue}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">{pub.date}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'inline-flex w-fit shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] leading-tight md:text-xs',
                    statusPillClass[pub.statusVariant]
                  )}
                >
                  {pub.statusLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
