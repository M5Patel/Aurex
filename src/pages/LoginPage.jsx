import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '../components/layout/ToastProvider';

const AUTH_KEY = 'aurex-session';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState({ email: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    const stored = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    if (stored.email === email.trim() && stored.password === password) {
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ ...stored, loggedIn: true, email: stored.email })
      );
      toast.success({
        title: 'Welcome back',
        description: 'You are now signed in to Aurex.',
      });
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
      toast.error({
        title: 'Login failed',
        description: 'Please check your email and password.',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200"
          alt="Luxury watch"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <p className="text-luxury-gold text-sm font-medium tracking-widest uppercase">Aurex</p>
          <h2 className="font-serif text-2xl font-bold mt-2">Timeless Elegance</h2>
          <p className="text-gray-300 text-sm mt-1 max-w-sm">Sign in to manage your orders, wishlist, and account.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="font-serif text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-500 text-sm mb-8">Welcome back to Aurex</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused((f) => ({ ...f, email: true }))}
                onBlur={() => setFocused((f) => ({ ...f, email: false }))}
                className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 ${
                  focused.email || email ? 'border-luxury-black ring-2 ring-luxury-black/20' : 'border-gray-200 focus:border-luxury-black'
                }`}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused((f) => ({ ...f, password: true }))}
                  onBlur={() => setFocused((f) => ({ ...f, password: false }))}
                  className={`w-full rounded-lg border px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 ${
                    focused.password || password ? 'border-luxury-black ring-2 ring-luxury-black/20' : 'border-gray-200 focus:border-luxury-black'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-luxury-black py-3 font-medium text-white transition hover:bg-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500 uppercase">Or continue with</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Facebook
            </button>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-luxury-gold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
