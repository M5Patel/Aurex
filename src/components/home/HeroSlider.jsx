import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    tagline: 'COMPLETE THE LOOK',
    headline: 'EXPLORE WATCH ACCESSORIES',
    subtext: 'Leather Strap | Nylon Strap | Steel Strap | Watch Box',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80',
  },
  {
    id: 2,
    tagline: 'THE AUREX SIGNATURE',
    headline: 'BLADE DUAL TIME',
    subtext: 'Analog Soul. Digital Precision. Master every second.',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1920&q=80',
  },
  {
    id: 3,
    tagline: 'ENGINEERED FOR EXCELLENCE',
    headline: 'THE RACING COLLECTION',
    subtext: 'Aerodynamic design meets horological perfection.',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1920&q=80',
  },
  {
    id: 4,
    tagline: 'ENGINEERED FOR EXCELLENCE',
    headline: 'THE RACING COLLECTION',
    subtext: 'Aerodynamic design meets horological perfection.',
    image: 'https://media.istockphoto.com/id/458066987/photo/rolex-deepsea-wristwatch.jpg?s=612x612&w=0&k=20&c=T3frhDuFQw9YvmuPd0GeK_Ka5NlEFlCmqtWrJtI7beA=',
  },
  {
    id: 5,
    tagline: 'ENGINEERED FOR EXCELLENCE',
    headline: 'THE RACING COLLECTION',
    subtext: 'Aerodynamic design meets horological perfection.',
    image: 'https://t3.ftcdn.net/jpg/01/70/71/34/360_F_170713428_KgRrmdjyiRauJGAXJwVSqKlDXEO2YU8i.jpg',
  },
];

// Reduced particle count (20 instead of 50) for better performance
const SnowParticles = memo(function SnowParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4.5 + 1,
      xStart: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.xStart}vw`,
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
            willChange: 'transform',
          }}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
});

export default function FullScreenCosmicSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[750px] bg-[#0a0a0a] overflow-hidden font-sans">
      {/* Snowfall Effect */}
      <SnowParticles />

      {/* Full-Screen Image Slider */}
      <AnimatePresence mode="sync">
        {slides.map((slide, index) => index === current && (
          <motion.div
            key={slide.id}
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* First slide loads eagerly, rest are lazy */}
            <motion.img
              src={slide.image}
              alt={slide.headline}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent/20" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 z-30">
              <div className="max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/70 text-sm md:text-base tracking-[0.2em] uppercase mb-4"
                >
                  {slide.tagline}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-white font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  {slide.headline}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-white/80 text-lg md:text-xl font-light mb-10"
                >
                  {slide.subtext}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress Bar Indicators */}
      <div className="absolute bottom-8 left-6 lg:left-12 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group py-2 flex items-center"
          >
            <div className={`h-[3px] rounded-full transition-all duration-500 ease-in-out ${i === current ? 'w-16 bg-white' : 'w-8 bg-white/30 group-hover:bg-white/60'
              }`} />
          </button>
        ))}
      </div>
    </section>
  );
}