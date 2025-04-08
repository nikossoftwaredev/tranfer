import { Users, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";

type VehicleProps = {
  image: string;
  model: string;
  category: string;
  capacity: string;
  luggage: string;
  features: string[];
  tags?: string[];
};

const VehicleCard = ({
  image,
  model,
  category,
  capacity,
  luggage,
  features,
  tags = [],
}: VehicleProps) => {
  const t = useTranslations("Fleet.card");

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Vehicle Image */}
      <div className="h-52 w-full relative overflow-hidden">
        <Image
          src={image}
          alt={model}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-4 pt-4 flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold">{model}</h3>
        <p className="text-muted-foreground text-sm mb-3">{category}</p>

        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary" />
            <span>{capacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 text-primary" />
            <span>{luggage}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium mb-2">{t("features")}:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Book Button */}
      <div className="px-4 pb-4">
        <Link
          href="/#booking"
          className={cn(
            "block w-full py-2 text-center text-sm font-medium rounded-md",
            "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          )}
        >
          {t("bookButton")}
        </Link>
      </div>
    </div>
  );
};

const FleetSection = () => {
  const t = useTranslations("Fleet");

  const vehicles = [
    {
      image: "/images/fleet/mercedes-s-class.png",
      model: "Mercedes S-Class",
      category: "Luxury Sedan",
      capacity: "Up to 3 passengers",
      luggage: "2 large suitcases",
      features: [
        "Professional Greek Driver",
        "Free WiFi",
        "Leather Seats",
        "Climate Control",
        "Bottled Water",
        "Charging Outlets",
      ],
      tags: ["Business Class", "VIP"],
    },
    {
      image: "/images/fleet/mercedes-vito.png",
      model: "Mercedes Vito",
      category: "Luxury Van",
      capacity: "Up to 7 passengers",
      luggage: "6 large suitcases",
      features: [
        "Professional Greek Driver",
        "Free WiFi",
        "Leather Seats",
        "Climate Control",
        "Extra Legroom",
        "Charging Outlets",
      ],
      tags: ["Family Friendly", "Group Travel"],
    },
    {
      image: "/images/fleet/tesla-s.png",
      model: "Tesla Model S",
      category: "Electric Luxury Sedan",
      capacity: "Up to 3 passengers",
      luggage: "2 large suitcases",
      features: [
        "Professional Greek Driver",
        "Free WiFi",
        "Premium Interior",
        "Climate Control",
        "Zero Emissions",
        "Charging Outlets",
      ],
      tags: ["Eco Option", "Premium"],
    },
  ];

  return (
    <section id="fleet" className="section-padding bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("title")}
          description={t("description")}
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={index}
              image={vehicle.image}
              model={vehicle.model}
              category={vehicle.category}
              capacity={vehicle.capacity}
              luggage={vehicle.luggage}
              features={vehicle.features}
              tags={vehicle.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
