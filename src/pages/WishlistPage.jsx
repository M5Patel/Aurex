import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/product/ProductCard';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 px-6 text-center">
        <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" strokeWidth={1} />
        <h1 className="font-serif text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-8">Save items you love by clicking the heart icon</p>
        <Link to="/collections" className="inline-block px-8 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold">
          Shop Watches
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-8">Wishlist ({items.length})</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <ProductCard product={product} />
              <button
                onClick={() => remove(product.id)}
                aria-label="Remove from wishlist"
                className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full shadow-md md:opacity-0 md:group-hover:opacity-100 hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
