import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Ban from "../../assets/ban2.webp";

const workmanshipData = [
  {
    title: "Who We Are ?",
    content: "At Aurex, we are a team of passionate individuals driven by a shared vision and mission. We are dedicated to creating and delivering premium wristwatches that embody the perfect fusion of style, quality, and craftsmanship.",
  },
  {
    title: "Vision",
    content: "Our commitment to sustainability, quality, and social responsibility will set new industry standards and inspire excellence worldwide by leveraging innovation & advanced technology.",
  },
  {
    title: "Mission",
    content: "By 2040, Aurex aims to establish itself as a globally recognized brand while proudly manufacturing in India. We strive to capture 10% of the Indian population as a loyal customer base.",
  },
];

export default function AurexPremiumSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full min-h-screen py-20 font-sans text-white bg-[#d4d4d4]">
      
      {/* 1. Image Banner Section */}
      <div className="relative w-full h-[50vh] md:h-[80vh] bg-zinc-900 overflow-hidden">
        <img
          src={Ban}
          alt="Aurex Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* 2. Premium Workmanship Slider */}
      <div className="w-full py-16 md:py-24 px-4 md:px-12 flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl tracking-widest uppercase mb-12 md:mb-16 text-[#423200] text-center">
          Aurex's Workmanship
        </h2>

        {/* Slider Container - Stacks vertically on mobile, horizontally on md screens */}
        <div className="relative w-full max-w-7xl h-[600px] md:h-[450px] flex flex-col md:flex-row border border-zinc-800 bg-black">
          {workmanshipData.map((slide, i) => {
            const active = hovered === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                // Added onClick so mobile users can tap to expand
                onClick={() => setHovered(active ? null : i)} 
                animate={{ flex: active ? 2.5 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
                // Changed borders so they divide properly whether vertical or horizontal
                className="relative overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-zinc-800 last:border-b-0 md:last:border-r-0 flex items-center justify-center"
              >
                {/* Animated Gradient Border Background */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, rotate: 360 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.3 }
                      }}
                      className="absolute w-[200%] md:w-[200%] h-[200%] md:h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#d4af37_360deg)]"
                    />
                  )}
                </AnimatePresence>

                {/* Inner Content Layer */}
                <div className="absolute inset-[2px] bg-[#0c0c0c] z-10 flex flex-col items-center justify-center p-4 md:p-12 transition-colors duration-300">
                  
                  {/* Title */}
                  <motion.h3
                    animate={{
                      y: active ? -10 : 0,
                      color: active ? "#d4af37" : "#ffffff"
                    }}
                    transition={{ duration: 0.4 }}
                    // Removed whitespace-nowrap for mobile so long titles don't break the layout
                    className="text-lg md:text-2xl font-serif uppercase tracking-widest text-center z-20"
                  >
                    {slide.title}
                  </motion.h3>

                  {/* Paragraph Content */}
                  <AnimatePresence>
                    {active && (
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="text-xs md:text-base text-gray-400 text-center leading-relaxed mt-4 md:mt-6 max-w-[90%] md:max-w-md z-20"
                      >
                        {slide.content}
                      </motion.p>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}