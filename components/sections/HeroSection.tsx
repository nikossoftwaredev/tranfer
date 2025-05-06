import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-greece.jpg"
          alt="Luxury Transfer in Greece"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="gold-text block mb-1 sm:mb-2">{t("title")}</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {t("subtitle")}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/#booking"
              className="cta-button text-center py-2.5 sm:py-3"
            >
              {t("bookNow")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
