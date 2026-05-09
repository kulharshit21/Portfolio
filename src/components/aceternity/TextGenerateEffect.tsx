import { motion } from 'framer-motion';
import { cn, motionEase } from '../../lib/utils';

type NamePart = { text: string; emphasized: boolean };

type NameLine = { parts: readonly NamePart[] };

/**
 * Aceternity-style text generate: blur → sharp per character with stagger.
 * No typewriter width animation.
 */
export function TextGenerateEffect({
  lines,
  className,
  baseDelay = 0.2,
  stagger = 0.06,
}: {
  lines: readonly NameLine[];
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  let charIndex = 0;

  return (
    <div className={cn('leading-none', className)}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="block">
          {line.parts.map((part, partIdx) => (
            <span key={partIdx} className="whitespace-nowrap">
              {[...part.text].map((char) => {
                const i = charIndex++;
                return (
                  <span
                    key={`${lineIdx}-${partIdx}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ height: '1.08em' }}
                  >
                    <motion.span
                      className={cn(
                        'inline-block',
                        part.emphasized ? 'text-accent-2' : 'text-foreground'
                      )}
                      initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                      }}
                      transition={{
                        duration: 0.55,
                        ease: motionEase,
                        delay: baseDelay + i * stagger,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
