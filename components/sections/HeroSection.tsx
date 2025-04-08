import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?luxury-car')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Luxury Private Transfers in{" "}
            <span className="gold-text">Your Region</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Reliable, safe and premium transport services tailored to your
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#booking" className="cta-button text-center">
              Book Now
            </Link>
            <Link
              href="/#fleet"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all font-medium rounded-md text-center border border-white/20"
            >
              Explore Our Fleet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
