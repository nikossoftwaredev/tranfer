import { Plane, Briefcase, MapPin, Heart, Clock } from "lucide-react";
import Link from "next/link";

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
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Premium Greek Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of luxury transportation services
            throughout Greece, from Athens to the islands and ancient sites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Plane className="h-8 w-8" />}
            title="Athens Airport Transfers"
            description="Comfortable and timely airport pickups and drop-offs at Athens International Airport with flight monitoring and complimentary waiting time."
          />
          <ServiceCard
            icon={<Briefcase className="h-8 w-8" />}
            title="Business Travel"
            description="Professional chauffeur services for executives and corporate clients throughout Athens and major Greek business centers."
          />
          <ServiceCard
            icon={<MapPin className="h-8 w-8" />}
            title="Greek Guided Tours"
            description="Customized sightseeing experiences to the Acropolis, Delphi, Meteora, and other iconic Greek destinations with knowledgeable drivers."
          />
          <ServiceCard
            icon={<Heart className="h-8 w-8" />}
            title="Greek Wedding & Event Transfers"
            description="Special occasion transportation for Greek weddings and events with decorated vehicles and VIP service for your special day."
          />
          <ServiceCard
            icon={<Clock className="h-8 w-8" />}
            title="Island & Port Transfers"
            description="Seamless transfers to and from Greek ports like Piraeus and Rafina for connections to the beautiful Greek islands."
          />
          <div className="bg-primary/10 rounded-lg border border-primary/20 p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold mb-2">
              Custom Greek Experience
            </h3>
            <p className="text-muted-foreground mb-4">
              Need a personalized Greek travel experience? We can create a
              tailored service package just for you.
            </p>
            <Link
              href="/#contact"
              className="text-primary font-medium hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
