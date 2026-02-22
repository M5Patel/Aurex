import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, Banknote } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const ORDERS_KEY = 'aurex-orders';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const total = getTotal();

  if (items.length === 0 && !processing) {
    return (
      <div className="min-h-screen py-20 px-6 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/cart" className="inline-block mt-8 px-8 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold">
          View Cart
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setError('');
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    const order = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      total,
      paymentMethod,
      date: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    clearCart();
    navigate('/order-success', { state: { orderId: order.id } });
  };

  const methods = [
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI / Wallet', icon: Wallet },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
  ];

  return (
    <div className="min-h-screen py-12 px-6">
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
                  className={`w-full flex items-center gap-4 p-4 border-2 text-left transition-colors ${
                    paymentMethod === m.id ? 'border-luxury-black bg-gray-50' : 'border-gray-200'
                  }`}
                >
                  <m.icon className="w-6 h-6 shrink-0" />
                  <span>{m.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between font-semibold text-lg">
              <span>Order Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
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
                <Link to="/cart" className="flex-1 py-3 border border-gray-300 text-center font-medium hover:bg-gray-50">
                  Back to Cart
                </Link>
                <button onClick={handlePlaceOrder} className="flex-1 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold">
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
