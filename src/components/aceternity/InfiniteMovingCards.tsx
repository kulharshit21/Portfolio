import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface MovingCardItem {
  title: string;
  subtitle?: string;
}

/** Aceternity-style infinite horizontal marquee. */
export function InfiniteMovingCards({
  items,
  direction = 'left',
  className,
  cardClassName,
}: {
  items: MovingCardItem[];
  direction?: 'left' | 'right';
  className?: string;
  cardClassName?: string;
}) {
  const doubled = [...items, ...items];
  const duration = Math.max(18, items.length * 2.2);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]',
        className
      )}
    >
      <motion.div
        className="flex w-max gap-[1.1rem] py-1"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: { duration, repeat: Infinity, ease: 'linear' },
        }}
      >
        {doubled.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className={cn(
              'shrink-0 rounded-lg border border-border bg-surface/90 px-[1.375rem] py-[0.825rem] shadow-sm backdrop-blur-sm',
              cardClassName
            )}
          >
            <p className="font-mono text-[0.9625rem] font-medium leading-snug text-foreground">
              {item.title}
            </p>
            {item.subtitle ? (
              <p className="mt-1 font-mono text-[0.825rem] text-muted">{item.subtitle}</p>
            ) : null}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
