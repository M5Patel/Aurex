import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); if (email) setSubmitted(true); };

  return (
    <section className="py-20 px-6 bg-luxury-black text-white">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl font-semibold tracking-widest mb-2">GET THE LATEST NEWS</h2>
        <p className="text-sm text-white/80 mb-8">Be the first to receive news on our brand and products.</p>
        {submitted ? <p className="text-luxury-gold font-medium">Thank you for subscribing!</p> : (
          <form onSubmit={handleSubmit} className="flex border border-white/30 rounded overflow-hidden">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-3 bg-transparent text-white placeholder:text-white/50" required />
            <button type="submit" className="px-6 py-3 bg-white/10 hover:bg-luxury-gold transition-colors">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
