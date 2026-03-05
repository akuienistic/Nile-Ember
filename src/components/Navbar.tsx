import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, UtensilsCrossed, Image, MapPin, X, Menu, CalendarCheck } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: Info },
  { label: "Menu", href: "#menu", icon: UtensilsCrossed },
  { label: "Gallery", href: "#gallery", icon: Image },
  { label: "Contact", href: "#contact", icon: MapPin },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-nile-blue/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <button onClick={() => handleClick("#home")} className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl font-bold text-gradient-gold text-shadow-glow">
              Nile Ember
            </span>
          </button>

          {/* Desktop nav - centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleClick(item.href)}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors text-sm font-medium tracking-wide"
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsla(51,100%,50%,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick("#contact")}
            className="hidden md:flex items-center gap-2 bg-gradient-ember text-primary-foreground font-semibold px-5 py-2 rounded-full text-sm glow-amber transition-all"
          >
            <CalendarCheck size={16} />
            Reserve a Table
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-1/2 h-full bg-nile-blue z-[70] flex flex-col p-6"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end text-primary-foreground mb-8"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleClick(item.href)}
                    className="flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors text-base font-medium"
                  >
                    <item.icon size={18} className="text-gold" />
                    {item.label}
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.button
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleClick("#contact")}
                  className="flex items-center gap-2 bg-gradient-ember text-primary-foreground font-semibold px-4 py-2.5 rounded-full text-sm mt-4 glow-amber"
                >
                  <CalendarCheck size={16} />
                  Reserve a Table
                </motion.button>
              </div>

              <div className="mt-auto">
                <p className="font-script text-gold text-lg">Nile Ember</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
