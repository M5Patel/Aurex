import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { supabase } from '../../utils/supabase';

export default function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [productFeedback, setProductFeedback] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your name'); return; }
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (!message.trim()) { setError('Please enter your message'); return; }
    setSending(true);
    try {
      if (supabase) {
        const { error: err } = await supabase.from('feedback').insert({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          product_feedback: productFeedback.trim() || null,
        });
        if (err) throw err;
      } else {
        localStorage.setItem('aurex-feedback-pending', JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), productFeedback: productFeedback.trim() }));
      }
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setProductFeedback('');
    } catch (e) {
      setError(e.message || 'Failed to submit. Try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <motion.button
        aria-label="Send feedback"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-24 z-40 w-12 h-12 rounded-full bg-gray-800 text-white shadow-lg
          hover:bg-luxury-gold transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="w-5 h-5" />
      </motion.button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50" onClick={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-luxury-black text-white">
              <span className="font-semibold">Feedback</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 hover:bg-white/10 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {sent ? (
                <p className="text-luxury-gold font-medium text-center py-4">Thank you for your feedback!</p>
              ) : (
                <>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 focus:border-luxury-black outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-200 focus:border-luxury-black outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-200 focus:border-luxury-black outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Product feedback (optional)</label>
                    <input type="text" value={productFeedback} onChange={(e) => setProductFeedback(e.target.value)} placeholder="Which product? What did you think?" className="w-full px-3 py-2 border border-gray-200 focus:border-luxury-black outline-none" />
                  </div>
                  <button type="submit" disabled={sending} className="w-full py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold disabled:opacity-60">
                    {sending ? 'Sending...' : 'Send Feedback'}
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
