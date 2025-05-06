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
import type { Metadata, Viewport } from "next";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Define viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E293B",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  // Ensure locale is one of the supported locales
  const typedLocale = locale as (typeof routing.locales)[number];
  const t = await getTranslations({
    locale: typedLocale,
    namespace: "Metadata",
  });

  const baseUrl = "https://poseidontransfer.com";
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: {
      default: t("title"),
      template: `%s | Poseidon Transfer`,
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${baseUrl}/en-US`,
        el: `${baseUrl}/el`,
      },
    },
    keywords: [
      "transfer",
      "greece",
      "athens",
      "private transfer",
      "airport transfer",
      "tourism",
      "travel",
    ],
    authors: [{ name: "Poseidon Transfer" }],
    creator: "Poseidon Transfer",
    publisher: "Poseidon Transfer",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("siteName"),
      locale: locale,
      type: "website",
      url: canonicalUrl,
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
      creator: "@poseidontransfer",
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
