import { motion } from "framer-motion";
import { Award, Shield, Truck, MapPin } from "lucide-react";
import banner from "../../assets/ring/banner.webp";

const items = [
  { icon: Award, label: "Quality Products" },
  { icon: Shield, label: "1-Year* Warranty" },
  { icon: Truck, label: "Free Shipping" },
  { icon: MapPin, label: "Made in India" },
];

export default function TrustSection() {
  return (
    <section className="py-1 px-6">
      <div>
        <img src={banner} alt="" />
      </div>

      <div className="py-10 px-6 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.label} className="group text-center cursor-pointer">
            {/* Icon */}
            <div
              className="w-16 h-16 mx-auto rounded-full bg-luxury-black 
      flex items-center justify-center text-white mb-4
      transition-transform duration-500 group-hover:scale-110"
            >
              <item.icon className="w-8 h-8" />
            </div>

            {/* Label */}
            <p className="text-sm font-medium relative inline-block">
              {item.label}

              {/* Animated Line */}
              <span
                className="absolute left-0 -bottom-1 h-[2px] w-0 
        bg-black transition-all duration-500 group-hover:w-full"
              ></span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
