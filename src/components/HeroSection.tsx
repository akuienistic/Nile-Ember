import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import heroImg from "@/assets/hero-restaurant.jpg";

const EmberParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember-particle"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroImg}
          alt="Nile Ember Restaurant interior with warm amber lighting"
          className="w-full h-[120%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nile-blue/70 via-nile-blue/50 to-nile-blue/80" />
      </motion.div>

      <EmberParticles />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <Badge className="bg-ember/20 text-gold border-ember/30 backdrop-blur-sm px-3 py-1 text-xs font-medium">
            <Star size={12} className="mr-1" />
            Now Open — Grand Opening 2026
          </Badge>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-script text-2xl md:text-3xl text-gold mb-4"
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold text-shadow-glow mb-6"
        >
          Nile Ember
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-display text-lg md:text-xl text-primary-foreground/90 max-w-xl mb-3"
        >
          Restaurant & Cafe
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-sm md:text-base text-primary-foreground/70 max-w-lg mb-4 font-light tracking-wide"
        >
          Where the warmth of ember meets the elegance of the Nile — an unforgettable culinary journey awaits you at Juba International Airport.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex items-center gap-1 text-primary-foreground/50 text-xs mb-8"
        >
          <MapPin size={12} />
          Aviation Plaza, Juba International Airport, South Sudan
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px hsla(51,100%,50%,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-ember text-primary-foreground font-semibold px-8 py-3 rounded-full text-sm md:text-base tracking-wide glow-amber transition-all"
          >
            Explore Our Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-gold/40 text-gold font-medium px-8 py-3 rounded-full text-sm md:text-base tracking-wide hover:bg-gold/10 transition-all"
          >
            Reserve a Table
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
