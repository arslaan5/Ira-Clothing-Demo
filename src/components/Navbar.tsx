import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Lookbook", path: "/lookbook" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsOpen, wishlist } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const showDark = isHome && !isScrolled && !isMenuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled || !isHome
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden transition-colors ${showDark ? "text-background" : "text-foreground"}`}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link text-[11px] font-body tracking-[0.18em] uppercase transition-colors duration-500 ${
                  location.pathname === link.path
                    ? showDark ? "text-background" : "text-foreground"
                    : showDark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className={`font-display text-3xl font-light tracking-[0.35em] transition-colors duration-500 ${
              showDark ? "text-background" : "text-foreground"
            }`}>
              IRA
            </h1>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`transition-colors duration-300 ${showDark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link
              to="/wishlist"
              className={`relative transition-colors duration-300 ${showDark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </Link>
            <Link
              to="/login"
              className={`hidden sm:block transition-colors duration-300 ${showDark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <User size={18} />
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className={`relative transition-colors duration-300 ${showDark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="border-t border-border overflow-hidden bg-background/95 backdrop-blur-md"
            >
              <div className="max-w-2xl mx-auto px-6 py-5">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-transparent text-sm font-body tracking-wide outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background"
          >
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col items-center justify-center h-full gap-10"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, ease: "easeOut" }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-4xl font-light tracking-[0.25em] text-foreground hover:text-primary transition-colors duration-500"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
