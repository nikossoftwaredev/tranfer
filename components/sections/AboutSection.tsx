import { Shield, Clock, Award, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const t = useTranslations("About");

  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("title")}
            </h2>

            <p className="text-muted-foreground mb-6">{t("description")}</p>

            <p className="text-muted-foreground mb-8">{t("teamDescription")}</p>

            <div className="space-y-6">
              <ValueCard
                icon={<Shield className="h-6 w-6" />}
                title={t("values.safety.title")}
                description={t("values.safety.description")}
              />

              <ValueCard
                icon={<Clock className="h-6 w-6" />}
                title={t("values.punctuality.title")}
                description={t("values.punctuality.description")}
              />

              <ValueCard
                icon={<Award className="h-6 w-6" />}
                title={t("values.quality.title")}
                description={t("values.quality.description")}
              />

              <ValueCard
                icon={<ThumbsUp className="h-6 w-6" />}
                title={t("values.hospitality.title")}
                description={t("values.hospitality.description")}
              />
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[500px] relative">
            <Image
              src="/images/about-greece.jpg"
              alt="Professional chauffeur service in Greece"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <p className="text-xl font-semibold">{t("banner.title")}</p>
                <p className="text-sm text-white/80">{t("banner.subtitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
