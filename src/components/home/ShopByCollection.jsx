import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const initialCollections = [
  { id: 1, name: 'Urbane Moon Watches', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600', href: '/collections' },
  { id: 2, name: 'Timeora Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600', href: '/collections' },
  { id: 3, name: 'Riva Watches', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600', href: '/collections' },
  { id: 4, name: 'Serene Watches', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600', href: '/collections' },
  { id: 5, name: 'Dezzle Watches', image: 'https://images.unsplash.com/photo-1508656919611-e129f109ff6d?w=600', href: '/collections' },
  { id: 6, name: 'Stardom Watches', image: 'https://images.unsplash.com/photo-1548171915-e7631cc1144f?w=600', href: '/collections' },
];

export default function ShopByCollection() {
  const [items, setItems] = useState(initialCollections);
  const [isSliding, setIsSliding] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state to track mouse hover

  useEffect(() => {
    // If hovered, don't set the interval
    if (isHovered) return;

    // Trigger the slide animation every 3.5 seconds
    const timer = setInterval(() => {
      setIsSliding(true); 
    }, 3500); 

    return () => clearInterval(timer);
  }, [isHovered]); // Re-run effect when hover state changes

  const handleAnimationComplete = () => {
    if (isSliding) {
      setIsSliding(false); 
      setItems((prevItems) => {
        const newItems = [...prevItems];
        const firstItem = newItems.shift(); 
        newItems.push(firstItem); 
        return newItems;
      });
    }
  };

  return (
    <section className="py-20 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wide">
          Best Watch Collections
        </h2>

        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}   // Pause on hover
          onMouseLeave={() => setIsHovered(false)}  // Resume when mouse leaves
        >
          
          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: isSliding ? "calc(-250px - 2rem)" : "0px" }}
            transition={{ 
              duration: isSliding ? 0.4 : 0, // 0.4s makes it snappy and quick!
              ease: "easeOut" // Snaps cleanly into place rather than slowly gliding
            }}
            onAnimationComplete={handleAnimationComplete}
          >
            {items.map((col) => (
              <Link 
                key={col.id} 
                to={col.href} 
                className="group block w-[250px] flex-shrink-0"
              >
                <div className="aspect-[3/4] bg-white flex items-center justify-center p-4">
                  <img 
                    src={col.image} 
                    alt={col.name} 
                    className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110" 
                    loading="lazy" 
                  />
                </div>
                <p className="mt-6 text-center font-bold text-sm tracking-wide group-hover:text-gray-500 transition-colors">
                  {col.name}
                </p>
              </Link>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}