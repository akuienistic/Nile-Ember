import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import appetizerImg from "@/assets/menu-appetizer.jpg";
import mainsImg from "@/assets/menu-mains.jpg";
import beveragesImg from "@/assets/menu-beverages.jpg";
import dessertsImg from "@/assets/menu-desserts.jpg";
import { Sparkles, Flame, Clock, Leaf } from "lucide-react";

const menuCategories = [
  {
    title: "Appetizers",
    description: "Begin your journey with exquisitely crafted starters — from smoky grilled plantains to crispy Nile perch bites with house-made dipping sauces.",
    price: "From $10",
    image: appetizerImg,
    badge: { icon: Leaf, text: "Fresh Daily" },
  },
  {
    title: "Main Courses",
    description: "Savor premium grilled meats, succulent seafood, and our signature Nile Ember platters — each dish tells a story of flavor and tradition.",
    price: "From $18",
    image: mainsImg,
    badge: { icon: Flame, text: "Chef's Special" },
  },
  {
    title: "Beverages",
    description: "From artisan single-origin coffees to handcrafted cocktails and freshly squeezed tropical juices — every sip is a celebration.",
    price: "From $5",
    image: beveragesImg,
    badge: { icon: Sparkles, text: "Signature Blends" },
  },
  {
    title: "Desserts",
    description: "Indulge in decadent pastries, rich chocolate fondants, and our famous honey-glazed baklava — the perfect sweet ending.",
    price: "From $8",
    image: dessertsImg,
    badge: { icon: Clock, text: "Made to Order" },
  },
];

const MenuSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-20 md:py-28 bg-background">
      <div ref={ref} className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-ember mb-2">Culinary Excellence</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            A Menu Crafted with <span className="text-gradient-gold">Passion & Precision</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Every dish at Nile Ember is a masterpiece — blending the rich culinary heritage of East Africa 
            with contemporary international techniques. Fresh ingredients, bold flavors, unforgettable moments.
          </p>
          <Badge className="bg-ember/15 text-ember border-ember/20">
            <Sparkles size={12} className="mr-1" />
            Grand Opening Specials Available
          </Badge>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {menuCategories.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.title} at Nile Ember`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <span className="absolute bottom-3 right-3 bg-gradient-ember text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {item.price}
                </span>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-card/80 backdrop-blur-sm text-foreground border-0 text-[10px]">
                    <item.badge.icon size={10} className="mr-1" />
                    {item.badge.text}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
