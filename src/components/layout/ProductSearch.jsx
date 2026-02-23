import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';

/* ── Debounce hook ────────────────────────────────────── */
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* ── Skeleton loader (optional) ───────────────────────── */
function CardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/[0.04] animate-pulse">
      <div className="aspect-square bg-white/[0.06]" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-white/[0.06] rounded w-3/4" />
        <div className="h-3 bg-white/[0.06] rounded w-1/2" />
      </div>
    </div>
  );
}

/* ── Format price ─────────────────────────────────────── */
const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

/* ── Category label prettifier ────────────────────────── */
const prettyCat = (s) =>
  s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/* ── Main Component ───────────────────────────────────── */
export default function ProductSearch({ isOpen, onClose, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  /* sync initialQuery when modal re-opens */
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      /* auto-focus with slight delay for animation */
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen, initialQuery]);

  /* close on ESC */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* body scroll lock */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Filtered products (useMemo) ───────────────────── */
  const filteredProducts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      const hay = [
        p.name,
        p.category,
        p.type,
        p.style,
        p.brand,
        p.description || '',
        p.gender,
        p.strap,
      ]
        .join(' ')
        .toLowerCase();
      return q.split(/\s+/).every((word) => hay.includes(word));
    });
  }, [debouncedQuery]);

  /* ── Navigate to product ───────────────────────────── */
  const handleSelect = useCallback(
    (slug) => {
      navigate(`/product/${slug}`);
      onClose();
    },
    [navigate, onClose],
  );

  /* ── Don't render when closed ──────────────────────── */
  if (!isOpen) return null;

  const showSkeleton = query.trim() && debouncedQuery !== query;
  const showEmpty = debouncedQuery.trim() && !showSkeleton && filteredProducts.length === 0;
  const showResults = filteredProducts.length > 0 && !showSkeleton;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="search-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        key="search-modal"
        initial={{ opacity: 0, y: -30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[85] flex justify-center pt-16 sm:pt-24 px-4"
      >
        <div
          className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[75vh] border border-white/10 shadow-2xl"
          style={{ background: 'linear-gradient(165deg, #111113 0%, #18181b 100%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Search Input Bar ──────────────────────── */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
            <Search className="w-5 h-5 text-amber-400/80 shrink-0" strokeWidth={2.2} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-white text-[15px] placeholder-white/30 outline-none caret-amber-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Clear"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ml-1"
              aria-label="Close search"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>

          {/* ── Results Area ──────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {/* Initial state — no query */}
            {!query.trim() && (
              <p className="text-center text-white/25 text-sm py-12 select-none">
                Start typing to search products…
              </p>
            )}

            {/* Skeleton while debouncing */}
            {showSkeleton && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {showEmpty && (
              <div className="flex flex-col items-center justify-center py-16 gap-3 select-none">
                <SearchX className="w-10 h-10 text-white/15" />
                <p className="text-white/35 text-sm">No products found</p>
              </div>
            )}

            {/* Product results grid */}
            {showResults && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleSelect(product.slug)}
                    className="group text-left rounded-xl overflow-hidden bg-white/[0.04] hover:bg-white/[0.08] border border-transparent hover:border-amber-400/20 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-amber-400/40"
                  >
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden bg-white/[0.03]">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    {/* Product Info */}
                    <div className="p-3 space-y-1.5">
                      <p className="text-white/90 text-[13px] font-medium leading-tight line-clamp-2 group-hover:text-amber-300 transition-colors">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-amber-400 text-sm font-semibold tracking-tight">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-white/25 text-xs line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="inline-block text-[10px] tracking-wider uppercase text-white/30 bg-white/[0.05] px-2 py-0.5 rounded-full">
                        {prettyCat(product.category)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* ── Footer hint ───────────────────────────── */}
          <div className="px-5 py-2.5 border-t border-white/[0.06] flex justify-between text-[11px] text-white/20">
            <span>
              {filteredProducts.length > 0
                ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}`
                : ''}
            </span>
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-white/30 text-[10px] font-mono">ESC</kbd> to close
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
