import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AUTH_KEY = 'aurex-session';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    const stored = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    if (stored.email === email.trim() && stored.password === password) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ ...stored, loggedIn: true, email: stored.email }));
      navigate('/account');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen py-16 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="font-serif text-3xl font-bold mb-8 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:border-luxury-black focus:ring-1 focus:ring-luxury-black outline-none"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:border-luxury-black focus:ring-1 focus:ring-luxury-black outline-none"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold transition-colors">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account? <Link to="/signup" className="text-luxury-gold hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
