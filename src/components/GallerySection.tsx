import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import heroImg from "@/assets/hero-restaurant.jpg";
import aboutImg from "@/assets/about-exterior.jpg";
import galleryOpening from "@/assets/gallery-opening.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import galleryCafe from "@/assets/gallery-cafe.jpg";

const images = [
  { src: heroImg, caption: "Our Elegant Dining Hall", tag: "Interior" },
  { src: aboutImg, caption: "Aviation Plaza Exterior", tag: "Exterior" },
  { src: galleryOpening, caption: "Grand Opening Highlights", tag: "Event" },
  { src: galleryInterior, caption: "Our Serene Ambiance", tag: "Interior" },
  { src: galleryFood, caption: "A Taste of Nile Ember", tag: "Cuisine" },
  { src: galleryCafe, caption: "Artisan Coffee Bar", tag: "Cafe" },
];

const GallerySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  const navigate = (dir: number) => {
    if (selected === null) return;
    setSelected((selected + dir + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gradient-section">
      <div ref={ref} className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-ember mb-2">Visual Journey</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Step Inside <span className="text-gradient-gold">Nile Ember</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From our warm interiors to our celebrated grand opening — every moment captured tells a story of elegance and excellence.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden shadow-md"
              onClick={() => setSelected(i)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-card/80 backdrop-blur-sm text-foreground border-0 text-[10px]">
                  <Camera size={10} className="mr-1" />
                  {img.tag}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-nile-blue/0 group-hover:bg-nile-blue/40 transition-all duration-300 flex items-end">
                <p className="text-primary-foreground text-sm font-medium p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 text-primary-foreground hover:text-gold transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:text-gold transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:text-gold transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>

            <motion.div
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selected].src}
                alt={images[selected].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
              <p className="text-center text-primary-foreground mt-3 font-display text-lg">
                {images[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
