"use client";

import { Users, Briefcase } from "lucide-react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import { VehicleConfig, vehicles } from "../../lib/data/vehicles";
import { useVehicle } from "../../contexts/VehicleContext";
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
  const { selectedVehicle, setSelectedVehicle } = useVehicle();
  const isSelected = selectedVehicle === model;

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
        return t("tags.ecoOption");
      case "premium":
        return t("tags.premium");
      default:
        return tag;
    }
  };

  const getFeatureTranslation = (feature: string) => {
    switch (feature) {
      case "driver":
        return t("commonFeatures.driver");
      case "wifi":
        return t("commonFeatures.wifi");
      case "leather":
        return t("commonFeatures.leather");
      case "climate":
        return t("commonFeatures.climate");
      case "water":
        return t("commonFeatures.water");
      case "charging":
        return t("commonFeatures.charging");
      case "legroom":
        return t("commonFeatures.legroom");
      case "premium":
        return t("commonFeatures.premium");
      case "zero":
        return t("commonFeatures.zero");
      default:
        return feature;
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-lg transition-shadow",
        isSelected && "border-primary border-2"
      )}
    >
      {/* Vehicle Image */}
      <div className="h-52 w-full relative overflow-hidden">
        <Image
          src={image}
          alt={model}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        {isSelected && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            Selected
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-4 pt-4 flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
            >
              {getTagTranslation(tag)}
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
                {getFeatureTranslation(feature)}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      {/* Book Button */}
      <CardFooter>
        <button
          onClick={handleSelectVehicle}
          className={cn(
            "w-full py-2 text-center text-sm font-medium rounded-md",
            isSelected
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
            "transition-colors"
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
