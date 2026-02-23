import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const SHOW_AFTER_PX = 400;
const FOOTER_PROXIMITY_PX = 220;

export default function ScrollToTopButton({ positionClass = 'fixed bottom-6 right-4 sm:right-6 z-40' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportBottom = scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const nearFooter = docHeight - viewportBottom < FOOTER_PROXIMITY_PX;

      setVisible(scrollY > SHOW_AFTER_PX && !nearFooter);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollToTop}
          className={`${positionClass} flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-zinc-900 via-black to-neutral-900 text-white shadow-[0_18px_40px_rgba(0,0,0,0.75)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(0,0,0,0.85)] hover:ring-luxury-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
        >
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
