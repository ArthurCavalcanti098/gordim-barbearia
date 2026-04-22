import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in-up, .fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen />}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <BookingSection />
          <GallerySection />
          <TestimonialsSection />
          <LocationSection />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}
