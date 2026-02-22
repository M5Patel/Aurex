import React from "react";

const LOGOS = [
  { src: "https://m.media-amazon.com/images/I/216gXvrojAL.jpg", alt: "JioMart" },
  { src: "https://i.pinimg.com/originals/58/3b/f1/583bf1744b9419813a94323c68f23df9.png", alt: "AJIO" },
  { src: "https://download.logo.wine/logo/Amazon_(company)/Amazon_(company)-Logo.wine.png", alt: "Amazon" },
  { src: "https://www.logo.wine/a/logo/Flipkart/Flipkart-Logo.wine.svg", alt: "Flipkart" },
  { src: "https://cdn.iconscout.com/icon/free/png-256/free-nykaa-logo-icon-svg-download-png-2822953.png", alt: "Nykaa" },
];

export default function BrandMarquee() {
  return (
    <section className="py-10 overflow-hidden">
      
      <h3 className="text-center text-xl font-semibold tracking-[3px] mb-14">
        BEST SELLING BRAND ON
      </h3>

      <div className="relative overflow-hidden">
        
        <div className="flex w-max animate-marquee items-center gap-32">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="h-24 object-contain transition duration-500 hover:scale-110"
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

    </section>
  );
}