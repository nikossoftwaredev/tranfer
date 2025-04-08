import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FleetSection from "@/components/sections/FleetSection";
import ToursSection from "@/components/sections/ToursSection";
import AboutSection from "@/components/sections/AboutSection";
import BookingSection from "@/components/sections/BookingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <ToursSection />
      <AboutSection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </>
  );
};

export default Home;
