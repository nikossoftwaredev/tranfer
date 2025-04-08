import { getTranslations } from "next-intl/server";
import HeroSection from "../../components/sections/HeroSection";
import ServicesSection from "../../components/sections/ServicesSection";
import FleetSection from "../../components/sections/FleetSection";
import ToursSection from "../../components/sections/ToursSection";
import AboutSection from "../../components/sections/AboutSection";
import TestimonialsSection from "../../components/sections/TestimonialsSection";
import ContactSection from "../../components/sections/ContactSection";
import BookingSection from "../../components/sections/BookingSection";
import { routing } from "../../i18n/routing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Ensure locale is one of the supported locales
  const typedLocale = locale as (typeof routing.locales)[number];
  const t = await getTranslations({
    locale: typedLocale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("siteName"),
      images: [
        {
          url: "/images/hero-greece.jpg",
          width: 1200,
          height: 630,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/hero-greece.jpg"],
    },
  };
}

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <ToursSection />
      <AboutSection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </main>
  );
};

export default Home;
