import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { fetchProductBySlug } from '../utils/api';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlistItems = useWishlistStore((s) => s.items);
  const wishlisted = product ? wishlistItems.some((i) => i.id === product.id) : false;

  useEffect(() => {
    fetchProductBySlug(slug).then(setProduct);
  }, [slug]);

  if (!product) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;

  const images = product.images || [product.image].filter(Boolean);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-500 mb-8"><Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / {product.name}</nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-gray-50"><img src={images[selectedImage] || images[0]} alt={product.name} className="w-full h-full object-cover" /></div>
            <div className="flex gap-2">
              {images.map((img, i) => <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 overflow-hidden border-2 ${selectedImage === i ? 'border-luxury-gold' : 'border-gray-200'}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>)}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-2xl font-bold">₹{product.price?.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && <span className="text-lg text-gray-400 line-through">₹{product.originalPrice?.toLocaleString('en-IN')}</span>}
            </div>
            {product.emi && <p className="text-sm text-gray-500 mt-2">or ₹{product.emi}/Month Buy on EMI</p>}
            {product.description && <p className="mt-6 text-gray-600">{product.description}</p>}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex border border-gray-200">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                <span className="w-12 h-12 flex items-center justify-center border-x border-gray-200">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={() => addItem(product, quantity)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)} className="w-12 h-12 border border-gray-200 flex items-center justify-center"><Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
