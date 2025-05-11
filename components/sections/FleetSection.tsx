"use client";

import { Users, Briefcase } from "lucide-react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import { VehicleConfig, vehicles } from "../../lib/data/vehicles";
import { useVehicle } from "../../contexts/VehicleContext";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
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
        "overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer",
        isSelected ? "border-primary border-2 shadow-primary/20 shadow-md" : "hover:translate-y-[-4px]"
      )}
      onClick={handleSelectVehicle}
    >
      {/* Vehicle Image with Selected Badge */}
      <div className="h-56 w-full relative overflow-hidden">
        <Image
          src={image}
          alt={model}
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
          priority={isSelected}
        />

        {/* Selected Badge */}
        {isSelected && (
          <Badge variant="default" className="absolute top-4 right-4 shadow-md z-30 font-medium px-3 py-1 rounded-full">
            Selected
          </Badge>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-4 pt-4 pb-1">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-primary/5 text-primary text-xs border-primary/10 font-medium px-2 py-0.5 rounded"
              >
                {getTagTranslation(tag)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <CardHeader className="pb-0 pt-3">
        <CardTitle className="text-xl font-bold">{model}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center text-sm mb-3 mt-2">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-primary mr-1" />
            <span className="font-medium">{capacityNumber}</span>
          </div>
          <div className="mx-3 h-4 w-px bg-muted-foreground/20"></div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 text-primary mr-1" />
            <span className="font-medium">{luggageNumber}</span>
          </div>
        </div>

        {description && <div className="text-sm text-muted-foreground line-clamp-2">{description}</div>}
      </CardContent>
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
