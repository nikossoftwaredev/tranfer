import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { tours } from "@/types/tours";

type TourCardProps = {
  title: string;
  subtitle: string;
  duration: number;
  image: string;
  price: string;
};

const TourCard = ({
  image,
  title,
  subtitle,
  duration,
  price,
}: TourCardProps) => {
  return (
    <div className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all group">
      {/* Tour Image */}
      <div className="h-48 bg-cover bg-center relative group-hover:h-52 transition-all duration-300 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={240}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {duration} hours
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {subtitle}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-medium text-primary text-lg">€{price}</span>

          <Link
            href="/#booking"
            className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-md text-sm font-medium"
          >
            Book This Tour
          </Link>
        </div>
      </div>
    </div>
  );
};

const ToursSection = () => {
  return (
    <section id="tours" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Greek Tour Packages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the stunning beauty and rich history of Greece with our
            premium private tours, tailored to provide unforgettable
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <TourCard
              key={index}
              image={tour.image}
              title={tour.title}
              subtitle={tour.subtitle}
              duration={tour.hours}
              price={tour.cost}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">
            Looking for a custom tour experience in Greece? We can create a
            personalized itinerary just for you.
          </p>
          <Link href="/#contact" className="cta-button inline-block">
            Request Custom Tour
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
