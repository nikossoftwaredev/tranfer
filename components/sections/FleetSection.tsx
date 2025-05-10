"use client";

import { Users, Briefcase } from "lucide-react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import { VehicleConfig, vehicles } from "../../lib/data/vehicles";
import { useVehicle } from "../../contexts/VehicleContext";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

type VehicleProps = VehicleConfig;

const VehicleCard = ({ image, model, capacity, luggage, tags = [], description }: VehicleProps) => {
  const t = useTranslations("Fleet");
  const { selectedVehicle, setSelectedVehicle } = useVehicle();
  const isSelected = selectedVehicle === model;

  // Extract only the numbers from capacity and luggage strings
  const capacityNumber = capacity.match(/\d+/)?.[0] || capacity;
  const luggageNumber = luggage.match(/\d+/)?.[0] || luggage;

  const handleSelectVehicle = () => {
    setSelectedVehicle(model);
  };

  const getTagTranslation = (tag: string) => {
    switch (tag) {
      case "businessClass":
        return t("tags.businessClass");
      case "vip":
        return t("tags.vip");
      case "familyFriendly":
        return t("tags.familyFriendly");
      case "groupTravel":
        return t("tags.groupTravel");
      case "ecoOption":
        return "Eco-Friendly";
      case "premium":
        return t("tags.premium");
      case "largeGroups":
        return "Large Groups";
      default:
        return tag;
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-xl group",
        isSelected ? "border-primary border-2 shadow-primary/20 shadow-md" : "hover:translate-y-[-4px]"
      )}
    >
      {/* Vehicle Image with Tags Overlay */}
      <div className="h-56 w-full relative overflow-hidden">
        <Image
          src={image}
          alt={model}
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          priority={isSelected}
        />

        {/* Tags at top */}
        {tags.length > 0 && (
          <div className="absolute top-0 left-0 right-0 p-4 z-20">
            <div className="flex gap-2 flex-wrap justify-start">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-primary/10 text-primary border-0 shadow-sm backdrop-blur-sm font-medium px-3 py-1 rounded-full"
                >
                  {getTagTranslation(tag)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Selected Badge */}
        {isSelected && (
          <Badge variant="default" className="absolute top-4 right-4 shadow-md z-30 font-medium px-3 py-1 rounded-full">
            Selected
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardHeader className="pb-0 pt-3">
        <CardTitle className="text-xl font-bold">{model}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-6 text-sm mb-3 mt-4">
          <div className="flex items-center gap-2 bg-muted p-2 px-3 rounded-full">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium">{capacityNumber}</span>
          </div>
          <div className="flex items-center gap-2 bg-muted p-2 px-3 rounded-full">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="font-medium">{luggageNumber}</span>
          </div>
        </div>

        {description && <div className="mb-5 text-sm text-muted-foreground line-clamp-2">{description}</div>}
      </CardContent>

      {/* Book Button */}
      <CardFooter className="pt-0 pb-6">
        <button
          onClick={handleSelectVehicle}
          className={cn(
            "w-full py-2.5 text-center text-sm font-medium rounded-md shadow-sm transition-all duration-200",
            isSelected
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
          )}
        >
          {isSelected ? "Selected" : t("bookVehicle")}
        </button>
      </CardFooter>
    </Card>
  );
};

const FleetSection = () => {
  const t = useTranslations("Fleet");

  return (
    <section id="fleet" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionHeading title={t("title")} description={t("description")} className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={index} {...vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
