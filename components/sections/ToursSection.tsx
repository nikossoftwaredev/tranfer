import Link from "next/link";
import { Clock } from "lucide-react";

type TourCardProps = {
  image: string;
  title: string;
  duration: string;
  description: string;
  price: string;
};

const TourCard = ({
  image,
  title,
  duration,
  description,
  price,
}: TourCardProps) => {
  return (
    <div className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all group">
      {/* Tour Image */}
      <div
        className="h-48 bg-cover bg-center relative group-hover:h-52 transition-all duration-300"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        <div className="flex justify-between items-center">
          <span className="font-medium text-primary text-lg">{price}</span>

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
  const tours = [
    {
      image: "https://source.unsplash.com/800x600/?city-view",
      title: "City Highlights Tour",
      duration: "4 hours",
      description:
        "Discover the most iconic landmarks and hidden gems of the city with our professional guide.",
      price: "From $299",
    },
    {
      image: "https://source.unsplash.com/800x600/?sunset-coast",
      title: "Coastal Sunset Experience",
      duration: "5 hours",
      description:
        "Enjoy breathtaking views of the coast as the sun sets over the horizon. Includes dinner stop.",
      price: "From $349",
    },
    {
      image: "https://source.unsplash.com/800x600/?vineyard",
      title: "Wine Country Exploration",
      duration: "7 hours",
      description:
        "Visit premium wineries and taste exquisite local wines while enjoying scenic countryside views.",
      price: "From $449",
    },
    {
      image: "https://source.unsplash.com/800x600/?historical-site",
      title: "Historical Discovery Tour",
      duration: "6 hours",
      description:
        "Step back in time and explore the rich history and cultural heritage of the region.",
      price: "From $399",
    },
  ];

  return (
    <section id="tours" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Private Tour Packages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore exclusive destinations with our premium private tours,
            tailored to provide unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <TourCard
              key={index}
              image={tour.image}
              title={tour.title}
              duration={tour.duration}
              description={tour.description}
              price={tour.price}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">
            Looking for a custom tour experience? We can create a personalized
            itinerary just for you.
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
