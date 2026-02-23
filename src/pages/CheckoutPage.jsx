import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, Banknote, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useToast } from '../components/layout/ToastProvider';

const ORDERS_KEY = 'aurex-orders';
const SHIPPING_FREE_THRESHOLD = 3000;
const SHIPPING_COST = 99;
const TAX_RATE = 0.05;

const MOCK_COUPONS = [
  { code: 'AUREX10', type: 'percent', value: 10 },
  { code: 'FLAT200', type: 'fixed', value: 200 },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, getDiscount, getTotal, clearCart, coupon, setCoupon } = useCartStore();
  const toast = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = afterDiscount >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const total = afterDiscount + shipping + tax;

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

  if (items.length === 0 && !processing) {
    return (
      <div className="min-h-screen py-20 px-6 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/cart" className="inline-block mt-8 px-8 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold transition-colors rounded">
          View Cart
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setError('');
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    const success = true;
    if (success) {
      const order = {
        id: `ORD-${Date.now()}`,
        items: [...items],
        subtotal,
        discount,
        shipping,
        tax,
        total,
        paymentMethod,
        date: new Date().toISOString(),
      };
      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      orders.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      clearCart();
      toast.success({
        title: 'Order placed',
        description: 'Your Aurex order has been confirmed.',
      });
      navigate('/order-success', { state: { orderId: order.id } });
    } else {
      setError('Payment failed. Please try again.');
      setProcessing(false);
      navigate('/order-failure', { state: { reason: 'Payment declined' } });
    }
  };

  const methods = [
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI / Wallet', icon: Wallet },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>
        <div className="space-y-8">
          <div>
            <h2 className="font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {methods.map((m) => (
                <motion.button
                  key={m.id}
                  type="button"
                  whileHover={{ x: 2 }}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`w-full flex items-center gap-4 p-4 border-2 text-left rounded-lg transition-colors ${
                    paymentMethod === m.id ? 'border-luxury-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <m.icon className="w-6 h-6 shrink-0" />
                  <span>{m.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between text-gray-600">Subtotal <span>₹{subtotal.toLocaleString('en-IN')}</span></p>
              {coupon && (
                <p className="flex justify-between text-emerald-600">
                  <span className="flex items-center gap-1"><Tag className="h-4 w-4" /> Discount ({coupon.code})</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </p>
              )}
              {!coupon && (
                <div className="flex gap-2 py-2">
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
              {couponError && <p className="text-red-600 text-xs">{couponError}</p>}
              <p className="flex justify-between text-gray-600">Tax (GST) <span>₹{tax.toLocaleString('en-IN')}</span></p>
              <p className="flex justify-between text-gray-600">Shipping <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></p>
            </div>
            <p className="flex justify-between font-semibold text-lg mt-6 pt-4 border-t border-gray-200">Total <span>₹{total.toLocaleString('en-IN')}</span></p>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          <AnimatePresence mode="wait">
            {processing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-12 gap-4"
              >
                <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">Processing payment...</p>
              </motion.div>
            ) : (
              <motion.div key="buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4">
                <Link to="/cart" className="flex-1 py-3 border border-gray-300 text-center font-medium rounded hover:bg-gray-50 transition-colors">
                  Back to Cart
                </Link>
                <button onClick={handlePlaceOrder} className="flex-1 py-3 bg-luxury-black text-white font-medium rounded hover:bg-luxury-gold transition-colors">
                  Place Order
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
