import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Heart, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';

const AUTH_KEY = 'aurex-session';
const ORDERS_KEY = 'aurex-orders';

export default function AccountPage() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const wishlistItems = useWishlistStore((s) => s.items);
  const isLoggedIn = session?.loggedIn;
  const [activeTab, setActiveTab] = useState('orders');

  const handleLogout = () => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ ...session, loggedIn: false }));
    navigate('/');
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-20 px-6 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <h1 className="font-serif text-3xl font-bold mb-4">Account</h1>
          <p className="text-gray-500 mb-8">Sign in or create an account to view your orders and profile.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 border border-luxury-black font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-luxury-black text-white font-medium rounded hover:bg-luxury-gold transition-colors"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl font-bold mb-8">My Account</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-56 shrink-0">
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <p className="font-semibold text-gray-900">{session.name || 'User'}</p>
              <p className="text-sm text-gray-500">{session.email}</p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full rounded border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
            <nav className="mt-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition ${
                    activeTab === tab.id ? 'bg-gray-100 font-medium text-luxury-black' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </nav>
          </aside>
          <main className="flex-1 min-w-0">
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-gray-100 bg-white p-6"
              >
                <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
                {orders.length > 0 ? (
                  <ul className="space-y-4">
                    {orders.slice(0, 10).map((o) => (
                      <li
                        key={o.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <span className="font-medium">{o.id}</span>
                          <p className="text-sm text-gray-500">
                            {o.date ? new Date(o.date).toLocaleDateString() : '—'}
                          </p>
                        </div>
                        <span className="font-semibold">₹{o.total?.toLocaleString('en-IN') ?? '—'}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No orders yet. <Link to="/collections" className="text-luxury-gold hover:underline">Start shopping</Link>.</p>
                )}
              </motion.div>
            )}
            {activeTab === 'wishlist' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-gray-100 bg-white p-6"
              >
                <h2 className="font-semibold text-lg mb-4">Wishlist</h2>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {wishlistItems.slice(0, 6).map((p) => (
                      <Link key={p.id} to={`/product/${p.slug}`} className="group">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                          <img
                            src={p.images?.[0] || p.image}
                            alt={p.name}
                            className="h-full w-full object-cover transition group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-2 text-sm font-medium line-clamp-2">{p.name}</p>
                        <p className="text-sm font-semibold text-luxury-gold">₹{p.price?.toLocaleString('en-IN')}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Your wishlist is empty. <Link to="/collections" className="text-luxury-gold hover:underline">Browse watches</Link>.</p>
                )}
                {wishlistItems.length > 0 && (
                  <Link
                    to="/wishlist"
                    className="mt-4 inline-block text-sm font-medium text-luxury-gold hover:underline"
                  >
                    View all ({wishlistItems.length})
                  </Link>
                )}
              </motion.div>
            )}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-gray-100 bg-white p-6"
              >
                <h2 className="font-semibold text-lg mb-4">Saved Addresses</h2>
                <p className="text-gray-500">No saved addresses. Structure ready for API integration.</p>
              </motion.div>
            )}
            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-gray-100 bg-white p-6"
              >
                <h2 className="font-semibold text-lg mb-4">Billing History</h2>
                <p className="text-gray-500">Billing history will appear here. Structure ready for API integration.</p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
