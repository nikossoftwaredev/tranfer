import { Shield, Clock, Award, ThumbsUp } from "lucide-react";
import Image from "next/image";

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
  return (
    <section id="about" className="section-padding bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About LuxTransfer Greece
            </h2>

            <p className="text-muted-foreground mb-6">
              At LuxTransfer Greece, we have been providing exceptional private
              transfer services throughout Greece for over 10 years. Our
              dedication to quality, safety, and Greek hospitality has earned us
              a reputation as one of the leading luxury transportation providers
              in the region.
            </p>

            <p className="text-muted-foreground mb-8">
              Our team of professional Greek chauffeurs is meticulously trained
              to provide the highest level of service, combining local knowledge
              with international standards to ensure that every journey with us
              is memorable for all the right reasons.
            </p>

            <div className="space-y-6">
              <ValueCard
                icon={<Shield className="h-6 w-6" />}
                title="Safety First"
                description="Your security is our top priority in Greece. All our vehicles undergo rigorous safety inspections and our drivers are extensively trained on Greek roads."
              />

              <ValueCard
                icon={<Clock className="h-6 w-6" />}
                title="Punctuality"
                description="We value your time and guarantee prompt service throughout Greece, with real-time tracking and flight monitoring for Athens airport transfers."
              />

              <ValueCard
                icon={<Award className="h-6 w-6" />}
                title="Premium Quality"
                description="From our luxury vehicles to our personalized Greek service, we maintain the highest standards in every aspect of your journey."
              />

              <ValueCard
                icon={<ThumbsUp className="h-6 w-6" />}
                title="Greek Hospitality"
                description="We combine traditional Greek philoxenia (hospitality) with professional service. Our local drivers know Greece inside out."
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
                <p className="text-xl font-semibold">
                  Your Greek journey deserves the best
                </p>
                <p className="text-sm text-white/80">
                  Experience luxury with every mile in Greece
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
