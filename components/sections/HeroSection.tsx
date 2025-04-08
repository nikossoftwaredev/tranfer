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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gold-text">{t("title")}</span> <br />
            {t("subtitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#booking" className="cta-button text-center">
              {t("bookNow")}
            </Link>
            <Link
              href="/#fleet"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all font-medium rounded-md text-center border border-white/20"
            >
              {t("exploreFleet")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
