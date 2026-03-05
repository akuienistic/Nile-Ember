import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Coffee, Wine, Flame, Star, Sparkles } from "lucide-react";

const highlights = [
  { icon: UtensilsCrossed, text: "Exquisite Cuisine" },
  { icon: Coffee, text: "Artisan Coffee" },
  { icon: Wine, text: "Premium Beverages" },
  { icon: Flame, text: "Live Grill Station" },
  { icon: Star, text: "Five-Star Service" },
  { icon: Sparkles, text: "Grand Opening Specials" },
];

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentHighlight, setCurrentHighlight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        size: 3 + Math.random() * 5,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    []
  );

  const CurrentIcon = highlights[currentHighlight].icon;

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-nile-blue overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(33,100%,50%,0.08)_0%,_transparent_70%)]" />

          {/* Ember particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="ember-particle"
              style={{
                left: p.left,
                bottom: "20%",
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient-gold text-shadow-glow mb-2">
              Nile Ember
            </h1>
            <p className="font-script text-2xl md:text-3xl text-gold">Restaurant & Cafe</p>
          </motion.div>

          {/* Rotating highlight */}
          <motion.div
            className="flex items-center gap-3 mb-10 h-8"
            key={currentHighlight}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentIcon size={20} className="text-ember" />
            <span className="text-primary-foreground/80 text-sm md:text-base font-medium tracking-wide">
              {highlights[currentHighlight].text}
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-56 md:w-64 h-1 bg-secondary/20 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-ember rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-primary-foreground/40 text-xs tracking-widest uppercase">
            Preparing your experience...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
