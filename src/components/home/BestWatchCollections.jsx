import { useRef, useState, useEffect, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import LazyImage from '../ui/LazyImage';

// --- INDIVIDUAL PRODUCT CARD (memoized) ---
const ProductCard = memo(function ProductCard({ p, addItem }) {
  const [imgIndex, setImgIndex] = useState(0);

  const images = p.images?.length > 0 ? p.images : (p.image ? [p.image] : []);

  useEffect(() => {
    if (images.length <= 1) return;

    const autoPlayInterval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(autoPlayInterval);
  }, [images.length]);

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    addItem(p);
  }, [addItem, p]);

  return (
    <div className="w-[260px] md:w-[280px] flex-shrink-0 snap-start flex flex-col group/card relative">
      <Link to={`/product/${p.slug}`} className="block relative">

        {/* Gray Image Box */}
        <div className="relative aspect-[4/5] bg-[#F7F7F7] overflow-hidden flex items-center justify-center p-4">

          {/* Crossfading Images with LazyImage */}
          <div className="w-full h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <LazyImage
                  src={images[imgIndex]}
                  alt={`${p.name} view ${imgIndex + 1}`}
                  width={p.width || 800}
                  height={p.height || 1000}
                  className="w-full h-full object-contain object-center drop-shadow-sm"
                  containerClassName="w-full h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fixed Indicator Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full shadow-sm transition-all duration-500 ${idx === imgIndex ? 'w-4 bg-[#222222]' : 'w-1.5 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          )}

          {/* Corner Badge */}
          {p.badge && (
            <span className="absolute top-0 right-0 bg-[#333333] text-white text-[10px] md:text-[11px] font-medium tracking-[0.15em] px-3 py-1.5 z-20 uppercase">
              {p.badge}
            </span>
          )}

          {/* Hover Add to Cart Bar */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-in-out z-30">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-[#333333] hover:bg-black text-white text-[13px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center"
            >
              Add to cart
            </button>
          </div>
        </div>

        {/* Text Details */}
        <div className="mt-5 text-center px-2">
          <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mb-1.5 font-medium">
            {p.brand || 'AUREX'}
          </p>
          <p className="text-[13px] font-medium text-gray-900 uppercase tracking-wide truncate mb-2">
            {p.name}
          </p>
          <div className="flex items-center justify-center gap-2">
            {p.originalPrice > p.price && (
              <span className="text-[13px] text-gray-400 line-through">
                Rs. {p.originalPrice?.toFixed(2)}
              </span>
            )}
            <span className="text-[14px] font-bold text-black tracking-wide">
              Rs. {p.price?.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>

      {/* Mobile Add Button */}
      <button
        onClick={() => addItem(p)}
        className="w-full mt-4 py-3 border border-[#333] text-[#333] text-[12px] font-bold tracking-wider uppercase md:hidden"
      >
        Add to cart
      </button>
    </div>
  );
});

// --- MAIN WRAPPER CONTAINER ---
export default function BestWatchCollections({ products = [] }) {
  const sliderRef = useRef(null);
  const addItem = useCartStore((s) => s.addItem);

  const displayedProducts = products.slice(0, 10);

  const scroll = useCallback((dir) => {
    if (sliderRef.current) {
      const scrollAmount = 304;
      sliderRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">

      {/* Title */}
      <div className="flex flex-col items-center mb-12 px-4">
        <h2 className="text-[16px] md:text-[18px] font-bold text-[#111] uppercase tracking-[0.15em] text-center">
          New Arrivals: Latest Watch Styles
        </h2>
      </div>

      {/* Slider Area */}
      <div className="max-w-[1440px] mx-auto relative group/slider px-4 md:px-20">

        {/* Large Left Arrow */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-4 top-[150px] z-30 w-14 h-14 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex"
        >
          <ChevronLeft className="w-7 h-7 stroke-[1.5]" />
        </motion.button>

        {/* The Scrolling Row */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-10 pt-2 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayedProducts.map((p) => (
            <ProductCard key={p.id} p={p} addItem={addItem} />
          ))}
        </div>

        {/* Large Right Arrow */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-4 top-[150px] z-30 w-14 h-14 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex"
        >
          <ChevronRight className="w-7 h-7 stroke-[1.5]" />
        </motion.button>

      </div>
    </section>
  );
}