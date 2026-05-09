import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { motionEase } from '../lib/utils';
import {
  getLenisScrollY,
  lenisScrollToTop,
  subscribeLenisScroll,
} from '../lib/lenisRoot';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(getLenisScrollY() > 500);
    };

    toggleVisibility();
    const unsub = subscribeLenisScroll(toggleVisibility);
    return () => unsub();
  }, []);

  const scrollToTop = () => {
    lenisScrollToTop();
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3, ease: motionEase }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full border border-border bg-surface p-4 text-accent-2 shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default BackToTop;
