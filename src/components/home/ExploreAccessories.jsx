import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react'; // Using lucide-react for the little EMI icon

// Dummy data matching your screenshot perfectly
const accessoriesData = [
  {
    id: "a1",
    name: "20MM MESH STRAP",
    brand: "SYLVI",
    price: 449.00,
    originalPrice: 899.00,
    emi: 150,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80", // Replace with your mesh strap image
    slug: "20mm-mesh-strap"
  },
  {
    id: "a2",
    name: "20MM SILICONE STRAP",
    brand: "SYLVI",
    price: 499.00,
    originalPrice: 899.00,
    emi: 166,
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5278?w=800&q=80", // Replace with your silicone strap image
    slug: "20mm-silicone-strap"
  },
  {
    id: "a3",
    name: "10MM SILVER MESH STRAP",
    brand: "SYLVI",
    price: 499.00,
    originalPrice: 899.00,
    emi: 166,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80", // Replace with your thin mesh strap image
    slug: "10mm-silver-mesh-strap"
  },
  {
    id: "a4",
    name: "STRAP TOOL",
    brand: "SYLVI",
    price: 499.00,
    originalPrice: 899.00,
    emi: 166,
    image: "https://images.unsplash.com/photo-1586864387789-228fa082c134?w=800&q=80", // Replace with your tool image
    slug: "strap-tool"
  },
  {
    id: "a5",
    name: "24MM SKY BLUE NYLON STRAP",
    brand: "SYLVI",
    price: 499.00,
    originalPrice: 799.00,
    emi: 166,
    image: "https://images.unsplash.com/photo-1601158935942-52255782d322?w=800&q=80", // Replace with your blue strap image
    slug: "24mm-sky-blue-nylon-strap"
  }
];

export default function ExploreAccessories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-[16px] md:text-[18px] font-bold text-[#111] uppercase tracking-[0.15em] text-center">
            Watch Accessories
          </h2>
        </div>

        {/* 5-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {accessoriesData.map((item) => (
            <Link 
              key={item.id} 
              to={`/product/${item.slug}`} 
              className="flex flex-col group block"
            >
              {/* Image Box */}
              <div className="relative aspect-square bg-[#F7F7F7] overflow-hidden flex items-center justify-center p-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 drop-shadow-sm" 
                />
              </div>

              {/* Product Details */}
              <div className="mt-5 text-center px-1">
                {/* Brand */}
                <p className="text-[10px] md:text-[11px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-medium">
                  {item.brand}
                </p>
                
                {/* Name */}
                <p className="text-[12px] md:text-[13px] font-medium text-gray-900 uppercase tracking-wide mb-1.5 leading-snug">
                  {item.name}
                </p>
                
                {/* Price Layout */}
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  {item.originalPrice > item.price && (
                    <span className="text-[12px] text-gray-400 line-through">
                      Rs. {item.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[13px] md:text-[14px] font-bold text-black tracking-wide">
                    Rs. {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <Link 
            to="/collections/accessories" 
            className="px-10 py-3.5 bg-[#333333] hover:bg-black text-white text-[12px] md:text-[13px] font-bold tracking-[0.15em] uppercase transition-colors"
          >
            View all
          </Link>
        </div>

      </div>
    </section>
  );
}