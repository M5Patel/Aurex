import { useMemo, useState, useCallback } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { productMatchesSlug } from '../utils/filterProducts';
import productsData from '../data/products.json';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest' },
];

const GENDERS = [
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'unisex', label: 'Unisex' },
];

const STRAPS = [
  { id: 'silicone', label: 'Silicone' },
  { id: 'steel', label: 'Steel' },
  { id: 'leather', label: 'Leather' },
];

const TYPES = [
  { id: 'analog-digital', label: 'Analog Digital' },
  { id: 'analog', label: 'Analog' },
  { id: 'chronograph', label: 'Chronograph' },
];

const PRICE_RANGES = [
  { id: '0-2000', min: 0, max: 2000, label: 'Under ₹2,000' },
  { id: '2000-3500', min: 2000, max: 3500, label: '₹2,000 – ₹3,500' },
  { id: '3500-5000', min: 3500, max: 5000, label: '₹3,500 – ₹5,000' },
  { id: '5000-99999', min: 5000, max: 99999, label: 'Above ₹5,000' },
];

export default function ProductListingPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const activeCategory = categoryId || searchParams.get('category') || null;

  const genderParam = searchParams.get('gender') || '';
  const strapParam = searchParams.get('strap') || '';
  const typeParam = searchParams.get('type') || '';
  const priceParam = searchParams.get('price') || '';
  const inStockParam = searchParams.get('inStock');
  const ratingParam = searchParams.get('rating');

  const updateParams = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!value) next.delete(key);
        else next.set(key, value);
        return next;
      });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
    setSortBy('featured');
  }, [setSearchParams]);

  const products = useMemo(() => {
    let list = [...productsData];

    if (activeCategory) {
      const slug = activeCategory.toLowerCase().replace(/\s+/g, '-');
      list = list.filter((p) => productMatchesSlug(p, slug));
    }

    if (genderParam) {
      const g = genderParam.toLowerCase();
      list = list.filter((p) => (p.gender ?? '').toLowerCase() === g);
    }

    if (strapParam) {
      const s = strapParam.toLowerCase();
      list = list.filter((p) => (p.strap ?? p.strapType ?? '').toLowerCase() === s);
    }

    if (typeParam) {
      const t = typeParam.toLowerCase();
      list = list.filter((p) => (p.type ?? '').toLowerCase() === t);
    }

    if (priceParam) {
      const range = PRICE_RANGES.find((r) => r.id === priceParam);
      if (range) {
        list = list.filter((p) => {
          const price = p.discountPrice ?? p.price ?? 0;
          return price >= range.min && price < range.max;
        });
      }
    }

    if (inStockParam === 'true') {
      list = list.filter((p) => (p.stock ?? 1) > 0);
    }

    if (ratingParam) {
      const minRating = Number(ratingParam);
      if (!Number.isNaN(minRating)) {
        list = list.filter((p) => (p.rating ?? 0) >= minRating);
      }
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.discountPrice ?? a.price ?? 0) - (b.discountPrice ?? b.price ?? 0));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.discountPrice ?? b.price ?? 0) - (a.discountPrice ?? a.price ?? 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [
    activeCategory,
    genderParam,
    strapParam,
    typeParam,
    priceParam,
    inStockParam,
    ratingParam,
    sortBy,
  ]);

  const pageTitle = (activeCategory || 'All Watches')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const hasActiveFilters =
    genderParam || strapParam || typeParam || priceParam || inStockParam === 'true' || ratingParam;

  return (
    <div className="min-h-screen pt-40 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">{pageTitle}</h1>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-luxury-black"
              >
                <X className="h-4 w-4" /> Clear filters
              </button>
            )}
            <button
              type="button"
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-luxury-gold/60 hover:text-luxury-black lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {filterOpen ? 'Hide filters' : 'Filters'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside
            className={`shrink-0 lg:block ${filterOpen ? 'block' : 'hidden lg:block'}`}
          >
            <div className="sticky top-32 space-y-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:w-64">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Filters
              </h2>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Gender</h3>
                <div className="space-y-2">
                  {GENDERS.map((g) => (
                    <label key={g.id} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        checked={genderParam === g.id}
                        onChange={() => updateParams('gender', genderParam === g.id ? '' : g.id)}
                        className="h-4 w-4 accent-luxury-gold"
                      />
                      <span className="text-sm">{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Strap</h3>
                <div className="space-y-2">
                  {STRAPS.map((s) => (
                    <label key={s.id} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="strap"
                        checked={strapParam === s.id}
                        onChange={() => updateParams('strap', strapParam === s.id ? '' : s.id)}
                        className="h-4 w-4 accent-luxury-gold"
                      />
                      <span className="text-sm">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Type</h3>
                <div className="space-y-2">
                  {TYPES.map((t) => (
                    <label key={t.id} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        checked={typeParam === t.id}
                        onChange={() => updateParams('type', typeParam === t.id ? '' : t.id)}
                        className="h-4 w-4 accent-luxury-gold"
                      />
                      <span className="text-sm">{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Price</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((r) => (
                    <label key={r.id} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="price"
                        checked={priceParam === r.id}
                        onChange={() => updateParams('price', priceParam === r.id ? '' : r.id)}
                        className="h-4 w-4 accent-luxury-gold"
                      />
                      <span className="text-sm">{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={inStockParam === 'true'}
                    onChange={(e) =>
                      updateParams('inStock', e.target.checked ? 'true' : '')
                    }
                    className="h-4 w-4 accent-luxury-gold"
                  />
                  <span className="text-sm">In stock only</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false); }}
                  className="flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm transition hover:border-luxury-gold/60"
                >
                  Sort: {SORT_OPTIONS.find((o) => o.id === sortBy)?.label ?? 'Featured'}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full z-20 mt-1 min-w-[200px] rounded-md border border-gray-100 bg-white py-2 shadow-lg"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.id);
                            setSortOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${
                            sortBy === opt.id ? 'font-medium text-luxury-gold' : 'text-gray-700'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-gray-500">No products found. Try adjusting your filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 text-sm font-medium text-luxury-gold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
