import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

export default function OrderFailurePage() {
  const { state } = useLocation();
  const reason = state?.reason || 'Payment could not be completed';

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
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-6"
        >
          <XCircle className="w-12 h-12" strokeWidth={2} />
        </motion.div>
        <h1 className="font-serif text-3xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-8">{reason}. Please try again or use a different payment method.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/checkout" className="px-8 py-3 border border-luxury-black font-medium rounded hover:bg-gray-50 transition-colors">
            Try Again
          </Link>
          <Link to="/cart" className="px-8 py-3 bg-luxury-black text-white font-medium rounded hover:bg-luxury-gold transition-colors">
            Back to Cart
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
