import { useState, useEffect, useCallback, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, ChevronDown, Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import AnnouncementBar from "./AnnouncementBar";
import MegaMenu, { megaMenuItems } from "./MegaMenu";
import ProductSearch from "./ProductSearch";
import logo from "../../assets/image.png";

const navItems = [
  { id: "watches", label: "WATCHES", href: "/collections" },
  { id: "collection", label: "COLLECTION", href: "/collections" },
  { id: "accessories", label: "ACCESSORIES", href: "/accessories" },
  { id: "exclusive", label: "EXCLUSIVE", href: "/collections" },
];

const hasMegaMenu = (id) => ["watches", "collection", "accessories"].includes(id);

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState(null);

  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + (i.quantity || 1), 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  // Throttled scroll listener with passive: true
  const rafRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Body scroll lock via class toggle (avoids forced reflow from style mutation)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileMenuOpen]);

  const handleMenuLeave = useCallback(() => setActiveMenu(null), []);
  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);
  const handleMobileOpen = useCallback(() => setMobileMenuOpen(true), []);
  const handleMobileClose = useCallback(() => setMobileMenuOpen(false), []);
  const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), []);

  const handleNavHover = useCallback((id) => {
    setActiveMenu(hasMegaMenu(id) ? id : null);
  }, []);

  const handleMobileItemClick = useCallback((item) => {
    if (hasMegaMenu(item.id)) {
      setMobileExpandedItem((prev) => (prev === item.id ? null : item.id));
    } else {
      setMobileMenuOpen(false);
    }
  }, []);

  return (
    <header
      onMouseLeave={handleMenuLeave}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b
        ${activeMenu || mobileMenuOpen
          ? "bg-white backdrop-blur-none border-gray-100 shadow-md"
          : scrolled
            ? "bg-white/60 backdrop-blur-xl border-white/20 shadow-md"
            : "bg-white border-transparent shadow-sm"
        }`}
    >
      <div
        className={`grid transition-all duration-500 ease-in-out 
        ${scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}
      >
        <div className="overflow-hidden">
          <AnnouncementBar />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-500
            ${scrolled ? "h-[75px]" : "h-[100px]"}`}
        >
          {/* LEFT SIDE: Hamburger (Mobile) + Logo */}
          <div className="w-[30%] lg:w-1/4 flex items-center gap-4">
            <button
              onClick={handleMobileOpen}
              className="lg:hidden p-1 text-gray-900 hover:bg-gray-100 rounded-md"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className={`object-contain transition-all duration-500 hover:scale-105
                  ${scrolled ? "h-[36px] md:h-[42px]" : "h-[45px] md:h-[60px]"}`}
              />
            </Link>
          </div>

          {/* CENTER: Desktop Nav */}
          <nav className="hidden lg:flex w-1/3 justify-center items-center gap-10 h-full">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleNavHover(item.id)}
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

          {/* RIGHT SIDE: Icons & Desktop Search */}
          <div className="w-[70%] lg:w-2/5 flex justify-end items-center gap-4 md:gap-7">
            <button
              onClick={handleSearchOpen}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="relative w-[240px] hidden md:block group transition-transform duration-300 ease-out hover:scale-[0.98] focus-within:scale-100">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 transition-colors duration-300 pointer-events-none z-10 group-hover:text-gray-900 group-focus-within:text-black" strokeWidth={2} />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchOpen}
                className="w-full pl-11 pr-4 py-2 rounded-full bg-gray-100 border border-transparent text-sm text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <ProductSearch isOpen={searchOpen} onClose={handleSearchClose} initialQuery={searchQuery} />

            <Link to="/wishlist" className="relative hover:scale-110 transition duration-300 text-gray-900 hidden sm:block">
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative hover:scale-110 transition duration-300">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <Link to="/account" className="hover:scale-110 transition duration-300 text-gray-900 hidden sm:block">
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop MegaMenu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="mega-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden lg:block absolute left-0 w-full bg-white shadow-xl border-t border-gray-100"
          >
            <MegaMenu activeMenu={activeMenu} onMouseEnter={() => setActiveMenu(activeMenu)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden"
              onClick={handleMobileClose}
            />
            {/* Drawer — GPU-accelerated */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white z-[70] lg:hidden overflow-y-auto flex flex-col shadow-2xl"
              style={{ willChange: 'transform' }}
            >
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <img src={logo} alt="Logo" className="h-[36px] object-contain" />
                <button onClick={handleMobileClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 py-4">
                {navItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-50 last:border-0">
                    <div
                      className="flex items-center justify-between px-6 py-4"
                      onClick={() => handleMobileItemClick(item)}
                    >
                      <Link
                        to={item.href}
                        className="text-[14px] font-bold uppercase tracking-wider text-gray-900 flex-1"
                        onClick={(e) => hasMegaMenu(item.id) && e.preventDefault()}
                      >
                        {item.label}
                      </Link>
                      {hasMegaMenu(item.id) && (
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${mobileExpandedItem === item.id ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>

                    {/* Mobile Accordion Submenu */}
                    <AnimatePresence>
                      {mobileExpandedItem === item.id && hasMegaMenu(item.id) && megaMenuItems[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50"
                        >
                          <div className="px-6 py-4 space-y-6">
                            {megaMenuItems[item.id].type === "lists" && megaMenuItems[item.id].columns.map((col, idx) => (
                              <div key={idx}>
                                <h5 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-3">{col.title}</h5>
                                <ul className="space-y-3">
                                  {col.items.map((subItem, sIdx) => (
                                    <li key={sIdx}>
                                      <Link
                                        to={`/collections/${subItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-[14px] text-gray-700 hover:text-black"
                                        onClick={handleMobileClose}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {megaMenuItems[item.id].type === "promos" && (
                              <div className="grid grid-cols-1 gap-4">
                                {megaMenuItems[item.id].promos.map((promo, idx) => (
                                  <Link key={idx} to={promo.link} onClick={handleMobileClose}>
                                    <img src={promo.img} alt={promo.alt} className="w-full h-auto rounded-md object-cover" loading="lazy" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Mobile Drawer Footer Actions (Wishlist/Account) */}
              <div className="p-6 bg-gray-50 mt-auto flex justify-between items-center">
                <Link to="/account" onClick={handleMobileClose} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="w-5 h-5" /> Account
                </Link>
                <Link to="/wishlist" onClick={handleMobileClose} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Heart className="w-5 h-5" /> Wishlist ({wishlistCount})
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(Header);