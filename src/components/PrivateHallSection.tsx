import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Monitor, Coffee, Shield, Clock } from "lucide-react";
import hallImg from "@/assets/private-hall.jpg";

const amenities = [
  { icon: Users, label: "Seats up to 40 guests" },
  { icon: Monitor, label: "HD projector & screen" },
  { icon: Wifi, label: "High-speed Wi-Fi" },
  { icon: Coffee, label: "Complimentary refreshments" },
  { icon: Shield, label: "Complete privacy & security" },
  { icon: Clock, label: "Flexible booking hours" },
];

const PrivateHallSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-background">
      <div ref={ref} className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-ember mb-2">Exclusive Spaces</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Private Hall for <span className="text-gradient-gold">Meetings & Conferences</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Elevate your business gatherings in our elegantly appointed private hall — the perfect setting 
            for corporate meetings, conferences, private dinners, and exclusive events right at the airport.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={hallImg}
                alt="Private conference hall at Nile Ember with elegant setup"
                className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-ember text-primary-foreground px-5 py-2.5 rounded-xl shadow-lg glow-amber">
              <p className="font-display font-bold text-sm">Book Now</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Badge className="bg-ember/15 text-ember border-ember/20 mb-4">
              <Shield size={12} className="mr-1" />
              Premium Private Venue
            </Badge>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're hosting a high-stakes board meeting, an intimate corporate retreat, 
              or a private celebration, our fully equipped hall offers the sophistication and discretion 
              you expect. Conveniently located within the airport, your guests can transition seamlessly 
              from flight to conference.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Our dedicated events team handles every detail — from custom catering menus to 
              audiovisual setup — so you can focus on what matters most.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {amenities.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <a.icon size={16} className="text-ember shrink-0" />
                  <span>{a.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsla(51,100%,50%,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-ember text-primary-foreground font-semibold px-8 py-3 rounded-full text-sm tracking-wide glow-amber transition-all"
            >
              Inquire About Booking
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivateHallSection;
