import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const initialCollections = [
  {
    id: 1,
    name: "Urbane Moon Watches",
    image:
      "https://sylvi.in/cdn/shop/files/Sylvi_Watch_Collection_Image_Homepage_800_x_800_29295e68-41b3-4239-9c0f-e398e0892146.webp?v=1770894343",
    href: "/collections",
  },
  {
    id: 2,
    name: "Timeora Watches",
    image:
      "https://sylvi.in/cdn/shop/files/Sylvi_Imperial_black_Watch_Collection_Homepage_Main_Image.webp?v=1720243572",
    href: "/collections",
  },
  {
    id: 3,
    name: "Riva Watches",
    image:
      "https://sylvi.in/cdn/shop/files/SY-2408-BK-RG-RG-SL-ST_Velvetine_Steel_800_x_800.webp?v=1755060427",
    href: "/collections",
  },
  {
    id: 4,
    name: "Serene Watches",
    image:
      "https://sylvi.in/cdn/shop/files/Sylv_Elegare_Black_silver_Watch_Collection_Image_Homepage.webp?v=1736160692",
    href: "/collections",
  },
  {
    id: 5,
    name: "Dezzle Watches",
    image:
      "https://sylvi.in/cdn/shop/files/Sylvi_Urbanic_Green_Watch_Collection_Image_Homepage.webp?v=1729511480",
    href: "/collections",
  },
  {
    id: 6,
    name: "Timeora Watches",
    image:
      "https://sylvi.in/cdn/shop/files/Sylvi_Timeora_Watch_Collection_Image_Homepage_d9be0a41-0f1b-417b-809f-4981f3a86d41.webp?v=1756535110",
    href: "/collections",
  },
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