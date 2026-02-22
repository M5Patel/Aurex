import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { fetchAccessories } from '../utils/api';

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetchAccessories().then((data) => setAccessories(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-12">Watch Accessories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {accessories.map((item) => (
            <div key={item.id}>
              <div className="aspect-square overflow-hidden bg-gray-50"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
              <p className="text-xs text-gray-500 mt-2">{item.brand}</p>
              <p className="font-medium">{item.name}</p>
              <div className="flex gap-2 mt-1"><span className="font-semibold">₹{item.price?.toLocaleString('en-IN')}</span>{item.originalPrice > item.price && <span className="text-sm text-gray-400 line-through">₹{item.originalPrice?.toLocaleString('en-IN')}</span>}</div>
              <button onClick={() => addItem(item)} className="w-full mt-3 py-2 border border-luxury-black text-sm font-medium hover:bg-luxury-black hover:text-white">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
