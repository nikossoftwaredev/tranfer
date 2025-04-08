import { Users, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import { VehicleConfig, vehicles } from "../../lib/data/vehicles";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";

type VehicleProps = VehicleConfig;

const VehicleCard = ({
  image,
  model,
  category,
  capacity,
  luggage,
  features,
  tags = [],
}: VehicleProps) => {
  const t = useTranslations("Fleet");

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
      <CardHeader className="pb-0">
        <CardTitle>{model}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>

      <CardContent>
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
      </CardContent>

      {/* Book Button */}
      <CardFooter>
        <Link
          href="/#booking"
          className={cn(
            "block w-full py-2 text-center text-sm font-medium rounded-md",
            "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          )}
        >
          {t("bookVehicle")}
        </Link>
      </CardFooter>
    </Card>
  );
};

const FleetSection = () => {
  const t = useTranslations("Fleet");

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
            <VehicleCard key={index} {...vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
