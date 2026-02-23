import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// 1. Import your JSON data
import megaMenuData from "../../data/megaMenuData.json";

// 2. Export it so Header.jsx can still import { megaMenuItems } from './MegaMenu' if needed
export const megaMenuItems = megaMenuData;

export default function MegaMenu({ activeMenu }) {
  // 3. Use the imported JSON data
  const data = activeMenu ? megaMenuData[activeMenu] : null;
  
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full w-full bg-white shadow-xl z-50 cursor-default border-t border-gray-100"
    >
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-10">
        
        {/* Render Lists (Watches, Collections) */}
        {data.type === "lists" && (
          <div className="flex justify-between gap-8">
            {data.columns.map((column, idx) => (
              <div key={idx} className="flex-1 min-w-[160px]">
                <h4 className="text-[13px] font-bold tracking-widest text-black mb-6 uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-5">
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        to={`/collections/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="group flex items-center gap-4"
                      >
                        {item.img && (
                          <div className="w-8 h-10 shrink-0 bg-gray-50 flex items-center justify-center overflow-hidden rounded-sm">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover mix-blend-multiply"
                            />
                          </div>
                        )}
                        <span
                          className={`text-[14px] text-gray-600 group-hover:text-black transition-colors ${
                            !item.img ? "mt-1 block" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Render Promos (Accessories) */}
        {data.type === "promos" && (
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.promos.map((promo, idx) => (
              <Link
                key={idx}
                to={promo.link}
                className="block overflow-hidden rounded-lg group"
              >
                <img
                  src={promo.img}
                  alt={promo.alt}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}