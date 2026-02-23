import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Tag,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const AUTH_KEY = 'aurex-session';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ ...session, loggedIn: false }));
    navigate('/login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'inventory', label: 'Inventory', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="border-b border-gray-100 p-6">
            <h2 className="font-serif text-xl font-bold text-luxury-black">Aurex Admin</h2>
            <p className="mt-1 text-xs text-gray-500">{session.email || 'Admin'}</p>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                  activeTab === tab.id ? 'bg-luxury-black text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="border-t border-gray-100 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-luxury-black">
            {tabs.find((t) => t.id === activeTab)?.label ?? 'Dashboard'}
          </h1>
          <Link to="/" className="text-sm text-luxury-gold hover:underline">Back to Store</Link>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Orders', value: '—', sub: 'Ready for API' },
              { label: 'Revenue', value: '₹—', sub: 'Ready for API' },
              { label: 'Products', value: '—', sub: 'Ready for API' },
              { label: 'Feedback', value: '—', sub: 'Ready for API' },
            ].map((card) => (
              <div key={card.label} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="mt-2 text-2xl font-bold text-luxury-black">{card.value}</p>
                <p className="mt-1 text-xs text-gray-400">{card.sub}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-500">Add / Edit / Delete products. Structure ready for API integration.</p>
            <button type="button" className="mt-4 rounded bg-luxury-black px-4 py-2 text-sm text-white hover:bg-luxury-gold">
              Add Product
            </button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-500">Manage orders. Structure ready for API integration.</p>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-500">Create and manage discount coupons. Structure ready for API integration.</p>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-500">View customer feedback from Supabase. Structure ready for API integration.</p>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-500">Inventory overview. Structure ready for API integration.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-gray-500">Admin settings. Structure ready for API integration.</p>
          </div>
        )}
      </main>
    </div>
  );
}
