import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const announcements = [
  "Luxury Watches Crafted For Every Moment",
  "Free Shipping Above ₹1499",
  "New Blade Dual Time Collection Out Now",
  "Premium Quality. Affordable Price.",
  "Exclusive Offers Live Today",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  if (closed) return null;

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <div className="py-2 text-center relative">

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium"
          >
            {announcements[index]}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setClosed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}