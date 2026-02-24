import React from "react";
import { motion } from "framer-motion";
import watch from "../../assets/ring/1.webp";
import watch2 from "../../assets/ring/2.webp";
import logo from "../../assets/image.png";

const Indianew = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col md:flex-row items-center px-6 md:px-20 py-16">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 space-y-8 md:space-y-12 z-20 mt-10 md:mt-0"
      >
        {/* Animated Heading */}
        <h2 className="relative font-extrabold text-4xl md:text-6xl leading-[1.1] tracking-tight">
          <span className="animated-gradient-text">BHARAT KA</span>
          <br />
          <span className="animated-gradient-text">NAYA TIME</span>
        </h2>

        {/* Subtitle Block */}
        <div className="max-w-lg relative pl-8 space-y-4">
          {/* Animated vertical line */}
          <div
            className="absolute left-0 top-0 h-full w-[4px] 
                    bg-gradient-to-b from-orange-500 via-white to-green-600 
                    animate-pulse"
          />

          <h3 className="text-lg md:text-xl font-semibold uppercase tracking-[0.25em] text-black">
            THE WHEEL OF TIME
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Elevate your style with our wristwatches — where every tick reflects
            personality, precision, and timeless luxury.
          </p>
        </div>

        {/* Premium Animated Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 md:px-12 py-3 md:py-4 text-xs md:text-sm font-semibold uppercase
                     tracking-[0.3em] text-white overflow-hidden rounded-md
                     bg-black shadow-xl group"
        >
          <span className="relative z-10">Explore All Collections</span>

          {/* Animated Gradient Overlay */}
          <span
            className="absolute inset-0 bg-gradient-to-r 
                       from-orange-500 via-white to-green-600
                       translate-x-[-100%] group-hover:translate-x-0
                       transition-transform duration-700 opacity-20"
          />
        </motion.button>
      </motion.div>

      {/* RIGHT SIDE WATCH ANIMATION */}
      <div className="w-full md:w-1/2 relative flex items-center justify-center min-h-[400px] md:min-h-[800px] mt-10 md:mt-0">
        {/* Background Glow */}
        <div className="absolute w-[250px] md:w-[550px] h-[250px] md:h-[550px] bg-zinc-200 rounded-full blur-[80px] md:blur-[140px]" />

        {/* OUTER WATCH RING */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] sm:w-[350px] md:w-[760px] opacity-90"
        >
          <img
            src={watch}
            alt="outer watch ring"
            className="w-full object-contain will-change-transform"
          />
        </motion.div>

        {/* INNER WATCH RING */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[220px] sm:w-[280px] md:w-[810px] z-10"
        >
          <img
            src={watch2}
            alt="inner watch ring"
            className="w-full object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* CENTER LOGO */}
        <div className="absolute z-20 flex flex-col items-center text-center">
          <img
            src={logo}
            alt="brand logo"
            className="w-20 sm:w-24 md:w-40 object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Indianew;