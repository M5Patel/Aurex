import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useToast } from '../components/layout/ToastProvider';

const MOCK_COUPONS = [
  { code: 'AUREX10', type: 'percent', value: 10 },
  { code: 'FLAT200', type: 'fixed', value: 200 },
];

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getDiscount, getTotal, coupon, setCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const toast = useToast();

  const applyCoupon = () => {
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const found = MOCK_COUPONS.find((c) => c.code === code);
    if (found) {
      setCoupon(found);
      toast.success({ title: 'Coupon applied', description: `Saved on your order` });
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

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
                  <p className="font-semibold mt-1">₹{((item.discountPrice ?? item.price ?? 0) * (item.quantity || 1)).toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="w-8 h-8 border flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                    <span className="w-8 text-center">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="w-8 h-8 border flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.info({
                      title: 'Removed from cart',
                      description: item.name,
                    });
                  }}
                  className="text-gray-400 transition hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-6 lg:sticky lg:top-32">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <p className="flex justify-between text-sm text-gray-600">Subtotal <span>₹{getSubtotal().toLocaleString('en-IN')}</span></p>
            {coupon && (
              <div className="mt-2 flex items-center justify-between text-sm text-emerald-600">
                <span className="flex items-center gap-1"><Tag className="h-4 w-4" /> Discount ({coupon.code})</span>
                <div className="flex items-center gap-2">
                  <span>-₹{getDiscount().toLocaleString('en-IN')}</span>
                  <button type="button" onClick={removeCoupon} className="text-gray-500 hover:text-red-500 text-xs">Remove</button>
                </div>
              </div>
            )}
            {!coupon && (
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                  placeholder="Coupon code"
                  className="flex-1 rounded border border-gray-200 px-3 py-2 text-sm"
                />
                <button type="button" onClick={applyCoupon} className="rounded bg-luxury-black px-4 py-2 text-sm text-white hover:bg-luxury-gold">Apply</button>
              </div>
            )}
            {couponError && <p className="mt-1 text-xs text-red-600">{couponError}</p>}
            <p className="flex justify-between font-semibold text-lg mt-6 pt-4 border-t border-gray-200">Total <span>₹{getTotal().toLocaleString('en-IN')}</span></p>
            <Link to="/checkout" className="mt-6 block w-full py-3 text-center font-medium text-white bg-luxury-black hover:bg-luxury-gold transition-colors">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
