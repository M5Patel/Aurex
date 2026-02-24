import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import men from '../../assets/cate/boy.png';
import women from '../../assets/cate/women.png';

export default function ExactSplitBanners() {
  // Animation Variants for reusability
  const textReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto p-4 sm:p-8 md:p-16 flex flex-col md:flex-row gap-2 md:gap-1 h-auto md:h-[350px]">
      
      {/* =========================================
          WOMEN'S WATCHES (LEFT BANNER)
          ========================================= */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full md:w-1/2 bg-[#f0d4c3] flex items-center pl-6 sm:pl-8 md:pl-16 overflow-hidden min-h-[250px] md:min-h-[300px] cursor-pointer rounded-lg md:rounded-none"
      >
        
        {/* Decorative Circles with continuous floating animation */}
        <motion.div variants={floatAnimation} animate="animate" className="absolute top-6 left-6 w-6 md:w-8 h-6 md:h-8 rounded-full border-[2px] border-white"></motion.div>
        <motion.div variants={floatAnimation} animate="animate" style={{ animationDelay: '1s' }} className="absolute top-16 left-12 w-2 md:w-3 h-2 md:h-3 rounded-full border-[2.5px] border-[#8a5b46]"></motion.div>
        <div className="absolute top-1/2 right-[45%] w-2 md:w-3 h-2 md:h-3 rounded-full border-[2.5px] border-[#8a5b46]"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-start w-[60%] md:w-auto">
          <motion.h2 variants={textReveal} className="flex flex-col font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] mb-4 md:mb-6">
            <span className="text-[#8a5b46]">WOMEN'S</span>
            <span 
              className="text-white" 
              style={{ textShadow: '2px 2px 4px rgba(138, 91, 70, 0.4)' }}
            >
              WATCHES
            </span>
          </motion.h2>
          
          <motion.button 
            variants={textReveal}
            className="flex items-center gap-2 bg-[#8a5b46] text-white text-[9px] md:text-[10px] tracking-widest font-bold px-1 pr-3 md:pr-4 py-1 rounded-full hover:bg-[#6b4534] transition-colors"
          >
            <div className="bg-white text-[#8a5b46] rounded-full p-1 md:p-1.5 flex items-center justify-center">
              <ArrowRight size={12} strokeWidth={3} className="md:w-[14px] md:h-[14px]" />
            </div>
            EXPLORE NOW
          </motion.button>
        </div>

        {/* Watch Image - Smooth entry and zoom on hover */}
        <motion.img 
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
            hover: { scale: 1.08, rotate: -2, transition: { duration: 0.4 } }
          }}
          src={women} 
          alt="Women's Watch"
          className="absolute right-[-15%] sm:right-[-5%] md:right-0  -translate-y-1/2 h-[90%] md:h-[120%] w-auto object-contain z-10 origin-center"
        />
        
        {/* Subtle bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-10"></div>
      </motion.div>

      {/* =========================================
          MEN'S WATCHES (RIGHT BANNER)
          ========================================= */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full md:w-1/2 bg-[#c5cbce] flex items-center justify-end pr-6 sm:pr-8 md:pr-16 overflow-hidden min-h-[250px] md:min-h-[300px] cursor-pointer rounded-lg md:rounded-none"
      >
        
        {/* Decorative Circles */}
        <motion.div variants={floatAnimation} animate="animate" className="absolute top-6 right-6 w-6 md:w-8 h-6 md:h-8 rounded-full border-[2px] border-white"></motion.div>
        <motion.div variants={floatAnimation} animate="animate" style={{ animationDelay: '0.5s' }} className="absolute top-16 right-12 w-2 md:w-3 h-2 md:h-3 rounded-full border-[2.5px] border-[#414446]"></motion.div>
        <div className="absolute top-1/2 left-[45%] w-2 md:w-3 h-2 md:h-3 rounded-full border-[2.5px] border-[#414446]"></div>

        {/* Content - Right Aligned */}
        <div className="relative z-20 flex flex-col items-end text-right w-[60%] md:w-auto">
          <motion.h2 variants={textReveal} className="flex flex-col items-end font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] mb-4 md:mb-6">
            <span className="text-[#414446]">MEN'S</span>
            <span 
              className="text-white" 
              style={{ textShadow: '2px 2px 4px rgba(65, 68, 70, 0.4)' }}
            >
              WATCHES
            </span>
          </motion.h2>
          
          <motion.button 
            variants={textReveal}
            className="flex items-center gap-2 bg-[#414446] text-white text-[9px] md:text-[10px] tracking-widest font-bold px-1 pr-3 md:pr-4 py-1 rounded-full hover:bg-[#2b2d2f] transition-colors"
          >
            <div className="bg-white text-[#414446] rounded-full p-1 md:p-1.5 flex items-center justify-center">
              <ArrowRight size={12} strokeWidth={3} className="md:w-[14px] md:h-[14px]" />
            </div>
            EXPLORE NOW
          </motion.button>
        </div>

        {/* Watch Image - Smooth entry and zoom on hover */}
        <motion.img 
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
            hover: { scale: 1.08, rotate: 2, transition: { duration: 0.4 } }
          }}
          src={men}
          alt="Men's Watch"
          className="absolute left-[-15%] sm:left-[-5%] md:left-0  -translate-y-1/2 h-[90%] md:h-[120%] w-auto object-contain z-10 origin-center"
        />

        {/* Subtle bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10"></div>
      </motion.div>

    </section>
  );
}