import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackForm from '../feedback/FeedbackForm';

export default function FloatingButtons() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed bottom-4 right-3 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <ScrollToTopButton positionClass="pointer-events-auto" />
        <motion.button
          type="button"
          aria-label="Open feedback"
          onClick={() => setFeedbackOpen(true)}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96, y: 0 }}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-zinc-900 via-black to-neutral-900 text-white shadow-[0_18px_40px_rgba(0,0,0,0.75)] ring-1 ring-white/5 transition-all duration-300 hover:shadow-[0_22px_50px_rgba(0,0,0,0.9)] hover:ring-luxury-gold/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      </div>
      <FeedbackForm open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}

