import { Shield, Clock, Award, ThumbsUp } from "lucide-react";

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
              About LuxTransfer
            </h2>

            <p className="text-muted-foreground mb-6">
              At LuxTransfer, we have been providing exceptional private
              transfer services for over 10 years. Our dedication to quality,
              safety, and customer satisfaction has earned us a reputation as
              one of the leading luxury transportation providers in the region.
            </p>

            <p className="text-muted-foreground mb-8">
              Our team of professional chauffeurs is meticulously trained to
              provide the highest level of service, ensuring that every journey
              with us is memorable for all the right reasons.
            </p>

            <div className="space-y-6">
              <ValueCard
                icon={<Shield className="h-6 w-6" />}
                title="Safety First"
                description="Your security is our top priority. All our vehicles undergo rigorous safety inspections and our drivers are extensively trained."
              />

              <ValueCard
                icon={<Clock className="h-6 w-6" />}
                title="Punctuality"
                description="We value your time and guarantee prompt service, with real-time tracking and flight monitoring for airport transfers."
              />

              <ValueCard
                icon={<Award className="h-6 w-6" />}
                title="Premium Quality"
                description="From our luxury vehicles to our personalized service, we maintain the highest standards in every aspect."
              />

              <ValueCard
                icon={<ThumbsUp className="h-6 w-6" />}
                title="Customer Satisfaction"
                description="Our success is measured by your satisfaction. We go above and beyond to exceed your expectations."
              />
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[500px] relative">
            <img
              src="https://source.unsplash.com/800x1000/?chauffeur-service"
              alt="Professional chauffeur service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <p className="text-xl font-semibold">
                  Your journey deserves the best
                </p>
                <p className="text-sm text-white/80">
                  Experience luxury with every mile
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
