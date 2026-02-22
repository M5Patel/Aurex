import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 px-6 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/collections" className="inline-block mt-8 px-8 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold">Shop Watches</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-12">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 py-6 border-b">
                <div className="w-24 h-24 shrink-0 overflow-hidden bg-gray-100"><img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="font-semibold mt-1">₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="w-8 h-8 border flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                    <span className="w-8 text-center">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="w-8 h-8 border flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 h-fit">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <p className="flex justify-between font-semibold text-lg mt-6 pt-4 border-t">Total <span>₹{getTotal().toLocaleString('en-IN')}</span></p>
            <Link to="/checkout" className="block w-full mt-6 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
