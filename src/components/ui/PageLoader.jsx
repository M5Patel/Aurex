import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_DISPLAY_MS = 600;

export default function PageLoader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const start = Date.now();

        const hide = () => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
            setTimeout(() => setVisible(false), remaining);
        };

        // Hide after DOM is fully ready
        if (document.readyState === 'complete') {
            hide();
        } else {
            window.addEventListener('load', hide, { once: true });
            return () => window.removeEventListener('load', hide);
        }
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="page-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ backgroundColor: '#0e0e0e' }}
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Golden spinner */}
                        <div
                            className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
                            style={{
                                borderTopColor: '#c9a962',
                                borderRightColor: '#c9a962',
                            }}
                        />
                        {/* Brand text */}
                        <span
                            className="text-sm font-medium tracking-[0.3em] uppercase"
                            style={{ color: '#c9a962' }}
                        >
                            AUREX
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
