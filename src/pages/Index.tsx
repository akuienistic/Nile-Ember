import { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import PrivateHallSection from "@/components/PrivateHallSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Loader onComplete={handleComplete} />}
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <PrivateHallSection />
        <GallerySection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
