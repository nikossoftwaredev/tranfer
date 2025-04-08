import { Plane, Briefcase, MapPin, Heart, Clock } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-background rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const t = useTranslations("Services");

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Plane className="h-8 w-8" />}
            title={t("airportTransfers.title")}
            description={t("airportTransfers.description")}
          />
          <ServiceCard
            icon={<Briefcase className="h-8 w-8" />}
            title={t("businessTravel.title")}
            description={t("businessTravel.description")}
          />
          <ServiceCard
            icon={<MapPin className="h-8 w-8" />}
            title={t("guidedTours.title")}
            description={t("guidedTours.description")}
          />
          <ServiceCard
            icon={<Heart className="h-8 w-8" />}
            title={t("weddingTransfers.title")}
            description={t("weddingTransfers.description")}
          />
          <ServiceCard
            icon={<Clock className="h-8 w-8" />}
            title={t("portTransfers.title")}
            description={t("portTransfers.description")}
          />
          <div className="bg-primary/10 rounded-lg border border-primary/20 p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold mb-2">
              {t("customExperience.title")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("customExperience.description")}
            </p>
            <Link
              href="/#contact"
              className="text-primary font-medium hover:underline"
            >
              {t("customExperience.contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
