import React from 'react';

const ShopByPrice = () => {
  const priceCategories = [1500, 2000, 3000, 5000];

  return (
    <section className="py-16 bg-white w-full flex flex-col items-center">
      {/* Section Header */}
      <h2 className="text-xl font-bold tracking-[0.2em] mb-12 text-black uppercase">
        Shop By Price
      </h2>
      
      {/* Price Rings Container */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-4">
        {priceCategories.map((price, index) => (
          <PriceRing key={price} price={price} index={index} />
        ))}
      </div>
    </section>
  );
};

const PriceRing = ({ price, index }) => {
  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#dfdfdf] shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_2px_5px_rgba(255,255,255,1)] border border-gray-300 flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform duration-300">
      
      {/* The Groove (where the balls roll) */}
      <div className="absolute inset-3 md:inset-4 rounded-full border-2 border-[#b6b6b6] shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] bg-[#c9c9c9]"></div>

      {/* Rotating Track for the Balls */}
      {/* We use Tailwind's arbitrary values for a slow, infinite spin. 
          The animationDelay staggers the start so they don't all look identical. */}
      <div 
        className="absolute inset-3 md:inset-4 animate-[spin_10s_linear_infinite]"
        style={{ animationDelay: `-${index * 2.5}s` }} 
      >
        {/* Steel Ball 1 */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-100 to-gray-700 rounded-full shadow-[0_2px_3px_rgba(0,0,0,0.4)] border border-gray-400"></div>
        
        {/* Steel Ball 2 */}
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-gradient-to-br from-gray-200 to-gray-700 rounded-full shadow-[0_2px_3px_rgba(0,0,0,0.4)] border border-gray-400"></div>
        
        {/* Steel Ball 3 */}
        <div className="absolute bottom-2 left-3 w-2 h-2 bg-gradient-to-br from-gray-200 to-gray-700 rounded-full shadow-[0_2px_3px_rgba(0,0,0,0.4)] border border-gray-400"></div>
      </div>

      {/* Inner Black Dial */}
      <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 bg-black rounded-full flex flex-col items-center justify-center text-white border-2 border-gray-400 shadow-[0_0_15px_rgba(0,0,0,0.4)] group-hover:bg-[#1a1a1a] transition-colors duration-300">
        <span className="text-xs md:text-sm font-semibold tracking-widest mt-1">UNDER</span>
        <span className="text-lg md:text-xl font-bold tracking-wider">₹{price}</span>
      </div>
      
    </div>
  );
};

export default ShopByPrice;