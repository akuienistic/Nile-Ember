import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import aboutImg from "@/assets/about-exterior.jpg";
import { Award, Clock, MapPin, Star, Users, Utensils } from "lucide-react";

const features = [
  { icon: MapPin, label: "Prime airport location for travelers & locals" },
  { icon: Star, label: "Five-star hospitality and warm service" },
  { icon: Utensils, label: "Curated international & local cuisine" },
  { icon: Users, label: "Celebrated grand opening with dignitaries" },
];

const stats = [
  { value: "200+", label: "Seats" },
  { value: "50+", label: "Dishes" },
  { value: "18hrs", label: "Daily Service" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-section">
      <div ref={ref} className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-ember mb-2">Discover Our Story</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            More Than a Restaurant — It's an{" "}
            <span className="text-gradient-gold">Experience</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-ember/15 text-ember border-ember/20 mb-4">
              <Award size={12} className="mr-1" />
              Opened March 3, 2026
            </Badge>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Nestled within the iconic Aviation Plaza at Juba International Airport, Nile Ember 
              isn't just a place to eat — it's a destination. We've crafted every detail to transform 
              your dining into a sensory journey, from the aroma of freshly ground coffee at dawn to 
              the sizzle of perfectly seasoned steaks at dusk.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our grand opening drew the attention of South Sudan's most distinguished leaders, 
              including the Minister of Investment, who praised Nile Ember as 
              <em className="text-foreground"> "a beacon of progress in the nation's hospitality landscape."</em>
            </p>

            <blockquote className="border-l-4 border-ember pl-4 italic text-foreground/80 mb-8">
              <span className="font-script text-xl text-ember">"</span>
              A stylish haven where incredible atmosphere meets world-class service — the jewel 
              of Juba's dining scene.
              <span className="font-script text-xl text-ember">"</span>
            </blockquote>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <f.icon size={18} className="text-ember shrink-0 mt-0.5" />
                  <span>{f.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl font-bold text-gradient-gold">{s.value}</p>
                  <p className="text-muted-foreground text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutImg}
                alt="Nile Ember Restaurant exterior at Aviation Plaza, Juba"
                className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-ember text-primary-foreground px-6 py-3 rounded-xl shadow-lg glow-amber">
              <p className="font-display font-bold text-lg">Est. 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
