import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, ChevronDown, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import AnnouncementBar from "./AnnouncementBar";
import MegaMenu from "./MegaMenu";
import UnsplashSearch from "./UnsplashSearch";
import logo from "../../assets/image.png";

const navItems = [
  { id: "watches", label: "WATCHES", href: "/collections" },
  { id: "collection", label: "COLLECTION", href: "/collections" },
  { id: "accessories", label: "ACCESSORIES", href: "/accessories" },
  { id: "exclusive", label: "EXCLUSIVE", href: "/collections" },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + (i.quantity || 1), 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const hasMegaMenu = (id) =>
    ["watches", "collection", "accessories"].includes(id);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // 1. Changed 'sticky' to 'fixed left-0 w-full'
    <header
      onMouseLeave={() => setActiveMenu(null)}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b
        ${
          activeMenu
            ? "bg-white backdrop-blur-none border-gray-100 shadow-md"
            : scrolled
              ? "bg-white/60 backdrop-blur-xl border-white/20 shadow-md"
              : "bg-white border-transparent shadow-sm"
        }`}
    >
      {/* 2. Replaced conditional rendering with a smooth grid height animation */}
      <div
        className={`grid transition-all duration-500 ease-in-out 
        ${scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}
      >
        <div className="overflow-hidden">
          <AnnouncementBar />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`flex items-center transition-all duration-500
            ${scrolled ? "h-[75px]" : "h-[100px]"}`}
        >
          {/* LOGO */}
          <div className="w-1/3 flex justify-start items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className={`object-contain transition-all duration-500 hover:scale-105
                  ${scrolled ? "h-[42px]" : "h-[60px]"}`}
              />
            </Link>
          </div>

          {/* NAV CENTER */}
          <nav className="hidden lg:flex w-1/3 justify-center items-center gap-10">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() =>
                  setActiveMenu(hasMegaMenu(item.id) ? item.id : null)
                }
              >
                <Link
                  to={item.href}
                  className="group relative flex items-center text-[13px]
                  font-semibold uppercase tracking-widest text-gray-700
                  hover:text-black transition duration-300 py-4"
                >
                  {item.label}
                  {hasMegaMenu(item.id) && (
                    <ChevronDown className="w-4 h-4 ml-1 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                  <span className="absolute left-0 bottom-2 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="w-2/5 flex justify-end items-center gap-7">
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
            <div
              className="relative w-[240px] hidden md:block group 
                transition-transform duration-300 ease-out 
                hover:scale-[0.98] focus-within:scale-100"
            >
              {/* Search Icon */}
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 
               transition-colors duration-300 pointer-events-none z-10
               group-hover:text-gray-900 group-focus-within:text-black"
                strokeWidth={2}
              />

              {/* Search Input - opens Unsplash image search */}
              <input
                type="search"
                placeholder="Search watch images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-full pl-11 pr-4 py-2 rounded-full
               bg-gray-100 border border-transparent
               text-sm text-gray-900 placeholder-gray-400
               transition-all duration-300 outline-none
               hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm
               focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            <UnsplashSearch
              isOpen={searchOpen}
              onClose={() => setSearchOpen(false)}
              onSelect={() => setSearchOpen(false)}
              initialQuery={searchQuery}
            />

            <Link
              to="/wishlist"
              className="relative hover:scale-110 transition duration-300 text-gray-900"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1 -right-2 w-5 h-5
                  bg-red-500 text-white text-[10px]
                  rounded-full flex items-center justify-center"
                >
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative hover:scale-110 transition duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-2 w-5 h-5
                  bg-red-500 text-white text-[10px]
                  rounded-full flex items-center justify-center"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="hover:scale-110 transition duration-300 text-gray-900"
            >
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="mega-menu" /* 🟢 ADD THIS KEY HERE */
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 w-full bg-white shadow-xl border-t border-gray-100"
          >
            <MegaMenu
              activeMenu={activeMenu}
              onMouseEnter={() => setActiveMenu(activeMenu)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
