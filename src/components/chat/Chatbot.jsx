import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const CHAT_STORAGE_KEY = 'aurex-chat-messages';

const MOCK_RESPONSES = [
  "We offer a wide range of luxury watches. Visit our Collections page to explore.",
  "For recommendations, check our New Arrivals or best-selling Blade Dual Time series.",
  "You can track your order from the Account page once logged in.",
  "We ship across India. Delivery typically takes 5-7 business days.",
  "All our watches come with a 2-year warranty. Contact us for service.",
  "Payment options include Card, UPI, and Cash on Delivery at checkout.",
];

function getMockResponse() {
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [{ role: 'assistant', text: 'Hi! How can I help you today? Ask about our watches, recommendations, or navigation.' }];
    } catch {
      return [{ role: 'assistant', text: 'Hi! How can I help you today?' }];
    }
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: getMockResponse() }]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      <motion.button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-40 w-14 h-14 rounded-full bg-luxury-black text-white shadow-luxury-lg
          hover:bg-luxury-gold transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 left-8 z-50 w-[340px] sm:w-[380px] h-[420px] bg-white rounded-lg shadow-luxury-lg border border-gray-100 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-luxury-black text-white">
              <span className="font-semibold">AUREX Assist</span>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 hover:bg-white/10 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <span
                    className={`max-w-[85%] px-3 py-2 rounded-lg ${
                      m.role === 'user' ? 'bg-luxury-black text-white' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {m.text}
                  </span>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              )}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="p-3 border-t flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about watches..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded focus:border-luxury-black focus:ring-1 focus:ring-luxury-black outline-none text-sm"
              />
              <button type="submit" className="p-2 bg-luxury-black text-white rounded hover:bg-luxury-gold">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
