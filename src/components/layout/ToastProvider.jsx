import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const ToastContext = createContext(null);

let idCounter = 0;
const nextId = () => {
  idCounter += 1;
  return idCounter.toString();
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    ({ title, description, type = 'default', duration = 3500 }) => {
      const id = nextId();
      const toast = {
        id,
        title,
        description,
        type,
      };

      setToasts((current) => [...current, toast]);

      if (duration > 0) {
        window.setTimeout(() => {
          remove(id);
        }, duration);
      }
    },
    [remove]
  );

  const success = useCallback(
    (opts) =>
      show({
        type: 'success',
        ...opts,
      }),
    [show]
  );

  const error = useCallback(
    (opts) =>
      show({
        type: 'error',
        ...opts,
      }),
    [show]
  );

  const info = useCallback(
    (opts) =>
      show({
        type: 'info',
        ...opts,
      }),
    [show]
  );

  const value = {
    show,
    success,
    error,
    info,
    remove,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-32 right-4 z-[60] flex w-full max-w-sm flex-col gap-3 sm:bottom-28 sm:right-6">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="pointer-events-auto overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-neutral-900/95 shadow-[0_18px_40px_rgba(0,0,0,0.75)] backdrop-blur-md"
            >
              <div className="flex items-start gap-3 px-4 py-3">
                <div
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    toast.type === 'success'
                      ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]'
                      : toast.type === 'error'
                        ? 'bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]'
                        : toast.type === 'info'
                          ? 'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]'
                          : 'bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.85)]'
                  }`}
                />
                <div className="flex-1">
                  {toast.title && (
                    <p className="font-medium text-[13px] tracking-wide text-white">
                      {toast.title}
                    </p>
                  )}
                  {toast.description && (
                    <p className="mt-1 text-[12px] text-gray-300">
                      {toast.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(toast.id)}
                  aria-label="Dismiss notification"
                  className="ml-1 rounded-full p-1 text-gray-400 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/60 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent opacity-80" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

