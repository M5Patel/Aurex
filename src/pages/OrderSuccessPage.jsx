import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const orderId = state?.orderId || 'Your order';

  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6"
        >
          <CheckCircle className="w-12 h-12" strokeWidth={2} />
        </motion.div>
        <h1 className="font-serif text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
        <p className="text-sm text-gray-500 mb-8">Order ID: {orderId}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/collections" className="px-8 py-3 border border-gray-300 font-medium hover:bg-gray-50">
            Continue Shopping
          </Link>
          <Link to="/account" className="px-8 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold">
            View Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
