import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useToast } from '../layout/ToastProvider';

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.items.some((i) => i.id === product.id));
  const toast = useToast();

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (wishlisted) {
      toast.info({
        title: 'Removed from wishlist',
        description: product.name,
      });
    } else {
      toast.success({
        title: 'Added to wishlist',
        description: product.name,
      });
    }
  };

  const handleAddToCart = () => {
    addItem(product);
    const removeFromWishlist = useWishlistStore.getState().remove;
    if (wishlisted) removeFromWishlist(product.id);
    toast.success({
      title: 'Added to cart',
      description: product.name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <motion.img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            loading="lazy"
          />
          {product.isNew && (
            <span className="absolute right-3 top-3 bg-luxury-black px-2 py-1 text-xs text-white">
              NEW
            </span>
          )}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute left-3 top-3 rounded-full bg-white/90 p-2 opacity-0 shadow-sm transition-all duration-200 hover:bg-white group-hover:opacity-100"
          >
            <Heart
              className={`h-4 w-4 ${
                wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'
              }`}
            />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">{product.brand}</p>
        <p className="line-clamp-2 font-medium transition-colors group-hover:text-luxury-gold">
          {product.name}
        </p>
        <div className="mt-2 flex gap-2">
          <span className="font-semibold">
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full transform border border-luxury-black py-2.5 text-sm font-medium text-luxury-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-luxury-black hover:text-white group-hover:opacity-100 sm:opacity-0"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
