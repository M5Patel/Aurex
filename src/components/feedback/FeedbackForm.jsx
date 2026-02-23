import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useToast } from '../layout/ToastProvider';

export default function FeedbackForm({ open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [productFeedback, setProductFeedback] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!open) {
      setSent(false);
      setError('');
    }
  }, [open]);

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
      toast.success({
        title: 'Feedback submitted',
        description: 'Thank you for sharing your thoughts with Aurex.',
      });
      setName('');
      setEmail('');
      setMessage('');
      setProductFeedback('');
    } catch (e) {
      setError(e.message || 'Failed to submit. Try again.');
      toast.error({
        title: 'Feedback failed',
        description: 'Please try again in a moment.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center justify-between bg-luxury-black px-4 py-3 text-white">
              <span className="font-semibold tracking-wide">Share Feedback</span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded p-1 transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white px-4 py-5">
              {sent ? (
                <p className="py-4 text-center font-medium text-luxury-gold">
                  Thank you for your feedback!
                </p>
              ) : (
                <>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-luxury-black focus:ring-1 focus:ring-luxury-black/80"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-luxury-black focus:ring-1 focus:ring-luxury-black/80"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-luxury-black focus:ring-1 focus:ring-luxury-black/80"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">
                      Product feedback (optional)
                    </label>
                    <input
                      type="text"
                      value={productFeedback}
                      onChange={(e) => setProductFeedback(e.target.value)}
                      placeholder="Which product? What did you think?"
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-luxury-black focus:ring-1 focus:ring-luxury-black/80"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-md bg-luxury-black py-3 text-sm font-medium text-white transition hover:bg-luxury-gold disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? 'Sending...' : 'Send Feedback'}
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
