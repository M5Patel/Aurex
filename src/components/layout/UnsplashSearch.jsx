import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function ImageSkeleton() {
  return (
    <div className="aspect-square bg-gray-200 animate-pulse rounded overflow-hidden" />
  );
}

export default function UnsplashSearch({ isOpen, onClose, onSelect, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounced = useDebounce(query, 400);

  useEffect(() => {
    if (isOpen) setQuery(initialQuery);
  }, [isOpen, initialQuery]);

  const search = useCallback(async () => {
    if (!ACCESS_KEY || !debounced.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(debounced)}&per_page=12&client_id=${ACCESS_KEY}`
      );
      const data = await res.json();
      if (data.errors) throw new Error(data.errors[0]);
      setResults(data.results || []);
    } catch (e) {
      setError(e.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [debounced]);

  useEffect(() => {
    if (debounced.trim()) search();
    else setResults([]);
  }, [debounced, search]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-24 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden max-h-[70vh] flex flex-col"
        >
          <div className="p-4 border-b flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watch images..."
              className="flex-1 outline-none"
              autoFocus
            />
            <button onClick={onClose} aria-label="Close" className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {!ACCESS_KEY && (
              <p className="text-center text-gray-500 py-8">Add VITE_UNSPLASH_ACCESS_KEY to .env to enable image search.</p>
            )}
            {ACCESS_KEY && loading && (
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <ImageSkeleton key={i} />)}
              </div>
            )}
            {ACCESS_KEY && !loading && error && <p className="text-center text-red-600 py-8">{error}</p>}
            {ACCESS_KEY && !loading && !error && results.length === 0 && query && (
              <p className="text-center text-gray-500 py-8">No results found.</p>
            )}
            {ACCESS_KEY && !loading && !error && results.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {results.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => { onSelect(r.urls?.regular || r.urls?.small); onClose(); }}
                    className="aspect-square rounded overflow-hidden bg-gray-100 hover:ring-2 ring-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                  >
                    <img
                      src={r.urls?.thumb || r.urls?.small}
                      alt={r.alt_description || 'Search result'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
