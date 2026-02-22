import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AUTH_KEY = 'aurex-session';
const ORDERS_KEY = 'aurex-orders';

export default function AccountPage() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const isLoggedIn = session?.loggedIn;

  const handleLogout = () => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ ...session, loggedIn: false }));
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-20 px-6 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <h1 className="font-serif text-3xl font-bold mb-4">Account</h1>
          <p className="text-gray-500 mb-8">Sign in or create an account to view your orders and profile.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="px-8 py-3 border border-luxury-black font-medium hover:bg-gray-50">
              Sign In
            </Link>
            <Link to="/signup" className="px-8 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-8">My Account</h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          <div className="border-b pb-6">
            <h2 className="font-semibold text-lg mb-2">Profile</h2>
            <p className="text-gray-600">{session.name || 'User'}</p>
            <p className="text-gray-600">{session.email}</p>
          </div>
          {orders.length > 0 && (
            <div>
              <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
              <ul className="space-y-3">
                {orders.slice(0, 5).map((o) => (
                  <li key={o.id} className="flex justify-between items-center py-3 border-b">
                    <span className="text-sm font-medium">{o.id}</span>
                    <span className="text-sm text-gray-600">₹{o.total?.toLocaleString('en-IN')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={handleLogout} className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
