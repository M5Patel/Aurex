import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.items.some((i) => i.id === product.id));

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group" whileHover={{ y: -4 }}>
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <motion.img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} loading="lazy" />
          {product.isNew && <span className="absolute top-3 right-3 bg-luxury-black text-white text-xs px-2 py-1">NEW</span>}
          <button onClick={handleWishlist} aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} className="absolute top-3 left-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100"><Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} /></button>
        </div>
        <p className="text-xs text-gray-500 mt-2">{product.brand}</p>
        <p className="font-medium group-hover:text-luxury-gold line-clamp-2">{product.name}</p>
        <div className="flex gap-2 mt-2">
          <span className="font-semibold">₹{product.price?.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice?.toLocaleString('en-IN')}</span>}
        </div>
      </Link>
      <button onClick={() => addItem(product)} className="w-full mt-3 py-2.5 border border-luxury-black text-sm font-medium hover:bg-luxury-black hover:text-white transition-colors opacity-0 group-hover:opacity-100">Add to Cart</button>
    </motion.div>
  );
}
